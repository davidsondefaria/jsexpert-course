const assert = require("assert");
{
  const myMap = new Map();
  // Pode ter qualquer coisa na chave utilizando método .set
  myMap
    .set(1, "one")
    .set("Davidson", { text: "two" })
    .set(true, () => "hello");

  console.log("myMap", myMap);
  // Acessamos um valor com método .get
  console.log("myMap.get(1)", myMap.get(1));
  assert.deepStrictEqual(myMap.get(1), "one");
  assert.deepStrictEqual(myMap.get("Davidson"), { text: "two" });
  // Como o valor da chave true é uma função, vamos executar para assertir o resultado
  assert.deepStrictEqual(myMap.get(true)(), "hello");

  {
    // Também podemos iniciar os valores diretamente pelo construtor
    const myConstructedMap = new Map([
      ["1", "str1"],
      [1, "num1"],
      [true, "bool1"],
    ]);
    console.log("myConstructedMap", myConstructedMap);
  }

  // Em Objects, a chave só pode ser string ou Symbol,
  // (number é coergido para string)
  const onlyReference = { id: 1 };
  myMap.set(onlyReference, { name: "Davidson" });

  console.log("get por outra referencia", myMap.get({ id: 1 }));
  //>> undefined
  // Como a chave é um objeto, só podemos acessar essa chave pela referência,
  // logo, mesmo que tenhamos chaves objeto 'iguais', não temos o acesso.
  console.log("get pela mesma referência", myMap.get(onlyReference));
  //>> { name: "Davidson" }

  assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
  assert.deepStrictEqual(myMap.get(onlyReference), { name: "Davidson" });
}
{
  // Utilitários
  const myMap = new Map();
  myMap
    .set(1, "one")
    .set("Davidson", { text: "two" })
    .set(true, () => "hello");

  const onlyReferenceWorks = { id: 1 };
  myMap.set(onlyReferenceWorks, { name: "Davidson" });

  // No Object seria Object.keys({ a: 1}).length
  // Mas no Map utilizamos .size

  assert.deepStrictEqual(myMap.size, 4);

  // Verificação de existência no objeto
  // item.key = se não existe = undefined
  // if() = coerção implicita para boolean e retorna false
  // O jeito certo em Object é
  // ({ name: "Davidson"}).hasOwnProperty("name")
  assert.ok(myMap.has(onlyReferenceWorks));

  // Remover um item do objeto
  // delete item.id
  // É imperformático para o Javascript, mas para map funciona bem
  assert.ok(myMap.delete(onlyReferenceWorks));

  // Não da para iterar em Objects diretamente,
  // tem que transformar em array com Object.entries(obj)
  // Mas o Map já implementa o padrão do generators
  assert.deepStrictEqual(
    JSON.stringify([...myMap]),
    JSON.stringify([
      [1, "one"],
      ["Davidson", { text: "two" }],
      [true, () => {}], // *
    ])
  );
  // Fizemos o stringify aqui pq, apesar da estrutura ser a mesma, as
  // referência não batem, po conta da função anonima* da chave true.
  // Mas fazendo um stringify em ambos, conseguimos obter um resultado
  // igual devido a mesma estrutura

  // Como o Map pode ser iterado, podemos utilizar o for of
  for (const [key, value] of myMap) {
    console.log({ key, value });
  }

  // Oject é inseguro, pois, dependendo do nome da chave, o usuário
  // pode substituir algum comportamento padrão.
  assert.deepStrictEqual({}.toString(), "[object Object]");
  // Mas se o usuário criar uma chave .toString, ele altera o comportamento
  assert.deepStrictEqual({ toString: () => "hey" }.toString(), "hey");
  // Qualquer chave pode colidir com as propriedades herdadas do object
  // através do prototype chain, como constructor, toString, valueOf, etc.
  // Com o Map, não temos o problema, pois o acesso as chaves é feito pelo get
  const actor = {
    name: "Xuxa da Silva",
    toString: "Queen: Xuxa da Silva",
  };
  myMap.set(actor);
  assert.ok(myMap.has(actor));
  assert.throws(() => myMap.get(actor).toString, TypeError);

  // Não da para limpar um Obj sem reassiná-lo
  myMap.clear();
  assert.deepStrictEqual([...myMap.keys()], []);
}
{
  // WeakMap
  // Pode ser coletador após perder as referências
  // Usado em casos bem específicos
  // Tem a maioria dos benefícios do Map, mas não é iterável.
  // As chaves são só de referência e que você já conhece
  // Mais leve e preve leak de memória, pq depois que as instâncias
  // saem de memória, tudo é limpo, inclusive o WeakMap.
  // Isso não ocorre no Map, já que ele mantém uma cópia das instâncias.

  const weakMap = new WeakMap();
  const hero = { name: "Flash" };
  // Coisas que pode fazer:
  // weakMap.set(hero)
  // weakMap.get(hero)
  // weakMap.delete(hero)
  // weakMap.has(hero)
}
