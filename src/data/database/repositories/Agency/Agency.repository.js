import { Agency, Jurisdiction } from '../../models';

export class AgencyRepository {
  async createAgency({ name, jurisdictionId }) {
    await Agency.create({
      nm_agency: name.toLowerCase().trim(),
      id_jurisdiction: jurisdictionId,
      dt_created_at: new Date(Date.now()).toISOString(),
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
              where: { id_jurisdiction: jurisdictionId },
            }
          : { model: Jurisdiction, as: 'jurisdiction' },
      ],
    });
  }

  async findAgency({ name }) {
    return await Agency.findOne({
      where: {
        nm_agency: name.toLowerCase().trim(),
      },
      raw: true,
    });
  }

  async findAgencyById({ id }) {
    return await Agency.findOne({
      where: {
        id_agency: id,
      },
      raw: true,
    });
  }

  async deleteAgency({ id }) {
    await Agency.destroy({
      where: { id_agency: id },
    });
  }

  async updateAgency({ id, name }) {
    const category = await Agency.findOne({
      where: {
        id_agency: id,
      },
    });

    return category.update({
      nm_agency: name.toLowerCase().trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });
  }
}
