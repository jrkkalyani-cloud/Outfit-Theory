import React, { useState, useRef } from 'react';
import { Product, ArtworkPlacement, PrintTechnique, CustomisationSpec, GarmentCategory, ArtworkFile } from '../types';
import { useEnquiry } from '../context/EnquiryContext';

interface CustomiserPageProps {
  products: Product[];
  initialProductId?: string;
  onNavigate: (path: string, params?: Record<string, string>) => void;
}

interface SilhouetteOption {
  id: string;
  name: string;
  category: GarmentCategory;
  fit: string;
  gsm: number;
  fabric: string;
  frontImage: string;
  backImage: string;
}

const SILHOUETTES: SilhouetteOption[] = [
  // HOODIES
  {
    id: 'sil-hd-oversized',
    name: 'Oversized Heavyweight Hoodie',
    category: 'hoodies',
    fit: 'Oversized',
    gsm: 450,
    fabric: '450 GSM Zero-Twist French Terry',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9JJky5FacVQY5qVR62ZzArQPfiD8mu8U_OvV-Va76B6hyP2SoZdA-E9NhObukiqx5TA2aDJ2D3ALoIm6nXwj6qeccSKuBenTUZlKs3WTP1-gO5isX914kVAapKQiTT9F1nQj1eMuOPH1NyxFfjIdz-EnOrYPjrXLjdlZPmhRY-bb9btEjkVdNZ-6dbpbohAvKcH-aJGHd52NHuYWaCisZcLQKe5ByfesEYw0nnO6z',
    backImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5aCAGGn1cwMSMDZNxwUMGWJv_kzs88ssKKdMlbEeR0-ppBbvATH95gW4t5XmLKRsbqfJfEKb-EOWuOlORUREBeQ7vWOiisvtuDtGtz4PKra13W4KfB5yO-_VLoe_acTLvxHT1LAt1Tu5BoZBu4g3TIRCQ1HtgPZ3wlmrFLVEdCqsiOzhJx9ufnlPIP-H50rn-HYyDsUfqlrZZsreoEgCN2WC7fMx4dkQJHfY-FiER',
  },
  {
    id: 'sil-hd-regular',
    name: 'Classic Regular-Fit Heavy Hoodie',
    category: 'hoodies',
    fit: 'Regular fit',
    gsm: 380,
    fabric: '380 GSM Brushed Combed Fleece',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_5cpd2TeOWOg4DdlnSiCvu2Fe6QdRffybJJq3XQ5kVencU75uWU8kJULSfhtWYrBrffYt8H1MOz0lUegcH8Hf3C9pGpDjZ1qEfn1KSOLGh9tfEmLXTR-gzXFrztZLionbkMEd7SRtVMNFmfdKQg410QLu0Xkwmg0IriGcXP-s0UccJgkBNCgIoMV0JxmWa75UzhSjBbXEAKKJvzdMP_8vuZ7wVJ7h0YnLxsfFOrnO',
    backImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5aCAGGn1cwMSMDZNxwUMGWJv_kzs88ssKKdMlbEeR0-ppBbvATH95gW4t5XmLKRsbqfJfEKb-EOWuOlORUREBeQ7vWOiisvtuDtGtz4PKra13W4KfB5yO-_VLoe_acTLvxHT1LAt1Tu5BoZBu4g3TIRCQ1HtgPZ3wlmrFLVEdCqsiOzhJx9ufnlPIP-H50rn-HYyDsUfqlrZZsreoEgCN2WC7fMx4dkQJHfY-FiER',
  },
  {
    id: 'sil-hd-zipup',
    name: 'Double-Slider Heavyweight Zip-Up',
    category: 'hoodies',
    fit: 'Zip-up',
    gsm: 420,
    fabric: '420 GSM Double-Faced Terry',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyQs4OmYW4YEAI1mYguBej_brQ8hLOsnLl6LRvLzPfmNl2fdyUd3OX1RtPvxDhGHG6eo6vpvaTTtK-C-_Y_-iukig5LgOXoNfEqsrUe0Ttcmcmh3iHbMLRdG2XpOXtvlMzip3oUHJ4YpF_QkOJouKK7Muj00dFtoX_2rFBpe4jEZ003jzgOcDoWkCfWEjxOrYG2OfVE90kItND9NhTi5m6GYkLRVJvd3lzt-nEU1dU',
    backImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5aCAGGn1cwMSMDZNxwUMGWJv_kzs88ssKKdMlbEeR0-ppBbvATH95gW4t5XmLKRsbqfJfEKb-EOWuOlORUREBeQ7vWOiisvtuDtGtz4PKra13W4KfB5yO-_VLoe_acTLvxHT1LAt1Tu5BoZBu4g3TIRCQ1HtgPZ3wlmrFLVEdCqsiOzhJx9ufnlPIP-H50rn-HYyDsUfqlrZZsreoEgCN2WC7fMx4dkQJHfY-FiER',
  },
  {
    id: 'sil-hd-pullover',
    name: 'Atelier Canvas Pullover Crewneck',
    category: 'hoodies',
    fit: 'Pullover',
    gsm: 450,
    fabric: '450 GSM Loopback Knit',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLDBHDxRAPZT_5EXih4_9hM1EQahfOosXyRHoj2FAfpFsYaUVVE5j-IOAAJ5sEcswsCurAGOFgyS1rNdlVFKlQjjQn7pe8oG6uecuMSrdoZ3IzPo4s42M2LPjHdKZs4iSNb3OnwaxjqGcHGhEoxROOPm0WQMIkGTmgzPLzS62anj4w_UDcF5jO3-Jw2WE6rl6xzGW-ua3dbfogc70ruPHUBRjKIah6IEGohJ2ALjsJ',
    backImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLDBHDxRAPZT_5EXih4_9hM1EQahfOosXyRHoj2FAfpFsYaUVVE5j-IOAAJ5sEcswsCurAGOFgyS1rNdlVFKlQjjQn7pe8oG6uecuMSrdoZ3IzPo4s42M2LPjHdKZs4iSNb3OnwaxjqGcHGhEoxROOPm0WQMIkGTmgzPLzS62anj4w_UDcF5jO3-Jw2WE6rl6xzGW-ua3dbfogc70ruPHUBRjKIah6IEGohJ2ALjsJ',
  },

  // T-SHIRTS
  {
    id: 'sil-ts-boxy',
    name: 'Boxy Minimalist Drop-Shoulder Tee',
    category: 't-shirts',
    fit: 'Boxy fit',
    gsm: 280,
    fabric: '280 GSM Compact Ringspun Jersey',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbWwpkh1yQ8Z7GyoxrazPFnn1WM9_HY_8qJ0ZviKVU-qvCnU4HkkTmK83CsX27fS9wAwwehS_OUujM3LDKC8J6rDV8nrSxh4_rEP6lqcoQ78blEpB-7UsCaS6vD9RjXt_vm8kcvGrvywgmnq1fTlF_soD9WO9kLVZfWWDyol3hMe5yBrxmjrhMPOhf4ocGO0y_RG6ymdt2E4MyT9fUNMelnCKagitUH6qq7xS-YSTM',
    backImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWywtWR5JvlvJREBmT46wvKSvl8CZ6tn7WExniiafFEpeEleZDuqpFgkT0wa_BdaR1hHgGsGiZCVVkRJ619a0VdnurVFYGqgnRnhAv3xwQJLvhYL-2hs_bmZBOrAPbMp7QE0LWq-qGlnGUON9BYDtZynDVfg1zH38uD-HTE9vlPb6LRipZP9y7sTSFmXh8rVBvYrA70lEYHUXrEwCjjoktWMTVaHl-xDqLWKirgVZ7',
  },
  {
    id: 'sil-ts-oversized',
    name: 'Relaxed Oversized Drape Tee',
    category: 't-shirts',
    fit: 'Oversized',
    gsm: 280,
    fabric: '280 GSM Bio-Washed Combed Cotton',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWO1ENoTINyf6RofQLbQaIQTbsJdP234kHG5U7GpHbjDWy9L0t3iT6GzdRXXKNZoBZoOpFw7A2lYASJ6jmBE_rowr6Wk_knf2KTSktLMdEncSXiEFeQV45shjrs8t-qu_s8ucSWSfDoVmb_4LjDb9hL80GYwUlEHLuzV6pFlM_dUBddhXRNlZXLjsnIONViL-31BynVErjbrl64QHPhiRC173CjL6drsc1RszkLzvm',
    backImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWywtWR5JvlvJREBmT46wvKSvl8CZ6tn7WExniiafFEpeEleZDuqpFgkT0wa_BdaR1hHgGsGiZCVVkRJ619a0VdnurVFYGqgnRnhAv3xwQJLvhYL-2hs_bmZBOrAPbMp7QE0LWq-qGlnGUON9BYDtZynDVfg1zH38uD-HTE9vlPb6LRipZP9y7sTSFmXh8rVBvYrA70lEYHUXrEwCjjoktWMTVaHl-xDqLWKirgVZ7',
  },
  {
    id: 'sil-ts-regular',
    name: 'Essential Regular-Fit Cotton Tee',
    category: 't-shirts',
    fit: 'Regular fit',
    gsm: 240,
    fabric: '240 GSM Single Jersey Combed Cotton',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsLJiTZtRxzg13SLgilDsg1JCI-ljsZ03nSXRwD7AxYWk91bRHJJBeq_b9gq2S_yS75vx22liteLXLdo3TrvXmhksCrzWjQYgIWnTIHpCnJy3H9GVyDuMEXfvIhtNKK_swrhd9Yqnr3l0XFLE7_qZhuLzLkwOvxeu3Kl87XenncnigutYho2RdftylHz4BCWc_yuNfU8q_0fFlgiyi9ZwK1hKmWS7aky53X1Lu7fdd',
    backImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWywtWR5JvlvJREBmT46wvKSvl8CZ6tn7WExniiafFEpeEleZDuqpFgkT0wa_BdaR1hHgGsGiZCVVkRJ619a0VdnurVFYGqgnRnhAv3xwQJLvhYL-2hs_bmZBOrAPbMp7QE0LWq-qGlnGUON9BYDtZynDVfg1zH38uD-HTE9vlPb6LRipZP9y7sTSFmXh8rVBvYrA70lEYHUXrEwCjjoktWMTVaHl-xDqLWKirgVZ7',
  },
  {
    id: 'sil-ts-longsleeve',
    name: 'Architectural Heavyweight Long Sleeve',
    category: 't-shirts',
    fit: 'Long sleeve',
    gsm: 280,
    fabric: '280 GSM Ringspun Indian Cotton',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWywtWR5JvlvJREBmT46wvKSvl8CZ6tn7WExniiafFEpeEleZDuqpFgkT0wa_BdaR1hHgGsGiZCVVkRJ619a0VdnurVFYGqgnRnhAv3xwQJLvhYL-2hs_bmZBOrAPbMp7QE0LWq-qGlnGUON9BYDtZynDVfg1zH38uD-HTE9vlPb6LRipZP9y7sTSFmXh8rVBvYrA70lEYHUXrEwCjjoktWMTVaHl-xDqLWKirgVZ7',
    backImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWywtWR5JvlvJREBmT46wvKSvl8CZ6tn7WExniiafFEpeEleZDuqpFgkT0wa_BdaR1hHgGsGiZCVVkRJ619a0VdnurVFYGqgnRnhAv3xwQJLvhYL-2hs_bmZBOrAPbMp7QE0LWq-qGlnGUON9BYDtZynDVfg1zH38uD-HTE9vlPb6LRipZP9y7sTSFmXh8rVBvYrA70lEYHUXrEwCjjoktWMTVaHl-xDqLWKirgVZ7',
  },

  // SHIRTS
  {
    id: 'sil-sh-collarless',
    name: 'Collarless Superfine Cotton Shirt',
    category: 'shirts',
    fit: 'Collarless',
    gsm: 190,
    fabric: '100% Superfine 60s Count Combed Twill',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALN83-hP_diOp79f3NcKYb_7yHaX-00Zp7nzvdTHhuKaPACnlfO7rEKlc8OCz877sThJzXi-KfBdTDexIi_e0se8hGobMVyJtE045cyUC8DkHMvp6PFtVURAeUm4KqBCCeo_FGDmY0y0e3ibkBYDWOi_s44jHG-2rxhHqq4u4UGIApr7b6NRF584X_lG4Kw0QkirBRaDgRMCae376O7YEqCij5B03ERInLvaBDKY7P',
    backImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALN83-hP_diOp79f3NcKYb_7yHaX-00Zp7nzvdTHhuKaPACnlfO7rEKlc8OCz877sThJzXi-KfBdTDexIi_e0se8hGobMVyJtE045cyUC8DkHMvp6PFtVURAeUm4KqBCCeo_FGDmY0y0e3ibkBYDWOi_s44jHG-2rxhHqq4u4UGIApr7b6NRF584X_lG4Kw0QkirBRaDgRMCae376O7YEqCij5B03ERInLvaBDKY7P',
  },
  {
    id: 'sil-sh-mandarin',
    name: 'Mandarin Collar Minimalist Shirt',
    category: 'shirts',
    fit: 'Mandarin collar',
    gsm: 210,
    fabric: '55% French Linen / 45% Long-Staple Cotton',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoQ_YfB9b2Xga5SOg1Q2HDyl_fXp7XASLJRFXHshG-gqCYg5TfFqF4--nrV8qbvu3u6VSr_0du3m_K_rMWF6SWdS4RNlmfhE5-jBcB2vY7-3hlcMM6XkuER3QF1ZUZ8i6d7Y0hM7-y05_kqvj0MtraO11sCHKJhi8kMlEnwU7tdBbLVRTROEttjPt8ev7r-3fFHlF_azg0XXBNHkmKrfhTmMnlpG8aLYhVvdBSgTMR',
    backImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoQ_YfB9b2Xga5SOg1Q2HDyl_fXp7XASLJRFXHshG-gqCYg5TfFqF4--nrV8qbvu3u6VSr_0du3m_K_rMWF6SWdS4RNlmfhE5-jBcB2vY7-3hlcMM6XkuER3QF1ZUZ8i6d7Y0hM7-y05_kqvj0MtraO11sCHKJhi8kMlEnwU7tdBbLVRTROEttjPt8ev7r-3fFHlF_azg0XXBNHkmKrfhTmMnlpG8aLYhVvdBSgTMR',
  },
  {
    id: 'sil-sh-halfsleeve',
    name: 'Boxy Half-Sleeve Overshirt',
    category: 'shirts',
    fit: 'Half sleeve',
    gsm: 220,
    fabric: '220 GSM High-Density Cotton Poplin',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoQ_YfB9b2Xga5SOg1Q2HDyl_fXp7XASLJRFXHshG-gqCYg5TfFqF4--nrV8qbvu3u6VSr_0du3m_K_rMWF6SWdS4RNlmfhE5-jBcB2vY7-3hlcMM6XkuER3QF1ZUZ8i6d7Y0hM7-y05_kqvj0MtraO11sCHKJhi8kMlEnwU7tdBbLVRTROEttjPt8ev7r-3fFHlF_azg0XXBNHkmKrfhTmMnlpG8aLYhVvdBSgTMR',
    backImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoQ_YfB9b2Xga5SOg1Q2HDyl_fXp7XASLJRFXHshG-gqCYg5TfFqF4--nrV8qbvu3u6VSr_0du3m_K_rMWF6SWdS4RNlmfhE5-jBcB2vY7-3hlcMM6XkuER3QF1ZUZ8i6d7Y0hM7-y05_kqvj0MtraO11sCHKJhi8kMlEnwU7tdBbLVRTROEttjPt8ev7r-3fFHlF_azg0XXBNHkmKrfhTmMnlpG8aLYhVvdBSgTMR',
  },
  {
    id: 'sil-sh-fullsleeve',
    name: 'Tailored Full-Sleeve Cotton Shirt',
    category: 'shirts',
    fit: 'Full sleeve',
    gsm: 195,
    fabric: '100% Giza Long-Staple Cotton',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9mjpzTvlFSxu1WY-VuyrAshWQwzl_eo0dSC5R13QcOe2uHe72K92Us1hJHswQAo2PbUo4Rq_aZC7cw8VYJu6Qq416iQ4NovusVPvhHfgDhOeqf2v0FOQJbyFwe_aMbaxiZIyF9Zk4VpN_-3lbRW9sPO8XOrazvnrkNeYC9XsYpabpuhqekMQjUFO3vOmOWRp8dX_1GM4X_8F3TeYad79M6rSxMcX-6ucQDC2Wy8Yu',
    backImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9mjpzTvlFSxu1WY-VuyrAshWQwzl_eo0dSC5R13QcOe2uHe72K92Us1hJHswQAo2PbUo4Rq_aZC7cw8VYJu6Qq416iQ4NovusVPvhHfgDhOeqf2v0FOQJbyFwe_aMbaxiZIyF9Zk4VpN_-3lbRW9sPO8XOrazvnrkNeYC9XsYpabpuhqekMQjUFO3vOmOWRp8dX_1GM4X_8F3TeYad79M6rSxMcX-6ucQDC2Wy8Yu',
  },
  {
    id: 'sil-sh-collared',
    name: 'Sartorial Collared Heavy Oxford',
    category: 'shirts',
    fit: 'Collared',
    gsm: 220,
    fabric: '220 GSM Heavy Combed Oxford Weave',
    frontImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALN83-hP_diOp79f3NcKYb_7yHaX-00Zp7nzvdTHhuKaPACnlfO7rEKlc8OCz877sThJzXi-KfBdTDexIi_e0se8hGobMVyJtE045cyUC8DkHMvp6PFtVURAeUm4KqBCCeo_FGDmY0y0e3ibkBYDWOi_s44jHG-2rxhHqq4u4UGIApr7b6NRF584X_lG4Kw0QkirBRaDgRMCae376O7YEqCij5B03ERInLvaBDKY7P',
    backImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALN83-hP_diOp79f3NcKYb_7yHaX-00Zp7nzvdTHhuKaPACnlfO7rEKlc8OCz877sThJzXi-KfBdTDexIi_e0se8hGobMVyJtE045cyUC8DkHMvp6PFtVURAeUm4KqBCCeo_FGDmY0y0e3ibkBYDWOi_s44jHG-2rxhHqq4u4UGIApr7b6NRF584X_lG4Kw0QkirBRaDgRMCae376O7YEqCij5B03ERInLvaBDKY7P',
  },
];

