import { readFile } from 'node:fs';

readFile('./input.txt', { encoding: 'utf-8' }, (err, data) => {
  if (err) {
    return;
  }

  const result = data.split('\n')
    .map(parse_input_line)
    .map(compute_sum)
    .reduce(total, 0);

  console.log(result); // <-- part 2
});

function parse_input_line(input: string): [string, string] {
  let [left, right] = input.split(' ')
  return [left, right]
}

function compute_sum(input: [string, string]): number {
  // modified between part 1 and 2. Only part 2 solution is shown.
  let [opp, me] = input;
  let shape_score = 0;
  let outcome_score = 0;

  switch(me) {
    case 'X':
      outcome_score = 0;
      switch(opp) {
        case 'A': shape_score = 3; break;
        case 'B': shape_score = 1; break;
        case 'C': shape_score = 2; break;
      }
      break;
    case 'Y':
      outcome_score = 3;
      switch(opp) {
        case 'A': shape_score = 1; break;
        case 'B': shape_score = 2; break;
        case 'C': shape_score = 3; break;
      }
      break;
    case 'Z':
      outcome_score = 6;
      switch(opp) {
        case 'A': shape_score = 2; break;
        case 'B': shape_score = 3; break;
        case 'C': shape_score = 1; break;
      }
      break;
  }

  return shape_score + outcome_score;
}

function total(curr: number, input: number): number {
  return curr + input;
}
