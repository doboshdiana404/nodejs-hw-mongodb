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
// import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use(authenticate);

router.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getAllContacts));
router.get(
  '/:id',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getContactById),
);
router.post(
  '/',
  checkRoles(ROLES.TEACHER),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/:id',
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);
router.delete(
  '/:id',
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(deleteContactController),
);
router.put(
  '/:id',
  checkRoles(ROLES.TEACHER),
  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);
export default router;
