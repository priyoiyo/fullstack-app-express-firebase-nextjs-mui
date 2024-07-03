const { admin } = require("../config/firebaseConfig");



const verifyToken = async (req:any, res:any, next:any) => {
    try {
        const idToken = req.headers['authorization'] ? req.headers['authorization'].split('Bearer ')[1] :
        req.cookies.access_token;
    
        if (!idToken) {
            return res.status(403).json({ error: 'No token provided' });
        }
      const decodedToken = await admin.auth().verifyIdToken(idToken); 
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(403).json({ error: 'Unauthorized' });
    }
};

module.exports = verifyToken;
