import * as HTTPS from "https";

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
