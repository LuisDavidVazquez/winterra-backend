import amqp from 'amqplib';

export class RabbitMQConnection {
  private static instance: RabbitMQConnection;
  private connection: any = null;
  private channel: any = null;

  private constructor() {}

  public static getInstance(): RabbitMQConnection {
    if (!RabbitMQConnection.instance) {
      RabbitMQConnection.instance = new RabbitMQConnection();
    }
    return RabbitMQConnection.instance;
  }

  public async connect(): Promise<void> {
    try {
      const rabbitmqUrl = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
      
      console.log('Conectando a RabbitMQ...');
      this.connection = await amqp.connect(rabbitmqUrl);
      
      console.log('Creando canal de RabbitMQ...');
      this.channel = await this.connection.createChannel();
      
      // Configurar exchanges
      await this.setupExchanges();
      
      // Configurar colas
      await this.setupQueues();
      
      console.log('✅ Conexión a RabbitMQ establecida correctamente');
    } catch (error) {
      console.error('❌ Error conectando a RabbitMQ:', error);
      throw error;
    }
  }

  private async setupExchanges(): Promise<void> {
    if (!this.channel) throw new Error('Canal no disponible');

    // Exchange para eventos de usuario
    await this.channel.assertExchange('user.events', 'topic', {
      durable: true,
      autoDelete: false
    });

    console.log('✅ Exchange "user.events" configurado');
  }

  private async setupQueues(): Promise<void> {
    if (!this.channel) throw new Error('Canal no disponible');

    // Cola para eventos de creación de perfil
    await this.channel.assertQueue('user.profile.created', {
      durable: true,
      autoDelete: false
    });

    // Binding: user.profile.created -> user.events con routing key "user.created"
    await this.channel.bindQueue('user.profile.created', 'user.events', 'user.created');

    console.log('✅ Cola "user.profile.created" configurada');
  }

  public getChannel(): any {
    if (!this.channel) {
      throw new Error('Canal de RabbitMQ no disponible. Asegúrate de llamar connect() primero.');
    }
    return this.channel;
  }

  public async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
    }
    if (this.connection) {
      await this.connection.close();
    }
    console.log('🔌 Conexión a RabbitMQ cerrada');
  }

  public async publishMessage(
    exchange: string,
    routingKey: string,
    message: any
  ): Promise<boolean> {
    try {
      const channel = this.getChannel();
      const messageBuffer = Buffer.from(JSON.stringify(message));
      
      const result = channel.publish(exchange, routingKey, messageBuffer, {
        persistent: true,
        timestamp: Date.now()
      });

      if (result) {
        console.log(`📤 Mensaje publicado en ${exchange} con routing key: ${routingKey}`);
      } else {
        console.error(`❌ Error publicando mensaje en ${exchange}`);
      }

      return result;
    } catch (error) {
      console.error('❌ Error publicando mensaje:', error);
      return false;
    }
  }
} 