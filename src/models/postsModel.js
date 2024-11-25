import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

// Importa a função `conectarAoBanco` do arquivo `dbconfig.js`
// Essa função provavelmente estabelece a conexão com o banco de dados MongoDB

// Chama a função `conectarAoBanco` e armazena a conexão estabelecida na variável `conexao`
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
  // Define uma função assíncrona para buscar todos os posts
  // Obtém uma referência ao banco de dados 'imersao-backend'
  const db = conexao.db('imersao-backend');
  // Obtém uma referência à coleção 'posts' dentro do banco de dados
  const colecao = db.collection('posts');
  // Busca todos os documentos da coleção 'posts' e retorna um array com os resultados
  return colecao.find().toArray();
};

export async function criarPost(novoPost) {
  // Define uma função assíncrona para criar um novo post
  // Obtém uma referência ao banco de dados 'imersao-backend'
  const db = conexao.db('imersao-backend');
  // Obtém uma referência à coleção 'posts' dentro do banco de dados
  const colecao = db.collection('posts');
  // Insere o novo post na coleção 'posts' e retorna um objeto com informações sobre a inserção
  return colecao.insertOne(novoPost);
};

export async function atualizarPost(id, novoPost){
  const db = conexao.db('imersao-backend');
  const colecao = db.collection('posts');
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
};