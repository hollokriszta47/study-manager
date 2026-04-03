import { createTask, getTasksByProjectId } from '../db/taskQueries.js';
import { createSubmission, getSubmissionsByTaskId, gradeSubmission } from '../db/submissionQueries.js';

export async function createTaskHandler(req,res) {
    if(req.session.user.role !== 'teacher') {
        return res.status(403).send('Only teachers can create tasks');

    }
    const projectId = req.params.id;
    const { title, dueDate } = req.body;
    const fileName = req.file.filename;
    await createTask(projectId, title, dueDate,fileName);
    res.redirect(`/projects/${projectId}/tasks`);
}

export async function listTasks(req, res) {
    const projectId = req.params.id;
    const tasks = await getTasksByProjectId(projectId);
    for(let task of tasks) {
        task.submissions = await getSubmissionsByTaskId(task.id);
        for(let sub of task.submissions) {
            sub.studentId = Number(sub.studentId);
        }
    }

    const user = {
        ...req.session.user,
        id: Number(req.session.user.id)
    };

    res.render('tasks', {
        tasks,
        projectId,
        user
    });
}

export function createTaskForm(req, res) {
    const projectId = req.params.id;
    res.render('createTask', {
        projectId,
        user: req.session.user
    });
}

export async function submitSolution(req, res) {
    if(req.session.user.role !== 'student') {
        return res.status(403).send('Only students can submit');
    }
    const taskId = req.params.taskId;
    const studentId = req.session.user.id;
    const fileName = req.file.filename;
    await createSubmission(taskId, studentId, fileName);
    res.redirect(req.get('Referrer') || '/');
}

export async function gradeSolution(req, res) {
    if(req.session.user.role !== 'teacher') {
        return res.status(403).send('Only teachers can grade submissions');
    }
    const submissionId = req.params.id;
    const { grade } = req.body;
    await gradeSubmission(submissionId, grade);
    res.redirect(req.get('Referrer') || '/');
}
