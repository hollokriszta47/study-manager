import { poolPromise , sql } from "./pool.js";

export async function getAllProjects() {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .query('SELECT * FROM projects');
    return result.recordset;
}

export async function createProject(code, description, teacherId) {
    const pool = await poolPromise;
    await pool
        .request()
        .input('code', sql.NVarChar, code)
        .input('description', sql.NVarChar, description)
        .input('teacherId', sql.Int, teacherId)
        .query(`
            INSERT INTO projects(code, description, teacherId)
            VALUES(@code, @description, @teacherId)
        `);
}

export async function deleteProjectById(id) {
    const pool = await poolPromise;
    await pool
        .request()
        .input('id', sql.Int, id)
        .query('DELETE FROM projects WHERE id = @id');

}