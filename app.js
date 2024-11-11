// Importe os módulos necessários
const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Carrega os dados do arquivo JSON
const data = JSON.parse(fs.readFileSync('Ipiranga_final.json', 'utf-8'));

// Função para formatar o número de telefone para padronização
function formatPhone(phone) {
    return phone.replace(/[^0-9]/g, '');
}

// Endpoint que recebe o número de telefone como parâmetro
app.get('/assessor', (req, res) => {
    const phone = formatPhone(req.query.telefone);

    // Procura o assessor responsável pelo telefone formatado
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

// Inicia o servidor
app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
