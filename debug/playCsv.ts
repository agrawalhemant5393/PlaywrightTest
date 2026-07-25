import fs from "fs";
import path from "node:path";
import { parse } from "csv-parse/sync";

function readCSV(filePath: string) {
  const csvDataStr = fs.readFileSync(filePath, { encoding: "utf-8" });

  const csvArray = parse(csvDataStr, {
    skip_empty_lines: true,
    columns: true,
    trim: true,
  });

  return csvArray;
}

const filePath = path.resolve(
  `${process.cwd()}/data/functional/make-apt-testdata.csv`,
);
console.log(readCSV(filePath));