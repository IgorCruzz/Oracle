import * as Yup from 'yup';

export const createCityValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      name: Yup.string()
        .max(255, 'O campo nome precisa ter no máximo 255 caracteres')
        .required('O campo nome é obrigatório'),
      regionId: Yup.number()
        .required('O campo região é obrigatório')
        .typeError('O campo região é obrigatório'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res.status(400).json({
      error: 'Erro na validação',
      messages: e.errors,
    });
  }
};
