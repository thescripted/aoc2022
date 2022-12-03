import { readFile } from 'node:fs';

readFile('./input.txt', { encoding: 'utf-8' }, (err, data) => {
  if (err) {
    return;
  }
  const pt1 = data
    .split(/\n/)
    .map(getPriorityNumber)
    .reduce(sum);

  console.log(pt1); // <-- part 1

  const pt2 = data
    .split(/\n/)
    .filter(line => line)
    .reduce(batch, [])
    .map(getPriorityNumberForBatch)
    .reduce(sum);

  console.log(pt2); // <-- part 2
});
function getPriorityNumber(input: string): number {
  const priorityCode = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const len = input.length;
  const left = input.slice(len / 2)
  const right = input.slice(0, len / 2)
  const right_set = new Set(right);

  let res = 0;
  left.split('').forEach(c => {
    if (right_set.has(c)) {
      res = priorityCode.indexOf(c) + 1;
    }
  });

  return res;
}

function getPriorityNumberForBatch(input: string[]): number {
  const priorityCode = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const set_list = [new Set(input[0]), new Set(input[1])];
  const source = input[2];

  let res = 0;
  source.split('').forEach(c => {
    if (set_list[0].has(c) && set_list[1].has(c)) {
      res = priorityCode.indexOf(c) + 1;
    }
  });

  return res;
}

function batch(agg: string[][], curr: string, idx: number): string[][] {
  if (idx % 3 === 0) {
    agg.push([]);
  }

  agg[agg.length - 1].push(curr);
  return agg;
}


function sum(total: number, curr: number): number {
  return total + curr;
}
