import { NextResponse, type MiddlewareConfig } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import {
  PublicRoute,
  publicRoutes,
  REDIRECT_WHEN_AUTHENTICATED,
  REDIRECT_WHEN_NOT_AUTHENTICATED,
} from "./lib/routes";

interface AuthToken {
  exp?: number;
}

const publicRoutesMap = new Map<string, PublicRoute>(
  publicRoutes.map(route => [route.path, route])
);

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const publicRoute = publicRoutesMap.get(path);

  const token = (await getToken({ req, secret: process.env.AUTH_SECRET as string })) as AuthToken;

  if (!token && publicRoute) { //sem token numa rota publica 
    return NextResponse.next(); //segue fluxo
  }

  if (!token && !publicRoute) { // sem token numa rota privada
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED; //redireciona para login
    return NextResponse.redirect(redirectUrl);
  }

  if (token && publicRoute && publicRoute.authenticated === "redirect") { //com token numa rota publica onde authenticated é redirect
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED; //redireciona para home
    return NextResponse.redirect(redirectUrl);
  }

  if (token && !publicRoute) { //com token numa rota privada
    const currentTime = Math.floor(Date.now() / 1000);
    if (token.exp && token.exp < currentTime) { //exp em segundos for menor q agora

      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED; //redireciona login

      const response = NextResponse.redirect(redirectUrl);
      const isProd = process.env.NODE_ENV === "production";
      const sessionCookie = isProd
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token";
      response.cookies.delete(sessionCookie); //remove cookie
      response.cookies.delete("next-auth.csrf-token"); //remove cookie
      return response;
    }

    return NextResponse.next();
  }
}

export const config: MiddlewareConfig = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
