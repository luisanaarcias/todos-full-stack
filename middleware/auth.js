const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userExtractor = async (request, response, next) => {
	try {
		const token = request.cookies?.accesToken;

		//  si no existe el token enviamos un error de estatus 401 que significa que no esta autorizado
		if (!token) {
			return response.sendStatus(401);
		}

		// validamos si el  token esta firmado por nuestro servidor

		const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		const user = await User.findById(decoded.id);
		request.user = user;
		console.log(user);
		// console.log("decoded", jwt.decode(token));
		console.log(decoded);
	} catch (error) {
		return response.sendStatus(403);
	}

	// independientmente si ocurre  un  error la  aplicacon no e detiene gacias al next
	next();
};

module.exports = {userExtractor};
