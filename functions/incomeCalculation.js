const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.scheduleIncomeCalculation = functions.https.onCall(async (data, context) => {
  const currentTime = new Date();

  // Query investments made 24 hours ago
  const twentyFourHoursAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);
  const investmentSnapshot = await admin.firestore().collection('Investment')
    .where('date', '<=', twentyFourHoursAgo)
    .get();

  const batch = admin.firestore().batch();
  investmentSnapshot.forEach(doc => {
    const investment = doc.data();
    const income = investment.amount * 0.008; // Calculate income (0.8% of investment amount)
    const userId = investment.userId;

    // Record income in the Income collection
    const incomeRef = admin.firestore().collection('Income').doc();
    batch.set(incomeRef, {
      userId: userId,
      income: income,
      date: currentTime,
    });

    // Update the investment document with the income recorded flag
    batch.update(doc.ref, { incomeRecorded: true });
  });

  await batch.commit();
});
