const getUserFromToken = require("../getUserFromToken");

module.exports = function setCurrentUser(req: { header: (arg0: string) => any; user: any; }, res: any, next: () => void) {
  // grab authentication token from req header
  const token = req.header("authorization");

  // look up the user based on the token
  const user = getUserFromToken(token).then((user: any) => {
    // append the user object the the request object
    req.user = user;

    // call next middleware in the stack
    next();
  });
};