import { writeFileSync, readFileSync } from "fs";

export const save = async (data) => {
  // não tem __filename, __dirname no esmodules

  const { pathname: databaseFile } = new URL(
    "./../database.json",
    import.meta.url
  );

  const currentData = JSON.parse(readFileSync(databaseFile));
  currentData.push(data);

  writeFileSync(databaseFile, JSON.stringify(currentData));
};
