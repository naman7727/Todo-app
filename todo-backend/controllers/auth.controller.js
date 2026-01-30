const User = require("../models/User");

exports.registerUser = async (req, res) => {
  const { uid, email } = req.user;

  let user = await User.findOne({ firebaseUid: uid });

  if (!user) {
    user = await User.create({
      email,
      firebaseUid: uid,
    });
  }

  res.json(user);
};
