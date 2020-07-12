### Instructions about non-used methods, but important ones

#### In order to create a database:
function createDatabase(databaseName = 'Database') {
    const createDatabaseQuery = 'CREATE DATABASE ' + databaseName
    database.query(createDatabaseQuery, (err, res) => {
        if (err) throw err

        console.log('Database created!)
    })
}

#### In order to create a table:
function createTable(tableName = 'table', attributes = ['name VARCHAR(255)', 'value VARCHAR(255)']) {
    const query = `CREATE TABLE ${tableName} (${attributes.join(', ')})`
    database.query(query, (err, res) => {
        if (err) throw err

        console.log('Table created!')
    })
}

1. ID is responsible for characterizing the element
1. PRIMARY KEY is responsible for telling the database who is responsible for characterizing the element
1. AUTO_INCREMENT is responsible for every time something is added to the database, it's id grows
1. VARCHAR is responsible for holding the value of the element, VARCHAR is an array of chars ( string )
1. INT is responsible for holding the value of the id

#### In order to remove both Database and Table:
function deleteDatabase(databaseName) {
    const query = `DROP DATABASE ${databaseName}`
    database.query(query, (err, res) => {
        if (err) throw err

        console.log('Successfully removed the database')
    })
}