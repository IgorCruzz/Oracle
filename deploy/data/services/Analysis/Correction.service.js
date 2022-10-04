"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

var _repositories = require('../../database/repositories');
var _database = require('../../database');
var _models = require('../../database/models');

 class CorrectionService {
  async execute(data, userId) {
    const { filename, originalname } = data;

    const analysis = JSON.parse(data.analysis);

    const t = await _database.sequelize.transaction();

    const productHistoryRepository = new (0, _repositories.ProductHistoryRepository)();

    try {
      const verifyStatus = analysis.filter(value =>
        value.cd_status.match(
          /(Ag. Alocação|Em Produção|Em Correção|Concluído)/
        )
      );

      if (verifyStatus.length > 0) {
        return {
          error:
            'Só é possível solicitar a correção de produtos que estejam em análise ou em análise de correção.',
        };
      }

      await Promise.all(
        await analysis.map(
          async ({ id_allocation_period, id_product, tx_remark }) => {
            const findLastRecord = await _models.Product_history.findAll({
              attributes: [
                [
                  _database.sequelize.fn('MAX', _database.sequelize.col('id_product_history')),
                  'id_product_history',
                ],
              ],
              group: _database.sequelize.col('id_product'),
              raw: true,
            });

            const values = findLastRecord.map(
              ({ id_product_history }) => id_product_history
            );

            const getHistory = await _models.Product_history.findOne({
              where: {
                [_sequelize.Op.or]: [
                  {
                    [_sequelize.Op.and]: [
                      {
                        id_product_history: {
                          [_sequelize.Op.in]: values,
                        },
                      },
                      { id_product },
                      { id_allocation_period },
                      { cd_status: 2 },
                    ],
                  },
                  {
                    [_sequelize.Op.and]: [
                      {
                        id_product_history: {
                          [_sequelize.Op.in]: values,
                        },
                      },
                      { id_product },
                      { id_allocation_period },
                      { cd_status: 4 },
                    ],
                  },
                ],
              },
              transaction: t,
            });

            if (getHistory) {
              const { id_professional } = getHistory;

              await productHistoryRepository.createProductHistory({
                cd_status: 3,
                dt_status: new Date(Date.now()).toISOString(),
                tx_remark,
                id_product,
                id_allocation_period,
                id_professional,
                id_analyst_user: userId,
                transaction: t,
                nm_original_file: originalname || null,
                nm_file: filename || null,
              });
            }
          }
        )
      );

      await t.commit();

      return {
        message: 'Correção solicitada com sucesso!',
      };
    } catch (e) {
      console.log(e);
      if (t) {
        await t.rollback();
      }

      return { error: 'Ocorreu um problema interno' };
    }
  }
} exports.CorrectionService = CorrectionService;
