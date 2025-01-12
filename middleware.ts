import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const authCookie = request.cookies.get("auth_session");
    
    // Redirect to login if the auth cookie is not present
    if (!authCookie) {
      console.log("Redirecting to login...");
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

// Configure paths to match
export const config = {
  matcher: [
      '/',
      '/classes/:path*' ,
      '/employees/:path*' ,
      '/notification/:path*' ,
      '/principal-report/:path*' ,
      '/campus/:path*' 
  ],
};
