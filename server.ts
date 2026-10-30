import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { atelierStore } from './src/server/store';
import { sendEnquiryNotificationWhatsApp } from './src/server/whatsapp';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Body parser with 50mb limit for high-res artwork files and previews
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ----------------- API ROUTES ----------------- //

// 1. Products Catalog (Pure Apparel Specs, No Prices)
app.get('/api/products', (req: Request, res: Response) => {
  const category = req.query.category as string | undefined;
  const products = atelierStore.getProducts(category);
  res.json({ success: true, count: products.length, data: products });
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = atelierStore.getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found in atelier catalog' });
  }
  res.json({ success: true, data: product });
});

app.post('/api/products', (req: Request, res: Response) => {
  const adminSecret = req.headers['x-admin-passcode'];
  if (adminSecret !== (process.env.ADMIN_PASSCODE || 'atelier2025')) {
    return res.status(401).json({ success: false, message: 'Unauthorized atelier administration access' });
  }
  try {
    const newProduct = atelierStore.addProduct(req.body);
    res.status(201).json({ success: true, data: newProduct });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.put('/api/products/:id', (req: Request, res: Response) => {
  const adminSecret = req.headers['x-admin-passcode'];
  if (adminSecret !== (process.env.ADMIN_PASSCODE || 'atelier2025')) {
    return res.status(401).json({ success: false, message: 'Unauthorized atelier administration access' });
  }
  const updated = atelierStore.updateProduct(req.params.id, req.body);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: updated });
});

app.delete('/api/products/:id', (req: Request, res: Response) => {
  const adminSecret = req.headers['x-admin-passcode'];
  if (adminSecret !== (process.env.ADMIN_PASSCODE || 'atelier2025')) {
    return res.status(401).json({ success: false, message: 'Unauthorized atelier administration access' });
  }
  const deleted = atelierStore.deleteProduct(req.params.id);
  res.json({ success: deleted });
});

// 2. Bespoke Enquiries Pipeline (The Core Business Workflow)
app.post('/api/enquiries', async (req: Request, res: Response) => {
  try {
    const { customer, garment, customisation, additionalInstructions } = req.body;

    if (!customer?.fullName || !customer?.phone) {
      return res.status(400).json({ success: false, message: 'Client name and contact phone are required' });
    }
    if (!garment?.productName || !garment?.size) {
      return res.status(400).json({ success: false, message: 'Garment selection and sizing are required' });
    }

    const { enquiry, whatsappResult } = await atelierStore.createEnquiry({
      customer: {
        fullName: customer.fullName.trim(),
        phone: customer.phone.trim(),
        whatsAppNumber: (customer.whatsAppNumber || customer.phone).trim(),
        email: customer.email ? customer.email.trim() : 'concierge-desk@outfittheory.in',
        orderType: customer.orderType || 'Personal',
        organizationName: customer.organizationName,
        country: customer.country || 'India',
        state: customer.state || '',
        city: customer.city || '',
        pincode: customer.pincode || '',
        deliveryAddress: customer.deliveryAddress || 'Delivery destination to be confirmed via WhatsApp consultation',
      },
      garment: {
        productId: garment.productId || 'custom-piece',
        productName: garment.productName,
        category: garment.category || 'hoodies',
        fit: garment.fit || 'Oversized',
        fabric: garment.fabric || '450 GSM French Terry',
        gsm: garment.gsm || 450,
        color: garment.color || { name: 'Obsidian Black', hex: '#131313' },
        size: garment.size,
        quantity: Math.max(1, Number(garment.quantity) || 1),
        image: garment.image || '',
      },
      customisation,
      additionalInstructions,
    });

    res.status(201).json({
      success: true,
      data: enquiry,
      whatsappResult,
    });
  } catch (err: any) {
    console.error('Enquiry registration error:', err);
    res.status(500).json({ success: false, message: err.message || 'Internal server error creating enquiry' });
  }
});

app.get('/api/enquiries', (req: Request, res: Response) => {
  const search = req.query.search as string | undefined;
  const status = req.query.status as string | undefined;
  const phone = req.query.phone as string | undefined;

  const enquiries = atelierStore.getEnquiries({ search, status, phone });
  res.json({ success: true, count: enquiries.length, data: enquiries });
});

app.get('/api/enquiries/:id', (req: Request, res: Response) => {
  const enquiry = atelierStore.getEnquiryById(req.params.id);
  if (!enquiry) {
    return res.status(404).json({ success: false, message: 'Enquiry reference not found' });
  }
  res.json({ success: true, data: enquiry });
});

app.patch('/api/enquiries/:id/status', (req: Request, res: Response) => {
  const adminSecret = req.headers['x-admin-passcode'];
  if (adminSecret !== (process.env.ADMIN_PASSCODE || 'atelier2025')) {
    return res.status(401).json({ success: false, message: 'Unauthorized atelier administration access' });
  }
  const { status, note } = req.body;
  const updated = atelierStore.updateEnquiryStatus(req.params.id, status, note);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Enquiry not found' });
  }
  res.json({ success: true, data: updated });
});

