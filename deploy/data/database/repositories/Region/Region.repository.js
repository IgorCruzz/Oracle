"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _models = require('../../models');

 class RegionRepository {
  async createRegion({ name }) {
    const createdRegion = await _models.Region.create({
      nm_region: name.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Region.findOne({
      where: {
        nm_region: createdRegion.dataValues.nm_region,
      },
    });
  }

  async findRegions({ page, limit, nm_region }) {
    return nm_region
      ? await _models.Region.findAndCountAll({
          where: {
            nm_region: {
              [_sequelize.Op.like]: `%${nm_region.trim()}%`,
            },
          },
          limit: limit !== 'all' ? Number(limit) : null,
          order: [['nm_region', 'ASC']],
        offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
        })
      : await _models.Region.findAndCountAll({
          limit: limit !== 'all' ? Number(limit) : null,
          order: [['nm_region', 'ASC']],
        offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
        });
  }

  async findRegion({ name }) {
    return await _models.Region.findOne({
      where: {
        nm_region: name.trim(),
      },
      raw: true,
    });
  }

  async findRegionById({ id }) {
    return await _models.Region.findOne({
      where: {
        id_region: id,
      },
      raw: true,
    });
  }

  async deleteRegion({ id }) {
    await _models.Region.destroy({
      where: { id_region: id },
    });
  }

  async updateRegion({ id, name }) {
    const region = await _models.Region.findOne({
      where: {
        id_region: id,
      },
    });

    await region.update({
      nm_region: name.trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Region.findOne({
      where: {
        nm_region: region.dataValues.nm_region,
      },
      raw: true,
    });
  }
} exports.RegionRepository = RegionRepository;
