const userService = require('../services/user.service');

exports.signup = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.status(201).json({
      message: 'User created successfully',
      userId: user.uid
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    
    // In a real application, you would use Firebase Authentication to verify the password
    // For now, we'll just return the user data
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({
      message: 'Invalid credentials'
    });
  }
};

