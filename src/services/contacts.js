import { SORT_ORDER } from '../constants/index.js';
import Contact from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContactsService = async ({
  userId,
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const query = { userId };
  if (filter.contactType) {
    query.contactType = filter.contactType;
  }
  if (filter.isFavourite !== undefined) {
    query.isFavourite = filter.isFavourite;
  }
  const [contactsCount, contacts] = await Promise.all([
    Contact.countDocuments(query),
    Contact.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactByIdService = async (id, userId) => {
  return await Contact.findById({ _id: id, userId });
};
export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};
export const updateContact = async (id, userId, payload, options = {}) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: id, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (id, userId) => {
  const contact = await Contact.findOneAndDelete({
    _id: id,
    userId,
  });

  return contact;
};
