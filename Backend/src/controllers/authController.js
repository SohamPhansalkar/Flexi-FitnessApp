const bcrypt = require('bcryptjs')
const User = require('../models/User')

const sanitizeUser = (user) => ({
  id: user.id,
  email: user._id,
  userName: user.userName
})

const register = async (req, res) => {
  const { userName, email, password } = req.body

  try {
    const normalizedEmail = email.trim().toLowerCase()
    const existing = await User.findById(normalizedEmail)
    if (existing) {
      return res.status(409).json({
        message: 'An account with that email already exists. Please sign in instead.'
      })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      _id: normalizedEmail,
      userName: userName.trim(),
      password: hashedPassword
    })

    return res.status(201).json({
      message: 'Account created successfully',
      user: sanitizeUser(user)
    })
  } catch (error) {
    console.error('Register error:', error)
    return res.status(500).json({ message: 'Could not create account. Please try again later.' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findById(email.trim().toLowerCase())

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    return res.json({
      message: 'Login successful',
      user: sanitizeUser(user)
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ message: 'Could not sign you in. Please try again later.' })
  }
}

module.exports = { register, login }
