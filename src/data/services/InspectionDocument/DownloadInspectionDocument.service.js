import { resolve } from 'path';
import { InspectionDocumentRepository } from '../../database/repositories';

export class DownloadInspectionDocumentService {
  async execute({ nm_file }) {
    const repository = new InspectionDocumentRepository();

    const file = resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'tmp',
      'inspection_documents',
      nm_file
    )``;

    const findDocument = await repository.findInspectionDocumentByNmFile({
      nm_file: file,
    });

    if (!findDocument) {
      return { error: 'Não há um documento com este nome de arquivo.' };
    }

    const { nm_original_file } = findDocument;

    return {
      file,
      nm_original_file,
    };
  }
}
