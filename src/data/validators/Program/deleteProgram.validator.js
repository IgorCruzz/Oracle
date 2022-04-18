import * as Yup from 'yup';

export const deleteProgramValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      id: Yup.string().required('O campo id é obrigatório'),
    });

    await Schema.validate(req.params, { abortEarly: false });

    return next();
  } catch (e) {
    return res.status(400).json({
      error: 'Validation error',
      messages: e.errors,
    });
  }
};
