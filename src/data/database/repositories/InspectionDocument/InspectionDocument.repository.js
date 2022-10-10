import { Op } from 'sequelize';
import { resolve } from 'path';
import fs from 'fs';
import { Inspection, Inspection_document } from '../../models';
import { folder } from '../../../../config/multer_inspection_documents';

export class InspectionDocumentRepository {
  async createInspectionDocument(req) {
    const createdInspectionDocument = await Inspection_document.create({
      id_inspection: req.id_inspection,
      nm_document: req.nm_document,
      nm_original_file: req ? req.originalname : '',
      nm_file: req ? req.filename : '',
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
          nm_document: { [Op.like]: `%${nm_document.trim()}%` },
        }),
        ...(nm_original_file && {
          nm_original_file: { [Op.like]: `%${nm_original_file.trim()}%` },
        }),
        ...(nm_file && {
          nm_file: { [Op.like]: `%${nm_file.trim()}%` },
        }),
      };
    } else {
      searchQuery = null;
    }
    return await Inspection_document.findAndCountAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      order: [['nm_document', 'ASC']],
      where: searchQuery
        ? {
            [Op.and]: searchQuery,
          }
        : {},
      include: [
        id_inspection
          ? {
              model: Inspection,
              as: 'inspection',
              where: { id_inspection },
            }
          : { model: Inspection, as: 'inspection' },
      ],
    });
  }

  async deleteInspectionDocument({ id_inspection_document }) {
    const inspection_document = await Inspection_document.findOne({
      where: {
        id_inspection_document,
      },
    });

    if (inspection_document.nm_file) {
      const path = resolve(folder, inspection_document.nm_file);
      fs.existsSync(path) && fs.unlink(path, e => e);
    }

    await Inspection_document.destroy({
      where: { id_inspection_document },
    });
  }

  async findInspectionDocumentById({ id_inspection_document, populate }) {
    if (populate) {
      return await Inspection_document.findOne({
        where: {
          id_inspection_document,
        },
        include: [
          {
            model: Inspection,
            as: 'inspection',
            include: [
              {
                model: Inspection,
                as: 'inspection',
              },
            ],
          },
        ],
      });
    }

    return await Inspection_document.findOne({
      where: {
        id_inspection_document,
      },
      raw: true,
    });
  }

  async updateInspectionDocument(id_inspection_document, req) {
    const inspection_document = await Inspection_document.findOne({
      where: {
        id_inspection_document,
      },
    });
    if (req.file) {
      if (inspection_document.nm_file) {
        const path = resolve(folder, inspection_document.nm_file);
        fs.existsSync(path) && fs.unlink(path, e => e);
      }
      await inspection_document.update({
        nm_original_file: req.file.originalname,
        nm_file: req.file.filename,
      });
    }
    await inspection_document.update({
      nm_document: req.body.nm_document,
    });

    return await Inspection_document.findOne({
      where: {
        id_inspection_document,
      },
    });
  }
}
