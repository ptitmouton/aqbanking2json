import { stdin } from "process";
import { parse } from "./lib/parse";

const parseFromStdin = async () => {
  return new Promise<Record<string, any>>((resolve, reject) => {
    let content = "";
    stdin.setEncoding("utf-8");
    stdin.on("data", (chunk) => {
      content += chunk;
    });
    stdin.on("error", (err) => {
      const error = new Error(`Error reading from stdin: ${err.message}`);
      error.cause = err;
      reject(error);
    });
    stdin.on("end", () => {
      const parsed = parse(content);
      resolve(parsed);
    });
  });
};

const result = await parseFromStdin();
const resultString = JSON.stringify(result);
console.log(resultString);
