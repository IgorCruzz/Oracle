import { Op } from 'sequelize';
import {
  Project,
  City,
  Category,
  Agency,
  Program,
  Region,
  Jurisdiction,
} from '../../models';

export class ProjectRepository {
  async createProject(data) {
    const {
      nm_project,
      ds_official_document,
      nm_official_document_applicant,
      dtOfficial,
    } = data;

    const createdProject = await Project.create({
      ...data,
      nm_project: nm_project.trim(),
      ds_official_document: ds_official_document && ds_official_document.trim(),
      nm_official_document_applicant:
        nm_official_document_applicant && nm_official_document_applicant.trim(),
      dt_official_document: dtOfficial || null,
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

  async verifyRelationAgency({ id_agency }) {
    return await Project.findAll({
      include: [
        {
          model: Agency,
          as: 'agency',
          where: { id_agency },
        },
      ],
    });
  }

  async verifyRelationProgram({ id_program }) {
    return await Project.findAll({
      include: [
        {
          model: Program,
          as: 'program',
          where: { id_program },
        },
      ],
    });
  }

  async verifyRelationCity({ id_city }) {
    return await Project.findAll({
      include: [
        {
          model: City,
          as: 'city',
          where: { id_city },
        },
      ],
    });
  }

  async verifyRelationCategory({ id_category }) {
    return await Project.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          where: { id_category },
        },
      ],
    });
  }

  async findProjects({
    page,
    limit,
    id_city,
    id_category,
    id_program,
    id_agency,
    cd_sei,
    nm_project,
  }) {
    let searchQuery;

    if (cd_sei || nm_project) {
      searchQuery = {
        ...(cd_sei && {
          cd_sei: { [Op.like]: `%${cd_sei.trim()}%` },
        }),
        ...(nm_project && {
          nm_project: { [Op.like]: `%${nm_project.trim()}%` },
        }),
      };
    } else {
      searchQuery = null;
    }

    return await Project.findAndCountAll({
      where: searchQuery
        ? {
            [Op.and]: searchQuery,
            nm_deleted_by: {
              [Op.is]: null,
            },
          }
        : {
            nm_deleted_by: {
              [Op.is]: null,
            },
          },
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      order: [['nm_project', 'ASC']],
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
          [Op.and]: [
            { id_project },
            {
              nm_deleted_by: {
                [Op.is]: null,
              },
            },
          ],
          id_project,
        },
        include: [
          {
            model: City,
            as: 'city',
            include: [
              {
                model: Region,
                as: 'region',
              },
            ],
          },
          { model: Category, as: 'category' },
          { model: Program, as: 'program' },
          {
            model: Agency,
            as: 'agency',
            include: [{ model: Jurisdiction, as: 'jurisdiction' }],
          },
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

  async deleteProject({ id_project, nm_deleted_by }) {
    const project = await Project.findOne({
      where: {
        id_project,
      },
    });

    await project.update({
      nm_deleted_by,
      dt_deleted_at: new Date(Date.now()).toISOString(),
    });
  }

  async updateProject(id_project, data) {
    const {
      dtOfficial,
      nm_project,
      ds_official_document,
      nm_official_document_applicant,
    } = data;

    const project = await Project.findOne({
      where: {
        id_project,
      },
    });

    await project.update({
      ...data,
      nm_project: nm_project.trim(),
      ds_official_document: ds_official_document && ds_official_document.trim(),
      nm_official_document_applicant:
        nm_official_document_applicant && nm_official_document_applicant.trim(),
      dt_official_document: dtOfficial || null,
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
