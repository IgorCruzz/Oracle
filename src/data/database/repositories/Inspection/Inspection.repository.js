import { Op } from 'sequelize';
import {
  Inspection,
  Project_phase,
  Professional,
  Project,
  Inspection_document,
} from '../../models';
import { InspectionDocumentRepository } from '../InspectionDocument/InspectionDocument.repository';

export class InspectionRepository {

  async createInspection(data) {
    const {
      vl_new_cost,
      dt_inspection,
      dt_new_end,
      tp_inspection,
      id_project_phase,
      id_professional,
    } = data;

    const createdInspection = await Inspection.create({
      ...data,
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
    return await Inspection.findAndCountAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      order: [['dt_inspection', 'ASC']],
      where: {
        '$project_phase.id_project$': { [Op.eq]: id_project },
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
              ],
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
    });
  }

  async deleteInspection({ id_inspection }) {
    const inspection = await this.findInspectionById({
      id_inspection,
      populate: true,
    });

    const inspectionDocumentRepository = new InspectionDocumentRepository();
    await Promise.all(
      inspection.inspection_document.map(async obj => {
        await inspectionDocumentRepository.deleteInspectionDocument({
          id_inspection_document: obj.id_inspection_document,
        });
      })
    );

    await Inspection.destroy({
      where: { id_inspection },
    });
  }

  async findInspectionById({ id_inspection, populate }) {
    if (populate) {
      return await Inspection.findOne({
        where: {
          id_inspection,
        },
        include: [
          {
            model: Project_phase,
            as: 'project_phase',
            include: [
              {
                model: Project,
                as: 'project',
              },
            ],
          },
          {
            model: Professional,
            as: 'professional',
          },
          {
            model: Inspection_document,
            as: 'inspection_document',
          },
        ],
      });
    }

    return await Inspection.findOne({
      where: {
        id_inspection,
      },
      raw: true,
    });
  }

  async updateInspection(id_inspection, data) {
    console.log(data);
    const {
      vl_new_cost,
      dt_inspection,
      dt_new_end,
      tp_inspection,
      id_project_phase,
      id_professional,
    } = data;

    const inspection = await Inspection.findOne({
      where: {
        id_inspection,
      },
    });

    await inspection.update({
      ...data,
    });

    return await Inspection.findOne({
      where: {
        id_inspection,
      },
      include: [
        {
          model: Project_phase,
          as: 'project_phase',
          include: [{ model: Project, as: 'project' }],
        },
        { model: Professional, as: 'professional' },
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
}
