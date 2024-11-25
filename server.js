import express from 'express';
// Importa o módulo Express, que é a base para criar aplicações web Node.js. Ele fornece um conjunto de funcionalidades para lidar com requisições HTTP e renderizar respostas.

import routes from './src/routes/postsRoutes.js';
// Importa o módulo `routes` que contém as definições das rotas da aplicação. Este módulo provavelmente contém funções que mapeiam URLs a funções controladoras que processam as requisições.

const app = express();
// Cria uma instância do Express, que será utilizada para criar a aplicação web. Essa instância é o objeto principal onde todas as configurações e rotas serão definidas.

app.use(express.static('uploads'));

routes(app);
// Chama a função `routes` passando a instância do Express como argumento. Essa função provavelmente itera sobre as rotas definidas e as registra na aplicação.

app.listen(3000, () => {
  console.log('Servidor escutando...');
});
// Inicia o servidor Express na porta 3000. A função de callback é executada quando o servidor está pronto para receber requisições.