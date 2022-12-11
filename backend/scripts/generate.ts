import { execSync } from "child_process";
import * as fs from "fs";
import { resolve } from "path";
import { format } from "prettier";

const input = `./src/api/v1/apiDoc.yml`;
const output = `./src/api/v1/generated`;
const name = `v1HaukkaClient`;

execSync(`openapi --input ${input} --output ${output} --name ${name}`);

const apiDocJSON = execSync(`js-yaml src/api/v1/apiDoc.yml`).toString();

const apiDoc = JSON.parse(apiDocJSON);
const typeExport = `export type ApiDoc = ${JSON.stringify(apiDoc)}`;
const formatted = format(typeExport, { parser: "typescript" });
const path = resolve(__dirname, "../src/api/v1/apiDoc.ts");
fs.writeFileSync(path, formatted);
