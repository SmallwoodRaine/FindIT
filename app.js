import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './server/routes/index.js';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(`Error ${err}`);
    next();
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send(`Error: ${err}`);
    next();
});

routes(app);

export default app;