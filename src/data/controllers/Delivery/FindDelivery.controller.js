import { FindDeliveriesService } from '../../services';

export class FindDeliveryController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        id_professional,
        id_project,
        id_project_phase,
        nm_product,
        id_allocation_period,
        wt_alocation,
        on_production,
        in_correction,
        in_analisys,
        in_analisysCorretion,
        concluded,
      } = req.query;

      const { userId } = req;

      const service = new FindDeliveriesService();

      const response = await service.execute({
        page,
        limit,
        id_professional,
        id_project,
        id_project_phase,
        nm_product,
        id_allocation_period,
        wt_alocation,
        on_production,
        in_correction,
        in_analisys,
        in_analisysCorretion,
        concluded,
        userId,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.deliveries;

      return res.status(200).json({
        count,
        page,
        limit,
        deliveries: rows,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
