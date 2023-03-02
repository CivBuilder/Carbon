// Server structure loosely based on:
// https://www.asapdevelopers.com/build-a-react-native-login-app-with-node-js-backend/

import express from 'express';
import sequelize from './utils/Database.js';
import router from './routes/Routes.js';
import ForumContent from './models/ForumContent.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.use(router);

sequelize.sync();

const port = 3000;
app.listen(port, () => {
    console.log(`Carbon server launched and is listening on port ${port}`);
});
