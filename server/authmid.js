//Authentification MiddleWare
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
console.log

module.exports = async function authenticate(req, res, next) {
  // 1) Grab the header
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }

  // 2) Extract just the token string
  const idToken = authHeader.split(' ')[1];  
  if (!idToken) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // 3) Verify it
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.uid = decoded.uid;
    return next();
  } catch (err) {
    console.error('Firebase verifyIdToken error:', err);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
