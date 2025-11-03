import jwt from 'jwt-simple';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;




export function anonymousUserMiddleware(req: any, res: any, next: any) {

    try {

        console.log('Anonymous User Middleware Invoked');
        //search user cookie
        const userCookie = req.cookies.token;
        // console.log('User cookie:', userCookie);
        if (!JWT_SECRET) throw new Error("JWT secret is missing!");


        const userIdJSON = jwt.decode(userCookie, JWT_SECRET); // <= back to JSON
        // console.log("userIdJSON:", userIdJSON)

        const { id } = userIdJSON;
        // console.log("userId:", id)

        if (!id) {
            //if not found, create a new anonymous user id
            res.status(401).json({ error: 'User not logged in' });

            return;
        }

  res.locals.userId = id;

        next();
    } catch (error) {
        console.error("Error in anonymousUserMiddleware:", error);
        res.status(401).json({ error: 'Invalid or missing token' });
    }
}
