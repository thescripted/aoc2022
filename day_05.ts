import { readFile } from 'node:fs';

readFile('./input.txt', { encoding: 'utf-8' }, (err, data) => {
  if (err) {
    return;
  }

  const [rawCratesInput, operations] = data.split(/\n\n/);
  const crateStacks = parseCrateInput(rawCratesInput);

  operations
    .split(/\n/)
    .filter(line => line)
    .forEach(op => runOperation(op, crateStacks));

  const value = crateStacks.reduce<string>((value, crate) => {
     return value += crate[0]
   }, '');

   console.log(value); // part 2
});

function parseCrateInput(input: string) {
  const crateStacks = Array.from<string[]>({length: 9}).map<string[]>(() => []);

  input.split(/\n/).forEach(inp => {
    [...inp.matchAll(/[A-Z]/g)].forEach((crate) => {
      const crateIndex = crate.index;
      if (!crateIndex) {
        return;
      }
      const idx = (crateIndex - 1) / 4
      crateStacks[idx].push(crate[0])
    })
  });

  return crateStacks
}

function runOperation(op: string, crateStacks: string[][]) {
    const [rawAction, rawSource, rawDest] = [...op.matchAll(/\d+/g)];

    const action = Number(rawAction[0])
    const source = Number(rawSource[0]) - 1
    const dest = Number(rawDest) - 1

    const crateBuffer: string[] = []
    for (let i = 0; i < action; i++) {
      const crate = crateStacks[source].shift()

      if (!crate) {
        throw new Error("invalid input");
      }

      crateBuffer.push(crate);
    }

    const destinationStack = crateStacks[dest]
    for (let i = 0; i < action; i++) {
      const crate = crateBuffer.pop();

      if (!crate) {
        throw new Error("invalid input");
      }

      destinationStack.unshift(crate);
    }
}
