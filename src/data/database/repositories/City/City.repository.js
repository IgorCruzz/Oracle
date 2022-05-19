import { Op } from 'sequelize';
import { City, Region } from '../../models';

export class CityRepository {
  async createCity({ name, regionId }) {
    const createdCity = await City.create({
      nm_city: name.trim(),
      id_region: regionId,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await City.findOne({
      where: {
        nm_city: createdCity.dataValues.nm_city,
      },
    });
  }

  async verifyRelation({ regionId, id }) {
    return await City.findAll({
      where: { id_city: id },
      include: [
        {
          model: Region,
          as: 'region',
          where: { id_region: regionId },
        },
      ],
    });
  }

  async verifyRegion({ regionId }) {
    return await City.findAll({
      include: [
        { model: Region, as: 'region', where: { id_region: regionId } },
      ],
    });
  }

  async findCites({ page, limit, regionId, nm_city }) {
    return nm_city
      ? await City.findAndCountAll({
          where: {
            nm_city: {
              [Op.like]: `%${nm_city.trim()}%`,
            },
          },
          ...(limit !== 'all' && { limit: Number(limit) }),
          order: [['nm_city', 'ASC']],
          offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : 1,
          include: [
            regionId
              ? { model: Region, as: 'region', where: { id_region: regionId } }
              : { model: Region, as: 'region' },
          ],
        })
      : await City.findAndCountAll({
          ...(limit !== 'all' && { limit: Number(limit) }),
          offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : 1,
          order: [['nm_city', 'ASC']],
          include: [
            regionId
              ? { model: Region, as: 'region', where: { id_region: regionId } }
              : { model: Region, as: 'region' },
          ],
        });
  }

  async findCity({ name }) {
    return await City.findOne({
      where: {
        nm_city: name.trim(),
      },
      raw: true,
    });
  }

  async findCityById({ id, populate }) {
    return populate
      ? await City.findOne({
          where: {
            id_city: id,
          },
          include: [{ model: Region, as: 'region' }],
        })
      : await City.findOne({
          where: {
            id_city: id,
          },
          raw: true,
        });
  }

  async deleteCity({ id }) {
    await City.destroy({
      where: { id_city: id },
    });
  }

  async updateCity({ id, name, regionId }) {
    const city = await City.findOne({
      where: {
        id_city: id,
      },
    });

    if (name && !regionId) {
      await city.update({
        nm_city: name.trim(),
        dt_updated_at: new Date(Date.now()).toISOString(),
      });

      return await City.findOne({
        where: {
          nm_city: city.dataValues.nm_city,
        },
        include: [
          {
            model: Region,
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

      return await City.findOne({
        where: {
          nm_city: city.dataValues.nm_city,
        },
        include: [
          {
            model: Region,
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

    return await City.findOne({
      where: {
        nm_city: city.dataValues.nm_city,
      },
      include: [
        {
          model: Region,
          as: 'region',
        },
      ],
    });
  }
}
