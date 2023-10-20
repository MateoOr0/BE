import { Router } from 'express';

const router = Router();

router.get('/', (_, res) => {
  res.send('😎😎');
});

router.get('/bom', (_, res) => {
    res.send('💣💣💥😛');
  });

export default router;
