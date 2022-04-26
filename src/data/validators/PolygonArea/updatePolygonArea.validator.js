import * as Yup from 'yup';

export const updatePolygonAreaValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_polygon_area: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      nu_latidude_vertice: Yup.string().length(
        20,
        'O tamanho permitido para o campo latitude é 20'
      ),
      nu_longitude_vertice: Yup.string().length(
        20,
        'O tamanho permitido para o campo latitude é 20'
      ),
      id_location: Yup.number().typeError('Localização de Canteiro inválido'),
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
