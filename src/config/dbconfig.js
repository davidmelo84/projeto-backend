import { MongoClient } from "mongodb";

export default async function conectarAoBanco(stringConexao) {
  // Declara uma variável para armazenar a instância do cliente MongoDB
  let mongoClient;

  try {
    // Cria uma nova instância do cliente MongoDB, passando a string de conexão e opções de conexão
    // As opções useNewUrlParser e useUnifiedTopology são recomendadas para evitar problemas de depreciação
    mongoClient = new MongoClient(stringConexao, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conectando ao cluster do banco de dados...');

    // Tenta estabelecer a conexão com o banco de dados MongoDB
    await mongoClient.connect();
    console.log('Conectado ao MongoDB Atlas com sucesso!');

    // Retorna o cliente MongoDB para que possa ser utilizado em outras partes do código
    return mongoClient;
  } catch (error) {
    // Caso ocorra algum erro durante a conexão, exibe uma mensagem de erro no console e encerra o processo
    console.error('Falha na conexão com o banco!', error);
    process.exit();
  }
}