# Aula 01: Modo strict

Série de regras que evitam erros semânticos ao usar `'use strict'` no início de cada arquivo Javascript.

### [Geeks for Geeks](https://www.geeksforgeeks.org/strict-mode-javascript/) sobre beneficios do strict mode:

> - Strict mode eliminates some JavaScript silent errors by changing them to throw errors.
> - Strict mode fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that’s not strict mode.
> - Strict mode prohibits some syntax likely to be defined in future versions of ECMAScript.
> - It prevents, or throws errors, when relatively “unsafe” actions are taken (such as gaining access to the global object).
> - It disables features that are confusing or poorly thought out.
> - Strict mode makes it easier to write “secure” JavaScript.

# Aula 02: Call Stack & Memory Heap

## Call Stack: _pilha de execução/operações_

Pilha de operações que determina a sequência de ações que o programa vai executar de forma ordenada: usa a estrutura FILO. No Call Stack, só podem ser armazenados tipos primitivos e, para a execução de funções e estruturas dinâmicas, faz se o uso do Memory Heap.

## Memory Heap: _pilha de memória de referência_

Pilha de memória que armazena os endereços memória que podem ser apontados pelo Call Stack para realizar o uso de variáveis não primitivas, funções, objetos, etc. Os dados que Memory Heap armazenam podem crescer dinamicamente.

# Aula 03: Tipo de Valor vs Tipo de Referência (Immutability vs Mutability)

[Prática](ref-vs-val/index.js)

# Aula 05: Coerção de Tipos & Object Lifecycle

## Coerção de Tipos

É a conversão de um tipo para outro. Qualquer tipo de dados está sujeito a coerção, mas no fim, só existem 3 tipos de coerção: ou string, ou boolean, ou number. A lógica de conversão dos objects ou outros tipos não primitivos é diferente.

Existem 2 tipos de conversão: explicita e implicita.

- A coerção implicita é utilizada nos operadores (soma, if, loose equality operator (==)). Existe uma [tabela](https://dorey.github.io/JavaScript-Equality-Table/) que mostra a relação da conversão dos valores e o resultado delas.

- A conversão explicita é utilizada por meio de funções (String(), Number(), Bool()...)

## Object Lifecycle

Todo objeto tem alguns métodos imbutidos e na hora da conversão para string, há uma ordem de chamada:

1. Verifica se o valor é primitivo: se sim, retorna. Se não:
2. Se ainda for objeto, chama o método `.valueOf()` e verifica se é primitivo. Se não,
3. Chama o método `.toString()`, verifica se o valor é primitivo. Se sim, retorna. Se não, vai dar _type error_.

No ES6, há um novo método chamado `Symbol.toPrimitive` que tem prioridade sobre toString e valueOf, que transforma o objeto para tipo primitivo.

# Aula 06: Prototype Chain - Herança de Objetos

Paticamente tudo em Javascript é um objeto. Uma classe, por exemplo, é apenas um _syntax sugar_ para a implementação de um tipo de objeto. A ideia de herança vem do POO e, no caso do Javascript, herança é realizada através do prototype. E por implementar a ideia de classes e heranças através dos prototypes, é possível utilizarmos dos princípios SOLID.

_Prototype Chain_ é a busca pela existência de alguma propriedade de um objeto, sendo que, se ela não existir na base do objeto, a busca vai para o protótipo do objeto. Novamente, se ela não existir, vai para o 'protótipo do protótipo', ou seja, buscando por toda a 'arvore genealógica' do primeiro objeto em questão. Se chegar na raíz da instância e não encontrar nada, é retornado undefined.
