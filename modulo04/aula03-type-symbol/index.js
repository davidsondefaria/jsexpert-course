const assert = require("assert");

{
  // keys
  const uniqueKey = Symbol("userName");
  const user = {};
  user["userName"] = "value for normal objects";
  user[uniqueKey] = "value for symbol";
  // Mesmo com o mesmo nome, são keys diferentes.
  // A primeira key se refere a key do objeto,
  // já a segunda, é um symbol

  console.log("getting normal objects:", user.userName);
  //>> "value for normal Objects"
  console.log(
    "getting symbol object with new reference value:",
    user[Symbol("userName")]
  );
  //>> undefined
  // O segundo retorna undefined pois o Symbol("userName") é uma key privada,
  // e como ela não foi exportada, não temos acesso ao valor dela.
  // Isso se devo ao fato de Symbol("userName") ser único em nível
  // de endereço de memória. Mas quando fizemos uma variável uniqueKey,
  // temos acesso a esse endereço de memória e podemos acessar o valor com
  console.log(
    "getting symbol object with stored reference value:",
    user[uniqueKey]
  );
  //>> "value for symbol"

  // Asserções
  assert.deepStrictEqual(user.userName, "value for normal objects");
  assert.deepStrictEqual(user[Symbol("userName")], undefined);
  assert.deepStrictEqual(user[uniqueKey], "value for symbol");

  // Podemos ver quais os symbols estão no objeto com
  console.log("symbols", Object.getOwnPropertySymbols(user));
  //> symbols [ Symbol(userName) ]
  assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

  // Má prática: byPass
  user[Symbol.for("password")] = 123;
  assert.deepStrictEqual(user[Symbol.for("password")], 123);
}
{
  // Symbols bem conhecidos
  const obj = {
    // Iterators: é o que o * dos generators fazem por debaixo dos panos
    [Symbol.iterator]: () => ({
      items: ["c", "b", "a"],
      next() {
        return {
          done: this.items.length === 0,
          // remove o ultimo e retorna
          value: this.items.pop(),
        };
      },
    }),
  };
  // for (const item of obj) {
  //   console.log("item", item);
  // }
  assert.deepStrictEqual([...obj], ["a", "b", "c"]);
  // Aqui, alteramos o modo que a iteração ocorre sobre nosso objeto,
  // dessa forma, qualquer meio que iterarmos o modo resultará
  // na sua inversão
}
{
  // Aqui, vamos receber umn array de datas e retornar, modificando-as
  const kItems = Symbol("kItems");
  class MyDate {
    constructor(...args) {
      // Os argumentos serão datas em formato de tuplas [year, month, day]
      this[kItems] = args.map((arg) => new Date(...arg));
    }
  }

  // Lembrar que mês no Javscript começa no zero, logo, mês 11 = dezembro
  const myDate = new MyDate([2020, 3, 1], [2018, 2, 2]);

  console.log("myDate", myDate);
  // assert.deepStrictEqual(Object.prototype.toString.call(myDate), null);
  // Essa asserção inicialmente da erro, pois estamos esperando null,
  // send que sem o Symbol.toStringTag(), o que é retornado é [object Object].
  // Esse Object com O maiusculo, é o que chamamos toStringTag.
  // Sem alteração na StringTag, podemos assertir apenas para
  assert.deepStrictEqual(
    Object.prototype.toString.call(myDate),
    "[object Object]"
  );
}
{
  // Aqui, vamos receber umn array de datas e retornar, modificando-as
  const kItems = Symbol("kItems");
  class MyDate {
    constructor(...args) {
      // Os argumentos serão datas em formato de tuplas [year, month, day]
      this[kItems] = args.map((arg) => new Date(...arg));
    }
    get [Symbol.toStringTag]() {
      return "What?";
    }
  }

  const myDate = new MyDate([2020, 3, 1], [2018, 2, 2]);

  // assert.deepStrictEqual(Object.prototype.toString.call(myDate), null);
  assert.deepStrictEqual(
    Object.prototype.toString.call(myDate),
    "[object What?]"
  );
  // Alterando o toStringTag e retornando alguma uma string qualquer,
  // o Object com O vira a string retornada.
  // Além disso, toStringTag é uma propriedade que foi herdada pelo
  // prototypeChain, logo, temos a necessidade do get para acessarmos o valor dela
}
{
  const kItems = Symbol("kItems");
  class MyDate {
    constructor(...args) {
      this[kItems] = args.map((arg) => new Date(...arg));
    }
    [Symbol.toPrimitive](coerctionType) {
      if (coerctionType !== "string") throw new TypeError();
      const itens = this[kItems].map((item) =>
        new Intl.DateTimeFormat("pt-BR", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        }).format(item)
      );
      return new Intl.ListFormat("pt-BR", {
        style: "long",
        type: "conjunction",
      }).format(itens);
    }
    get [Symbol.toStringTag]() {
      return "What?";
    }
  }

  const myDate = new MyDate([2020, 3, 1], [2018, 2, 2]);
  // Adicionando o toPrimitive, iremos alterar a forma que a conversão
  // de tipos acontece. No caso, aqui estaremos impedindo de converter
  // para quaisquer tipos que não sejam string, jogando um TypeError.
  // Nessa asserção, tentamos fazer conversão implicita para number,
  // mas devemos esperar o TypeError do toPrimitive
  assert.throws(() => myDate + 1, TypeError);
  // console.log("Number -> TypeError", myDate + 1);
  // Fazendo uma conversão expliciata para string, obtemos a formatação
  // com internacionalização implementada no toPrimitive.
  assert.deepStrictEqual(
    String(myDate),
    "01 de abril de 2020 e 02 de março de 2018"
  );
  console.log("String(MyDate)", String(myDate));
  //>> "01 de abril de 2020 e 02 de março de 2018"
}

