import { NextResponse } from 'next/server';
import { getAllContactInquiries, markInquiryAsRead, markInquiryAsReplied, deleteContactInquiry } from '@/lib/db';
import { cookies } from 'next/headers';

// GET - Fetch all inquiries (admin only)
export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const inquiries = getAllContactInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

// PUT - Update inquiry status (mark as read/replied)
export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id, action } = await request.json();
    
    if (action === 'read') {
      markInquiryAsRead(id);
    } else if (action === 'replied') {
      markInquiryAsReplied(id);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
  }
}

// DELETE - Delete an inquiry
export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');
    
    if (!session || session.value !== 'authenticated') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const { id } = await request.json();
    deleteContactInquiry(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}
