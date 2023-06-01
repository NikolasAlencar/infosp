import { Cols } from "../model/Cols";

const cols: Cols = [
  { code: 1, value: 482 },
  { code: 2, value: 704 },
  { code: 3, value: 906 },
  { code: 4, value: 2561 },
];

export function ajustaGrid(){
  const result = cols.filter((cols) => cols.value > window.innerWidth);
  return result[0].code
}
