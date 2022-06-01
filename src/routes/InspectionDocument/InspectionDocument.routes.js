import multer from 'multer';
import { Router } from 'express';
import { storage } from '../../config/multer_inspection_documents';
import {
  CreateInspectionDocumentController,
  DeleteInspectionDocumentController,
  FindInspectionDocumentController,
  FindInspectionDocumentsController,
  UpdateInspectionDocumentController,
} from '../../data/controllers';
import {
  findInspectionDocumentValidator,
  createInspectionDocumentValidator,
  deleteInspectionDocumentValidator,
  findInspectionDocumentsValidator,
  updateInspectionDocumentValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';

const upload = multer({ storage });
const routes = Router();
routes.post(
  '/inspection_documents',
  authenticator,
  createInspectionDocumentValidator,
  new CreateInspectionDocumentController().handle
);

routes.delete(
  '/inspection_documents/:id_inspection_document',
  authenticator,
  deleteInspectionDocumentValidator,
  new DeleteInspectionDocumentController().handle
);

routes.patch(
  '/inspection_documents/:id_inspection_document',
  authenticator,
  upload.single('file'),
  updateInspectionDocumentValidator,
  new UpdateInspectionDocumentController().handle
);

routes.get(
  '/inspection_documents',
  authenticator,
  findInspectionDocumentsValidator,
  new FindInspectionDocumentsController().handle
);

routes.get(
  '/inspection_documents/:id_inspection_document',
  authenticator,
  findInspectionDocumentValidator,
  new FindInspectionDocumentController().handle
);

export default routes;
