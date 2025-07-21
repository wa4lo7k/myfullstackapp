import { Router } from 'express';
import {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from '../controllers/appointmentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createAppointment);
router.get('/', authMiddleware, getAppointments);
router.put('/:id', authMiddleware, updateAppointment);
router.delete('/:id', authMiddleware, deleteAppointment);

export default router; 