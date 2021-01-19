const express = require("express");
const Batch = require("../models/batch");

const batchFind = Batch.find({}, (err, data) => {
  return data;
});

const oneBatchFind = () => {};

module.exports = { batchFind, oneBatchFind };
