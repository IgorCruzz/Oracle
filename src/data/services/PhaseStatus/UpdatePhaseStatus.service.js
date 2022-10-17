import { PhaseStatusRepository } from '../../database/repositories/PhaseStatus/PhaseStatus.repository';

export class UpdatePhaseStatusService {
  async execute(id_status, data) {
    const { ds_status } = data;

    const repository = new PhaseStatusRepository();

    const verifyStatusExists = await repository.findPhaseStatusById({
      id_status,
    });

    if (!verifyStatusExists)
      return { error: `Não existe um Status com este ID -> ${id_status}.` };

    const verifyDsStatus = await repository.findPhaseStatus({
      ds_status,
    });

    if (verifyDsStatus && verifyDsStatus.id_status !== Number(id_status))
      return { error: 'Já existe um Status registrado com este nome.' };

    const statusUpdated = await repository.updatePhaseStatus(id_status, data);

    return {
      message: 'Status atualizado com sucesso!',
      status: statusUpdated,
    };
  }
}
