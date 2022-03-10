const express = require("express")
const {
  generateList,
  removeListItem,
  saveEntireList,
  updateExistingList,
  fetchUserLists,
  fetchSingleList,
} = require("../../controllers/list")

const router = express.Router()

router.get("/generate", generateList)
router.delete("/remove", removeListItem)
router.post("/save", saveEntireList)
router.put("/update", updateExistingList)
router.get("/user", fetchUserLists)
router.get("/info", fetchSingleList)

module.exports = router
