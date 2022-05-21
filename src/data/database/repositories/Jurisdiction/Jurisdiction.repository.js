import { Op } from 'sequelize';
import { Jurisdiction } from '../../models';

export class JurisdictionRepository {
  async createJurisdiction({ name }) {
    const createdJurisdiction = await Jurisdiction.create({
      nm_jurisdiction: name.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Jurisdiction.findOne({
      where: {
        nm_jurisdiction: createdJurisdiction.dataValues.nm_jurisdiction,
      },
    });
  }

  async findJurisdictions({ page, limit, nm_jurisdiction }) {
    return nm_jurisdiction
      ? await Jurisdiction.findAndCountAll({
          where: {
            nm_jurisdiction: {
              [Op.like]: `%${nm_jurisdiction.trim()}%`,
            },
          },
          limit: limit !== 'all' ? Number(limit) : null,
          order: [['nm_jurisdiction', 'ASC']],
        offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        })
      : await Jurisdiction.findAndCountAll({
          limit: limit !== 'all' ? Number(limit) : null,
          order: [['nm_jurisdiction', 'ASC']],
        offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        });
  }

  async findJurisdiction({ name }) {
    return await Jurisdiction.findOne({
      where: {
        nm_jurisdiction: name.trim(),
      },
      raw: true,
    });
  }

  async findJurisdictionById({ id }) {
    return await Jurisdiction.findOne({
      where: {
        id_jurisdiction: id,
      },
      raw: true,
    });
  }

  async deleteJurisdiction({ id }) {
    await Jurisdiction.destroy({
      where: { id_jurisdiction: id },
    });
  }

  async updateJurisdiction({ id, name }) {
    const jurisdiction = await Jurisdiction.findOne({
      where: {
        id_jurisdiction: id,
      },
    });

    await jurisdiction.update({
      nm_jurisdiction: name.trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Jurisdiction.findOne({
      where: {
        nm_jurisdiction: jurisdiction.dataValues.nm_jurisdiction,
      },
      raw: true,
    });
  }
}
