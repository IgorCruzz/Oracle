import { Product, Document, Product_history } from '../../database/models';
import { sequelize } from '../../database';

export class DeleteProductService {
  async execute({ id_product }) {
    const t = await sequelize.transaction();

    try {
      const verifyProductExists = await Product.findOne({
        where: {
          id_product: Number(id_product),
        },
        raw: true,
        transaction: t,
      });

      if (!verifyProductExists)
        return {
          error: `Não há nenhum Produto registrado com este ID -> ${id_product}.`,
        };

      const verifyFk = await Document.findAll({
        include: [
          {
            model: Product,
            as: 'product',
            where: { id_product: Number(id_product) },
          },
        ],
        transaction: t,
      });

      if (verifyFk.length > 0) {
        return {
          error:
            'Não foi possível excluir o Produto pois existem Documentos associados.',
        };
      }

      const verifyFKProductHistory = await Product_history.findOne({
        include: [
          {
            model: Product,
            as: 'product',
            where: { id_product: Number(id_product) },
          },
        ],
        transaction: t,
      });

      if (verifyFKProductHistory) {
        await Product_history.destroy({
          where: { id_product: Number(id_product) },
          transaction: t,
        });

        await Product.destroy({
          where: { id_product: Number(id_product) },
          transaction: t,
        });

        t.commit();

        return {
          message: 'Produto excluído com sucesso!',
        };
      }

      await Product.destroy({
        where: { id_product: Number(id_product) },
        transaction: t,
      });

      t.commit();

      return {
        message: 'Produto excluído com sucesso!',
      };
    } catch (e) {
      if (t) {
        await t.rollback();
      }

      return { error: 'Ocorreu um problema interno' };
    }
  }
}
