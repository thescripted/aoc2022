import { readFile } from 'node:fs';

readFile('./input.txt', { encoding: 'utf-8' }, (err, data) => {
  if (err) {
    return;
  }

  console.log(data
    .split(/\n/)
    .filter(line => line)
    .map(contains_within)
    .reduce<number>(sum, 0));
});

function contains_within(input: string): boolean {
  const [left, right] = input.split(',');
  const left_pair = left.split('-').map(s => Number(s));
  const right_pair = right.split('-').map(s => Number(s));

  return left_pair[0] <= right_pair[0] && left_pair[1] >= right_pair[1]
  ||     right_pair[0] <= left_pair[0] && right_pair[1] >= left_pair[1]
  ||     left_pair[1] >= right_pair[0] && left_pair[0] <= right_pair[0]
  ||     left_pair[0] <= right_pair[1] && left_pair[1] >= right_pair[1]
  ;
}

function sum(total: number, curr: boolean): number {
  return total + Number(curr);
}
