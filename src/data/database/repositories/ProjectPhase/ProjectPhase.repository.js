import { Project_phase, Project } from '../../models';

export class ProjectPhaseRepository {
  async createProjectPhase(data) {
    const {
      dtPlannedStart,
      dtPlannedEnd,
      nm_project_phase,
      nu_order,
      id_project,
      vl_phase,
    } = data;

    const createdProjectPhase = await Project_phase.create({
      dt_planned_start: dtPlannedStart,
      dt_planned_end: dtPlannedEnd,
      nm_project_phase: nm_project_phase.trim(),
      nu_order,
      id_project,
      vl_phase,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Project_phase.findOne({
      where: {
        id_project_phase: createdProjectPhase.dataValues.id_project_phase,
      },
    });
  }

  async findProjectPhases({ page, limit, id_project }) {
    return await Project_phase.findAndCountAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      order: [['nm_project_phase', 'ASC']],
      include: [
        id_project
          ? {
              model: Project,
              as: 'project',
              where: { id_project },
            }
          : { model: Project, as: 'project' },
      ],
    });
  }

  async findProjectPhase({ nm_project_phase }) {
    return await Project_phase.findOne({
      where: {
        nm_project_phase: nm_project_phase.trim(),
      },
      raw: true,
    });
  }

  async findProjectPhaseById({ id_project_phase, populate }) {
    if (populate) {
      return await Project_phase.findOne({
        where: {
          id_project_phase,
        },
        include: [{ model: Project, as: 'project' }],
      });
    }

    return await Project_phase.findOne({
      where: {
        id_project_phase,
      },
      raw: true,
    });
  }

  async deleteProjectPhase({ id_project_phase }) {
    await Project_phase.destroy({
      where: { id_project_phase },
    });
  }

  async updateTechnicalManagerArea(id_project_phase, data) {
    const { dtPlannedEnd, dtPlannedStart, nm_project_phase, nu_order } = data;

    const ProjectPhase = await Project_phase.findOne({
      where: {
        id_project_phase,
      },
    });

    await ProjectPhase.update({
      dt_planned_start: dtPlannedStart,
      dt_planned_end: dtPlannedEnd,
      nm_project_phase: nm_project_phase.trim(),
      nu_order,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Project_phase.findOne({
      where: {
        id_project_phase: ProjectPhase.dataValues.id_project_phase,
      },
      include: [{ model: Project, as: 'project' }],
    });
  }
}
