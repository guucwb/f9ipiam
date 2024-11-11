const fs = require('fs');

// Função que ajusta o telefone para o formato com "9" após o DDD
function adjustPhone(phone) {
    // Verifica se o número começa com "+550"
    if (phone.startsWith('+550')) {
        // Remove o "0" após o "+55"
        phone = '+55' + phone.slice(4);
    }

    // Adiciona o "9" após o DDD (os próximos dois dígitos após +55)
    return phone.slice(0, 5) + '9' + phone.slice(5);
}

// Carrega o JSON convertido
const data = JSON.parse(fs.readFileSync('Ipiranga_converted.json', 'utf-8'));

// Ajusta os números de telefone
data.forEach(entry => {
    if (entry.Telefone) {
        entry.Telefone = adjustPhone(entry.Telefone);
    }
    if (entry.Celular) {
        entry.Celular = adjustPhone(entry.Celular);
    }
});

// Salva o JSON atualizado
fs.writeFileSync('Ipiranga_final.json', JSON.stringify(data, null, 2));
console.log('Telefones ajustados e salvos em Ipiranga_final.json');