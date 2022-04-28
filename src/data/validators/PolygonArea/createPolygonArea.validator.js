import * as Yup from 'yup';

export const createPolygonAreaValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      nu_latidude_vertice: Yup.string()
        .max(20, 'O tamanho máximo permitido para o campo latitude é 20')
        .required('O campo vertice de latitude é obrigatório')
        .typeError('O preenchimento da vertice de latitude é obrigatório'),
      nu_longitude_vertice: Yup.string()
        .max(20, 'O tamanho máximo permitido para o campo latitude é 20')
        .required('O campo vertice de longitude é obrigatório')
        .typeError('O preenchimento da vertice de longitude é obrigatório'),
      id_location: Yup.number()
        .required('Localização de Canteiro inválido')
        .typeError('Localização de Canteiro inválido'),
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
