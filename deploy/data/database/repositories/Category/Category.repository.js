"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _models = require('../../models');

 class CategoryRepository {
  async createCategory({ name }) {
    const createdCategory = await _models.Category.create({
      nm_category: name.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Category.findOne({
      where: {
        nm_category: createdCategory.dataValues.nm_category,
      },
    });
  }

  async findCategories({ page, limit, nm_category }) {
    return nm_category
      ? await _models.Category.findAndCountAll({
          where: {
            nm_category: {
              [_sequelize.Op.like]: `%${nm_category.trim()}%`,
            },
          },
          order: [['nm_category', 'ASC']],
          limit: limit !== 'all' ? Number(limit) : null,
          offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        })
      : await _models.Category.findAndCountAll({
          limit: limit !== 'all' ? Number(limit) : null,
          order: [['nm_category', 'ASC']],
          offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        });
  }

  async findCategory({ name }) {
    return await _models.Category.findOne({
      where: {
        nm_category: name.trim(),
      },
      raw: true,
    });
  }

  async findCategoryById({ id }) {
    return await _models.Category.findOne({
      where: {
        id_category: id,
      },
      raw: true,
    });
  }

  async deleteCategory({ id }) {
    await _models.Category.destroy({
      where: { id_category: id },
    });
  }

  async updateCategory({ id, name }) {
    const category = await _models.Category.findOne({
      where: {
        id_category: id,
      },
    });

    await category.update({
      nm_category: name.trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Category.findOne({
      where: {
        nm_category: category.dataValues.nm_category,
      },
      raw: true,
    });
  }
} exports.CategoryRepository = CategoryRepository;
