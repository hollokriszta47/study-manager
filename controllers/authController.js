import bcrypt from 'bcrypt';
import { getTeacherByUsername } from '../db/teacherQueries.js';
import { getStudentByUsername } from '../db/studentQueries.js';
export function loginForm(req,res) {
    res.render('login');
}

export async function loginUser(req,res) {
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    let user = null;
    if(role === 'teacher') {
        user = await getTeacherByUsername(username)
    } else if(role === 'student') {
        user = await getStudentByUsername(username);
    }
    if(!user) {
        return res.render('login', { error: 'User not found' });
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if(!match) {
        return res.render('login', { error: 'Invalid password' });
    }
    const session = req.session;
    session.user = {
        id: user.id,
        username: user.username,
        role: role,
    };

    req.session.save((err) => {
        if(err) {
            return res.render('login', { error: 'Session error'});        
        }
        return res.redirect('/');
    });
    
    return null;
}

export function logoutUser(req, res) {
    req.session.destroy(() => {
        return res.redirect('/login');
    });
}
