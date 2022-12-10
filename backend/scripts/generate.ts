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
Object.keys(apiDoc.paths).forEach((path: any) => {
  const methods = Object.keys(apiDoc.paths[path]).filter((k) =>
    k.match(/get|head|post|put|delete|connect|options|trace|patch/)
  );
  methods.forEach((method: any) => {
    const { responses } = apiDoc.paths[path][method];
    Object.keys(responses).forEach((code: any) => {
      const { content } = responses[code];
      const { schema } = content[Object.keys(content)?.[0]];
      if (schema) responses[code].schema = schema;
    });
  });
});

const typeExport = `export type ApiDoc = ${JSON.stringify(apiDoc)}`;
const formatted = format(typeExport, { parser: "typescript" });
const path = resolve(__dirname, "../src/api/v1/apiDoc.ts");
fs.writeFileSync(path, formatted);
