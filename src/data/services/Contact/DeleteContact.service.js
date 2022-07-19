import {
  SectorRepository,
  ProfessionalRepository,
} from '../../database/repositories';

export class DeleteContactService {
  async execute({ id_sector }) {
    const repository = new SectorRepository();
    const professionalRepository = new ProfessionalRepository();

    const verifySectorExists = await repository.findSectorById({
      id_sector,
    });

    if (!verifySectorExists)
      return { error: `Não existe um Setor com este ID -> ${id_sector}.` };

    const verifyFkFromProfessional = await professionalRepository.verifyRelationSector(
      {
        id_sector,
      }
    );

    if (verifyFkFromProfessional.length > 0) {
      return {
        error:
          'Não foi possível excluir o Setor pois existem Colaboradores associados.',
      };
    }

    await repository.deleteSector({
      id_sector,
    });

    return {
      message: 'Setor excluído com sucesso!',
    };
  }
}
