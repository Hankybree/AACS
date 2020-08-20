const jwt = require('jsonwebtoken')

module.exports = {
  verifyUser: (req, res, next) => {
    console.log(req.headers)
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );
      req.decoded = decoded
      next()
    } catch (err) {
      return res.status(401).send({
        msg: 'Your session is not valid!'
      });
    }
  }
};