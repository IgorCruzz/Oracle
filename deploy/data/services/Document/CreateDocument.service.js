"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');
var _verifyDate = require('../../../utils/verifyDate');

 class CreateDocumentService {
  async execute(data) {
    const { dt_upload, ds_document, id_product } = data;

    const repository = new (0, _repositories.DocumentRepository)();
    const productRepository = new (0, _repositories.ProductRepository)();

    const verifyProductExists = await productRepository.findProductById({
      id_product,
    });

    if (
      !verifyProductExists ||
      (verifyProductExists && !verifyProductExists.dataValues.project_phase)
    )
      return {
        error: `Não há nenhum Produto registrado com este ID -> ${id_product}.`,
      };

    let dtUpload;

    if (dt_upload) {
      dtUpload = _verifyDate.verifyDate.call(void 0, {
        value: dt_upload,
        msg: 'Data de upload inválida. Utilize o formato dd/mm/yyyy',
      });

      if (dtUpload.error) {
        return { error: dtUpload.error };
      }
    }

    const verifyDocumentExists = await repository.findDocumentName({
      ds_document,
      id_product,
    });

    if (verifyDocumentExists)
      return { error: 'Já existe uma Documento registrado com este nome.' };

    const document = await repository.createDocument({ ...data, dtUpload });

    return {
      message: 'Documento registrado com sucesso!',
      document: document.dataValues,
    };
  }
} exports.CreateDocumentService = CreateDocumentService;
