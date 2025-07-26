import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { IEmailService } from '../../application/services/IEmailService';

export class EmailService implements IEmailService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = process.env.BREVO_API_KEY || '';
    this.baseUrl = 'https://api.brevo.com/v3/smtp/email';
  }

  async sendWelcomeEmail(userData: {
    id: string;
    name: string;
    email: string;
    plan: number;
    joinDate: Date;
  }): Promise<boolean> {
    try {
      if (!this.apiKey) {
        console.warn('BREVO_API_KEY no está configurada, omitiendo envío de correo');
        return false;
      }

      const planName = userData.plan === 1 ? 'Normal' : 'Pro';
      const joinDate = userData.joinDate.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const htmlContent = this.generateWelcomeEmailHTML(userData.id, userData.name, planName, joinDate);
      const logoAttachment = this.getLogoAttachment();

      const emailData: any = {
        sender: { 
          name: 'Winterra', 
          email: 'support@winterra.lat' 
        },
        to: [{ 
          email: userData.email, 
          name: userData.name 
        }],
        subject: '¡Bienvenido a Winterra! 🎉',
        htmlContent: htmlContent
      };

      // Agregar adjunto del logo si está disponible
      if (logoAttachment) {
        emailData.attachment = [logoAttachment];
      }

      const response = await axios.post(
        this.baseUrl,
        emailData,
        {
          headers: {
            'api-key': this.apiKey,
            'Content-Type': 'application/json',
            'accept': 'application/json'
          }
        }
      );

      console.log('Correo de bienvenida enviado exitosamente a:', userData.email);
      return true;
    } catch (error) {
      console.error('Error enviando correo de bienvenida:', error);
      return false;
    }
  }

  private getLogoAttachment(): any {
    try {
      const logoPath = path.resolve(__dirname, '../../../assets/WinterraTextoSinFondo.png');
      if (fs.existsSync(logoPath)) {
        const logoBuffer = fs.readFileSync(logoPath);
        return {
          name: 'winterra-logo.png',
          content: logoBuffer.toString('base64')
        };
      }
      console.warn('Logo no encontrado en:', logoPath);
      return null;
    } catch (error) {
      console.error('Error leyendo el logo:', error);
      return null;
    }
  }

  private generateWelcomeEmailHTML(userId: string, userName: string, planName: string, joinDate: string): string {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido a Winterra</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%);
            color: #F9FAFB;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: #16213E;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }
          .header {
            background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
          }
          .logo {
            width: 120px;
            height: auto;
            margin-bottom: 20px;
            border-radius: 12px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          }
          .welcome-text {
            font-size: 28px;
            font-weight: bold;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          }
          .subtitle {
            font-size: 16px;
            opacity: 0.9;
            margin: 10px 0 0 0;
          }
          .content {
            padding: 40px 30px;
          }
          .greeting {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #F9FAFB;
          }
          .message {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
            color: #E5E7EB;
          }
          .user-info {
            background: #1F2937;
            border-radius: 12px;
            padding: 24px;
            margin: 30px 0;
            border-left: 4px solid #3B82F6;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
            padding: 8px 0;
            border-bottom: 1px solid #374151;
          }
          .info-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          .info-label {
            font-weight: 600;
            color: #9CA3AF;
          }
          .info-value {
            font-weight: 500;
            color: #F9FAFB;
          }
          .plan-badge {
            background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
            color: #FEF3C7;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
          }
          .features {
            margin: 30px 0;
          }
          .feature-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #F9FAFB;
          }
          .feature-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .feature-item {
            display: flex;
            align-items: center;
            margin-bottom: 12px;
            padding: 12px;
            background: #1F2937;
            border-radius: 8px;
            border-left: 3px solid #10B981;
          }
          .feature-icon {
            width: 20px;
            height: 20px;
            margin-right: 12px;
            color: #10B981;
          }
          .feature-text {
            color: #E5E7EB;
            font-size: 14px;
          }
          .footer {
            background: #111827;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #374151;
          }
          .footer-text {
            color: #9CA3AF;
            font-size: 14px;
            margin-bottom: 15px;
          }
          .social-links {
            margin-top: 20px;
          }
          .social-link {
            display: inline-block;
            margin: 0 10px;
            color: #3B82F6;
            text-decoration: none;
            font-weight: 500;
          }
          .social-link:hover {
            color: #60A5FA;
          }
          @media (max-width: 600px) {
            .container {
              margin: 10px;
              border-radius: 12px;
            }
            .header, .content, .footer {
              padding: 20px;
            }
            .welcome-text {
              font-size: 24px;
            }
            .greeting {
              font-size: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <img src="http://assets.winterra.lat/Logo.png" alt="Winterra Logo" class="logo" />
            <h1 class="welcome-text">¡Bienvenido a Winterra!</h1>
            <p class="subtitle">Tu aventura comienza ahora</p>
          </div>
          
          <div class="content">
            <h2 class="greeting">¡Hola ${userName}! 👋</h2>
            
            <p class="message">
              Nos emociona darte la bienvenida a Winterra, tu plataforma de productividad y desarrollo personal. 
              Estás a punto de embarcarte en una aventura increíble donde podrás mejorar tus hábitos, 
              conectar con otros usuarios y alcanzar tus metas.
            </p>
            
            <div class="user-info">
              <div class="info-row">
                <span class="info-label">Nombre:</span>
                <span class="info-value">${userName}</span>
              </div>
              <div class="info-row">
                <span class="info-label">ID de Usuario:</span>
                <span class="info-value" style="font-family: monospace; font-size: 12px; color: #60A5FA;">${userId}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Plan:</span>
                <span class="plan-badge">${planName}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Fecha de registro:</span>
                <span class="info-value">${joinDate}</span>
              </div>
            </div>
            
            <div class="features">
              <h3 class="feature-title">🎯 Lo que puedes hacer en Winterra:</h3>
              <ul class="feature-list">
                <li class="feature-item">
                  <span class="feature-icon">✅</span>
                  <span class="feature-text">Crear y gestionar hábitos personalizados</span>
                </li>
                <li class="feature-item">
                  <span class="feature-icon">✅</span>
                  <span class="feature-text">Conectar con amigos y formar comunidades</span>
                </li>
                <li class="feature-item">
                  <span class="feature-icon">✅</span>
                  <span class="feature-text">Ganar puntos y desbloquear logros</span>
                </li>
                <li class="feature-item">
                  <span class="feature-icon">✅</span>
                  <span class="feature-text">Seguir tu progreso con estadísticas detalladas</span>
                </li>
                <li class="feature-item">
                  <span class="feature-icon">✅</span>
                  <span class="feature-text">Participar en desafíos y competencias</span>
                </li>
              </ul>
            </div>
            
            <p class="message">
              ¡Comienza tu viaje ahora mismo! Explora todas las funcionalidades que Winterra tiene para ofrecerte 
              y descubre cómo puedes transformar tu vida un hábito a la vez.
            </p>
          </div>
          
          <div class="footer">
            <p class="footer-text">
              Gracias por unirte a nuestra comunidad. ¡Esperamos verte pronto!
            </p>
            <p class="footer-text">
              Si tienes alguna pregunta, no dudes en contactarnos en support@winterra.lat
            </p>
            <div class="social-links">
              <a href="#" class="social-link">Soporte</a>
              <a href="#" class="social-link">Documentación</a>
              <a href="#" class="social-link">Comunidad</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }
} 