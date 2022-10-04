"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _models = require('../../models');

 class CityRepository {
  async createCity({ name, regionId }) {
    const createdCity = await _models.City.create({
      nm_city: name.trim(),
      id_region: regionId,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.City.findOne({
      where: {
        nm_city: createdCity.dataValues.nm_city,
      },
    });
  }

  async verifyRelation({ regionId, id }) {
    return await _models.City.findAll({
      where: { id_city: id },
      include: [
        {
          model: _models.Region,
          as: 'region',
          where: { id_region: regionId },
        },
      ],
    });
  }

  async verifyRegion({ regionId }) {
    return await _models.City.findAll({
      include: [
        { model: _models.Region, as: 'region', where: { id_region: regionId } },
      ],
    });
  }

  async findCites({ page, limit, regionId, nm_city }) {
    return nm_city
      ? await _models.City.findAndCountAll({
          where: {
            nm_city: {
              [_sequelize.Op.like]: `%${nm_city.trim()}%`,
            },
          },
          limit: limit !== 'all' ? Number(limit) : null,
          order: [['nm_city', 'ASC']],
        offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          include: [
            regionId
              ? { model: _models.Region, as: 'region', where: { id_region: regionId } }
              : { model: _models.Region, as: 'region' },
          ],
        })
      : await _models.City.findAndCountAll({
          limit: limit !== 'all' ? Number(limit) : null,
        offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          order: [['nm_city', 'ASC']],
          include: [
            regionId
              ? { model: _models.Region, as: 'region', where: { id_region: regionId } }
              : { model: _models.Region, as: 'region' },
          ],
        });
  }

  async findCity({ name }) {
    return await _models.City.findOne({
      where: {
        nm_city: name.trim(),
      },
      raw: true,
    });
  }

  async findCityById({ id, populate }) {
    return populate
      ? await _models.City.findOne({
          where: {
            id_city: id,
          },
          include: [{ model: _models.Region, as: 'region' }],
        })
      : await _models.City.findOne({
          where: {
            id_city: id,
          },
          raw: true,
        });
  }

  async deleteCity({ id }) {
    await _models.City.destroy({
      where: { id_city: id },
    });
  }

  async updateCity({ id, name, regionId }) {
    const city = await _models.City.findOne({
      where: {
        id_city: id,
      },
    });

    if (name && !regionId) {
      await city.update({
        nm_city: name.trim(),
        dt_updated_at: new Date(Date.now()).toISOString(),
      });

      return await _models.City.findOne({
        where: {
          nm_city: city.dataValues.nm_city,
        },
        include: [
          {
            model: _models.Region,
            as: 'region',
          },
        ],
      });
    }

    if (regionId && !name) {
      await city.update({
        id_region: regionId,
        dt_updated_at: new Date(Date.now()).toISOString(),
      });

      return await _models.City.findOne({
        where: {
          nm_city: city.dataValues.nm_city,
        },
        include: [
          {
            model: _models.Region,
            as: 'region',
          },
        ],
      });
    }

    await city.update({
      nm_city: name.trim(),
      id_region: regionId,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.City.findOne({
      where: {
        nm_city: city.dataValues.nm_city,
      },
      include: [
        {
          model: _models.Region,
          as: 'region',
        },
      ],
    });
  }
} exports.CityRepository = CityRepository;
