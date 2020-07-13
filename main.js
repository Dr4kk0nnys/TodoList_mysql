import PromptSync from "prompt-sync";
import Database from './utils/database.js'

const input = PromptSync({ sigint: true })
const database = new Database('ToDoList', 'ToDos')

async function asyncCall() {
    let flag = true
    while (flag) {
        const question = input('> ').split(' ')

        switch (question[0]) {
            case 'read':

                if (question.length === 2 && /^\d+$/.test(question[1]))
                    console.table(await database.read(question[1]))

                break

            case 'readAll':
                console.table(await database.readAll())
                break

            case 'add':
                if (question.length >= 2) {
                    const todo = question.splice(1, question.length - 1).join(' ')

                    const result = await database.add({ todo })
                    console.table(result)
                }
                break

            case 'remove':

                if (question.length === 2 && /^\d+$/.test(question[1]))
                    console.table(await database.remove(question[1]))

                break

            case 'update':
                if (question.length >= 3 && /^\d+$/.test(question[1])) {
                    const todo = question.splice(2, question.length - 1).join(' ')

                    const result = await database.update(question[1], { todo })
                    console.table(result)
                }
                break
            case 'exit':
                flag = false
                break
        }

        // Reset it value set's the id to the last value
        await database.resetIdValue()
    }

    database.close()
}

asyncCall()