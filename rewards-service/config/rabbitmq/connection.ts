import amqp from 'amqplib';

// --- NUEVAS CONSTANTES PARA REINTENTOS ---
const MAX_RETRIES = 5; // Número máximo de intentos de reconexión
const RETRY_DELAY_MS = 5000; // Retraso entre intentos en milisegundos (5 segundos)
// --- FIN NUEVAS CONSTANTES ---

export class RabbitMQConnection {
    private static instance: RabbitMQConnection;
    private connection: any = null;
    private channel: any = null;
    private isConnected: boolean = false; // Nuevo estado para saber si la conexión está activa

    private constructor() {}

    public static getInstance(): RabbitMQConnection {
        if (!RabbitMQConnection.instance) {
            RabbitMQConnection.instance = new RabbitMQConnection();
        }
        return RabbitMQConnection.instance;
    }

    public async connect(): Promise<void> {
        if (this.isConnected) {
            console.log('✅ Ya conectado a RabbitMQ.');
            return;
        }

        let retries = 0;
        const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';

        while (retries < MAX_RETRIES) {
            try {
                console.log(`Conectando a RabbitMQ (Intento ${retries + 1}/${MAX_RETRIES})...`);
                this.connection = await amqp.connect(rabbitmqUrl);

                console.log('Creando canal de RabbitMQ...');
                this.channel = await this.connection.createChannel();

                // Configurar exchanges
                await this.setupExchanges();

                // Configurar colas
                await this.setupQueues();

                this.isConnected = true;
                console.log('✅ Conexión a RabbitMQ establecida correctamente');

                // Manejo de desconexiones inesperadas para intentar reconectar
                this.connection.on('close', () => {
                    console.error('⚠️ Conexión de RabbitMQ cerrada inesperadamente. Intentando reconectar...');
                    this.isConnected = false;
                    this.reconnect(); // Llama a un método para intentar reconectar
                });
                this.connection.on('error', (err: any) => {
                    console.error('❌ Error en la conexión de RabbitMQ:', err.message);
                    this.isConnected = false;
                    this.reconnect(); // Llama a un método para intentar reconectar
                });

                return; // Si todo sale bien, salimos del bucle
            } catch (error: any) {
                console.error(`❌ Error conectando a RabbitMQ (Intento ${retries + 1}/${MAX_RETRIES}):`, error.message);
                retries++;
                if (retries < MAX_RETRIES) {
                    console.log(`Reintentando en ${RETRY_DELAY_MS / 1000} segundos...`);
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
                } else {
                    console.error('❌ Máximo de reintentos alcanzado. No se pudo conectar a RabbitMQ.');
                    this.isConnected = false;
                    throw error; // Propagamos el error después de agotar los reintentos
                }
            }
        }
    }

    // Método para intentar reconectar automáticamente
    private async reconnect(): Promise<void> {
        // Simple mecanismo de reconexión. Podrías añadir un límite a estas reconexiones también
        // para evitar un bucle infinito en caso de problemas persistentes.
        if (!this.isConnected) {
            console.log('Iniciando proceso de reconexión...');
            try {
                // Pequeño retardo antes de la primera reconexión
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS)); 
                await this.connect(); // Intenta reconectar usando la lógica existente
            } catch (error) {
                console.error('❌ Fallo la reconexión automática a RabbitMQ:', error);
                // Aquí podrías implementar un sistema de backoff exponencial o notificaciones
            }
        }
    }

    private async setupExchanges(): Promise<void> {
        if (!this.channel) throw new Error('Canal no disponible para configurar exchanges.');

        // Exchange para eventos de usuario
        await this.channel.assertExchange('rewards.events', 'topic', {
            durable: true,
            autoDelete: false
        });

        console.log('✅ Exchange "rewards.events" configurado');
    }

    private async setupQueues(): Promise<void> {
        if (!this.channel) throw new Error('Canal no disponible para configurar colas.');

        // Cola para eventos de creación de perfil
        await this.channel.assertQueue('rewards.profile.created', {
            durable: true,
            autoDelete: false
        });

        // Binding: user.profile.created -> user.events con routing key "user.created"
        await this.channel.bindQueue('rewards.profile.created', 'rewards.events', 'rewards.created');

        console.log('✅ Cola "rewards.profile.created" configurada');
    }

    public getChannel(): any {
        if (!this.channel || !this.isConnected) { // Verifica también el estado de conexión
            throw new Error('Canal de RabbitMQ no disponible o desconectado. Asegúrate de llamar connect() primero y de que la conexión esté activa.');
        }
        return this.channel;
    }

    public async close(): Promise<void> {
        if (this.channel) {
            try {
                await this.channel.close();
                this.channel = null;
            } catch (error) {
                console.error('❌ Error cerrando canal de RabbitMQ:', error);
            }
        }
        if (this.connection) {
            try {
                await this.connection.close();
                this.connection = null;
                this.isConnected = false;
            } catch (error) {
                console.error('❌ Error cerrando conexión de RabbitMQ:', error);
            }
        }
        console.log('🔌 Conexión a RabbitMQ cerrada');
    }

    public async publishMessage(
        exchange: string,
        routingKey: string,
        message: any
    ): Promise<boolean> {
        try {
            // Asegúrate de que el canal esté disponible antes de intentar publicar
            if (!this.channel || !this.isConnected) {
                console.warn('⚠️ Intentando publicar mensaje sin conexión activa a RabbitMQ. Intentando reconectar...');
                await this.connect(); // Intenta reconectar antes de publicar
                if (!this.channel || !this.isConnected) { // Si la reconexión falla, no podemos publicar
                    console.error('❌ No se pudo reconectar para publicar el mensaje. Publicación fallida.');
                    return false;
                }
            }

            const channel = this.getChannel(); // Obtener el canal después de asegurar la conexión
            const messageBuffer = Buffer.from(JSON.stringify(message));

            const result = channel.publish(exchange, routingKey, messageBuffer, {
                persistent: true,
                timestamp: Date.now()
            });

            if (result) {
                console.log(`📤 Mensaje publicado en ${exchange} con routing key: ${routingKey}`);
            } else {
                console.error(`❌ Error publicando mensaje en ${exchange}: El mensaje no fue enviado inmediatamente (puede estar en buffer).`);
                // En amqplib, 'publish' devuelve false si el buffer está lleno, no significa un fallo de red.
                // Para una confirmación real, necesitarías usar 'publisher confirms'.
            }

            return result;
        } catch (error) {
            console.error('❌ Error publicando mensaje:', error);
            return false;
        }
    }
}