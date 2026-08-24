import { Resend } from 'resend';

// Only initialize if the key is available, preventing crash on build/client if omitted
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://the-essumans.vercel.app'; // Fallback to a production-like URL for the button

export async function sendAdminNotification(subject: string, htmlContent: string) {
  if (!resend) {
    console.warn('RESEND_API_KEY is not configured. Skipping email notification.');
    return;
  }
  
  if (!adminEmail) {
    console.warn('ADMIN_NOTIFICATION_EMAIL is not configured. Skipping email notification.');
    return;
  }

  try {
    const { data, error } = await resend.emails.send({
      // The "from" address must be a domain configured and verified in Resend.
      // Usually, Resend provides 'onboarding@resend.dev' for testing, but it only sends to the verified email.
      // To send to arbitrary admin emails in production, a custom domain must be verified.
      from: 'The Essumans <onboarding@resend.dev>',
      to: adminEmail,
      subject: subject,
      html: htmlContent,
    });

    if (error) {
      console.error('Resend API Error:', error);
    }
  } catch (error) {
    console.error('Failed to send admin notification email:', error);
  }
}

export function buildWishEmailHtml(name: string, relationship: string | null, message: string, date: Date) {
  const adminUrl = `${siteUrl}/admin/wishes`;
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1E1E1E;">
      <h2 style="color: #5C202C; margin-bottom: 8px;">New Guest Wish</h2>
      <p style="color: #6B6560; font-size: 14px; margin-bottom: 24px;">A new wish has been submitted and is awaiting your review.</p>
      
      <div style="background-color: #FBF7F1; padding: 16px; border-left: 4px solid #B89558; margin-bottom: 24px;">
        <p style="margin: 0 0 8px 0;"><strong>Guest Name:</strong> ${name}</p>
        ${relationship ? `<p style="margin: 0 0 8px 0;"><strong>Relationship:</strong> ${relationship}</p>` : ''}
        <p style="margin: 0 0 8px 0;"><strong>Submitted:</strong> ${date.toLocaleString()}</p>
        <p style="margin: 16px 0 0 0; font-style: italic;">"${message}"</p>
      </div>
      
      <a href="${adminUrl}" style="display: inline-block; background-color: #1E1E1E; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: 500; font-size: 14px;">
        Review in Admin Dashboard
      </a>
    </div>
  `;
}

export function buildMemoryEmailHtml(name: string, relationship: string | null, memory: string, hasPhoto: boolean, date: Date) {
  const adminUrl = `${siteUrl}/admin/memories`;
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1E1E1E;">
      <h2 style="color: #5C202C; margin-bottom: 8px;">New Guest Memory</h2>
      <p style="color: #6B6560; font-size: 14px; margin-bottom: 24px;">A new memory has been submitted and is awaiting your review.</p>
      
      <div style="background-color: #FBF7F1; padding: 16px; border-left: 4px solid #B89558; margin-bottom: 24px;">
        <p style="margin: 0 0 8px 0;"><strong>Guest Name:</strong> ${name}</p>
        ${relationship ? `<p style="margin: 0 0 8px 0;"><strong>Relationship:</strong> ${relationship}</p>` : ''}
        <p style="margin: 0 0 8px 0;"><strong>Included Photo:</strong> ${hasPhoto ? 'Yes' : 'No'}</p>
        <p style="margin: 0 0 8px 0;"><strong>Submitted:</strong> ${date.toLocaleString()}</p>
        <p style="margin: 16px 0 0 0; font-style: italic;">"${memory}"</p>
      </div>
      
      <a href="${adminUrl}" style="display: inline-block; background-color: #1E1E1E; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: 500; font-size: 14px;">
        Review in Admin Dashboard
      </a>
    </div>
  `;
}
