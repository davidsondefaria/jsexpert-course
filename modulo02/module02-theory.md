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

## Call Stack: *pilha de execução*

Pilha de operações que determina a sequência de ações que o programa vai executar de forma ordenada: usa a estrutura FILO. No Call Stack, só podem ser armazenados tipos primitivos e, para a execução de funções e estruturas dinâmicas, faz se o uso do Memory Heap.

## Memory Heap: *pilha de memória de referência*

Pilha de memória que armazena os endereços memória que podem ser apontados pelo Call Stack para realizar o uso de variáveis não primitivas, funções, objetos, etc. Os dados que Memory Heap armazenam podem crescer dinamicamente.

# Aula 03: Tipo de Valor vs Tipo de Referência (Immutability vs Mutability)

[Prática](ref-vs-val/index.js)

# Aula 04: Coerção de Tipos & Object Lifecycle