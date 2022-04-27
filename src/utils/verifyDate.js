export const verifyDate = date => {
  const dateDocument = date.split('/');

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
      return { error: 'Insira a data do documento no formato 00/00/0000' };
    }
  } else {
    return { error: 'Insira a data do documento no formato 00/00/0000' };
  }

  return parsedDate;
};
