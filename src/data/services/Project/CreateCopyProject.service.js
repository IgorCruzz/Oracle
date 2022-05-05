import { CreateProjectService } from './CreateProject.service';
import { ProjectPhaseRepository } from '../../database/repositories/ProjectPhase/ProjectPhase.repository';
import { ProductRepository } from '../../database/repositories/Product/Product.repository';
import { DocumentRepository } from '../../database/repositories/Document/Document.repository';

export class CreateCopyProjectService {
  async execute(id_project, data) {
    const projectService = new CreateProjectService();
    const projectPhaseRepository = new ProjectPhaseRepository();
    const productRepository = new ProductRepository();
    const documentRepository = new DocumentRepository();

    const project = await projectService.execute(data);

    if (project.error)
      return {
        error: project.error,
      };

    const projectCreated = project.response;

    const findProjectsPhase = await projectPhaseRepository.findProjectPhases({
      id_project,
    });

    const projectPhaseCopy = findProjectsPhase.map(projectPhases => {
      return {
        id_project: 874,
        nu_order: projectPhases.nu_order,
        nm_project_phase: projectPhases.nm_project_phase,
        dt_planned_start: null,
        dt_planned_end: null,
        vl_phase: null,
        dt_created_at: new Date(Date.now()).toISOString(),
        dt_updated_at: new Date(Date.now()).toISOString(),
      };
    });

    const createProjectsPhases = await projectPhaseRepository.createManyProjectPhases(
      projectPhaseCopy
    );

    const getProjectPhases = await projectPhaseRepository.findProjectPhases({
      id_project: 864,
    });

    const getProducts = await Promise.all(
      await getProjectPhases
        .map(async a => {
          return await productRepository.getTest({
            id_project_phase: a.id_project_phase,
          });
        })
        .filter(Boolean)
    );

    const filterProducts = getProducts.filter(Boolean).map(teste => {
      return {
        nu_order: teste.nu_order,
        nm_product: teste.nm_product,
        qt_minimum_hours: teste.qt_maximum_hours,
        qt_maximum_hours: teste.qt_maximum_hours,
        qt_probable_hours: teste.qt_probable_hours,
        tp_required_action: 0,
        ds_note_required_action: null,
        dt_created_at: new Date(Date.now()).toISOString(),
        dt_updated_at: new Date(Date.now()).toISOString(),
        id_project_phase: 41134,
        id_suggested_role: teste.id_suggested_role,
      };
    });

    const createProducts = await productRepository.createManyProducts(
      filterProducts
    );

    const getOriginalDocuments = await documentRepository.findDocumentByIdProduct(
      {
        id_product: 114,
      }
    );

    const replaceValues = getOriginalDocuments.map(a => {
      return {
        ds_document: a.ds_document,
        dt_upload: null,
        nm_file: null,
        dt_created_at: new Date(Date.now()).toISOString(),
        dt_updated_at: new Date(Date.now()).toISOString(),
        id_product: 114,
      };
    });

    await documentRepository.createManyDocuments(replaceValues);

    return {
      message: 'Projeto adicionado com sucesso!',
      project: '',
    };
  }
}