const COLORWAYS = [
  { name: 'Obsidian Black', hex: '#131313' },
  { name: 'Off-White Ivory', hex: '#ECEBE7' },
  { name: 'Washed Charcoal', hex: '#2E2E31' },
  { name: 'Forest Emerald', hex: '#1C2E24' },
  { name: 'Silver Fog', hex: '#8E939B' },
];

const PLACEMENT_OPTIONS: { id: ArtworkPlacement; label: string }[] = [
  { id: 'front-center', label: 'Front Center (Primary Graphic)' },
  { id: 'back-full', label: 'Back Full (Oversized Statement)' },
  { id: 'left-chest', label: 'Left Chest (Pocket / Monogram)' },
  { id: 'right-chest', label: 'Right Chest' },
  { id: 'left-sleeve', label: 'Left Sleeve (Coordinates / Logo)' },
  { id: 'right-sleeve', label: 'Right Sleeve' },
];

const TECHNIQUES: { id: PrintTechnique; name: string; desc: string }[] = [
  { id: 'dtg', name: 'High-Def DTG', desc: 'Ultra-vibrant pigment inks bonded directly into combed cotton fibres.' },
  { id: 'puff', name: '3D Puff Print', desc: 'Tactile raised foam embroidery with high-density architectural elevation.' },
  { id: 'embroidery', name: 'Precision Needle Embroidery', desc: 'Dense silver lurex or matte thread tailored by master embroiderers.' },
  { id: 'screen', name: 'High-Density Silkscreen', desc: 'Industrial matte screen printing for crisp typographic clarity.' },
  { id: 'silicone', name: 'Matte Silicone Gel', desc: 'Glossless luxury rubberised badge transfer with lifetime elasticity.' },
];

