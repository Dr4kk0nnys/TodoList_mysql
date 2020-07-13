import mysql from 'mysql'

/*
    x TODO: Add the [add, remove, read, update] methods
    x TODO: Check if there is a way to create a db if it doesn't exist
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
    }

    connectDatabase() {
        this.database.connect((err) => {
            if (err) throw new Error(err.sqlMessage)

            console.log('Connection established!')
        })
    }

    readAll() {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${this.tableName}`
            this.database.query(query, (err, res) => {
                if (err) return reject(err)

                resolve(res)
            })
        })
    }

    read(id = 1) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${this.tableName} WHERE id = ${id}`
            this.database.query(query, (err, res) => {
                if (err) return reject(err)

                resolve(res)
            })
        })
    }

    add(data = { todo: 'Empty object' }) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO ${this.tableName} SET ?`
            this.database.query(query, data, (err, res) => {
                if (err) return reject(err)

                resolve(res)
            })
        })
    }

    remove(id = 1) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM ${this.tableName} WHERE id = ${id}`
            this.database.query(query, (err, res) => {
                if (err) return reject(err)

                resolve(res)
            })
        })
    }

    update(id = 1, data = { todo: 'Empty object' }) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE ${this.tableName} SET todo = '${data.todo}' WHERE id = ${id}`
            this.database.query(query, (err, res) => {
                if (err) return reject(err)

                resolve(res)
            })
        })
    }

    close() {
        this.database.end((err) => {
            if (err) throw err

            console.log('MySQL database closed!')
        })
    }
}

export default Database