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
// import { roleAuthenticator } from '../../data/authenticator/role.authenticator';
import { storage } from '../../config/multer_product_history';

// const profiles = [0, 1, 2];

const upload = multer({ storage });

const routes = Router();

routes.get(
  '/analysis',
  authenticator,
  // roleAuthenticator({
  //  profiles,
  //  }),
  new FindAnalysisController().handle
);

routes.post(
  '/analysis/correction',
  upload.single('file'),
  authenticator,
  // roleAuthenticator({
  //  profiles,
  //  }),
  correctionValidator,

  new CorrectionController().handle
);

routes.delete(
  '/analysis/correction/undo',
  authenticator,
  // roleAuthenticator({
  //  profiles,
  //  }),
  undoCorrectionValidator,
  new UndoCorrectionController().handle
);

routes.post(
  '/analysis/accept',
  authenticator,
  // roleAuthenticator({
  //  profiles,
  //  }),
  acceptValidator,
  new AcceptController().handle
);

routes.post(
  '/analysis/accept',
  authenticator,
  // roleAuthenticator({
  //  profiles,
  //  }),
  acceptValidator,
  new AcceptController().handle
);

routes.delete(
  '/analysis/accept/undo',
  authenticator,
  // roleAuthenticator({
  //  profiles,
  //  }),
  undoAcceptValidator,
  new UndoAcceptController().handle
);

export default routes;