export const CustomiserPage: React.FC<CustomiserPageProps> = ({
  products,
  initialProductId,
  onNavigate,
}) => {
  const { setDraftFromCustomisation } = useEnquiry();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initial silhouette matching initialProductId if provided
  const initialMatch = SILHOUETTES.find((s) => s.id === initialProductId || s.id.includes(initialProductId || '')) || SILHOUETTES[0];
  const [selectedSilhouette, setSelectedSilhouette] = useState<SilhouetteOption>(initialMatch);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<GarmentCategory | 'all'>('all');
  const [selectedColor, setSelectedColor] = useState(COLORWAYS[0]);
  const [selectedSize, setSelectedSize] = useState('L');
  const [quantity, setQuantity] = useState(1);
  const [view, setView] = useState<'front' | 'back'>('front');

  // Artwork & Placements
  const [uploadedFiles, setUploadedFiles] = useState<ArtworkFile[]>([
    {
      name: 'ARCHITECTURAL_SIG_01.PNG',
      dataUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA91viOU3iZnNj7E3Wg43K9n2IABbeyff_xpXlAiYB4-A_U3OlTM20nG4Y8Vn81hMDgyJ6CzusUZiVZREDg4i2dUBxoNpVJNI9QgUPvNC_tLJ7Q7NEdp7cNRl3nMHGsGyQqjdNs2fghFILrYwqx0OkPvTmnFQ_A-IA1OkXlhPf460Gs2Lqd9ta1bECh5Hbhm4dxvKLxNocnpaj0mEM3jxrmFfLAz_Rjrj4KS0tEj8n2',
      size: '4.2 MB',
      type: 'image/png',
    },
  ]);

  const [activePlacements, setActivePlacements] = useState<Record<ArtworkPlacement, boolean>>({
    'front-center': true,
    'left-chest': false,
    'right-chest': false,
    'back-full': false,
    'left-sleeve': false,
    'right-sleeve': false,
  });

  const [selectedTechnique, setSelectedTechnique] = useState<PrintTechnique>('dtg');
  const [scale, setScale] = useState(65);
  const [rotation, setRotation] = useState(0);
  const [customInstructions, setCustomInstructions] = useState('');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const activePlacementsList = (Object.keys(activePlacements) as ArtworkPlacement[]).filter(
    (p) => activePlacements[p]
  );

  const techObj = TECHNIQUES.find((t) => t.id === selectedTechnique) || TECHNIQUES[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setUploadedFiles((prev) => [
              {
                name: file.name.toUpperCase(),
                dataUrl: event.target!.result as string,
                size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
                type: file.type,
              },
              ...prev,
            ]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTogglePlacement = (p: ArtworkPlacement) => {
    setActivePlacements((prev) => ({
      ...prev,
      [p]: !prev[p],
    }));
  };

  const constructSpec = (): CustomisationSpec => {
    return {
      silhouetteId: selectedSilhouette.id,
      silhouetteName: selectedSilhouette.name,
      category: selectedSilhouette.category,
      fit: selectedSilhouette.fit,
      fabric: selectedSilhouette.fabric,
      gsm: selectedSilhouette.gsm,
      color: selectedColor,
      size: selectedSize,
      quantity,
      artworkFiles: uploadedFiles,
      placements: activePlacementsList,
      technique: selectedTechnique,
      techniqueName: techObj.name,
      transform: {
        scale,
        rotation,
        offsetX: 0,
        offsetY: 0,
      },
      customInstructions,
    };
  };

  const handleProceedToEnquiry = () => {
    const spec = constructSpec();
    const image = view === 'front' ? selectedSilhouette.frontImage : selectedSilhouette.backImage;
    setDraftFromCustomisation(spec, image);
    onNavigate('enquiry-form');
  };

  const currentArtwork = uploadedFiles[0]?.dataUrl;

  // Direct WhatsApp concierge url pre-filled with full customisation spec
  const whatsappMsg = `Hello Bharath J (Outfit Theory Atelier),\n\nI have configured a bespoke outfit enquiry:\n` +
    `• Garment: ${selectedSilhouette.name} (${selectedSilhouette.fit})\n` +
    `• Fabric & Weight: ${selectedSilhouette.fabric} (${selectedSilhouette.gsm} GSM)\n` +
    `• Colourway: ${selectedColor.name}\n` +
    `• Sizing: ${selectedSize}\n` +
    `• Desired Quantity: ${quantity} unit(s)\n` +
    `• Embellishment Technique: ${techObj.name}\n` +
    `• Artwork Placements: ${activePlacementsList.join(', ')}\n` +
    `• Artwork Files: ${uploadedFiles.length} file(s) ready\n` +
    (customInstructions ? `• Custom Notes: "${customInstructions}"\n` : '') +
    `\nI would like to discuss bespoke pricing, swatches, and timeline.`;
  const whatsappUrl = `https://wa.me/919611623514?text=${encodeURIComponent(whatsappMsg)}`;

  // Filter available silhouettes
  const displayedSilhouettes = SILHOUETTES.filter((s) => {
    if (activeCategoryFilter === 'all') return true;
    return s.category === activeCategoryFilter;
  });

  return (
    <div className="w-full bg-[#0A0A0A] text-[#e5e2e1] min-h-screen pb-24 font-sans">
      {/* Studio Header */}
      <section className="w-full bg-[#050505] border-b border-[#1E1E1E] px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ATELIER BESPOKE STUDIO // SYSTEM V2.5</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl uppercase text-white font-bold tracking-wide">
              CUSTOMISE YOUR OUTFIT
            </h1>
            <p className="text-xs text-neutral-400 font-light">
              Architectural customisation engine. Select category, fit, fabric, color, size, and upload your high-resolution artwork.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs uppercase text-neutral-300">
            <span className="bg-[#141414] border border-[#2a2a2a] px-3 py-1.5 rounded">
              NO CART • STRICTLY BY ENQUIRY
            </span>
          </div>
        </div>
      </section>

      {/* Main Studio Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Interactive Visual Mockup Canvas Engine */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#111111] border border-[#242424] p-4 md:p-6 rounded-xl shadow-2xl space-y-4">
            {/* Viewport Top Controls */}
            <div className="flex items-center justify-between pb-3 border-b border-[#202020]">
              <div className="flex items-center gap-1 bg-[#181818] p-1 border border-[#2e2e2e] rounded-sm">
                <button
                  onClick={() => setView('front')}
                  className={`px-3 py-1 text-xs font-mono uppercase transition-all rounded-sm cursor-pointer ${
                    view === 'front' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  VIEW FRONT
                </button>
                <button
                  onClick={() => setView('back')}
                  className={`px-3 py-1 text-xs font-mono uppercase transition-all rounded-sm cursor-pointer ${
                    view === 'back' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  VIEW BACK
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#181818] border border-[#2e2e2e] rounded-sm">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-neutral-600"
                    style={{ backgroundColor: selectedColor.hex }}
                  />
                  <span className="text-white uppercase font-medium">{selectedColor.name}</span>
                </div>

                <button
                  onClick={() => {
                    setScale(65);
                    setRotation(0);
                  }}
                  className="p-1.5 bg-[#181818] border border-[#2e2e2e] text-neutral-400 hover:text-white rounded-sm cursor-pointer"
                  title="Reset Transform"
                >
                  <span className="material-symbols-outlined text-[18px]">refresh</span>
                </button>
              </div>
            </div>

            {/* Central Mockup Viewport */}
            <div className="relative w-full aspect-[4/5] sm:aspect-square flex items-center justify-center overflow-hidden bg-[#0a0a0a] border border-[#222222] rounded-lg select-none">
              {/* Garment Base Layer */}
              <img
                src={view === 'front' ? selectedSilhouette.frontImage : selectedSilhouette.backImage}
                alt={`${selectedSilhouette.name} ${view} view`}
                className="absolute inset-0 w-full h-full object-contain filter drop-shadow-2xl transition-opacity duration-300 pointer-events-none grayscale-[25%] contrast-110"
              />

              {/* Dynamic Color Tint Cast */}
              <div
                className="absolute inset-0 mix-blend-multiply pointer-events-none transition-colors duration-300"
                style={{
                  backgroundColor:
                    selectedColor.name === 'Obsidian Black'
                      ? 'rgba(0,0,0,0.1)'
                      : selectedColor.name === 'Off-White Ivory'
                      ? 'rgba(236, 235, 231, 0.45)'
                      : selectedColor.name === 'Forest Emerald'
                      ? 'rgba(28, 46, 36, 0.55)'
                      : selectedColor.name === 'Silver Fog'
                      ? 'rgba(142, 147, 155, 0.4)'
                      : 'rgba(46, 46, 49, 0.45)',
                }}
              />

              {/* Active Artwork Placement Bounding Box */}
              <div
                className={`absolute transition-all duration-300 flex items-center justify-center ${
                  activePlacements['back-full'] && view === 'back'
                    ? 'top-[22%] left-[24%] w-[52%] h-[56%]'
                    : activePlacements['left-chest'] && view === 'front'
                    ? 'top-[26%] left-[32%] w-[22%] h-[22%]'
                    : activePlacements['right-chest'] && view === 'front'
                    ? 'top-[26%] right-[32%] w-[22%] h-[22%]'
                    : activePlacements['left-sleeve']
                    ? 'top-[36%] left-[16%] w-[20%] h-[20%]'
                    : 'top-[28%] left-[28%] w-[44%] h-[40%]'
                }`}
              >
                {/* Visual Bounding Guide Markers */}
                <div className="absolute inset-0 border border-white/25 pointer-events-none">
                  <span className="absolute -top-1 -left-1 w-2 h-2 bg-white" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-white" />
                  <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-white" />
                  <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-white" />
                </div>

                {/* Uploaded Artwork Graphic */}
                {currentArtwork && (
                  <div
                    className="max-w-full max-h-full transition-transform origin-center"
                    style={{
                      transform: `scale(${scale / 100}) rotate(${rotation}deg)`,
                    }}
                  >
                    <img
                      src={currentArtwork}
                      alt="Uploaded custom artwork"
                      className="w-36 h-auto object-contain filter drop-shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Transform Sliders (Resize & Reposition) */}
            <div className="bg-[#161616] border border-[#252525] p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                  <span>ARTWORK SCALE</span>
                  <span className="text-white font-semibold">{scale}%</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={100}
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full accent-white bg-[#2a2a2a] h-1.5 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                  <span>ROTATION ORIENTATION</span>
                  <span className="text-white font-semibold">{rotation}°</span>
                </div>
                <input
                  type="range"
                  min={-180}
                  max={180}
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full accent-white bg-[#2a2a2a] h-1.5 cursor-pointer"
                />
              </div>
            </div>

            {/* Illustrative Notice Requirement */}
            <div className="p-3 bg-[#181818] border border-[#2a2a2a] rounded text-[11px] font-mono text-neutral-400 flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-neutral-400 shrink-0 mt-0.5">info</span>
              <span>
                <strong>Notice:</strong> Digital previews are illustrative and final production may vary slightly based on garment fabric tension and physical embroidery needle gauge.
              </span>
            </div>
          </div>

          {/* Textile Science Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#111111] border border-[#222222] p-4 rounded-lg space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">DENSITY SPEC</span>
              <p className="font-serif text-sm font-bold text-white uppercase">{selectedSilhouette.gsm} GSM</p>
              <p className="text-[11px] text-neutral-400 font-light">Zero sag compact architectural build.</p>
            </div>
            <div className="bg-[#111111] border border-[#222222] p-4 rounded-lg space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">FIT GEOMETRY</span>
              <p className="font-serif text-sm font-bold text-white uppercase">{selectedSilhouette.fit}</p>
              <p className="text-[11px] text-neutral-400 font-light">Structural drape with drop shoulders.</p>
            </div>
            <div className="bg-[#111111] border border-[#222222] p-4 rounded-lg space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase block">EMBELLISHMENT</span>
              <p className="font-serif text-sm font-bold text-white uppercase">{techObj.name}</p>
              <p className="text-[11px] text-neutral-400 font-light">{techObj.desc}</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Customisation Parameters & Design Summary (NO PRICES) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111111] border border-[#242424] p-6 rounded-xl space-y-6 shadow-2xl">
            {/* Step 1: Category Filter & Silhouette Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="uppercase text-white font-semibold">1. Select Garment & Style</span>
                <span className="text-neutral-500 uppercase">{selectedSilhouette.fit}</span>
              </div>

              {/* Category Pills */}
              <div className="flex gap-1.5 p-1 bg-[#181818] border border-[#2a2a2a] rounded">
                {(['all', 'hoodies', 't-shirts', 'shirts'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategoryFilter(cat)}
                    className={`flex-1 py-1.5 text-[11px] font-mono uppercase rounded transition-colors cursor-pointer ${
                      activeCategoryFilter === cat
                        ? 'bg-white text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Silhouette Cards */}
              <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto pr-1">
                {displayedSilhouettes.map((sil) => {
                  const isSelected = selectedSilhouette.id === sil.id;
                  return (
                    <button
                      key={sil.id}
                      onClick={() => setSelectedSilhouette(sil)}
                      className={`p-2.5 text-left border rounded transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#1e1e1e] border-white text-white'
                          : 'bg-[#141414] border-[#262626] text-neutral-400 hover:text-white hover:border-neutral-600'
                      }`}
                    >
                      <span className="text-[10px] font-mono text-neutral-400 block">{sil.gsm} GSM</span>
                      <span className="font-serif text-xs font-semibold text-white block truncate mt-0.5">
                        {sil.name}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 block mt-1">
                        {sil.fit}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Colour, Size, Fabric & Quantity */}
            <div className="space-y-4 pt-3 border-t border-[#222222]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="uppercase text-white font-semibold">2. Colour & Specifications</span>
                <button
                  onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                  className="text-neutral-400 hover:text-white underline cursor-pointer"
                >
                  Size Guide
                </button>
              </div>

              {/* Colourways */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-neutral-400 uppercase">
                  Colourway: <span className="text-white font-bold">{selectedColor.name}</span>
                </label>
                <div className="flex items-center gap-3">
                  {COLORWAYS.map((c) => {
                    const isSelected = selectedColor.name === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`w-9 h-9 rounded-full border transition-all cursor-pointer ${
                          isSelected ? 'ring-2 ring-white border-white scale-105' : 'border-neutral-700'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Sizing Grid */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-neutral-400 uppercase">
                  Select Size: <span className="text-white font-bold">{selectedSize}</span>
                </label>
                <div className="grid grid-cols-6 gap-1.5">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 text-center border font-mono text-xs rounded transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-white text-black font-bold border-white'
                            : 'bg-[#181818] text-neutral-400 border-[#2a2a2a] hover:text-white'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Guide Accordion */}
              {sizeGuideOpen && (
                <div className="p-3 bg-[#181818] border border-[#2a2a2a] rounded text-[11px] font-mono space-y-2 animate-fadeIn">
                  <p className="text-white font-semibold uppercase">Atelier Measurement Matrix (Inches):</p>
                  <div className="grid grid-cols-4 gap-1 text-neutral-400 text-center">
                    <span className="text-neutral-500">SIZE</span>
                    <span className="text-neutral-500">CHEST</span>
                    <span className="text-neutral-500">LENGTH</span>
                    <span className="text-neutral-500">SHOULDER</span>
                    <span>S</span><span>42"</span><span>27.5"</span><span>20"</span>
                    <span className="text-white font-bold">M</span><span>44"</span><span>28.5"</span><span>21"</span>
                    <span>L</span><span>46"</span><span>29.5"</span><span>22"</span>
                    <span>XL</span><span>48"</span><span>30.5"</span><span>23"</span>
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center justify-between text-xs font-mono pt-1">
                <span className="text-neutral-400 uppercase">Order Quantity (Units)</span>
                <div className="flex items-center border border-[#333333] bg-[#181818] rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-white font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Artwork Upload (PNG, JPG, JPEG, PDF - Multiple Files) */}
            <div className="space-y-4 pt-3 border-t border-[#222222]">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="uppercase text-white font-semibold">3. Upload Your Artwork</span>
                <span className="text-neutral-500 uppercase">PNG, JPG, PDF</span>
              </div>

              {/* Upload Drop Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#161616] border border-dashed border-[#333333] hover:border-neutral-400 p-5 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/png, image/jpeg, image/jpg, application/pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <span className="material-symbols-outlined text-[32px] text-neutral-400 mb-1">
                  cloud_upload
                </span>
                <p className="font-serif text-xs uppercase font-semibold text-white">
                  Click to Upload Artwork, Photographs or Logos
                </p>
                <p className="text-[10px] font-mono text-neutral-500 mt-1">
                  Accepts PNG, JPG, JPEG and PDF • Multiple uploads supported
                </p>
              </div>

              {/* Uploaded Files Manifest */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">
                    Attached Files ({uploadedFiles.length})
                  </span>
                  {uploadedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="bg-[#181818] border border-[#2a2a2a] p-2.5 rounded flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="material-symbols-outlined text-[16px] text-neutral-400">
                          attach_file
                        </span>
                        <span className="text-white truncate">{file.name}</span>
                        <span className="text-[10px] text-neutral-500">({file.size})</span>
                      </div>
                      <button
                        onClick={() => handleRemoveFile(idx)}
                        className="text-neutral-500 hover:text-rose-400 ml-2 p-1 cursor-pointer"
                        title="Remove file"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Artwork Placements */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-neutral-400 uppercase block">
                  Artwork Placement Options
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PLACEMENT_OPTIONS.map((opt) => {
                    const isChecked = activePlacements[opt.id];
                    return (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-2.5 p-2.5 border rounded cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-[#1e1e1e] border-white text-white'
                            : 'bg-[#141414] border-[#272727] text-neutral-400 hover:text-white'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleTogglePlacement(opt.id)}
                          className="w-4 h-4 accent-white rounded-none cursor-pointer"
                        />
                        <span className="text-xs truncate">{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Embellishment Technique Selection */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono text-neutral-400 uppercase block">
                  Finishing & Embellishment Technique
                </label>
                <div className="space-y-1.5">
                  {TECHNIQUES.map((tech) => {
                    const isSelected = selectedTechnique === tech.id;
                    return (
                      <button
                        key={tech.id}
                        onClick={() => setSelectedTechnique(tech.id)}
                        className={`w-full p-2.5 text-left border rounded font-mono text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#1e1e1e] border-white text-white'
                            : 'bg-[#141414] border-[#272727] text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span className="block font-semibold text-white">{tech.name}</span>
                        <span className="block text-[10px] text-neutral-400 mt-0.5">{tech.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Instructions */}
              <div className="space-y-1">
                <label className="text-[11px] font-mono text-neutral-400 uppercase block">
                  Custom Instructions for Atelier Tailor
                </label>
                <textarea
                  value={customInstructions}
                  onChange={(e) => setCustomInstructions(e.target.value)}
                  placeholder="Specify any unique details: raw cut hems, custom neck tag initials, pantone matching, or packaging requests..."
                  rows={2}
                  className="w-full bg-[#181818] border border-[#333333] p-3 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-white font-mono rounded"
                />
              </div>
            </div>

            {/* Complete Design Summary (NO PRICES) */}
            <div className="bg-[#181818] border border-[#2a2a2a] p-4 rounded-lg space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-center text-white pb-2 border-b border-[#2a2a2a]">
                <span className="font-bold uppercase tracking-wider">DESIGN SUMMARY</span>
                <span className="text-[10px] text-emerald-400">READY FOR COMMISSION</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Garment:</span>
                <span className="text-white text-right font-medium">{selectedSilhouette.name}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Category & Fit:</span>
                <span className="text-neutral-200">{selectedSilhouette.category.toUpperCase()} // {selectedSilhouette.fit}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Fabric & Density:</span>
                <span className="text-neutral-200">{selectedSilhouette.fabric} ({selectedSilhouette.gsm} GSM)</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Colourway:</span>
                <span className="text-neutral-200">{selectedColor.name}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Size & Quantity:</span>
                <span className="text-white font-semibold">Size {selectedSize} • {quantity} unit(s)</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Placements:</span>
                <span className="text-neutral-200">{activePlacementsList.length ? activePlacementsList.join(', ') : 'Front'}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Finishing Technique:</span>
                <span className="text-neutral-200">{techObj.name}</span>
              </div>
              <div className="pt-2 border-t border-[#2a2a2a] flex items-center justify-between text-neutral-400 text-[11px]">
                <span>Bespoke Pricing:</span>
                <span className="text-emerald-400 font-semibold uppercase">Personalized via WhatsApp</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleProceedToEnquiry}
                className="w-full py-4 bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 rounded shadow-xl cursor-pointer"
              >
                <span>PROCEED TO ENQUIRY</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#181818] border border-emerald-500/50 text-emerald-400 font-mono text-xs uppercase tracking-wider hover:bg-emerald-950/30 transition-colors flex items-center justify-center gap-2 rounded"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>DISCUSS SPEC ON WHATSAPP (+91 9611623514)</span>
              </a>

              <div className="text-center text-[10px] font-mono text-neutral-500">
                Founder Bharath J will personally contact you on WhatsApp to discuss bespoke pricing & production lead times.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
