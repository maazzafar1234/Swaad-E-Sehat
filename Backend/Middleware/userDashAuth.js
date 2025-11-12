const pool = require('../Config/db.js');

const extractToken = (authHeader) => {
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return authHeader;
};


const UserDashAuth = async (req, res, next) => {
    try {
        const sessionId = extractToken(req.headers['authorization']) || req.cookies?.session_id;
        console.log("Session ID:", sessionId);
        if (!sessionId) {
            return res.status(401).json({ error: 'Session ID required' });
        }

        const [rows] = await pool.execute(
            'SELECT * FROM users WHERE session = ? AND session IS NOT NULL',
            [sessionId]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid or expired session' });
        }

        req.user = rows[0];
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

// Export directly, not as object
module.exports = UserDashAuth;