import * as Yup from 'yup';

export const deleteCategoryValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    await Schema.validate(req.params, { abortEarly: false });

    return next();
  } catch (e) {
    return res.status(400).json({
      error: 'Erro na validação',
      messages: e.errors,
    });
  }
};
