import { OptionValues, program } from 'commander'
import * as packageJson from '../package.json'
import * as readline from 'readline'
import { Convert } from './json_to_golang_struct'

program
    .name(packageJson.name)
    .description(packageJson.description)
    .version(packageJson.version)

program.parse();

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let input : string = "";
let lastInput : string = "NULL";
const ReadLineBlocking = () => {
    rl.question('>', (answer) => {
        input += answer;
        if (answer === '' && lastInput === '') {
            const outputs : string[] = Convert(input)
            outputs.forEach(out => {
                console.log(out)
            });
            return rl.close();
        }
        lastInput = answer;
        ReadLineBlocking();
    })
};

ReadLineBlocking()