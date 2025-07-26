import amqp from 'amqplib';
import axios from 'axios';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
const BASE_URL = process.env.AVATAR_API_BASE_URL || 'http://avatar-service:3000';

console.log('🔧 Consumer Configuration:');
console.log('RABBITMQ_URL:', RABBITMQ_URL);
console.log('AVATAR_API_BASE_URL:', BASE_URL);

// --- NUEVAS CONSTANTES PARA REINTENTOS ---
const MAX_RETRIES = 5; // Número máximo de intentos de reconexión
const RETRY_DELAY_MS = 5000; // Retraso entre intentos en milisegundos (5 segundos)
// --- FIN NUEVAS CONSTANTES ---

async function startConsumer() {
    let retries = 0;

    // --- BUCLE DE REINTENTO ---
    while (retries < MAX_RETRIES) {
        try {
            console.log(`Attempting to connect to RabbitMQ (Attempt ${retries + 1}/${MAX_RETRIES})...`);
            const conn = await amqp.connect(RABBITMQ_URL);
            const channel = await conn.createChannel();

            const exchange = 'user.events';
            const queue = 'avatar.user.created.consumer';

            await channel.assertExchange(exchange, 'topic', { durable: true });
            await channel.assertQueue(queue, { durable: true });
            await channel.bindQueue(queue, exchange, 'user.created');

            console.log('📥 Waiting for USER_CREATED events...');

            channel.consume(queue, async (msg) => {
                if (msg) {
                    const content = msg.content.toString();
                    const event = JSON.parse(content);

                    console.log('🔔 USER_CREATED event received:', event);

                    if (event.eventType === 'USER_CREATED' && event.userId) {
                        try {
                            const payload = {
                                userId: event.userId,
                                experience: 0,
                                level: 1,
                                coins: 100,
                                streakDays: 0
                            };

                            console.log('📤 Sending request to avatar service:', {
                                url: `${BASE_URL}/api/avatars`,
                                payload: payload
                            });

                            const response = await axios.post(`${BASE_URL}/api/avatars`, payload, {
                                timeout: 10000, // 10 segundos de timeout
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
                            
                            console.log('✅ Avatar created successfully for user:', event.userId);
                            console.log('📥 Response:', response.data);

                            channel.ack(msg);
                        } catch (err: any) {
                            console.error('❌ Failed to create avatar:');
                            console.error('Error message:', err.message);
                            console.error('Error response:', err.response?.data);
                            console.error('Error status:', err.response?.status);
                            console.error('Error headers:', err.response?.headers);
                            console.error('Full error:', JSON.stringify(err, null, 2));
                            
                            // No hacer nack para evitar bucle infinito, solo ack y continuar
                            console.log('🔄 Acknowledging message to prevent infinite loop');
                            channel.ack(msg);
                        }
                    } else {
                        console.warn('⚠️ Unrecognized or incomplete message:', content);
                        channel.ack(msg);
                    }
                }
            });

            // Si la conexión fue exitosa, salimos del bucle de reintento
            console.log('🎉 Successfully connected to RabbitMQ!');
            return; 

        } catch (err: any) {
            console.error(`❌ Connection to RabbitMQ failed (Attempt ${retries + 1}/${MAX_RETRIES}):`, err.message);
            retries++;
            if (retries < MAX_RETRIES) {
                console.log(`Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
            } else {
                console.error('❌ Max retries reached. Could not connect to RabbitMQ. Exiting.');
                // Puedes decidir si quieres que el proceso se detenga o siga intentando indefinidamente
                // throw err; // Descomenta esta línea si quieres que el proceso falle después de los reintentos
            }
        }
    }
}

startConsumer();