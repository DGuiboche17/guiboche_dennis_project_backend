import { Router } from 'express';
const router = Router();

router.get('/', (_req, res) => {
  res.send('Hello! I am from the basic route.');
})

export default router;