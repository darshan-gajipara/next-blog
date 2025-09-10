import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { GenerateSecretKey } from "./lib/GenerateSecretKey";

const AuthMiddleware = async (req: NextRequest) => {

  const ignoredPaths = ["/api/login", "/api/register"];
  if (ignoredPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const authToken = req.headers.get("authorization") || req.headers.get("Authorization");
  console.log(authToken);

  const JWT = authToken?.startsWith("Bearer")
    ? authToken.split(" ")[1]
    : authToken;

  if (!JWT) {
    return NextResponse.json({message :" Unauthorized, token missing"},{status:401});
  }

  try {
    const payload  = await jwtVerify(JWT, GenerateSecretKey());
    console.log("payload : ", payload.payload);
    if (!payload) {
      return NextResponse.json({message :" Unauthorized, invalid token"},{status:401});
    }
    // Attach payload via request header
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("User", JSON.stringify(payload.payload));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (error: unknown) {
    return NextResponse.json({error},{status:500});
  }
  // return NextResponse.json(payload);
  
};

// export const config = {
//   matcher: ["/((?!api/signup|api/signin).*)"],
// };

export const config = {
  matcher: ["/api/:path*"], // ✅ Apply only to /api routes
};

export default AuthMiddleware;
