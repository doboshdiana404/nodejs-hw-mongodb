import { Router } from 'express';

import {
  createContactController,
  deleteContactController,
  getAllContacts,
  getContactById,
  patchContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();
router.get('/contacts', ctrlWrapper(getAllContacts));
router.get('/contacts/:id', ctrlWrapper(getContactById));
router.post('/contacts', ctrlWrapper(createContactController));
router.patch('/contacts/:id', ctrlWrapper(patchContactController));
router.delete('/contacts/:id', ctrlWrapper(deleteContactController));
router.put('/contacts/:id', ctrlWrapper(upsertContactController));

export default router;
