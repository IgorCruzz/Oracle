import * as Yup from 'yup';

export const updateTechnicalManagerValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_technical_manager: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      nm_technical_manager: Yup.string().max(
        255,
        'O tamanho máximo permitido para o campo nome é 255'
      ),
      nu_crea: Yup.string().length(
        20,
        'O tamanho permitido para o campo latitude é 20'
      ),
      nu_rrt_art: Yup.number().typeError('Localização de Canteiro inválido'),
      tp_responsability: Yup.mixed().oneOf(
        ['1', '2'],
        'Valores permitidos no campo tipo de responsabilidade:  1 = Obra, 2 = Supervisão'
      ),
      id_project: Yup.number().typeError('Localização de Canteiro inválido'),
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
