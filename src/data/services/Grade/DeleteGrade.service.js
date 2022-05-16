import { GradeRepository } from '../../database/repositories';

export class DeleteGradeService {
  async execute({ id_grade }) {
    const repository = new GradeRepository();

    const verifyGradeExists = await repository.findGradeById({
      id_grade,
    });

    if (!verifyGradeExists)
      return { error: `Não existe um Cargo com este ID -> ${id_grade}.` };

    await repository.createGrade({
      id_grade,
    });

    return {
      message: 'Cargo excluído com sucesso!',
    };
  }
}
