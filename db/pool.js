import sql from 'mssql'
const config = {
    user: 'sa',
    password: '12345',
    server: 'localhost',
    database: 'StudyManager',
    port:1433,
    options : {
        trustServerCertificate: true,
        encrypt: false,
    },
};

export const poolPromise = new sql.ConnectionPool(config)
.connect()
.then((pool) => {
    console.log("Connected to StudyManager database");
    return pool;
})
.catch((err) => {
    console.error('Database connection error: ', err);
});
export { sql };