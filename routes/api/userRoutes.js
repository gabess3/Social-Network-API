const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  createNewUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

// /api/users
router.route("/").get(getAllUsers).post(createNewUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;
