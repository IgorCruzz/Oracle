import { Op } from 'sequelize';
import { Phase_status } from '../../models';

export class PhaseStatusRepository {
  async createPhaseStatus({ ds_status }) {
    const createdStatus = await Phase_status.create({
      ds_status: ds_status.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Phase_status.findOne({
      where: {
        ds_status: createdStatus.dataValues.ds_status,
      },
    });
  }

  async findPhasesStatus({ page, limit, ds_status }) {
    return ds_status
      ? await Phase_status.findAndCountAll({
          where: {
            ds_status: {
              [Op.like]: `%${ds_status.trim()}%`,
            },
          },
          order: [['ds_status', 'ASC']],
          limit: limit !== 'all' ? Number(limit) : null,
          offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        })
      : await Phase_status.findAndCountAll({
          limit: limit !== 'all' ? Number(limit) : null,
          order: [['ds_status', 'ASC']],
          offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        });
  }

  async findPhaseStatus({ ds_status }) {
    return await Phase_status.findOne({
      where: {
        ds_status: ds_status.trim(),
      },
      raw: true,
    });
  }

  async findPhaseStatusById({ id_status }) {
    return await Phase_status.findOne({
      where: {
        id_status,
      },
      raw: true,
    });
  }

  async deletePhaseStatus({ id_status }) {
    await Phase_status.destroy({
      where: { id_status },
    });
  }

  async updatePhaseStatus(id_status, data) {
    const { ds_status } = data;

    const phase_status = await Phase_status.findOne({
      where: {
        id_status,
      },
    });

    await phase_status.update({
      ds_status: ds_status.trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Phase_status.findOne({
      where: {
        ds_status: phase_status.dataValues.ds_status,
      },
      raw: true,
    });
  }
}
