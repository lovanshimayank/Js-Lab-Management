// ========================================================
// MongoDB Database Connection - JS Lab Management System
// ========================================================

require('dotenv').config();
const mongoose = require('mongoose');

let isConnected = false;

async function initDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing in backend/.env');
    }

    await mongoose.connect(process.env.MONGODB_URI);

    isConnected = true;

    console.log('[Database] Successfully connected to MongoDB.');
    console.log(`[Database] Database: "${mongoose.connection.name}"`);
    console.log(`[Database] Host: "${mongoose.connection.host}"`);
  } catch (error) {
    isConnected = false;

    console.error('[Database Error] MongoDB connection failed.');
    console.error(`[Database Error] ${error.message}`);

    process.exit(1);
  }
}

function getStatus() {
  return {
    connected: isConnected,
    mode: isConnected ? 'MongoDB Database' : 'Disconnected',
    database: mongoose.connection.name || 'Unknown',
    host: mongoose.connection.host || 'Unknown',
    port: mongoose.connection.port || 'Unknown'
  };
}

module.exports = {
  initDatabase,
  getStatus
};