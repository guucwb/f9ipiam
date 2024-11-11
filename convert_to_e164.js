const fs = require('fs');

// Função que converte para o formato E.164
function convertToE164(phone) {
    // Remove todos os caracteres não numéricos
    let number = phone.replace(/[^0-9]/g, '');
    
    // Extrai o DDD e remove o zero inicial, se existir
    if (number.length >= 10 && number[0] === '0') {
        number = number.slice(1); // Remove o zero inicial do DDD
    }
    
    // Adiciona o código do país +55
    return `+55${number}`;
}

// Carrega os dados do arquivo JSON
const data = JSON.parse(fs.readFileSync('Ipiranga.json', 'utf-8'));

// Converte todos os telefones para E.164
data.forEach(entry => {
    if (entry.Telefone) {
        entry.Telefone = convertToE164(entry.Telefone);
    }
    if (entry.Celular) {
        entry.Celular = convertToE164(entry.Celular);
    }
});

// Salva o JSON atualizado
fs.writeFileSync('Ipiranga_converted.json', JSON.stringify(data, null, 2));
console.log('Telefones convertidos e salvos em Ipiranga_converted.json');
