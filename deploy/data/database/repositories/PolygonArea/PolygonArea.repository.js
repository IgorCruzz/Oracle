"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _models = require('../../models');

 class PolygonAreaRepository {
  async createPolygonArea(data) {
    const createdAgency = await _models.Polygon_area.create({
      ...data,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Polygon_area.findOne({
      where: {
        id_polygon_area: createdAgency.dataValues.id_polygon_area,
      },
    });
  }

  async verifyLocation({ id_location }) {
    return await _models.Polygon_area.findAll({
      include: [{ model: _models.Location, as: 'location', where: { id_location } }],
    });
  }

  async findPolygonAreas({ page, limit, id_location }) {
    return await _models.Polygon_area.findAndCountAll({
      limit: limit !== 'all' ? Number(limit) : null,
    offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      include: [
        id_location
          ? {
              model: _models.Location,
              as: 'location',
              where: { id_location },
            }
          : { model: _models.Location, as: 'location' },
      ],
    });
  }

  async findPolygonArea(data) {
    const { id_location, nu_latidude_vertice, nu_longitude_vertice } = data;

    return await _models.Polygon_area.findOne({
      where: {
        [_sequelize.Op.and]: {
          id_location,
          nu_latidude_vertice,
          nu_longitude_vertice,
        },
      },
      raw: true,
    });
  }

  async findPolygonAreaById({ id_polygon_area, populate }) {
    if (populate) {
      return await _models.Polygon_area.findOne({
        where: {
          id_polygon_area,
        },
        include: [{ model: _models.Location, as: 'location' }],
      });
    }

    return await _models.Polygon_area.findOne({
      where: {
        id_polygon_area,
      },
      raw: true,
    });
  }

  async deletePolygonArea({ id_polygon_area }) {
    await _models.Polygon_area.destroy({
      where: { id_polygon_area },
    });
  }

  async updatePolygonArea(id_polygon_area, data) {
    const polygonArea = await _models.Polygon_area.findOne({
      where: {
        id_polygon_area,
      },
    });

    await polygonArea.update({
      ...data,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Polygon_area.findOne({
      where: {
        id_polygon_area: polygonArea.dataValues.id_polygon_area,
      },
      include: [{ model: _models.Location, as: 'location' }],
    });
  }
} exports.PolygonAreaRepository = PolygonAreaRepository;
