import { SectorRepository } from '../../database/repositories';

export class UpdateSectorService {
  async execute(id_sector, data) {
    const { nm_sector } = data;

    const repository = new SectorRepository();

    const verifyGradeExists = await repository.findGradeById({
      id_sector,
    });

    if (!verifyGradeExists)
      return { error: `Não existe um Setor com este ID -> ${id_sector}.` };

    const verifySectorName = await repository.findGrade({
      nm_sector,
    });

    if (verifySectorName && verifySectorName.id_sector !== Number(id_sector))
      return { error: 'Já existe um Setor registrado com este nome.' };

    const gradeUpdated = await repository.updateGrade(id_sector, data);

    return {
      message: 'Setor atualizado com sucesso!',
      sector: gradeUpdated,
    };
  }
}
