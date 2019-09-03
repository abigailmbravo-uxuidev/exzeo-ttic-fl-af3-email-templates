'use strict';

const path = require('path');

const fileManager = require('./file-manager');
const { updateRecord } = require('./helpers');

const eventsDirectory = path.join(__dirname, '../data/documents/events');

const updateEvent = (context, documentEvent) => {
  const { companyCode, state, product, name } = documentEvent;

  return updateRecord(context, 'documentevents',
    {
      companyCode, state, product, name
    }, 
    documentEvent
  );
};

const updateEvents = async context => {
  return context.taskPool.forEach(context, updateEvents.name,
    await fileManager.getFiles(context, eventsDirectory),
    async eventFile => updateEvent(context, await eventFile.load())
  );
};

module.exports = { updateEvents };
