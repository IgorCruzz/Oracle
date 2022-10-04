"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _models = require('../../models');

 class AgencyRepository {
  async createAgency({ name, jurisdictionId }) {
    const createdAgency = await _models.Agency.create({
      nm_agency: name.trim(),
      id_jurisdiction: jurisdictionId,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Agency.findOne({
      where: {
        nm_agency: createdAgency.dataValues.nm_agency,
      },
    });
  }

  async verifyRelation({ jurisdictionId, id }) {
    return await _models.Agency.findAll({
      where: { id_agency: id },
      include: [
        {
          model: _models.Jurisdiction,
          as: 'jurisdiction',
          where: { id_jurisdiction: jurisdictionId },
        },
      ],
    });
  }

  async verifyJurisdiction({ jurisdictionId }) {
    return await _models.Agency.findAll({
      include: [
        {
          model: _models.Jurisdiction,
          as: 'jurisdiction',
          where: { id_jurisdiction: jurisdictionId },
        },
      ],
    });
  }

  async findAgencies({ page, limit, jurisdictionId, nm_agency }) {
    return nm_agency
      ? await _models.Agency.findAndCountAll({
          where: {
            nm_agency: {
              [_sequelize.Op.like]: `%${nm_agency.trim()}%`,
            },
          },
          limit: limit !== 'all' ? Number(limit) : null,
          offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          order: [['nm_agency', 'ASC']],
          include: [
            jurisdictionId
              ? {
                  model: _models.Jurisdiction,
                  as: 'jurisdiction',
                  where: { id_jurisdiction: jurisdictionId },
                }
              : { model: _models.Jurisdiction, as: 'jurisdiction' },
          ],
        })
      : await _models.Agency.findAndCountAll({
          limit: limit !== 'all' ? Number(limit) : null,
          offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          order: [['nm_agency', 'ASC']],
          include: [
            jurisdictionId
              ? {
                  model: _models.Jurisdiction,
                  as: 'jurisdiction',
                  where: { id_jurisdiction: jurisdictionId },
                }
              : { model: _models.Jurisdiction, as: 'jurisdiction' },
          ],
        });
  }

  async findAgency({ name }) {
    return await _models.Agency.findOne({
      where: {
        nm_agency: name.trim(),
      },
      raw: true,
    });
  }

  async findAgencyById({ id, populate }) {
    if (populate) {
      return await _models.Agency.findOne({
        where: {
          id_agency: id,
        },
        include: [{ model: _models.Jurisdiction, as: 'jurisdiction' }],
      });
    }

    return await _models.Agency.findOne({
      where: {
        id_agency: id,
      },
      raw: true,
    });
  }

  async deleteAgency({ id }) {
    await _models.Agency.destroy({
      where: { id_agency: id },
    });
  }

  async updateAgency({ id, name, jurisdictionId }) {
    const agency = await _models.Agency.findOne({
      where: {
        id_agency: id,
      },
    });

    if (jurisdictionId && !name) {
      await agency.update({
        id_jurisdiction: jurisdictionId,
        dt_updated_at: new Date(Date.now()).toISOString(),
      });

      return await _models.Agency.findOne({
        where: {
          nm_agency: agency.dataValues.nm_agency,
        },
        include: [
          {
            model: _models.Jurisdiction,
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

      return await _models.Agency.findOne({
        where: {
          nm_agency: agency.dataValues.nm_agency,
        },
        include: [
          {
            model: _models.Jurisdiction,
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

    return await _models.Agency.findOne({
      where: {
        nm_agency: agency.dataValues.nm_agency,
      },
      include: [
        {
          model: _models.Jurisdiction,
          as: 'jurisdiction',
        },
      ],
    });
  }
} exports.AgencyRepository = AgencyRepository;
