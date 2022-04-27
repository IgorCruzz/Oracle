import * as Yup from 'yup';

export const findRoleValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_role: Yup.string().required('O campo id é obrigatório'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    return next();
  } catch (e) {
    return res.status(400).json({
      error: 'Erro na validação',
      messages: e.errors,
    });
  }
};
