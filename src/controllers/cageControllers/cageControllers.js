const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());


mongoose.connect('mongodb://localhost:27017/sistemaGaiolas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const gaiolaSchema = new mongoose.Schema({
  id: { type: String, required: true },
  dimensoes: { type: String, required: true },
  material: { type: String, required: true },
  ocupacao: { type: String, required: false },
  localizacao: { type: String, required: false }
});

const Gaiola = mongoose.model('Gaiola', gaiolaSchema);


app.post('/gaiolas', async (req, res) => {
  try {
    const gaiola = new Gaiola(req.body);
    await gaiola.save();
    res.status(201).json(gaiola);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cadastrar a gaiola' });
  }
});


app.get('/gaiolas', async (req, res) => {
  try {
    const gaiolas = await Gaiola.find();
    res.json(gaiolas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar as gaiolas' });
  }
});


app.put('/gaiolas/:id', async (req, res) => {
  try {
    const gaiola = await Gaiola.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!gaiola) return res.status(404).json({ error: 'Gaiola não encontrada' });
    res.json(gaiola);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar a gaiola' });
  }
});


app.delete('/gaiolas/:id', async (req, res) => {
  try {
    const gaiola = await Gaiola.findOneAndDelete({ id: req.params.id });
    if (!gaiola) return res.status(404).json({ error: 'Gaiola não encontrada' });
    res.json({ message: 'Gaiola removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover a gaiola' });
  }
});


app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
