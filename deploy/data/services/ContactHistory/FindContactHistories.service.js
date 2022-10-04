"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _datefns = require('date-fns');
var _repositories = require('../../database/repositories');

 class FindContactHistoriesService {
  async execute({ page, limit, id_contact }) {
    const repository = new (0, _repositories.ContactHistoryRepository)();

    const findContacts = await repository.findContactHistories({
      limit,
      page,
      id_contact,
    });

    if (findContacts.length === 0)
      return { error: 'Não há nenhum Histórico de contato registrado.' };

    const getRows = findContacts.rows.map(data => ({
      ...data,
      dt_feedback: data.dt_feedback
        ? _datefns.format.call(void 0, new Date(data.dt_feedback), 'yyyy-MM-dd')
        : null,
      dt_agreed_feedback: data.dt_agreed_feedback
        ? _datefns.format.call(void 0, new Date(data.dt_agreed_feedback), 'yyyy-MM-dd')
        : null,
      dt_contatct: data.dt_contatct
        ? _datefns.format.call(void 0, new Date(data.dt_contatct), 'yyyy-MM-dd')
        : null,
      hr_contact: data.hr_contact.slice(0, 5),
    }));

    return {
      contactHistories: {
        rows: getRows,
        count: findContacts.count,
      },
    };
  }
} exports.FindContactHistoriesService = FindContactHistoriesService;
