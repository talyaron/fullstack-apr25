import jwt from "jwt-simple";
import dotenv from 'dotenv'
dotenv.config()
const KEY = process.env.KEY_JWT as string

export function anonymousUserMiddleware(req: any, res: any, next: any) {

    console.log('Anonymous User Middleware Invoked');
    //search user cookie
    const userCookie = req.cookies.userId;
    const {userid} = jwt.decode(userCookie, KEY)

    console.log('User cookie defore encryption:', userCookie);
    console.log('User cookie after decoding:', userid);

    if (!userid) {
        //if not found, create a new anonymous user id
        res.status(401).json({ error: 'User not logged in' });
        return;
    }

    req.userId = userid;

    next();
}
