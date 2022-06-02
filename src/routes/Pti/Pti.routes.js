import { Router } from 'express';
import {
  FindPeriodPtiController,
  FindProductHistoryPtiController,
  FindProfessionalPtiController,
  DownloadPtiController,
} from '../../data/controllers';

import {
  FindProfessionalPtiValidator,
  FindProductHistoryPtiValidator,
  FindPeriodPtiValidator,
} from '../../data/validators';

import authenticator from '../../data/authenticator/jwt.authenticator';
import {
  Project,
  Project_phase,
  Product,
  Allocation,
  Allocation_period,
  Professional,
  City,
} from '../../data/database/models';

const routes = Router();

routes.get(
  '/ptis/teste/',
  // authenticator,
  async (req, res) => {
    const project = await Project.findAll({
      include: [
        {
          model: City,
          as: 'city',
        },
        {
          model: Project_phase,
          as: 'project_phase',
          required: true,
          include: [
            {
              model: Product,
              as: 'product',
              required: true,
              include: [
                {
                  model: Allocation,
                  as: 'allocation',
                  required: true,
                  include: [
                    {
                      model: Professional,
                      as: 'professional',
                      required: true,
                      where: { id_professional: 7 },
                    },
                    {
                      model: Allocation_period,
                      as: 'allocation_period',
                      required: true,
                      where: { id_allocation_period: 2 },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    const response = project.map(proj => {
      const products = proj.dataValues.project_phase
        .map(val => val.dataValues.product)
        .map(kok => kok.map(a => a.dataValues));

      const arr = [];

      products.map(a =>
        a.map(b => {
          arr.push(b);
        })
      );

      console.log(arr[0].allocation[0].dataValues);
      // tp_action_picture
      // products

      console.log({
        city: proj.dataValues.city.nm_city,
        project: proj.dataValues.nm_project,
        product: arr.map(a => `${a.nm_product}\n`),
        tp_action_picture: arr.map(
          a => a.allocation[0].dataValues.tp_action_picture
        ),
      });
    });

    return res.status(201).json({ project });
  }
);

routes.get(
  '/ptis/download/',
  // authenticator,
  new DownloadPtiController().handle
);

routes.get(
  '/ptis/allocationPeriods/',
  authenticator,
  FindPeriodPtiValidator,
  new FindPeriodPtiController().handle
);

routes.get(
  '/ptis/productHistories/',
  authenticator,
  FindProductHistoryPtiValidator,
  new FindProductHistoryPtiController().handle
);

routes.get(
  '/ptis/professionals/',
  authenticator,
  FindProfessionalPtiValidator,
  new FindProfessionalPtiController().handle
);

export default routes;
