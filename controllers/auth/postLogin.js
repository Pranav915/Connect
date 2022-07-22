const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { restart } = require("nodemon");

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      // send new token
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

      return res.status(200).json({
        userDetails: {
          email: user.email,
          token: token,
          username: user.username,
          _id: user._id,
        },
      });
    }

    return res.status(400).send("Invalid Credentials. Please try again");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = postLogin;
