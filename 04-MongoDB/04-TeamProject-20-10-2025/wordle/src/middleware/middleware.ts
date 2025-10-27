const jwt = require('jwt-simple');
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    console.error("JWT secret is missing!");
    process.exit(1); // Exit the application if JWT secret is not configured
}


export function anonymousUserMiddleware(req: any, res: any, next: any) {

    try {

        console.log('Anonymous User Middleware Invoked');
        //search user cookie
        const userCookie = req.cookies.userId;
        console.log('User cookie:', userCookie);

        const userIdJSON = jwt.decode(userCookie, JWT_SECRET); // <= back to JSON
        console.log("userIdJSON:", userIdJSON)

        const { userId } = userIdJSON;
        console.log("userId:", userId)

        if (!userId) {
            //if not found, create a new anonymous user id
            res.status(401).json({ error: 'User not logged in' });

            return;
        }

        req.userId = userId;

        next();
    } catch (error) {
        console.error("Error in anonymousUserMiddleware:", error);
        res.status(401).json({ error: 'Invalid or missing token' });
    }
}
