import { NextResponse } from 'next/server';
import { Slugs } from '@/constants/slugs';
import { auth as middleware } from '@/server/providers/auth';

// @ts-ignore
export default middleware(req => {
	if (!req.auth && req.nextUrl.pathname.startsWith(Slugs.MY_ACCOUNT)) {
		return NextResponse.redirect(new URL(Slugs.LOGIN, req.url));
	}

	if (req.auth && req.nextUrl.pathname.startsWith(Slugs.LOGIN)) {
		return NextResponse.redirect(new URL(Slugs.BASE, req.url));
	}
	if (req.auth && req.nextUrl.pathname.startsWith(Slugs.SIGN_UP)) {
		return NextResponse.redirect(new URL(Slugs.BASE, req.url));
	}
});
