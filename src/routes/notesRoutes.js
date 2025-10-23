import { Router } from 'express';
import { Segments, celebrate } from 'celebrate';
import {
	getAllNotes,
	getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();
router.use('/notes', authenticate);
router.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
router.get('/notes/:noteId', celebrate(noteIdSchema), getNoteById);
router.post('/notes', celebrate(createNoteSchema), createNote);
router.delete('/notes/:noteId', celebrate(noteIdSchema), deleteNote);
router.patch('/notes/:noteId',
   celebrate({
  [Segments.PARAMS]: noteIdSchema[Segments.PARAMS],
  [Segments.BODY]: updateNoteSchema[Segments.BODY]}), updateNote);

export default router;
