import {
  InspectionRepository,
  UserRepository,
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

    const verifyTpProfile = await userRepository.findUserById({
      id_user: userId,
    });

    const findInspections = await repository.findInspections({
      page,
      limit,
      id,
      id_project,
      id_project_phase,
      id_professional:
        verifyTpProfile.dataValues.tp_profile === 2
          ? verifyTpProfile.dataValues.tp_profile
          : id_professional,
    });

    if (findInspections.length === 0)
      return { error: 'Não há nenhuma vistoria registrada.' };

    return {
      inspections: findInspections,
    };
  }
}
