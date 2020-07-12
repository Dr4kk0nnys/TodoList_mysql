import mysql from 'mysql'

/*
    * TODO: Add the [add, remove, read, update] methods
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

        this.readAll()
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
}

export default Database