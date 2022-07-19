import { Op } from 'sequelize';
import { Contact } from '../../models';

export class ContactRepository {
  async createContact({ nm_contact }) {
    const createdContact = await Contact.create({
      nm_contact: nm_contact.trim(),
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await Contact.findOne({
      where: {
        nm_contact: createdContact.dataValues.nm_contact,
      },
    });
  }

  async findContacts({ page, limit, nm_contact }) {
    return nm_contact
      ? await Contact.findAndCountAll({
          where: {
            nm_contact: {
              [Op.like]: `%${nm_contact.trim()}%`,
            },
          },
          order: [['nm_contact', 'ASC']],
          limit: limit !== 'all' ? Number(limit) : null,
          offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        })
      : await Contact.findAndCountAll({
          limit: limit !== 'all' ? Number(limit) : null,
          order: [['nm_contact', 'ASC']],
          offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
          raw: true,
        });
  }

  async findContact({ nm_contact }) {
    return await Contact.findOne({
      where: {
        nm_contact: nm_contact.trim(),
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
    const { nm_contact } = data;

    const contact = await Contact.findOne({
      where: {
        id_contact,
      },
    });

    await contact.update({
      nm_contact: nm_contact.trim(),
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
