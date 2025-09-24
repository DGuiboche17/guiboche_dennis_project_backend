import express, { Express } from 'express';
import basicRoute from './api/v1/routes/basic'; 
import morgan from 'morgan';

const app: Express = express();
const port = 3000;

app.get("/api/v1/health", (_req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

app.use(morgan("combined"));
app.use('/api/v1/routes/', basicRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;