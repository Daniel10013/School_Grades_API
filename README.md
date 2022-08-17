
# API Escola

#### Api realizada em Node.js para execução de algumas funções que serão listadas abaixo
#### A api utiliza um arquivo JSON como database



## Documentação da API

#### Cria um novo item

```http
  POST /grades/create
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `student` | `string` | **Obrigatório**. Nome do estudante a ser registrado |
| `subject` | `string` | **Obrigatório**. Matéria da nota a ser registrada|
| `type` | `string` | **Obrigatório**. Tipo da matéria |
| `value` | `string` | **Obrigatório**. Nota  |

#### Atualiza um item

```http
  GET /grades/update/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `student` | `string` | **Opcional**. Nome do estudante a ser atualizado |
| `subject` | `string` | **Opcional**. Matéria da nota a ser atualizado|
| `type` | `string` | **Opcional**. Tipo da matéria |
| `value` | `string` | **Opcional**. Nota  |

#### Retorna o valor total da nota de um aluno em uma matéria

```http
  POST /grades/notas/total
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `student` | `string` | **Obrigatório**. Nome do estudante |
| `subject` | `string` | **Obrigatório**. Matéria para checar a nota|

#### Retorna a média da nota de um aluno em uma matéria

```http
  POST /grades/notas/media
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `student` | `string` | **Obrigatório**. Nome do estudante |
| `subject` | `string` | **Obrigatório**. Matéria para checar a nota|

#### Retorna as três maiores notas dentre todos os alunos registrados

```http
  POST /grades/notas/maiores
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `student` | `string` | **Obrigatório**. Nome do estudante |
| `subject` | `string` | **Obrigatório**. Matéria para checar a nota|
