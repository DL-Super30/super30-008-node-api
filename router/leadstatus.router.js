const express = require("express");
const leadDetail = require("../controllers/leads.ctrl");

const router = express.Router();

router.get("/new", leadDetail.getNewLeadCount);
router.get("/cold", leadDetail.getColdLeadCount);
router.get("/warm", leadDetail.getWarmLeadCount);
router.get("/registered", leadDetail.getRegistredLeadCount);

module.exports = router;
