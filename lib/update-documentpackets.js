'use strict';

const path = require('path');

const fileManager = require('./file-manager');
const { updateRecord } = require('./helpers');

const packetsDirectory = path.join(__dirname, '../data/documents/packets');

const updatePacket = (context, packet) => {
  const { companyCode, state, product, name } = packet;

  return updateRecord(context, 'documentpackets',
    {
      companyCode, state, product, name
    }, 
    packet
  );
};

const updatePackets = async context => {
  return context.taskPool.forEach(context, updatePackets.name,
    await fileManager.getFiles(context, packetsDirectory),
    async packetFile => updatePacket(context, await packetFile.load())
  );
};

module.exports = { updatePackets };
