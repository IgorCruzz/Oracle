import { Op } from 'sequelize';
import { Document } from '../../models';

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

  async findDocuments({ page, limit, search }) {
    return search
      ? await Document.findAndCountAll({
          where: {
            nm_category: {
              [Op.like]: `%${search.trim()}%`,
            },
          },
          order: [['nm_category', 'ASC']],
          limit: Number(limit),
          offset: (Number(page) - 1) * Number(limit),
          raw: true,
        })
      : await Document.findAndCountAll({
          limit: Number(limit),
          order: [['nm_category', 'ASC']],
          offset: (Number(page) - 1) * Number(limit),
          raw: true,
        });
  }

  async findDocument({ ds_document }) {
    return await Document.findOne({
      where: {
        nm_category: ds_document.trim(),
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

  async deleteDocument({ id }) {
    await Document.destroy({
      where: { id_category: id },
    });
  }

  async updateDocument({ id, name }) {
    const category = await Document.findOne({
      where: {
        id_category: id,
      },
    });

    await category.update({
      nm_category: name.trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Document.findOne({
      where: {
        nm_category: category.dataValues.nm_category,
      },
      raw: true,
    });
  }
}
