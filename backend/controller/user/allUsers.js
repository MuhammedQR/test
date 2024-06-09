const userModel = require("../../models/userModel");

async function allUsers(req, res) {
  try {
    console.log("userId all users", req.userId);

    const allData = await userModel.find();
    res.json({
      message: "All Users",
      data: allData,
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = allUsers;
