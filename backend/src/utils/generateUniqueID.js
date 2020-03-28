const crypto = require('crypto');

module.exports = function generateUniqueID() {
  // Gera um id aleatoria para cada ONG
  return crypto.randomBytes(4).toString('HEX');
}