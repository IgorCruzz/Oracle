import { Op } from 'sequelize';
import { Project, City, Category, Agency, Program } from '../../models';

export class ProjectRepository {
  async createProject(data) {
    const {
      nm_project,
      ds_official_document,
      nm_official_document_applicant,
      dt_official_document,
    } = data;

    const dateDocument = dt_official_document.split('/');

    const parsedDate = `${dateDocument[2]}-${dateDocument[1]}-${dateDocument[0]}`;

    const parse = new Date(parsedDate);

    if (
      parse.toString() === 'Invalid Date' ||
      dateDocument[2].length < 4 ||
      dateDocument[2].length > 4 ||
      dateDocument[1].length < 2 ||
      dateDocument[1].length > 2 ||
      dateDocument[0].length < 2 ||
      dateDocument[0].length > 2
    ) {
      return { error: 'Insira a data do documento no formato 00/00/0000' };
    }

    const createdProject = await Project.create({
      ...data,
      nm_project: nm_project.trim(),
      ds_official_document: ds_official_document.trim(),
      nm_official_document_applicant: nm_official_document_applicant.trim(),
      dt_official_document: parsedDate,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Project.findOne({
      where: {
        nm_project: createdProject.dataValues.nm_project,
      },
      include: [
        { model: City, as: 'city' },
        { model: Category, as: 'category' },
        { model: Program, as: 'program' },
        { model: Agency, as: 'agency' },
      ],
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

  async findProjects({
    page,
    limit,
    id_city,
    id_category,
    id_program,
    id_agency,
    search,
  }) {
    return search
      ? await Project.findAndCountAll({
          where: {
            nm_program: {
              [Op.like]: `%${search.trim()}%`,
            },
          },
          limit: Number(limit),
          offset: (Number(page) - 1) * Number(limit),
          include: [
            id_city
              ? {
                  model: City,
                  as: 'city',
                  where: { id_city },
                }
              : { model: City, as: 'city' },
            id_category
              ? {
                  model: Category,
                  as: 'category',
                  where: { id_category },
                }
              : { model: Category, as: 'category' },
            id_program
              ? {
                  model: Program,
                  as: 'program',
                  where: { id_program },
                }
              : { model: Program, as: 'program' },
            id_agency
              ? {
                  model: Agency,
                  as: 'agency',
                  where: { id_agency },
                }
              : { model: Agency, as: 'agency' },
          ],
        })
      : await Project.findAndCountAll({
          limit: Number(limit),
          offset: (Number(page) - 1) * Number(limit),
          include: [
            id_city
              ? {
                  model: City,
                  as: 'city',
                  where: { id_city },
                }
              : { model: City, as: 'city' },
            id_category
              ? {
                  model: Category,
                  as: 'category',
                  where: { id_category },
                }
              : { model: Category, as: 'category' },
            id_program
              ? {
                  model: Program,
                  as: 'program',
                  where: { id_program },
                }
              : { model: Program, as: 'program' },
            id_agency
              ? {
                  model: Agency,
                  as: 'agency',
                  where: { id_agency },
                }
              : { model: Agency, as: 'agency' },
          ],
        });
  }

  async findProject({ nm_project }) {
    return await Project.findOne({
      where: {
        nm_project: nm_project.trim(),
      },
      raw: true,
    });
  }

  async findProjectById({ id_project, populate }) {
    if (populate) {
      return await Project.findOne({
        where: {
          id_project,
        },
        include: [
          { model: City, as: 'city' },
          { model: Category, as: 'category' },
          { model: Program, as: 'program' },
          { model: Agency, as: 'agency' },
        ],
      });
    }

    return await Project.findOne({
      where: {
        id_project,
      },
      raw: true,
    });
  }

  async deleteProject({ id_project }) {
    await Project.destroy({
      where: { id_project },
    });
  }

  async updateProject(id_project, data) {
    if (data.dt_official_document) {
      const dateDocument = data.dt_official_document.split('/');

      const parsedDate = `${dateDocument[2]}-${dateDocument[1]}-${dateDocument[0]}`;

      const parse = new Date(parsedDate);

      if (
        parse.toString() === 'Invalid Date' ||
        dateDocument[2].length < 4 ||
        dateDocument[2].length > 4 ||
        dateDocument[1].length < 2 ||
        dateDocument[1].length > 2 ||
        dateDocument[0].length < 2 ||
        dateDocument[0].length > 2
      ) {
        return { error: 'Insira a data do documento no formato 00/00/0000' };
      }

      const project = await Project.findOne({
        where: {
          id_project,
        },
      });

      await project.update({
        ...data,
        dt_official_document: parsedDate,
        dt_updated_at: new Date(Date.now()).toISOString(),
      });

      return await Project.findOne({
        where: {
          nm_project: project.dataValues.nm_project,
        },
        include: [
          { model: City, as: 'city' },
          { model: Category, as: 'category' },
          { model: Program, as: 'program' },
          { model: Agency, as: 'agency' },
        ],
      });
    }

    const project = await Project.findOne({
      where: {
        id_project,
      },
    });

    await project.update({
      ...data,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Project.findOne({
      where: {
        nm_project: project.dataValues.nm_project,
      },
      include: [
        { model: City, as: 'city' },
        { model: Category, as: 'category' },
        { model: Program, as: 'program' },
        { model: Agency, as: 'agency' },
      ],
    });
  }
}
