import { Router } from 'express';
import {
  FindContactController,
  CreateContactController,
  FindContactsController,
  DeleteContactController,
  UpdateContactController,
} from '../../data/controllers';
import {
  findContactValidator,
  findContactsValidator,
  deleteContactValidator,
  updateContactValidator,
  createContactValidator,
} from '../../data/validators';
import authenticator from '../../data/authenticator/jwt.authenticator';

const routes = Router();

routes.post(
  '/contacts',
  authenticator,
  createContactValidator,
  new CreateContactController().handle
);

routes.delete(
  '/contacts/:id_contact',
  authenticator,
  deleteContactValidator,
  new DeleteContactController().handle
);

routes.patch(
  '/contacts/:id_contact',
  authenticator,
  updateContactValidator,
  new UpdateContactController().handle
);

routes.get(
  '/contacts',
  authenticator,
  findContactsValidator,
  new FindContactsController().handle
);

routes.get(
  '/contact/:id_contact',
  authenticator,
  findContactValidator,
  new FindContactController().handle
);

export default routes;
