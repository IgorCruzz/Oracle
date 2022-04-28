import * as Yup from 'yup';

export const createAgencyValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      name: Yup.string()
        .max(255, 'O tamanho máximo permitido para o campo nome é 255')
        .required('O campo nome é obrigatório')
        .typeError('O preenchimento do nome é obrigatório'),
      jurisdictionId: Yup.number()
        .required('Esfera inválida')
        .typeError('Esfera inválida'),
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
