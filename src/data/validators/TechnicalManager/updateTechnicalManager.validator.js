import * as Yup from 'yup';

export const updateTechnicalManagerValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_technical_manager: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      nm_technical_manager: Yup.string()
        .max(255, 'O tamanho máximo permitido para o campo nome é 255')
        .required('O campo nome do Técnico responsável é obrigatório'),
      nu_crea: Yup.string()
        .length(20, 'O tamanho permitido para o campo latitude é 20')
        .required('O campo número CREA é obrigatório'),
      nu_rrt_art: Yup.string()
        .length(20, 'O tamanho permitido para o campo ART é 20')
        .required('O campo ART é obrigatório'),
      tp_responsability: Yup.mixed()
        .oneOf(
          ['1', '2'],
          'Valores permitidos no campo tipo de responsabilidade:  1 = Obra, 2 = Supervisão'
        )
        .required('O campo tipo de responsabilidade é obrigatório'),
      id_project: Yup.number()
        .required('Projeto inválido')
        .typeError('Projeto inválido'),
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
