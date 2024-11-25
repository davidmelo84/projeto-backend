import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModel.js";
import fs from 'fs';
import gerarDescricaoComGemini from "../services/geminiServices.js";

// Importa as funções `getTodosPosts` e `criarPost` do módulo `postsModel.js`
// Essas funções provavelmente interagem com o banco de dados para obter e criar posts.
// Importa o módulo `fs` para realizar operações no sistema de arquivos (neste caso, renomear arquivos)

export async function listarPosts (req, res){
  // Define uma função assíncrona para listar todos os posts
  // `req`: Objeto de requisição HTTP
  // `res`: Objeto de resposta HTTP

  // Chama a função `getTodosPosts` para buscar todos os posts do banco de dados
  const posts = await getTodosPosts();
  // Envia os posts encontrados como resposta em formato JSON com status 200 (sucesso)
  res.status(200).json(posts);
};

export async function postarNovoPost(req, res){
  // Define uma função assíncrona para criar um novo post
  // `req`: Objeto de requisição HTTP (contém os dados do novo post no corpo)
  // `res`: Objeto de resposta HTTP

  // Obtém os dados do novo post do corpo da requisição
  const novoPost = req.body;

  // Utiliza um bloco `try...catch` para tratar possíveis erros durante a criação do post
  try {
    // Chama a função `criarPost` para inserir o novo post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch (erro) {
    // Em caso de erro, registra o erro no console e envia uma mensagem de erro genérica ao cliente
    console.error(erro.message);
    res.status(500).json({'Erro':'Falha na requisição'});
  };
}

export async function uploadImagem(req, res){
  // Define uma função assíncrona para fazer upload de uma imagem e criar um novo post
  // `req`: Objeto de requisição HTTP (contém o arquivo da imagem)
  // `res`: Objeto de resposta HTTP

  // Cria um objeto para representar o novo post, incluindo a URL da imagem
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname, // Nome original do arquivo enviado
    alt:""
  };

  // Utiliza um bloco `try...catch` para tratar possíveis erros durante a criação do post e o upload da imagem
  try {
    // Insere o novo post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Cria um novo nome para a imagem, utilizando o ID do post criado
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
    // Renomeia o arquivo da imagem para o novo nome
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
    res.status(200).json(postCriado);
  } catch (erro) {
    // Em caso de erro, registra o erro no console e envia uma mensagem de erro genérica ao cliente
    console.error(erro.message);
    res.status(500).json({'Erro':'Falha na requisição'});
  };
};

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`
   try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`)
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
   }  
    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({'Erro':'Falha na requisição'})
  };
};