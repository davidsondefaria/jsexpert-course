import TerminalController from "./terminalController.js";
import Person from "./person.js";
import database from "../database.json";
import { save } from "./repository.js";

const DEFAULT_LANG = "pt-br";
const STOP_TERM = ":q";

const terminalController = new TerminalController();

terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
  try {
    const answer = await terminalController.question();

    if (answer === STOP_TERM) {
      terminalController.closeTerminal();
      console.log("process finished");
      return;
    }
    const person = Person.generateInstanceFromString(answer);

    terminalController.updateTable(person.formatted(DEFAULT_LANG));
    await save(person);

    return mainLoop();
  } catch (error) {
    console.error("Deu ruim", error);
    return mainLoop();
  }
}

await mainLoop();

//2 Bike,Patinete 2000 2000-02-01 2002-02-01
//3 Aviao,Navio 1500000 2000-03-01 2010-02-01
