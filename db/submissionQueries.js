import { poolPromise, sql } from "./pool.js";
export async function createSubmission(taskId, studentId, fileName, grade = 0) {
    const pool = await poolPromise;
    await pool
        .request()
        .input('taskId', sql.Int, taskId)
        .input('studentId', sql.Int, studentId)
        .input('fileName', sql.NVarChar, fileName)
        .input('grade', sql.Int, grade)
        .query(`
                INSERT INTO submissions(taskId, studentId, fileName, grade)
                VALUES(@taskId, @studentId, @fileName, @grade)
            `);
}

export async function getSubmissionsByTaskId(taskId) {
    const pool = await poolPromise;
    const result = await pool
        .request()
        .input('taskId', sql.Int, taskId)
        .query(`SELECT * FROM submissions WHERE taskId = @taskId`);
    return result.recordset;
}

export async function gradeSubmission(id, grade) {
    const pool = await poolPromise;
    await pool
        .request()
        .input('id', sql.Int, id)
        .input('grade', sql.Int, grade)
        .query(`UPDATE submissions SET grade = @grade WHERE id = @id`);
}