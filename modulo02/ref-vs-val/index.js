const { deepStrictEqual } = require('assert')
{
  console.log("Counter")
  let counter = 0
  let counter2 = counter
  counter2++
  console.log("counter", counter)
  console.log("counter2", counter2)
  /*
    Apenas o segundo contador é incrementado,
    pois sua inicialização começa criando uma nova referência, logo:
    counter = 0
    counter2 = 1
    Isso se deve ao fato de counter e counter2 serem tipo primitivos (<number>),
    logo, são armazenados diretamente no Call Stack.
    "Tipo primitivo gera uma cópia em memória"
  */
  deepStrictEqual(counter, 0)
  deepStrictEqual(counter2, 1)
}

{
  console.log("Item")
  const item = { counter: 0 }
  const item2 = item
  item2.counter++
  
  console.log("item", item)
  console.log("item2", item2)
  /*
    Ambos os contadores são incrementados,
    pois a referência do item2 é a mesma referência do item, logo:
    item.counter = 1
    item2.counter = 1
    Isso se deve ao fato de item e item2 serem tipo dinâmicos (<objeto>),
    logo, são armazenados diretamente no Memory Heap.
    "Tipo de referência, copia o endereço de memória e aponta para o mesmo lugar"
  */
 deepStrictEqual(item, { counter: 1 })
 
 item.counter++
 console.log("item", item)
 console.log("item2", item2)

 deepStrictEqual(item2, { counter: 2 })
}