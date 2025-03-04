import Contact from '../models/contact.js';

// Отримати всі контакти
export const getAllContactsService = async () => {
  return await Contact.find();
};

// Отримати контакт за ID
export const getContactByIdService = async (id) => {
  return await Contact.findById(id);
};
