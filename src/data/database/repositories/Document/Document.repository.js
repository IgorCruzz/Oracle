import { Document, Product, Project_phase, Project } from '../../models';

export class DocumentRepository {
  async createManyDocuments(data) {
    await Document.bulkCreate(data);
  }

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

  async findDocumentByIdProduct({ id_product }) {
    return await Document.findAll({
      where: {
        id_product,
      },
      include: [{ model: Product, as: 'product' }],
    });
  }

  async findDocuments({ page, limit, id_product }) {
    return await Document.findAndCountAll({
      where: id_product ? { id_product } : {},
      ...(limit !== 'all' && { limit: Number(limit) }),
      order: [['ds_document', 'ASC']],
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : 1,
      include: [
        id_product
          ? {
              model: Product,
              as: 'product',
              required: true,
              include: [
                {
                  model: Project_phase,
                  as: 'project_phase',
                  required: true,
                  include: [
                    {
                      model: Project,
                      required: true,
                      as: 'project',
                      where: {
                        dt_deleted_at: null,
                      },
                    },
                  ],
                },
              ],
            }
          : {
              model: Product,
              required: true,
              as: 'product',
              include: [
                {
                  model: Project_phase,
                  required: true,
                  as: 'project_phase',
                  include: [
                    {
                      model: Project,
                      required: true,
                      as: 'project',
                      where: {
                        dt_deleted_at: null,
                      },
                    },
                  ],
                },
              ],
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

  async findDocumentName({ ds_document, id_product }) {
    return await Document.findOne({
      where: {
        ds_document: ds_document.trim(),
        id_product,
      },
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

  async findDocumentById({ id_document, populate }) {
    if (populate) {
      return await Document.findOne({
        where: {
          id_document,
        },
        include: [
          {
            model: Product,
            as: 'product',
            include: [
              {
                model: Project_phase,
                as: 'project_phase',
                include: [
                  {
                    model: Project,
                    as: 'project',
                    where: {
                      dt_deleted_at: null,
                    },
                  },
                ],
              },
            ],
          },
        ],
      });
    }

    return await Document.findOne({
      where: {
        id_document,
      },
      include: [
        {
          model: Product,
          as: 'product',
          include: [
            {
              model: Project_phase,
              as: 'project_phase',
              include: [
                {
                  model: Project,
                  as: 'project',
                  where: {
                    dt_deleted_at: null,
                  },
                },
              ],
            },
          ],
        },
      ],
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
      include: [{ model: Product, as: 'product' }],
    });
  }
}
