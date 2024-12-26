import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '../../lib/check-rate-limit';

export async function GET(req: NextRequest) {
  const userId = req.headers.get('x-user-id') || 'anonymous';

  const isAllowed = checkRateLimit(userId);

  if (!isAllowed) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429 } // 429 Too Many Requests
    );
  }

  return NextResponse.json({ message: 'Request allowed' });
}
