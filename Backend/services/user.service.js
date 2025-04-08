const { db, auth } = require('../config/firebase');

const userService = {
  async createUser(userData) {
    try {
      const userRecord = await auth.createUser({
        email: userData.email,
        password: userData.password,
        displayName: userData.username
      });

      await db.collection('users').doc(userRecord.uid).set({
        username: userData.username,
        email: userData.email,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return userRecord;
    } catch (error) {
      throw error;
    }
  },

  async getUserByEmail(email) {
    try {
      const userRecord = await auth.getUserByEmail(email);
      const userDoc = await db.collection('users').doc(userRecord.uid).get();
      
      return {
        id: userRecord.uid,
        ...userDoc.data()
      };
    } catch (error) {
      throw error;
    }
  },

  async getUserById(userId) {
    try {
      const userDoc = await db.collection('users').doc(userId).get();
      return userDoc.data();
    } catch (error) {
      throw error;
    }
  }
};

module.exports = userService;