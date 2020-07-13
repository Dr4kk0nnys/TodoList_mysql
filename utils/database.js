import mysql from 'mysql'

/*
    x TODO: Add the [add, remove, read, update] methods
    * TODO: Check if there is a way to create a db if it doesn't exist
    * TODO: Try to do a mini web version using http
    * TODO: Try to do a mini interface using Electron
*/

class Database {
    constructor(database_name, table_name) {
        this.databaseName = database_name
        this.tableName = table_name

        this.database = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: this.databaseName
        })

        this.connectDatabase()

        // this.readAll()
        // this.add({ todo: 'This is awesome' })
        this.read(1)
        this.read(2)
    }

    connectDatabase() {
        this.database.connect((err) => {
            if (err) throw new Error(err.sqlMessage)

            console.log('Connection established!')
        })
    }

    readAll() {
        const query = `SELECT * FROM ${this.tableName}`
        this.database.query(query, (err, res) => {
            if (err) throw err

            console.log(res)
        })
    }

    read(id = 1) {
        const query = `SELECT * FROM ${this.tableName} WHERE id = ${id}`
        this.database.query(query, (err, res) => {
            if (err) throw err

            console.log(res)
        })
    }

    add(data) {
        const query = `INSERT INTO ${this.tableName} SET ?`
        this.database.query(query, data, (err, res) => {
            if (err) throw err

            console.log(res)
        })
    }

    remove(id) {
        const query = `DELETE FROM ${this.tableName} WHERE id = ${id}`
        this.database.query(query, (err, res) => {
            if (err) throw err

            console.log(res)
        })
    }

    update(id, data) {
        const query = `UPDATE ${this.tableName} SET todo = '${data}' WHERE id = ${id}`
        this.database.query(query, (err, res) => {
            if (err) throw err

            console.log(res)
        })
    }
}

export default Database