import * as Yup from 'yup';

export const createTechnicalManagerValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      nm_technical_manager: Yup.string()
        .max(255, 'O tamanho máximo permitido para o campo nome é 255')
        .required('O campo nome do Técnico responsável é obrigatório'),
      nu_crea: Yup.string()
        .length(20, 'O tamanho permitido para o campo latitude é 20')
        .required('O campo número CREA é obrigatório'),
      nu_rrt_art: Yup.number()
        .required('Localização de Canteiro inválido')
        .typeError('Localização de Canteiro inválido'),
      tp_responsability: Yup.mixed()
        .oneOf(['Obra', 'Supervisão'])
        .required('O campo tipo de responsabilidade'),
      id_project: Yup.number()
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
