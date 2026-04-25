import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ADMIN_PATH_PREFIX = "/admin";
const ADMIN_API_PATH_PREFIX = "/api/admin";
const ADMIN_REALM = 'Basic realm="CalculatorMap Admin", charset="UTF-8"';

function isAdminRoute(pathname: string) {
  return (
    pathname === ADMIN_PATH_PREFIX ||
    pathname.startsWith(`${ADMIN_PATH_PREFIX}/`) ||
    pathname === ADMIN_API_PATH_PREFIX ||
    pathname.startsWith(`${ADMIN_API_PATH_PREFIX}/`)
  );
}

function unauthorizedResponse() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": ADMIN_REALM,
      "Cache-Control": "private, no-store"
    }
  });
}

function getBasicAuthCredentials(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    return null;
  }

  try {
    const decoded = atob(authorization.slice(6).trim());
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex === -1) {
      return null;
    }

    return {
      username: decoded.slice(0, separatorIndex),
      password: decoded.slice(separatorIndex + 1)
    };
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.hostname === "www.calculatormap.com") {
    const destination = request.nextUrl.clone();
    destination.hostname = "calculatormap.com";
    return NextResponse.redirect(destination, 301);
  }

  if (isAdminRoute(request.nextUrl.pathname)) {
    const expectedUsername = process.env.ADMIN_USERNAME;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedUsername || !expectedPassword) {
      return unauthorizedResponse();
    }

    const credentials = getBasicAuthCredentials(request);

    if (!credentials || credentials.username !== expectedUsername || credentials.password !== expectedPassword) {
      return unauthorizedResponse();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*"
};
