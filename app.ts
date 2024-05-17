import * as readline from 'readline';
import { getTodos, addTodo, deleteTodo } from './database';

console.log(`
_____ ___    ____   ___  
|_   _/ _ \\  |  _ \\ / _ \\ 
  | || | | | | | | | | | |
  | || |_| | | |_| | |_| |
  |_| \\___/  |____/ \\___/ 
`);
let todos: { id: number, task: string, since: Date }[] = [];
let flag:boolean = false;
async function main() {
    while(!flag){
        console.log('[S]how [A]dd [C]omplete [Q]uit ');
        let answer:string | undefined = await getInput();
    
        switch(answer){ 
            case 'q':
                process.exit();
            case 'a':
                console.log("enter the task you wish to ")
                let added:string | undefined = await getInput();
                if(added){
                    await addTodo(added);
                    todos = await getTodos();
                }
                break;
            case 's':
                todos = await getTodos()
                printTodos(todos)
                break;
            case 'c':
                todos = await getTodos()

                printTodos(todos);
                console.log("enter the number of the task you wish to remove");
                let removed = await (getInput());
                let id:number = Number(removed);
                deleteTodo(id);
                todos = await getTodos();
                break;
            default:
                console.log("incorrect input")
                
                
                


        }



    
    }

}

function input(query: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,

    });

    return new Promise<string>((resolve) => {
        rl.question(query, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

async function getInput(): Promise<string | undefined> {
    try{
        let option:string = await input("enter: ");
        option = option.toLowerCase();
        return option;}
        catch(error){
            console.log("something went wrong");
        }
    }

function printTodos(todo: {id:number, task:string, since: Date}[]){
    if(todo.length === 0){
        console.log("not tasks found.");
        return;
    }

    console.log("your tasks: ");
    todo.forEach(todo => {
        console.log(`ID: ${todo.id}`);
        console.log(`Task: ${todo.task}`);
        console.log(`Since: ${new Date(todo.since).toLocaleString()}`);
        console.log('--------------------------------');

    });
}


main()