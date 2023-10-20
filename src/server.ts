import express from "express";
import router from './router/routers';

const app = express();

const port =  8080;

app.use('/', router);


app.listen(port, () => {console.log(port)}); 