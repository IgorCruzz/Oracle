"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const updateAllocationPeriodValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_allocation_period: Yup.string().required('O campo id é obrigatório'),
    });

    const { qt_business_hours } = req.body;

    const SchemaBody = Yup.object().shape({
      dt_start_allocation: Yup.string()
        .required('A Data inicial do período de Alocação é obrigatória')
        .typeError(
          'O preenchimento da Data inicial do período de Alocação é obrigatório'
        ),
      dt_end_allocation: Yup.string()
        .required('A Data final do período de Alocação é obrigatória')
        .typeError(
          'O preenchimento da Data final do período de Alocação é obrigatório'
        ),
      qt_business_hours: Yup.number()
        .positive(
          'A quantidade de horas úteis do período de alocação precisa ser positiva'
        )
        .required(
          'O campo quantidade de horas úteis do período de alocação é obrigatória'
        )
        .typeError(
          typeof qt_business_hours === 'string'
            ? 'A quantidade de horas úteis do período de alocação é inválida!'
            : 'O preenchimento da quantidade de horas úteis do período de alocação é obrigatório'
        ),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.updateAllocationPeriodValidator = updateAllocationPeriodValidator;
