module.exports = (client, error) => {
  client.logger.log(`[ERROR] ${error}`, "error");
};
