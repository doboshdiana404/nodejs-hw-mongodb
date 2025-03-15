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
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();
router.get('/contacts', ctrlWrapper(getAllContacts));
router.get('/contacts/:id', isValidId, ctrlWrapper(getContactById));
router.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/contacts/:id',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
router.delete('/contacts/:id', ctrlWrapper(deleteContactController));
router.put(
  '/contacts/:id',
  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);

export default router;
