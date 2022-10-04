"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _models = require('../../models');

 class JurisdictionRepository {
  async createJurisdiction({ name }) {
    const createdJurisdiction = await _models.Jurisdiction.create({
      nm_jurisdiction: name.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Jurisdiction.findOne({
      where: {
        nm_jurisdiction: createdJurisdiction.dataValues.nm_jurisdiction,
      },
    });
  }

  async findJurisdictions({ page, limit, nm_jurisdiction }) {
    return nm_jurisdiction
      ? await _models.Jurisdiction.findAndCountAll({
          where: {
            nm_jurisdiction: {
              [_sequelize.Op.like]: `%${nm_jurisdiction.trim()}%`,
            },
          },
          limit: limit !== 'all' ? Number(limit) : null,
          order: [['nm_jurisdiction', 'ASC']],
        offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        })
      : await _models.Jurisdiction.findAndCountAll({
          limit: limit !== 'all' ? Number(limit) : null,
          order: [['nm_jurisdiction', 'ASC']],
        offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        });
  }

  async findJurisdiction({ name }) {
    return await _models.Jurisdiction.findOne({
      where: {
        nm_jurisdiction: name.trim(),
      },
      raw: true,
    });
  }

  async findJurisdictionById({ id }) {
    return await _models.Jurisdiction.findOne({
      where: {
        id_jurisdiction: id,
      },
      raw: true,
    });
  }

  async deleteJurisdiction({ id }) {
    await _models.Jurisdiction.destroy({
      where: { id_jurisdiction: id },
    });
  }

  async updateJurisdiction({ id, name }) {
    const jurisdiction = await _models.Jurisdiction.findOne({
      where: {
        id_jurisdiction: id,
      },
    });

    await jurisdiction.update({
      nm_jurisdiction: name.trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Jurisdiction.findOne({
      where: {
        nm_jurisdiction: jurisdiction.dataValues.nm_jurisdiction,
      },
      raw: true,
    });
  }
} exports.JurisdictionRepository = JurisdictionRepository;
