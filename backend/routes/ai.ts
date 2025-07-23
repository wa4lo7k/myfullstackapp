import { Router } from 'express';
import { getAIInsights } from '../controllers/aiController';

const router = Router();

router.get('/insights', getAIInsights);

export default router;