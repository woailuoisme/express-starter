import {createRequire} from "module";
const require = createRequire(import.meta.url);
const prompts = require('prompts');

export const  askForName = async () => {
    return await prompts([
        {
            type: 'text',
            name: 'username',
            message: 'What is your GitHub username?'
        },
        {
            type: 'number',
            name: 'number',
            message: 'How old are you?',
            validate: value => value < 18 ? `Nightclub is 18+ only` : true
        },
        {
            type: 'multiselect',
            name: 'color',
            message: 'Pick colors',
            choices: [
                { title: 'Red', value: '#ff0000' },
                { title: 'Green', value: '#00ff00' },
                { title: 'Blue', value: '#0000ff' }
            ],
        },
        {
            type: 'confirm',
            name: 'value',
            message: 'Can you confirm?',
            initial: true
        },
        {
            type: 'toggle',
            name: 'toggle',
            message: 'Can you confirm?',
            initial: true,
            active: 'yes',
            inactive: 'no'
        }
    ]);
};
const result =await askForName()

console.log(result)
