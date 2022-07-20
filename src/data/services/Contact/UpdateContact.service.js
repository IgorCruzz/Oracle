import { ContactRepository } from '../../database/repositories';

export class UpdateContactService {
  async execute(id_sector, data) {
    const { nm_sector } = data;

    const repository = new ContactRepository();

    const verifySectorExists = await repository.findContactById({
      id_sector,
    });

    if (!verifySectorExists)
      return { error: `Não existe um Setor com este ID -> ${id_sector}.` };

    const verifySectorName = await repository.findContact({
      nm_sector,
    });

    if (verifySectorName && verifySectorName.id_sector !== Number(id_sector))
      return { error: 'Já existe um Setor registrado com este nome.' };

    const sectorUpdated = await repository.updateContact(id_sector, data);

    return {
      message: 'Setor atualizado com sucesso!',
      contact: sectorUpdated,
    };
  }
}
