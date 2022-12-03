import { readFile } from 'node:fs';

readFile('./input.txt', { encoding: 'utf-8' }, (err, data) => {
  if (err) {
    return;
  }

  let reindeer_cal = data.split(/\n\n/).map(reindeer_total_calories);
  const sorted_reindeer = reindeer_cal.sort();

  console.log(sorted_reindeer[sorted_reindeer.length - 1]); // <-- part 1

  console.log(sorted_reindeer[sorted_reindeer.length - 1] +
              sorted_reindeer[sorted_reindeer.length - 2] +
              sorted_reindeer[sorted_reindeer.length - 3]); // <-- part 2
});

function reindeer_total_calories(reindeer: string): number {
  return reindeer.split(/\n/).reduce<number>((total, curr) => {
    total += Number(curr);
    return total;
  }, 0);
}
