import { execSync } from "child_process";
import * as fs from "fs";
import { resolve } from "path";

const input = `./src/api/v1/apiDoc.yml`;
const output = `./src/api/v1/generated`;
const name = `v1HaukkaClient`;

execSync(`openapi --input ${input} --output ${output} --name ${name}`);

const apiDoc = execSync(`js-yaml src/api/v1/apiDoc.yml`).toString();
const typeExport = `export type ApiDoc = ${apiDoc}`;
const path = resolve(__dirname, "../src/api/v1/apiDoc.ts");
fs.writeFileSync(path, typeExport);
