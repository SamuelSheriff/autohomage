// Auto Homage Master Catalog Database
// Attached directly to window object for 100% offline & file:// double-click compatibility

window.AUTO_HOMAGE_DATA = {
  BRAND_LIST: [
    { id: 'all', name: 'All Brands' },
    { id: 'gladiator', name: 'Gladiator Car Tech' },
    { id: 'flamingo', name: 'Flamingo' },
    { id: 'power_eagle', name: 'Power Eagle' },
    { id: 'universal', name: 'Accessories & Mats' }
  ],

  CATEGORIES: [
    { id: 'all', name: 'All Products' },
    { id: 'exterior_detailing', name: 'Exterior Detailing' },
    { id: 'interior_care', name: 'Interior Care' },
    { id: 'tires_wheels', name: 'Tyres & Wheels' },
    { id: 'interior_accessories', name: 'Mats & Accessories' },
    { id: 'air_fresheners', name: 'Air Fresheners' },
    { id: 'tools_safety', name: 'Tools & Safety' },
    { id: 'service_maintenance', name: 'Service & Maintenance' },
    { id: 'braking_system', name: 'Braking System' },
    { id: 'suspension_steering', name: 'Suspension & Steering' },
    { id: 'engine_cooling', name: 'Engine & Cooling' },
    { id: 'transmission_driveline', name: 'Transmission' }
  ],

  MAKES_MODELS_DATABASE: {
    Toyota: ['Corolla', 'Camry', 'RAV4', 'Hilux', 'Land Cruiser', 'Harrier', 'Prado', 'Vitz / Yaris', 'Rush', 'Fortuner'],
    Nissan: ['X-Trail', 'Qashqai', 'Navara', 'Note', 'Tiida', 'Patrol', 'Serena', 'Juke'],
    Honda: ['Civic', 'CR-V', 'Fit / Jazz', 'Accord', 'Vezel / HR-V', 'Pilot'],
    Subaru: ['Outback', 'Forester', 'Impreza', 'XV / Crosstrek', 'Legacy', 'WRX'],
    BMW: ['3 Series', '5 Series', 'X3', 'X5', 'X1', '7 Series'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'GLE', 'GLC', 'A-Class', 'G-Class'],
    Mazda: ['CX-5', 'Mazda3', 'Mazda6', 'Demio / Mazda2', 'CX-3', 'CX-9'],
    Lexus: ['RX 350', 'NX 200t', 'LX 570', 'ES 350', 'IS 250', 'GX 460'],
    Volkswagen: ['Golf', 'Tiguan', 'Passat', 'Polo', 'Touareg', 'T-Cross'],
    Volvo: ['XC90', 'XC60', 'S60', 'V40', 'XC40'],
    Mitsubishi: ['Pajero', 'Outlander', 'Eclipse Cross', 'L200', 'Colt'],
    Isuzu: ['D-Max', 'MU-X', 'Trooper'],
    Hyundai: ['Tucson', 'Santa Fe', 'i10', 'Elantra', 'Creta'],
    Kia: ['Sportage', 'Sorento', 'Picanto', 'Stinger']
  },

  INITIAL_PRODUCTS: [
    // ── GLADIATOR EXTERIOR DETAILING ──
    {
      id: 'AH-GT-0041', code: 'GT41',
      name: 'Gladiator Carnauba Car Wax Paste',
      brand: 'gladiator', category: 'exterior_detailing', section: 'universal',
      price: 400, ctnPrice: 4800, pcsPerCtn: 12, rating: 5.0, reviews: 112, stock: 75,
      image: 'Products/Gradiator Products/Carnauba Car Wax.jpg',
      description: 'Pure Brazilian Carnauba wax formula delivering mirror-like gloss and hydrophobic paint protection.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-GT-0042', code: 'GT42',
      name: 'Gladiator Platinum Hard Wax',
      brand: 'gladiator', category: 'exterior_detailing', section: 'universal',
      price: 500, ctnPrice: 6000, pcsPerCtn: 12, rating: 4.9, reviews: 67, stock: 40,
      image: 'Products/Flamingo Products/Platinum Hard Wax.jpg',
      description: 'Ultra-durable hard synthetic wax shield resistant to salt, road grime, water spots, and harsh sun.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-GT-0043', code: 'GT43',
      name: 'Gladiator Rubbing Compound',
      brand: 'gladiator', category: 'exterior_detailing', section: 'universal',
      price: 400, ctnPrice: 4800, pcsPerCtn: 12, rating: 4.6, reviews: 28, stock: 50,
      image: 'Products/Gradiator Products/Rubbing Compound.jpg',
      description: 'Heavy duty paint correction compound. Eliminates deep scratches, oxidation, and water spots.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-GT-0301', code: 'GT301',
      name: 'Gladiator Wax & Dry Spray Wax',
      brand: 'gladiator', category: 'exterior_detailing', section: 'universal',
      price: 600, ctnPrice: 7200, pcsPerCtn: 12, rating: 4.8, reviews: 44, stock: 65,
      image: 'Products/Gradiator Products/Wax & Dry Spray Wax.jpg',
      description: 'Spray while car is still wet after washing to dry and wax simultaneously without streaks.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-GT-0068', code: 'GT68',
      name: 'Gladiator High-Foam Wash & Wax Shampoo',
      brand: 'gladiator', category: 'exterior_detailing', section: 'universal',
      price: 800, ctnPrice: 4800, pcsPerCtn: 6, rating: 4.9, reviews: 110, stock: 80,
      image: 'Products/Gradiator Products/Wash & Wax Shampoo.jpg',
      description: 'pH-neutral concentrated car wash soap enriched with real wax polymers for scratch-free washing.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-GT-0097', code: 'GT97',
      name: 'Gladiator Clear View Headlight Restorer',
      brand: 'gladiator', category: 'exterior_detailing', section: 'universal',
      price: 500, ctnPrice: 12000, pcsPerCtn: 24, rating: 4.8, reviews: 62, stock: 100,
      image: 'Products/Gradiator Products/Headlight Restorer.jpg',
      description: 'Restores yellowed, hazy headlights to crystal clear clarity without sanding tools.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-GT-G3WAX', code: 'G3-WAX',
      name: 'Gladiator G3 Professional Polishing Wax',
      brand: 'gladiator', category: 'exterior_detailing', section: 'universal',
      price: 750, ctnPrice: 9000, pcsPerCtn: 12, rating: 4.9, reviews: 83, stock: 45,
      image: 'Products/G3 Wax.jpg',
      description: 'Professional-grade G3 polishing wax used by detailing studios for showroom-perfect finish.',
      isUniversal: true, inStock: true
    },

    // ── GLADIATOR INTERIOR CARE ──
    {
      id: 'AH-GT-0004', code: 'GT04',
      name: 'Gladiator Dashboard Polish',
      brand: 'gladiator', category: 'interior_care', section: 'universal',
      price: 200, ctnPrice: 4800, pcsPerCtn: 24, rating: 4.8, reviews: 89, stock: 120,
      image: 'Products/Gradiator Products/Dashboard Polish.jpg',
      description: 'Restores rich shine to dashboard, vinyl, and plastic trim. Protects against UV fading.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-GT-0029', code: 'GT29',
      name: 'Gladiator Premium Leather Polish',
      brand: 'gladiator', category: 'interior_care', section: 'universal',
      price: 500, ctnPrice: 6000, pcsPerCtn: 12, rating: 4.9, reviews: 54, stock: 60,
      image: 'Products/Gradiator Products/Leather Coating.jpg',
      description: 'Deeply nourishes, cleans, and conditions automotive leather seats. Leaves soft texture with no oily residue.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-GT-0028', code: 'GT28',
      name: 'Gladiator Strawberry Dashboard Polish (450ml)',
      brand: 'gladiator', category: 'interior_care', section: 'universal',
      price: 400, ctnPrice: 4800, pcsPerCtn: 12, rating: 4.7, reviews: 31, stock: 85,
      image: 'Products/Gradiator Products/Strawbery Dashboard Polish.jpg',
      description: 'All-surface protectant spray with a refreshing strawberry fragrance. Leaves lasting luster on vinyl and plastics.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-GT-MULTI-DEG', code: 'GT-DEG',
      name: 'Gladiator Multi-Purpose Interior Degreaser',
      brand: 'gladiator', category: 'interior_care', section: 'universal',
      price: 450, ctnPrice: 5400, pcsPerCtn: 12, rating: 4.7, reviews: 48, stock: 70,
      image: 'Products/Gradiator Products/Multi-Purpose Degreaser.jpg',
      description: 'Industrial-strength interior degreaser safe on all automotive surfaces. Removes grease, grime, and stains.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-GT-HANDBOSS', code: 'GT-HF',
      name: 'Handboss Foam Interior Upholstery Cleaner',
      brand: 'gladiator', category: 'interior_care', section: 'universal',
      price: 550, ctnPrice: 6600, pcsPerCtn: 12, rating: 4.8, reviews: 37, stock: 55,
      image: 'Products/Handboss Foam Cleaner.jpg',
      description: 'Rich foam formula that deep-cleans car seats, carpets, and fabric upholstery. Leaves no sticky residue.',
      isUniversal: true, inStock: true
    },

    // ── TYRE & WHEEL CARE ──
    {
      id: 'AH-GT-0010', code: 'GT10',
      name: 'Gladiator High-Gloss Tyre Foam Cleaner',
      brand: 'gladiator', category: 'tires_wheels', section: 'universal',
      price: 400, ctnPrice: 4800, pcsPerCtn: 12, rating: 4.7, reviews: 95, stock: 90,
      image: 'Products/Gradiator Products/Tire Foam.jpg',
      description: 'Instant spray-on tyre cleaning foam that dissolves road grime and leaves a rich black wet shine.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-GT-0085', code: 'GT85',
      name: 'Gladiator Ultra Tyre Shine Spray',
      brand: 'gladiator', category: 'tires_wheels', section: 'universal',
      price: 500, ctnPrice: 6000, pcsPerCtn: 12, rating: 4.9, reviews: 73, stock: 55,
      image: 'Products/Gradiator Products/Tire & Shine.jpg',
      description: 'Long-lasting silicone formula tyre shine spray resistant to sling and rain wash-off.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-FL-0003', code: 'FL-TIREGEL',
      name: 'Flamingo High-Gloss Tyre Gel',
      brand: 'flamingo', category: 'tires_wheels', section: 'universal',
      price: 550, ctnPrice: 6600, pcsPerCtn: 12, rating: 4.7, reviews: 48, stock: 70,
      image: 'Products/Flamingo Products/Tire Gel.jpg',
      description: 'Rich viscous tyre gel for deep black gloss shine. Includes tyre contour applicator pad.',
      isUniversal: true, inStock: true
    },

    // ── FLAMINGO PRODUCTS ──
    {
      id: 'AH-FL-0001', code: 'FL-ACPRO',
      name: 'Flamingo AC Pro Odor Eliminator & Sanitizer',
      brand: 'flamingo', category: 'interior_care', section: 'universal',
      price: 450, ctnPrice: 5400, pcsPerCtn: 12, rating: 4.8, reviews: 39, stock: 45,
      image: 'Products/Flamingo Products/AC PRO.jpg',
      description: 'Kills bacteria and neutralizes persistent odors inside car air conditioning vents.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-FL-0002', code: 'FL-CERAMIC',
      name: 'Flamingo Nano Ceramic Coating Wax',
      brand: 'flamingo', category: 'exterior_detailing', section: 'universal',
      price: 850, ctnPrice: 10200, pcsPerCtn: 12, rating: 5.0, reviews: 84, stock: 30,
      image: 'Products/Flamingo Products/Ceramic Coating Wax.jpg',
      description: 'Advanced SiO2 hydrophobic ceramic seal providing 6+ months of glossy paint shell protection.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-FL-SNOWFOAM', code: 'FL-SF',
      name: 'Flamingo Snow Foam Pre-Wash',
      brand: 'flamingo', category: 'exterior_detailing', section: 'universal',
      price: 650, ctnPrice: 7800, pcsPerCtn: 12, rating: 4.9, reviews: 56, stock: 60,
      image: 'Products/Flamingo Products/Snow Foam.jpg',
      description: 'Thick clinging snow foam that encapsulates dirt for a swirl-free contactless pre-wash rinse.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-FL-HARDWAX', code: 'FL-HW',
      name: 'Flamingo Platinum Hard Wax (Extra Shine)',
      brand: 'flamingo', category: 'exterior_detailing', section: 'universal',
      price: 700, ctnPrice: 8400, pcsPerCtn: 12, rating: 4.9, reviews: 44, stock: 35,
      image: 'Products/Flamingo Products/Platinum Hard Wax.jpg',
      description: 'Ultra premium carnauba blend hard wax with extra hydrophobic properties for all paint finishes.',
      isUniversal: true, inStock: true
    },

    // ── POWER EAGLE ──
    {
      id: 'AH-PE-0001', code: 'PE-DASH',
      name: 'Power Eagle Premium Dashboard Shine',
      brand: 'power_eagle', category: 'interior_care', section: 'universal',
      price: 350, ctnPrice: 4200, pcsPerCtn: 12, rating: 4.6, reviews: 24, stock: 50,
      image: 'Products/Power Eagle Products/Dashboard Shine.jpg',
      description: 'Quick drying interior polish with fresh scent that blocks static dust accumulation.',
      isUniversal: true, inStock: true
    },

    // ── AIR FRESHENERS ──
    {
      id: 'AH-AF-STRAWBERRY', code: 'AF-STR',
      name: 'Strawberry Hanging Car Air Freshener',
      brand: 'universal', category: 'air_fresheners', section: 'universal',
      price: 150, ctnPrice: 3600, pcsPerCtn: 24, rating: 4.8, reviews: 210, stock: 300,
      image: 'Products/Air Freshers/Strawberry Air Freshner.jpg',
      description: 'Long-lasting premium strawberry scented hanging freshener for interior cabin use.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-AF-LEMON', code: 'AF-LEM',
      name: 'Lemon Citrus Car Air Freshener',
      brand: 'universal', category: 'air_fresheners', section: 'universal',
      price: 150, ctnPrice: 3600, pcsPerCtn: 24, rating: 4.7, reviews: 175, stock: 280,
      image: 'Products/Air Freshers/Lemon Air Freshner.jpg',
      description: 'Crisp lemon citrus scent freshener that keeps your cabin smelling clean and invigorating.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-AF-STANDARD', code: 'AF-STD',
      name: 'Premium Gel Air Freshener — Mixed Fragrance',
      brand: 'universal', category: 'air_fresheners', section: 'universal',
      price: 200, ctnPrice: 4800, pcsPerCtn: 24, rating: 4.6, reviews: 143, stock: 200,
      image: 'Products/Air Freshers/Air Freshner.jpg',
      description: 'Long-lasting gel air freshener in premium mixed fragrance. Easy vent clip design.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-AF-SPRAY', code: 'AF-SPR',
      name: 'Concentrated Car Interior Deodorizer Spray',
      brand: 'universal', category: 'air_fresheners', section: 'universal',
      price: 350, ctnPrice: 4200, pcsPerCtn: 12, rating: 4.8, reviews: 88, stock: 130,
      image: 'Products/Air Freshers/Airfreshner.jpg',
      description: 'Professional-strength interior spray that instantly neutralizes smoke, pet, and food odors.',
      isUniversal: true, inStock: true
    },

    // ── TOOLS & SAFETY ──
    {
      id: 'AH-GT-0610', code: 'F0610',
      name: 'Gladiator Tyre Inflator Big 12V (Heavy Duty)',
      brand: 'gladiator', category: 'tools_safety', section: 'universal',
      price: 3000, ctnPrice: 3000, pcsPerCtn: 1, rating: 4.9, reviews: 42, stock: 15,
      image: 'Products/Gradiator Products/Multi-Purpose Degreaser.jpg',
      description: 'Heavy duty 12V 2-cylinder air compressor inflator. Powers from battery clips or cigarette lighter.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-TOOL-FE', code: 'TOOL-FE',
      name: 'Automotive Emergency Powder Fire Extinguisher (1kg)',
      brand: 'universal', category: 'tools_safety', section: 'universal',
      price: 1200, ctnPrice: 1200, pcsPerCtn: 1, rating: 4.9, reviews: 65, stock: 35,
      image: 'Products/Tools & Accessories/Fire Extinguisher.jpg',
      description: 'ABC dry powder extinguisher with mounting bracket for safe car boot or cabin installation.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-TOOL-HORN', code: 'TOOL-HN',
      name: 'Universal Dual-Tone Electric Car Horn',
      brand: 'universal', category: 'tools_safety', section: 'universal',
      price: 800, ctnPrice: 9600, pcsPerCtn: 12, rating: 4.7, reviews: 52, stock: 45,
      image: 'Products/Tools & Accessories/Horn.jpg',
      description: 'High-decibel dual-tone electric horn with waterproof housing. Universal fit with relay harness.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-TOOL-BOX', code: 'TOOL-BX',
      name: 'Compact Emergency Car Tool Box Set',
      brand: 'universal', category: 'tools_safety', section: 'universal',
      price: 2500, ctnPrice: 2500, pcsPerCtn: 1, rating: 4.8, reviews: 34, stock: 20,
      image: 'Products/Tools & Accessories/Tool Box.jpg',
      description: 'Complete 28-piece emergency roadside tool kit including jumper cables, reflective triangle, and first aid kit.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-TOOL-FA', code: 'TOOL-FA',
      name: 'Certified Automotive First Aid Kit',
      brand: 'universal', category: 'tools_safety', section: 'universal',
      price: 950, ctnPrice: 11400, pcsPerCtn: 12, rating: 4.8, reviews: 47, stock: 40,
      image: 'Products/First Aid Kit.jpg',
      description: 'Kenya standards compliant first aid kit with 42 medical items. Required for road safety compliance.',
      isUniversal: true, inStock: true
    },

    // ── STEERING WHEEL COVERS ──
    {
      id: 'AH-SWC-0011', code: 'SWC-01',
      name: 'Premium Leather Steering Wheel Cover (Standard)',
      brand: 'universal', category: 'interior_accessories', section: 'universal',
      price: 800, ctnPrice: 9600, pcsPerCtn: 12, rating: 4.8, reviews: 97, stock: 60,
      image: 'Products/Stearing Wheel Cover/IMG-20260328-WA0011.jpg',
      description: 'Anti-slip genuine leather cover with cushioned grip. Fits 37–38cm steering wheels.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-SWC-0012', code: 'SWC-02',
      name: 'Sport Perforated Leather Steering Wheel Cover',
      brand: 'universal', category: 'interior_accessories', section: 'universal',
      price: 950, ctnPrice: 11400, pcsPerCtn: 12, rating: 4.9, reviews: 63, stock: 50,
      image: 'Products/Stearing Wheel Cover/IMG-20260328-WA0012.jpg',
      description: 'Breathable perforated leather sport cover with red contrast stitching for a sporty look and firm grip.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-SWC-0029', code: 'SWC-03',
      name: 'Carbon Fibre Pattern Steering Wheel Cover',
      brand: 'universal', category: 'interior_accessories', section: 'universal',
      price: 1200, ctnPrice: 14400, pcsPerCtn: 12, rating: 4.9, reviews: 41, stock: 30,
      image: 'Products/Stearing Wheel Cover/IMG-20260328-WA0029.jpg',
      description: 'Premium PVC carbon fibre texture cover. Enhances interior aesthetics with a racing-inspired look.',
      isUniversal: true, inStock: true
    },

    // ── CUSTOM FIT MATS ──
    {
      id: 'AH-MAT-TOYOTA', code: 'MAT-TY',
      name: 'Toyota 4-Piece Heavy Duty Custom Floor Mats',
      brand: 'universal', category: 'interior_accessories', section: 'universal',
      price: 2500, ctnPrice: 2500, pcsPerCtn: 1, rating: 4.9, reviews: 140, stock: 25,
      image: 'Products/Mats/Toyota 4_Piece.jpg',
      description: 'Custom molded all-weather 3D rubber floor mats tailored for Toyota sedans & SUVs.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-MAT-SUBARU', code: 'MAT-SB',
      name: 'Subaru All-Weather Custom Floor Mats Set',
      brand: 'universal', category: 'interior_accessories', section: 'universal',
      price: 2800, ctnPrice: 2800, pcsPerCtn: 1, rating: 4.9, reviews: 98, stock: 20,
      image: 'Products/Mats/Subaru Mat.jpg',
      description: 'Waterproof anti-slip rubber floor mats designed specifically for Subaru Forester & Outback.',
      isUniversal: true, inStock: true
    },
    {
      id: 'AH-MAT-BENZ', code: 'MAT-MB',
      name: 'Mercedes-Benz Luxury Leatherette Floor Mats',
      brand: 'universal', category: 'interior_accessories', section: 'universal',
      price: 4500, ctnPrice: 4500, pcsPerCtn: 1, rating: 5.0, reviews: 76, stock: 12,
      image: 'Products/Mats/Mercedes-Benz Mat.jpg',
      description: 'Luxury diamond-stitched double layer floor mat set for C-Class, E-Class, and GLC.',
      isUniversal: true, inStock: true
    },

    // ── VEHICLE FLUIDS ──
    {
      id: 'AH-FLUID-HB', code: 'FL-HBC',
      name: 'Hydraulic Brake & Clutch Fluid DOT 4',
      brand: 'universal', category: 'service_maintenance', section: 'vehicle',
      price: 450, ctnPrice: 5400, pcsPerCtn: 12, rating: 4.9, reviews: 88, stock: 100,
      image: 'Products/HydraulicBrake & Clutch Fluid.jpg',
      description: 'Premium DOT 4 brake and clutch fluid with high boiling point for fade-resistant performance.',
      isUniversal: false,
      fitment: { makes: ['Toyota', 'Nissan', 'Honda', 'Subaru', 'Mazda', 'BMW', 'Mercedes-Benz', 'Volkswagen'], years: Array.from({length: 30}, (_, i) => 1997 + i), models: ['Corolla', 'Camry', 'RAV4', 'Civic', 'Accord', 'Outback', 'Forester', '3 Series', 'C-Class', 'Golf'] },
      inStock: true
    },
    {
      id: 'AH-FLUID-RAD', code: 'FL-RAD',
      name: 'Premium Radiator Engine Coolant (1L)',
      brand: 'universal', category: 'engine_cooling', section: 'vehicle',
      price: 600, ctnPrice: 7200, pcsPerCtn: 12, rating: 4.9, reviews: 72, stock: 85,
      image: 'Products/Radiator Coolant.jpg',
      description: 'Pre-mixed 50/50 antifreeze and coolant formula with corrosion inhibitors. Suitable for all engine types.',
      isUniversal: false,
      fitment: { makes: ['Toyota', 'Nissan', 'Honda', 'Subaru', 'BMW', 'Mercedes-Benz', 'Mazda', 'Volkswagen'], years: Array.from({length: 30}, (_, i) => 1997 + i), models: ['Corolla', 'Camry', 'RAV4', 'Civic', 'Outback', '3 Series', 'C-Class', 'Golf', 'Tiida'] },
      inStock: true
    },
    {
      id: 'AH-FLUID-WIPER', code: 'WP-BL',
      name: 'Premium Universal Wiper Blade Set (Pair)',
      brand: 'universal', category: 'service_maintenance', section: 'vehicle',
      price: 1200, ctnPrice: 1200, pcsPerCtn: 1, rating: 4.7, reviews: 96, stock: 70,
      image: 'Products/Wiper Blade.jpg',
      description: 'Frameless beam wiper blades with aerodynamic design for streak-free visibility in rain.',
      isUniversal: false,
      fitment: { makes: ['Toyota', 'Nissan', 'Honda', 'Subaru', 'Mazda', 'Hyundai', 'Kia'], years: Array.from({length: 20}, (_, i) => 2007 + i), models: ['Corolla', 'Camry', 'RAV4', 'X-Trail', 'Civic', 'Outback', 'CX-5', 'Tucson', 'Sportage'] },
      inStock: true
    },

    // ── MECHANICAL PARTS ──
    {
      id: 'AH-PART-OILFILTER', code: 'OF-OEM-101',
      name: 'Spin-On Heavy Duty Engine Oil Filter',
      brand: 'gladiator', category: 'service_maintenance', section: 'vehicle',
      price: 650, ctnPrice: 7800, pcsPerCtn: 12, rating: 4.9, reviews: 180, stock: 200,
      image: 'Products/IMG-20260328-WA0033.jpg',
      description: 'High efficiency synthetic blend filter media trapping 99% of engine contaminants.',
      isUniversal: false,
      fitment: { makes: ['Toyota', 'Nissan', 'Honda', 'Subaru', 'Mazda'], years: Array.from({length: 17}, (_, i) => 2010 + i), models: ['Corolla', 'Camry', 'RAV4', 'X-Trail', 'Civic', 'Outback', 'CX-5'] },
      inStock: true
    },
    {
      id: 'AH-PART-SPARKPLUG', code: 'SP-IRIDIUM-IX',
      name: 'Iridium IX High-Performance Spark Plugs (Set of 4)',
      brand: 'universal', category: 'service_maintenance', section: 'vehicle',
      price: 2400, ctnPrice: 2400, pcsPerCtn: 1, rating: 4.9, reviews: 210, stock: 90,
      image: 'Products/Spark Plug.jpg',
      description: 'Ultra-fine 0.6mm iridium tip electrode. Maximum spark energy, throttle response, and fuel efficiency.',
      isUniversal: false,
      fitment: { makes: ['Toyota', 'Nissan', 'Honda', 'Subaru', 'Mazda', 'Volkswagen'], years: Array.from({length: 19}, (_, i) => 2008 + i), models: ['Corolla', 'Vitz / Yaris', 'Civic', 'Fit / Jazz', 'Demio / Mazda2', 'Golf'] },
      inStock: true
    },
    {
      id: 'AH-PART-BRAKEPAD', code: 'BP-CERAMIC-Front',
      name: 'Premium Ceramic Front Brake Pad Set',
      brand: 'gladiator', category: 'braking_system', section: 'vehicle',
      price: 3200, ctnPrice: 3200, pcsPerCtn: 1, rating: 5.0, reviews: 145, stock: 45,
      image: 'Products/IMG-20260328-WA0050.jpg',
      description: 'Dustless noise-free ceramic compound brake pads with anti-squeal shims and hardware kit.',
      isUniversal: false,
      fitment: { makes: ['Toyota', 'Subaru', 'Nissan', 'BMW', 'Lexus'], years: Array.from({length: 15}, (_, i) => 2012 + i), models: ['Harrier', 'Prado', 'Hilux', 'Forester', 'Outback', '3 Series', 'RX 350'] },
      inStock: true
    },
    {
      id: 'AH-PART-SHOCKABSORBER', code: 'SA-GAS-FRONT',
      name: 'Heavy Duty Gas Suspension Shock Absorber Pair',
      brand: 'universal', category: 'suspension_steering', section: 'vehicle',
      price: 8500, ctnPrice: 8500, pcsPerCtn: 1, rating: 4.8, reviews: 64, stock: 18,
      image: 'Products/IMG-20260328-WA0054.jpg',
      description: 'Twin-tube nitrogen gas charged shocks for smooth ride stability on harsh road surfaces.',
      isUniversal: false,
      fitment: { makes: ['Toyota', 'Nissan', 'Subaru', 'Honda', 'Mazda'], years: Array.from({length: 15}, (_, i) => 2012 + i), models: ['RAV4', 'X-Trail', 'CR-V', 'CX-5', 'Forester', 'Prado'] },
      inStock: true
    },
    {
      id: 'AH-PART-CLUTCHKIT', code: 'CK-3PIECE-SET',
      name: '3-Piece OEM Spec Transmission Clutch Kit',
      brand: 'universal', category: 'transmission_driveline', section: 'vehicle',
      price: 14500, ctnPrice: 14500, pcsPerCtn: 1, rating: 5.0, reviews: 19, stock: 8,
      image: 'Products/IMG-20260328-WA0052.jpg',
      description: 'Complete clutch kit including friction disc, pressure plate, and release bearing assembly.',
      isUniversal: false,
      fitment: { makes: ['Toyota', 'Nissan', 'Isuzu', 'Mitsubishi'], years: Array.from({length: 17}, (_, i) => 2010 + i), models: ['Hilux', 'Navara', 'D-Max', 'L200'] },
      inStock: true
    },
    {
      id: 'AH-PART-RAD', code: 'RAD-ALU-OEM',
      name: 'Direct Fit Aluminum Core Radiator Assembly',
      brand: 'universal', category: 'engine_cooling', section: 'vehicle',
      price: 9500, ctnPrice: 9500, pcsPerCtn: 1, rating: 4.9, reviews: 32, stock: 10,
      image: 'Products/Radiator Coolant.jpg',
      description: 'High efficiency brazed aluminum core radiator with heat resistant reinforced plastic tanks.',
      isUniversal: false,
      fitment: { makes: ['Toyota', 'Nissan', 'Honda', 'Subaru'], years: Array.from({length: 13}, (_, i) => 2008 + i), models: ['Corolla', 'Tiida', 'Civic', 'Impreza'] },
      inStock: true
    }
  ],

  INITIAL_ORDERS: [
    {
      id: 'ORD-2026-8801',
      customer: { name: 'Michael Kibet', email: 'm.kibet@gmail.com', phone: '0768081909', city: 'Nairobi', address: 'Westlands, Parklands Rd' },
      vehicle: 'Toyota Prado (2020)',
      items: [
        { id: 'AH-GT-0610', name: 'Gladiator Tyre Inflator Big 12V', qty: 1, price: 3000 },
        { id: 'AH-GT-0041', name: 'Gladiator Carnauba Car Wax Paste', qty: 2, price: 400 },
        { id: 'AH-PART-BRAKEPAD', name: 'Premium Ceramic Front Brake Pad Set', qty: 1, price: 3200 }
      ],
      totalAmount: 7000, paymentMethod: 'M-Pesa / Mobile Money', paymentStatus: 'Paid', status: 'Delivered', date: '2026-07-28 14:22'
    },
    {
      id: 'ORD-2026-8802',
      customer: { name: 'Sarah Jenkins', email: 'sarah.j@outlook.com', phone: '0722334455', city: 'Mombasa', address: 'Nyali Beach Road' },
      vehicle: 'Subaru Forester (2019)',
      items: [
        { id: 'AH-GT-0004', name: 'Gladiator Dashboard Polish', qty: 1, price: 4800 },
        { id: 'AH-MAT-SUBARU', name: 'Subaru All-Weather Custom Floor Mats Set', qty: 1, price: 2800 }
      ],
      totalAmount: 7600, paymentMethod: 'Credit Card', paymentStatus: 'Paid', status: 'Shipped', date: '2026-07-29 09:15'
    }
  ]
};
