import { GradeRepository } from '../../database/repositories';

export class UpdateGradeService {
  async execute(id_grade, data) {
    const { nm_grade } = data;

    const repository = new GradeRepository();

    const verifyGradeExists = await repository.findGradeById({
      id_grade,
    });

    if (!verifyGradeExists)
      return { error: `Não existe um Cargo com este ID -> ${id_grade}.` };

    const verifyGradeName = await repository.findGrade({
      nm_grade,
    });

    if (verifyGradeName && verifyGradeName.id_grade !== Number(id_grade))
      return { error: 'Já existe um Cargo registrado com este nome.' };

    const gradeUpdated = await repository.updateGrade(id_grade, data);

    return {
      message: 'Cargo atualizado com sucesso!',
      grade: gradeUpdated,
    };
  }
}
