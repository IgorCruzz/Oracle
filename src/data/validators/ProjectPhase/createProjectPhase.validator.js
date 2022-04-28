import * as Yup from 'yup';

export const createProjectPhaseValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      nu_order: Yup.number()
        .positive('O número de ordem precisa ser positivo')
        .typeError('O campo número de ordem precisa ser númerico'),
      nm_project_phase: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo nome da fase de projeto é 255'
        )
        .required('O campo nome do nome da fase de projeto é obrigatório')
        .typeError('O preenchimento do nome da fase de projeto é obrigatório'),
      dt_planned_start: Yup.string().nullable(),
      dt_planned_end: Yup.string().nullable(),
      vl_phase: Yup.number()
        .nullable()
        .test('is-decimal', 'O valor precisa ser positivo', value =>
          `${value}`.match(/^\d*\.?\d*$/)
        )
        .typeError('O campo valor precisa ser númerico'),
      id_project: Yup.number()
        .required('Projeto inválido')
        .typeError('Projeto inválido'),
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
