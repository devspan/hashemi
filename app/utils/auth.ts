import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable');
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export function validateToken(req: NextRequest): JwtPayload | null {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error('JWT validation error:', error);
    return null;
  }
}