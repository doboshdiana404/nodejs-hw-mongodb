import createHttpError from 'http-errors';

import { ROLES } from '../constants/index.js';
import Contact from '../models/contact.js';

export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    const { user } = req;
    if (!user) {
      next(createHttpError(401));
      return;
    }

    const { role } = user;
    if (roles.includes(ROLES.TEACHER) && role === ROLES.TEACHER) {
      next();
      return;
    }

    if (roles.includes(ROLES.PARENT) && role === ROLES.PARENT) {
      const { id } = req.params;
      if (!id) {
        next(createHttpError(403));
        return;
      }

      const contact = await Contact.findOne({
        _id: id,
        userId: user._id,
      });
      console.log('Contact found:', contact);
      if (contact) {
        next();
        return;
      }
    }

    next(createHttpError(403));
  };
