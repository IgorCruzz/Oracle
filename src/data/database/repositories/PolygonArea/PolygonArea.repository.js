import { Op } from 'sequelize';
import { Polygon_area, Location } from '../../models';

export class PolygonAreaRepository {
  async createPolygonArea(data) {
    const createdAgency = await Polygon_area.create({
      ...data,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Polygon_area.findOne({
      where: {
        id_polygon_area: createdAgency.dataValues.id_polygon_area,
      },
    });
  }

  async verifyLocation({ id_location }) {
    return await Polygon_area.findAll({
      include: [{ model: Location, as: 'location', where: { id_location } }],
    });
  }

  async findPolygonAreas({ page, limit, id_location }) {
    return await Polygon_area.findAndCountAll({
      ...(limit !== 'all' && { limit: Number(limit) }),
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : 1,
      include: [
        id_location
          ? {
              model: Location,
              as: 'location',
              where: { id_location },
            }
          : { model: Location, as: 'location' },
      ],
    });
  }

  async findPolygonArea(data) {
    const { id_location, nu_latidude_vertice, nu_longitude_vertice } = data;

    return await Polygon_area.findOne({
      where: {
        [Op.and]: {
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
      return await Polygon_area.findOne({
        where: {
          id_polygon_area,
        },
        include: [{ model: Location, as: 'location' }],
      });
    }

    return await Polygon_area.findOne({
      where: {
        id_polygon_area,
      },
      raw: true,
    });
  }

  async deletePolygonArea({ id_polygon_area }) {
    await Polygon_area.destroy({
      where: { id_polygon_area },
    });
  }

  async updatePolygonArea(id_polygon_area, data) {
    const polygonArea = await Polygon_area.findOne({
      where: {
        id_polygon_area,
      },
    });

    await polygonArea.update({
      ...data,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Polygon_area.findOne({
      where: {
        id_polygon_area: polygonArea.dataValues.id_polygon_area,
      },
      include: [{ model: Location, as: 'location' }],
    });
  }
}
