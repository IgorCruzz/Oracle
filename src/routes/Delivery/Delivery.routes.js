import { Router } from 'express';
import multer from 'multer';
import { FindDeliveryController } from '../../data/controllers';
import authenticator from '../../data/authenticator/jwt.authenticator';
import { storage } from '../../config/multer';

const upload = multer({ storage });

const routes = Router();

routes.get('/deliveries', authenticator, new FindDeliveryController().handle);
routes.get(
  '/deliveries/attach',
  upload.single('file'),

  (req, res) => {
    return res.status(200).json({ msg: 'text' });
  }
);

export default routes;
