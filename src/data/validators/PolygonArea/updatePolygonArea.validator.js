import * as Yup from 'yup';

export const updatePolygonAreaValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_polygon_area: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      nu_latidude_vertice: Yup.string()
        .length(20, 'O tamanho permitido para o campo latitude é 20')
        .required('O campo vertice de latitude é obrigatório')
        .typeError('O preenchimento da vertice de latitude é obrigatório'),
      nu_longitude_vertice: Yup.string()
        .length(20, 'O tamanho permitido para o campo latitude é 20')
        .required('O campo vertice de longitude é obrigatório')
        .typeError('O preenchimento da vertice de longitude é obrigatório'),
      id_location: Yup.number()
        .required('Localização de Canteiro inválido')
        .typeError('Localização de Canteiro inválido'),
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
