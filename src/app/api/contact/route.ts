import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Never expose API keys in frontend. Keep all API logic server-side.
const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting (Note: This resets on server restart/deployment)
const ipCache = new Map<string, number>();
const RATE_LIMIT_MS = 60000; // 1 minute

export async function POST(req: Request) {
  // Validate request method
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    // Basic rate limiting based on IP
    const ip = req.headers.get('x-forwarded-for') || 'anonymous';
    const lastRequest = ipCache.get(ip);
    const now = Date.now();

    if (lastRequest && now - lastRequest < RATE_LIMIT_MS) {
      return NextResponse.json({ error: 'Too many requests. Please try again in a minute.' }, { status: 429 });
    }
    ipCache.set(ip, now);

    const { name, email, message, honeypot } = await req.json();

    // Basic Honeypot Check
    if (honeypot) {
      console.warn('Honeypot triggered by IP:', ip);
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    // Server-side Validation & Sanitization
    const cleanName = name?.toString().trim().slice(0, 100);
    const cleanEmail = email?.toString().trim().toLowerCase();
    const cleanMessage = message?.toString().trim().slice(0, 5000);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Basic Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Send email using Resend
    // TODO: Add your Resend API key to .env.local
    // TODO: Ensure your email is verified in Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'hello@wasifqamar.com',
      subject: 'New message from portfolio',
      text: `
        Name: ${cleanName}
        Email: ${cleanEmail}
        Message:
        ${cleanMessage}
      `,
      replyTo: cleanEmail,
    });

    if (error) {
      // Do not expose internal Resend errors to users
      console.error('Resend error in production:', error);
      return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    // Log error safely in console (development context recommended)
    console.error('API Server error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
