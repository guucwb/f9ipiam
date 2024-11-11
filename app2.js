const express = require('express');
const fs = require('fs');
const serverless = require('serverless-http');

const app = express();

// Carrega o JSON
const data = JSON.parse(fs.readFileSync('./Ipiranga_corrected.json', 'utf-8'));

// Função para formatar o número
function formatPhone(phone) {
    return phone.replace(/[^0-9]/g, '');
}

// Endpoint da API para buscar assessor
app.get('/assessor', (req, res) => {
    const phone = formatPhone(req.query.telefone);

    // Busca pelo assessor responsável
    const result = data.find(entry => 
        formatPhone(entry.Telefone) === phone || formatPhone(entry.Celular) === phone
    );

    // Retorna o resultado
    if (result) {
        res.json({ "Assessor Responsável": result["Assessor Responsável"] });
    } else {
        res.status(404).json({ error: "Assessor não encontrado para o telefone fornecido." });
    }
});

// Exporta o handler para Lambda
module.exports.handler = serverless(app);