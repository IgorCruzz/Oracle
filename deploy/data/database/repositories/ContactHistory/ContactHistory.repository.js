"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _models = require('../../models');

 class ContactHistoryRepository {
  async createContactHistory(data) {
    const { contact, agreedFeedBack, feedBack } = data;

    const createdContact = await _models.Contact_history.create({
      ...data,
      dt_contatct: contact || null,
      dt_agreed_feedback: agreedFeedBack || null,
      dt_feedback: feedBack || null,
      dt_created_at: new Date(Date.now()).toISOString(),
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Contact_history.findOne({
      where: {
        id_contact_history: createdContact.dataValues.id_contact_history,
      },
    });
  }

  async verifyRelation({ id_contact }) {
    return await _models.Contact_history.findAll({
      where: { id_contact },
      include: [
        {
          model: _models.Contact,
          as: 'contact',
          where: { id_contact },
        },
      ],
    });
  }

  async findContactHistories({ page, limit, id_contact }) {
    return await _models.Contact_history.findAndCountAll({
      where: { id_contact },
      order: [
        ['dt_contatct', 'ASC'],
        ['hr_contact', 'ASC'],
      ],
      limit: limit !== 'all' ? Number(limit) : null,
      offset: limit !== 'all' ? (Number(page) - 1) * Number(limit) : null,
      raw: true,
    });
  }

  async findContactHistory({ id_contact }) {
    return await _models.Contact_history.findOne({
      where: {
        id_contact,
      },
      raw: true,
    });
  }

  async findContactHistoryById({ id_contact_history }) {
    return await _models.Contact_history.findOne({
      where: {
        id_contact_history,
      },
      raw: true,
    });
  }

  async deleteContactHistory({ id_contact_history }) {
    await _models.Contact_history.destroy({
      where: { id_contact_history },
    });
  }

  async updateContactHistory(id_contact_history, data) {
    const { contact: ctc, agreedFeedBack, feedBack } = data;

    const contact = await _models.Contact_history.findOne({
      where: {
        id_contact_history,
      },
    });

    await contact.update({
      ...data,
      dt_contatct: ctc || null,
      dt_agreed_feedback: agreedFeedBack || null,
      dt_feedback: feedBack || null,
      dt_updated_at: new Date(Date.now()).toISOString(),
    });

    return await _models.Contact_history.findOne({
      where: {
        id_contact_history: contact.dataValues.id_contact_history,
      },
      raw: true,
    });
  }
} exports.ContactHistoryRepository = ContactHistoryRepository;
