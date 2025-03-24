const logoutRouter = require("express").Router();

logoutRouter.get("/", async (request, response) => {
	const cookies = request.cookies;
	console.log(cookies);
	// si la cookies no existe devolvemos un  error
	// if (!cookies?.accessToken) {
	// 	return response.sendStatus(401);
	// }

	// // // limpiamos a cookie
	// response.clearCookie("accessToken", {
	// 	secure: process.env.NODE_ENV === "production",
	// 	httpOnly: true,
	// });

	return response.sendStatus(204);
});

module.exports = logoutRouter;