app.patch('/api/enquiries/:id/notes', (req: Request, res: Response) => {
  const adminSecret = req.headers['x-admin-passcode'];
  if (adminSecret !== (process.env.ADMIN_PASSCODE || 'atelier2025')) {
    return res.status(401).json({ success: false, message: 'Unauthorized atelier administration access' });
  }
  const { notes } = req.body;
  const updated = atelierStore.addEnquiryInternalNote(req.params.id, notes);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Enquiry not found' });
  }
  res.json({ success: true, data: updated });
});

// 3. Bulk & Corporate Orders Pipeline
app.post('/api/bulk-enquiry', async (req: Request, res: Response) => {
  try {
    const { fullName, organization, role, email, phone, whatsAppNumber, category, estimatedQuantity, targetDate, clothingRequirements, additionalInstructions, orderType } = req.body;
    if (!fullName || !organization || !phone || !estimatedQuantity) {
      return res.status(400).json({ success: false, message: 'Please provide organization, contact person, phone, and quantity' });
    }

    const enquiry = await atelierStore.createBulkEnquiry({
      fullName,
      organization,
      role: role || 'Lead Coordinator',
      email: email || '',
      phone,
      whatsAppNumber: whatsAppNumber || phone,
      category: category || 'hoodies',
      estimatedQuantity: Number(estimatedQuantity),
      targetDate,
      clothingRequirements: clothingRequirements || 'Custom corporate or club merchandise specification',
      additionalInstructions,
      orderType: orderType || 'Corporate',
      internalNotes: '',
    });

    res.status(201).json({ success: true, data: enquiry });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/bulk-enquiries', (req: Request, res: Response) => {
  const enquiries = atelierStore.getBulkEnquiries();
  res.json({ success: true, count: enquiries.length, data: enquiries });
});

app.patch('/api/bulk-enquiries/:id/status', (req: Request, res: Response) => {
  const adminSecret = req.headers['x-admin-passcode'];
  if (adminSecret !== (process.env.ADMIN_PASSCODE || 'atelier2025')) {
    return res.status(401).json({ success: false, message: 'Unauthorized atelier administration access' });
  }
  const updated = atelierStore.updateBulkEnquiryStatus(req.params.id, req.body.status);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Enquiry not found' });
  }
  res.json({ success: true, data: updated });
});

// 4. WhatsApp Cloud API Telemetry & Direct Chat Helpers
app.get('/api/whatsapp/logs', (req: Request, res: Response) => {
  const logs = atelierStore.getWhatsAppLogs();
  res.json({ success: true, count: logs.length, data: logs });
});

