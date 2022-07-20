import { Op } from 'sequelize';
import { Contact_history } from '../../models';

export class ContactHistoryRepository {
  async createContactHistory(data) {
    const createdContact = await Contact_history.create({
      ...data,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Contact_history.findOne({
      where: {
        nm_contact: createdContact.dataValues.nm_contact,
      },
    });
  }

  async findContactHistories({ page, limit }) {
    return await Contact_history.findAndCountAll({
      limit: limit !== 'all' ? Number(limit) : null,
      order: [['nm_contact', 'ASC']],
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      raw: true,
    });
  }

  async findContactHistory({ nm_contact, id_project }) {
    return await Contact_history.findOne({
      where: {
        [Op.and]: [{ nm_contact: nm_contact.trim() }, { id_project }],
      },
      raw: true,
    });
  }

  async findContactHistoryById({ id_contact }) {
    return await Contact_history.findOne({
      where: {
        id_contact,
      },
      raw: true,
    });
  }

  async deleteContactHistory({ id_contact }) {
    await Contact_history.destroy({
      where: { id_contact },
    });
  }

  async updateContactHistory(id_contact, data) {
    const { nm_contact } = data;

    const contact = await Contact_history.findOne({
      where: {
        id_contact,
      },
    });

    await contact.update({
      nm_contact: nm_contact.trim(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Contact_history.findOne({
      where: {
        id_contact: contact.dataValues.id_contact,
      },
      raw: true,
    });
  }
}
