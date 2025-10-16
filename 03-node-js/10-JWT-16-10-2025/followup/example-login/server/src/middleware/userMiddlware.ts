export function anonymousUserMiddleware(req: any, res: any, next: any) {

    console.log('Anonymous User Middleware Invoked');
    //search user cookie
    const userCookie = req.cookies.userId;

    console.log('User cookie:', userCookie);

    if (!userCookie) {
        //if not found, create a new anonymous user id
        res.status(401).json({ error: 'User not logged in' });

        return;
    }

    req.userId = userCookie;
    
    next();
}