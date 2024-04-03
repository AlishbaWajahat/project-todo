import inquirer from "inquirer";
let array = [];
let condition = true;
function firstQuestion(items) {
    array.push(items.item);
    if (!items.item) {
        throw new Error(`Adding atleast one item is mandatory before proceeding further`);
    }
    return items;
}
firstQuestion(await inquirer.prompt({
    message: "Add item in your list",
    type: "input",
    name: "item"
}));
function read() {
    for (let i = 0; i < array.length; i++) {
        console.log('.', array[i]);
    }
}
while (condition) {
    let answer2 = await inquirer.prompt({
        message: "What do you want to do now",
        type: "list",
        name: "Options",
        choices: [
            "Add more items",
            "Delete something",
            "Update something",
            "Nothing"
        ]
    });
    if (answer2.Options === "Add more items") {
        firstQuestion(await inquirer.prompt({
            message: "Add further item in your list",
            type: "input",
            name: "item",
        }));
        read();
    }
    else if (answer2.Options === "Delete something") {
        let Delete = await inquirer.prompt({
            message: "Which item do you want to delete?",
            type: "list",
            name: "deletedItem",
            choices: array.map(val => val)
        });
        let index = array.indexOf(Delete.deletedItem);
        array.splice(index, 1);
        read();
    }
    else if (answer2.Options === "Update something") {
        let update = await inquirer.prompt([{
                message: "Which item do you want to update?",
                type: "list",
                name: "updatingElement",
                choices: array.map(val => val)
            }, {
                message: "Enter the updated item",
                type: "input",
                name: "updatedItem"
            }]);
        let Index = array.indexOf(update.updatingElement);
        array.splice(Index, 1, update.updatedItem);
        read();
    }
    else if (answer2.Options === "Nothing") {
        console.log(`Okay, here is your final list`);
        read();
    }
    else {
        console.log(`You probably made a mistake , check again!`);
    }
    let answer3 = await inquirer.prompt({
        message: "Do you want to edit more?",
        type: "confirm",
        name: "confirm",
        default: "false",
    });
    condition = answer3.confirm;
}
