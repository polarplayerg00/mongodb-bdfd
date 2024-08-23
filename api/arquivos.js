const mongoose = require('mongoose');

// Conectando ao MongoDB usando a variável de ambiente
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const arquivoSchema = new mongoose.Schema({
    nome: String,
    caminho: String,
    tamanho: Number,
    dataCriacao: { type: Date, default: Date.now },
});

const Arquivo = mongoose.model('Arquivo', arquivoSchema);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const novoArquivo = new Arquivo({
            nome: req.body.nome,
            caminho: req.body.caminho,
            tamanho: req.body.tamanho,
        });

        try {
            await novoArquivo.save();
            res.status(201).send('Arquivo salvo com sucesso');
        } catch (err) {
            res.status(500).send('Erro ao salvar o arquivo: ' + err);
        }
    } else {
        res.status(405).send('Método não permitido');
    }
}
