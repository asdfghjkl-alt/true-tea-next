import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { apiHandler } from "@/lib/api-handler";

export const GET = apiHandler(async () => {
  const session = await getSession();
  return NextResponse.json({
    user: session?.userData || null,
  });
});
