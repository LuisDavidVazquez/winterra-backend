import amqp from 'amqplib';

// --- CONSTANTES PARA REINTENTOS ---
const MAX_RETRIES = 5; // Número máximo de intentos de reconexión
const RETRY_DELAY_MS = 5000; // Retraso entre intentos en milisegundos (5 segundos)
// --- FIN CONSTANTES ---

export class RabbitMQConnection {
    private static instance: RabbitMQConnection;
    private connection: any = null;
    private channel: any = null;
    private isConnected: boolean = false; // Estado para saber si la conexión está activa

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

                // Escuchar eventos de la conexión para reconexión automática
                this.connection.on('close', (err: any) => {
                    console.error('⚠️ Conexión de RabbitMQ cerrada inesperadamente. Detalles:', err ? err.message : 'Desconocido');
                    this.isConnected = false;
                    this.connection = null; // Limpiar la conexión rota
                    this.channel = null; // Limpiar el canal roto
                    this.reconnect(); // Intentar reconectar
                });
                this.connection.on('error', (err: any) => {
                    console.error('❌ Error en la conexión de RabbitMQ:', err.message);
                    this.isConnected = false;
                    this.connection = null; // Limpiar la conexión rota
                    this.channel = null; // Limpiar el canal roto
                    this.reconnect(); // Intentar reconectar
                });

                console.log('Creando canal de RabbitMQ...');
                this.channel = await this.connection.createChannel();
                
                // Configurar exchanges
                await this.setupExchanges();
                
                // Configurar colas
                await this.setupQueues();
                
                this.isConnected = true;
                console.log('✅ Conexión a RabbitMQ establecida correctamente');
                return; // Si todo sale bien, salimos del bucle
            } catch (error: any) {
                console.error(`❌ Error conectando a RabbitMQ (Intento ${retries + 1}/${MAX_RETRIES}):`, error.message);
                retries++;
                if (retries < MAX_RETRIES) {
                    console.log(`Reintentando en ${RETRY_DELAY_MS / 1000} segundos...`);
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
                } else {
                    console.error('❌ Máximo de reintentos alcanzado. No se pudo conectar a RabbitMQ. La aplicación podría no funcionar correctamente.');
                    this.isConnected = false;
                    throw error; // Propagamos el error final
                }
            }
        }
    }

    // Método privado para manejar la lógica de reconexión tras una desconexión
    private async reconnect(): Promise<void> {
        // Evita múltiples intentos de reconexión si ya se está reconectando
        if (this.isConnected) {
            return;
        }

        console.log('Iniciando proceso de reconexión automática...');
        // Limpia el estado para forzar un intento de conexión nuevo
        this.connection = null; 
        this.channel = null;
        this.isConnected = false;

        try {
            // Un pequeño retardo antes de empezar la secuencia de reintentos de `connect`
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS)); 
            await this.connect(); // Reutiliza la lógica de reintento de `connect()`
        } catch (error) {
            console.error('❌ Fallo la reconexión automática a RabbitMQ:', error);
            // Aquí puedes añadir lógica para notificaciones, etc.
        }
    }

    private async setupExchanges(): Promise<void> {
        if (!this.channel) throw new Error('Canal no disponible para configurar exchanges.');

        // Exchange para eventos de avatar (¡Ajustado de 'user.events' a 'avatar.events' si es lo que quieres!)
        // Si tu otro servicio publica en 'user.events', este debería ser 'user.events'
        await this.channel.assertExchange('user.events', 'topic', { // Mantenemos 'user.events' para consistencia con el otro código
            durable: true,
            autoDelete: false
        });

        console.log('✅ Exchange "user.events" configurado');
    }

    private async setupQueues(): Promise<void> {
        if (!this.channel) throw new Error('Canal no disponible para configurar colas.');

        // Cola para eventos de creación de perfil (¡Asegúrate que el nombre de la cola sea correcto!)
        await this.channel.assertQueue('user.profile.created', {
            durable: true,
            autoDelete: false
        });

        // Binding: user.profile.created -> user.events con routing key "user.created"
        // Este binding necesita que el exchange 'user.events' exista y que tu productor publique con 'user.created'
        await this.channel.bindQueue('user.profile.created', 'user.events', 'user.created');

        console.log('✅ Cola "user.profile.created" configurada y enlazada');
    }

    public getChannel(): any {
        if (!this.channel || !this.isConnected) {
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
            // Intenta reconectar si no hay conexión activa antes de publicar
            if (!this.isConnected) {
                console.warn('⚠️ Intentando publicar mensaje sin conexión activa a RabbitMQ. Intentando reconectar...');
                try {
                    await this.connect(); // Llama a connect para reconectar con reintentos
                } catch (reconError) {
                    console.error('❌ Fallo la reconexión al intentar publicar. Mensaje no publicado.');
                    return false;
                }
            }
            
            // Si la conexión se estableció (o ya estaba), obtenemos el canal
            const channel = this.getChannel(); 
            const messageBuffer = Buffer.from(JSON.stringify(message));
            
            // Publica el mensaje
            const result = channel.publish(exchange, routingKey, messageBuffer, {
                persistent: true, // Persiste el mensaje si RabbitMQ se reinicia
                timestamp: Date.now()
            });

            if (result) {
                console.log(`📤 Mensaje publicado en ${exchange} con routing key: ${routingKey}`);
            } else {
                console.warn(`⚠️ Mensaje en ${exchange} con ${routingKey} en cola local (buffer lleno).`);
                // Esto no es un error de conexión, solo que el buffer está lleno.
                // Para una confirmación de entrega real, necesitarías 'publisher confirms'.
            }

            return result;
        } catch (error) {
            console.error('❌ Error publicando mensaje:', error);
            return false;
        }
    }
}