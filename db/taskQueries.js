import { poolPromise, sql } from "./pool.js";

export async function getTasksByProjectId(projectId) {
    const pool = await poolPromise;
    const result = await pool
    .request()
    .input('projectId', sql.Int, projectId)
    .query('SELECT * FROM tasks where projectId = @projectId');
    return result.recordset;
}

export async function createTask(projectId, title, dueDate, fileName) {
    const pool = await poolPromise;
    await pool
    .request()
    .input('projectId', sql.Int, projectId)
    .input('title', sql.NVarChar, title)
    .input('dueDate', sql.Date, dueDate)
    .input('fileName', sql.NVarChar, fileName)
    .query(`INSERT INTO tasks (projectId, title, dueDate, fileName)
            VALUES (@projectId, @title, @dueDate, @fileName)`);
}

export async function deleteTaskById(id) {
    const pool = await poolPromise;
    const result = await pool
    .request()
    .input('id', sql.Int, id)
    .query('DELETE FROM tasks WHERE id = @id');
    return result.rowsAffected[0] > 0;
}