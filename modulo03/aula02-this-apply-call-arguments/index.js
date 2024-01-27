"use strict";

const {
  watch,
  promises: { readFile },
} = require("fs");

class File {
  watch(event, filename) {
    console.log("this", this);
    console.log("argument", Array.prototype.slice.call(arguments));
    this.showContent(filename);
  }
  async showContent(filename) {
    console.log((await readFile(filename)).toString());
  }
}

// watch(__filename, async (event, filename) => {
//   console.log((await readFile(filename)).toString());
// });

const file = new File();
// watch(__filename, file.watch);
// Dessa maneira da erro pois o `file.watch` esta herdando o this do `watch` do fs,
// logo, this.showContent não existe

// watch(__filename, (event, filename) => file.watch(event, filename));
// Dessa maneira funciona, mas não é uma boa prática. O file.watch não herda o this
// do watch do fs e o this.showContent funciona.

// podemos explicitar o contexto que a função deve seguir
watch(__filename, file.watch.bind(file));
// o bind retorna uma função com o this que se mantém file, ignorando o watch

console.log("\n");
file.watch.call(
  { showContent: () => console.log("call: hey sinon!") },
  null,
  __filename
);
console.log("\n");
file.watch.apply({ showContent: () => console.log("apply: hey sinon!") }, [
  null,
  __filename,
]);

// A utilização do call e do apply substitui os métodos da classe pelo argumento passado.
// É algo parecido com que os bibliotecas de teste utilizam para stubs.
// A diferença entre ambas é a passagem de argumentos, sendo call uma lista e apply um array.
// Os arguments são uma forma de pegar os argumentos passados por uma função, mas
// o uso deles é uma má prática no Javascript
