import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

const getSessionSecret = () => {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not set in environment variables");
  }
  return new TextEncoder().encode(secret);
};

const SESSION_COOKIE_NAME = "essuman_admin_session";
const SESSION_DURATION_DAYS = 7;

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export async function createSession(adminId: string) {
  const secret = getSessionSecret();
  const expires = new Date(Date.now() + SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000);
  
  const token = await new SignJWT({ adminId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_DAYS}d`)
    .sign(secret);
    
  const cookieStore = await cookies();
  
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  if (!sessionToken) return null;
  
  try {
    const { payload } = await jwtVerify(sessionToken, getSessionSecret());
    return payload as { adminId: string };
  } catch (error) {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}
