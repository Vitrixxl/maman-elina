import type { NextApiRequest, NextApiResponse } from "next";
import { generateToken, verifyToken } from "../../../../lib/jwt";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  let cookie = req.cookies.get("token");
  if (!cookie) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (verifyToken(cookie.value)) {
    return new Response("Authorized", { status: 200 });
  }
  return new Response("Unauthorized", { status: 401 });
};
