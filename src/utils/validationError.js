export const ValidationError = (e, res) => {
  const mapFields = e.inner.map(a => a.path);

  const removeDuplicateValues = [...new Set(mapFields)];

  const errors = removeDuplicateValues
    .map(path => {
      return e.inner.find(error => error.path === path)
        ? e.inner.find(error => error.path === path).message
        : null;
    })
    .filter(Boolean);

  return res.status(400).json({
    error: 'Erro na validação',
    messages: errors,
  });
};
