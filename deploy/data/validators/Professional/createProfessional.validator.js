"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const createProfessionalValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      nm_professional: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo nome do colaborador é 255'
        )
        .required('O campo nome do colaborador é obrigatório'),
      in_delivery_analyst: Yup.string()
        .max(
          1,
          'O tamanho máximo permitido para o campo entrega do analista é 1'
        )
        .oneOf(
          ['N', 'S', 's', 'n'],
          'Valor para o campo entrega do analista inválido'
        )
        .required('O campo entrega do analista é obrigatório')
        .typeError('O preenchimento do entrega do analista é obrigatório'),
      in_active: Yup.string()
        .max(1, 'O tamanho máximo permitido para o campo ativo é 1')
        .oneOf(['N', 'S', 's', 'n'], 'Valor para o campo ativo inválido')
        .required('O campo ativo é obrigatório')
        .typeError('O preenchimento do campo ativo é obrigatório'),
      id_role_grade: Yup.number()
        .required('Custo HH inválido')
        .typeError('Custo HH inválido'),
      id_sector: Yup.number()
        .required('Setor inválido')
        .typeError('Setor inválido'),
      id_user: Yup.number()
        .nullable()
        .typeError('Usuário inválido'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.createProfessionalValidator = createProfessionalValidator;
