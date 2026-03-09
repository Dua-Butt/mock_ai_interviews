import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { topic, name, email, subject, details } = await req.json();

    if (!name || !email || !subject || !details) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"AI Mock Interview" <${process.env.GMAIL_USER}>`,
      to: 'duabutt8923@gmail.com',
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0d0b1f; color: #fff; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #7c3aed, #2563eb); padding: 32px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 800;">New Contact Form Submission</h1>
            <p style="margin: 8px 0 0; opacity: 0.8; font-size: 14px;">AI Mock Interview · Help Team</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); font-size: 13px; width: 120px;">Topic</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px;">${topic || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); font-size: 13px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); font-size: 13px;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px;"><a href="mailto:${email}" style="color: #a78bfa;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); font-size: 13px;">Subject</td>
                <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top: 24px;">
              <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin-bottom: 10px;">Message</p>
              <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 16px; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${details}</div>
            </div>
            <div style="margin-top: 24px; padding: 16px; background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.2); border-radius: 10px; font-size: 13px; color: rgba(255,255,255,0.5);">
              💡 Hit Reply to respond directly to <strong style="color: #a78bfa;">${email}</strong>
            </div>
          </div>
          <div style="padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; font-size: 12px; color: rgba(255,255,255,0.2);">
            AI Mock Interview · Contact Form · ${new Date().toLocaleString()}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}