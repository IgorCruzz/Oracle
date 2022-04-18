import * as Yup from 'yup';

export const createAgencyValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      name: Yup.string()
        .max(255, 'O campo name precisa ter no máximo 255 caracteres')
        .required('O campo name é obrigatório'),
      jurisdictionId: Yup.number().required(
        'O campo jurisdictionId é obrigatório'
      ),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res.status(400).json({
      error: 'Validation error',
      messages: e.errors,
    });
  }
};
