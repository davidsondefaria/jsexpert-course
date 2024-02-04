# Aula 02: Generators, Iterators e Async Iterators

## Generators

O objetivo dos generators é fazer com que as funções viram listas e que entreguem os dados sob demanda.

# Aula 03: Type Symbol

Symbols podem ser usados como propriedades privadas de objetos, mas sem a necessidade de declarar como private, como ocorre em classes.

A utilização de Symbol é uma técnica de meta programação, onde podemos interceptar o comportamento de funções, garantir o valor dos tipos de dados e dificultar do usuário que não devem ter acesso direto aos valores, como funções ou propriedades privadas.

## Aula 04: Weak e WeakMap

Um problema causado pelo prototype chain é, caso a classe/object base precise de mais comportamentos, todas as classes filhas serão afetadas e isso pode trazer um risco para o ecosisstema.

O tipo Map é uma especialização do tipo Object que traz melhor performance em determinados cenários, como constantemente adicionar e remover chaves, evitar conflitos de nomes de propriedades herdados no prototype chain e traz uma semantica melhor para manipulação de dados.

O Map traz funções para validar se uma chave existe, remover itens sem prejudicar o ciclo de vida do Javascript e implementa o padrão generator. Outro benefício, é utilizar objetos como chave de pesquisa.

Na prática, é bom utilizar o Map ao invés do Object em casos que é necessário adicionar chaves com frequência, validar se chave existe de forma semântica, quando é necessário que o objeto funcione como um banco de dados, onde a chave é um objeto e tem um conjunto de dados, e quando é necessário limpar a referênca após o uso (um botão de reset, por exemplo).

Mas quando só precisamos só adicionar/remover chaves e fazer pesquisar por id, podemos utilizar um WeakMap, que só pode utilizar objetos como chave e ele não é um iterator, além de ter menos métodos para usar. A vantagem é a performance, fazendo referência direta ao endereço dos objeto.

## Aula 05: Set e WeakSet

Set é uma lista que pode possuir apenas itens únicos, podendo utilizar métodos para descobrir itens de um set em outro set, concatenar duas listas sem repetir valores e etc.

A ideia do WeakSet é a mesma que a do WeakMap, mas implementando o que o Set oferece.
