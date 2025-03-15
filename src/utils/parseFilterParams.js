const parseContactType = (type) => {
  if (typeof type !== 'string') return;
  const allowedTypes = ['work', 'home', 'personal'];

  return allowedTypes.includes(type) ? type : undefined;
};

const parseBoolean = (value) => {
  if (typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
  }
  return undefined;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseContactType(contactType);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    ...(parsedType !== undefined && { contactType: parsedType }),
    ...(parsedIsFavourite !== undefined && { isFavourite: parsedIsFavourite }),
  };
};
