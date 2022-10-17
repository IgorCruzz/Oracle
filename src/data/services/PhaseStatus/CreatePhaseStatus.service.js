import { PhaseStatusRepository } from '../../database/repositories/PhaseStatus/PhaseStatus.repository';

export class CreatePhaseStatusService {
  async execute({ ds_status }) {
    const repository = new PhaseStatusRepository();

    const verifyStatusExists = await repository.findPhaseStatus({
      ds_status,
    });

    if (verifyStatusExists)
      return { error: 'Já existe um Status registrado com este nome.' };

    const status = await repository.createPhaseStatus({ ds_status });

    return {
      message: 'Status registrado com sucesso!',
      status: status.dataValues,
    };
  }
}
