let express = require("express");
let router = express.Router();
let validateSession = require("../middleware/validate-session");
const log = require("../models/log");
const Log = require("../db").import("../models/log");

//create
router.post("/create", validateSession, (req, res) => {
  const logEntry = {
    description: req.body.description,
    definition: req.body.definition,
    result: req.body.result,
    owner_id: req.user.id,
  };
  log
    .create(logEntry)
    .then((log) => res.status(200).json(log))
    .catch((err) => res.status(500).json({ error: err }));
});

//get entries by user
router.get("/mine", validateSession, (req, res) => {
  let userid = req.user.id;
  Log.findAll({
    where: { owner_id: userid },
  })
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

//get entries by id for individual user
router.get("/:entryId", function (req, res) {
  let entryId = req.params.entryId;
  Log.findAll({
    where: { id: entryId },
  })
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

//update entries
router.put("/update/:entryId", validateSession, function (req, res) {
  const updateLogEntry = {
    description: req.body.description,
    definition: req.body.definition,
    result: req.body.result,
  };
  const query = { where: { id: req.params.entryId, owner_id: req.user.id } };
  Log.update(updateLogEntry, query)
    .then((logs) => res.status(200).json(logs))
    .catch((err) => res.status(500).json({ error: err }));
});

//delete post
router.delete("/delete/:entryId", validateSession, function (req, res) {
  const query = { where: { id: req.params.entryId, owner_id: req.user.id } };

  Log.destroy(query)
    .then(() => res.status(200).json({ message: "Log Entry Removed" }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
