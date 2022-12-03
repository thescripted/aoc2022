import { readFile } from 'node:fs';

readFile('./input.txt', { encoding: 'utf-8' }, (err, data) => {
  if (err) {
    return;
  }

  let calories = data
      .split(/\n\n/)
      .map(reindeer_total_calories)
      .sort();

  console.log(calories[calories.length - 1]); // <-- part 1

  console.log(calories[calories.length - 1] +
              calories[calories.length - 2] +
              calories[calories.length - 3]); // <-- part 2
});

function reindeer_total_calories(reindeer: string): number {
  return reindeer.split(/\n/).reduce<number>((total, curr) => {
    total += Number(curr);
    return total;
  }, 0);
}
