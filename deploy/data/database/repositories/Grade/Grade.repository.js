"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _models = require('../../models');

 class GradeRepository {
  async createGrade({ nm_grade }) {
    const createdGrade = await _models.Grade.create({
      nm_grade: nm_grade.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Grade.findOne({
      where: {
        nm_grade: createdGrade.dataValues.nm_grade,
      },
    });
  }

  async findGradies({ page, limit, nm_grade }) {
    return nm_grade
      ? await _models.Grade.findAndCountAll({
          where: {
            nm_grade: {
              [_sequelize.Op.like]: `%${nm_grade.trim()}%`,
            },
          },
          order: [['nm_grade', 'ASC']],
          limit: limit !== 'all' ? Number(limit) : null,
        offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        })
      : await _models.Grade.findAndCountAll({
          limit: limit !== 'all' ? Number(limit) : null,
          order: [['nm_grade', 'ASC']],
        offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        });
  }

  async findGrade({ nm_grade }) {
    return await _models.Grade.findOne({
      where: {
        nm_grade: nm_grade.trim(),
      },
      raw: true,
    });
  }

  async findGradeById({ id_grade }) {
    return await _models.Grade.findOne({
      where: {
        id_grade,
      },
      raw: true,
    });
  }

  async deleteGrade({ id_grade }) {
    await _models.Grade.destroy({
      where: { id_grade },
    });
  }

  async updateGrade(id_grade, data) {
    const { nm_grade } = data;

    const grade = await _models.Grade.findOne({
      where: {
        id_grade,
      },
    });

    await grade.update({
      nm_grade: nm_grade.trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Grade.findOne({
      where: {
        nm_grade: grade.dataValues.nm_grade,
      },
      raw: true,
    });
  }
} exports.GradeRepository = GradeRepository;
