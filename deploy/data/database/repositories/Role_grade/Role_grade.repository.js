"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _models = require('../../models');

 class RoleGradeRepository {
  async createRoleGrade(data) {
    const createdRoleGrade = await _models.Role_grade.create({
      ...data,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Role_grade.findOne({
      where: {
        id_role_grade: createdRoleGrade.dataValues.id_role_grade,
      },
      include: [
        { model: _models.Role, as: 'role' },
        { model: _models.Grade, as: 'grade' },
      ],
    });
  }

  async verifyRelationGrade({ id_grade }) {
    return await _models.Role_grade.findAll({
      include: [
        {
          model: _models.Grade,
          as: 'grade',
          where: { id_grade },
        },
      ],
    });
  }

  async verifyRelationRole({ id_role }) {
    return await _models.Role_grade.findAll({
      include: [
        {
          model: _models.Role,
          as: 'role',
          where: { id_role },
        },
      ],
    });
  }

  async findRoleGrades({
    page,
    limit,
    id_grade,
    id_role,
    vl_hour_cost,
    vl_salary,
  }) {
    let searchQuery;

    if (id_grade || id_role || vl_hour_cost || vl_salary) {
      searchQuery = {
        ...(id_grade && {
          id_grade: { [_sequelize.Op.like]: `%${id_grade}%` },
        }),
        ...(id_role && {
          id_role: { [_sequelize.Op.like]: `%${id_role}%` },
        }),
        ...(vl_hour_cost && {
          vl_hour_cost: { [_sequelize.Op.like]: `%${vl_hour_cost}%` },
        }),
        ...(vl_salary && {
          vl_salary: { [_sequelize.Op.like]: `%${vl_salary}%` },
        }),
      };
    } else {
      searchQuery = null;
    }

    return await _models.Role_grade.findAndCountAll({
      where: searchQuery
        ? {
            [_sequelize.Op.and]: searchQuery,
          }
        : {},
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,

      include: [
        id_role
          ? {
              model: _models.Role,
              as: 'role',
              where: { id_role },
            }
          : { model: _models.Role, as: 'role' },
        id_grade
          ? {
              model: _models.Grade,
              as: 'grade',
              where: { id_grade },
            }
          : { model: _models.Grade, as: 'grade' },
      ],
    });
  }

  async findRoleGrade({ id_grade, id_role }) {
    return await _models.Role_grade.findOne({
      where: {
        [_sequelize.Op.and]: {
          id_grade,
          id_role,
        },
      },
      raw: true,
    });
  }

  async findRoleGradeById({ id_role_grade, populate }) {
    if (populate) {
      return await _models.Role_grade.findOne({
        where: {
          id_role_grade,
        },
        include: [
          { model: _models.Role, as: 'role' },
          { model: _models.Grade, as: 'grade' },
        ],
      });
    }

    return await _models.Role_grade.findOne({
      where: {
        id_role_grade,
      },
      raw: true,
    });
  }

  async deleteRoleGrade({ id_role_grade }) {
    await _models.Role_grade.destroy({
      where: { id_role_grade },
    });
  }

  async updateRoleGrade(id_role_grade, data) {
    const roleGrade = await _models.Role_grade.findOne({
      where: {
        id_role_grade,
      },
    });

    await roleGrade.update({
      ...data,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Role_grade.findOne({
      where: {
        id_role_grade: roleGrade.dataValues.id_role_grade,
      },
      include: [
        { model: _models.Role, as: 'role' },
        { model: _models.Grade, as: 'grade' },
      ],
    });
  }
} exports.RoleGradeRepository = RoleGradeRepository;
