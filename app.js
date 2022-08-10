import express from 'express';
import { PORT } from './config/Config.js';
import { routeGrades } from './routes/Grades.js';

const app = express();
app.use(express.json())

routeGrades(app);

app.listen(process.env.PORT || PORT, () => {
    console.log("A api foi iniciada. Servidor rodando na porta " + PORT, 'general');
});