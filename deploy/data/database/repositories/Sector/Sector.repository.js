"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _models = require('../../models');

 class SectorRepository {
  async createSector({ nm_sector }) {
    const createdSector = await _models.Sector.create({
      nm_sector: nm_sector.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Sector.findOne({
      where: {
        nm_sector: createdSector.dataValues.nm_sector,
      },
    });
  }

  async findSectories({ page, limit, nm_sector }) {
    return nm_sector
      ? await _models.Sector.findAndCountAll({
          where: {
            nm_sector: {
              [_sequelize.Op.like]: `%${nm_sector.trim()}%`,
            },
          },
          order: [['nm_sector', 'ASC']],
          limit: limit !== 'all' ? Number(limit) : null,
        offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        })
      : await _models.Sector.findAndCountAll({
          limit: limit !== 'all' ? Number(limit) : null,
          order: [['nm_sector', 'ASC']],
        offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        });
  }

  async findSector({ nm_sector }) {
    return await _models.Sector.findOne({
      where: {
        nm_sector: nm_sector.trim(),
      },
      raw: true,
    });
  }

  async findSectorById({ id_sector }) {
    return await _models.Sector.findOne({
      where: {
        id_sector,
      },
      raw: true,
    });
  }

  async deleteSector({ id_sector }) {
    await _models.Sector.destroy({
      where: { id_sector },
    });
  }

  async updateSector(id_sector, data) {
    const { nm_sector } = data;

    const sector = await _models.Sector.findOne({
      where: {
        id_sector,
      },
    });

    await sector.update({
      nm_sector: nm_sector.trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Sector.findOne({
      where: {
        nm_sector: sector.dataValues.nm_sector,
      },
      raw: true,
    });
  }
} exports.SectorRepository = SectorRepository;
