import aws from 'aws-sdk';
import { DocumentRepository } from '../../database/repositories';

const spacesEndpoint = new aws.Endpoint('sfo3.digitaloceanspaces.com');

aws.config.update({
  accessKeyId: 'DO0098U9A8D6HJZNNT6R',
  secretAccessKey: '83GJZKHnCH57T3obii3FW6qFcGTKS2a3FgumIM7GcZs',
});

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

export class RemoveUploadDocumentService {
  async execute(id_document) {
    const repository = new DocumentRepository();

    const findDocument = await repository.findDocumentById({
      id_document,
    });

    if (!findDocument) {
      return {
        error: `Não há um Documento com este ID -> ${id_document}`,
      };
    }

    const { nm_file } = findDocument;

    if (!nm_file) {
      return {
        error: 'Não há arquivo para ser removido!’',
      };
    }

    s3.deleteObject(
      {
        Bucket: 'gerobras-development',
        Key: `documents/${nm_file}`,
      },
      (err, data) => {
        if (err) return console.log(err);

        console.log(data);
      }
    );

    await repository.updateDocument(id_document, {
      dt_upload: null,
      nm_file: null,
      nm_original_file: null,
    });

    return {
      message: 'Arquivo removido com sucesso!',
    };
  }
}
