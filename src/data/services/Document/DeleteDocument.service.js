import { DocumentRepository } from '../../database/repositories';

export class DeleteDocumentService {
  async execute({ id_document }) {
    const repository = new DocumentRepository();

    const verifyDocumentExists = await repository.findDocumentById({
      id_document,
    });

    if (
      !verifyDocumentExists ||
      (verifyDocumentExists &&
        !verifyDocumentExists.dataValues.product.dataValues.project_phase)
    )
      return {
        error: `Não existe um Documento com este ID -> ${id_document}.`,
      };

    await repository.deleteDocument({
      id_document,
    });

    return {
      message: 'Documento excluído com sucesso!',
    };
  }
}
