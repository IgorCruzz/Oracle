import { Router } from 'express';
import {
  FindDocumentController,
  FindDocumentsController,
  CreateDocumentController,
  DeleteDocumentController,
  UpdateDocumentController,
} from '../../data/controllers';
import {
  findDocumentValidator,
  findDocumentsValidator,
  createDocumentValidator,
  deleteDocumentValidator,
  updateDocumentValidator,
} from '../../data/validators';

const routes = Router();

routes.post(
  '/documents',
  createDocumentValidator,
  new CreateDocumentController().handle
);

routes.delete(
  '/documents/:id_document',
  deleteDocumentValidator,
  new DeleteDocumentController().handle
);

routes.patch(
  '/documents/:id_document',
  updateDocumentValidator,
  new UpdateDocumentController().handle
);

routes.get(
  '/documents',
  findDocumentsValidator,
  new FindDocumentsController().handle
);

routes.get(
  '/document/:id_document',
  findDocumentValidator,
  new FindDocumentController().handle
);

export default routes;
