import {
  AllocationRepository,
  ProductHistoryRepository,
} from '../../database/repositories';

export class CreateAllocationService {
  async execute(data) {
    const { id_allocation_period, id_product, id_professional } = data;

    const repository = new AllocationRepository();
    const productHistoryRepository = new ProductHistoryRepository();

    const verifyAllocation = await repository.findAllocation({
      id_allocation_period,
      id_product,
      id_professional,
    });

    if (verifyAllocation) {
      return {
        error: 'O colaborador já possui uma locação para este período.',
      };
    }

    // await productHistoryRepository.createProductHistory({
    //   cd_status: 1,
    //   dt_status: new Date(Date.now()).toISOString(),
    //   tx_remark: null,
    //   id_product,
    //   id_allocation_period,
    //   id_professional,
    //   id_analyst_user: 1,
    //   dt_created_at: new Date(Date.now()).toISOString(),
    //   dt_updated_at: new Date(Date.now()).toISOString(),
    // });

    const allocation = await repository.createAllocationPeriod(data);

    return {
      message: 'Alocação registrada com sucesso!',
      allocation,
    };
  }
}
