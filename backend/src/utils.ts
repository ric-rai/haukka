import * as fs from "fs";

export const parseStatements = (path: string) => {
  return fs
    .readFileSync(path, "utf8")
    .split(";\n")
    .filter(Boolean)
    .reduce((acc, rawStatement) => {
      let [name, statement] = rawStatement.split(":\n");
      name = name.replace(/(--\s?|\n)/g, "");
      statement = statement.replace(/\n/g, " ").replace(/\s\s+/g, " ").replace(/\`/g, "");
      acc[name] = statement;
      return acc;
    }, {} as { [key: string]: string });
};
