import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { status: 401, error: 'Unauthorized' } as const;
  }

  if (session.user.role !== 'admin') {
    return { status: 403, error: 'Forbidden' } as const;
  }

  return { session } as const;
}
