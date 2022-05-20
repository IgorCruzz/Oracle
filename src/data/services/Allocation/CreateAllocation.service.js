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
    const { id_allocation_period, id_product, id_professional } = data;
    const t = await sequelize.transaction();

    const repository = new AllocationRepository();
    const professionalRepository = new ProfessionalRepository();
    const productHistory = new ProductRepository();
    const productHistoryRepository = new ProductHistoryRepository();

    try {
      const getProfessional = await professionalRepository.findProfessionalById(
        {
          id_professional,
        }
      );

      const getProduct = await productHistory.findProductById({ id_product });

      const { id_sector, coustHH } = getProfessional.dataValues;

      const { vl_salary, vl_hour_cost, id_role, id_grade } = coustHH.dataValues;

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

      const verifyProductIfExistsOnHistory = await productHistoryRepository.findProductById(
        {
          id_product,
        }
      );

      if (verifyProductIfExistsOnHistory) {
        await productHistoryRepository.updateProductHistory({
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

        const allocation = await repository.createAllocation({
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

        t.commit();

        return {
          message: 'Alocação registrada com sucesso!',
          allocation,
        };
      }

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

      const allocation = await repository.createAllocation({
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

      t.commit();

      return {
        message: 'Alocação registrada com sucesso!',
        allocation,
      };
    } catch (e) {
      if (t) {
        await t.rollback();
      }

      return { error: 'Ocorreu um problema interno' };
    }
  }
}
