import express, { Express } from 'express';
import basicRoute from './api/v1/routes/basic'; 
import morgan from 'morgan';

const app: Express = express();
const port = 3000;

app.use(morgan("combined"));
app.use('/api/v1/routes/', basicRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
