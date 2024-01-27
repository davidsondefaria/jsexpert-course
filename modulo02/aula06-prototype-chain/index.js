const assert = require("assert");

const obj = {};
const arr = [];
const fn = () => {};

// internamente, objetos literais viram funções explícitas
console.log("new Object() is {}?", new Object().__proto__ === {}.__proto__);
//>> true
assert.deepStrictEqual(new Object().__proto__, {}.__proto__);

// __proto__ é a referência do objeto que possui as propriedades nele
console.log(
  "obj.__proto__ === Object.prototype",
  obj.__proto__ === Object.prototype
);
assert.deepStrictEqual(obj.__proto__, Object.prototype);
//>> true

console.log(
  "arr.__proto__ === Array.prototype",
  arr.__proto__ === Array.prototype
);
assert.deepStrictEqual(arr.__proto__, Array.prototype);
//>> true

console.log(
  "fn.__proto__ === Function.prototype",
  fn.__proto__ === Function.prototype
);
assert.deepStrictEqual(fn.__proto__, Function.prototype);
//>> true

// o __proto__ de Object.prototype é null
console.log("obj.__proto__.__proto__ === null", obj.__proto__.__proto__);
assert.deepStrictEqual(obj.__proto__.__proto__, null);

console.log("------------------------------------------------------");

// Como herança funcionava no ES5 e anteriores, sem Prototype Chain
function Employee() {}
Employee.prototype.salary = () => "salary**";

function Supervisor() {}
Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => "profitShare**";
console.log(Supervisor.prototype.salary());

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonuses = () => "monthlyBonuses**";

// Podemos chamar via prototype, mas se tentar chamar diretamente da erro
console.log(Manager.prototype.salary());
//>> salary**
// console.log(Manager.salary());
//>> erro pq não existe salary dentro do Manager, só no seu prototype

// Se não chamar o 'new', o primeiro __proto__ vai ser sempre
// a instância de Function, sem herdar nossas classes.
// Para acessar as classes sem o new, pode acessar direto via prototype
console.log(
  "Manager.prototype.__proto__ === Supervisor.prototype",
  Manager.prototype.__proto__ === Supervisor.prototype
);
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);
//>> true

// Quando chamamos com o 'new', o __proto__ recebe o prototype e a
// prototype chain é criada
console.log(
  "manager.__proto__: %s, manager.salary(): %s",
  new Manager().__proto__,
  new Manager().salary()
);
//>> manager.__proto__: Employee { monthlyBonuses: [Function (anonymous)] }, manager.salary(): salary**
console.log(
  "Supervisor.prototype === new Manager().__proto__.__proto__",
  Supervisor.prototype === new Manager().__proto__.__proto__
);
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__);
//>> true
// Como Manager herda de Supervisor, o proto de seu proto deve ser o
// proto de Supervisor, devido a prototype chain.

console.log("------------------------------------------------------");
// O prototype chain é criado quando se usa o 'new' para iniciar uma nova instância.
// Dessa maneira, é possível acessar todos os métodos das classes pai

const manager = new Manager();
console.log("manager.salary()", manager.salary());
console.log("manager.profitShare()", manager.profitShare());
console.log("manager.monthlyBonuses()", manager.monthlyBonuses());

// Através da Manager, podemos ver os protos de todas as classes pais:
console.log("Manager proto", manager.__proto__);
console.log("Supervisor proto", manager.__proto__.__proto__);
console.log("Employee proto", manager.__proto__.__proto__.__proto__);
console.log("Object proto", manager.__proto__.__proto__.__proto__.__proto__);
console.log("Null", manager.__proto__.__proto__.__proto__.__proto__.__proto__);

assert.deepStrictEqual(manager.__proto__, Manager.prototype);
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__,
  Employee.prototype
);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__,
  Object.prototype
);
assert.deepStrictEqual(
  manager.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
);

console.log("------------------------------------------------------");

// No dia a dia após o ES6, usamos o conceito de classe através do syntax
// sugar 'class' ao invés de criarmos funções.

class T1 {
  ping() {
    return "ping";
  }
}
class T2 extends T1 {
  pong() {
    return "pong";
  }
}
class T3 extends T2 {
  shoot() {
    return "shoot";
  }
}
const t3 = new T3();

// Mas no fim, é a mesma coisa que as functions. São instâncias de objetos.

console.log("t3.ping()", t3.ping());
console.log("t3.pong()", t3.pong());
console.log("t3.shoot()", t3.shoot());

console.log("t3 proto", t3.__proto__);
console.log("T2 proto", t3.__proto__.__proto__);
console.log("T1 proto", t3.__proto__.__proto__.__proto__);
console.log("Object proto", t3.__proto__.__proto__.__proto__.__proto__);
console.log("Null", t3.__proto__.__proto__.__proto__.__proto__.__proto__);

assert.deepStrictEqual(t3.__proto__, T3.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__,
  Object.prototype
);
assert.deepStrictEqual(
  t3.__proto__.__proto__.__proto__.__proto__.__proto__,
  null
);
