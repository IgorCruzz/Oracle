import * as Yup from 'yup';

export const updateCityValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      name: Yup.string()
        .max(255, 'O campo nome precisa ter no máximo 255 caracteres')
        .required('O campo nome é obrigatório'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return res.status(400).json({
      error: 'Erro na validação',
      messages: e.errors,
    });
  }
};
