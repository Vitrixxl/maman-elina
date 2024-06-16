import type { NextApiRequest, NextApiResponse } from "next";
import { generateToken, verifyToken } from "../../../../lib/jwt";
import bcrypt from "bcryptjs";
import prisma from "../../../../lib/prisma";
import { cookies, headers } from "next/headers";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  let body = await req.json();
  if (!body.email || !body.password) {
    return new Response("Email and password required", { status: 400 });
  }
  const admin = await prisma.admin.findUnique({
    where: {
      email: body.email,
    },
  });
  if (!admin) {
    return new Response("Admin not found", { status: 404 });
  }

  const match = await bcrypt.compare(body.password, admin.password);
  if (!match) {
    return new Response("Password incorrect", { status: 401 });
  }
  body.lastRequest = new Date();
  body.created = new Date();
  const token = generateToken(body);
  return new Response("Logged in", {
    status: 200,
    headers: {
      "Set-Cookie": `token=${token}; HttpOnly; Secure; SameSite=Strict`,
    },
  });
};
