import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // HOODIES
  {
    id: 'prod-hd-01',
    name: 'Oversized Acid Wash Heavyweight Hoodie',
    slug: 'oversized-acid-wash-heavyweight-hoodie',
    category: 'hoodies',
    fit: 'Oversized',
    description: '450 GSM French Terry cotton with mineral acid wash treatment. Engineered with architectural double-needle seams, drop shoulder drape, silver-tipped drawstrings, and kangaroo pouch with reinforced bar-tacks.',
    gsm: 450,
    fabric: '100% Combed Compact Ringspun French Terry',
    stockStatus: 'Available for Commission',
    colors: [
      { name: 'Washed Charcoal', hex: '#2E2E31' },
      { name: 'Obsidian Black', hex: '#131313' },
      { name: 'Off-White Ivory', hex: '#ECEBE7' },
      { name: 'Forest Emerald', hex: '#1C2E24' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: {
      front: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9JJky5FacVQY5qVR62ZzArQPfiD8mu8U_OvV-Va76B6hyP2SoZdA-E9NhObukiqx5TA2aDJ2D3ALoIm6nXwj6qeccSKuBenTUZlKs3WTP1-gO5isX914kVAapKQiTT9F1nQj1eMuOPH1NyxFfjIdz-EnOrYPjrXLjdlZPmhRY-bb9btEjkVdNZ-6dbpbohAvKcH-aJGHd52NHuYWaCisZcLQKe5ByfesEYw0nnO6z',
      back: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5aCAGGn1cwMSMDZNxwUMGWJv_kzs88ssKKdMlbEeR0-ppBbvATH95gW4t5XmLKRsbqfJfEKb-EOWuOlORUREBeQ7vWOiisvtuDtGtz4PKra13W4KfB5yO-_VLoe_acTLvxHT1LAt1Tu5BoZBu4g3TIRCQ1HtgPZ3wlmrFLVEdCqsiOzhJx9ufnlPIP-H50rn-HYyDsUfqlrZZsreoEgCN2WC7fMx4dkQJHfY-FiER',
      editorial: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC26PVWkikASFn4W_XH6O3FhDEN9t2J3ZNbQN79yBC5YtkwCJ2CjDaPEGDoyANrcZTl2r82hBErK57NVVv6HBRCDzbmG07CV9HAFhSbNjIJPvDTgtM7RGiJEPR1DCgv3CTH8A3oLhDZ0ZL5kUIsWc15EpzT9UV8tLGlxRaSLQUJUybhky1bj1z8HGr56roDve1Fiir6O5OL5BtrB29RkGGQoQ3VD5o02SwnmVcOL8Dw',
      alt: 'Oversized Acid Wash Heavyweight Hoodie 450 GSM'
    },
    customisable: true,
    featured: true,
    edition: 'Drop 04 // Structural Souls'
  },
  {
    id: 'prod-hd-02',
    name: 'Bespoke Monolith Drop-Shoulder Hoodie',
    slug: 'bespoke-monolith-drop-shoulder-hoodie',
    category: 'hoodies',
    fit: 'Oversized',
    description: '450 GSM zero-sag compact loopback cotton. Built for sculptural drape with seamless hood crown, hidden kangaroo slit pockets, and heavyweight 2x2 ribbing at hem and cuffs.',
    gsm: 450,
    fabric: '450 GSM Zero-Twist Indian Cotton Terry',
    stockStatus: 'Limited Batch Allocation',
    colors: [
      { name: 'Obsidian Black', hex: '#131313' },
      { name: 'Silver Fog', hex: '#8E939B' },
      { name: 'Off-White Ivory', hex: '#ECEBE7' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: {
      front: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBe9SZLiHVMDLK1SxWBjoTUliGE2mxibXFFb98pQz3r0DIxppGgM6-K3D8G2y0vJJDmb0gsTMRI1SxOLNE7v0pYkqxn0yKalhuoFZCfEWygnswO5UPrCTK3AXwyiJHPBsjrKF25D6EvehtgJ0Ai3LDoklGG0geeaD3nlJztdlVmi1tBm0WP0mpS5vCB98RoHF7OipcspOOBe5A1KGPjfcNxRpqLSWHOZR6aKH25H3Gq',
      back: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5aCAGGn1cwMSMDZNxwUMGWJv_kzs88ssKKdMlbEeR0-ppBbvATH95gW4t5XmLKRsbqfJfEKb-EOWuOlORUREBeQ7vWOiisvtuDtGtz4PKra13W4KfB5yO-_VLoe_acTLvxHT1LAt1Tu5BoZBu4g3TIRCQ1HtgPZ3wlmrFLVEdCqsiOzhJx9ufnlPIP-H50rn-HYyDsUfqlrZZsreoEgCN2WC7fMx4dkQJHfY-FiER',
      editorial: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC26PVWkikASFn4W_XH6O3FhDEN9t2J3ZNbQN79yBC5YtkwCJ2CjDaPEGDoyANrcZTl2r82hBErK57NVVv6HBRCDzbmG07CV9HAFhSbNjIJPvDTgtM7RGiJEPR1DCgv3CTH8A3oLhDZ0ZL5kUIsWc15EpzT9UV8tLGlxRaSLQUJUybhky1bj1z8HGr56roDve1Fiir6O5OL5BtrB29RkGGQoQ3VD5o02SwnmVcOL8Dw',
      alt: 'Bespoke Monolith Drop-Shoulder Hoodie'
    },
    customisable: true,
    featured: true,
    edition: 'Drop 04 // Structural Souls'
  },
  {
    id: 'prod-hd-03',
    name: 'Classic Regular-Fit Heavy Combed Hoodie',
    slug: 'classic-regular-fit-heavy-combed-hoodie',
    category: 'hoodies',
    fit: 'Regular fit',
    description: '380 GSM brushed fleece with tailored athletic proportions. Clean shoulder line, premium nickel eyelets, and anti-pilling compact combed yarns.',
    gsm: 380,
    fabric: '380 GSM Brushed Combed Fleece',
    stockStatus: 'Available for Commission',
    colors: [
      { name: 'Obsidian Black', hex: '#131313' },
      { name: 'Washed Charcoal', hex: '#2E2E31' },
      { name: 'Forest Emerald', hex: '#1C2E24' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      front: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_5cpd2TeOWOg4DdlnSiCvu2Fe6QdRffybJJq3XQ5kVencU75uWU8kJULSfhtWYrBrffYt8H1MOz0lUegcH8Hf3C9pGpDjZ1qEfn1KSOLGh9tfEmLXTR-gzXFrztZLionbkMEd7SRtVMNFmfdKQg410QLu0Xkwmg0IriGcXP-s0UccJgkBNCgIoMV0JxmWa75UzhSjBbXEAKKJvzdMP_8vuZ7wVJ7h0YnLxsfFOrnO',
      alt: 'Classic Regular-Fit Heavy Combed Hoodie'
    },
    customisable: true,
    featured: false
  },
  {
    id: 'prod-hd-04',
    name: 'Double-Slider Heavyweight Zip-Up Hoodie',
    slug: 'double-slider-heavyweight-zip-up-hoodie',
    category: 'hoodies',
    fit: 'Zip-up',
    description: '420 GSM French Terry with matte blackened dual metal YKK sliders. Allows multi-directional styling, structured hood baffle, and reinforced raglan underarm panels.',
    gsm: 420,
    fabric: '420 GSM Double-Faced Terry',
    stockStatus: 'Limited Batch Allocation',
    colors: [
      { name: 'Obsidian Black', hex: '#131313' },
      { name: 'Silver Fog', hex: '#8E939B' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: {
      front: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyQs4OmYW4YEAI1mYguBej_brQ8hLOsnLl6LRvLzPfmNl2fdyUd3OX1RtPvxDhGHG6eo6vpvaTTtK-C-_Y_-iukig5LgOXoNfEqsrUe0Ttcmcmh3iHbMLRdG2XpOXtvlMzip3oUHJ4YpF_QkOJouKK7Muj00dFtoX_2rFBpe4jEZ003jzgOcDoWkCfWEjxOrYG2OfVE90kItND9NhTi5m6GYkLRVJvd3lzt-nEU1dU',
      alt: 'Double-Slider Heavyweight Zip-Up Hoodie'
    },
    customisable: true,
    featured: false
  },
  {
    id: 'prod-hd-05',
    name: 'Atelier Custom Canvas Pullover Crewneck',
    slug: 'atelier-custom-canvas-pullover',
    category: 'hoodies',
    fit: 'Pullover',
    description: '450 GSM loopback cotton crewneck engineered as the ultimate identity canvas. Wide neck rib, sculpted drop shoulders, and flatlock anti-chafe interior seams.',
    gsm: 450,
    fabric: '450 GSM Loopback Knit',
    stockStatus: 'Available for Commission',
    colors: [
      { name: 'Obsidian Black', hex: '#131313' },
      { name: 'Off-White Ivory', hex: '#ECEBE7' },
      { name: 'Washed Charcoal', hex: '#2E2E31' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: {
      front: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLDBHDxRAPZT_5EXih4_9hM1EQahfOosXyRHoj2FAfpFsYaUVVE5j-IOAAJ5sEcswsCurAGOFgyS1rNdlVFKlQjjQn7pe8oG6uecuMSrdoZ3IzPo4s42M2LPjHdKZs4iSNb3OnwaxjqGcHGhEoxROOPm0WQMIkGTmgzPLzS62anj4w_UDcF5jO3-Jw2WE6rl6xzGW-ua3dbfogc70ruPHUBRjKIah6IEGohJ2ALjsJ',
      alt: 'Atelier Custom Canvas Pullover Crewneck'
    },
    customisable: true,
    featured: true
  },

  // T-SHIRTS
  {
    id: 'prod-ts-01',
    name: 'Boxy Minimalist Drop-Shoulder Tee',
    slug: 'boxy-minimalist-drop-shoulder-tee',
    category: 't-shirts',
    fit: 'Boxy fit',
    description: '280 GSM heavyweight compact combed jersey. Engineered with 1.25-inch high-density ribbed collar, extended sleeves, and a sharp square architectural drape that never clings.',
    gsm: 280,
    fabric: '280 GSM 100% Ringspun Combed Cotton',
    stockStatus: 'Available for Commission',
    colors: [
      { name: 'Obsidian Black', hex: '#131313' },
      { name: 'Off-White Ivory', hex: '#ECEBE7' },
      { name: 'Washed Charcoal', hex: '#2E2E31' },
      { name: 'Silver Fog', hex: '#8E939B' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      front: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbWwpkh1yQ8Z7GyoxrazPFnn1WM9_HY_8qJ0ZviKVU-qvCnU4HkkTmK83CsX27fS9wAwwehS_OUujM3LDKC8J6rDV8nrSxh4_rEP6lqcoQ78blEpB-7UsCaS6vD9RjXt_vm8kcvGrvywgmnq1fTlF_soD9WO9kLVZfWWDyol3hMe5yBrxmjrhMPOhf4ocGO0y_RG6ymdt2E4MyT9fUNMelnCKagitUH6qq7xS-YSTM',
      back: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWywtWR5JvlvJREBmT46wvKSvl8CZ6tn7WExniiafFEpeEleZDuqpFgkT0wa_BdaR1hHgGsGiZCVVkRJ619a0VdnurVFYGqgnRnhAv3xwQJLvhYL-2hs_bmZBOrAPbMp7QE0LWq-qGlnGUON9BYDtZynDVfg1zH38uD-HTE9vlPb6LRipZP9y7sTSFmXh8rVBvYrA70lEYHUXrEwCjjoktWMTVaHl-xDqLWKirgVZ7',
      editorial: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlmZI5PrjztigLmCxfEoAJK0DZ68b13Ul2bKJ7DzODgAaaq-R55suvqh57sRm2Vsisjtx4ehnGBcCup7W28rJv7bb9PUGcy0Ikzo5ng0_XAYDx0gW3oQKuQaGHHFXEmvqOSLImp1k1ajtHGsatzaraEh7BIgyA148J-ugE4_2pK0jk1t4USRtrrjROtZNuwzVFJezSm_zclquulPJZvUHhGjlAnZaxPDs5PCt63lr6',
      alt: 'Boxy Minimalist Drop-Shoulder Tee 280 GSM'
    },
    customisable: true,
    featured: true,
    edition: 'Drop 04 // Structural Souls'
  },
  {
    id: 'prod-ts-02',
    name: 'Relaxed Oversized Bio-Wash Drape Tee',
    slug: 'relaxed-oversized-bio-wash-drape-tee',
    category: 't-shirts',
    fit: 'Oversized',
    description: '280 GSM bio-polished cotton offering a silky peach-skin handfeel with heavy structured silhouette. Zero twisting after washing with silicone soft wash finish.',
    gsm: 280,
    fabric: '280 GSM Bio-Washed Combed Cotton',
    stockStatus: 'Available for Commission',
    colors: [
      { name: 'Off-White Ivory', hex: '#ECEBE7' },
      { name: 'Obsidian Black', hex: '#131313' },
      { name: 'Forest Emerald', hex: '#1C2E24' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: {
      front: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWO1ENoTINyf6RofQLbQaIQTbsJdP234kHG5U7GpHbjDWy9L0t3iT6GzdRXXKNZoBZoOpFw7A2lYASJ6jmBE_rowr6Wk_knf2KTSktLMdEncSXiEFeQV45shjrs8t-qu_s8ucSWSfDoVmb_4LjDb9hL80GYwUlEHLuzV6pFlM_dUBddhXRNlZXLjsnIONViL-31BynVErjbrl64QHPhiRC173CjL6drsc1RszkLzvm',
      editorial: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlmZI5PrjztigLmCxfEoAJK0DZ68b13Ul2bKJ7DzODgAaaq-R55suvqh57sRm2Vsisjtx4ehnGBcCup7W28rJv7bb9PUGcy0Ikzo5ng0_XAYDx0gW3oQKuQaGHHFXEmvqOSLImp1k1ajtHGsatzaraEh7BIgyA148J-ugE4_2pK0jk1t4USRtrrjROtZNuwzVFJezSm_zclquulPJZvUHhGjlAnZaxPDs5PCt63lr6',
      alt: 'Relaxed Oversized Bio-Wash Drape Tee'
    },
    customisable: true,
    featured: false
  },
  {
    id: 'prod-ts-03',
    name: 'Essential Regular-Fit Combed Cotton Tee',
    slug: 'essential-regular-fit-combed-cotton-tee',
    category: 't-shirts',
    fit: 'Regular fit',
    description: '240 GSM single jersey tailored with clean proportion for effortless layering. Features shoulder-to-shoulder tape reinforcement and blind-stitch hems.',
    gsm: 240,
    fabric: '240 GSM Single Jersey Combed Cotton',
    stockStatus: 'Available for Commission',
    colors: [
      { name: 'Obsidian Black', hex: '#131313' },
      { name: 'Off-White Ivory', hex: '#ECEBE7' },
      { name: 'Washed Charcoal', hex: '#2E2E31' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: {
      front: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsLJiTZtRxzg13SLgilDsg1JCI-ljsZ03nSXRwD7AxYWk91bRHJJBeq_b9gq2S_yS75vx22liteLXLdo3TrvXmhksCrzWjQYgIWnTIHpCnJy3H9GVyDuMEXfvIhtNKK_swrhd9Yqnr3l0XFLE7_qZhuLzLkwOvxeu3Kl87XenncnigutYho2RdftylHz4BCWc_yuNfU8q_0fFlgiyi9ZwK1hKmWS7aky53X1Lu7fdd',
      alt: 'Essential Regular-Fit Combed Cotton Tee'
    },
    customisable: true,
    featured: false
  },
  {
    id: 'prod-ts-04',
    name: 'Architectural Heavyweight Long Sleeve Tee',
    slug: 'architectural-heavyweight-long-sleeve-tee',
    category: 't-shirts',
    fit: 'Long sleeve',
    description: '280 GSM heavyweight jersey with articulated ribbed cuffs. Deep armhole profile with clean Japanese streetwear drape.',
    gsm: 280,
    fabric: '280 GSM Ringspun Indian Cotton',
    stockStatus: 'Limited Batch Allocation',
    colors: [
      { name: 'Obsidian Black', hex: '#131313' },
      { name: 'Off-White Ivory', hex: '#ECEBE7' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: {
      front: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWywtWR5JvlvJREBmT46wvKSvl8CZ6tn7WExniiafFEpeEleZDuqpFgkT0wa_BdaR1hHgGsGiZCVVkRJ619a0VdnurVFYGqgnRnhAv3xwQJLvhYL-2hs_bmZBOrAPbMp7QE0LWq-qGlnGUON9BYDtZynDVfg1zH38uD-HTE9vlPb6LRipZP9y7sTSFmXh8rVBvYrA70lEYHUXrEwCjjoktWMTVaHl-xDqLWKirgVZ7',
      alt: 'Architectural Heavyweight Long Sleeve Tee'
    },
    customisable: true,
    featured: false
  },

  // SHIRTS
  {
    id: 'prod-sh-01',
    name: 'Architectural Collarless Superfine Cotton Shirt',
    slug: 'architectural-collarless-superfine-cotton-shirt',
    category: 'shirts',
    fit: 'Collarless',
    description: 'Superfine 60s count long-staple Indian cotton twill. Designed with concealed mother-of-pearl button placket, clean neckline curve, and sculpted split back yoke.',
    gsm: 190,
    fabric: '100% Superfine 60s Count Combed Twill',
    stockStatus: 'Available for Commission',
    colors: [
      { name: 'Off-White Ivory', hex: '#ECEBE7' },
      { name: 'Obsidian Black', hex: '#131313' },
      { name: 'Silver Fog', hex: '#8E939B' }
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    images: {
      front: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALN83-hP_diOp79f3NcKYb_7yHaX-00Zp7nzvdTHhuKaPACnlfO7rEKlc8OCz877sThJzXi-KfBdTDexIi_e0se8hGobMVyJtE045cyUC8DkHMvp6PFtVURAeUm4KqBCCeo_FGDmY0y0e3ibkBYDWOi_s44jHG-2rxhHqq4u4UGIApr7b6NRF584X_lG4Kw0QkirBRaDgRMCae376O7YEqCij5B03ERInLvaBDKY7P',
      editorial: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv-Jbe2aOfImj8MT4cyp7JJPSrXhojmX8uOovy7PJ6wX0mvWKXvbhPJXOz8ebLuaUyjUQZvkST3eREwhwPd7QLOhLaNSl1OO-KUY09wEsySfFXOf4ZsMAMruQ5Q4zVh96KD9Ua7i-UT2aQgsOYMTHEBMx-GWTY4ZjAJG-oEEs-5-LkaJv3JEIKy_GIsXcYGzmAycIskjUX52Wgc9zliFcwaEWf3-YwcVORZ4DQr0Go',
      alt: 'Architectural Collarless Superfine Cotton Shirt'
    },
    customisable: true,
    featured: true,
    edition: 'Drop 04 // Structural Souls'
  },
  {
    id: 'prod-sh-02',
    name: 'Structured Mandarin Collar Minimalist Shirt',
    slug: 'structured-mandarin-collar-minimalist-shirt',
    category: 'shirts',
    fit: 'Mandarin collar',
    description: 'Linen-cotton hybrid weave tailored with 1.25-inch stand collar, French seams, and horn buttons. Breathable luxury for high-heat urban climates.',
    gsm: 210,
    fabric: '55% French Linen / 45% Long-Staple Indian Cotton',
    stockStatus: 'Available for Commission',
    colors: [
      { name: 'Off-White Ivory', hex: '#ECEBE7' },
      { name: 'Washed Charcoal', hex: '#2E2E31' }
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    images: {
      front: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoQ_YfB9b2Xga5SOg1Q2HDyl_fXp7XASLJRFXHshG-gqCYg5TfFqF4--nrV8qbvu3u6VSr_0du3m_K_rMWF6SWdS4RNlmfhE5-jBcB2vY7-3hlcMM6XkuER3QF1ZUZ8i6d7Y0hM7-y05_kqvj0MtraO11sCHKJhi8kMlEnwU7tdBbLVRTROEttjPt8ev7r-3fFHlF_azg0XXBNHkmKrfhTmMnlpG8aLYhVvdBSgTMR',
      alt: 'Structured Mandarin Collar Minimalist Shirt'
    },
    customisable: true,
    featured: false
  },
  {
    id: 'prod-sh-03',
    name: 'Heavy Poplin Boxy Half-Sleeve Overshirt',
    slug: 'heavy-poplin-boxy-half-sleeve-overshirt',
    category: 'shirts',
    fit: 'Half sleeve',
    description: 'Crisp 220 GSM high-density cotton poplin with camp collar, dual chest welt pockets, and straight hem engineered for wearing open or buttoned.',
    gsm: 220,
    fabric: '220 GSM High-Density Cotton Poplin',
    stockStatus: 'Available for Commission',
    colors: [
      { name: 'Obsidian Black', hex: '#131313' },
      { name: 'Forest Emerald', hex: '#1C2E24' },
      { name: 'Off-White Ivory', hex: '#ECEBE7' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: {
      front: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoQ_YfB9b2Xga5SOg1Q2HDyl_fXp7XASLJRFXHshG-gqCYg5TfFqF4--nrV8qbvu3u6VSr_0du3m_K_rMWF6SWdS4RNlmfhE5-jBcB2vY7-3hlcMM6XkuER3QF1ZUZ8i6d7Y0hM7-y05_kqvj0MtraO11sCHKJhi8kMlEnwU7tdBbLVRTROEttjPt8ev7r-3fFHlF_azg0XXBNHkmKrfhTmMnlpG8aLYhVvdBSgTMR',
      alt: 'Heavy Poplin Boxy Half-Sleeve Overshirt'
    },
    customisable: true,
    featured: false
  },
  {
    id: 'prod-sh-04',
    name: 'Tailored Minimalist Full-Sleeve Cotton Shirt',
    slug: 'tailored-minimalist-full-sleeve-cotton-shirt',
    category: 'shirts',
    fit: 'Full sleeve',
    description: 'Precision tailored full sleeve button down with clean hidden button cuffs, structured point collar, and matte pearl fastenings.',
    gsm: 195,
    fabric: '100% Giza Long-Staple Cotton',
    stockStatus: 'Available for Commission',
    colors: [
      { name: 'Obsidian Black', hex: '#131313' },
      { name: 'Off-White Ivory', hex: '#ECEBE7' }
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    images: {
      front: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9mjpzTvlFSxu1WY-VuyrAshWQwzl_eo0dSC5R13QcOe2uHe72K92Us1hJHswQAo2PbUo4Rq_aZC7cw8VYJu6Qq416iQ4NovusVPvhHfgDhOeqf2v0FOQJbyFwe_aMbaxiZIyF9Zk4VpN_-3lbRW9sPO8XOrazvnrkNeYC9XsYpabpuhqekMQjUFO3vOmOWRp8dX_1GM4X_8F3TeYad79M6rSxMcX-6ucQDC2Wy8Yu',
      editorial: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCv-Jbe2aOfImj8MT4cyp7JJPSrXhojmX8uOovy7PJ6wX0mvWKXvbhPJXOz8ebLuaUyjUQZvkST3eREwhwPd7QLOhLaNSl1OO-KUY09wEsySfFXOf4ZsMAMruQ5Q4zVh96KD9Ua7i-UT2aQgsOYMTHEBMx-GWTY4ZjAJG-oEEs-5-LkaJv3JEIKy_GIsXcYGzmAycIskjUX52Wgc9zliFcwaEWf3-YwcVORZ4DQr0Go',
      alt: 'Tailored Minimalist Full-Sleeve Cotton Shirt'
    },
    customisable: true,
    featured: false
  },
  {
    id: 'prod-sh-05',
    name: 'Sartorial Collared Heavy Oxford Shirt',
    slug: 'sartorial-collared-heavy-oxford-shirt',
    category: 'shirts',
    fit: 'Collared',
    description: '220 GSM heavyweight combed Oxford basket-weave with architectural point collar, natural horn buttons, and straight split hems.',
    gsm: 220,
    fabric: '220 GSM Heavy Combed Oxford Weave',
    stockStatus: 'Available for Commission',
    colors: [
      { name: 'Off-White Ivory', hex: '#ECEBE7' },
      { name: 'Obsidian Black', hex: '#131313' },
      { name: 'Silver Fog', hex: '#8E939B' }
    ],
    sizes: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'],
    images: {
      front: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALN83-hP_diOp79f3NcKYb_7yHaX-00Zp7nzvdTHhuKaPACnlfO7rEKlc8OCz877sThJzXi-KfBdTDexIi_e0se8hGobMVyJtE045cyUC8DkHMvp6PFtVURAeUm4KqBCCeo_FGDmY0y0e3ibkBYDWOi_s44jHG-2rxhHqq4u4UGIApr7b6NRF584X_lG4Kw0QkirBRaDgRMCae376O7YEqCij5B03ERInLvaBDKY7P',
      alt: 'Sartorial Collared Heavy Oxford Shirt'
    },
    customisable: true,
    featured: false
  }
];

export interface BusinessContactSettings {
  brandName: string;
  tagline: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  conciergeWhatsAppUrl: string;
  directDesk: string;
  address: string;
}

export const INITIAL_CONTACT_SETTINGS: BusinessContactSettings = {
  brandName: 'OUTFIT THEORY',
  tagline: 'WEAR YOUR IDENTITY.',
  ownerName: 'Bharath J',
  ownerPhone: '919611623514',
  ownerEmail: 'bharathj0109@gmail.com',
  conciergeWhatsAppUrl: 'https://wa.me/919611623514?text=Hello%20Outfit%20Theory%20Concierge%2C%20I%20would%20like%20to%20request%20a%20bespoke%20order.',
  directDesk: 'Bengaluru Atelier & Commission Desk',
  address: 'Indiranagar 100ft Road, Bengaluru, Karnataka 560038, India'
};
