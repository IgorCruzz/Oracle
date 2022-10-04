"use strict";Object.defineProperty(exports, "__esModule", {value: true});





var _models = require('../../database/models');
var _database = require('../../database');

 class CreateProductService {
  async execute(data) {
    const t = await _database.sequelize.transaction();

    try {
      const {
        id_suggested_role,
        id_project_phase,
        nm_product,
        ds_note_required_action,
      } = data;

      if (id_suggested_role) {
        const roleExists = await _models.Role.findOne({
          where: {
            id_role: id_suggested_role,
          },
          raw: true,
          transaction: t,
        });

        if (!roleExists) {
          return {
            error: `Não há nenhuma Função registrada com este ID -> ${id_suggested_role}.`,
          };
        }
      }

      const ProjectPhaseExists = await _models.Project_phase.findOne({
        where: {
          id_project_phase,
        },
        raw: true,
        transaction: t,
        include: [
          {
            model: _models.Project,
            as: 'project',
            where: {
              dt_deleted_at: null,
            },
          },
        ],
      });

      if (!ProjectPhaseExists) {
        return {
          error: `Não há nenhuma Fase de projeto registrada com este ID -> ${id_project_phase}.`,
        };
      }

      const productExists = await _models.Product.findOne({
        where: {
          nm_product: nm_product.trim(),
          id_project_phase,
        },
        transaction: t,
      });

      if (productExists) {
        return { error: 'Já existe um Produto com este nome.' };
      }

      const findProject = await _models.Product.findAll({
        where: {
          id_project_phase,
        },
      });

      const count = await _models.Product.findAndCountAll({
        where: {
          id_project_phase,
        },
      });

      let maior;

      if (count.count > 0) {
        const orderA = findProject.map(a => a.dataValues.nu_order);

        maior = orderA.sort((a, b) => {
          return b - a;
        });

        maior = maior[0] + 1;
      } else {
        maior = 1;
      }

      const createdProduct = await _models.Product.create(
        {
          ...data,
          nm_product: nm_product.trim(),
          nu_order: maior,
          ds_note_required_action:
            ds_note_required_action && ds_note_required_action.trim(),
          dt_created_at: new Date(Date.now()).toISOString(),
          dt_updated_at: new Date(Date.now()).toISOString(),
        },
        {
          transaction: t,
        }
      );

      const product = await _models.Product.findOne({
        where: {
          id_product: createdProduct.dataValues.id_product,
        },
        include: [
          { model: _models.Role, as: 'suggested_role' },
          { model: _models.Project_phase, as: 'project_phase' },
        ],
        transaction: t,
      });

      await _models.Product_history.create(
        {
          cd_status: 0,
          dt_status: new Date(Date.now()).toISOString(),
          tx_remark: null,
          id_product: product.id_product,
          id_allocation_period: null,
          id_professional: null,
          id_analyst_user: null,
          dt_created_at: new Date(Date.now()).toISOString(),
          dt_updated_at: new Date(Date.now()).toISOString(),
        },
        {
          transaction: t,
        }
      );

      t.commit();

      return {
        message: 'Produto adicionado com sucesso!',
        product,
      };
    } catch (e) {
      if (t) {
        await t.rollback();
      }

      return { error: 'Ocorreu um problema interno' };
    }
  }
} exports.CreateProductService = CreateProductService;
