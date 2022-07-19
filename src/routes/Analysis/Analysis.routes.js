import { Router } from 'express';
import multer from 'multer';

import {
  FindAnalysisController,
  AcceptController,
  UndoAcceptController,
  CorrectionController,
  UndoCorrectionController,
} from '../../data/controllers';
import {
  acceptValidator,
  undoAcceptValidator,
  correctionValidator,
  undoCorrectionValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { storage } from '../../config/multer_product_history';

const upload = multer({ storage });

const routes = Router();

routes.get('/analysis', authenticator, new FindAnalysisController().handle);

routes.post(
  '/analysis/correction',
  upload.single('file'),
  authenticator,
  correctionValidator,

  new CorrectionController().handle
);

routes.delete(
  '/analysis/correction/undo',
  authenticator,
  undoCorrectionValidator,
  new UndoCorrectionController().handle
);

routes.post(
  '/analysis/accept',
  authenticator,
  acceptValidator,
  new AcceptController().handle
);

routes.post(
  '/analysis/accept',
  authenticator,
  acceptValidator,
  new AcceptController().handle
);

routes.delete(
  '/analysis/accept/undo',
  authenticator,
  undoAcceptValidator,
  new UndoAcceptController().handle
);

export default routes;
