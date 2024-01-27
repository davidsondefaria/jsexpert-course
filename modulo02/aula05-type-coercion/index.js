{
  // Coerção Implícita e WTF JS
  true + 2 == 3;
  true - 2 == -1;
  "21" + true == "21true";
  "21" - true == 20;
  9999999999999999 == 10000000000000000;
  0.1 + 0.2 == 0.30000000000000004;
  3 > 2 > 1 == false;
  3 > 2 >= 1 == true;
  "21" - -1 == 22;
  ("1" == 1) == true;
  ("1" === 1) === false;
  "B" + "a" + +"a" + "a" == "BaNaNa";
}
{
  // Coerção Explícita
  console.assert(String(123) === "123", "conversão explicita");
  console.assert(123 + "" === "123", "coerção implicita");

  {
    if (null || 1) {
      console.log("entrou");
      // vai imprimir 'entrou' pq apesar da primeira condição ser falsa,
      // a segunda é verdadeira, logo, o if é válido
    }
  }
  {
    if ("hello" || 1) {
      console.log("entrou");
      // vai imprimir 'entrou' pq ambas as condição são verdadeiras
    }
  }
  {
    const r = "hello" || 1;
    console.log(r);
    // vai imprimir "hello" pq ele vai pegar o primeiro valor,
    // quando ambas as opções são verdadeiras. caso apenas uma seja falsa,
    // o valor será a condição verdadeira
    if (r) {
      console.log("entrou"); // vai imprimir "entrou" pq a condição é verdadeira
    }
  }
  console.assert(
    ("hello" || 123) === "hello",
    "|| retorna o elemento verdadeiro ou o primeiro elemento, caso ambos sejam verdadeiros"
  );
  console.assert(
    ("hello" && 123) === 123,
    "&& retorna o último elemento, caso ambos sejam verdadeiros"
  );
}

