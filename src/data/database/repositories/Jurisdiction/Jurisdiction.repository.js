import { Jurisdiction } from '../../models';

export class JurisdictionRepository {
  async createJurisdiction({ name }) {
    const createdJurisdiction = await Jurisdiction.create({
      nm_jurisdiction: name.toLowerCase().trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Jurisdiction.findOne({
      where: {
        nm_jurisdiction: createdJurisdiction.dataValues.nm_jurisdiction,
      },
    });
  }

  async findJurisdictions({ page, limit }) {
    return await Jurisdiction.findAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      raw: true,
    });
  }

  async findJurisdiction({ name }) {
    return await Jurisdiction.findOne({
      where: {
        nm_jurisdiction: name.toLowerCase().trim(),
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
      nm_jurisdiction: name.toLowerCase().trim(),
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
