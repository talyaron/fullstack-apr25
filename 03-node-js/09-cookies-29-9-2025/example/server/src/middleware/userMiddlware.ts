export function anonymousUserMiddleware(req: any, res: any, next: any) {

    console.log('Anonymous User Middleware Invoked');
    //search user cookie
    const userCookie = req.cookies.user;
    const counter = Number(req.cookies.counter) + 1 || 1;

    console.log('User cookie:', userCookie);
    console.log('Counter cookie:', counter);

    if (!userCookie) {
        //if not found, create a new anonymous user id
        const anonymousUserId = crypto.randomUUID();
        console.log('Generated anonymous user ID:', anonymousUserId);
        //set the cookie in the response
        res.cookie('user', anonymousUserId, { httpOnly: true }); //1 week

        console.log('Set new anonymous user cookie:', anonymousUserId);
        req.userId = anonymousUserId;
    } else {
        req.userId = userCookie;

    }

    res.cookie('counter', counter, { httpOnly: true });
    console.log('Existing user, incremented counter to:', counter);

    next();
}