app.post('/api/whatsapp/test-alert', (req: Request, res: Response) => {
  const { note } = req.body;
  const ownerPhone = atelierStore.getSettings().ownerPhone;
  const cleanPhone = ownerPhone.replace(/\D/g, '');
  const messageText = `⚡ *OUTFIT THEORY ATELIER PING* ⚡\n\nDirect Owner Verification Ping for Bharath J (+91 ${cleanPhone}):\n"${note || 'Atelier enquiry desk active.'}"\n\nTimestamp: ${new Date().toLocaleTimeString('en-IN')}`;
  const directWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;

  const log = atelierStore.addWhatsAppLog({
    recipientPhone: `+${cleanPhone}`,
    recipientName: 'Bharath J (Owner)',
    eventType: 'MANUAL_ALERT',
    templateName: 'atelier_owner_ping',
    payloadSummary: `Manual Ping: "${note || 'Atelier desk active'}"`,
    status: 'logged_unconfigured',
  });

  res.json({ success: true, log, directWhatsAppUrl });
});

// 5. Atelier Business Contact Settings
app.get('/api/settings', (req: Request, res: Response) => {
  res.json({ success: true, data: atelierStore.getSettings() });
});

app.put('/api/settings', (req: Request, res: Response) => {
  const adminSecret = req.headers['x-admin-passcode'];
  if (adminSecret !== (process.env.ADMIN_PASSCODE || 'atelier2025')) {
    return res.status(401).json({ success: false, message: 'Unauthorized atelier administration access' });
  }
  const updated = atelierStore.updateSettings(req.body);
  res.json({ success: true, data: updated });
});

// 6. Admin Passcode Verification
app.post('/api/admin/verify', (req: Request, res: Response) => {
  const { passcode } = req.body;
  const valid = passcode === (process.env.ADMIN_PASSCODE || 'atelier2025');
  if (valid) {
    res.json({ success: true, message: 'Atelier master access granted' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid atelier master passcode' });
  }
});

// 7. External Integrations Status (Accurately reflects development mode)
app.get('/api/integrations/status', (_req: Request, res: Response) => {
  const isRazorpayConfigured = !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
  const isCashfreeConfigured = !!(process.env.CASHFREE_APP_ID && process.env.CASHFREE_SECRET_KEY);
  const paymentConfigured = isRazorpayConfigured || isCashfreeConfigured;

  const phoneId = process.env.WHATSAPP_PHONE_ID || process.env.WHATSAPP_PHONE_NUMBER_ID;
  const whatsappConfigured = !!(process.env.WHATSAPP_ACCESS_TOKEN && phoneId);

  res.json({
    success: true,
    data: {
      payment: {
        configured: paymentConfigured,
        provider: 'Bespoke Enquiry Model',
        mode: 'enquiry_only',
        statusText: paymentConfigured ? 'Payment gateway active' : 'Payment gateway not configured',
        description: paymentConfigured 
          ? 'Live payment credentials connected'
          : 'Payment gateway not configured. Outfit Theory operates strictly by bespoke enquiry — no cart checkout, no online payment processing.',
      },
      whatsapp: {
        configured: whatsappConfigured,
        mode: whatsappConfigured ? 'live_cloud_api' : 'concierge_fallback',
        statusText: whatsappConfigured ? 'WhatsApp Cloud API active' : 'WhatsApp integration not configured',
        ownerPhone: process.env.WHATSAPP_OWNER_PHONE || '919611623514',
        description: whatsappConfigured
          ? 'Automated WhatsApp Cloud API delivery active'
          : 'WhatsApp integration not configured. Direct WhatsApp chat links (+91 9611623514) and local telemetry logging active.',
      },
      environment: {
        requiredVars: ['ADMIN_PASSCODE (Optional, defaults to atelier2025)'],
        optionalVars: [
          'WHATSAPP_PHONE_ID',
          'WHATSAPP_ACCESS_TOKEN',
          'WHATSAPP_OWNER_PHONE',
          'RAZORPAY_KEY_ID',
          'RAZORPAY_KEY_SECRET',
          'CASHFREE_APP_ID',
          'CASHFREE_SECRET_KEY',
        ],
      },
    },
  });
});

// ----------------- VITE MIDDLEWARES / STATIC SERVING ----------------- //
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Outfit Theory Atelier server listening on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start Outfit Theory Atelier server:', err);
});
