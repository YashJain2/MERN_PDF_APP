  // JWT Token Validation Middleware
  require("dotenv").config();
  const { TOKEN_KEY } = process.env;
  
  module.exports.validateToken = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ message: 'Authorization token not provided' });
    }
  
    try {
      console.log(token);
      console.log(TOKEN_KEY);
      const decoded = jwt.verify(token, TOKEN_KEY); 
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid authorization token' });
    }
  };