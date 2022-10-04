"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const updateUserValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_user: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      ds_email_login: Yup.string()
        .email('Insira um e-mail válido')
        .max(100, 'O tamanho máximo permitido para o campo e-mail é 100')
        .required('O campo e-mail é obrigatório')
        .typeError('O preenchimento do e-mail é obrigatório'),
      in_active: Yup.string()
        .max(1, 'O tamanho máximo permitido para o campo ativo é 1')
        .oneOf(['N', 'S', 's', 'n'], 'Valor para o campo ativo inválido')
        .required('O campo ativo é obrigatório')
        .typeError('O preenchimento do campo ativo é obrigatório'),

      tp_profile: Yup.mixed()
        .oneOf([0, 1, 2, 3, 4], 'Perfil inválido!')
        .required('Informe o perfil do usuário!'),
      nm_user: Yup.string()
        .max(255, 'O tamanho máximo permitido para o campo nome é 255')
        .nullable(),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.updateUserValidator = updateUserValidator;
