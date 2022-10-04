"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const updateProductValidator = async (req, res, next) => {
  try {
    const { qt_minimum_hours, qt_maximum_hours, qt_probable_hours } = req.body;

    const SchemaParam = Yup.object().shape({
      id_product: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      nm_product: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo nome do produto é 255'
        )
        .required('O campo nome do produto é obrigatório')
        .typeError('O preenchimento do nome do produto é obrigatório'),
      qt_minimum_hours: Yup.number()
        .required('O campo quantidade mínima de horas é obrigatório')
        .positive('O valor da quantidade mínima de horas precisa ser positivo')
        .test('is-decimal', null, value => `${value}`.match(/^\d*\.?\d*$/))
        .typeError(
          qt_minimum_hours === null
            ? 'O campo quantidade mínima de horas é obrigatório'
            : 'O campo quantidade mínima de horas precisa ser númerico'
        ),
      qt_maximum_hours: Yup.number()
        .required('O campo quantidade máxima de horas é obrigatório')
        .positive('O valor da quantidade máxima de horas precisa ser positivo')
        .test('is-decimal', null, value => `${value}`.match(/^\d*\.?\d*$/))
        .typeError(
          qt_maximum_hours === null
            ? 'O campo quantidade máxima de horas é obrigatório'
            : 'O campo quantidade máxima de horas precisa ser númerico'
        ),
      qt_probable_hours: Yup.number()
        .required('O campo quantidade provável de horas é obrigatório')
        .positive(
          'O valor da quantidade provável de horas precisa ser positivo'
        )
        .test('is-decimal', null, value => `${value}`.match(/^\d*\.?\d*$/))
        .typeError(
          qt_probable_hours === null
            ? 'O campo quantidade provável de horas é obrigatório'
            : 'O campo quantidade provável de horas precisa ser númerico'
        ),
      tp_required_action: Yup.mixed()
        .oneOf([0, 1, 2, 3, 4], 'Ação Necessária Inválida')
        .required('O campo Ação Necessária é obrigatório'),
      ds_note_required_action: Yup.string()
        .max(
          1000,
          'O tamanho máximo permitido para o campo justificativa da indicação da ação é 1000'
        )
        .nullable(),
      id_project_phase: Yup.number()
        .required('Fase de projeto inválida')
        .typeError('Fase de projeto inválida'),
      id_suggested_role: Yup.number()
        .nullable()
        .typeError('Função inválida'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.updateProductValidator = updateProductValidator;
