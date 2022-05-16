import {
  GradeRepository,
  RoleGradeRepository,
} from '../../database/repositories';

export class DeleteGradeService {
  async execute({ id_grade }) {
    const repository = new GradeRepository();
    const roleGradeRepository = new RoleGradeRepository();

    const verifyGradeExists = await repository.findGradeById({
      id_grade,
    });

    if (!verifyGradeExists)
      return { error: `Não existe um Cargo com este ID -> ${id_grade}.` };

    const verifyFk = await roleGradeRepository.verifyRelationGrade({
      id_grade,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir o Cargo pois existem Custos HH associados.',
      };
    }

    await repository.createGrade({
      id_grade,
    });

    return {
      message: 'Cargo excluído com sucesso!',
    };
  }
}
