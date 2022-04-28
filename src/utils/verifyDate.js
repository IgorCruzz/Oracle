export const verifyDate = ({ value, msg }) => {
  const dateDocument = value.split('/');

  const parsedDate = `${dateDocument[2]}-${dateDocument[1]}-${dateDocument[0]}`;

  const parse = new Date(parsedDate);

  if (dateDocument[1]) {
    if (
      parse.toString() === 'Invalid Date' ||
      dateDocument[2].length < 4 ||
      dateDocument[2].length > 4 ||
      dateDocument[1].length < 2 ||
      dateDocument[1].length > 2 ||
      dateDocument[0].length < 2 ||
      dateDocument[0].length > 2
    ) {
      return { error: msg };
    }
  } else {
    return { error: msg };
  }

  return parsedDate;
};
