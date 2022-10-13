import {
  InspectionRepository,
  UserRepository,
  ProfessionalRepository,
} from '../../database/repositories';

export class FindInspectionsService {
  async execute({
    page,
    limit,
    id,
    id_project,
    id_project_phase,
    id_professional,
    userId,
  }) {
    const repository = new InspectionRepository();
    const userRepository = new UserRepository();
    const professionalRepository = new ProfessionalRepository();

    const verifyTpProfile = await userRepository.findUserById({
      id_user: userId,
    });

    const getProfessionalId = await professionalRepository.findUser({
      id_user: verifyTpProfile.id_user,
    });

    const findInspections = await repository.findInspections({
      page,
      limit,
      id,
      id_project,
      id_project_phase,
      id_professional:
        verifyTpProfile.dataValues.tp_profile === 2
          ? getProfessionalId.dataValues.id_professional
          : id_professional,
    });

    if (findInspections.length === 0)
      return { error: 'Não há nenhuma vistoria registrada.' };

    return {
      inspections: findInspections,
    };
  }
}
