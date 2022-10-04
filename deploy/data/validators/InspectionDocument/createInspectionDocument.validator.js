"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { newObj[key] = obj[key]; } } } newObj.default = obj; return newObj; } }var _yup = require('yup'); var Yup = _interopRequireWildcard(_yup);
var _validationError = require('../../../utils/validationError');

 const createInspectionDocumentValidator = async (req, res, next) => {
  try {
    const SchemaBody = Yup.object().shape({
      id_inspection: Yup.string()
        .required('ID da vistoria não pode ser vazio')
        .typeError('ID da vistoria inválido'),
      nm_document: Yup.string()
        .max(
          255,
          "O tamanho máximo permitido para o campo nome do documento é 255"
        )
        .required('O nome do documento precisa estar preenchido')
        .typeError('Nome do documento inválido'),
    });
    await SchemaBody.validate(req.body, { abortEarly: false });

    const SchemaFile = Yup.object().shape({
      nm_original_file: Yup.string()
        .max(
          255,
          "O tamanho máximo permitido para o campo nome do arquivo é 255"
        )
        .nullable()
        .typeError('Arquivo inválido'),
    });
    await SchemaFile.validate(req.nm_original_file, { abortEarly: false });

    return next();
  } catch (e) {
    return _validationError.ValidationError.call(void 0, e, res);
  }
}; exports.createInspectionDocumentValidator = createInspectionDocumentValidator;
