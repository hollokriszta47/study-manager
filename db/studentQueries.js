import { poolPromise, sql } from './pool.js';
//login
export async function getStudentByUsername(username) {
    const pool = await poolPromise;
    const result = await pool
    .request()
    .input('username', sql.NVarChar, username)
    .query(`SELECT id, username, passwordHash
            FROM students
            WHERE username = @username
        `);
    return result.recordset[0] ?? null;
}