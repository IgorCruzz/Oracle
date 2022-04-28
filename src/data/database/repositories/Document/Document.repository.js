import { Op } from 'sequelize';
import { Document } from '../../models';

export class DocumentRepository {
  async createDocument(data) {
    const createdCategory = await Document.create({
      ...data,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Document.findOne({
      where: {
        nm_category: createdCategory.dataValues.nm_category,
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

  async findDocument({ name }) {
    return await Document.findOne({
      where: {
        nm_category: name.trim(),
      },
      raw: true,
    });
  }

  async findDocumentById({ id }) {
    return await Document.findOne({
      where: {
        id_category: id,
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
