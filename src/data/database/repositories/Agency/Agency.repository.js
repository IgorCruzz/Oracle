import { Op } from 'sequelize';
import { Agency, Jurisdiction } from '../../models';

export class AgencyRepository {
  async createAgency({ name, jurisdictionId }) {
    const createdAgency = await Agency.create({
      nm_agency: name.trim(),
      id_jurisdiction: jurisdictionId,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Agency.findOne({
      where: {
        nm_agency: createdAgency.dataValues.nm_agency,
      },
    });
  }

  async verifyRelation({ jurisdictionId, id }) {
    return await Agency.findAll({
      where: { id_agency: id },
      include: [
        {
          model: Jurisdiction,
          as: 'jurisdiction',
          where: { id_jurisdiction: jurisdictionId },
        },
      ],
    });
  }

  async verifyJurisdiction({ jurisdictionId }) {
    return await Agency.findAll({
      include: [
        {
          model: Jurisdiction,
          as: 'jurisdiction',
          where: { id_jurisdiction: jurisdictionId },
        },
      ],
    });
  }

  async findAgencies({ page, limit, jurisdictionId, nm_agency }) {
    return nm_agency
      ? await Agency.findAndCountAll({
          where: {
            nm_agency: {
              [Op.like]: `%${nm_agency.trim()}%`,
            },
          },
          limit: Number(limit),
          offset: (Number(page) - 1) * Number(limit),
          order: [['nm_agency', 'ASC']],
          include: [
            jurisdictionId
              ? {
                  model: Jurisdiction,
                  as: 'jurisdiction',
                  where: { id_jurisdiction: jurisdictionId },
                }
              : { model: Jurisdiction, as: 'jurisdiction' },
          ],
        })
      : await Agency.findAndCountAll({
          limit: Number(limit),
          offset: (Number(page) - 1) * Number(limit),
          order: [['nm_agency', 'ASC']],
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
        nm_agency: name.trim(),
      },
      raw: true,
    });
  }

  async findAgencyById({ id, populate }) {
    if (populate) {
      return await Agency.findOne({
        where: {
          id_agency: id,
        },
        include: [{ model: Jurisdiction, as: 'jurisdiction' }],
      });
    }

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

  async updateAgency({ id, name, jurisdictionId }) {
    const agency = await Agency.findOne({
      where: {
        id_agency: id,
      },
    });

    if (jurisdictionId && !name) {
      await agency.update({
        id_jurisdiction: jurisdictionId,
        dt_updated_at: new Date(Date.now()).toISOString(),
      });

      return await Agency.findOne({
        where: {
          nm_agency: agency.dataValues.nm_agency,
        },
        include: [
          {
            model: Jurisdiction,
            as: 'jurisdiction',
          },
        ],
      });
    }

    if (name && !jurisdictionId) {
      await agency.update({
        nm_agency: name.trim(),
        dt_updated_at: new Date(Date.now()).toISOString(),
      });

      return await Agency.findOne({
        where: {
          nm_agency: agency.dataValues.nm_agency,
        },
        include: [
          {
            model: Jurisdiction,
            as: 'jurisdiction',
          },
        ],
      });
    }

    await agency.update({
      nm_agency: name.trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
      id_jurisdiction: jurisdictionId,
    });

    return await Agency.findOne({
      where: {
        nm_agency: agency.dataValues.nm_agency,
      },
      include: [
        {
          model: Jurisdiction,
          as: 'jurisdiction',
        },
      ],
    });
  }
}
