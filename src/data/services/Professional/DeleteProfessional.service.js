import {
  ProfessionalRepository,
  ProductHistoryRepository,
} from '../../database/repositories';

export class DeleteProfessionalService {
  async execute({ id_professional }) {
    const repository = new ProfessionalRepository();
    const productHistory = new ProductHistoryRepository();

    const verifyProfessionalExists = await repository.findProfessionalById({
      id_professional,
    });

    if (!verifyProfessionalExists)
      return {
        error: `Não existe um Colaborador com este ID -> ${id_professional}.`,
      };

    const verifyFk = await productHistory.verifyRelation({
      id_professional,
    });

    if (verifyFk.length > 0) {
      return {
        error:
          'Não foi possível excluir o Colaborador pois existem Históricos de produtos associados.',
      };
    }

    await repository.deleteProfessional({
      id_professional,
    });

    return {
      message: 'Colaborador excluído com sucesso!',
    };
  }
}
