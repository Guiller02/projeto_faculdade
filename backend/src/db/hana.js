const hanaClient = require("@sap/hana-client");

const params = {
  host: "192.168.1.49",
  port: 31115,
  uid: "S0020896385",
  pwd: "First@01"
};

const connection = hanaClient.createConnection();

module.exports = { connection, params };
