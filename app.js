const express = require('express');
const app = express();
const professorRoutes = require('./routes/appRouters');

app.use(express.json());
app.use('/professores', professorRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
