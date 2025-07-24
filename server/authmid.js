//Authentification MiddleWare
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

module.exports = async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/^Bearer (.+)$/);
  if (!match) return res.status(401).end();

  try {
    const decoded = await admin.auth().verifyIdToken(match[1]);
    req.uid = decoded.uid;          // Google–provided UID
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
