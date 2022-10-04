"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const correctionValidator = async (req, res, next) => {
  try {
    const Schema = Yup.object().shape({
      analysis: Yup.array()
        .of(
          Yup.object().shape({
            cd_status: Yup.string().required('O campo status é obrigatório'),
            id_allocation_period: Yup.number()
              .required('Período de locação inválido')
              .typeError('Período de locação inválido'),
            id_product: Yup.number()
              .required('Produto inválido')
              .typeError('Produto inválido'),
            tx_remark: Yup.string()
              .max(
                1000,
                'O tamanho máximo permitido para o campo justificativa da indicação da ação é 1000'
              )
              .nullable(),
          })
        )
        .required('Campo Alocação é obrigatório'),
    });

    await Schema.validate(
      { analysis: JSON.parse(req.body.analysis) },
      { abortEarly: false }
    );

    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.correctionValidator = correctionValidator;
