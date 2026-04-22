const axios = require("axios");

exports.verifyIdentity = async (data) => {
  // MOCK (replace with real API)
  return { success: true, name: "Verified User" };
};

exports.nameEnquiry = async (accountNumber) => {
  return { accountName: "Recipient Name" };
};

exports.interBankTransfer = async (payload) => {
  return { success: true, reference: "NIBSS12345" };
};

