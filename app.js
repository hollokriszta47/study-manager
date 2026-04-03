import express from 'express';
import session from 'express-session';
import { router  } from './router/web.js';
import { requireLogin } from './middleware/authMiddleware.js';
import { listProjects } from './controllers/projectController.js';
import { router as apiRouter } from './router/api.js';
import hbs from 'hbs';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
hbs.registerPartials('views/partials');
hbs.registerHelper('eq', (a,b) => a === b);
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(
    session({
        secret: 'secret-key',
        resave:false,
        saveUninitialized:false,
    })
);

app.use('/api', apiRouter);
app.use('/', router);
router.get('/', requireLogin, listProjects);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
