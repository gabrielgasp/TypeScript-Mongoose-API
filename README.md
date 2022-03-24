
# TypeScript Mongoose API

Este projeto é uma API simples de CRUD de usuários com login e autenticação desenvolvida na arquitetura **MSC**. A intenção foi fazer uma API
com um tema simples para focar no aprendizado de novas stacks.

A API pode ser acessada [aqui](https://typescript-mongoose-api.herokuapp.com/user/list).


## Stacks utilizadas

- Node.js
- TypeScript
- Express
- MongoDB
- Mongoose
- Docker

#### Além das Stacks citadas acima, também foram utilizadas as seguintes bibliotecas:

- `Joi` para fazer a validação do corpo das requisições;
- `JWT` para fazer a autenticação dos usuários logados;
- `Argon2` para fazer o hashing e verificação das senhas armazenadas no banco de dados.


## Rodando localmente

***Para rodar a API localmente certifique-se de ter [Docker](https://docs.docker.com/get-docker/) 
e [Docker-Compose](https://docs.docker.com/compose/install/) instalados em sua maquina.***

Clone o projeto

```bash
  git clone git@github.com:GabrielGaspar447/TypeScript-Mongoose-API.git
```

Entre no diretório do projeto

```bash
  cd TypeScript-Mongoose-API
```

Suba a orquestração de containers

```bash
  docker-compose up -d
```

Para encerrar a API basta executar o comando

```bash
  docker-compose down
```


## Endpoints

### 1 - POST `/user/register`

- Este endpoint permite cadastrar um novo usuário no banco de dados.

- O corpo da requisição deverá seguir o formato exemplificado abaixo:

  ```json
  {
    "email": "john@gmail.com",
	"name": "John Doe",
	"password": "secret_password"
  }
  ```

  - O campo `email` deverá ser preenchido com uma string contendo um email válido.
  - O campo `name`deverá ser preenchido com uma string de no mínimo 3 caracteres.
  - O campo `password` deverá ser preenchido com uma string de no mínimo 6 caracters.

- Uma resposta com status `201` será enviada contendo um token `JWT` no seguinte formato:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```

- Este token deverá ser enviado através do header `Authorization` nos endpoints que requerem autenticação.


### 2 - POST `/user/login`

- Este endpoint permite cadastrar um novo livro na base de dados.

- O corpo da requisição deverá seguir o formato exemplificado abaixo:

  ```json
  {
    "email": "john@gmail.com",
    "password": "secret_password"
  }
  ```

- Uma resposta com status `200` será enviada contendo um token `JWT` no seguinte formato:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```

- Este token deverá ser enviado através do header `Authorization` nos endpoints que requerem autenticação.


### 3 - GET `/user/list`

- Este endpoint permite listar todos usuários cadastrados na base de dados.

- Uma resposta com status `200` será enviada contendo as informações no seguinte formato:

  ```json
  [
	{
		"id": "623ce749b732ee0012f10711",
		"name": "Bobby A. Smith",
		"email": "waino2003@gmail.com"
	},
	{
		"id": "623ce749b732ee0012f10712",
		"name": "Jamie D. Ford",
		"email": "nels1972@hotmail.com"
	},
	{
		"id": "623ce749b732ee0012f10713",
		"name": "Dorothy J. McClure",
		"email": "pink.cris7@gmail.com"
	}
  ]
  ```


### 4 - GET `/user/:id`

- Este endpoint permite trazer as informações de um usuário baseado no id passado na rota.

    ```http
    GET /user/623ce749b732ee0012f10711
    ```

- Uma resposta com status `200` será enviada contendo as informações no seguinte formato:

  ```json
  {
	"email": "waino2003@gmail.com",
	"name": "Bobby A. Smith"
  }
  ```


### 5 - GET `/user/search`

- Este endpoint permite buscar e listar todos usuários que possuam em seu nome a string informada na query `name`. Caso a query não seja informada, todos os usuários serão retornados.

    ```http
    GET /user/search?name=th
    ```

- Uma resposta com status `200` será enviada contendo as informações no seguinte formato:

  ```json
  [
	{
		"id": "623ce749b732ee0012f10711",
		"name": "Bobby A. Smith",
		"email": "waino2003@gmail.com"
	},
	{
		"id": "623ce749b732ee0012f10713",
		"name": "Dorothy J. McClure",
		"email": "pink.cris7@gmail.com"
	}
  ]
  ```


### 6 - PUT `/user/update`

- Para utilizar este endpoint é necessário informar um token válido através do header `Authorization`.

- Este endpoint permite atualizar os dados cadastrais do usuário logado. A identificação do usuário acontece atráves do token.

- O corpo da requisição deverá seguir o formato exemplificado abaixo, sendo todos os campos opcionais:

  ```json
  {
    "email": "john@gmail.com",
	"name": "John Doe",
	"password": "secret_password"
  }
  ```

  - O campo `email` deverá ser preenchido com uma string contendo um email válido.
  - O campo `name`deverá ser preenchido com uma string de no mínimo 3 caracteres.
  - O campo `password` deverá ser preenchido com uma string de no mínimo 6 caracters.

- Uma resposta com status `200` será enviada com a seguinte mensagem:

  ```json
  {
    "message": "User successfully updated"
  }
  ```


### 7 - PUT `/user/delete`

- Para utilizar este endpoint é necessário informar um token válido através do header `Authorization`.

- Este endpoint permite excluir o usuário logado da banco de dados. A identificação do usuário acontece atráves do token.

- Uma resposta com status `200` será enviada com a seguinte mensagem:

  ```json
  {
    "message": "User successfully deleted"
  }
  ```
## Aprendizados

Esta foi minha primeira experiência no desenvolvimento de uma API usando TypeScript e Mongoose,
duas Stacks que considero muito relevantes para um desenvolvedor backend em node atualmente.
 
Além do desafio natural que é adaptar para o TS o uso das stacks e libs que já estamos
acostumados no JS, tive que aprender, implementar e utilizar o Moongose para
manipular o banco de dados.
 
Também foi minha primeira vez utilizando a lib Argon2 para fazer
o hashing das senhas ao cadastrar um usuário no banco de dados e a validação da hash com a
senha informada pelo cliente ao efetuar o Login. Por já ter experiência com bcrypt em projetos
anteriores não tive dificuldades em sua implementação.
 
Inicialmente as validações do corpo das requisições eram feitas através da lib Joi, porém ao
estudar um pouco mais sobre Moongose percebi que poderia realizar estas mesmas validações
através dele. Realizei a refatoração mas percebi que, embora o código continuasse funcionando
esperado, o nível de complexidade no tratamento dos erros aumento (talvez pela minha falta de
experiência com o Mongoose) e portanto optei por manter a validação com Joi na branch master e
e deixar as validações com Moongose em uma branch separada para fins de referência e estudo.
