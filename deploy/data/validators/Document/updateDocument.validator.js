"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const updateDocumentValidator = async (req, res, next) => {
  try {
    const SchemaParam = Yup.object().shape({
      id_document: Yup.string().required('O campo id é obrigatório'),
    });

    const SchemaBody = Yup.object().shape({
      ds_document: Yup.string()
        .max(
          255,
          'O tamanho máximo permitido para o campo descrição do documento é 255'
        )
        .required('O campo descrição do documento é obrigatório')
        .typeError('O preenchimento da descrição do documento é obrigatório'),
      dt_upload: Yup.string().nullable(),
      nu_document_sei: Yup.number()
        .positive('O valor número do documento SEI precisa ser positivo')
        .nullable()
        .typeError('O campo número do documento SEI precisa ser númerico'),
      nm_file: Yup.string()
        .max(
          1000,
          'O tamanho máximo permitido para o campo nome do arquivo é 1000'
        )
        .nullable(),
      id_product: Yup.number()
        .required('Produto inválido')
        .typeError('Produto inválido'),
    });

    await SchemaParam.validate(req.params, { abortEarly: false });

    await SchemaBody.validate(req.body, { abortEarly: false });

    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.updateDocumentValidator = updateDocumentValidator;
