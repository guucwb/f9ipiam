const fs = require('fs');

// Função para garantir que o número tenha 9 dígitos após o DDD
function ensureNineDigits(phone) {
    // Verifica se o número começa com "+55" e tem pelo menos 13 caracteres no total
    if (phone.startsWith('+55') && phone.length > 12) {
        // Extrai o DDD e o restante do número
        const ddd = phone.slice(3, 5); // Extrai o DDD
        let number = phone.slice(5);   // Extrai o número após o DDD

        // Se houver 10 dígitos após o DDD e o primeiro for "9", remove o primeiro "9"
        if (number.length === 10 && number[0] === '9') {
            number = number.slice(1);
        }

        // Retorna o número formatado com o prefixo +55 e o DDD
        return `+55${ddd}${number}`;
    }

    // Retorna o número sem alteração se já estiver correto
    return phone;
}

// Carrega o JSON convertido
const data = JSON.parse(fs.readFileSync('Ipiranga_final.json', 'utf-8'));

// Ajusta os números de telefone
data.forEach(entry => {
    if (entry.Telefone) {
        entry.Telefone = ensureNineDigits(entry.Telefone);
    }
    if (entry.Celular) {
        entry.Celular = ensureNineDigits(entry.Celular);
    }
});

// Salva o JSON atualizado
fs.writeFileSync('Ipiranga_corrected.json', JSON.stringify(data, null, 2));
console.log('Telefones ajustados para 9 dígitos e salvos em Ipiranga_corrected.json');