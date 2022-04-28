import { Op } from 'sequelize';
import { Document, Product } from '../../models';

export class DocumentRepository {
  async createDocument(data) {
    const { ds_document, nm_file } = data;

    const createdDocument = await Document.create({
      ...data,
      ds_document: ds_document.trim(),
      nm_file: nm_file && nm_file.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Document.findOne({
      where: {
        id_document: createdDocument.dataValues.id_document,
      },
    });
  }

  async findDocuments({ page, limit, search, id_product }) {
    return search
      ? await Document.findAndCountAll({
          where: {
            ds_document: {
              [Op.like]: `%${search.trim()}%`,
            },
          },
          order: [['ds_document', 'ASC']],
          limit: Number(limit),
          offset: (Number(page) - 1) * Number(limit),
          raw: true,
          include: [
            {
              model: Product,
              as: 'product',
              where: { id_product },
            },
          ],
        })
      : await Document.findAndCountAll({
          limit: Number(limit),
          order: [['ds_document', 'ASC']],
          offset: (Number(page) - 1) * Number(limit),
          raw: true,
          include: [
            {
              model: Product,
              as: 'product',
              where: { id_product },
            },
          ],
        });
  }

  async verifyRelationProduct({ id_product }) {
    return await Document.findAll({
      include: [
        {
          model: Product,
          as: 'product',
          where: { id_product },
        },
      ],
    });
  }

  async findDocument({ ds_document }) {
    return await Document.findOne({
      where: {
        ds_document: ds_document.trim(),
      },
      raw: true,
    });
  }

  async findDocumentById({ id_document }) {
    return await Document.findOne({
      where: {
        id_document,
      },
      raw: true,
    });
  }

  async deleteDocument({ id_document }) {
    await Document.destroy({
      where: { id_document },
    });
  }

  async updateDocument(id_document, data) {
    const { ds_document, nm_file } = data;

    const document = await Document.findOne({
      where: {
        id_document,
      },
    });

    await document.update({
      ...data,
      ds_document: ds_document.trim(),
      nm_file: nm_file && nm_file.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Document.findOne({
      where: {
        ds_document: document.dataValues.ds_document,
      },
      raw: true,
    });
  }
}
