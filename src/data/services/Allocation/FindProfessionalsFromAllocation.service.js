import {
  // AllocationRepository,
  ProfessionalRepository,
} from '../../database/repositories';

export class FindProfessionalsFromAllocationService {
  async execute({
    page,
    limit,
    // cd_priority,
    // id_project,
    // id_project_phase,
    // nm_product,
    // tp_profile,
    // id_professional,
    // allocation_period,
  }) {
    const professionalRepository = new ProfessionalRepository();

    // const repository = new AllocationRepository();

    const findProfessionals = await professionalRepository.findProfessionals({
      limit,
      page,
    });

    // const findAllocations = await repository.findAllocations({
    //   page,
    //   limit,
    //   cd_priority,
    //   id_project,
    //   id_project_phase,
    //   nm_product,
    //   tp_profile,
    //   id_professional,
    //   allocation_period,
    // });

    return {
      professionals: findProfessionals,
    };
  }
}
