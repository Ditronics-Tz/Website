import { NextResponse } from 'next/server';
import { getAllSettings, updateSettings } from '@/lib/db';
import { cookies } from 'next/headers';

// GET - Fetch all settings (public)
export async function GET() {
  try {
    const settings = getAllSettings();
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

// PUT - Update settings (admin only)
export async function PUT(request: Request) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const data = await request.json();
    updateSettings(data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
