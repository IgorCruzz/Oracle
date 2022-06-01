import {
  InspectionRepository,
  ProjectPhaseRepository
} from '../../database/repositories';
import { verifyDate } from '../../../utils/verifyDate';

export class CreateInspectionService {
  async execute(data) {
    const {
      vl_new_cost,
      dt_inspection,
      dt_new_end,
      tp_inspection,
      id_project_phase,
      id_professional
    } = data;

    let dtNewEnd;
    if (dt_new_end) {
      dtNewEnd = verifyDate({
        value: dt_new_end,
        msg: 'Término efetivo da fase inválida. Utilize o formato dd/mm/yyyy',
      });

      if (dtNewEnd.error) {
        return { error: dtNewEnd.error };
      }
    }
    let dtInspection;
    if (dt_inspection) {
      dtInspection = verifyDate({
        value: dt_inspection,
        msg: 'Data da vistoria inválida. Utilize o formato dd/mm/yyyy',
      });

      if (dtInspection.error) {
        return { error: dtInspection.error };
      }
    }    

    const repository = new InspectionRepository();
    const projectPhaseRepository = new ProjectPhaseRepository();

    const projectPhaseExists = await projectPhaseRepository.findProjectPhaseById({
      id_project_phase: id_project_phase, 
      populate: false
    });

    if (!projectPhaseExists) {
      return {
        error: `Não há nenhuma fase do projeto registrado com este ID -> ${id_project_phase}.`,
      };
    }

    const inspection = await repository.createInspection({
      ...data,
    });

    if (inspection.error) {
      return { error: inspection.error };
    }

    return {
      message: 'Vistoria adicionada com sucesso!',
      inspection,
    };
  }
}
