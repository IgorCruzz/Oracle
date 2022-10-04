"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _repositories = require('../../database/repositories');
var _verifyDate = require('../../../utils/verifyDate');

 class CreateInspectionService {
  async execute(data) {
    const {
      dt_inspection,
      dt_new_end,

      id_project_phase,
    } = data;

    let dtNewEnd;
    if (dt_new_end) {
      dtNewEnd = _verifyDate.verifyDate.call(void 0, {
        value: dt_new_end,
        msg: 'Término efetivo da fase inválida. Utilize o formato dd/mm/yyyy',
      });

      if (dtNewEnd.error) {
        return { error: dtNewEnd.error };
      }
    }
    let dtInspection;
    if (dt_inspection) {
      dtInspection = _verifyDate.verifyDate.call(void 0, {
        value: dt_inspection,
        msg: 'Data da vistoria inválida. Utilize o formato dd/mm/yyyy',
      });

      if (dtInspection.error) {
        return { error: dtInspection.error };
      }
    }

    const repository = new (0, _repositories.InspectionRepository)();
    const projectPhaseRepository = new (0, _repositories.ProjectPhaseRepository)();

    const projectPhaseExists = await projectPhaseRepository.findProjectPhaseById(
      {
        id_project_phase,
        populate: false,
      }
    );

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
} exports.CreateInspectionService = CreateInspectionService;
