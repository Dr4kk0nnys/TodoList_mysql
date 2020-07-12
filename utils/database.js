import mysql from 'mysql'

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