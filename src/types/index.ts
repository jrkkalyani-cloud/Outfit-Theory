export type GarmentCategory = 'hoodies' | 't-shirts' | 'shirts';

export type GarmentFit = 
  | 'Oversized' 
  | 'Regular fit' 
  | 'Zip-up' 
  | 'Pullover' 
  | 'Boxy fit' 
  | 'Long sleeve' 
  | 'Collarless' 
  | 'Collared' 
  | 'Full sleeve' 
  | 'Half sleeve' 
  | 'Mandarin collar';

export interface GarmentColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: GarmentCategory;
  fit: GarmentFit;
  description: string;
  gsm: number;
  fabric: string;
  stockStatus: 'Available for Commission' | 'Limited Batch Allocation' | 'Pre-Order';
  colors: GarmentColor[];
  sizes: string[];
  images: {
    front: string;
    back?: string;
    editorial?: string;
    alt: string;
  };
  customisable: boolean;
  featured?: boolean;
  edition?: string;
}

export type ArtworkPlacement = 
  | 'front-center' 
  | 'back-full' 
  | 'left-chest' 
  | 'right-chest' 
  | 'left-sleeve' 
  | 'right-sleeve';

export type PrintTechnique = 'dtg' | 'puff' | 'embroidery' | 'screen' | 'silicone';

export interface ArtworkFile {
  name: string;
  dataUrl: string;
  size: string;
  type?: string;
}

export interface CustomisationSpec {
  silhouetteId: string;
  silhouetteName: string;
  category: GarmentCategory;
  fit: string;
  fabric: string;
  gsm: number;
  color: GarmentColor;
  size: string;
  quantity: number;
  artworkFiles: ArtworkFile[];
  placements: ArtworkPlacement[];
  technique: PrintTechnique;
  techniqueName: string;
  transform: {
    scale: number;
    rotation: number;
    offsetX: number;
    offsetY: number;
  };
  customInstructions: string;
}

export type OrderType = 'Personal' | 'College' | 'Corporate' | 'Club' | 'Bulk';

export type EnquiryStatus = 
  | 'New enquiry' 
  | 'Contacted' 
  | 'Discussion ongoing' 
  | 'Quote shared' 
  | 'Order confirmed' 
  | 'In production' 
  | 'Dispatched' 
  | 'Completed' 
  | 'Cancelled';

export interface CustomerDetails {
  fullName: string;
  phone: string;
  whatsAppNumber: string;
  email: string;
  orderType: OrderType;
  organizationName?: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  deliveryAddress: string;
}

export interface Enquiry {
  id: string;
  enquiryNumber: string;
  customer: CustomerDetails;
  garment: {
    productId: string;
    productName: string;
    category: GarmentCategory;
    fit: string;
    fabric: string;
    gsm: number;
    color: GarmentColor;
    size: string;
    quantity: number;
    image: string;
  };
  customisation?: CustomisationSpec;
  additionalInstructions?: string;
  status: EnquiryStatus;
  statusHistory: {
    status: EnquiryStatus;
    timestamp: string;
    note?: string;
  }[];
  internalNotes?: string;
  whatsAppNotificationStatus: 'sent' | 'delivered' | 'pending' | 'failed' | 'logged_unconfigured';
  createdAt: string;
  updatedAt: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  courierInstructions?: string;
}

export interface BulkEnquiry {
  id: string;
  enquiryNumber: string;
  fullName: string;
  organization: string;
  role: string;
  email: string;
  phone: string;
  whatsAppNumber?: string;
  category: GarmentCategory | 'multiple';
  estimatedQuantity: number;
  targetDate?: string;
  clothingRequirements: string;
  referenceDesigns?: string[];
  additionalInstructions?: string;
  orderType: OrderType;
  status: EnquiryStatus;
  internalNotes?: string;
  createdAt: string;
}

export interface WhatsAppNotificationLog {
  id: string;
  enquiryId?: string;
  recipientPhone: string;
  recipientName: string;
  eventType: 'NEW_ENQUIRY_RECEIVED' | 'BULK_ENQUIRY_RECEIVED' | 'STATUS_UPDATE' | 'MANUAL_ALERT';
  templateName: string;
  payloadSummary: string;
  status: 'sent' | 'delivered' | 'pending' | 'failed' | 'logged_unconfigured';
  httpStatus?: number;
  timestamp: string;
}
