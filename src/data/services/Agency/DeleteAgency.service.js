import {
  AgencyRepository,
  ProjectRepository,
} from '../../database/repositories';

export class DeleteAgencyService {
  async execute({ id }) {
    const repository = new AgencyRepository();
    const projectRepository = new ProjectRepository();

    const verifyAgencyExists = await repository.findAgencyById({
      id,
    });

    if (!verifyAgencyExists)
      return {
        error: `Não há nenhum Orgão registrado com este ID -> ${id}.`,
      };

    const verifyFk = await projectRepository.verifyRelationAgency({
      id_agency: id,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir o Orgão pois existem Projetos associados.',
      };
    }

    await repository.deleteAgency({
      id,
    });

    return {
      message: 'Orgão excluído com sucesso!',
    };
  }
}
