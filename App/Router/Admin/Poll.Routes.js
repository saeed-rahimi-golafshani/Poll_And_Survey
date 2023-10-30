const { PollController } = require("../../Http/Controller/Admin/Poll.Controller");
const router = require("express").Router();

router.post("/create", PollController.createPoll);
router.get("/lists", PollController.listOfPoll);
router.get("/list/:id", PollController.listOfPollById);
router.patch("/update/:id", PollController.updatePoll);

module.exports = {
  AdminApiPollRoutes: router
}