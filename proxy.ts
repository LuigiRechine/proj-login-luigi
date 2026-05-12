import { NextRequest, NextResponse } from "next/server"
import { request } from "http"

export function proxy(request: NextRequest){
    const logged = request.cookies.get('logged')?.value;

    if(!logged && request.nextUrl.pathname.startsWith('/dashboard')){
        return NextResponse.redirect(new URL('/', request.url));
    }

    if(logged && request.nextUrl.pathname === '/'){
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/'],
};