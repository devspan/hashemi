import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { kindeAuth: string } }) {
  const endpoint = params.kindeAuth;

  // Wrap the handleAuth result in a response
  try {
    const result = await handleAuth(request, endpoint);
    // Assuming handleAuth returns a valid Response or its content
    return NextResponse.json(result);
  } catch (error) {
    // Handle error and return an appropriate response
    return NextResponse.error();
  }
}
