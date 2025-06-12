import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedPaths = ["/"];

export function middleware(req: NextRequest) {
	const url = req.nextUrl.clone();
	const token = req.cookies.get("sb-access-token")?.value;

	if (protectedPaths.some((path) => url.pathname.startsWith(path))) {
		if (!token) {
			url.pathname = "/logowanie";
			return NextResponse.redirect(url);
		}
	}

	return NextResponse.next();
}
