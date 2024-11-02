const express = require('express');
const User = require('../models/User');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/update', async (req, res) => {
  const { userId, stats } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.stats.push(stats);
    await user.save();

    res.status(200).json({ message: 'Stats updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' + error });
  }
});


router.get('/stat/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    objectId = new mongoose.Types.ObjectId(userId);
    console.log(objectId);
  } catch (error) {
    return res.status(400).json({ message: 'Invalid user ID format' + error });
  }
  console.log(`Received request for userId: ${userId}`);
 
  try {
    const user = await User.findById(userId); 
    if (!user) {
      console.error(`User not found: ${userId}`);
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.stats);
  } catch (error) {
    console.error(`Error fetching stats: ${error.message}`);
    res.status(500).json({ message: 'Server error' + error });
  }
});



module.exports = router;
