/**
 * Sistema de logs seguro para a aplicação
 * Remove logs sensíveis em produção e permite debug em desenvolvimento
 */

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';
  private logsEnabled = process.env.NEXT_PUBLIC_ENABLE_LOGS === 'true';

  /**
   * Log de desenvolvimento - só mostra em desenvolvimento e se habilitado
   * Use para dados que podem conter informações sensíveis
   */
  dev(message: string, data?: any) {
    if (this.isDevelopment && this.logsEnabled) {
      console.log(`🔧 [DEV] ${message}`, data);
    }
  }

  /**
   * Log de informação - sempre visível mas sem dados sensíveis
   * Use para informações gerais do fluxo da aplicação
   */
  info(message: string) {
    console.log(`ℹ️ [INFO] ${message}`);
  }

  /**
   * Log de sucesso - sempre visível mas sem dados sensíveis
   * Use para confirmar operações bem-sucedidas
   */
  success(message: string) {
    console.log(`✅ [SUCCESS] ${message}`);
  }

  /**
   * Log de aviso - sempre visível
   * Use para situações que requerem atenção
   */
  warn(message: string) {
    console.warn(`⚠️ [WARN] ${message}`);
  }

  /**
   * Log de erro - sempre visível mas sem dados sensíveis
   * Use para erros e exceções
   */
  error(message: string, error?: Error | any) {
    const errorMessage = error?.message || error || 'Erro desconhecido';
    console.error(`❌ [ERROR] ${message}`, errorMessage);
  }

  /**
   * Log de autenticação - seguro para produção
   * Remove dados sensíveis mas mantém informações úteis
   */
  auth(action: string, details?: { email?: string; unidade?: string }) {
    if (this.isDevelopment && this.logsEnabled) {
      console.log(`🔐 [AUTH] ${action}`, details);
    } else {
      // Em produção, só mostra a ação sem dados sensíveis
      console.log(`🔐 [AUTH] ${action}`);
    }
  }

  /**
   * Log de API - seguro para produção
   * Remove dados sensíveis das requisições
   */
  api(method: string, endpoint: string, success: boolean = true) {
    const status = success ? '✅' : '❌';
    console.log(`🌐 [API] ${status} ${method.toUpperCase()} ${endpoint}`);
  }
}

export const logger = new Logger();

// Exportar tipos para TypeScript
export type LogLevel = 'dev' | 'info' | 'success' | 'warn' | 'error' | 'auth' | 'api';
