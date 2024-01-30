const assert = require("assert");
{
  // generators
  function* calculation(arg1, arg2) {
    yield arg1 * arg2;
  }

  function* main() {
    yield "Hello";
    yield "-----";
    yield "World";
    yield* calculation(20, 10);
    // yield* retorna a execução da função
    // yield calculation(20, 10); retorna a função em si
  }

  const generator = main();

  // vai imprimindo até o último valor, retornando um objeto
  // { value: <valor>, done: <boolean>}
  // onde o valor é o que a função retorna e
  // done será true após o retorno do último valor
  // console.log(generator.next());
  // console.log(generator.next());
  // console.log(generator.next());
  // console.log(generator.next());

  // Testando o que o generator retorna manualmente;
  assert.deepStrictEqual(generator.next(), { value: "Hello", done: false });
  assert.deepStrictEqual(generator.next(), { value: "-----", done: false });
  assert.deepStrictEqual(generator.next(), { value: "World", done: false });
  assert.deepStrictEqual(generator.next(), { value: 200, done: false });

  // Testando o que o generator retorna usando array
  assert.deepStrictEqual([...main()], ["Hello", "-----", "World", 200]);
}
{
  // async iterators: para trabalhar com promises
  const { readFile, stat, readdir } = require("fs/promises");
  function* promisified() {
    // esse generator retorna duas promises
    yield readFile(__filename);
    yield Promise.resolve("Heey");
  }

  // Para resolver, podemos usar duas maneiras
  {
    // Promise.all para resolver as promises
    Promise.all([...promisified()]).then((results) =>
      console.log("promisified", results)
    );
  }
  {
    // Ou criando uma closure (função que se auto executa)
    (async () => {
      for await (const item of promisified()) {
        console.log("item", item.toString());
      }
    })();
  }

  // Juntando o generator com o async iterator, teremos
  async function* systemInfo() {
    const file = await readFile(__filename);
    yield { file: file.toString() };

    const { size } = await stat(__filename);
    yield { size };

    const dir = await readdir(__dirname);
    yield { dir };
  }

  (async () => {
    for await (const item of systemInfo()) {
      console.log("systemInfo", item);
    }
  })();
}
