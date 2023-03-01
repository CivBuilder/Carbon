import express from 'express';
import sequelize from './utils/database.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World')
});

sequelize.sync();

const port = 3000;
app.listen(port, () => {
    console.log(`Carbon server launched and is listening on port ${port}`);
});
