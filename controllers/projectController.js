import {
    getAllProjects,
    createProject,
    deleteProjectById
} from '../db/projectQueries.js';

export async function listProjects(req, res) {
    const projects = await getAllProjects();
    res.render('projects', {
        projects,
        user: req.session.user
    });
}

export async function createProjectHandler(req,res) {
    if(req.session.user.role !== 'teacher') {
        return res.status(403).send('Only teacher can create projects');
    }
    const { code, description } = req.body;
    await createProject(
        code,
        description,
        req.session.user.id
    );
    res.redirect('/');
}
export async function deleteProjectHandler(req,res) {
    if(req.session.user.role !== 'teacher') {
        return res.status(403).send('Only teacher can delete projects');
    }
    const id = req.params.id;
    await deleteProjectById(id);
    res.redirect('/');
}