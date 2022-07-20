import { Op } from 'sequelize';
import { Contact } from '../../models';

export class ContactRepository {
  async createContact(data) {
    const { nm_contact } = data;

    const createdContact = await Contact.create({
      nm_contact: nm_contact.trim(),
      ...data,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Contact.findOne({
      where: {
        nm_contact: createdContact.dataValues.nm_contact,
      },
    });
  }

  async findContacts({ page, limit, id_project }) {
    return await Contact.findAndCountAll({
      where: { id_project },
      limit: limit !== 'all' ? Number(limit) : null,
      order: [['nm_contact', 'ASC']],
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      raw: true,
    });
  }

  async findContact({ nm_contact, id_project }) {
    return await Contact.findOne({
      where: {
        [Op.and]: [{ nm_contact: nm_contact.trim() }, { id_project }],
      },
      raw: true,
    });
  }

  async findContactById({ id_contact }) {
    return await Contact.findOne({
      where: {
        id_contact,
      },
      raw: true,
    });
  }

  async deleteContact({ id_contact }) {
    await Contact.destroy({
      where: { id_contact },
    });
  }

  async updateContact(id_contact, data) {
    console.log({
      data,
    });

    const { nm_contact } = data;

    const contact = await Contact.findOne({
      where: {
        id_contact,
      },
    });

    await contact.update({
      nm_contact: nm_contact.trim(),
      ...data,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Contact.findOne({
      where: {
        id_contact: contact.dataValues.id_contact,
      },
      raw: true,
    });
  }
}
