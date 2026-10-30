import { WhatsAppNotificationLog, Enquiry, BulkEnquiry } from '../types';

export interface WhatsAppSendResult {
  success: boolean;
  status: 'delivered' | 'pending' | 'failed' | 'logged_unconfigured';
  configured: boolean;
  statusText: string;
  messageId?: string;
  httpStatus?: number;
  error?: string;
  directWhatsAppUrl: string;
  customerChatUrl: string;
  payloadSummary: string;
}

export function isWhatsAppConfigured(): boolean {
  const phoneId = process.env.WHATSAPP_PHONE_ID || process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  return !!(phoneId && token);
}

export function getOwnerPhone(): string {
  return process.env.WHATSAPP_OWNER_PHONE || '919611623514';
}

export function formatEnquiryWhatsAppMessage(enquiry: Enquiry, ownerPhone: string): { text: string; summary: string; customerText: string } {
  const g = enquiry.garment;
  let customInfo = 'Standard Bespoke Commission';
  if (enquiry.customisation) {
    const c = enquiry.customisation;
    const placements = c.placements?.length ? c.placements.join(', ') : 'Front';
    customInfo = `\n  • Placements: ${placements}\n  • Print/Finish: ${c.techniqueName || c.technique}\n  • Artwork Files: ${c.artworkFiles?.length || 0} attached\n  • Scale: ${c.transform?.scale || 60}%\n  • Custom Instructions: "${c.customInstructions || 'None'}"`;
  }

  // Message for Founder (Bharath J)
  const text = `🚨 *NEW OUTFIT THEORY ENQUIRY* 🚨\n\n` +
    `*Enquiry Ref:* ${enquiry.enquiryNumber}\n` +
    `*Status:* ${enquiry.status.toUpperCase()}\n` +
    `*Order Type:* ${enquiry.customer.orderType}${enquiry.customer.organizationName ? ` (${enquiry.customer.organizationName})` : ''}\n\n` +
    `👤 *Client Details:*\n` +
    `• Name: ${enquiry.customer.fullName}\n` +
    `• WhatsApp / Phone: ${enquiry.customer.whatsAppNumber || enquiry.customer.phone}\n` +
    `• Email: ${enquiry.customer.email}\n` +
    `• Location: ${enquiry.customer.city}, ${enquiry.customer.state} - ${enquiry.customer.pincode}\n` +
    `• Address: ${enquiry.customer.deliveryAddress}\n\n` +
    `🥋 *Garment Specification:*\n` +
    `• Item: ${g.productName}\n` +
    `• Category: ${g.category.toUpperCase()} // ${g.fit}\n` +
    `• Fabric & Weight: ${g.fabric} (${g.gsm} GSM)\n` +
    `• Colour: ${g.color.name}\n` +
    `• Size: ${g.size}\n` +
    `• Desired Quantity: ${g.quantity} unit(s)\n` +
    `\n🎨 *Customisation Dossier:*${customInfo}\n` +
    (enquiry.additionalInstructions ? `\n📝 *Client Note:*\n"${enquiry.additionalInstructions}"\n` : '') +
    `\nTIMESTAMP: ${new Date(enquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;

  // Pre-filled Message for Customer to send directly to Bharath J (+91 9611623514)
  const customerText = `Hello Bharath, I have submitted an enquiry on Outfit Theory (Ref: ${enquiry.enquiryNumber}).\n\n` +
    `Garment: ${g.productName} (${g.fit}, ${g.color.name}, Size: ${g.size}, Qty: ${g.quantity})\n` +
    `I would like to discuss bespoke pricing, fabric swatches, and timeline.`;

  const summary = `Enquiry ${enquiry.enquiryNumber} • ${enquiry.customer.fullName} • ${g.productName} (${g.quantity} pcs)`;
  return { text, summary, customerText };
}

export function formatBulkEnquiryWhatsAppMessage(enquiry: BulkEnquiry): { text: string; summary: string } {
  const text = `🏛️ *NEW B2B / BULK ENQUIRY — OUTFIT THEORY* 🏛️\n\n` +
    `*Enquiry Ref:* ${enquiry.enquiryNumber}\n` +
    `*Organisation:* ${enquiry.organization} (${enquiry.role})\n` +
    `*Contact Person:* ${enquiry.fullName}\n` +
    `*WhatsApp / Phone:* ${enquiry.whatsAppNumber || enquiry.phone}\n` +
    `*Email:* ${enquiry.email}\n` +
    `*Category:* ${enquiry.category.toUpperCase()}\n` +
    `*Est. Quantity:* ${enquiry.estimatedQuantity} units\n` +
    (enquiry.targetDate ? `*Target Delivery:* ${enquiry.targetDate}\n` : '') +
    `\n*Apparel Requirements & Specs:*\n${enquiry.clothingRequirements}\n` +
    (enquiry.additionalInstructions ? `*Notes:* ${enquiry.additionalInstructions}\n` : '') +
    `\nTIMESTAMP: ${new Date(enquiry.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`;

  const summary = `B2B Enquiry ${enquiry.enquiryNumber} • ${enquiry.organization} • ${enquiry.estimatedQuantity} PCS`;
  return { text, summary };
}

export async function sendEnquiryNotificationWhatsApp(
  enquiry: Enquiry,
  ownerPhone: string
): Promise<WhatsAppSendResult> {
  const phoneToUse = ownerPhone || getOwnerPhone();
  const { text, summary, customerText } = formatEnquiryWhatsAppMessage(enquiry, phoneToUse);
  const cleanOwnerPhone = phoneToUse.replace(/\D/g, '');
  
  // Link for the customer to ping the founder
  const directWhatsAppUrl = `https://wa.me/${cleanOwnerPhone}?text=${encodeURIComponent(customerText)}`;
  
  // Link for the founder (admin) to chat with the customer
  const clientPhone = (enquiry.customer.whatsAppNumber || enquiry.customer.phone).replace(/\D/g, '');
  const founderGreeting = `Hello ${enquiry.customer.fullName}, this is Bharath J from Outfit Theory regarding your bespoke enquiry ${enquiry.enquiryNumber} (${enquiry.garment.productName}).`;
  const customerChatUrl = `https://wa.me/${clientPhone}?text=${encodeURIComponent(founderGreeting)}`;

  const phoneNumberId = process.env.WHATSAPP_PHONE_ID || process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const configured = !!(phoneNumberId && accessToken);

  // If live credentials are provided in environment, attempt real Meta Cloud API dispatch
  if (configured) {
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/${phoneNumberId}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: cleanOwnerPhone,
          type: 'text',
          text: { body: text },
        }),
      });

      const responseData = await response.json();
      if (response.ok) {
        return {
          success: true,
          status: 'delivered',
          configured: true,
          statusText: 'WhatsApp Cloud API active',
          messageId: responseData.messages?.[0]?.id,
          httpStatus: response.status,
          directWhatsAppUrl,
          customerChatUrl,
          payloadSummary: summary,
        };
      } else {
        return {
          success: false,
          status: 'failed',
          configured: true,
          statusText: 'Meta API returned error',
          httpStatus: response.status,
          error: responseData.error?.message || 'Meta API error',
          directWhatsAppUrl,
          customerChatUrl,
          payloadSummary: summary,
        };
      }
    } catch (err: any) {
      return {
        success: false,
        status: 'failed',
        configured: true,
        statusText: 'Network request error',
        error: err.message || 'Network request failed',
        directWhatsAppUrl,
        customerChatUrl,
        payloadSummary: summary,
      };
    }
  }

  // Safe development fallback: Logged and ready with direct 1-click fallback link
  return {
    success: true,
    status: 'logged_unconfigured',
    configured: false,
    statusText: 'WhatsApp integration not configured',
    directWhatsAppUrl,
    customerChatUrl,
    payloadSummary: summary,
  };
}
