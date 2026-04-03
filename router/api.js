import express from 'express'
import { deleteProjectById } from '../db/projectQueries.js';
import { deleteTaskById } from '../db/taskQueries.js';
import { requireRole } from '../middleware/authMiddleware.js';

const router = express.Router();
router.delete('/projects/:id', requireRole('teacher'), async(req, res) => {
    const id = req.params.id;
    await deleteProjectById(id);
    res.json( { success: true });
});

router.delete('/tasks/:id', requireRole('teacher'), async(req, res) => {
    const id = req.params.id;
    await deleteTaskById(id);
    res.json( { success: true });
});

export { router };