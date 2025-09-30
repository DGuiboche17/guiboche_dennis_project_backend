import express, { Express } from 'express';
import morgan from 'morgan';

// Routes
import basicRoute from './api/v1/routes/basic';
import employeeRoutes from './api/v1/routes/employeeRoutes';
import branchRoutes from './api/v1/routes/branchesRoutes';

const app: Express = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(morgan('combined'));

// Healthcheck
app.get('/api/v1/health', (_req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

// Routes
app.use('/api/v1/routes', basicRoute);  
app.use('/api/v1/employees', employeeRoutes); 
app.use('/api/v1/branches', branchRoutes); 
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
