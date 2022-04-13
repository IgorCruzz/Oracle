import { Jurisdiction } from '../../models';

export class JurisdictionRepository {
  async createJurisdiction({ name }) {
    await Jurisdiction.create({
      NM_JURISDICTION: name.toLowerCase().trim(),
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
        NM_JURISDICTION: name.toLowerCase().trim(),
      },
      raw: true,
    });
  }

  async findJurisdictionById({ id }) {
    return await Jurisdiction.findOne({
      where: {
        ID_JURISDICTION: id,
      },
      raw: true,
    });
  }

  async deleteJurisdiction({ id }) {
    await Jurisdiction.destroy({
      where: { ID_JURISDICTION: id },
    });
  }

  async updateJurisdiction({ id, name }) {
    const category = await Jurisdiction.findOne({
      where: {
        ID_JURISDICTION: id,
      },
    });

    return category.update({
      NM_JURISDICTION: name.toLowerCase().trim(),
    });
  }
}