{
  // Object Lifecycle
  {
    const item = {
      name: "Davidson",
      age: 29,
    };
    console.log("item", item + 0); // conversão implicita
    //>> item [object Object]0
    // Houve uma coerção do objeto para string e a concatenação com o 0,
    // pois, por debaixo dos panos, o método toString do objeto converte
    // para qualquer objeto para '[object Object].
  }
  {
    const item = {
      name: "Davidson",
      age: 29,
      toString() {
        return `Name: ${this.name}, Age: ${this.age}`;
      },
    };
    console.log("item", item + 0); // conversão implicita
    //>> item Name: Davidson, Age: 290
    // Com a alteração do método toString, conseguimos obter uma string mais
    // legível e, com a concatenação com o 0, o número é convertido para string
    // e adicionado ao final da string do objeto.
  }
  {
    const item = {
      name: "Davidson",
      age: 29,
      toString() {
        return `Name: ${this.name}, Age: ${this.age}`;
      },
      valueOf() {
        return 7;
      },
    };
    console.log("item", item + 1); // conversão implicita
    //>> item 8
    // Com a alteração do método toValue, o valor resultando já é primitivo,
    // logo, não há necessidade de chamar o método toString para realizar a
    // conversão implicita na soma item + 1.
  }
  {
    const item = {
      name: "Davidson",
      age: 29,
      toString() {
        return `Name: ${this.name}, Age: ${this.age}`;
      },
      valueOf() {
        return 7;
      },
    };
    console.log("item", "".concat(item)); // conversão implicita
    //>> item Name: Davidson, Age: 29
    // O método .concat força a coerção direta para string, chamando o método
    // toString do objeto com prioridade sobre o toValue.
  }
  {
    const item = {
      name: "Davidson",
      age: 29,
      toString() {
        return `Name: ${this.name}, Age: ${this.age}`;
      },
      valueOf() {
        return 7;
      },
    };
    console.log("toString", String(item)); // conversão explicita
    //>> toString Name: Davidson, Age: 29
    console.log("valueOf", Number(item)); // conversão explicita
    //>> valueOf 7
    // Nas conversão explicitas, é chamado os métodos referentes ao
    // tipo que a conversão deseja.
    // String(item) -> chama toString
    // Number(item) -> chama valueOf
  }
  {
    const item = {
      name: "Davidson",
      age: 29,
      toString() {
        return `Name: ${this.name}, Age: ${this.age}`;
      },
      valueOf() {
        return { hello: "world" };
      },
    };
    console.log("toString", String(item)); // conversão explicita
    //>> toString Name: Davidson, Age: 29
    console.log("valueOf", Number(item)); // conversão explicita
    //>> valueOf NaN
    // Como o valueOf do item não retorna um tipo primitivo e há uma
    // conversão explícita para Number, então, há uma tentativa de pegar
    // valor que o toString retorna, como também não é um numero,
    // a conversão final é Not a Number (NaN)
    // A conversão do Number ocorre nessa prioridade:
    // valueOf => number
    //   ? number
    //   : toString => string of number
    //      ? number
    //      : NaN
  }
  {
    const item = {
      name: "Davidson",
      age: 29,
      toString() {
        return "7";
      },
      valueOf() {
        return { hello: "world" };
      },
    };
    console.log("toString", String(item)); // conversão explicita
    //>> toString '7'
    console.log("valueOf", Number(item)); // conversão explicita
    //>> valueOf 7
    // Como o valueOf do item não retorna um tipo primitivo e há uma
    // conversão explícita para Number, então, há uma tentativa de pegar
    // valor que o toString retorna, como temos a string de um número,
    // a conversão final é string para número.
    // A conversão do Number ocorre nessa prioridade:
    // valueOf => number
    //   ? number
    //   : toString => string of number
    //      ? number
    //      : NaN
  }
  {
    const item = {
      name: "Davidson",
      age: 29,
      toString() {
        return `Name: ${this.name}, Age: ${this.age}`;
      },
      valueOf() {
        return { hello: "world" };
      },
      [Symbol.toPrimitive](coercionType) {
        console.log("trying to convert to", coercionType);
      },
    };
    console.log("toString", String(item)); // conversão explicita
    //>> trying to convert to string
    //>> toString undefined
    console.log("valueOf", Number(item)); // conversão explicita
    //>> trying to convert to number
    //>> valueOf NaN
    // Alterando o Symbol.toPrimitive para apenas um console log,
    // não há nenhuma conversão sendo feita, logo, os valores convertidos
    // serão indefinidos.
  }
  {
    const item = {
      name: "Davidson",
      age: 29,
      toString() {
        return `Name: ${this.name}, Age: ${this.age}`;
      },
      valueOf() {
        return { hello: "world" };
      },
      [Symbol.toPrimitive](coercionType) {
        console.log("trying to convert to", coercionType);
        const types = {
          string: JSON.stringify(this),
          number: "0007",
        };
        return types[coercionType];
      },
    };
    console.log("String", String(item)); // conversão explicita
    //>> trying to convert to string
    //>> String {"name":"Davidson","age":29}
    console.log("Number", Number(item)); // conversão explicita
    //>> trying to convert to number
    //>> number 7
    // Alterando o Symbol.toPrimitive para converter os valores segundo
    // o tipo da conversão explícita, ganhamos prioridade sobre o toString
    // e o valueOf, não retornando a string 'Name: Davidson, Age: 29' e
    // nem dando um erro quando o retorno de valueOf é não primitivo.
    console.log("Date", new Date(item));
    //>> trying to convert to default
    //>> Date Invalid Date
    // Mas quando tentamos converter para data, temos a conversão de um tipo
    // default. Que na realidade, deveria ser Boolean. Logo, há a necessidade
    // de um novo tipo no Symbol.toPrimitive
  }
  {
    const item = {
      name: "Davidson",
      age: 29,
      toString() {
        return `Name: ${this.name}, Age: ${this.age}`;
      },
      valueOf() {
        return { hello: "world" };
      },
      [Symbol.toPrimitive](coercionType) {
        console.log("trying to convert to", coercionType);
        const types = {
          string: JSON.stringify(this),
          number: "0007",
        };
        return types[coercionType] || types.string;
      },
    };
    console.log("String", String(item)); // conversão explicita
    //>> trying to convert to string
    //>> String {"name":"Davidson","age":29}
    console.log("Number", Number(item)); // conversão explicita
    //>> trying to convert to number
    //>> number 7
    console.log("Date", new Date(item));
    //>> trying to convert to default
    //>> Date Invalid Date
    // Mesmo adicionando um default (no caso, colocamos default como string)
    // na conversão da data, não há um valor que seja compátivel para
    // a conversão explícita para Date. Então não é possível mesmo!
    // Mas, como o default adicionado foi string, podemos fazer conversões
    // implícitar com string que dão certo.
    console.assert(
      item + 0 === '{"name":"Davidson","age":29}',
      "the implict conversion is not right"
    );
    //>> trying to convert to default
    //>> Assertion failed: the implict conversion is not right
    // Sem adicionar o 0 no final da string, teremos um erro.
    console.assert(
      item + 0 === '{"name":"Davidson","age":29}0',
      "the implict conversion is not right"
    );
    //>> trying to convert to default
    // Enquanto com o 0 no final da string, a asserção é verdadeira.
    // Geralmente o default é boolean, mas como mudamos para string,
    // a conversão implicita para boolean também é feita como string.
    console.assert(
      !!item,
      "non empty string values converted to boolean are true"
    );
    // Não retorna erro
    console.log(!!item);
    //>> true
    console.assert("Ae".concat(item) === 'Ae{"name":"Davidson","age":29}');
    //> trying to convert to string
    // Não retorna erro
    console.log(
      "implicit + explicit coersion (using ==)",
      item == String(item)
    );
    //>> trying to convert to string
    //>> trying to convert to default
    //>> implicit + explicit coersion (using ==) true
    // Duas conversões aconteceram. A explicita para string e a implicita
    // para boolean. Como nosso default (boolean) é retornar string,
    // o lado esquerdo e o lado direito são iguais, logo, true.
    console.assert(item == String(item));
    //>> trying to convert to string
    //>> trying to convert to default
    // Não retorna erro, já que sabemos que a igualdade é verdadeira

    console.log("------------------");
    // Fazendo uma cópia do objeto item para verificar se a instância é modificada
    const item2 = { ...item, name: "Zézin", age: 20 };
    console.log("New Object", item2);
    /* >>New Object {
          name: 'Zézin',
          age: 20,
          toString: [Function: toString],
          valueOf: [Function: valueOf],
          [Symbol(Symbol.toPrimitive)]: [Function: [Symbol.toPrimitive]]
        }
    */

    console.log("String", String(item2)); // conversão explicita
    //>> trying to convert to string
    //>> String {"name":"Zézin","age":20}
    console.log("Number", Number(item2)); // conversão explicita
    //>> trying to convert to number
    //>> number 7
    console.assert(
      item2 + 0 === '{"name":"Zézin","age":20}0',
      "the implict conversion is not right"
    );
    //>> trying to convert to default
    // A asserção é verdadeira
    // Vemos que a instância do objeto não foi modificada e o
    // Symbol.toPrimitive continua funcionando.
    // Se comentarmos o Symbol.toPrimitive do item, veremos que amobs
    // os item e item2 voltarão a ordem padrão do javascript para o uso de
    // valueOf e toString, logo as últimas asserções irão falhar já que
    // valueOf não retorna um tipo primitivo e o toString retorna a string
    // dos blocos anteriores `Name: ${this.name}, Age: ${this.age}`
  }

  // resumo:
  // sempre usar strict equal operator (===) para comparações
  // cudado ao sobrescrever métodos nativos do javascript
}
