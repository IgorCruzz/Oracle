// import { Op } from 'sequelize';
import { Project, City, Category, Agency, Program } from '../../models';

export class ProjectRepository {
  async createProject(data) {
    const {
      nm_project,
      ds_official_document,
      nm_official_document_applicant,
    } = data;

    const createdProject = await Project.create({
      ...data,
      nm_project: nm_project.trim(),
      ds_official_document: ds_official_document.toLowerCase().trim(),
      nm_official_document_applicant: nm_official_document_applicant
        .toLowerCase()
        .trim(),
      dt_official_document: new Date(Date.now()).toISOString(),
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

  // async findAgencies({ page, limit, jurisdictionId, search }) {
  //   return search
  //     ? await Agency.findAndCountAll({
  //         where: {
  //           nm_agency: {
  //             [Op.like]: `%${search.trim()}%`,
  //           },
  //         },
  //         limit: Number(limit),
  //         offset: (Number(page) - 1) * Number(limit),
  //         include: [
  //           jurisdictionId
  //             ? {
  //                 model: Jurisdiction,
  //                 as: 'jurisdiction',
  //                 where: { id_jurisdiction: jurisdictionId },
  //               }
  //             : { model: Jurisdiction, as: 'jurisdiction' },
  //         ],
  //       })
  //     : await Agency.findAndCountAll({
  //         limit: Number(limit),
  //         offset: (Number(page) - 1) * Number(limit),
  //         include: [
  //           jurisdictionId
  //             ? {
  //                 model: Jurisdiction,
  //                 as: 'jurisdiction',
  //                 where: { id_jurisdiction: jurisdictionId },
  //               }
  //             : { model: Jurisdiction, as: 'jurisdiction' },
  //         ],
  //       });
  // }

  async findProject({ nm_project }) {
    return await Project.findOne({
      where: {
        nm_project: nm_project.toLowerCase().trim(),
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

  // async updateAgency({ id, name, jurisdictionId }) {
  //   const agency = await Agency.findOne({
  //     where: {
  //       id_agency: id,
  //     },
  //   });

  //   if (jurisdictionId && !name) {
  //     await agency.update({
  //       id_jurisdiction: jurisdictionId,
  //       dt_updated_at: new Date(Date.now()).toISOString(),
  //     });

  //     return await Agency.findOne({
  //       where: {
  //         nm_agency: agency.dataValues.nm_agency,
  //       },
  //       include: [
  //         {
  //           model: Jurisdiction,
  //           as: 'jurisdiction',
  //         },
  //       ],
  //     });
  //   }

  //   if (name && !jurisdictionId) {
  //     await agency.update({
  //       nm_agency:  name.trim(),
  //       dt_updated_at: new Date(Date.now()).toISOString(),
  //     });

  //     return await Agency.findOne({
  //       where: {
  //         nm_agency: agency.dataValues.nm_agency,
  //       },
  //       include: [
  //         {
  //           model: Jurisdiction,
  //           as: 'jurisdiction',
  //         },
  //       ],
  //     });
  //   }

  //   await agency.update({
  //     nm_agency:  name.trim(),
  //     dt_updated_at: new Date(Date.now()).toISOString(),
  //     id_jurisdiction: jurisdictionId,
  //   });

  //   return await Agency.findOne({
  //     where: {
  //       nm_agency: agency.dataValues.nm_agency,
  //     },
  //     include: [
  //       {
  //         model: Jurisdiction,
  //         as: 'jurisdiction',
  //       },
  //     ],
  //   });
  // }
}
