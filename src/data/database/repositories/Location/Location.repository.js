import { Op } from 'sequelize';
import { Location, Project } from '../../models';

export class LocationRepository {
  async createLocation(data) {
    const {
      ds_address,
      nu_address,
      ds_district,
      nu_postal_code,
      nu_latitude,
      nu_longitude,
    } = data;

    const createdLocation = await Location.create({
      ds_address: ds_address.trim(),
      nu_address: nu_address.trim(),
      ds_district: ds_district.trim(),
      nu_postal_code: nu_postal_code.trim(),
      nu_latitude: nu_latitude.trim(),
      nu_longitude: nu_longitude.trim(),
      dt_created_at: new Date(Date.ow()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Location.findOne({
      where: {
        ds_address: createdLocation.dataValues.ds_address,
      },
    });
  }

  // async verifyRelation({ jurisdictionId, id }) {
  //   return await Agency.findAll({
  //     where: { id_agency: id },
  //     include: [
  //       {
  //         model: Jurisdiction,
  //         as: 'jurisdiction',
  //         where: { id_jurisdiction: jurisdictionId },
  //       },
  //     ],
  //   });
  // }

  // async verifyJurisdiction({ jurisdictionId }) {
  //   return await Agency.findAll({
  //     include: [
  //       {
  //         model: Jurisdiction,
  //         as: 'jurisdiction',
  //         where: { id_jurisdiction: jurisdictionId },
  //       },
  //     ],
  //   });
  // }

  async findLocations({ page, limit, id_project, search }) {
    return search
      ? await Location.findAndCountAll({
          where: {
            nm_agency: {
              [Op.like]: `%${search.trim()}%`,
            },
          },
          limit: Number(limit),
          offset: (Number(page) - 1) * Number(limit),
          include: [
            id_project
              ? {
                  model: Project,
                  as: 'project',
                  where: { id_project },
                }
              : { model: Project, as: 'project' },
          ],
        })
      : await Location.findAndCountAll({
          limit: Number(limit),
          offset: (Number(page) - 1) * Number(limit),
          include: [
            id_project
              ? {
                  model: Project,
                  as: 'project',
                  where: { id_project },
                }
              : { model: Project, as: 'project' },
          ],
        });
  }

  async findLocation({ name }) {
    return await Location.findOne({
      where: {
        ds_address: name.trim(),
      },
      raw: true,
    });
  }

  async findLocationById({ id_location, populate }) {
    if (populate) {
      return await Location.findOne({
        where: {
          id_location,
        },
        include: [{ model: Project, as: 'project' }],
      });
    }

    return await Location.findOne({
      where: {
        id_location,
      },
      raw: true,
    });
  }

  async deleteLocation({ id_location }) {
    await Location.destroy({
      where: { id_location },
    });
  }

  async updateLocation(id_location, data) {
    const location = await Location.findOne({
      where: {
        id_location,
      },
    });

    await location.update({
      ...data,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Location.findOne({
      where: {
        id_location: location.dataValues.id_location,
      },
      include: [{ model: Project, as: 'project' }],
    });
  }
}
