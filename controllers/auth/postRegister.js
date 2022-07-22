const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const userExists = await User.exists({ email });
    if (userExists) {
      return res.status(409).send("Email already in use");
    }

    // Encrypt Password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create User document & save in database.
    const user = await User.create({
      email: email.toLowerCase(),
      username: username,
      password: encryptedPassword,
    });

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.AUTH_TOKEN,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      userDetails: {
        username: user.username,
        email: user.email,
        token: token,
        _id: user._id,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error Occured. Please try again");
  }
};

module.exports = postRegister;
