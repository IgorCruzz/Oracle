import * as Yup from 'yup';

export const updateProjectValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_project: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      name: Yup.string()
        .min(1, 'O campo nome precisa ter entre 1 a 255 caracteres')
        .max(255, 'O tamanho máximo permitido para o campo nome é 255'),
      jurisdictionId: Yup.number()
        .positive('O campo deve ser positivo.')
        .integer('O campo deve ser um número inteiro.')
        .typeError('O campo Região precisa ser númerico'),
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
