const pool = require('../Config/db.js');

const extractToken = (authHeader) => {
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return authHeader;
};

const adminAuth = async (req, res, next) => {
  try {
    const sessionId = extractToken(req.headers['authorization']) || req.cookies?.session_id;
    
    if (!sessionId) {
      return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE session = ? AND session IS NOT NULL',
      [sessionId]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid session' });
    }

    if (rows[0].role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Forbidden: Admin access required' });
    }
    

    req.user = rows[0];
    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = adminAuth;