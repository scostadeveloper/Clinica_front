/**
 * Valida um CPF brasileiro
 * @param cpf - CPF com ou sem formatação
 * @returns true se o CPF for válido, false caso contrário
 */
export function validateCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  const cleanCpf = cpf.replace(/[^\d]/g, '');
  
  // Verifica se tem 11 dígitos
  if (cleanCpf.length !== 11) return false;
  
  // Verifica se não são todos iguais (ex: 111.111.111-11)
  if (/^(\d)\1{10}$/.test(cleanCpf)) return false;
  
  // Validação do CPF (algoritmo oficial)
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (10 - i);
  }
  let digit1 = 11 - (sum % 11);
  if (digit1 > 9) digit1 = 0;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCpf.charAt(i)) * (11 - i);
  }
  let digit2 = 11 - (sum % 11);
  if (digit2 > 9) digit2 = 0;
  
  return cleanCpf.charAt(9) == digit1.toString() && cleanCpf.charAt(10) == digit2.toString();
}

/**
 * Aplica máscara de CPF
 * @param cpf - CPF sem formatação
 * @returns CPF formatado como 000.000.000-00
 */
export function formatCPF(cpf: string): string {
  const cleanCpf = cpf.replace(/[^\d]/g, '');
  
  if (cleanCpf.length <= 3) return cleanCpf;
  if (cleanCpf.length <= 6) return `${cleanCpf.slice(0, 3)}.${cleanCpf.slice(3)}`;
  if (cleanCpf.length <= 9) return `${cleanCpf.slice(0, 3)}.${cleanCpf.slice(3, 6)}.${cleanCpf.slice(6)}`;
  
  return `${cleanCpf.slice(0, 3)}.${cleanCpf.slice(3, 6)}.${cleanCpf.slice(6, 9)}-${cleanCpf.slice(9, 11)}`;
}

/**
 * Remove formatação do CPF
 * @param cpf - CPF formatado
 * @returns CPF apenas com números
 */
export function cleanCPF(cpf: string): string {
  return cpf.replace(/[^\d]/g, '');
}

/**
 * Gera um CPF válido para testes
 * @returns CPF válido sem formatação
 */
export function generateValidCPF(): string {
  const num = Math.floor(Math.random() * 900000000) + 100000000;
  let cpf = num.toString();
  
  // Calcular primeiro dígito
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf[i]) * (10 - i);
  }
  let digit1 = 11 - (sum % 11);
  if (digit1 > 9) digit1 = 0;
  cpf += digit1;
  
  // Calcular segundo dígito
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf[i]) * (11 - i);
  }
  let digit2 = 11 - (sum % 11);
  if (digit2 > 9) digit2 = 0;
  cpf += digit2;
  
  return cpf;
}
