import {
  AllocationRepository,
  ProductHistoryRepository,
  ProfessionalRepository,
  ProductRepository,
} from '../../database/repositories';
import { calculateHour } from '../../../utils/calculateHour';
import { sequelize } from '../../database';

export class CreateAllocationService {
  async execute(data) {
    const t = await sequelize.transaction();

    const repository = new AllocationRepository();
    const professionalRepository = new ProfessionalRepository();
    const productHistory = new ProductRepository();
    const productHistoryRepository = new ProductHistoryRepository();

    try {
      await Promise.all(
        await data.allocations.map(
          async ({ id_allocation_period, id_product, id_professional }) => {
            const getProfessional = await professionalRepository.findProfessionalById(
              {
                id_professional,
              }
            );

            const getProduct = await productHistory.findProductById({
              id_product,
            });

            const { id_sector, coustHH } = getProfessional.dataValues;

            const {
              vl_salary,
              vl_hour_cost,
              id_role,
              id_grade,
            } = coustHH.dataValues;

            const {
              tp_required_action,
              qt_minimum_hours,
              qt_maximum_hours,
              qt_probable_hours,
            } = getProduct.dataValues;

            const calculate = calculateHour({
              max: qt_maximum_hours,
              min: qt_minimum_hours,
              prov: qt_probable_hours,
              value: tp_required_action,
            });

            const verifyAllocationExists = await repository.findAllocation({
              id_product,
            });

            if (!verifyAllocationExists) {
              await productHistoryRepository.createProductHistory({
                cd_status: 1,
                dt_status: new Date(Date.now()).toISOString(),
                tx_remark: null,
                id_product,
                id_allocation_period,
                id_professional,
                id_analyst_user: null,
                dt_created_at: new Date(Date.now()).toISOString(),
                dt_updated_at: new Date(Date.now()).toISOString(),
                transaction: t,
              });

              await repository.createAllocation({
                tp_action_picture: tp_required_action,
                qt_hours_picture: Number(calculate.toFixed(2)),
                vl_salary_picture: vl_salary,
                vl_hour_cost_picture: vl_hour_cost,
                id_allocation_period,
                id_product,
                id_professional,
                id_grade_picture: id_grade,
                id_sector_picture: id_sector,
                id_role_picture: id_role,
                transaction: t,
              });
            }

            if (verifyAllocationExists) {
              const {
                id_product: idProduct,
                id_professional: professional,
                id_allocation_period: allocation,
                id_allocation,
              } = verifyAllocationExists;

              if (
                professional !== id_professional ||
                id_allocation_period !== allocation
              ) {
                await productHistoryRepository.deleteProductHistory({
                  id_professional: professional,
                  id_allocation_period,
                  id_product,
                  transaction: t,
                });

                await productHistoryRepository.createProductHistory({
                  cd_status: 1,
                  dt_status: new Date(Date.now()).toISOString(),
                  tx_remark: null,
                  id_product: idProduct,
                  id_allocation_period,
                  id_professional,
                  id_analyst_user: null,
                  transaction: t,
                });

                await repository.updateAllocation(id_allocation, {
                  transaction: t,
                  id_professional,
                  id_allocation_period,
                });
              }
            }
          }
        )
      );

      await t.commit();

      return {
        message: 'Alocação registrada com sucesso!',
      };
    } catch (e) {
      if (t) {
        await t.rollback();
      }

      return { error: 'Ocorreu um problema interno' };
    }
  }
}
