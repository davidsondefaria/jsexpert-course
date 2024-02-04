const assert = require("assert");

// Usado na maioria das vezes para listas de itens únicos

const arr1 = ["0", "1", "2"];
const arr2 = ["2", "0", "3"];
const arr3 = arr1.concat(arr2);

console.log("arr3", arr3);
//>> [ '0', '1', '2', '2', '0', '3' ]
console.log("arr3", arr3.sort());
//>> [ '0', '0', '1', '2', '2', '3' ]
assert.deepStrictEqual(arr3.sort(), ["0", "0", "1", "2", "2", "3"]);

const set = new Set();
arr1.map((item) => set.add(item));
arr2.map((item) => set.add(item));

console.log("Set with add item per item", set);
//>> { '0', '1', '2', '3' }
// O Set já é criado ordenando os valores
// Como set implementa o padrão generator, podemos iterar sobre
assert.deepStrictEqual(Array.from(set), ["0", "1", "2", "3"]);

// Mas também podemos usar rest/spread operator para criar um novo set
assert.deepStrictEqual([...new Set([...arr1, ...arr2])], ["0", "1", "2", "3"]);

// Assim como o Map, o Set também possui os métodos keys e values,
// mas eles retornam a mesma coisa. Só é implementado para manter a
// compatibilidade entre ambas estruturas.
console.log("set.keys", set.keys());
console.log("set.keys", set.values());
//>> [Set Iterator] { '0', '1', '2', '3' }

// No Array comum, para saber se um item existe:
// [].indexOf('1') !== -1 ou [0].includes(0)
assert.ok(set.has("3"));
// Mesma teoria do Map, mas você sempre trabalha com a lista completa
// Não tem get, então você pode saber se o item está ou não na lista e é só isso.
// Na documentação tem exemplos sobre como fazer uma interceção, saber
// o que tem em uma lista e não tem outra...

// Tem nas duas listas
const users01 = new Set(["davidson", "lanna", "potira"]);
const users02 = new Set(["vanessa", "davidson", "andreza"]);

const intersection = new Set([...users01].filter((user) => users02.has(user)));
assert.deepStrictEqual(Array.from(intersection), ["davidson"]);
// Aqui, implementamos um método para fazer a interseção entre os sets,
// transformando para users01 para array e verificando quais valores do
// user02 estão presentes no users02.
// Mas nas versões mais novas do Javascript, podemos simplesmente utilizar:
// const intersection = users01.intersection(users02);
// Mas ainda há problema de compatibilidade com alguns browsers:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/intersection
// MAS NÃO TEM NO NODE!!!

const difference = new Set([...users01].filter((user) => !users02.has(user)));
assert.deepStrictEqual(Array.from(difference), ["lanna", "potira"]);
// Aqui implementamos um método para verificar o que tem no users01 e NÃO
// tem no users02.
// Novamente, há método no Javascript, mas com incompatibilidade no Node e browsers
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/difference
// const difference = users01.difference(users02)

// WeakSet
// Mesma ideia do WeakMap:
// Não é iterável
// Só trabalha com chaves como referência
// Só tem métodos simples

const user = { id: 123 };
const user2 = { id: 321 };

const weakSet = new WeakSet([user]);
weakSet.add(user2);
weakSet.delete(user);
weakSet.has(user);