{
  const kItems = Symbol("kItems");
  class MyDate {
    constructor(...args) {
      this[kItems] = args.map((arg) => new Date(...arg));
    }

    [Symbol.toPrimitive](coerctionType) {
      if (coerctionType !== "string") throw new TypeError();
      const itens = this[kItems].map((item) =>
        new Intl.DateTimeFormat("pt-BR", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        }).format(item)
      );
      return new Intl.ListFormat("pt-BR", {
        style: "long",
        type: "conjunction",
      }).format(itens);
    }

    *[Symbol.iterator]() {
      // o * valida que essa implementação será um iterador
      for (const item of this[kItems]) {
        yield item;
      }
    }

    async *[Symbol.asyncIterator]() {
      const timeout = (ms) => new Promise((r) => setTimeout(r, ms));
      // Timeout para simular a espera de uma funções asincrona
      for (const item of this[kItems]) {
        await timeout(100);
        // toISOString para mostrar que retorna diferente do toString
        // que foi implementado pelo toPrimitive
        yield item.toISOString();
      }
    }

    get [Symbol.toStringTag]() {
      return "What?";
    }
  }

  const myDate = new MyDate([2020, 3, 1], [2018, 2, 2]);
  const expectedDates = [new Date(2020, 3, 1), new Date(2018, 2, 2)];

  // Sem o Symbol.iterator, nosso objeto não é iterável, logo,
  // a asserção abaixo jogaria um
  //>> TypeError: myDate is not iterable

  // Mas, implementando o iterator, o tste passa
  assert.deepStrictEqual([...myDate], expectedDates);

  // E para trabalhar com promises, implementamos o asyncIterator
  // Podemos experimentar com o for await

  (async () => {
    for await (const item of myDate) {
      console.log("asyncIterator", item);
    }
  })();

  // Ou com Promise.all, retornando tudo numa lista
  (async () => {
    const dates = await Promise.all([...myDate]);
    assert.deepStrictEqual(dates, expectedDates);
  })();
}
