import * as Yup from 'yup';

export const createCityValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      name: Yup.string()
        .max(255, 'O campo nome precisa ter no máximo 255 caracteres')
        .required('O campo nome é obrigatório'),
      regionId: Yup.number()
        .required('Região inválida')
        .typeError('Região inválida'),
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
