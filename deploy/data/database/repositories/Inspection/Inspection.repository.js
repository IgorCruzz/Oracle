"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');






var _models = require('../../models');
var _InspectionDocumentrepository = require('../InspectionDocument/InspectionDocument.repository');

 class InspectionRepository {
  async createInspection(data) {
    const { dtNewEnd, dtInspection } = data;

    const createdInspection = await _models.Inspection.create({
      ...data,
      dt_new_end: dtNewEnd || null,
      dt_inspection: dtInspection || null,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });
    return createdInspection;
  }

  async findInspections({
    page,
    limit,
    id_project,
    id_project_phase,
    id_professional,
  }) {
    return await _models.Inspection.findAndCountAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      order: [['dt_inspection', 'ASC']],
      where: id_project
        ? {
            '$project_phase.id_project$': { [_sequelize.Op.eq]: id_project },
          }
        : {},
      include: [
        id_project_phase
          ? {
              model: _models.Project_phase,
              as: 'project_phase',
              where: { id_project_phase },
              include: [
                id_project
                  ? {
                      model: _models.Project,
                      as: 'project',
                      where: { id_project },
                    }
                  : { model: _models.Project, as: 'project' },
              ],
            }
          : { model: _models.Project_phase, as: 'project_phase' },
        id_professional
          ? {
              model: _models.Professional,
              as: 'professional',
              where: { id_professional },
            }
          : { model: _models.Professional, as: 'professional' },
      ],
    });
  }

  async deleteInspection({ id_inspection }) {
    const inspection = await this.findInspectionById({
      id_inspection,
      populate: true,
    });

    const inspectionDocumentRepository = new (0, _InspectionDocumentrepository.InspectionDocumentRepository)();
    await Promise.all(
      inspection.inspection_document.map(async obj => {
        await inspectionDocumentRepository.deleteInspectionDocument({
          id_inspection_document: obj.id_inspection_document,
        });
      })
    );

    await _models.Inspection.destroy({
      where: { id_inspection },
    });
  }

  async findInspectionById({ id_inspection, populate }) {
    if (populate) {
      return await _models.Inspection.findOne({
        where: {
          id_inspection,
        },
        include: [
          {
            model: _models.Project_phase,
            as: 'project_phase',
            include: [
              {
                model: _models.Project,
                as: 'project',
              },
            ],
          },
          {
            model: _models.Professional,
            as: 'professional',
          },
          {
            model: _models.Inspection_document,
            as: 'inspection_document',
          },
        ],
      });
    }

    return await _models.Inspection.findOne({
      where: {
        id_inspection,
      },
      raw: true,
    });
  }

  async updateInspection(id_inspection, data) {
    const { dtNewEnd, dtInspection } = data;
    const inspection = await _models.Inspection.findOne({
      where: {
        id_inspection,
      },
    });

    await inspection.update({
      ...data,
      dt_inspection: dtInspection,
      dt_new_end: dtNewEnd,
    });

    return await _models.Inspection.findOne({
      where: {
        id_inspection,
      },
      include: [
        {
          model: _models.Project_phase,
          as: 'project_phase',
          include: [{ model: _models.Project, as: 'project' }],
        },
        { model: _models.Professional, as: 'professional' },
      ],
    });
  }
  /*

  async findInspection({ id_inspection }) {
    return await Project.findOne({
      where: {
        id_inspection: id_inspection,
      },
      include: [
        id_project_phase
        ? {
            model: Project_phase,
            as: 'project_phase',
            where: { id_project_phase },
            include: [
              id_project
              ? {
                  model: Project,
                  as: 'project',
                  where: { id_project },
                }
              : { model: Project, as: 'project' },                   
            ]
          }
        : { model: Project_phase, as: 'project_phase' },          
        id_professional
        ? {
            model: Professional,
            as: 'professional',
            where: { id_professional },
          }
        : { model: Professional, as: 'professional' },
      ],      
      raw: true,
    });
  }  




  */
} exports.InspectionRepository = InspectionRepository;
