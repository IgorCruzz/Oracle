"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _models = require('../../models');

 class ContactRepository {
  async createContact(data) {
    const { nm_contact } = data;

    const createdContact = await _models.Contact.create({
      nm_contact: nm_contact.trim(),
      ...data,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Contact.findOne({
      where: {
        nm_contact: createdContact.dataValues.nm_contact,
      },
    });
  }

  async findContacts({ page, limit, id_project }) {
    return await _models.Contact.findAndCountAll({
      where: { id_project },
      limit: limit !== 'all' ? Number(limit) : null,
      order: [['nm_contact', 'ASC']],
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      raw: true,
    });
  }

  async findContact({ nm_contact, id_project }) {
    return await _models.Contact.findOne({
      where: {
        [_sequelize.Op.and]: [{ nm_contact: nm_contact.trim() }, { id_project }],
      },
      raw: true,
    });
  }

  async findContactById({ id_contact }) {
    return await _models.Contact.findOne({
      where: {
        id_contact,
      },
      raw: true,
    });
  }

  async deleteContact({ id_contact }) {
    await _models.Contact.destroy({
      where: { id_contact },
    });
  }

  async updateContact(id_contact, data) {
    console.log({
      data,
    });

    const { nm_contact } = data;

    const contact = await _models.Contact.findOne({
      where: {
        id_contact,
      },
    });

    await contact.update({
      nm_contact: nm_contact.trim(),
      ...data,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Contact.findOne({
      where: {
        id_contact: contact.dataValues.id_contact,
      },
      raw: true,
    });
  }
} exports.ContactRepository = ContactRepository;
