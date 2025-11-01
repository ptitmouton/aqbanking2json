import { stdin } from "process";
import { parse } from "./lib/parse";

const parseFromStdin = async () => {
  let content = "";
  stdin.setEncoding("utf-8");
  stdin.on("data", (chunk) => {
    content += chunk;
  });
  stdin.on("error", (err) => {
    console.error("Error reading from stdin:", err);
    process.exit(1);
  });
  stdin.on("end", () => {
    const parsed = parse(content);
    console.log(JSON.stringify(parsed, null, 2));
    process.exit(0);
  });
};

await parseFromStdin();
