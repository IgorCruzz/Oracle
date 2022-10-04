"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const deleteAllocationValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      allocations: Yup.array()
        .of(
          Yup.object().shape({
            id_product: Yup.number()
              .required('Produto inválido')
              .typeError('Produto inválido'),
            id_professional: Yup.number()
              .required('Colaborador inválido')
              .typeError('Colaborador inválido'),
            id_allocation_period: Yup.number()
              .required('Período de locação inválido')
              .typeError('Período de locação inválido'),
          })
        )
        .required('Campo Alocação é obrigatório'),
    });

    await Schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.deleteAllocationValidator = deleteAllocationValidator;
