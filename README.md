# FoodExplorer - API

## 📖 Sobre o projeto

O **FoodExplorer** é um cardápio digital para um restaurante fictício, desenvolvido como parte do desafio final da formação Full Stack da Rocketseat.  

Composto por um front-end que consome sua própria API, o FoodExplorer oferece funcionalidades para navegação, seleção de pratos, pesquisa e gerenciamento de pedidos.  

Este repositório contém o **back-end** do projeto, incluindo a lógica de tabelas e armazenamento de dados, além de ferramentas para suportar todas as funcionalidades.

> 🚀 **Tecnologias principais:** React.js no front-end e Node.js no back-end.

---

## 🗂 Estrutura do projeto

O banco de dados do projeto foi modelado com as seguintes tabelas:

- **Usuários**  
  Para gerenciar contas de clientes e administradores.

- **Pratos**  
  Representam os itens disponíveis no cardápio.

- **Ingredientes dos pratos**  
  Listam os ingredientes associados a cada prato.

- **Favoritos**  
  Permitem que usuários marquem pratos como favoritos.

- **Carrinhos**  
  Gerenciam os itens que os usuários adicionam para compra.

- **Itens dos carrinhos**  
  Detalham os produtos selecionados dentro de um carrinho.

- **Pedidos**  
  Armazenam os pedidos realizados pelos usuários.

- **Itens dos pedidos**  
  Descrevem os produtos e quantidades contidos em cada pedido.

---

## 🛠️ Tecnologias utilizadas

Este projeto utiliza as seguintes tecnologias e bibliotecas:

- **Bcrypt.js**  

- **CORS**  

- **Dotenv**  

- **Express.js**  

- **express-async-errors**  

- **JSON Web Token (JWT)**  

- **Knex.js**  

- **Node.js**  

- **Multer**  

- **PM2**  

- **SQLite / SQLite3**  

---

## 🚀 Como utilizar

O back-end está hospedado em: [FoodExplorer API](https://foodexplorer-api-79ps.onrender.com).  
⚠️ *Nota:* Por utilizar uma hospedagem gratuita, o servidor pode apresentar pequenos atrasos no tempo de resposta.  

Você também pode executar o projeto localmente. Siga os passos abaixo:

### Passos para rodar localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/yaradaudt/foodexplorer-api 
   ```

2. **Acesse a pasta do projeto:**
   ```bash
    cd foodexplorer-api
    ```

3. **Instale as dependências:**
   ```bash
    npm install
    ```

4. **Execute as migrações para configurar o banco de dados:**
   ```bash
    npm run migrate
    ```

5. **Em desenvolvimento: inicie o servidor:**
    ```bash
    npm run dev
    ```

6. **Em produção: crie um arquivo .env baseado no exemplo fornecido (.env.example) e preencha os campos em branco.**

7. **Inicie o servidor:**
   ```bash
    npm start
    ```

## 🚀 O projeto está rodando! 

## 📝 Licença

Este projeto está licenciado sob a licença MIT.

---

#### Feito com 💜 por Yara. 
Fique à vontade para explorar, contribuir e compartilhar! 😄
