import { Router } from 'express'; 

const routes = new Router();

routes.post('/session', (req, res) => {
  return res.status(200).json({msg: 'bar'})
});
 

export default routes;
