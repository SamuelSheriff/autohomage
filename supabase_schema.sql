-- ============================================================
-- AUTO HOMAGE - SUPABASE DATABASE SCHEMA & SEED DATA
-- Copy and paste this script into your Supabase SQL Editor
-- (https://supabase.com/dashboard/project/_/sql)
-- ============================================================

-- 1. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL,
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    category TEXT NOT NULL,
    section TEXT DEFAULT 'universal',
    price INTEGER NOT NULL DEFAULT 0,
    ctn_price INTEGER DEFAULT 0,
    pcs_per_ctn INTEGER DEFAULT 1,
    rating NUMERIC(3,2) DEFAULT 5.0,
    reviews INTEGER DEFAULT 1,
    stock INTEGER DEFAULT 50,
    image TEXT DEFAULT 'Products/Gradiator Products/Multi-Purpose Degreaser.jpg',
    description TEXT,
    is_universal BOOLEAN DEFAULT true,
    fitment_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT,
    customer_email TEXT,
    customer_phone TEXT,
    customer_city TEXT,
    customer_address TEXT,
    vehicle TEXT,
    items_json JSONB,
    total_amount INTEGER DEFAULT 0,
    payment_method TEXT,
    payment_status TEXT DEFAULT 'Paid',
    status TEXT DEFAULT 'Pending',
    date TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS) & Set Permissive Policies for Web App Access
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read access on products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert access on products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update access on products" ON public.products FOR UPDATE USING (true);

CREATE POLICY "Allow anonymous read access on orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert access on orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update access on orders" ON public.orders FOR UPDATE USING (true);

