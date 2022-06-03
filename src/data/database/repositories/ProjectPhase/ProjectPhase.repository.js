import { Op } from 'sequelize';
import { Project_phase, Project } from '../../models';

export class ProjectPhaseRepository {
  async createManyProjectPhases(data) {
    const projectPhase = await Project_phase.bulkCreate(data);

    return projectPhase.map(values => values.dataValues);
  }

  async createProjectPhase(data) {
    const {
      dtPlannedStart,
      dtPlannedEnd,
      nm_project_phase,
      id_project,
      vl_phase,
    } = data;

    const findProject = await Project_phase.findAll({
      where: {
        id_project,
      },
    });

    const count = await Project_phase.findAndCountAll({
      where: {
        id_project,
      },
    });

    let maior;

    if (count.count > 0) {
      const orderA = findProject.map(a => a.dataValues.nu_order);

      maior = orderA.sort((a, b) => {
        return b - a;
      });

      maior = maior[0] + 1;
    } else {
      maior = 1;
    }

    const createdProjectPhase = await Project_phase.create({
      dt_planned_start: dtPlannedStart || null,
      dt_planned_end: dtPlannedEnd || null,
      nm_project_phase: nm_project_phase.trim(),
      nu_order: maior,
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

  async verifyProjectLogicDeleted({ id_project }) {
    return await Project_phase.findAll({
      include: [
        {
          model: Project,
          as: 'project',
          where: {
            [Op.and]: {
              id_project,
              dt_deleted_at: {
                [Op.is]: null,
              },
            },
          },
        },
      ],
    });
  }

  async verifyProject({ id_project }) {
    return await Project_phase.findAll({
      include: [
        {
          model: Project,
          as: 'project',
          where: { id_project },
        },
      ],
    });
  }

  async findProjectPhases({ page, limit, id_project }) {
    if (limit && page) {
      return await Project_phase.findAndCountAll({
        limit: limit !== 'all' ? Number(limit) : null,
        offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
        order: [['nu_order', 'ASC']],
        include: [
          id_project
            ? {
                model: Project,
                as: 'project',
                where: {
                  [Op.and]: {
                    id_project,
                    dt_deleted_at: null,
                  },
                },
              }
            : {
                model: Project,
                as: 'project',
                where: {
                  dt_deleted_at: null,
                },
              },
        ],
      });
    }

    return await Project_phase.findAll({
      include: [
        {
          model: Project,
          as: 'project',
          where: {
            dt_deleted_at: null,
            id_project,
          },
        },
      ],
      order: [['nu_order', 'ASC']],
      raw: true,
    });
  }

  async findProjectPhaseName({ nm_project_phase, id_project }) {
    return await Project_phase.findOne({
      where: {
        nm_project_phase: nm_project_phase.trim(),
        id_project,
      },
      raw: true,
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
        include: [
          {
            model: Project,
            as: 'project',
            where: {
              dt_deleted_at: null,
            },
          },
        ],
      });
    }

    return await Project_phase.findOne({
      where: {
        id_project_phase,
      },
      include: [
        {
          model: Project,
          as: 'project',
          where: {
            dt_deleted_at: null,
          },
        },
      ],
    });
  }

  async deleteProjectPhase({ id_project_phase }) {
    await Project_phase.destroy({
      where: { id_project_phase },
    });
  }

  async updateTechnicalManagerArea(id_project_phase, data) {
    const {
      dtPlannedEnd,
      dtPlannedStart,
      nm_project_phase,
      nu_order,
      vl_phase,
    } = data;

    const ProjectPhase = await Project_phase.findOne({
      where: {
        id_project_phase,
      },
    });

    await ProjectPhase.update({
      dt_planned_start: dtPlannedStart || null,
      dt_planned_end: dtPlannedEnd || null,
      nm_project_phase: nm_project_phase.trim(),
      nu_order,
      vl_phase: vl_phase || null,
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
