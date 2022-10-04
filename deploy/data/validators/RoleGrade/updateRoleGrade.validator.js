"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const updateRoleGradeValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_role_grade: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      vl_salary: Yup.number()
        .nullable()
        .positive('O valor do salário precisa ser positivo')
        .test(
          'is-decimal',
          null,
          value => `${value}`.match(/^\d*\.?\d*$/) || value === null
        )
        .typeError('O campo valor do salário precisa ser númerico'),
      vl_hour_cost: Yup.number()
        .nullable()
        .positive('O valor da hora de custo precisa ser positivo')
        .test(
          'is-decimal',
          null,
          value => `${value}`.match(/^\d*\.?\d*$/) || value === null
        )
        .typeError('O campo valor da hora de custo precisa ser númerico'),
      id_role: Yup.number()
        .required('Função inválida')
        .typeError('Função inválida'),
      id_grade: Yup.number()
        .required('Cargo inválido')
        .typeError('Cargo inválido'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.updateRoleGradeValidator = updateRoleGradeValidator;
