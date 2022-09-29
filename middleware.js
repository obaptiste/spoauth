import { getToken} from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req) {
    //Token will exist if user is authenticated
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const {pathname} = req.nextUrl.clone()

    //Allow requests if the following is true...

    if(pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    //redirect them to login if they dont have a token and they are requesting an authenticated route
    if(!token && pathname !== "/login") {
        return NextResponse.rewrite(new URL("/login", req.url));
    }
}


export const config = {
    matcher: '/',
  }

