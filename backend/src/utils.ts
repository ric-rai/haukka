import * as HTTPS from "https";
import { Result } from "oracledb";

export const https = {
  get: (url: string) => {
    return new Promise<string>(function (resolve, reject) {
      HTTPS.get(url, (resp) => {
        let data = "";
        resp.on("data", (chunk) => (data += chunk));
        resp.on("end", () => resolve(data));
      }).on("error", (e) => reject(e));
    });
  },
};

export type LajiUser = {
  id: `MA.${number}`;
  fullName: string;
  emailAddress: string;
  defaultLanguage: "fi";
  role: string[];
  "@context": string;
};

type IndexKeys<A extends readonly unknown[]> = Exclude<keyof A, keyof []>;

export type TupleToObject<Row extends any[], Keys extends string[]> = {
  [K in IndexKeys<Keys> & IndexKeys<Row> as Keys[K] extends string ? Keys[K] : never]: Row[K];
};

export type EmptyResult = { rows: [void] | undefined };

export function isNotEmptyResult<T>(result: Result<T> | EmptyResult): result is { rows: T[] } {
  return (result as { rows: [] | undefined }).rows?.length || 0 === 0;
}