-- 4. Seed Initial Products Data
INSERT INTO public.products (id, code, name, brand, category, section, price, ctn_price, pcs_per_ctn, rating, reviews, stock, image, description, is_universal, fitment_json)
VALUES
('AH-GT-0610', 'F0610', 'Gladiator Tyre Inflator Big 12V (Heavy Duty)', 'gladiator', 'tools_safety', 'universal', 3000, 3000, 1, 4.9, 42, 15, 'Products/Gradiator Products/Multi-Purpose Degreaser.jpg', 'Heavy duty 12V 2-cylinder air compressor inflator. Powers directly from battery clips or cigarette lighter socket.', true, null),
('AH-GT-0004', 'GT04', 'Gladiator Dashboard Polish', 'gladiator', 'interior_care', 'universal', 200, 4800, 24, 4.8, 89, 120, 'Products/Gradiator Products/Dashboard Polish.jpg', 'Restores rich shine to dashboard, vinyl, and plastic trim. Protects against UV fading and cracking.', true, null),
('AH-GT-0029', 'GT29', 'Gladiator Premium Leather Polish', 'gladiator', 'interior_care', 'universal', 500, 6000, 12, 4.9, 54, 60, 'Products/Gradiator Products/Leather Coating.jpg', 'Deeply nourishes, cleans, and conditions automotive leather seats. Leaves soft texture with no oily residue.', true, null),
('AH-GT-0028', 'GT28', 'Gladiator Shine & Protect Spray (450ml)', 'gladiator', 'interior_care', 'universal', 400, 4800, 12, 4.7, 31, 85, 'Products/Gradiator Products/Strawbery Dashboard Polish.jpg', 'All-surface protectant spray for vinyl, plastic, rubber, and trim with long-lasting luster.', true, null),
('AH-GT-0041', 'GT41', 'Gladiator Carnauba Car Wax Paste', 'gladiator', 'exterior_detailing', 'universal', 400, 4800, 12, 5.0, 112, 75, 'Products/Gradiator Products/Carnauba Car Wax.jpg', 'Pure Brazilian Carnauba wax formula delivering mirror-like gloss and hydrophobic paint protection.', true, null),
('AH-GT-0042', 'GT42', 'Gladiator Platinum Hard Wax', 'gladiator', 'exterior_detailing', 'universal', 500, 6000, 12, 4.9, 67, 40, 'Products/Flamingo Products/Platinum Hard Wax.jpg', 'Ultra-durable hard synthetic wax shield resistant to salt, road grime, water spots, and harsh sun.', true, null),
('AH-GT-0043', 'GT43', 'Gladiator Rubbing Compound', 'gladiator', 'exterior_detailing', 'universal', 400, 4800, 12, 4.6, 28, 50, 'Products/Gradiator Products/Rubbing Compound.jpg', 'Heavy duty paint correction compound designed to eliminate deep scratches, oxidation, and water spots.', true, null),
('AH-GT-0301', 'GT301', 'Gladiator Wax & Dry Spray Wax', 'gladiator', 'exterior_detailing', 'universal', 600, 7200, 12, 4.8, 44, 65, 'Products/Gradiator Products/Wax & Dry Spray Wax.jpg', 'Spray while car is still wet after washing to dry and wax simultaneously without streaks.', true, null),
('AH-GT-0010', 'GT10', 'Gladiator High-Gloss Tire Foam Cleaner', 'gladiator', 'tires_wheels', 'universal', 400, 4800, 12, 4.7, 95, 90, 'Products/Gradiator Products/Tire Foam.jpg', 'Instant spray-on tire cleaning foam that dissolves road grime and leaves a rich black wet shine.', true, null),
('AH-GT-0085', 'GT85', 'Gladiator Ultra Tire Shine Spray', 'gladiator', 'tires_wheels', 'universal', 500, 6000, 12, 4.9, 73, 55, 'Products/Gradiator Products/Tire & Shine.jpg', 'Long-lasting silicone formula tire gel spray resistant to sling and rain wash-off.', true, null),
('AH-GT-0068', 'GT68', 'Gladiator High-Foam Wash & Wax Shampoo', 'gladiator', 'exterior_detailing', 'universal', 800, 4800, 6, 4.9, 110, 80, 'Products/Gradiator Products/Wash & Wax Shampoo.jpg', 'Concentrated pH-neutral car wash soap enriched with real wax polymers for scratch-free washing.', true, null),
('AH-GT-0097', 'GT97', 'Gladiator Clear View Headlight Restorer', 'gladiator', 'exterior_detailing', 'universal', 500, 12000, 24, 4.8, 62, 100, 'Products/Gradiator Products/Headlight Restorer.jpg', 'Restores yellowed, hazy headlights to crystal clear clarity without sanding tools.', true, null),
('AH-FL-0001', 'FL-ACPRO', 'Flamingo AC Pro Odor Eliminator & Sanitizer', 'flamingo', 'interior_care', 'universal', 450, 5400, 12, 4.8, 39, 45, 'Products/Flamingo Products/AC PRO.jpg', 'Kills bacteria and neutralizes persistent odors inside car air conditioning vents.', true, null),
('AH-FL-0002', 'FL-CERAMIC', 'Flamingo Nano Ceramic Coating Wax', 'flamingo', 'exterior_detailing', 'universal', 850, 10200, 12, 5.0, 84, 30, 'Products/Flamingo Products/Ceramic Coating Wax.jpg', 'Advanced SiO2 hydrophobic ceramic seal providing 6+ months of glossy paint shell protection.', true, null),
('AH-FL-0003', 'FL-TIREGEL', 'Flamingo High-Gloss Tire Gel', 'flamingo', 'tires_wheels', 'universal', 550, 6600, 12, 4.7, 48, 70, 'Products/Flamingo Products/Tire Gel.jpg', 'Rich viscous tire gel for deep black gloss shine. Includes tire contour applicator pad.', true, null),
('AH-PE-0001', 'PE-DASH', 'Power Eagle Premium Dashboard Shine', 'power_eagle', 'interior_care', 'universal', 350, 4200, 12, 4.6, 24, 50, 'Products/Power Eagle Products/Dashboard Shine.jpg', 'Quick drying interior polish with subtle fresh scent that blocks static dust accumulation.', true, null),
('AH-MAT-TOYOTA', 'MAT-TY', 'Toyota 4-Piece Heavy Duty Custom Floor Mats', 'universal', 'interior_accessories', 'universal', 2500, 2500, 1, 4.9, 140, 25, 'Products/Mats/Toyota 4_Piece.jpg', 'Custom molded all-weather 3D rubber floor mats tailored for Toyota sedans & SUVs.', true, null),
('AH-MAT-SUBARU', 'MAT-SB', 'Subaru All-Weather Custom Floor Mats Set', 'universal', 'interior_accessories', 'universal', 2800, 2800, 1, 4.9, 98, 20, 'Products/Mats/Subaru Mat.jpg', 'Waterproof anti-slip rubber floor mats designed specifically for Subaru Forester & Outback.', true, null),
('AH-MAT-BENZ', 'MAT-MB', 'Mercedes-Benz Luxury Leatherette Floor Mats', 'universal', 'interior_accessories', 'universal', 4500, 4500, 1, 5.0, 76, 12, 'Products/Mats/Mercedes-Benz Mat.jpg', 'Luxury diamond-stitched double layer floor mat set for C-Class, E-Class, and GLC.', true, null),
('AH-ACC-EXTINGUISHER', 'TOOL-FE', 'Automotive Emergency Powder Fire Extinguisher (1kg)', 'universal', 'tools_safety', 'universal', 1200, 1200, 1, 4.9, 65, 35, 'Products/Tools & Accessories/Fire Extinguisher.jpg', 'ABC dry powder extinguisher with mounting bracket for safe car boot or cabin installation.', true, null)
ON CONFLICT (id) DO NOTHING;

-- 5. Seed Demo Orders
INSERT INTO public.orders (id, customer_name, customer_email, customer_phone, customer_city, customer_address, vehicle, items_json, total_amount, payment_method, payment_status, status, date)
VALUES
('ORD-2026-8801', 'Michael Kibet', 'm.kibet@gmail.com', '0799939056', 'Nairobi', 'Westlands, Parklands Rd', 'Toyota Prado (2020)', '[{"id": "AH-GT-0610", "name": "Gladiator Tyre Inflator Big 12V", "qty": 1, "price": 3000, "type": "unit"}]'::jsonb, 3480, 'M-Pesa / Mobile Money', 'Paid', 'Delivered', '2026-07-28 14:22')
ON CONFLICT (id) DO NOTHING;
