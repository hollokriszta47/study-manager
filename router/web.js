import express from 'express';
import multer from 'multer';
import{
    loginForm,
    loginUser,
    logoutUser
} from '../controllers/authController.js';

import { requireRole, requireLogin } from '../middleware/authMiddleware.js';
import { 
    createTaskHandler, 
    listTasks,
    createTaskForm,
    submitSolution,
    gradeSolution
} from '../controllers/taskController.js';
import { createProjectHandler } from '../controllers/projectController.js';

const upload = multer({dest: 'uploads/'});
const router = express.Router();

router.post(
    '/projects/:id/tasks',
    requireRole('teacher'),
    upload.single('file'),
    createTaskHandler
);

router.get('/projects/:id/tasks', requireLogin, listTasks);
router.get('/projects/:id/tasks/create', requireRole('teacher'), createTaskForm);

router.get('/login', loginForm);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post(
    '/projects',
    requireRole('teacher'),
    createProjectHandler
    );

router.get('/teacher', requireRole('teacher'), (req, res) =>{
    res.send('Teacher');
});

router.get('/student', requireRole('student'), (req, res) =>{
    res.send('Student');
});

router.post(
    '/tasks/:taskId/submit',
    requireRole('student'),
    upload.single('solution'),
    submitSolution
);

router.post(
    '/submissions/:id/grade',
    requireRole('teacher'),
    gradeSolution
);

export { router };
