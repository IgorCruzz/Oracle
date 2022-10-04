"use strict";Object.defineProperty(exports, "__esModule", {value: true});





var _models = require('../../database/models');
var _database = require('../../database');

 class DeleteProductService {
  async execute({ id_product }) {
    const t = await _database.sequelize.transaction();

    try {
      const verifyProductExists = await _models.Product.findOne({
        where: {
          id_product: Number(id_product),
        },
        include: [
          {
            model: _models.Project_phase,
            as: 'project_phase',
            include: [
              {
                model: _models.Project,
                as: 'project',
                where: {
                  dt_deleted_at: null,
                },
              },
            ],
          },
        ],

        transaction: t,
      });

      if (
        !verifyProductExists ||
        (verifyProductExists && !verifyProductExists.dataValues.project_phase)
      )
        return {
          error: `Não há nenhum Produto registrado com este ID -> ${id_product}.`,
        };

      const verifyFk = await _models.Document.findAll({
        include: [
          {
            model: _models.Product,
            as: 'product',
            where: { id_product: Number(id_product) },
          },
        ],
        transaction: t,
      });

      if (verifyFk.length > 0) {
        return {
          error:
            'Não foi possível excluir o Produto pois existem Documentos associados.',
        };
      }

      const verifyFKProductHistory = await _models.Product_history.findOne({
        include: [
          {
            model: _models.Product,
            as: 'product',
            where: { id_product: Number(id_product) },
          },
        ],
        transaction: t,
      });

      if (verifyFKProductHistory) {
        await _models.Product_history.destroy({
          where: { id_product: Number(id_product) },
          transaction: t,
        });

        await _models.Product.destroy({
          where: { id_product: Number(id_product) },
          transaction: t,
        });

        t.commit();

        return {
          message: 'Produto excluído com sucesso!',
        };
      }

      await _models.Product.destroy({
        where: { id_product: Number(id_product) },
        transaction: t,
      });

      t.commit();

      return {
        message: 'Produto excluído com sucesso!',
      };
    } catch (e) {
      if (t) {
        await t.rollback();
      }

      return { error: 'Ocorreu um problema interno' };
    }
  }
} exports.DeleteProductService = DeleteProductService;
