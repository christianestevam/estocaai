// src/utils/formatCNPJ.ts
export const formatCNPJ = (value: string) => {
    // Remove tudo que não é número
    value = value.replace(/\D/g, '');
  
    // Formata o CNPJ como XX.XXX.XXX/XXXX-XX
    if (value.length <= 14) {
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    
    return value;
  };
  