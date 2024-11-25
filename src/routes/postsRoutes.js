import express from 'express'; // Importa o módulo Express para criar a API
import multer from 'multer'; // Importa o módulo Multer para gerenciar uploads de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from '../controllers/postsController.js'; // Importa as funções controladoras de posts
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:8000',
  optionsSucessStatus: 200
}

// Configura o armazenamento de arquivos para o Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) { // Define o diretório de destino para os arquivos
    cb(null, 'uploads/'); // Define o caminho como 'uploads/'
  },
  filename: function (req, file, cb) { // Define o nome do arquivo
    cb(null, file.originalname); // Utiliza o nome original do arquivo enviado
  }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: './uploads', storage }); // Define o destino e o armazenamento

// Define uma função para configurar as rotas da aplicação
const routes = (app) => {
  // Define que a API utilizará JSON para comunicação
  app.use(express.json());

  app.use(cors(corsOptions));

  // Rota para listar todos os posts (método GET)
  app.get('/posts', listarPosts); 

  // Rota para criar um novo post (método POST)
  app.post('/posts', postarNovoPost); 

  // Rota para upload de imagem e criação de post (método POST)
  app.post('/upload', upload.single('imagem'), uploadImagem);
  
  app.put('/upload/:id', atualizarNovoPost)
};

// Exporta a função `routes` para ser utilizada no arquivo principal da API
export default routes;