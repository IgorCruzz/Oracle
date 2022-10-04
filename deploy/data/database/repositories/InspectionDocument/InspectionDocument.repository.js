"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _path = require('path');
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _models = require('../../models');
var _multer_inspection_documents = require('../../../../config/multer_inspection_documents');

 class InspectionDocumentRepository {
  async createInspectionDocument(req) {

    const createdInspectionDocument = await _models.Inspection_document.create({
      id_inspection: req.body.id_inspection,
      nm_document: req.body.nm_document,
      nm_original_file: req.file ? req.file.originalname : '',
      nm_file: req.file ? req.file.finelane : '',
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });
    return createdInspectionDocument;
  }

  async findInspectionDocuments({
    page,
    limit,
    id_inspection,
    nm_document,
    nm_original_file,
    nm_file,
  }) {
    let searchQuery;

    if (nm_document || nm_file) {
      searchQuery = {
        ...(nm_document && {
          nm_document: { [_sequelize.Op.like]: `%${nm_document.trim()}%` },
        }),
        ...(nm_original_file && {
          nm_original_file: { [_sequelize.Op.like]: `%${nm_original_file.trim()}%` },
        }),
        ...(nm_file && {
          nm_file: { [_sequelize.Op.like]: `%${nm_file.trim()}%` },
        }),
      };
    } else {
      searchQuery = null;
    }
    return await _models.Inspection_document.findAndCountAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      order: [['nm_document', 'ASC']],
      where: searchQuery
        ? {
            [_sequelize.Op.and]: searchQuery,
          }
        : {},
      include: [
        id_inspection
          ? {
              model: _models.Inspection,
              as: 'inspection',
              where: { id_inspection },
            }
          : { model: _models.Inspection, as: 'inspection' },
      ],
    });
  }

  async deleteInspectionDocument({ id_inspection_document }) {
    const inspection_document = await _models.Inspection_document.findOne({
      where: {
        id_inspection_document,
      },
    });

    if (inspection_document.nm_file) {
      const path = _path.resolve.call(void 0, _multer_inspection_documents.folder, inspection_document.nm_file);
      _fs2.default.existsSync(path) && _fs2.default.unlink(path, e => e);
    }

    await _models.Inspection_document.destroy({
      where: { id_inspection_document },
    });
  }

  async findInspectionDocumentById({ id_inspection_document, populate }) {
    if (populate) {
      return await _models.Inspection_document.findOne({
        where: {
          id_inspection_document,
        },
        include: [
          {
            model: _models.Inspection,
            as: 'inspection',
            include: [
              {
                model: _models.Inspection,
                as: 'inspection',
              },
            ],
          },
        ],
      });
    }

    return await _models.Inspection_document.findOne({
      where: {
        id_inspection_document,
      },
      raw: true,
    });
  }

  async updateInspectionDocument(id_inspection_document, req) {
    const inspection_document = await _models.Inspection_document.findOne({
      where: {
        id_inspection_document,
      },
    });
    if(req.file){
      if (inspection_document.nm_file) {
        const path = _path.resolve.call(void 0, _multer_inspection_documents.folder, inspection_document.nm_file);
        _fs2.default.existsSync(path) && _fs2.default.unlink(path, e => e);

      }
      await inspection_document.update({
        nm_original_file: req.file.originalname,
        nm_file: req.file.filename,
      });
    }
    await inspection_document.update({
      nm_document: req.body.nm_document,
    });

    return await _models.Inspection_document.findOne({
      where: {
        id_inspection_document,
      },
    });
  }
} exports.InspectionDocumentRepository = InspectionDocumentRepository;
