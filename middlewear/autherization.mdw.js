const jwt = require("jsonwebtoken");

const autherizationService = {
  autherize: async (req, res, next) => {
    try {
      console.log(req.headers.autherization);
      const tokenInfo = await jwt.verify(
        req.headers.autherization,
        "No one can still my token"
      );
      console.log(tokenInfo);
      next();
    } catch (error) {
      if (error.message.includes("jwt expired")) {
        res.status(401).send({
          error: "Unauthorized",
          errorDescription: "Token expired, please login again",
        });
      } else {
        res.status(500).send({ error });
      }
      console.log(error);
    }
  },
};

module.exports = autherizationService;
