import { Agency, Jurisdiction } from '../../models';

export class AgencyRepository {
  async createAgency({ name, jurisdictionId }) {
    await Agency.create({
      NM_AGENCY: name.toLowerCase().trim(),
      ID_JURISDICTION: jurisdictionId,
    });
  }

  async findAgencies({ page, limit, jurisdictionId }) {
    return await Agency.findAll({
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      include: [
        jurisdictionId
          ? {
              model: Jurisdiction,
              as: 'jurisdiction',
              where: { ID_JURISDICTION: jurisdictionId },
            }
          : { model: Jurisdiction, as: 'jurisdiction' },
      ],
    });
  }

  async findAgency({ name }) {
    return await Agency.findOne({
      where: {
        NM_AGENCY: name.toLowerCase().trim(),
      },
      raw: true,
    });
  }

  async findAgencyById({ id }) {
    return await Agency.findOne({
      where: {
        ID_AGENCY: id,
      },
      raw: true,
    });
  }

  async deleteAgency({ id }) {
    await Agency.destroy({
      where: { ID_AGENCY: id },
    });
  }

  async updateAgency({ id, name }) {
    const category = await Agency.findOne({
      where: {
        ID_AGENCY: id,
      },
    });

    return category.update({
      NM_AGENCY: name.toLowerCase().trim(),
    });
  }
}
