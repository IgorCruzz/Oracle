"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _models = require('../../models');

 class DocumentRepository {
  async createManyDocuments(data) {
    await _models.Document.bulkCreate(data);
  }

  async createDocument(data) {
    const { ds_document } = data;

    const createdDocument = await _models.Document.create({
      ...data,
      ds_document: ds_document.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Document.findOne({
      where: {
        id_document: createdDocument.dataValues.id_document,
      },
    });
  }

  async findDocumentByIdProduct({ id_product }) {
    return await _models.Document.findAll({
      where: {
        id_product,
      },
      include: [{ model: _models.Product, as: 'product' }],
    });
  }

  async findDocuments({ page, limit, id_product }) {
    return await _models.Document.findAndCountAll({
      where: id_product ? { id_product } : {},
      limit: limit !== 'all' ? Number(limit) : null,
      order: [['ds_document', 'ASC']],
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      include: [
        id_product
          ? {
              model: _models.Product,
              as: 'product',
              required: true,
              include: [
                {
                  model: _models.Project_phase,
                  as: 'project_phase',
                  required: true,
                  include: [
                    {
                      model: _models.Project,
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
              model: _models.Product,
              required: true,
              as: 'product',
              include: [
                {
                  model: _models.Project_phase,
                  required: true,
                  as: 'project_phase',
                  include: [
                    {
                      model: _models.Project,
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
    return await _models.Document.findAll({
      include: [
        {
          model: _models.Product,
          as: 'product',
          where: { id_product },
        },
      ],
    });
  }

  async findDocumentName({ ds_document, id_product }) {
    return await _models.Document.findOne({
      where: {
        ds_document: ds_document.trim(),
        id_product,
      },
    });
  }

  async findDocument({ ds_document }) {
    return await _models.Document.findOne({
      where: {
        ds_document: ds_document.trim(),
      },
      raw: true,
    });
  }

  async findDocumentById({ id_document, populate }) {
    if (populate) {
      return await _models.Document.findOne({
        where: {
          id_document,
        },
        include: [
          {
            model: _models.Product,
            as: 'product',
            include: [
              {
                model: _models.Project_phase,
                as: 'project_phase',
                include: [
                  {
                    model: _models.Project,
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

    return await _models.Document.findOne({
      where: {
        id_document,
      },
      include: [
        {
          model: _models.Product,
          as: 'product',
          include: [
            {
              model: _models.Project_phase,
              as: 'project_phase',
              include: [
                {
                  model: _models.Project,
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
    await _models.Document.destroy({
      where: { id_document },
    });
  }

  async updateDocument(id_document, data) {
    const { ds_document } = data;

    const document = await _models.Document.findOne({
      where: {
        id_document,
      },
    });

    await document.update(
      ds_document
        ? {
            ...data,
            ds_document: ds_document.trim(),
            dt_created_at: new Date(Date.now()).toISOString(),
            dt_updated_at: new Date(Date.now()).toISOString(),
          }
        : {
            ...data,
            dt_created_at: new Date(Date.now()).toISOString(),
            dt_updated_at: new Date(Date.now()).toISOString(),
          }
    );

    return await _models.Document.findOne({
      where: {
        ds_document: document.dataValues.ds_document,
      },
      include: [{ model: _models.Product, as: 'product' }],
    });
  }
} exports.DocumentRepository = DocumentRepository;
