"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');








var _models = require('../../models');

 class ProjectRepository {
  async createProject(data) {
    const {
      nm_project,
      ds_official_document,
      nm_official_document_applicant,
      dtOfficial,
    } = data;

    const createdProject = await _models.Project.create({
      ...data,
      nm_project: nm_project.trim(),
      ds_official_document: ds_official_document && ds_official_document.trim(),
      nm_official_document_applicant:
        nm_official_document_applicant && nm_official_document_applicant.trim(),
      dt_official_document: dtOfficial || null,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Project.findOne({
      where: {
        id_project: createdProject.dataValues.id_project,
      },
      include: [
        { model: _models.City, as: 'city' },
        { model: _models.Category, as: 'category' },
        { model: _models.Program, as: 'program' },
        { model: _models.Agency, as: 'agency' },
      ],
    });
  }

  async verifyRelationAgency({ id_agency }) {
    return await _models.Project.findAll({
      include: [
        {
          model: _models.Agency,
          as: 'agency',
          where: { id_agency },
        },
      ],
    });
  }

  async verifyRelationProgram({ id_program }) {
    return await _models.Project.findAll({
      include: [
        {
          model: _models.Program,
          as: 'program',
          where: { id_program },
        },
      ],
    });
  }

  async verifyRelationCity({ id_city }) {
    return await _models.Project.findAll({
      include: [
        {
          model: _models.City,
          as: 'city',
          where: { id_city },
        },
      ],
    });
  }

  async verifyRelationCategory({ id_category }) {
    return await _models.Project.findAll({
      include: [
        {
          model: _models.Category,
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
          cd_sei: { [_sequelize.Op.like]: `%${cd_sei.trim()}%` },
        }),
        ...(nm_project && {
          nm_project: { [_sequelize.Op.like]: `%${nm_project.trim()}%` },
        }),
      };
    } else {
      searchQuery = null;
    }

    return await _models.Project.findAndCountAll({
      where: searchQuery
        ? {
            [_sequelize.Op.and]: searchQuery,
            nm_deleted_by: {
              [_sequelize.Op.is]: null,
            },
          }
        : {
            nm_deleted_by: {
              [_sequelize.Op.is]: null,
            },
          },
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      order: [['nm_project', 'ASC']],
      include: [
        id_city
          ? {
              model: _models.City,
              as: 'city',
              where: { id_city },
            }
          : { model: _models.City, as: 'city' },
        id_category
          ? {
              model: _models.Category,
              as: 'category',
              where: { id_category },
            }
          : { model: _models.Category, as: 'category' },
        id_program
          ? {
              model: _models.Program,
              as: 'program',
              where: { id_program },
            }
          : { model: _models.Program, as: 'program' },
        id_agency
          ? {
              model: _models.Agency,
              as: 'agency',
              where: { id_agency },
            }
          : { model: _models.Agency, as: 'agency' },
      ],
    });
  }

  async findProject({ nm_project }) {
    return await _models.Project.findOne({
      where: {
        [_sequelize.Op.and]: [
          {
            nm_project: nm_project.trim(),
          },
          {
            nm_deleted_by: {
              [_sequelize.Op.is]: null,
            },
          },
        ],
      },
      raw: true,
    });
  }

  async findProjectById({ id_project, populate }) {
    if (populate) {
      return await _models.Project.findOne({
        where: {
          [_sequelize.Op.and]: [
            { id_project },
            {
              nm_deleted_by: {
                [_sequelize.Op.is]: null,
              },
            },
          ],
          id_project,
        },
        include: [
          {
            model: _models.City,
            as: 'city',
            include: [
              {
                model: _models.Region,
                as: 'region',
              },
            ],
          },
          { model: _models.Category, as: 'category' },
          { model: _models.Program, as: 'program' },
          {
            model: _models.Agency,
            as: 'agency',
            include: [{ model: _models.Jurisdiction, as: 'jurisdiction' }],
          },
        ],
      });
    }

    return await _models.Project.findOne({
      where: {
        id_project,
      },
      raw: true,
    });
  }

  async deleteProject({ id_project, nm_deleted_by }) {
    const project = await _models.Project.findOne({
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

    const project = await _models.Project.findOne({
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

    return await _models.Project.findOne({
      where: {
        id_project: project.dataValues.id_project,
      },
      include: [
        { model: _models.City, as: 'city' },
        { model: _models.Category, as: 'category' },
        { model: _models.Program, as: 'program' },
        { model: _models.Agency, as: 'agency' },
      ],
    });
  }
} exports.ProjectRepository = ProjectRepository;
