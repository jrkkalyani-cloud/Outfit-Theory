import fs from 'fs';
import path from 'path';
import { Product, Enquiry, BulkEnquiry, WhatsAppNotificationLog, EnquiryStatus } from '../types';
import { INITIAL_PRODUCTS, INITIAL_CONTACT_SETTINGS, BusinessContactSettings } from '../data/initialData';
import { sendEnquiryNotificationWhatsApp } from './whatsapp';

interface DatabaseSchema {
  products: Product[];
  enquiries: Enquiry[];
  bulkEnquiries: BulkEnquiry[];
  whatsappLogs: WhatsAppNotificationLog[];
  settings: BusinessContactSettings;
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'atelier_enquiries_store.json');

class AtelierStore {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        return {
          products: parsed.products?.length ? parsed.products : INITIAL_PRODUCTS,
          enquiries: parsed.enquiries?.length ? parsed.enquiries : this.getSeedEnquiries(),
          bulkEnquiries: parsed.bulkEnquiries?.length ? parsed.bulkEnquiries : this.getSeedBulkEnquiries(),
          whatsappLogs: parsed.whatsappLogs?.length ? parsed.whatsappLogs : this.getSeedWhatsAppLogs(),
          settings: parsed.settings ? { ...INITIAL_CONTACT_SETTINGS, ...parsed.settings } : INITIAL_CONTACT_SETTINGS,
        };
      }
    } catch (e) {
      console.error('Error loading store data, resetting to seed:', e);
    }

    const initial: DatabaseSchema = {
      products: INITIAL_PRODUCTS,
      enquiries: this.getSeedEnquiries(),
      bulkEnquiries: this.getSeedBulkEnquiries(),
      whatsappLogs: this.getSeedWhatsAppLogs(),
      settings: INITIAL_CONTACT_SETTINGS,
    };
    this.saveData(initial);
    return initial;
  }

  private saveData(data: DatabaseSchema): void {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error saving store data to file:', e);
    }
  }

  private persist(): void {
    this.saveData(this.data);
  }

  private getSeedEnquiries(): Enquiry[] {
    return [
      {
        id: 'enq-1048',
        enquiryNumber: 'OT-ENQ-1048',
        customer: {
          fullName: 'Arjun Nair',
          email: 'arjun.nair@atelier.design',
          phone: '+91 98450 12890',
          whatsAppNumber: '+91 98450 12890',
          orderType: 'Personal',
          country: 'India',
          state: 'Karnataka',
          city: 'Bengaluru',
          pincode: '560001',
          deliveryAddress: 'Penthouse 4B, Lavelle Road, Richmond Town, Opp UB City',
        },
        garment: {
          productId: 'prod-hd-02',
          productName: 'Bespoke Monolith Drop-Shoulder Hoodie',
          category: 'hoodies',
          fit: 'Oversized',
          fabric: '450 GSM Zero-Twist Indian Cotton Terry',
          gsm: 450,
          color: { name: 'Obsidian Black', hex: '#131313' },
          size: 'M',
          quantity: 2,
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe9SZLiHVMDLK1SxWBjoTUliGE2mxibXFFb98pQz3r0DIxppGgM6-K3D8G2y0vJJDmb0gsTMRI1SxOLNE7v0pYkqxn0yKalhuoFZCfEWygnswO5UPrCTK3AXwyiJHPBsjrKF25D6EvehtgJ0Ai3LDoklGG0geeaD3nlJztdlVmi1tBm0WP0mpS5vCB98RoHF7OipcspOOBe5A1KGPjfcNxRpqLSWHOZR6aKH25H3Gq',
        },
        customisation: {
          silhouetteId: 'prod-hd-02',
          silhouetteName: 'Bespoke Monolith Drop-Shoulder Hoodie',
          category: 'hoodies',
          fit: 'Oversized',
          fabric: '450 GSM Zero-Twist Indian Cotton Terry',
          gsm: 450,
          color: { name: 'Obsidian Black', hex: '#131313' },
          size: 'M',
          quantity: 2,
          artworkFiles: [
            {
              name: 'ARCHITECTURAL_SIG_01.PNG',
              dataUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA91viOU3iZnNj7E3Wg43K9n2IABbeyff_xpXlAiYB4-A_U3OlTM20nG4Y8Vn81hMDgyJ6CzusUZiVZREDg4i2dUBxoNpVJNI9QgUPvNC_tLJ7Q7NEdp7cNRl3nMHGsGyQqjdNs2fghFILrYwqx0OkPvTmnFQ_A-IA1OkXlhPf460Gs2Lqd9ta1bECh5Hbhm4dxvKLxNocnpaj0mEM3jxrmFfLAz_Rjrj4KS0tEj8n2',
              size: '4.2 MB',
            },
          ],
          placements: ['front-center', 'left-sleeve'],
          technique: 'dtg',
          techniqueName: 'High-Def DTG + Metallic Thread',
          transform: {
            scale: 68,
            rotation: 0,
            offsetX: 0,
            offsetY: 0,
          },
          customInstructions: 'Distressed cuff edges, silver thread accent on drawcord ends. Delivery required prior to Saturday Milan departure.',
        },
        additionalInstructions: 'Need founder recommendation on tonal embroidery thread shades.',
        status: 'Discussion ongoing',
        statusHistory: [
          { status: 'New enquiry', timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), note: 'Customer registered enquiry on web portal' },
          { status: 'Contacted', timestamp: new Date(Date.now() - 3600000 * 18).toISOString(), note: 'Bharath J sent initial WhatsApp welcome & requested hi-res vector' },
          { status: 'Discussion ongoing', timestamp: new Date(Date.now() - 3600000 * 6).toISOString(), note: 'Reviewed 300 DPI placement proof over WhatsApp call' },
        ],
        internalNotes: 'VIP Architect client. Wants 2 units in Obsidian Black. Fabric swatches shown via video call.',
        whatsAppNotificationStatus: 'logged_unconfigured',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      },
      {
        id: 'enq-1047',
        enquiryNumber: 'OT-ENQ-1047',
        customer: {
          fullName: 'Kavya Rao',
          email: 'kavya.rao@designfirm.in',
          phone: '+91 96110 44211',
          whatsAppNumber: '+91 96110 44211',
          orderType: 'Corporate',
          organizationName: 'Studio Matrix Architects',
          country: 'India',
          state: 'Karnataka',
          city: 'Bengaluru',
          pincode: '560066',
          deliveryAddress: 'Villa 12, Palm Meadows, Whitefield',
        },
        garment: {
          productId: 'prod-sh-01',
          productName: 'Architectural Collarless Superfine Cotton Shirt',
          category: 'shirts',
          fit: 'Collarless',
          fabric: '100% Superfine 60s Count Combed Twill',
          gsm: 190,
          color: { name: 'Off-White Ivory', hex: '#ECEBE7' },
          size: '40 (M)',
          quantity: 12,
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALN83-hP_diOp79f3NcKYb_7yHaX-00Zp7nzvdTHhuKaPACnlfO7rEKlc8OCz877sThJzXi-KfBdTDexIi_e0se8hGobMVyJtE045cyUC8DkHMvp6PFtVURAeUm4KqBCCeo_FGDmY0y0e3ibkBYDWOi_s44jHG-2rxhHqq4u4UGIApr7b6NRF584X_lG4Kw0QkirBRaDgRMCae376O7YEqCij5B03ERInLvaBDKY7P',
        },
        additionalInstructions: 'Minimal tone-on-tone firm emblem on left cuff. Formal studio wear for partner summit.',
        status: 'Quote shared',
        statusHistory: [
          { status: 'New enquiry', timestamp: new Date(Date.now() - 86400000 * 2).toISOString() },
          { status: 'Contacted', timestamp: new Date(Date.now() - 86400000 * 1.8).toISOString() },
          { status: 'Discussion ongoing', timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString() },
          { status: 'Quote shared', timestamp: new Date(Date.now() - 86400000 * 1).toISOString(), note: 'Bespoke corporate tier quote shared on WhatsApp with GST breakdown' },
        ],
        internalNotes: 'Awaiting purchase order from accounts department. Sample shirt approved.',
        whatsAppNotificationStatus: 'logged_unconfigured',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
    ];
  }

  private getSeedBulkEnquiries(): BulkEnquiry[] {
    return [
      {
        id: 'bulk-408',
        enquiryNumber: 'OT-B2B-408',
        fullName: 'Dr. Vikram Raman',
        organization: 'RVCE Cultural Forum',
        role: 'Dean of Student Affairs',
        email: 'cultural@rvce.edu.in',
        phone: '+91 94480 33910',
        whatsAppNumber: '+91 94480 33910',
        category: 'hoodies',
        estimatedQuantity: 1200,
        orderType: 'College',
        targetDate: '2026-11-20',
        clothingRequirements: '1,200 Heavyweight French Terry Hoodies (450 GSM) with 3D puff embroidery emblem on chest and annual fest sponsor lockups on back.',
        additionalInstructions: 'Need physical prototype swatch approved by committee within 7 days.',
        status: 'Discussion ongoing',
        internalNotes: 'Sent physical sample box via courier. Video call scheduled for Tuesday.',
        createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      },
      {
        id: 'bulk-407',
        enquiryNumber: 'OT-B2B-407',
        fullName: 'Priya Sundaram',
        organization: 'Bengaluru AI Summit',
        role: 'Head of Brand & Experience',
        email: 'priya@bengaluru-ai.org',
        phone: '+91 98451 77200',
        whatsAppNumber: '+91 98451 77200',
        category: 't-shirts',
        estimatedQuantity: 650,
        orderType: 'Corporate',
        targetDate: '2026-11-15',
        clothingRequirements: '280 GSM Boxy Drop-Shoulder Tees in Obsidian Black with high-definition silver coordinates print on sleeve.',
        status: 'Order confirmed',
        internalNotes: 'Order confirmed. Knitting scheduled at Tirupur loom.',
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
    ];
  }

  private getSeedWhatsAppLogs(): WhatsAppNotificationLog[] {
    return [
      {
        id: 'wa-log-1',
        enquiryId: 'enq-1048',
        recipientPhone: '+91 9611623514',
        recipientName: 'Bharath J (Owner)',
        eventType: 'NEW_ENQUIRY_RECEIVED',
        templateName: 'outfit_theory_enquiry_v1',
        payloadSummary: 'Enquiry OT-ENQ-1048 • Arjun Nair • Bespoke Monolith Hoodie (2 pcs)',
        status: 'logged_unconfigured',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
      {
        id: 'wa-log-2',
        enquiryId: 'bulk-408',
        recipientPhone: '+91 9611623514',
        recipientName: 'Bharath J (Owner)',
        eventType: 'BULK_ENQUIRY_RECEIVED',
        templateName: 'atelier_bulk_concierge',
        payloadSummary: 'B2B RFQ: RVCE Cultural Forum • 1200 PCS (hoodies)',
        status: 'logged_unconfigured',
        timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
      },
    ];
  }

  // --- Product Methods ---
  public getProducts(category?: string): Product[] {
    if (!category || category === 'all') {
      return this.data.products;
    }
    return this.data.products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  public getProductById(id: string): Product | undefined {
    return this.data.products.find(p => p.id === id || p.slug === id);
  }

  public addProduct(product: Omit<Product, 'id'>): Product {
    const id = `prod-${Date.now().toString(36)}`;
    const newProduct: Product = { ...product, id };
    this.data.products.unshift(newProduct);
    this.persist();
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.data.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.data.products[index] = { ...this.data.products[index], ...updates };
    this.persist();
    return this.data.products[index];
  }

  public deleteProduct(id: string): boolean {
    const prevLen = this.data.products.length;
    this.data.products = this.data.products.filter(p => p.id !== id);
    const deleted = this.data.products.length < prevLen;
    if (deleted) this.persist();
    return deleted;
  }

  // --- Enquiries Methods ---
  public getEnquiries(query?: { search?: string; status?: string; phone?: string }): Enquiry[] {
    let result = [...this.data.enquiries];
    if (query?.status && query.status !== 'all') {
      result = result.filter(e => e.status.toLowerCase() === query.status!.toLowerCase());
    }
    if (query?.phone) {
      const clean = query.phone.replace(/\D/g, '');
      result = result.filter(e => 
        (e.customer.phone && e.customer.phone.replace(/\D/g, '').includes(clean)) ||
        (e.customer.whatsAppNumber && e.customer.whatsAppNumber.replace(/\D/g, '').includes(clean))
      );
    }
    if (query?.search) {
      const s = query.search.toLowerCase();
      result = result.filter(e => 
        e.enquiryNumber.toLowerCase().includes(s) ||
        e.customer.fullName.toLowerCase().includes(s) ||
        e.customer.email.toLowerCase().includes(s) ||
        (e.customer.organizationName && e.customer.organizationName.toLowerCase().includes(s)) ||
        e.garment.productName.toLowerCase().includes(s)
      );
    }
    return result;
  }

  public getEnquiryById(idOrNumber: string): Enquiry | undefined {
    const clean = idOrNumber.trim().toLowerCase();
    return this.data.enquiries.find(e => 
      e.id.toLowerCase() === clean || 
      e.enquiryNumber.toLowerCase() === clean ||
      e.enquiryNumber.toLowerCase().replace(/[^0-9]/g, '') === clean.replace(/[^0-9]/g, '')
    );
  }

  public async createEnquiry(enquiryInput: {
    customer: Enquiry['customer'];
    garment: Enquiry['garment'];
    customisation?: Enquiry['customisation'];
    additionalInstructions?: string;
  }): Promise<{ enquiry: Enquiry; whatsappResult: any }> {
    const count = this.data.enquiries.length + 1049;
    const enquiryNumber = `OT-ENQ-${count}`;
    const id = `enq-${Date.now()}`;

    const newEnquiry: Enquiry = {
      id,
      enquiryNumber,
      customer: enquiryInput.customer,
      garment: enquiryInput.garment,
      customisation: enquiryInput.customisation,
      additionalInstructions: enquiryInput.additionalInstructions,
      status: 'New enquiry',
      statusHistory: [
        {
          status: 'New enquiry',
          timestamp: new Date().toISOString(),
          note: `Customer submitted bespoke request for ${enquiryInput.garment.productName} (${enquiryInput.garment.quantity} units)`,
        },
      ],
      internalNotes: '',
      whatsAppNotificationStatus: 'logged_unconfigured',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.data.enquiries.unshift(newEnquiry);
    this.persist();

    // Trigger WhatsApp notification attempt or concierge link preparation
    const whatsappResult = await sendEnquiryNotificationWhatsApp(newEnquiry, this.data.settings.ownerPhone);
    newEnquiry.whatsAppNotificationStatus = whatsappResult.status;

    const log: WhatsAppNotificationLog = {
      id: `wa-${Date.now()}`,
      enquiryId: newEnquiry.id,
      recipientPhone: this.data.settings.ownerPhone,
      recipientName: `${this.data.settings.ownerName} (Owner)`,
      eventType: 'NEW_ENQUIRY_RECEIVED',
      templateName: 'outfit_theory_enquiry_v1',
      payloadSummary: whatsappResult.payloadSummary,
      status: whatsappResult.status,
      httpStatus: whatsappResult.httpStatus,
      timestamp: new Date().toISOString(),
    };
    this.data.whatsappLogs.unshift(log);
    this.persist();

    return { enquiry: newEnquiry, whatsappResult };
  }

  public updateEnquiryStatus(id: string, status: EnquiryStatus, note?: string): Enquiry | null {
    const enquiry = this.getEnquiryById(id);
    if (!enquiry) return null;
    enquiry.status = status;
    enquiry.updatedAt = new Date().toISOString();
    enquiry.statusHistory.push({
      status,
      timestamp: new Date().toISOString(),
      note: note || `Status updated to ${status}`,
    });
    this.persist();
    return enquiry;
  }

  public addEnquiryInternalNote(id: string, note: string): Enquiry | null {
    const enquiry = this.getEnquiryById(id);
    if (!enquiry) return null;
    enquiry.internalNotes = note;
    enquiry.updatedAt = new Date().toISOString();
    this.persist();
    return enquiry;
  }

  // --- Bulk Enquiries ---
  public getBulkEnquiries(): BulkEnquiry[] {
    return this.data.bulkEnquiries;
  }

  public async createBulkEnquiry(enquiryInput: Omit<BulkEnquiry, 'id' | 'enquiryNumber' | 'createdAt' | 'status'>): Promise<BulkEnquiry> {
    const count = this.data.bulkEnquiries.length + 409;
    const enquiryNumber = `OT-B2B-${count}`;
    const id = `bulk-${Date.now()}`;

    const newEnquiry: BulkEnquiry = {
      ...enquiryInput,
      id,
      enquiryNumber,
      status: 'New enquiry',
      createdAt: new Date().toISOString(),
    };

    this.data.bulkEnquiries.unshift(newEnquiry);
    this.persist();

    const log: WhatsAppNotificationLog = {
      id: `wa-${Date.now()}`,
      enquiryId: id,
      recipientPhone: this.data.settings.ownerPhone,
      recipientName: `${this.data.settings.ownerName} (Owner)`,
      eventType: 'BULK_ENQUIRY_RECEIVED',
      templateName: 'atelier_bulk_concierge',
      payloadSummary: `B2B RFQ: ${newEnquiry.organization} • ${newEnquiry.estimatedQuantity} units (${newEnquiry.category})`,
      status: 'logged_unconfigured',
      timestamp: new Date().toISOString(),
    };
    this.data.whatsappLogs.unshift(log);
    this.persist();

    return newEnquiry;
  }

  public updateBulkEnquiryStatus(id: string, status: EnquiryStatus): BulkEnquiry | null {
    const item = this.data.bulkEnquiries.find(b => b.id === id || b.enquiryNumber === id);
    if (!item) return null;
    item.status = status;
    this.persist();
    return item;
  }

  // --- WhatsApp Logs ---
  public getWhatsAppLogs(): WhatsAppNotificationLog[] {
    return this.data.whatsappLogs;
  }

  public addWhatsAppLog(log: Omit<WhatsAppNotificationLog, 'id' | 'timestamp'>): WhatsAppNotificationLog {
    const newLog: WhatsAppNotificationLog = {
      ...log,
      id: `wa-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    this.data.whatsappLogs.unshift(newLog);
    this.persist();
    return newLog;
  }

  // --- Settings ---
  public getSettings(): BusinessContactSettings {
    return this.data.settings;
  }

  public updateSettings(updates: Partial<BusinessContactSettings>): BusinessContactSettings {
    this.data.settings = { ...this.data.settings, ...updates };
    this.persist();
    return this.data.settings;
  }
}

export const atelierStore = new AtelierStore();
