import { FindProductsService } from '../../services';

export class FindProductsController {
  async handle(req, res) {
    try {
      const {
        page,
        limit,
        id_project_phase,
        id_suggested_role,
        nm_product,
      } = req.query;

      const service = new FindProductsService();

      const response = await service.execute({
        page,
        limit,
        id_project_phase,
        id_suggested_role,
        nm_product,
      });

      if (response.error)
        return res.status(400).json({
          error: response.error,
        });

      const { count, rows } = response.products;

      return res.status(200).json({
        count,
        page,
        limit,
        products: rows,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Ocorreu um problema interno',
      });
    }
  }
}
