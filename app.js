// AUTO HOMAGE - WARM LUXURY GOLD AUTOMOTIVE E-COMMERCE & OPERATIONS ENGINE
// Integrates with Python 3 + SQLite REST API backend (server.py) with offline fallback

(function() {
  const localData = window.AUTO_HOMAGE_DATA || {};

  const BRAND_LIST = localData.BRAND_LIST || [
    { id: 'all', name: 'All Authorized Brands' },
    { id: 'gladiator', name: 'Gladiator Car Tech' },
    { id: 'flamingo', name: 'Flamingo Products' },
    { id: 'power_eagle', name: 'Power Eagle' },
    { id: 'universal', name: 'Custom Accessories & Mats' }
  ];

  const CATEGORIES = localData.CATEGORIES || [
    { id: 'all', name: 'All Categories' },
    { id: 'exterior_detailing', name: 'Exterior Detailing & Wax' },
    { id: 'interior_care', name: 'Interior Care & Polish' },
    { id: 'tires_wheels', name: 'Tyre & Wheel Care' },
    { id: 'interior_accessories', name: 'Mats & Steering Covers' },
    { id: 'air_fresheners', name: 'Air Fresheners' },
    { id: 'tools_safety', name: 'Tools & Emergency Safety' },
    { id: 'service_maintenance', name: 'Engine Filters & Plugs' },
    { id: 'braking_system', name: 'Brake System Parts' },
    { id: 'engine_cooling', name: 'Radiator & Cooling' },
    { id: 'suspension_steering', name: 'Suspension & Shocks' },
    { id: 'transmission_driveline', name: 'Transmission & Clutch' }
  ];

  const MAKES_MODELS_DATABASE = localData.MAKES_MODELS_DATABASE || {};
  const INITIAL_PRODUCTS = localData.INITIAL_PRODUCTS || [];
  const INITIAL_ORDERS = localData.INITIAL_ORDERS || [];

  const OFFICIAL_LOGO = 'logo.png';
  const HERO_SUPERCAR_IMG = 'hero_car.png';
  const HOTLINE_PHONE = '0768081909';
  const OFFICIAL_EMAIL = 'autohomage@gmail.com';
  const SOCIAL_HANDLE = 'Auto Homage';

  const HERO_SLIDES = [
    {
      id: 0,
      image: 'Hero Image Carousel/hero_car.png',
      kicker: '🛡️ CERTIFIED GENUINE AUTOMOTIVE CARE & SPARES • AUTHORIZED DISTRIBUTOR',
      title: 'QUALITY PARTS.<br><span class="hero-gold-gradient">PREMIUM CARE.</span>',
      desc: 'Discover high-gloss detailing formulas, nano ceramic wax shields, custom-fit 3D mats, and precision engine spares. Serving vehicle owners, garages & wholesale dealers across Kenya.',
      btnPrimary: { text: 'SHOP NOW →', action: 'scroll-to-catalog' },
      btnSecondary: { text: 'CONTACT US →', action: 'set-page', id: 'contact' }
    },
    {
      id: 1,
      image: 'Hero Image Carousel/Products Showcase.png',
      kicker: '✨ GLADIATOR & FLAMINGO OFFICIAL CATALOG',
      title: 'PREMIUM DETAILING &<br><span class="hero-gold-gradient">CAR CARE FORMULAS</span>',
      desc: 'Keep your vehicle showroom clean with multi-purpose degreasers, tyre shines, dashboard polishes, and ceramic spray wax. Wholesale carton rates available.',
      btnPrimary: { text: 'SHOP DETAILING →', action: 'set-category', id: 'exterior_detailing' },
      btnSecondary: { text: 'CALL HOTLINE', href: `tel:${HOTLINE_PHONE}` }
    },
    {
      id: 2,
      image: 'Hero Image Carousel/Interior & Mats.png',
      kicker: '🚗 CUSTOM VEHICLE ACCESSORIES',
      title: 'CUSTOM FIT 3D MATS &<br><span class="hero-gold-gradient">LUXURY INTERIORS</span>',
      desc: 'All-weather 3D bucket floor mats, premium leather steering covers, and interior protections tailor-made for your vehicle make, model, and year.',
      btnPrimary: { text: 'EXPLORE MATS →', action: 'set-category', id: 'interior_accessories' },
      btnSecondary: { text: 'SELECT YOUR VEHICLE', action: 'scroll-to-catalog' }
    },
    {
      id: 3,
      image: 'Hero Image Carousel/Mechanic Scene.png',
      kicker: '🔧 ENGINE & BRAKE MAINTENANCE',
      title: 'PRECISION SERVICE &<br><span class="hero-gold-gradient">GENUINE OEM SPARES</span>',
      desc: 'High-durability iridium spark plugs, ceramic brake pads, oil filters, and suspension parts for smooth, reliable performance on Kenya roads.',
      btnPrimary: { text: 'SHOP ENGINE SPARES →', action: 'set-category', id: 'service_maintenance' },
      btnSecondary: { text: 'WHOLESALE CARTON RATES', action: 'set-pricemode', id: 'carton' }
    },
    {
      id: 4,
      image: 'Hero Image Carousel/Speedometer.png',
      kicker: '🚀 NATIONWIDE EXPRESS DELIVERY',
      title: 'FAST DELIVERY ACROSS<br><span class="hero-gold-gradient">ALL 47 COUNTIES</span>',
      desc: 'Same-day Pay on Delivery in Nairobi & environs. Bulk wholesale carton discounts available for garages, auto dealers, and spare part retailers.',
      btnPrimary: { text: 'ORDER VIA WHATSAPP', href: `https://wa.me/254${HOTLINE_PHONE.replace(/^0/, '')}` },
      btnSecondary: { text: 'ABOUT AUTO HOMAGE', action: 'set-page', id: 'about' }
    }
  ];

  const ICONS = {
    car: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`,
    cart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
    search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    shield: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    phone: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    chart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    lock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    plus: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    email: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    facebook: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    instagram: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
    tiktok: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-5.2-1.74 2.89 2.89 0 0 1 2.31-2.84V7.59a6.34 6.34 0 0 0-5.18 6.16 6.34 6.34 0 1 0 10.86-4.52A8.32 8.32 0 0 0 19.59 10z"/></svg>`
  };

  class AutoHomageApp {
    constructor() {
      this.activeView = 'store';
      this.activePage = 'shop'; // 'shop' | 'contact'
      this.products = [...INITIAL_PRODUCTS];
      this.orders = [...INITIAL_ORDERS];
      
      const savedCart = localStorage.getItem('auto_homage_cart');
      this.cart = savedCart ? JSON.parse(savedCart) : [];

      this.activeVehicle = { make: '', model: '', year: '' };
      this.activeBrand = 'all';
      this.activeCategory = 'all';
      this.priceMode = 'unit';
      this.searchQuery = '';
      this.currentPage = 1;
      this.productsPerPage = 24;
      
      this.selectedProduct = null;
      this.isCartOpen = false;
      this.isCheckoutOpen = false;
      this.viewingOrder = null;

      // Hero Slider State
      this.currentHeroSlide = 0;
      this.heroSlideTimer = null;

      // Mobile Navigation Drawer State
      this.isMobileMenuOpen = false;

      // Admin Authentication & Sub-Tab State
      this.adminPassword = localStorage.getItem('autohomage_admin_password') || '@Angel10';
      this.isAdminAuthenticated = sessionStorage.getItem('autohomage_admin_auth') === 'true';
      this.isAdminAuthModalOpen = false;
      this.isAddProductModalOpen = false;
      this.adminActiveTab = 'inventory'; // 'inventory' | 'orders' | 'security'
      this.adminSearchQuery = '';
      this.secretClickCount = 0;

      this.supabaseClient = null;
      this.initSupabase();

      this.init();
    }

    initSupabase() {
      try {
        const config = window.SUPABASE_CONFIG;
        if (window.supabase && config && config.url && config.anonKey && !config.url.includes('YOUR_SUPABASE_PROJECT_URL')) {
          this.supabaseClient = window.supabase.createClient(config.url, config.anonKey);
          console.log('[INFO] Supabase database client initialized successfully.');
        }
      } catch (err) {
        this.supabaseClient = null;
      }
    }

    async init() {
      this.bindEvents();
      await this.fetchBackendData();
      
      // Secret URL hash / query parameter trigger (#admin or ?admin=true)
      if (window.location.hash === '#admin' || window.location.search.includes('admin=true')) {
        if (!this.isAdminAuthenticated) {
          this.isAdminAuthModalOpen = true;
        } else {
          this.activeView = 'admin';
        }
      }
      
      this.render();
    }

    async fetchBackendData() {
      // 1. Try Supabase Cloud Database if configured
      if (this.supabaseClient) {
        try {
          const { data: prodData, error: prodErr } = await this.supabaseClient.from('products').select('*');
          if (!prodErr && prodData && prodData.length > 0) {
            this.products = prodData.map(p => ({
              ...p,
              ctnPrice: p.ctn_price ?? p.price,
              pcsPerCtn: p.pcs_per_ctn ?? 1,
              isUniversal: p.is_universal ?? true,
              fitment: typeof p.fitment_json === 'string' ? JSON.parse(p.fitment_json) : p.fitment_json
            }));
          }

          const { data: ordData, error: ordErr } = await this.supabaseClient.from('orders').select('*').order('created_at', { ascending: false });
          if (!ordErr && ordData && ordData.length > 0) {
            this.orders = ordData.map(o => ({
              ...o,
              totalAmount: o.total_amount,
              paymentMethod: o.payment_method,
              paymentStatus: o.payment_status,
              customer: {
                name: o.customer_name,
                email: o.customer_email,
                phone: o.customer_phone,
                city: o.customer_city,
                address: o.customer_address
              },
              items: typeof o.items_json === 'string' ? JSON.parse(o.items_json) : (o.items_json || [])
            }));
          }
          return;
        } catch (err) {
          // Fallback to REST API
        }
      }

      // 2. Python REST API Server fallback
      try {
        const prodRes = await fetch('/api/products');
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          if (prodData && prodData.length > 0) {
            this.products = prodData;
          }
        }

        const ordRes = await fetch('/api/orders');
        if (ordRes.ok) {
          const ordData = await ordRes.json();
          if (ordData) {
            this.orders = ordData;
          }
        }
      } catch (err) {
        // Offline / file protocol fallback
        const savedOrders = localStorage.getItem('auto_homage_orders');
        if (savedOrders) this.orders = JSON.parse(savedOrders);
      }
    }

    saveOrders() {
      localStorage.setItem('auto_homage_orders', JSON.stringify(this.orders));
    }

    saveCart() {
      localStorage.setItem('auto_homage_cart', JSON.stringify(this.cart));
      this.updateCartBadge();
    }

    updateCartBadge() {
      const badge = document.getElementById('cartBadgeCount');
      if (badge) {
        const count = this.cart.reduce((total, item) => total + item.qty, 0);
        badge.textContent = count;
      }
    }

    bindEvents() {
      // Secret Keyboard Shortcut: Ctrl + Shift + A (or Cmd + Shift + A) to open Admin Portal
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
          e.preventDefault();
          if (!this.isAdminAuthenticated) {
            this.isAdminAuthModalOpen = true;
            this.renderAdminAuthModal();
          } else {
            this.activeView = this.activeView === 'admin' ? 'store' : 'admin';
            this.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }
      });

      document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-action]');
        if (!target) return;

        const action = target.dataset.action;
        const id = target.dataset.id;

        switch (action) {
          case 'toggle-view':
            if (this.activeView === 'store') {
              if (!this.isAdminAuthenticated) {
                this.isAdminAuthModalOpen = true;
                this.renderAdminAuthModal();
              } else {
                this.activeView = 'admin';
                this.render();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            } else {
              this.activeView = 'store';
              this.render();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            break;

          case 'close-admin-auth':
            this.isAdminAuthModalOpen = false;
            this.renderAdminAuthModal();
            break;

          case 'admin-logout':
            this.isAdminAuthenticated = false;
            sessionStorage.removeItem('autohomage_admin_auth');
            this.activeView = 'store';
            this.render();
            this.showToast('Logged out of Admin Operations Portal');
            break;

          case 'admin-set-tab':
            this.adminActiveTab = id;
            this.renderAdminDashboard();
            break;

          case 'open-add-product':
            this.isAddProductModalOpen = true;
            this.renderAddProductModal();
            break;

          case 'close-add-product':
            this.isAddProductModalOpen = false;
            this.renderAddProductModal();
            break;

          case 'save-product-price':
            this.handleSaveProductRow(id);
            break;

          case 'order-whatsapp-product':
            this.handleDirectWhatsAppOrder(id);
            break;

          case 'set-page':
            this.activePage = id;
            this.activeView = 'store';
            this.isMobileMenuOpen = false;
            this.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;

          case 'toggle-mobile-menu':
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
            this.renderHeader();
            break;

          case 'close-mobile-menu':
            this.isMobileMenuOpen = false;
            this.renderHeader();
            break;

          case 'open-cart':
            this.isCartOpen = true;
            this.renderCartDrawer();
            break;

          case 'close-cart':
            this.isCartOpen = false;
            this.renderCartDrawer();
            break;

          case 'open-checkout':
            this.isCartOpen = false;
            this.isCheckoutOpen = true;
            this.renderCartDrawer();   // removes cart drawer from DOM
            this.renderCheckoutModal(); // shows checkout on top
            break;

          case 'close-checkout':
            this.isCheckoutOpen = false;
            this.renderCheckoutModal();
            break;

          case 'set-brand':
            this.activeBrand = id;
            this.activePage = 'shop';
            this.currentPage = 1;
            this.render();
            setTimeout(() => document.getElementById('catalogSection')?.scrollIntoView({ behavior: 'smooth' }), 80);
            break;

          case 'set-category':
            this.activeCategory = id;
            this.activePage = 'shop';
            this.currentPage = 1;
            this.render();
            setTimeout(() => document.getElementById('catalogSection')?.scrollIntoView({ behavior: 'smooth' }), 80);
            break;

          case 'set-pricemode':
            this.priceMode = id;
            this.currentPage = 1;
            this.renderStorefront();
            break;

          case 'view-product':
            this.selectedProduct = this.products.find(p => p.id === id);
            this.renderProductModal();
            break;

          case 'close-modal':
            this.selectedProduct = null;
            this.renderProductModal();
            break;

          case 'add-to-cart':
            this.addToCart(id);
            break;

          case 'remove-cart-item':
            this.removeFromCart(parseInt(id));
            break;

          case 'update-qty':
            this.updateCartQty(parseInt(id), parseInt(target.dataset.change));
            break;



          case 'view-order-receipt':
            this.viewingOrder = this.orders.find(o => o.id === id);
            this.renderReceiptModal();
            break;

          case 'close-receipt':
            this.viewingOrder = null;
            this.renderReceiptModal();
            break;

          case 'clear-vehicle':
            this.activeVehicle = { make: '', model: '', year: '' };
            this.renderStorefront();
            break;

          case 'scroll-to-catalog':
            document.getElementById('catalogSection')?.scrollIntoView({ behavior: 'smooth' });
            break;

          case 'prev-hero-slide':
            this.prevHeroSlide();
            break;

          case 'next-hero-slide':
            this.nextHeroSlide();
            break;

          case 'set-hero-slide':
            this.goToHeroSlide(parseInt(id));
            break;
        }
      });

      document.addEventListener('input', (e) => {
        if (e.target.id === 'productSearchInput') {
          this.searchQuery = e.target.value.toLowerCase();
          this.currentPage = 1;
          this.renderProductsList();
        } else if (e.target.id === 'adminInventorySearch') {
          this.adminSearchQuery = e.target.value.toLowerCase();
          this.renderAdminInventoryTable();
        }
      });
    }

    handleDirectWhatsAppOrder(productId) {
      const p = this.products.find(item => item.id === productId);
      if (!p) return;
      const price = this.priceMode === 'carton' ? p.ctnPrice : p.price;
      const rateLabel = this.priceMode === 'carton' ? `Wholesale Carton (${p.pcsPerCtn} pcs)` : 'Single Unit';
      const msg = encodeURIComponent(
        `Hello Auto Homage! I want to order:\nCode: ${p.code}\nName: ${p.name}\nPrice: KSh ${price.toLocaleString()} (${rateLabel})\nPlease assist me with delivery.`
      );
      window.open(`https://wa.me/254${HOTLINE_PHONE.replace(/^0/, '')}?text=${msg}`, '_blank');
    }

    handleAdminImageUpload(productId, fileInput) {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const imgPrev = document.getElementById(`adminImgPrev_${productId}`);
        if (imgPrev) imgPrev.src = dataUrl;
        const imgInput = document.querySelector(`input[data-image-id="${productId}"]`);
        if (imgInput) imgInput.value = dataUrl;
        this.showToast('Picture uploaded! Click "Save Changes" to save.');
      };
      reader.readAsDataURL(file);
    }

    handleNewProdImageUpload(fileInput) {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const imgPrev = document.getElementById('newProdPreview');
        if (imgPrev) imgPrev.src = dataUrl;
        const urlInput = document.getElementById('newProdImageUrl');
        if (urlInput) urlInput.value = dataUrl;
      };
      reader.readAsDataURL(file);
    }

    async handleSaveProductRow(productId) {
      const nameInput = document.querySelector(`input[data-name-id="${productId}"]`);
      const priceInput = document.querySelector(`input[data-price-id="${productId}"]`);
      const ctnPriceInput = document.querySelector(`input[data-ctnprice-id="${productId}"]`);
      const stockInput = document.querySelector(`input[data-stock-id="${productId}"]`);
      const imageInput = document.querySelector(`input[data-image-id="${productId}"]`);

      if (!priceInput || !ctnPriceInput || !stockInput) return;

      const newName = nameInput ? nameInput.value.trim() : null;
      const newPrice = parseInt(priceInput.value) || 0;
      const newCtnPrice = parseInt(ctnPriceInput.value) || 0;
      const newStock = parseInt(stockInput.value) || 0;
      const newImage = imageInput ? imageInput.value.trim() : null;

      const p = this.products.find(item => item.id === productId);
      if (p) {
        if (newName) p.name = newName;
        p.price = newPrice;
        p.ctnPrice = newCtnPrice;
        p.stock = newStock;
        if (newImage) p.image = newImage;

        const updatePayload = {
          name: p.name,
          price: p.price,
          ctnPrice: p.ctnPrice,
          stock: p.stock,
          image: p.image
        };

        if (this.supabaseClient) {
          try {
            await this.supabaseClient.from('products').update({
              name: p.name,
              price: p.price,
              ctn_price: p.ctnPrice,
              stock: p.stock,
              image: p.image
            }).eq('id', productId);
          } catch (err) {
            // Supabase update error
          }
        }

        try {
          await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatePayload)
          });
        } catch (err) {
          // Offline fallback
        }

        this.showToast(`Saved changes for "${p.name}" (SKU: ${p.code})`);
      }
    }

    async handleAdminLoginSubmit(e) {
      e.preventDefault();
      const errEl = document.getElementById('adminAuthError');
      const submitBtn = document.getElementById('adminAuthSubmitBtn');
      
      // Check lockout window (30-second lockout after 5 failed attempts)
      const now = Date.now();
      if (this.adminLockoutUntil && now < this.adminLockoutUntil) {
        const remainingSec = Math.ceil((this.adminLockoutUntil - now) / 1000);
        if (errEl) {
          errEl.style.display = 'block';
          errEl.innerHTML = `⚠️ Account locked due to multiple failed attempts. Please wait <strong>${remainingSec}s</strong>.`;
        }
        return;
      }

      const username = e.target.adminUsername.value.trim();
      const pass = e.target.adminPassword.value;

      const isValid = (username.toLowerCase() === 'dauti' && pass === this.adminPassword);

      if (isValid) {
        this.adminLoginAttempts = 0;
        this.adminLockoutUntil = 0;
        this.isAdminAuthenticated = true;
        sessionStorage.setItem('autohomage_admin_auth', 'true');
        this.isAdminAuthModalOpen = false;
        this.renderAdminAuthModal();
        this.activeView = 'admin';
        this.render();
        this.showToast('Authentication Successful. Welcome, Dauti.');
      } else {
        this.adminLoginAttempts = (this.adminLoginAttempts || 0) + 1;
        if (errEl) {
          errEl.style.display = 'block';
          if (this.adminLoginAttempts >= 5) {
            this.adminLockoutUntil = Date.now() + 30000; // 30s lockout
            errEl.innerHTML = `🛑 Too many failed attempts. Security lockout active for 30 seconds.`;
          } else {
            const left = 5 - this.adminLoginAttempts;
            errEl.innerHTML = `✕ Invalid username or password. (${left} attempt${left > 1 ? 's' : ''} remaining before lockout)`;
          }
        }
      }
    }

    handleSecretFooterClick() {
      this.secretClickCount = (this.secretClickCount || 0) + 1;
      if (this.secretClickCount >= 3) {
        this.secretClickCount = 0;
        if (!this.isAdminAuthenticated) {
          this.isAdminAuthModalOpen = true;
          this.renderAdminAuthModal();
        } else {
          this.activeView = 'admin';
          this.render();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
      setTimeout(() => { this.secretClickCount = 0; }, 2000);
    }

    handleChangeAdminPasswordSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const currentPass = form.currentAdminPassword.value;
      const newPass = form.newAdminPassword.value;
      const confirmPass = form.confirmAdminPassword.value;

      const errEl = document.getElementById('changePwdError');
      const successEl = document.getElementById('changePwdSuccess');
      if (errEl) errEl.style.display = 'none';
      if (successEl) successEl.style.display = 'none';

      if (currentPass !== this.adminPassword) {
        if (errEl) {
          errEl.style.display = 'block';
          errEl.textContent = '✕ Current password is incorrect.';
        }
        return;
      }

      if (newPass.length < 6) {
        if (errEl) {
          errEl.style.display = 'block';
          errEl.textContent = '✕ New password must be at least 6 characters long.';
        }
        return;
      }

      if (newPass !== confirmPass) {
        if (errEl) {
          errEl.style.display = 'block';
          errEl.textContent = '✕ New password and confirmation do not match.';
        }
        return;
      }

      this.adminPassword = newPass;
      localStorage.setItem('autohomage_admin_password', newPass);

      if (successEl) {
        successEl.style.display = 'block';
        successEl.textContent = '✓ Admin password changed successfully!';
      }

      form.reset();
      this.showToast('Admin password updated successfully!');
    }

    async handleAddProductSubmit(e) {
      e.preventDefault();
      const form = e.target;

      const code = form.prodCode.value;
      const name = form.prodName.value;
      const brand = form.prodBrand.value;
      const category = form.prodCategory.value;
      const price = parseInt(form.prodPrice.value);
      const ctnPrice = parseInt(form.prodCtnPrice.value || price);
      const pcsPerCtn = parseInt(form.prodPcsPerCtn.value || 1);
      const stock = parseInt(form.prodStock.value || 50);
      const isUniversal = form.prodApplication.value === 'universal';
      // Read image from the new upload/URL input
      const imageUrlInput = document.getElementById('newProdImageUrl');
      const image = (imageUrlInput && imageUrlInput.value.trim()) || 'Products/Gradiator Products/Multi-Purpose Degreaser.jpg';
      const description = form.prodDescription.value || '';


      const newProd = {
        id: 'AH-PRD-' + Math.floor(10000 + Math.random() * 90000),
        code: code || ('AH' + Math.floor(100 + Math.random() * 900)),
        name,
        brand,
        category,
        section: isUniversal ? 'universal' : 'vehicle',
        price,
        ctnPrice,
        pcsPerCtn,
        rating: 5.0,
        reviews: 1,
        stock,
        image,
        description,
        isUniversal,
        fitment: null
      };

      if (this.supabaseClient) {
        try {
          await this.supabaseClient.from('products').insert([{
            id: newProd.id,
            code: newProd.code,
            name: newProd.name,
            brand: newProd.brand,
            category: newProd.category,
            section: newProd.section,
            price: newProd.price,
            ctn_price: newProd.ctnPrice,
            pcs_per_ctn: newProd.pcsPerCtn,
            rating: newProd.rating,
            reviews: newProd.reviews,
            stock: newProd.stock,
            image: newProd.image,
            description: newProd.description,
            is_universal: newProd.isUniversal
          }]);
        } catch (err) {
          // Supabase insert error
        }
      }

      try {
        await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProd)
        });
      } catch (err) {
        // Offline fallback
      }

      this.products.unshift(newProd);
      this.isAddProductModalOpen = false;
      this.renderAddProductModal();
      this.renderAdminDashboard();
      this.showToast(`New product "${name}" added to catalog!`);
    }

    addToCart(productId, qty = 1) {
      const product = this.products.find(p => p.id === productId);
      if (!product) return;

      const price = this.priceMode === 'carton' ? product.ctnPrice : product.price;
      const existingIndex = this.cart.findIndex(item => item.id === productId && item.priceMode === this.priceMode);

      if (existingIndex > -1) {
        this.cart[existingIndex].qty += qty;
      } else {
        this.cart.push({
          id: product.id,
          name: product.name,
          code: product.code,
          price: price,
          priceMode: this.priceMode,
          image: product.image,
          qty: qty,
          pcsPerCtn: product.pcsPerCtn
        });
      }

      this.saveCart();
      this.updateCartBadge();

      // Show toast — never auto-open the cart
      this.showToast(`✅ Added: ${product.name.substring(0, 28)}`, '🛒 View Cart', () => {
        this.isCartOpen = true;
        this.renderCartDrawer();
      });

      // If cart drawer is already open, refresh it in place
      if (this.isCartOpen) {
        this.renderCartDrawer();
      }
    }

    updateCartBadge() {
      const badge = document.getElementById('cartBadge');
      if (badge) {
        const total = this.cart.reduce((t, i) => t + i.qty, 0);
        badge.textContent = total;
        badge.style.display = total > 0 ? 'flex' : 'none';
      }
    }

    removeFromCart(index) {
      this.cart.splice(index, 1);
      this.saveCart();
      this.renderCartDrawer();
    }

    updateCartQty(index, change) {
      if (this.cart[index]) {
        this.cart[index].qty += change;
        if (this.cart[index].qty <= 0) {
          this.cart.splice(index, 1);
        }
        this.saveCart();
        this.renderCartDrawer();
      }
    }

    handleVehicleFilterSubmit(e) {
      e.preventDefault();
      const make = document.getElementById('ymmMakeSelect').value;
      const model = document.getElementById('ymmModelSelect').value;
      const year = document.getElementById('ymmYearSelect').value;

      this.activeVehicle = { make, model, year };
      this.renderStorefront();
      document.getElementById('catalogSection')?.scrollIntoView({ behavior: 'smooth' });
    }

    async handleCheckoutSubmit(e) {
      e.preventDefault();
      if (this.cart.length === 0) return;

      const form = e.target;
      const formData = new FormData(form);

      const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      const tax = Math.round(subtotal * 0.16);
      const total = subtotal + tax;

      const customerName = formData.get('customerName') || 'Valued Customer';
      const customerPhone = formData.get('customerPhone') || '';
      const customerEmail = formData.get('customerEmail') || '';
      const customerCity = formData.get('customerCity') || 'Nairobi';
      const customerAddress = formData.get('customerAddress') || 'Delivery Address';
      const paymentMethod = formData.get('paymentMethod') || 'Cash on Delivery';

      const newOrder = {
        id: 'ORD-2026-' + Math.floor(1000 + Math.random() * 9000),
        customer: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          city: customerCity,
          address: customerAddress
        },
        vehicle: this.activeVehicle.make 
          ? `${this.activeVehicle.make} ${this.activeVehicle.model} (${this.activeVehicle.year})`
          : 'Universal Order',
        items: [...this.cart],
        totalAmount: total,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
        status: 'Pending',
        date: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };

      // Format WhatsApp order message for store owner
      const itemLines = newOrder.items.map((item, idx) => {
        const rateType = item.priceMode === 'carton' ? `Wholesale Carton (${item.pcsPerCtn} pcs)` : 'Single Unit';
        return `${idx + 1}. *${item.name}* (Code: ${item.code})\n   Qty: ${item.qty} x KSh ${item.price.toLocaleString()} (${rateType}) = KSh ${(item.price * item.qty).toLocaleString()}`;
      }).join('\n');

      const waMsg = 
`🛍️ *NEW ORDER RECEIVED - AUTO HOMAGE*

📋 *Order Ref:* ${newOrder.id}
📅 *Date:* ${newOrder.date}

👤 *CUSTOMER DETAILS:*
• Name: ${newOrder.customer.name}
• Phone: ${newOrder.customer.phone}
• Email: ${newOrder.customer.email || 'N/A'}
• Location: ${newOrder.customer.address}, ${newOrder.customer.city}
• Vehicle: ${newOrder.vehicle}

💳 *PAYMENT METHOD:*
• ${newOrder.paymentMethod} (${newOrder.paymentStatus})

🛒 *ORDER ITEMS:*
${itemLines}

📊 *SUMMARY:*
• Subtotal: KSh ${subtotal.toLocaleString()}
• VAT (16%): KSh ${tax.toLocaleString()}
💰 *TOTAL AMOUNT:* KSh ${newOrder.totalAmount.toLocaleString()}

Please confirm delivery schedule for this order. Thank you!`;

      const targetPhone = '254' + HOTLINE_PHONE.replace(/^0/, '');
      const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waMsg)}`;
      newOrder.waUrl = waUrl;

      // ⚠️ IMPORTANT: Open WhatsApp NOW — before any await calls.
      // iOS Safari blocks window.open() if called after an await (loses user gesture context).
      window.open(waUrl, '_blank');

      // Now do async DB work (after WhatsApp is already opened)
      if (this.supabaseClient) {
        try {
          await this.supabaseClient.from('orders').insert([{
            id: newOrder.id,
            customer_name: newOrder.customer.name,
            customer_email: newOrder.customer.email,
            customer_phone: newOrder.customer.phone,
            customer_city: newOrder.customer.city,
            customer_address: newOrder.customer.address,
            vehicle: newOrder.vehicle,
            items_json: newOrder.items,
            total_amount: newOrder.totalAmount,
            payment_method: newOrder.paymentMethod,
            payment_status: newOrder.paymentStatus,
            status: newOrder.status,
            date: newOrder.date
          }]);
        } catch (err) {
          // Supabase insert error — non-critical
        }
      }

      try {
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrder)
        });
      } catch (err) {
        // Fallback — non-critical
      }

      // Update local state
      this.orders.unshift(newOrder);
      this.saveOrders();
      
      this.cart = [];
      this.saveCart();
      this.updateCartBadge();

      this.isCheckoutOpen = false;
      this.viewingOrder = newOrder;

      // Targeted renders only — do NOT call this.render() as it rebuilds the whole page
      this.renderCheckoutModal();  // closes checkout modal (isCheckoutOpen = false)
      this.renderReceiptModal();   // opens receipt modal (viewingOrder is set)

      this.showToast('✅ Order sent to WhatsApp!', '💬 Resend', () => {
        window.open(waUrl, '_blank');
      });
    }

    async handleOrderStatusUpdate(orderId, newStatus) {
      const order = this.orders.find(o => o.id === orderId);
      if (order) {
        order.status = newStatus;
        if (newStatus === 'Delivered') order.paymentStatus = 'Paid';

        if (this.supabaseClient) {
          try {
            await this.supabaseClient.from('orders').update({
              status: newStatus,
              payment_status: newStatus === 'Delivered' ? 'Paid' : order.paymentStatus
            }).eq('id', orderId);
          } catch (err) {
            // Supabase update error
          }
        }
        
        try {
          await fetch(`/api/orders/${orderId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
          });
        } catch (err) {
          // Fallback
        }

        this.saveOrders();
        this.renderAdminDashboard();
      }
    }

    showToast(message, actionText, actionCallback) {
      const existing = document.getElementById('toastNotif');
      if (existing) existing.remove();
      const toast = document.createElement('div');
      toast.id = 'toastNotif';
      toast.className = 'toast-notification';

      if (actionText && typeof actionCallback === 'function') {
        toast.innerHTML = `
          <span>${message}</span>
          <button class="toast-action-btn" id="toastActionBtn">${actionText}</button>
        `;
        document.body.appendChild(toast);
        document.getElementById('toastActionBtn')?.addEventListener('click', (e) => {
          e.stopPropagation();
          actionCallback();
          toast.remove();
        });
      } else {
        toast.textContent = message;
        document.body.appendChild(toast);
      }

      setTimeout(() => { if (toast.parentNode) toast.remove(); }, 4000);
    }

    initScrollObserver() {
      setTimeout(() => {
        const elements = document.querySelectorAll('.reveal-on-scroll');
        if (!elements.length) return;

        if ('IntersectionObserver' in window) {
          if (this.scrollObserver) {
            this.scrollObserver.disconnect();
          }

          this.scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
              }
            });
          }, {
            root: null,
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px'
          });

          elements.forEach(el => {
            if (el.classList.contains('is-visible')) return;
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 30 && rect.bottom >= 0) {
              el.classList.add('is-visible');
            } else {
              this.scrollObserver.observe(el);
            }
          });
        } else {
          elements.forEach(el => el.classList.add('is-visible'));
        }
      }, 60);
    }

    render() {
      this.renderHeader();
      this.renderFloatingWhatsApp();
      const container = document.getElementById('appContent');
      if (!container) return;

      if (this.activeView === 'admin') {
        this.renderAdminDashboard();
      } else if (this.activePage === 'contact') {
        this.renderContactPage();
      } else if (this.activePage === 'about') {
        this.renderAboutPage();
      } else {
        this.renderStorefront();
      }
      this.renderFooter();
      this.initScrollObserver();

      // Render Active Drawer & Overlay Modals
      this.renderCartDrawer();
      this.renderCheckoutModal();
      this.renderReceiptModal();
      this.renderProductModal();
    }

    renderFloatingWhatsApp() {
      let waBtn = document.getElementById('floatingWaBtn');
      if (!waBtn) {
        waBtn = document.createElement('a');
        waBtn.id = 'floatingWaBtn';
        waBtn.className = 'floating-whatsapp-btn';
        waBtn.href = `https://wa.me/254${HOTLINE_PHONE.replace(/^0/, '')}`;
        waBtn.target = '_blank';
        waBtn.rel = 'noopener noreferrer';
        waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
        waBtn.innerHTML = `
          <span class="wa-tooltip">Chat on WhatsApp</span>
          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        `;
        document.body.appendChild(waBtn);
      }
    }

    renderHeader() {
      const headerContainer = document.getElementById('navbarContainer');
      if (!headerContainer) return;

      const cartCount = this.cart.reduce((total, item) => total + item.qty, 0);

      headerContainer.innerHTML = `
        <!-- Top Hotline Bar -->
        <div class="top-hotline-bar">
          <div class="hotline-group">
            <span>Official Order Hotline:</span>
            <a href="tel:${HOTLINE_PHONE}" class="hotline-link">${ICONS.phone} <span>${HOTLINE_PHONE}</span></a>
          </div>
        </div>

        <!-- Main Header Bar -->
        <div class="main-header">
          <a href="#" class="official-brand-logo-wrapper" data-action="set-page" data-id="shop">
            <img src="${OFFICIAL_LOGO}" alt="AUTO HOMAGE Official Logo" class="official-logo-img">
            <div class="brand-text-block">
              <div class="brand-title">AUTO <span>HOMAGE</span></div>
              <div class="brand-slogan">CAR CARE &amp; ACCESSORIES • QUALITY PARTS</div>
            </div>
          </a>

          <!-- Center Navigation Links matching reference design -->
          ${this.activeView === 'store' ? `
            <nav class="center-nav-links">
              <a href="#" class="nav-link ${this.activePage === 'shop' ? 'active' : ''}" data-action="set-page" data-id="shop">HOME</a>
              <a href="#catalogSection" class="nav-link" onclick="document.getElementById('catalogSection')?.scrollIntoView({behavior:'smooth'})">SHOP</a>
              <a href="#categorySection" class="nav-link" onclick="document.getElementById('categorySection')?.scrollIntoView({behavior:'smooth'})">CATEGORIES ▾</a>
              <a href="#" class="nav-link ${this.activePage === 'about' ? 'active' : ''}" data-action="set-page" data-id="about">ABOUT US</a>
              <a href="#" class="nav-link ${this.activePage === 'contact' ? 'active' : ''}" data-action="set-page" data-id="contact">CONTACT US</a>
            </nav>
          ` : ''}

          <div class="header-action-group">
            <a href="tel:${HOTLINE_PHONE}" class="call-hotline-btn">
              ${ICONS.phone}
              <span>Call ${HOTLINE_PHONE}</span>
            </a>

            <!-- Hide Admin Portal trigger button from regular customers when unauthenticated -->
            ${this.isAdminAuthenticated ? `
              <button class="admin-portal-btn" data-action="toggle-view" style="border-color: #22c55e;">
                ${ICONS.lock}
                <span>${this.activeView === 'store' ? 'Admin Portal' : 'Back to Store'}</span>
              </button>
            ` : ''}

            ${this.activeView === 'store' ? `
              <button class="cart-drawer-trigger" data-action="open-cart">
                ${ICONS.cart}
                <span>Cart</span>
                <span class="cart-count-badge" id="cartBadgeCount">${cartCount}</span>
              </button>

              <!-- Mobile Hamburger Menu Button -->
              <button class="mobile-menu-trigger" data-action="toggle-mobile-menu" aria-label="Toggle Mobile Navigation">
                ${this.isMobileMenuOpen ? '✕' : '☰'}
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Collapsible Mobile Navigation Drawer -->
        ${(this.activeView === 'store' && this.isMobileMenuOpen) ? `
          <nav class="mobile-nav-menu">
            <a href="#" class="mobile-nav-link ${this.activePage === 'shop' ? 'active' : ''}" data-action="set-page" data-id="shop">
              <span>🏠</span> HOME
            </a>
            <a href="#catalogSection" class="mobile-nav-link" data-action="close-mobile-menu" onclick="document.getElementById('catalogSection')?.scrollIntoView({behavior:'smooth'})">
              <span>🛒</span> SHOP CATALOG
            </a>
            <a href="#categorySection" class="mobile-nav-link" data-action="close-mobile-menu" onclick="document.getElementById('categorySection')?.scrollIntoView({behavior:'smooth'})">
              <span>🏷️</span> CATEGORIES
            </a>
            <a href="#" class="mobile-nav-link ${this.activePage === 'about' ? 'active' : ''}" data-action="set-page" data-id="about">
              <span>🏆</span> ABOUT US
            </a>
            <a href="#" class="mobile-nav-link ${this.activePage === 'contact' ? 'active' : ''}" data-action="set-page" data-id="contact">
              <span>📞</span> CONTACT US
            </a>
          </nav>
        ` : ''}
      `;
    }

    renderFooter() {
      const container = document.getElementById('appContent');
      if (!container) return;

      const footer = document.createElement('footer');
      footer.className = 'site-footer';
      footer.innerHTML = `
        <div class="footer-main">
          <div class="footer-brand-col">
            <h3>AUTO <span>HOMAGE</span></h3>
            <p>Kenya's premier automotive care distributor. We supply Gladiator Car Tech, Flamingo, and Power Eagle products to individuals, garages, and dealers across the country.</p>
            <a href="https://wa.me/254${HOTLINE_PHONE.replace(/^0/, '')}" target="_blank"
               style="display: inline-flex; align-items: center; gap: 0.5rem; background: #25D366; color: #fff; padding: 0.6rem 1.2rem; border-radius: 9999px; font-weight: 700; font-size: 0.88rem; margin-top: 0.5rem;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Us
            </a>

            <div class="footer-social-wrapper" style="margin-top: 1.2rem;">
              <div style="font-size: 0.78rem; font-weight: 700; color: #d6d3d1; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem;">Follow Us ("${SOCIAL_HANDLE}")</div>
              <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                <a href="https://www.tiktok.com/search?q=Auto%20Homage" target="_blank" class="social-chip" title="TikTok - Auto Homage">
                  ${ICONS.tiktok} <span>TikTok</span>
                </a>
                <a href="https://www.facebook.com/search/top?q=Auto%20Homage" target="_blank" class="social-chip" title="Facebook - Auto Homage">
                  ${ICONS.facebook} <span>Facebook</span>
                </a>
                <a href="https://www.instagram.com/search/top?q=Auto%20Homage" target="_blank" class="social-chip" title="Instagram - Auto Homage">
                  ${ICONS.instagram} <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          <div>
            <div class="footer-col-title">Quick Links</div>
            <ul class="footer-links">
              <li><a href="#" data-action="set-page" data-id="shop">Product Catalog</a></li>
              <li><a href="#" data-action="set-brand" data-id="gladiator">Gladiator Car Tech</a></li>
              <li><a href="#" data-action="set-brand" data-id="flamingo">Flamingo Products</a></li>
              <li><a href="#" data-action="set-brand" data-id="power_eagle">Power Eagle</a></li>
              <li><a href="#" data-action="set-page" data-id="contact">Contact & Enquiries</a></li>
            </ul>
          </div>

          <div>
            <div class="footer-col-title">Product Categories</div>
            <ul class="footer-links">
              <li><a href="#" data-action="set-category" data-id="exterior_detailing">Exterior Detailing</a></li>
              <li><a href="#" data-action="set-category" data-id="interior_care">Interior Care</a></li>
              <li><a href="#" data-action="set-category" data-id="tires_wheels">Tyre & Wheel Care</a></li>
              <li><a href="#" data-action="set-category" data-id="interior_accessories">Mats & Steering Covers</a></li>
              <li><a href="#" data-action="set-category" data-id="air_fresheners">Air Fresheners</a></li>
              <li><a href="#" data-action="set-category" data-id="tools_safety">Tools & Safety</a></li>
            </ul>
          </div>

          <div>
            <div class="footer-col-title">Contact & Orders</div>
            <div class="footer-contact-item">
              <span style="font-size: 1.1rem;">📞</span>
              <div><strong>Order Hotline:</strong><br><a href="tel:${HOTLINE_PHONE}">${HOTLINE_PHONE}</a></div>
            </div>
            <div class="footer-contact-item">
              <span style="font-size: 1.1rem;">💬</span>
              <div><strong>WhatsApp:</strong><br><a href="https://wa.me/254${HOTLINE_PHONE.replace(/^0/, '')}" target="_blank">${HOTLINE_PHONE}</a></div>
            </div>
            <div class="footer-contact-item">
              <span style="font-size: 1.1rem;">✉️</span>
              <div><strong>Email Us:</strong><br><a href="mailto:${OFFICIAL_EMAIL}">${OFFICIAL_EMAIL}</a></div>
            </div>
            <div class="footer-contact-item">
              <span style="font-size: 1.1rem;">📍</span>
              <div><strong>Nairobi, Kenya</strong><br>Nationwide Delivery Available</div>
            </div>
            <div class="footer-contact-item">
              <span style="font-size: 1.1rem;">⏰</span>
              <div><strong>Business Hours:</strong><br>Mon–Sat: 8:00am – 6:00pm</div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <span style="cursor: default;" onclick="window.app.handleSecretFooterClick()">© 2026 Auto Homage. All Rights Reserved.</span>
          <span style="color: var(--primary-gold); font-weight: 700;">Quality Parts. Premium Care.</span>
        </div>
      `;

      container.appendChild(footer);
    }

    renderAboutPage() {
      const container = document.getElementById('appContent');
      container.innerHTML = `
        <!-- ABOUT HERO -->
        <div class="about-hero reveal-on-scroll" data-animate="fade-up">
          <div class="about-hero-badge">🏆 Kenya's Trusted Car Care Distributor</div>
          <h1>About <span>Auto Homage</span></h1>
          <p>We are Kenya's premier official distributor of world-class automotive care products — bringing Gladiator Car Tech, Flamingo, and Power Eagle to garages, car dealers, and everyday drivers across the country.</p>
        </div>

        <!-- OUR STORY SECTION -->
        <section class="about-story-section reveal-on-scroll" data-animate="fade-up" data-delay="100">
          <div class="about-story-img-col">
            <div class="about-story-img-frame">
              <img src="logo.png" alt="Auto Homage Logo" class="about-story-logo-img">
              <div class="about-story-img-glow"></div>
            </div>
            <div class="about-stat-cards">
              <div class="about-stat-card reveal-on-scroll" data-animate="zoom-in" data-delay="150">
                <div class="about-stat-number">500+</div>
                <div class="about-stat-label">Products in Catalog</div>
              </div>
              <div class="about-stat-card reveal-on-scroll" data-animate="zoom-in" data-delay="200">
                <div class="about-stat-number">3</div>
                <div class="about-stat-label">Premium Brands</div>
              </div>
              <div class="about-stat-card reveal-on-scroll" data-animate="zoom-in" data-delay="250">
                <div class="about-stat-number">47+</div>
                <div class="about-stat-label">Counties Served</div>
              </div>
            </div>
          </div>

          <div class="about-story-text-col">
            <div class="about-section-eyebrow">Our Story</div>
            <h2>Built on a Passion for <span>Automotive Excellence</span></h2>
            <p>Auto Homage was founded with a clear mission: to make premium automotive care products accessible to every Kenyan driver, mechanic, and auto dealer — without compromise on quality or authenticity.</p>
            <p>We are the official authorized distributor for <strong>Gladiator Car Tech</strong>, <strong>Flamingo Formulas</strong>, and <strong>Power Eagle</strong> — trusted names with global recognition and decades of innovation behind them.</p>
            <p>From Nairobi to Mombasa, Kisumu to Eldoret — we deliver directly to your door, offering both retail and wholesale carton pricing to serve individuals and businesses alike.</p>
            <a href="#" class="btn-gold-solid about-cta-btn" data-action="set-page" data-id="shop">🛒 Browse Our Products</a>
          </div>
        </section>

        <!-- MISSION & VALUES -->
        <section class="about-values-section">
          <div class="reveal-on-scroll" data-animate="fade-up" style="text-align: center; margin-bottom: 2.8rem;">
            <div class="about-section-eyebrow">What Drives Us</div>
            <h2>Our Mission &amp; <span style="color: var(--primary-gold);">Core Values</span></h2>
          </div>
          <div class="about-values-grid">
            <div class="about-value-card reveal-on-scroll" data-animate="zoom-in" data-delay="100">
              <div class="about-value-icon">🛡️</div>
              <h4>100% Authenticity</h4>
              <p>Every product we sell is sourced directly from authorized brand channels. No counterfeits. No compromise.</p>
            </div>
            <div class="about-value-card reveal-on-scroll" data-animate="zoom-in" data-delay="150">
              <div class="about-value-icon">🚀</div>
              <h4>Fast Nationwide Delivery</h4>
              <p>We ship to all 47 counties in Kenya, with same-day Pay on Delivery available in Nairobi and environs.</p>
            </div>
            <div class="about-value-card reveal-on-scroll" data-animate="zoom-in" data-delay="200">
              <div class="about-value-icon">💡</div>
              <h4>Expert Guidance</h4>
              <p>Our team helps you choose the exact right product for your vehicle make and model — saving you time and money.</p>
            </div>
            <div class="about-value-card reveal-on-scroll" data-animate="zoom-in" data-delay="250">
              <div class="about-value-icon">🤝</div>
              <h4>Wholesale Partnerships</h4>
              <p>We work with garages, auto dealers, and spare part shops offering bulk carton pricing and dedicated distributor support.</p>
            </div>
            <div class="about-value-card reveal-on-scroll" data-animate="zoom-in" data-delay="300">
              <div class="about-value-icon">⭐</div>
              <h4>Customer Satisfaction</h4>
              <p>Every order matters to us. We follow up on deliveries and welcome feedback to continuously improve your experience.</p>
            </div>
            <div class="about-value-card reveal-on-scroll" data-animate="zoom-in" data-delay="350">
              <div class="about-value-icon">🇰🇪</div>
              <h4>Proudly Kenyan</h4>
              <p>We are a locally grown business committed to improving Kenya's automotive culture — one quality product at a time.</p>
            </div>
          </div>
        </section>

        <!-- BRAND PARTNERS -->
        <section class="about-brands-section reveal-on-scroll" data-animate="fade-up">
          <div style="text-align: center; margin-bottom: 2.5rem;">
            <div class="about-section-eyebrow">Authorized Distributor</div>
            <h2>Our <span style="color: var(--primary-gold);">Brand Partners</span></h2>
            <p style="color: var(--text-muted); max-width: 520px; margin: 0.5rem auto 0;">We carry only the best. These are the world-class brands behind every product we stock.</p>
          </div>
          <div class="about-brands-grid">
            <div class="about-brand-card reveal-on-scroll" data-animate="slide-right" data-delay="100">
              <div class="about-brand-emblem">🔴</div>
              <h4>Gladiator Car Tech</h4>
              <p>Professional-grade car care formulas — wax, polish, degreaser, and detailing compounds trusted by expert detailers across Africa.</p>
              <a href="#" class="about-brand-link" data-action="set-brand" data-id="gladiator">Explore Gladiator →</a>
            </div>
            <div class="about-brand-card reveal-on-scroll" data-animate="fade-up" data-delay="150">
              <div class="about-brand-emblem">🦩</div>
              <h4>Flamingo Products</h4>
              <p>High-performance cleaning agents and surface care products, renowned for their effectiveness on both interior and exterior surfaces.</p>
              <a href="#" class="about-brand-link" data-action="set-brand" data-id="flamingo">Explore Flamingo →</a>
            </div>
            <div class="about-brand-card reveal-on-scroll" data-animate="slide-left" data-delay="200">
              <div class="about-brand-emblem">🦅</div>
              <h4>Power Eagle</h4>
              <p>Robust automotive accessories and vehicle care solutions engineered for durability in Kenya's diverse road conditions.</p>
              <a href="#" class="about-brand-link" data-action="set-brand" data-id="power_eagle">Explore Power Eagle →</a>
            </div>
          </div>
        </section>

        <!-- CALL TO ACTION BANNER -->
        <section class="about-cta-banner reveal-on-scroll" data-animate="zoom-in">
          <div class="about-cta-content">
            <h2>Ready to Experience <span>Premium Car Care?</span></h2>
            <p>Browse over 500+ authentic products. Nationwide delivery. Pay on Delivery in Nairobi.</p>
            <div class="about-cta-buttons">
              <a href="#" class="btn-gold-solid" data-action="set-page" data-id="shop" style="padding: 1rem 2.2rem; font-size: 1.05rem;">🛒 Shop Now</a>
              <a href="https://wa.me/254${HOTLINE_PHONE.replace(/^0/, '')}" target="_blank"
                 style="display: inline-flex; align-items: center; gap: 0.5rem; background: #25D366; color: #fff; padding: 1rem 2rem; border-radius: 9999px; font-weight: 800; font-size: 1rem; text-decoration: none;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      `;
      this.renderFooter();
      this.initScrollObserver();
    }

    renderContactPage() {
      const container = document.getElementById('appContent');
      container.innerHTML = `
        <div class="contact-hero reveal-on-scroll" data-animate="fade-up">
          <h1>Contact <span>Auto Homage</span></h1>
          <p>We're here to help you find the right product for your vehicle. Call, WhatsApp, email, or connect with us on social media.</p>
        </div>

        <div class="contact-grid">
          <!-- Contact Info Column -->
          <div class="contact-info-card reveal-on-scroll" data-animate="slide-right" data-delay="100">
            <h3 style="margin-bottom: 1.5rem; color: var(--text-main);">Get In Touch</h3>

            <div class="contact-info-item">
              <div class="contact-info-icon">📞</div>
              <div>
                <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 0.2rem;">Order Hotline</div>
                <a href="tel:${HOTLINE_PHONE}" style="font-size: 1.4rem; font-weight: 800; color: var(--primary-gold-dark);">${HOTLINE_PHONE}</a>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">Mon–Sat: 8:00am – 6:00pm</div>
              </div>
            </div>

            <div class="contact-info-item">
              <div class="contact-info-icon">💬</div>
              <div>
                <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 0.4rem;">WhatsApp Chat</div>
                <a href="https://wa.me/254${HOTLINE_PHONE.replace(/^0/, '')}" target="_blank"
                   style="display: inline-flex; align-items: center; gap: 0.5rem; background: #25D366; color: #fff; padding: 0.6rem 1.2rem; border-radius: 9999px; font-weight: 700; font-size: 0.88rem;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Chat on WhatsApp Now
                </a>
              </div>
            </div>

            <div class="contact-info-item">
              <div class="contact-info-icon">✉️</div>
              <div>
                <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 0.2rem;">Official Email</div>
                <a href="mailto:${OFFICIAL_EMAIL}" style="font-size: 1.1rem; font-weight: 800; color: var(--primary-gold-dark);">${OFFICIAL_EMAIL}</a>
                <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">Direct correspondence & wholesale enquiries</div>
              </div>
            </div>

            <div class="contact-info-item">
              <div class="contact-info-icon">🌐</div>
              <div>
                <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 0.3rem;">Social Media Platforms</div>
                <div style="font-size: 0.83rem; color: var(--text-muted); margin-bottom: 0.5rem;">Handle: <strong style="color: var(--text-main); font-weight: 800;">"${SOCIAL_HANDLE}"</strong></div>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                  <a href="https://www.tiktok.com/search?q=Auto%20Homage" target="_blank" class="social-contact-btn tiktok-btn">
                    ${ICONS.tiktok} <span>TikTok</span>
                  </a>
                  <a href="https://www.facebook.com/search/top?q=Auto%20Homage" target="_blank" class="social-contact-btn facebook-btn">
                    ${ICONS.facebook} <span>Facebook</span>
                  </a>
                  <a href="https://www.instagram.com/search/top?q=Auto%20Homage" target="_blank" class="social-contact-btn instagram-btn">
                    ${ICONS.instagram} <span>Instagram</span>
                  </a>
                </div>
              </div>
            </div>

            <div class="contact-info-item">
              <div class="contact-info-icon">📍</div>
              <div>
                <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 0.2rem;">Location</div>
                <div style="color: var(--text-body); font-size: 0.9rem; line-height: 1.5;">Nairobi, Kenya<br>Nationwide Delivery Available<br>All 47 Counties Served</div>
              </div>
            </div>

            <div class="contact-info-item">
              <div class="contact-info-icon">🚚</div>
              <div>
                <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 0.2rem;">Delivery Information</div>
                <div style="color: var(--text-body); font-size: 0.9rem; line-height: 1.5;">
                  Nairobi: Same day delivery<br>
                  Upcountry: 1–3 business days<br>
                  Wholesale orders: Free delivery on 5+ cartons
                </div>
              </div>
            </div>

            <div class="contact-info-item" style="border-bottom: none;">
              <div class="contact-info-icon">🏪</div>
              <div>
                <div style="font-weight: 800; font-size: 0.95rem; margin-bottom: 0.2rem;">Authorized Brands</div>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.4rem;">
                  <span style="background: var(--primary-gold-light); color: var(--primary-gold-dark); border: 1px solid var(--border-gold); padding: 0.2rem 0.7rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700;">Gladiator Car Tech</span>
                  <span style="background: var(--primary-gold-light); color: var(--primary-gold-dark); border: 1px solid var(--border-gold); padding: 0.2rem 0.7rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700;">Flamingo</span>
                  <span style="background: var(--primary-gold-light); color: var(--primary-gold-dark); border: 1px solid var(--border-gold); padding: 0.2rem 0.7rem; border-radius: 9999px; font-size: 0.8rem; font-weight: 700;">Power Eagle</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Enquiry Form -->
          <div class="contact-form-card reveal-on-scroll" data-animate="slide-left" data-delay="200">
            <h3 style="margin-bottom: 0.5rem;">Send Us an Enquiry</h3>
            <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 1.5rem;">We respond within 2 business hours during working days.</p>

            <form id="contactEnquiryForm" onsubmit="window.app.handleContactSubmit(event)">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label>FULL NAME</label>
                  <input type="text" name="contactName" class="warm-input" placeholder="Your full name" required>
                </div>
                <div class="form-group">
                  <label>PHONE / WHATSAPP</label>
                  <input type="tel" name="contactPhone" class="warm-input" placeholder="07XXXXXXXX" required>
                </div>
              </div>

              <div class="form-group">
                <label>EMAIL ADDRESS (OPTIONAL)</label>
                <input type="email" name="contactEmail" class="warm-input" placeholder="your@email.com">
              </div>

              <div class="form-group">
                <label>YOUR VEHICLE (OPTIONAL)</label>
                <input type="text" name="contactVehicle" class="warm-input" placeholder="e.g. Toyota Corolla 2020">
              </div>

              <div class="form-group">
                <label>YOUR MESSAGE / ENQUIRY</label>
                <textarea name="contactMessage" placeholder="Tell us what product you need, your vehicle details, or any questions you have..." required></textarea>
              </div>

              <button type="submit" class="btn-gold-action" style="width: 100%; padding: 0.9rem;">
                Send Enquiry via WhatsApp
              </button>
            </form>
          </div>
        </div>
      `;
    }

    handleContactSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const name = form.contactName.value;
      const phone = form.contactPhone.value;
      const vehicle = form.contactVehicle.value || 'Not specified';
      const message = form.contactMessage.value;

      const waMessage = encodeURIComponent(
        `Hello Auto Homage! My name is ${name} (${phone}).\nVehicle: ${vehicle}.\nEnquiry: ${message}`
      );
      window.open(`https://wa.me/254${HOTLINE_PHONE.replace(/^0/, '')}?text=${waMessage}`, '_blank');
      this.showToast('Opening WhatsApp with your enquiry...');
    }

    initHeroSlider() {
      if (this.heroSlideTimer) {
        clearInterval(this.heroSlideTimer);
        this.heroSlideTimer = null;
      }

      const sliderContainer = document.getElementById('heroSliderContainer');
      if (!sliderContainer) return;

      this.heroSlideTimer = setInterval(() => {
        this.nextHeroSlide();
      }, 5000);

      // Pause auto-advance on desktop hover
      sliderContainer.addEventListener('mouseenter', () => {
        if (this.heroSlideTimer) clearInterval(this.heroSlideTimer);
      });
      sliderContainer.addEventListener('mouseleave', () => {
        if (this.heroSlideTimer) clearInterval(this.heroSlideTimer);
        this.heroSlideTimer = setInterval(() => {
          this.nextHeroSlide();
        }, 5000);
      });

      // Mobile Touch Swipe Gesture Support
      let touchStartX = 0;
      let touchEndX = 0;

      sliderContainer.addEventListener('touchstart', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
          touchStartX = e.changedTouches[0].screenX;
        }
        if (this.heroSlideTimer) clearInterval(this.heroSlideTimer);
      }, { passive: true });

      sliderContainer.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
          touchEndX = e.changedTouches[0].screenX;
          const diff = touchStartX - touchEndX;
          if (Math.abs(diff) > 40) {
            if (diff > 0) {
              this.nextHeroSlide();
            } else {
              this.prevHeroSlide();
            }
          }
        }
        if (this.heroSlideTimer) clearInterval(this.heroSlideTimer);
        this.heroSlideTimer = setInterval(() => {
          this.nextHeroSlide();
        }, 5000);
      }, { passive: true });
    }

    nextHeroSlide() {
      this.currentHeroSlide = (this.currentHeroSlide + 1) % HERO_SLIDES.length;
      this.updateHeroSlideDOM();
    }

    prevHeroSlide() {
      this.currentHeroSlide = (this.currentHeroSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
      this.updateHeroSlideDOM();
    }

    goToHeroSlide(index) {
      this.currentHeroSlide = index;
      this.updateHeroSlideDOM();
    }

    updateHeroSlideDOM() {
      const slides = document.querySelectorAll('.hero-slide-item');
      const dots = document.querySelectorAll('.hero-slider-dot');

      slides.forEach((slide, idx) => {
        if (idx === this.currentHeroSlide) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      dots.forEach((dot, idx) => {
        if (idx === this.currentHeroSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    renderStorefront() {
      const container = document.getElementById('appContent');

      container.innerHTML = `
        <!-- HIGH IMPACT AUTOMOTIVE HERO CAROUSEL SLIDER -->
        <section id="heroSliderContainer" class="hero-slider-wrapper reveal-on-scroll" data-animate="fade-up">
          <div class="hero-slider-track">
            ${HERO_SLIDES.map((slide, idx) => `
              <div class="hero-slide-item ${idx === this.currentHeroSlide ? 'active' : ''}" style="background-image: linear-gradient(90deg, rgba(12,10,9,0.94) 0%, rgba(28,25,23,0.85) 50%, rgba(12,10,9,0.3) 100%), url('${slide.image}');">
                <div class="hero-slide-content">
                  <div class="hero-luxury-kicker">
                    ${slide.kicker}
                  </div>
                  <h1 class="hero-luxury-title">${slide.title}</h1>
                  <p class="hero-luxury-desc">${slide.desc}</p>
                  <div class="hero-cta-group">
                    ${slide.btnPrimary.href ? `
                      <a href="${slide.btnPrimary.href}" target="_blank" class="btn-gold-solid" style="padding: 0.9rem 1.8rem; font-size: 1rem; text-decoration: none;">
                        ${slide.btnPrimary.text}
                      </a>
                    ` : `
                      <button class="btn-gold-action" ${slide.btnPrimary.action ? `data-action="${slide.btnPrimary.action}"` : ''} ${slide.btnPrimary.id ? `data-id="${slide.btnPrimary.id}"` : ''} style="padding: 0.9rem 1.8rem; font-size: 1rem;">
                        ${slide.btnPrimary.text}
                      </button>
                    `}
                    
                    ${slide.btnSecondary.href ? `
                      <a href="${slide.btnSecondary.href}" ${slide.btnSecondary.href.startsWith('http') ? 'target="_blank"' : ''} class="btn-dark-outline" style="padding: 0.9rem 1.8rem; font-size: 1rem; text-decoration: none;">
                        ${slide.btnSecondary.text}
                      </a>
                    ` : `
                      <button class="btn-dark-outline" ${slide.btnSecondary.action ? `data-action="${slide.btnSecondary.action}"` : ''} ${slide.btnSecondary.id ? `data-id="${slide.btnSecondary.id}"` : ''} style="padding: 0.9rem 1.8rem; font-size: 1rem;">
                        ${slide.btnSecondary.text}
                      </button>
                    `}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Navigation Arrows -->
          <button class="hero-slider-arrow hero-slider-prev" data-action="prev-hero-slide" aria-label="Previous Slide">❮</button>
          <button class="hero-slider-arrow hero-slider-next" data-action="next-hero-slide" aria-label="Next Slide">❯</button>

          <!-- Navigation Dots -->
          <div class="hero-slider-dots">
            ${HERO_SLIDES.map((_, idx) => `
              <button class="hero-slider-dot ${idx === this.currentHeroSlide ? 'active' : ''}" data-action="set-hero-slide" data-id="${idx}" aria-label="Slide ${idx + 1}"></button>
            `).join('')}
          </div>
        </section>

        <!-- DARK TRUST PILLARS BAR MATCHING REFERENCE IMAGE -->
        <div class="reveal-on-scroll" data-animate="fade-up" data-delay="150" style="background: #0c0a09; border: 1px solid rgba(198,146,20,0.25); border-radius: 16px; padding: 1.4rem 2rem; margin-bottom: 3.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; color: #ffffff;">
          <div class="reveal-on-scroll" data-animate="fade-up" data-delay="100" style="display: flex; align-items: center; gap: 1rem;">
            <div class="trust-pill-icon">🛡️</div>
            <div>
              <div style="font-weight: 800; font-size: 0.88rem; color: #ffffff; text-transform: uppercase;">AUTHENTIC &amp; CERTIFIED</div>
              <div style="font-size: 0.78rem; color: #a8a29e;">100% genuine products from trusted global brands.</div>
            </div>
          </div>

          <div class="reveal-on-scroll" data-animate="fade-up" data-delay="150" style="display: flex; align-items: center; gap: 1rem;">
            <div class="trust-pill-icon">🎖️</div>
            <div>
              <div style="font-weight: 800; font-size: 0.88rem; color: #ffffff; text-transform: uppercase;">PREMIUM QUALITY</div>
              <div style="font-size: 0.78rem; color: #a8a29e;">High-grade materials for superior performance.</div>
            </div>
          </div>

          <div class="reveal-on-scroll" data-animate="fade-up" data-delay="200" style="display: flex; align-items: center; gap: 1rem;">
            <div class="trust-pill-icon">🚚</div>
            <div>
              <div style="font-weight: 800; font-size: 0.88rem; color: #ffffff; text-transform: uppercase;">FAST &amp; RELIABLE</div>
              <div style="font-size: 0.78rem; color: #a8a29e;">Quick delivery across Kenya.</div>
            </div>
          </div>

          <div class="reveal-on-scroll" data-animate="fade-up" data-delay="250" style="display: flex; align-items: center; gap: 1rem;">
            <div class="trust-pill-icon">🎧</div>
            <div>
              <div style="font-weight: 800; font-size: 0.88rem; color: #ffffff; text-transform: uppercase;">EXPERT SUPPORT</div>
              <div style="font-size: 0.78rem; color: #a8a29e;">Professional advice to help you choose right.</div>
            </div>
          </div>
        </div>

        <!-- SHOP BY CATEGORY SHOWCASE GRID MATCHING REFERENCE IMAGE -->
        <section id="categorySection" style="margin-bottom: 4rem;">
          <div class="reveal-on-scroll" data-animate="fade-up" style="text-align: center; margin-bottom: 2.5rem;">
            <h2 style="font-family: var(--font-heading); font-size: 2.2rem; font-weight: 800; text-transform: uppercase; letter-spacing: -0.01em;">
              SHOP BY <span style="color: var(--primary-gold);">CATEGORY</span>
            </h2>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.3rem;">Find exactly what your vehicle needs.</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem;">
            <!-- Card 1 -->
            <div class="category-showcase-card reveal-on-scroll" data-animate="zoom-in" data-delay="100" data-action="set-category" data-id="exterior_detailing" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: var(--transition); box-shadow: var(--shadow-sm);">
              <div>
                <div style="height: 140px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.2rem;">
                  <img src="Products/Gradiator Products/Multi-Purpose Degreaser.jpg" alt="Car Care & Detailing" style="max-height: 100%; object-fit: contain;">
                </div>
                <h4 style="font-weight: 800; font-size: 0.92rem; margin-bottom: 0.3rem; text-transform: uppercase; color: var(--text-main);">CAR CARE &amp; DETAILING</h4>
                <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem;">Keep your car looking its best.</p>
              </div>
              <div style="display: flex; justify-content: flex-end;">
                <span class="cat-circle-arrow">→</span>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="category-showcase-card reveal-on-scroll" data-animate="zoom-in" data-delay="150" data-action="set-category" data-id="service_maintenance" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: var(--transition); box-shadow: var(--shadow-sm);">
              <div>
                <div style="height: 140px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.2rem;">
                  <img src="Products/Spark Plug.jpg" alt="Engine Parts" style="max-height: 100%; object-fit: contain;">
                </div>
                <h4 style="font-weight: 800; font-size: 0.92rem; margin-bottom: 0.3rem; text-transform: uppercase; color: var(--text-main);">ENGINE PARTS</h4>
                <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem;">Precision components for peak performance.</p>
              </div>
              <div style="display: flex; justify-content: flex-end;">
                <span class="cat-circle-arrow">→</span>
              </div>
            </div>

            <!-- Card 3 -->
            <div class="category-showcase-card reveal-on-scroll" data-animate="zoom-in" data-delay="200" data-action="set-category" data-id="interior_accessories" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: var(--transition); box-shadow: var(--shadow-sm);">
              <div>
                <div style="height: 140px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.2rem;">
                  <img src="Products/Mats/Fancy Car Mat.jpg" alt="3D Mats & Interiors" style="max-height: 100%; object-fit: contain;">
                </div>
                <h4 style="font-weight: 800; font-size: 0.92rem; margin-bottom: 0.3rem; text-transform: uppercase; color: var(--text-main);">3D MATS &amp; INTERIORS</h4>
                <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem;">Custom fit. Maximum protection &amp; comfort.</p>
              </div>
              <div style="display: flex; justify-content: flex-end;">
                <span class="cat-circle-arrow">→</span>
              </div>
            </div>

            <!-- Card 4 -->
            <div class="category-showcase-card reveal-on-scroll" data-animate="zoom-in" data-delay="250" data-action="set-category" data-id="tires_wheels" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: var(--transition); box-shadow: var(--shadow-sm);">
              <div>
                <div style="height: 140px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.2rem;">
                  <img src="Products/Wiper Blade.jpg" alt="Exterior Accessories" style="max-height: 100%; object-fit: contain;">
                </div>
                <h4 style="font-weight: 800; font-size: 0.92rem; margin-bottom: 0.3rem; text-transform: uppercase; color: var(--text-main);">EXTERIOR ACCESSORIES</h4>
                <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem;">Style, protection &amp; performance.</p>
              </div>
              <div style="display: flex; justify-content: flex-end;">
                <span class="cat-circle-arrow">→</span>
              </div>
            </div>

            <!-- Card 5 -->
            <div class="category-showcase-card reveal-on-scroll" data-animate="zoom-in" data-delay="300" data-action="set-category" data-id="tools_safety" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: 16px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: var(--transition); box-shadow: var(--shadow-sm);">
              <div>
                <div style="height: 140px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.2rem;">
                  <img src="Products/Radiator Coolant.jpg" alt="Electrical & Lighting" style="max-height: 100%; object-fit: contain;">
                </div>
                <h4 style="font-weight: 800; font-size: 0.92rem; margin-bottom: 0.3rem; text-transform: uppercase; color: var(--text-main);">ELECTRICAL &amp; LIGHTING</h4>
                <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 1rem;">Power up with reliable electronics.</p>
              </div>
              <div style="display: flex; justify-content: flex-end;">
                <span class="cat-circle-arrow">→</span>
              </div>
            </div>
          </div>
        </section>

        <!-- EXCLUSIVE BRANDS. TRUSTED QUALITY. DARK SECTION MATCHING REFERENCE IMAGE -->
        <section class="reveal-on-scroll exclusive-brands-section-grid" data-animate="fade-up" style="background: #0c0a09; border-radius: 20px; padding: 3rem 2.5rem; margin-bottom: 3.5rem; color: #ffffff; display: grid; grid-template-columns: 1fr 1.6fr; gap: 2.5rem; align-items: center;">
          <div class="reveal-on-scroll" data-animate="slide-right" data-delay="100">
            <h2 style="font-family: var(--font-heading); font-size: 2.1rem; font-weight: 800; line-height: 1.15; margin-bottom: 1rem; color: #ffffff; text-transform: uppercase;">
              EXCLUSIVE BRANDS.<br><span style="color: var(--primary-gold);">TRUSTED QUALITY.</span>
            </h2>
            <p style="color: #a8a29e; font-size: 0.95rem; margin-bottom: 2rem; line-height: 1.5;">
              We partner with leading global brands to bring you the best.
            </p>
            <button class="btn-gold-action" onclick="document.getElementById('catalogSection')?.scrollIntoView({behavior:'smooth'})" style="padding: 0.85rem 1.6rem;">
              VIEW ALL PRODUCTS →
            </button>
          </div>

          <div class="exclusive-brands-sub-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
            <div class="brand-logo-dark-card reveal-on-scroll" data-animate="zoom-in" data-delay="150" data-action="set-brand" data-id="gladiator">
              <span style="font-weight: 800; font-size: 1.05rem; color: #ffffff;">GLADIATOR</span>
              <span style="font-size: 0.68rem; color: var(--primary-gold); text-transform: uppercase; font-weight: 700; margin-top: 0.2rem;">CAR TECH</span>
            </div>
            <div class="brand-logo-dark-card reveal-on-scroll" data-animate="zoom-in" data-delay="200" data-action="set-brand" data-id="flamingo">
              <span style="font-weight: 800; font-size: 1.05rem; color: #ff6b81;">FLAMINGO</span>
              <span style="font-size: 0.68rem; color: #a8a29e; text-transform: uppercase; font-weight: 700; margin-top: 0.2rem;">FORMULAS</span>
            </div>
            <div class="brand-logo-dark-card reveal-on-scroll" data-animate="zoom-in" data-delay="250" data-action="set-brand" data-id="power_eagle">
              <span style="font-weight: 800; font-size: 1.05rem; color: #f59e0b;">POWER EAGLE</span>
              <span style="font-size: 0.68rem; color: #a8a29e; text-transform: uppercase; font-weight: 700; margin-top: 0.2rem;">SERIES</span>
            </div>
          </div>
        </section>

        <!-- BOTTOM LIGHT FEATURE STRIP MATCHING REFERENCE IMAGE -->
        <div class="reveal-on-scroll" data-animate="fade-up" data-delay="100" style="background: #ffffff; border: 1px solid var(--border-subtle); border-radius: 16px; padding: 1.4rem 2rem; margin-bottom: 3.5rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; box-shadow: var(--shadow-sm);">
          <div class="reveal-on-scroll" data-animate="fade-up" data-delay="100" style="display: flex; align-items: center; gap: 0.9rem;">
            <div style="font-size: 1.8rem;">🚚</div>
            <div>
              <div style="font-weight: 800; font-size: 0.85rem; text-transform: uppercase; color: var(--text-main);">FREE DELIVERY</div>
              <div style="font-size: 0.76rem; color: var(--text-muted);">On orders over KSh 10,000</div>
            </div>
          </div>

          <div class="reveal-on-scroll" data-animate="fade-up" data-delay="150" style="display: flex; align-items: center; gap: 0.9rem;">
            <div style="font-size: 1.8rem;">🛡️</div>
            <div>
              <div style="font-weight: 800; font-size: 0.85rem; text-transform: uppercase; color: var(--text-main);">SECURE PAYMENTS</div>
              <div style="font-size: 0.76rem; color: var(--text-muted);">Safe &amp; trusted transactions</div>
            </div>
          </div>

          <div class="reveal-on-scroll" data-animate="fade-up" data-delay="200" style="display: flex; align-items: center; gap: 0.9rem;">
            <div style="font-size: 1.8rem;">🎖️</div>
            <div>
              <div style="font-weight: 800; font-size: 0.85rem; text-transform: uppercase; color: var(--text-main);">EASY RETURNS</div>
              <div style="font-size: 0.76rem; color: var(--text-muted);">7-day return policy</div>
            </div>
          </div>

          <div class="reveal-on-scroll" data-animate="fade-up" data-delay="250" style="display: flex; align-items: center; gap: 0.9rem;">
            <div style="font-size: 1.8rem;">🎧</div>
            <div>
              <div style="font-weight: 800; font-size: 0.85rem; text-transform: uppercase; color: var(--text-main);">NEED HELP?</div>
              <div style="font-size: 0.76rem; color: var(--text-muted);">Call ${HOTLINE_PHONE}</div>
            </div>
          </div>
        </div>

        <!-- WHOLESALE & GARAGE PARTNERS BANNER MATCHING REFERENCE IMAGE -->
        <section class="reveal-on-scroll wholesale-partner-banner" data-animate="fade-up" data-delay="100" style="background: #0c0a09; border: 1.5px solid var(--border-gold); border-radius: 16px; padding: 1.8rem 2.5rem; margin-bottom: 3.5rem; color: #ffffff; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem;">
          <div style="display: flex; align-items: center; gap: 1.2rem;">
            <div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(198,146,20,0.2); border: 1px solid var(--primary-gold); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
              🏎️
            </div>
            <div>
              <h3 style="font-weight: 800; font-size: 1.1rem; color: #ffffff; text-transform: uppercase; letter-spacing: 0.02em;">WHOLESALE &amp; GARAGE PARTNERS</h3>
              <p style="color: #a8a29e; font-size: 0.88rem; margin-top: 0.2rem;">Bulk deals, special pricing &amp; dedicated support for garages and dealers.</p>
            </div>
          </div>

          <a href="https://wa.me/254${HOTLINE_PHONE.replace(/^0/, '')}?text=Hello%20Auto%20Homage,%20I%20am%20interested%20in%20a%20Wholesale%20/%20Garage%20Partnership" target="_blank" class="btn-dark-outline" style="padding: 0.8rem 1.6rem; text-transform: uppercase; font-size: 0.88rem;">
            PARTNER WITH US →
          </a>
        </section>

        <!-- Vehicle Finder Card Widget -->
        <div class="warm-finder-card reveal-on-scroll" data-animate="fade-up" data-delay="100">
          <div class="finder-card-header">
            <div style="display: flex; align-items: center; gap: 0.8rem;">
              <div style="width: 42px; height: 42px; background: var(--primary-gold-light); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--primary-gold-dark);">
                ${ICONS.car}
              </div>
              <div>
                <h3>Match Parts to Your Specific Vehicle</h3>
                <p style="font-size: 0.85rem; color: var(--text-muted);">Select your car make, model, and year to filter mechanical spares</p>
              </div>
            </div>

            ${this.activeVehicle.make ? `
              <div style="display: flex; align-items: center; gap: 0.6rem; background: var(--primary-gold-light); border: 1px solid var(--border-gold); padding: 0.4rem 1rem; border-radius: 20px; font-weight: 700; color: var(--primary-gold-dark);">
                Active Vehicle: ${this.activeVehicle.year} ${this.activeVehicle.make} ${this.activeVehicle.model}
                <button style="color: var(--accent-deep-red); background: none; border: none; font-weight: bold; cursor: pointer; margin-left: 0.5rem;" data-action="clear-vehicle">✕</button>
              </div>
            ` : ''}
          </div>

          <form id="ymmForm" class="finder-grid">
            <div>
              <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">VEHICLE MAKE</label>
              <select id="ymmMakeSelect" class="warm-select" required>
                <option value="">-- Select Make --</option>
                ${Object.keys(MAKES_MODELS_DATABASE).map(make => `
                  <option value="${make}" ${this.activeVehicle.make === make ? 'selected' : ''}>${make}</option>
                `).join('')}
              </select>
            </div>

            <div>
              <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">VEHICLE MODEL</label>
              <select id="ymmModelSelect" class="warm-select" required>
                <option value="">-- Select Model --</option>
              </select>
            </div>

            <div>
              <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">YEAR OF MANUFACTURE</label>
              <select id="ymmYearSelect" class="warm-select" required>
                <option value="">-- Select Year --</option>
                ${Array.from({ length: 27 }, (_, i) => 2026 - i).map(year => `
                  <option value="${year}" ${parseInt(this.activeVehicle.year) === year ? 'selected' : ''}>${year}</option>
                `).join('')}
              </select>
            </div>

            <button type="submit" class="btn-gold-action">
              Find Matching Parts
            </button>
          </form>
        </div>

        <!-- Featured Brand Collections -->
        <section class="featured-brands-section reveal-on-scroll" data-animate="fade-up">
          <div class="section-heading-block">
            <h2 class="section-title">Authorized Brand Collections</h2>
            <p class="section-subtitle">Browse through our curated lines of high-performance car care formulas and accessories</p>
          </div>

          <div class="brand-showcase-grid">
            <div class="brand-feature-card reveal-on-scroll" data-animate="zoom-in" data-delay="100" data-action="set-brand" data-id="gladiator" style="cursor: pointer;">
              <div class="brand-card-icon">🏎️</div>
              <h3>Gladiator Car Tech</h3>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.4rem;">High-shine tire foams, hard wax compounds, degreasers & 12V air compressors.</p>
            </div>

            <div class="brand-feature-card reveal-on-scroll" data-animate="zoom-in" data-delay="150" data-action="set-brand" data-id="flamingo" style="cursor: pointer;">
              <div class="brand-card-icon">✨</div>
              <h3>Flamingo Formulations</h3>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.4rem;">Nano ceramic coating wax, AC Pro deodorizers, and dashboard polishes.</p>
            </div>

            <div class="brand-feature-card reveal-on-scroll" data-animate="zoom-in" data-delay="200" data-action="set-brand" data-id="power_eagle" style="cursor: pointer;">
              <div class="brand-card-icon">⚡</div>
              <h3>Power Eagle Series</h3>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.4rem;">Engine degreasers, throttle system cleaners & high-heat lubricants.</p>
            </div>

            <div class="brand-feature-card reveal-on-scroll" data-animate="zoom-in" data-delay="250" data-action="set-brand" data-id="universal" style="cursor: pointer;">
              <div class="brand-card-icon">🚗</div>
              <h3>Custom Fit Mats & Tools</h3>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.4rem;">Tailored 3D floor mats for Toyota, Subaru, Mercedes, plus emergency gear.</p>
            </div>
          </div>
        </section>

        <!-- Main Catalog Section -->
        <div id="catalogSection">
          <div class="catalog-filter-bar reveal-on-scroll" data-animate="fade-up">
            <div class="bar-row-upper">
              <!-- Brand Filter Tabs -->
              <div class="brand-tabs-container" style="display: flex; gap: 0.4rem; overflow-x: auto;">
                ${BRAND_LIST.map(b => `
                  <button class="brand-tab-btn ${this.activeBrand === b.id ? 'active' : ''}" data-action="set-brand" data-id="${b.id}">
                    ${b.name}
                  </button>
                `).join('')}
              </div>

              <!-- Retail vs Wholesale Carton Switcher -->
              <div class="price-mode-switch">
                <button class="switch-option ${this.priceMode === 'unit' ? 'active' : ''}" data-action="set-pricemode" data-id="unit">
                  Single Unit Retail
                </button>
                <button class="switch-option ${this.priceMode === 'carton' ? 'active' : ''}" data-action="set-pricemode" data-id="carton">
                  📦 Wholesale Carton
                </button>
              </div>

              <!-- Search Field -->
              <div style="position: relative; flex: 1; min-width: 240px;">
                <input type="text" id="productSearchInput" class="warm-input" style="padding-left: 2.4rem;" placeholder="Search catalog name, code or item..." value="${this.searchQuery}">
                <span style="position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);">${ICONS.search}</span>
              </div>
            </div>

            <!-- Category Pills -->
            <div class="category-pills-container" style="display: flex; gap: 0.5rem; overflow-x: auto; padding-top: 0.8rem; border-top: 1px solid var(--border-subtle);">
              ${CATEGORIES.map(c => `
                <button class="cat-pill ${this.activeCategory === c.id ? 'active' : ''}" data-action="set-category" data-id="${c.id}">
                  ${c.name}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Products Display Grid -->
          <div id="productsGrid" class="products-display-grid">
            <!-- Rendered via JS -->
          </div>
        </div>
      `;

      this.initHeroSlider();

      const makeSelect = document.getElementById('ymmMakeSelect');
      const modelSelect = document.getElementById('ymmModelSelect');
      
      const updateModels = () => {
        const selectedMake = makeSelect.value;
        modelSelect.innerHTML = '<option value="">-- Select Model --</option>';
        if (selectedMake && MAKES_MODELS_DATABASE[selectedMake]) {
          MAKES_MODELS_DATABASE[selectedMake].forEach(mod => {
            const opt = document.createElement('option');
            opt.value = mod;
            opt.textContent = mod;
            if (this.activeVehicle.model === mod) opt.selected = true;
            modelSelect.appendChild(opt);
          });
        }
      };

      makeSelect.addEventListener('change', updateModels);
      if (this.activeVehicle.make) updateModels();

      document.getElementById('ymmForm').addEventListener('submit', (e) => this.handleVehicleFilterSubmit(e));

      this.renderProductsList();
    }

    renderProductsList() {
      const grid = document.getElementById('productsGrid');
      if (!grid) return;

      let filtered = this.products.filter(p => {
        if (this.activeBrand !== 'all' && p.brand !== this.activeBrand) return false;
        if (this.activeCategory !== 'all' && p.category !== this.activeCategory) return false;

        if (this.searchQuery) {
          const q = this.searchQuery;
          const matchName = p.name.toLowerCase().includes(q);
          const matchCode = p.code.toLowerCase().includes(q);
          if (!matchName && !matchCode) return false;
        }

        if (this.activeVehicle.make && !p.isUniversal) {
          if (!p.fitment) return false;
          const makeMatch = p.fitment.makes.includes(this.activeVehicle.make);
          const modelMatch = p.fitment.models.includes(this.activeVehicle.model);
          const yearMatch = p.fitment.years.includes(parseInt(this.activeVehicle.year));
          if (!makeMatch || !modelMatch || !yearMatch) return false;
        }

        return true;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; background: var(--bg-surface); border-radius: var(--radius-xl); border: 2px dashed var(--border-gold);">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔍</div>
            <h3>No products match your current selection</h3>
            <p style="color: var(--text-muted); margin-top: 0.5rem;">Try clearing your vehicle filter or selecting 'All Brands'</p>
          </div>
        `;
        return;
      }

      const totalPages = Math.ceil(filtered.length / this.productsPerPage);
      if (this.currentPage > totalPages) this.currentPage = 1;
      const start = (this.currentPage - 1) * this.productsPerPage;
      const paginated = filtered.slice(start, start + this.productsPerPage);

      grid.innerHTML = paginated.map((p, idx) => {
        const displayPrice = this.priceMode === 'carton' ? p.ctnPrice : p.price;
        const unitLabel = this.priceMode === 'carton' ? `Wholesale Carton (${p.pcsPerCtn} pcs)` : 'Single Unit Rate';
        // First 8 images load eagerly; rest are lazy-loaded for performance
        const loadStrategy = idx < 8 ? 'eager' : 'lazy';
        const delay = (idx % 6) * 50 + 50;

        // Strike-through original retail price & discount calculation
        const origPrice = p.origPrice || Math.round(p.price * 1.18);
        const singleSavingsPct = Math.round(((origPrice - p.price) / origPrice) * 100);
        
        // Carton savings vs single unit retail rate calculation
        const singleTotal = p.price * p.pcsPerCtn;
        const cartonSavingsPct = singleTotal > p.ctnPrice ? Math.round(((singleTotal - p.ctnPrice) / singleTotal) * 100) : 15;

        return `
          <div class="luxury-product-card reveal-on-scroll" data-animate="fade-up" data-delay="${delay}">
            <div class="product-image-container" data-action="view-product" data-id="${p.id}">
              <img src="${p.image}" alt="${p.name}" class="product-hero-image" loading="${loadStrategy}" decoding="async" onerror="this.src='Products/Gradiator Products/Multi-Purpose Degreaser.jpg'">
              <div class="badge-tag-stack">
                <span class="tag-brand-pill">${p.brand.replace('_', ' ')}</span>
                ${this.priceMode === 'carton' ? `<span class="badge-discount-tag">SAVE ${cartonSavingsPct}%</span>` : (singleSavingsPct > 0 ? `<span class="badge-discount-tag">-${singleSavingsPct}% OFF</span>` : '')}
                ${p.stock > 10 ? `<span class="badge-stock-in">In Stock</span>` : `<span class="badge-stock-low">Low Stock (${p.stock})</span>`}
              </div>
            </div>

            <div class="product-info-body">
              <div class="sku-code-label">SKU: ${p.code}</div>
              <h4 class="product-title-text" data-action="view-product" data-id="${p.id}">${p.name}</h4>
              
              <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; color: var(--accent-amber); margin-bottom: 0.6rem;">
                <span>★ ${p.rating || 5.0}</span>
                <span style="color: var(--text-muted);">(${p.reviews || 12} reviews)</span>
              </div>

              <div class="product-price-action-row">
                <div>
                  <div style="display: flex; align-items: baseline; gap: 0.3rem;">
                    ${this.priceMode === 'unit' && origPrice > p.price ? `<span class="strike-price">KSh ${origPrice.toLocaleString()}</span>` : ''}
                    <div class="product-price-amount">KSh ${displayPrice.toLocaleString()}</div>
                  </div>
                  <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;">${unitLabel}</div>
                </div>

                <div style="display: flex; gap: 0.4rem;">
                  <button class="btn-whatsapp-direct" data-action="order-whatsapp-product" data-id="${p.id}" title="Order directly on WhatsApp">
                    💬
                  </button>
                  <button class="btn-add-cart" data-action="add-to-cart" data-id="${p.id}">
                    ${ICONS.cart}
                    <span>Add</span>
                  </button>
                </div>
              </div>

              <div class="badge-pay-delivery">
                <span>🚚</span> Pay on Delivery in Nairobi
              </div>
            </div>
          </div>
        `;
      }).join('');

      this.initScrollObserver();

      // Render pagination controls if more than one page
      if (totalPages > 1) {
        const paginationEl = document.createElement('div');
        paginationEl.className = 'pagination-controls';
        paginationEl.innerHTML = `
          <div style="grid-column: 1/-1; display: flex; align-items: center; justify-content: center; gap: 0.6rem; padding: 2rem 0; flex-wrap: wrap;">
            <button class="page-btn" data-action="page-prev" ${this.currentPage === 1 ? 'disabled' : ''} style="padding: 0.5rem 1.1rem; border-radius: 8px; border: 1.5px solid var(--border-gold); background: ${this.currentPage === 1 ? 'var(--bg-surface)' : 'var(--primary-gold)'}; color: ${this.currentPage === 1 ? 'var(--text-muted)' : '#1a1200'}; font-weight: 700; cursor: ${this.currentPage === 1 ? 'not-allowed' : 'pointer'};">← Prev</button>
            ${Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => `
              <button class="page-btn" data-action="page-go" data-id="${pg}" style="padding: 0.5rem 0.9rem; border-radius: 8px; border: 1.5px solid ${pg === this.currentPage ? 'var(--primary-gold)' : 'var(--border-subtle)'}; background: ${pg === this.currentPage ? 'var(--primary-gold)' : 'var(--bg-surface)'}; color: ${pg === this.currentPage ? '#1a1200' : 'var(--text-body)'}; font-weight: 700; cursor: pointer;">${pg}</button>
            `).join('')}
            <button class="page-btn" data-action="page-next" ${this.currentPage === totalPages ? 'disabled' : ''} style="padding: 0.5rem 1.1rem; border-radius: 8px; border: 1.5px solid var(--border-gold); background: ${this.currentPage === totalPages ? 'var(--bg-surface)' : 'var(--primary-gold)'}; color: ${this.currentPage === totalPages ? 'var(--text-muted)' : '#1a1200'}; font-weight: 700; cursor: ${this.currentPage === totalPages ? 'not-allowed' : 'pointer'};">Next →</button>
            <span style="color: var(--text-muted); font-size: 0.82rem; margin-left: 0.5rem;">Showing ${start + 1}–${Math.min(start + this.productsPerPage, filtered.length)} of ${filtered.length} products</span>
          </div>
        `;
        grid.appendChild(paginationEl);

        paginationEl.addEventListener('click', (e) => {
          const btn = e.target.closest('[data-action]');
          if (!btn) return;
          const action = btn.dataset.action;
          if (action === 'page-prev' && this.currentPage > 1) {
            this.currentPage--;
            this.renderProductsList();
            document.getElementById('productsGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else if (action === 'page-next' && this.currentPage < totalPages) {
            this.currentPage++;
            this.renderProductsList();
            document.getElementById('productsGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else if (action === 'page-go') {
            this.currentPage = parseInt(btn.dataset.id);
            this.renderProductsList();
            document.getElementById('productsGrid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
    }

    renderProductModal() {
      let overlay = document.getElementById('productModalOverlay');
      if (!this.selectedProduct) {
        if (overlay) overlay.remove();
        return;
      }

      const p = this.selectedProduct;
      const displayPrice = this.priceMode === 'carton' ? p.ctnPrice : p.price;

      const origPrice = p.origPrice || Math.round(p.price * 1.18);
      const singleSavingsPct = Math.round(((origPrice - p.price) / origPrice) * 100);
      const singleTotal = p.price * p.pcsPerCtn;
      const cartonSavingsPct = singleTotal > p.ctnPrice ? Math.round(((singleTotal - p.ctnPrice) / singleTotal) * 100) : 15;

      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'productModalOverlay';
        overlay.className = 'modal-gold-overlay';
        document.body.appendChild(overlay);
      }

      overlay.innerHTML = `
        <div class="modal-gold-box" style="padding: 2.5rem;">
          <button class="close-btn-round" data-action="close-modal">✕</button>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; align-items: center;">
            <div style="background: radial-gradient(circle, #ffffff 40%, #f7f1e5 100%); border-radius: var(--radius-lg); padding: 2rem; display: flex; align-items: center; justify-content: center; height: 320px; border: 1px solid var(--border-gold); position: relative;">
              <img src="${p.image}" alt="${p.name}" style="max-height: 100%; max-width: 100%; object-fit: contain;" onerror="this.src='Products/Gradiator Products/Multi-Purpose Degreaser.jpg'">
              <div style="position: absolute; top: 1rem; left: 1rem; display: flex; flex-direction: column; gap: 0.4rem;">
                <span class="certified-genuine-tag">🛡️ 100% Certified Genuine</span>
                ${this.priceMode === 'carton' ? `<span class="carton-savings-pill">📦 Save ${cartonSavingsPct}% on Wholesale Carton</span>` : `<span class="badge-discount-tag">-${singleSavingsPct}% OFF</span>`}
              </div>
            </div>

            <div>
              <div style="font-family: monospace; color: var(--primary-gold-dark); font-weight: 700; margin-bottom: 0.3rem;">CODE: ${p.code}</div>
              <h2 style="font-size: 1.6rem; margin-bottom: 0.8rem; color: var(--bg-dark-obsidian);">${p.name}</h2>
              <p style="color: var(--text-body); margin-bottom: 1.5rem; font-size: 0.95rem; line-height: 1.6;">${p.description}</p>

              <div style="background: var(--bg-warm-gold); border: 1px solid var(--border-strong); border-radius: var(--radius-md); padding: 1.2rem; margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                  <span style="color: var(--text-muted);">Retail Single Unit:</span>
                  <div>
                    <span class="strike-price">KSh ${origPrice.toLocaleString()}</span>
                    <strong style="color: var(--bg-dark-obsidian); font-size: 1.1rem;">KSh ${p.price.toLocaleString()}</strong>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                  <span style="color: var(--text-muted);">Wholesale Carton Rate:</span>
                  <strong style="color: var(--primary-gold-dark);">KSh ${p.ctnPrice.toLocaleString()} (${p.pcsPerCtn} pcs/ctn)</strong>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-muted);">Stock Status:</span>
                  <strong style="color: var(--accent-emerald);">${p.stock} units available</strong>
                </div>
                <div class="badge-pay-delivery" style="margin-top: 0.8rem;">
                  <span>🚚</span> Pay on Delivery Available in Nairobi & Environs
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem;">
                <button class="btn-gold-action" style="padding: 0.9rem;" data-action="add-to-cart" data-id="${p.id}">
                  Add to Cart (KSh ${displayPrice.toLocaleString()})
                </button>
                <button class="btn-whatsapp-direct" style="padding: 0.9rem; justify-content: center; font-size: 0.9rem;" data-action="order-whatsapp-product" data-id="${p.id}">
                  💬 Order via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    renderCartDrawer() {
      let container = document.getElementById('cartDrawerContainer');
      if (!this.isCartOpen) {
        if (container) container.remove();
        return;
      }

      if (!container) {
        container = document.createElement('div');
        container.id = 'cartDrawerContainer';
        document.body.appendChild(container);
      }

      const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      const tax = Math.round(subtotal * 0.16);
      const total = subtotal + tax;

      container.innerHTML = `
        <!-- Backdrop: clicking it closes the cart -->
        <div class="cart-drawer-backdrop" data-action="close-cart"></div>

        <!-- Cart Panel -->
        <div class="warm-cart-drawer" role="dialog" aria-label="Shopping Cart">
          <div style="padding: 1.2rem 1.5rem; border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;">
            <h3 style="margin:0; font-size: 1.1rem;">Your Cart (${this.cart.reduce((t, i) => t + i.qty, 0)} items)</h3>
            <button class="close-btn-round" style="position: static; flex-shrink:0;" data-action="close-cart" aria-label="Close cart">&times;</button>
          </div>

          <div style="flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 1rem; display: flex; flex-direction: column; gap: 1rem;">
            ${this.cart.length === 0 ? `
              <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                <div style="margin-bottom: 1rem; font-size: 2.5rem;">🛒</div>
                <p>Your cart is empty</p>
              </div>
            ` : this.cart.map((item, idx) => `
              <div style="display: flex; gap: 0.8rem; background: var(--bg-warm-gold); border: 1px solid var(--border-strong); border-radius: var(--radius-md); padding: 0.8rem; align-items: center;">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: contain; background: #fff; border-radius: 6px; border: 1px solid var(--border-subtle); flex-shrink: 0;" onerror="this.src='Products/Gradiator Products/Multi-Purpose Degreaser.jpg'">
                <div style="flex: 1; min-width: 0;">
                  <div style="font-weight: 800; font-size: 0.85rem; line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</div>
                  <div style="font-size: 0.72rem; color: var(--text-muted);">${item.priceMode === 'carton' ? `Carton (${item.pcsPerCtn} pcs)` : 'Single Unit'}</div>
                  <div style="font-weight: 800; color: var(--bg-dark-obsidian); font-size: 0.9rem;">KSh ${(item.price * item.qty).toLocaleString()}</div>
                </div>

                <div style="display: flex; align-items: center; gap: 0.3rem; background: #fff; border: 1px solid var(--border-strong); border-radius: 6px; padding: 0.2rem; flex-shrink: 0;">
                  <button style="width: 26px; height: 26px; border: none; background: none; font-size: 1rem; font-weight: bold; cursor: pointer; border-radius: 4px;" data-action="update-qty" data-id="${idx}" data-change="-1">−</button>
                  <span style="font-size: 0.9rem; font-weight: 800; width: 20px; text-align: center;">${item.qty}</span>
                  <button style="width: 26px; height: 26px; border: none; background: none; font-size: 1rem; font-weight: bold; cursor: pointer; border-radius: 4px;" data-action="update-qty" data-id="${idx}" data-change="1">+</button>
                </div>

                <button style="color: var(--accent-deep-red); background: none; border: none; font-size: 1.1rem; cursor: pointer; padding: 0.4rem; flex-shrink: 0;" data-action="remove-cart-item" data-id="${idx}" aria-label="Remove item">&times;</button>
              </div>
            `).join('')}
          </div>

          ${this.cart.length > 0 ? `
            <div style="padding: 1.2rem 1.5rem; border-top: 1px solid var(--border-subtle); background: var(--bg-subtle); flex-shrink: 0;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem; font-size: 0.88rem; color: var(--text-muted);">
                <span>Subtotal</span><span>KSh ${subtotal.toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem; font-size: 0.88rem; color: var(--text-muted);">
                <span>VAT (16%)</span><span>KSh ${tax.toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 1.15rem; font-weight: 800; border-top: 1px solid var(--border-strong); padding-top: 0.7rem; margin-top: 0.7rem;">
                <span>Total</span>
                <span style="color: var(--primary-gold-dark);">KSh ${total.toLocaleString()}</span>
              </div>
              <button class="btn-gold-action" style="width: 100%; margin-top: 1rem; padding: 1rem; font-size: 1rem;" data-action="open-checkout">
                ✅ Proceed to Checkout
              </button>
            </div>
          ` : ''}
        </div>
      `;
    }

    renderCheckoutModal() {
      let modal = document.getElementById('checkoutModalOverlay');
      if (!this.isCheckoutOpen) {
        if (modal) modal.remove();
        return;
      }

      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'checkoutModalOverlay';
        modal.className = 'modal-gold-overlay';
        document.body.appendChild(modal);
      }

      const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      const tax = Math.round(subtotal * 0.16);
      const total = subtotal + tax;

      modal.innerHTML = `
        <div class="modal-gold-box checkout-modal-box">
          <button class="close-btn-round" data-action="close-checkout" aria-label="Close checkout">&times;</button>

          <h2 style="margin-bottom: 0.3rem; font-size: 1.4rem;">Complete Your Order</h2>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.88rem;">Need help? Call <strong>${HOTLINE_PHONE}</strong></p>

          <form id="checkoutForm" onsubmit="window.app.handleCheckoutSubmit(event)">
            <div class="checkout-form-grid">
              <div>
                <label class="form-field-label">FULL NAME *</label>
                <input type="text" name="customerName" class="warm-input" placeholder="e.g. David Mwangi" required>
              </div>
              <div>
                <label class="form-field-label">EMAIL ADDRESS</label>
                <input type="email" name="customerEmail" class="warm-input" placeholder="david@company.com">
              </div>
            </div>

            <div class="checkout-form-grid">
              <div>
                <label class="form-field-label">PHONE NUMBER *</label>
                <input type="tel" name="customerPhone" class="warm-input" placeholder="07XXXXXXXX" required>
              </div>
              <div>
                <label class="form-field-label">TOWN / CITY *</label>
                <input type="text" name="customerCity" class="warm-input" placeholder="Nairobi / Mombasa" required>
              </div>
            </div>

            <div style="margin-bottom: 1rem;">
              <label class="form-field-label">DELIVERY ADDRESS *</label>
              <input type="text" name="customerAddress" class="warm-input" placeholder="Building name, street, or shop location" required>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <label class="form-field-label">PAYMENT METHOD</label>
              <select name="paymentMethod" class="warm-select" required>
                <option value="M-Pesa / Mobile Money">Mobile Money (M-Pesa / Paybill)</option>
                <option value="Cash on Delivery">Pay on Delivery (Nairobi &amp; Environs)</option>
                <option value="Credit Card">Credit / Debit Card</option>
                <option value="Bank Transfer">Corporate Bank Transfer</option>
              </select>
            </div>

            <div style="background: var(--bg-warm-gold); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 1.2rem; margin-bottom: 1.5rem;">
              <div style="display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: 800;">
                <span>Total Payable:</span>
                <span style="color: var(--primary-gold-dark);">KSh ${total.toLocaleString()}</span>
              </div>
            </div>

            <button type="submit" class="btn-gold-action" style="width: 100%; padding: 1rem; font-size: 1rem;">
              📲 Confirm Order &amp; Send via WhatsApp
            </button>
          </form>
        </div>
      `;
    }

    renderReceiptModal() {
      let modal = document.getElementById('receiptModalOverlay');
      if (!this.viewingOrder) {
        if (modal) modal.remove();
        return;
      }

      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'receiptModalOverlay';
        modal.className = 'modal-gold-overlay';
        document.body.appendChild(modal);
      }

      const o = this.viewingOrder;
      const waUrl = o.waUrl || `https://wa.me/254${HOTLINE_PHONE.replace(/^0/, '')}`;

      modal.innerHTML = `
        <div class="modal-gold-box" style="padding: 2.5rem; max-width: 580px;">
          <button class="close-btn-round" data-action="close-receipt">✕</button>

          <div style="text-align: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1.2rem; margin-bottom: 1.5rem;">
            <img src="${OFFICIAL_LOGO}" alt="AUTO HOMAGE Logo" style="height: 60px; margin-bottom: 0.5rem;">
            <h2 style="letter-spacing: 0.05em; color: var(--bg-dark-obsidian);">AUTO HOMAGE</h2>
            <p style="color: var(--text-muted); font-size: 0.85rem; font-weight: 700;">Official Order Invoice • Hotline: ${HOTLINE_PHONE}</p>
          </div>

          <div style="display: flex; justify-content: space-between; margin-bottom: 1.2rem; font-size: 0.88rem;">
            <div>
              <div style="color: var(--text-muted);">Order Ref:</div>
              <strong style="color: var(--primary-gold-dark); font-family: monospace;">${o.id}</strong>
            </div>
            <div style="text-align: right;">
              <div style="color: var(--text-muted);">Date & Time:</div>
              <strong>${o.date}</strong>
            </div>
          </div>

          <div style="background: var(--bg-warm-gold); border: 1px solid var(--border-strong); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.5rem; font-size: 0.88rem; line-height: 1.6;">
            <div><strong>Customer:</strong> ${o.customer.name} (${o.customer.phone})</div>
            <div><strong>Destination:</strong> ${o.customer.address}, ${o.customer.city}</div>
            <div><strong>Vehicle Application:</strong> ${o.vehicle}</div>
            <div><strong>Payment Method:</strong> ${o.paymentMethod}</div>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.85rem;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-subtle); text-align: left; color: var(--text-muted);">
                <th style="padding: 0.5rem 0;">Item Description</th>
                <th style="padding: 0.5rem 0; text-align: center;">Qty</th>
                <th style="padding: 0.5rem 0; text-align: right;">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${o.items.map(item => `
                <tr style="border-bottom: 1px solid var(--border-subtle);">
                  <td style="padding: 0.6rem 0;">${item.name}</td>
                  <td style="padding: 0.6rem 0; text-align: center;">${item.qty}</td>
                  <td style="padding: 0.6rem 0; text-align: right;">KSh ${(item.price * item.qty).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 800; border-top: 2px solid var(--bg-dark-obsidian); padding-top: 1rem; margin-bottom: 1.5rem; color: var(--bg-dark-obsidian);">
            <span>Grand Total Amount</span>
            <span style="color: var(--primary-gold-dark);">KSh ${o.totalAmount.toLocaleString()}</span>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-top: 1.2rem;">
            <a href="${waUrl}" target="_blank" class="btn-whatsapp-direct" style="padding: 0.85rem; justify-content: center; font-size: 0.88rem; font-weight: 800; text-decoration: none;">
              💬 Send Order Details to WhatsApp
            </a>
            <button class="btn-dark-outline" style="padding: 0.85rem; font-size: 0.88rem;" onclick="window.print()">
              🖨️ Print Invoice
            </button>
          </div>
        </div>
      `;
    }

    toggleAdminPasswordVisibility() {
      const pwdInput = document.getElementById('adminPasswordInput');
      const eyeIcon = document.getElementById('adminPasswordEyeIcon');
      if (!pwdInput) return;
      if (pwdInput.type === 'password') {
        pwdInput.type = 'text';
        if (eyeIcon) eyeIcon.textContent = '🙈';
      } else {
        pwdInput.type = 'password';
        if (eyeIcon) eyeIcon.textContent = '👁️';
      }
    }

    renderAdminAuthModal() {
      let modal = document.getElementById('adminAuthModalOverlay');
      if (!this.isAdminAuthModalOpen) {
        if (modal) modal.remove();
        return;
      }

      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'adminAuthModalOverlay';
        modal.className = 'modal-gold-overlay';
        document.body.appendChild(modal);
      }

      modal.innerHTML = `
        <div class="modal-gold-box" style="padding: 2.8rem 2.2rem; max-width: 440px; text-align: center; background: linear-gradient(145deg, #1c1917 0%, #0c0a09 100%); border: 2px solid var(--primary-gold); color: #ffffff; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(198, 146, 20, 0.25); border-radius: 20px; position: relative;">
          
          <button class="close-btn-round" data-action="close-admin-auth" style="background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); color: #fff;">✕</button>

          <!-- TOP BADGE & LOGO EMBLEM -->
          <div style="margin-bottom: 1.2rem; display: inline-flex; align-items: center; justify-content: center; position: relative;">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: radial-gradient(circle, var(--primary-gold) 0%, #9a6f10 100%); display: flex; align-items: center; justify-content: center; padding: 3px; box-shadow: 0 0 25px rgba(198, 146, 20, 0.45);">
              <div style="width: 100%; height: 100%; border-radius: 50%; background: #1c1917; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                <img src="logo.png" alt="Auto Homage Logo" style="width: 48px; height: 48px; object-fit: contain;" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <span style="display: none; color: var(--primary-gold); font-size: 1.8rem;">🔒</span>
              </div>
            </div>
          </div>

          <h2 style="font-family: var(--font-heading); font-size: 1.45rem; font-weight: 800; color: #ffffff; letter-spacing: 0.02em; margin-bottom: 0.3rem;">
            AUTO HOMAGE <span style="color: var(--primary-gold);">ADMIN</span>
          </h2>
          <p style="color: #a8a29e; font-size: 0.82rem; margin-bottom: 1.8rem;">Authorized Operations &amp; Store Management Portal</p>

          <form id="adminLoginForm" onsubmit="window.app.handleAdminLoginSubmit(event)">
            <!-- USERNAME INPUT -->
            <div style="margin-bottom: 1.1rem; text-align: left;">
              <label style="font-size: 0.72rem; font-weight: 800; color: var(--primary-gold); display: block; margin-bottom: 0.4rem; letter-spacing: 0.08em; text-transform: uppercase;">
                👤 USERNAME
              </label>
              <input type="text" name="adminUsername" class="warm-input" placeholder="Enter username" required autofocus
                style="background: rgba(255, 255, 255, 0.06); border: 1.5px solid rgba(198, 146, 20, 0.4); color: #ffffff; font-size: 0.95rem; padding: 0.75rem 1rem; border-radius: 10px; width: 100%; outline: none; transition: border-color 0.2s;"
                onfocus="this.style.borderColor='var(--primary-gold)'; this.style.boxShadow='0 0 12px rgba(198, 146, 20, 0.3)';"
                onblur="this.style.borderColor='rgba(198, 146, 20, 0.4)'; this.style.boxShadow='none';">
            </div>

            <!-- PASSWORD INPUT WITH EYE TOGGLE -->
            <div style="margin-bottom: 1.4rem; text-align: left;">
              <label style="font-size: 0.72rem; font-weight: 800; color: var(--primary-gold); display: block; margin-bottom: 0.4rem; letter-spacing: 0.08em; text-transform: uppercase;">
                🔑 PASSWORD
              </label>
              <div style="position: relative; display: flex; align-items: center;">
                <input type="password" id="adminPasswordInput" name="adminPassword" class="warm-input" placeholder="Enter password" required
                  style="background: rgba(255, 255, 255, 0.06); border: 1.5px solid rgba(198, 146, 20, 0.4); color: #ffffff; font-size: 0.95rem; padding: 0.75rem 2.8rem 0.75rem 1rem; border-radius: 10px; width: 100%; outline: none; transition: border-color 0.2s; letter-spacing: 0.08em;"
                  onfocus="this.style.borderColor='var(--primary-gold)'; this.style.boxShadow='0 0 12px rgba(198, 146, 20, 0.3)';"
                  onblur="this.style.borderColor='rgba(198, 146, 20, 0.4)'; this.style.boxShadow='none';">
                <button type="button" onclick="window.app.toggleAdminPasswordVisibility()" title="Toggle Password Visibility"
                  style="position: absolute; right: 0.7rem; background: transparent; border: none; color: #a8a29e; font-size: 1.1rem; cursor: pointer; padding: 0.2rem;">
                  <span id="adminPasswordEyeIcon">👁️</span>
                </button>
              </div>
            </div>

            <!-- ERROR ALERT BOX -->
            <div id="adminAuthError" style="display: none; color: #fca5a5; font-size: 0.82rem; font-weight: 700; margin-bottom: 1.2rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); padding: 0.65rem 0.9rem; border-radius: 8px; text-align: left;">
              ✕ Invalid credentials. Access denied.
            </div>

            <!-- SUBMIT BUTTON -->
            <button type="submit" id="adminAuthSubmitBtn" class="btn-gold-action"
              style="width: 100%; padding: 0.9rem; font-size: 0.95rem; font-weight: 800; border-radius: 10px; background: linear-gradient(135deg, var(--primary-gold) 0%, #b8830f 100%); color: #ffffff; border: none; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s; box-shadow: 0 4px 15px rgba(198, 146, 20, 0.35);">
              🔓 Unlock Admin Control Panel
            </button>
          </form>

          <!-- FOOTER SECURITY BADGE -->
          <div style="margin-top: 1.8rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; gap: 0.4rem; font-size: 0.74rem; color: #78716c;">
            <span>🛡️</span> <span>Secured Administrator Session</span>
          </div>

        </div>
      `;
    }

    renderAddProductModal() {
      let modal = document.getElementById('addProductModalOverlay');
      if (!this.isAddProductModalOpen) {
        if (modal) modal.remove();
        return;
      }

      if (!modal) {
        modal = document.createElement('div');
        modal.id = 'addProductModalOverlay';
        modal.className = 'modal-gold-overlay';
        document.body.appendChild(modal);
      }

      modal.innerHTML = `
        <div class="modal-gold-box" style="padding: 2.5rem; max-width: 680px;">
          <button class="close-btn-round" data-action="close-add-product">✕</button>

          <h2 style="margin-bottom: 0.4rem;">Add New Product to Store Catalog</h2>
          <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 1.5rem;">New items will immediately sync to backend database and customer catalog.</p>

          <form id="addProductForm" onsubmit="window.app.handleAddProductSubmit(event)">
            <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">SKU CODE</label>
                <input type="text" name="prodCode" class="warm-input" placeholder="e.g. AH-GT-0120" required>
              </div>
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">PRODUCT TITLE</label>
                <input type="text" name="prodName" class="warm-input" placeholder="e.g. Flamingo High Gloss Car Wax" required>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">BRAND</label>
                <select name="prodBrand" class="warm-select" required>
                  <option value="gladiator">Gladiator Car Tech</option>
                  <option value="flamingo">Flamingo Formulations</option>
                  <option value="power_eagle">Power Eagle</option>
                  <option value="universal">Universal Brand</option>
                </select>
              </div>
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">CATEGORY</label>
                <select name="prodCategory" class="warm-select" required>
                  ${CATEGORIES.filter(c => c.id !== 'all').map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                </select>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">RETAIL PRICE (KSH)</label>
                <input type="number" name="prodPrice" class="warm-input" placeholder="e.g. 500" required min="1">
              </div>
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">CARTON RATE (KSH)</label>
                <input type="number" name="prodCtnPrice" class="warm-input" placeholder="e.g. 6000">
              </div>
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">PCS PER CARTON</label>
                <input type="number" name="prodPcsPerCtn" class="warm-input" placeholder="12" value="12">
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">INITIAL STOCK COUNT</label>
                <input type="number" name="prodStock" class="warm-input" value="50" required>
              </div>
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">FITMENT TYPE</label>
                <select name="prodApplication" class="warm-select" required>
                  <option value="universal">Universal Application</option>
                  <option value="vehicle">Vehicle Specific Part</option>
                </select>
              </div>
            </div>

            <!-- IMAGE UPLOAD WITH LIVE PREVIEW -->
            <div style="margin-bottom: 1rem;">
              <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.5rem;">PRODUCT IMAGE</label>
              <div style="display: flex; gap: 1.2rem; align-items: flex-start; background: var(--bg-warm-gold); border: 1.5px solid var(--border-gold); border-radius: var(--radius-md); padding: 1rem;">
                <!-- Live image preview box -->
                <div style="flex-shrink: 0; width: 100px; height: 100px; border: 2px dashed var(--border-gold); border-radius: var(--radius-md); background: #fff; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative;">
                  <img id="newProdPreview" src="" alt="Preview" style="width: 100%; height: 100%; object-fit: contain; display: none;">
                  <span id="newProdPreviewPlaceholder" style="font-size: 2.2rem;">📷</span>
                </div>
                <!-- Upload controls -->
                <div style="flex: 1; display: flex; flex-direction: column; gap: 0.6rem;">
                  <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-main);">Upload a picture or paste a URL</div>
                  <label class="btn-img-upload" style="width: fit-content; cursor: pointer; font-size: 0.82rem; padding: 0.45rem 1rem;">
                    📤 Choose Image File
                    <input type="file" accept="image/*" style="display: none;" onchange="window.app.handleNewProdImageUpload(this)">
                  </label>
                  <div style="font-size: 0.74rem; color: var(--text-muted);">— or paste an image URL below —</div>
                  <input type="text" id="newProdImageUrl" class="warm-input" style="font-size: 0.82rem;" placeholder="Products/Folder/photo.jpg  or  https://example.com/img.jpg"
                    oninput="
                      const prev=document.getElementById('newProdPreview');
                      const ph=document.getElementById('newProdPreviewPlaceholder');
                      if(this.value.trim()){prev.src=this.value.trim();prev.style.display='block';ph.style.display='none';}
                      else{prev.style.display='none';ph.style.display='block';}
                    ">
                </div>
              </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">DESCRIPTION</label>
              <textarea name="prodDescription" class="warm-input" style="height: 80px;" placeholder="Describe features, usage, and applications..."></textarea>
            </div>

            <button type="submit" class="btn-gold-action" style="width: 100%; padding: 0.9rem;">
              ✓ Save & Add to Catalog
            </button>
          </form>
        </div>
      `;
    }

    renderAdminDashboard() {
      const container = document.getElementById('appContent');

      const totalRevenue = this.orders.reduce((sum, o) => sum + o.totalAmount, 0);
      const totalOrders = this.orders.length;
      const avgOrderVal = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
      const totalUnitsSold = this.orders.reduce((sum, o) => {
        return sum + o.items.reduce((iSum, i) => iSum + i.qty, 0);
      }, 0);

      container.innerHTML = `
        <div class="admin-portal-wrapper">
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-subtle);">
            <div>
              <div style="display: flex; align-items: center; gap: 0.6rem;">
                <h1>Operations & Inventory Control Portal</h1>
                <span style="background: #dcfce7; color: #15803d; border: 1px solid #86efac; font-size: 0.75rem; font-weight: 800; padding: 0.2rem 0.6rem; border-radius: 20px;">🔒 Secured Authenticated Session</span>
              </div>
              <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.2rem;">Full authority to manage products, edit retail/carton prices, track stock & manage order pipeline.</p>
            </div>
            
            <div style="display: flex; gap: 0.8rem; align-items: center;">
              <button class="btn-gold-action" data-action="open-add-product" style="padding: 0.65rem 1.2rem;">
                ${ICONS.plus} Add New Product
              </button>
              <button class="btn-gold-action" data-action="admin-logout" style="background: var(--bg-dark-obsidian); border-color: var(--bg-dark-obsidian); color: #fff;">
                Logout Admin
              </button>
            </div>
          </div>

          <!-- ADMIN TAB NAVIGATION -->
          <div style="display: flex; gap: 0.8rem; border-bottom: 2px solid var(--border-subtle); padding-bottom: 0.8rem; flex-wrap: wrap;">
            <button class="admin-tab-btn ${this.adminActiveTab === 'inventory' ? 'active' : ''}" data-action="admin-set-tab" data-id="inventory">
              📦 Products & Price Inventory (${this.products.length})
            </button>
            <button class="admin-tab-btn ${this.adminActiveTab === 'orders' ? 'active' : ''}" data-action="admin-set-tab" data-id="orders">
              📋 Order Pipeline & Financials (${this.orders.length})
            </button>
            <button class="admin-tab-btn ${this.adminActiveTab === 'security' ? 'active' : ''}" data-action="admin-set-tab" data-id="security">
              🔐 Security & Password Settings
            </button>
          </div>

          ${this.adminActiveTab === 'inventory' ? `
            <!-- PRODUCTS & PRICE INVENTORY MANAGEMENT TAB -->
            <div style="background: var(--bg-surface); border: 1px solid var(--border-strong); border-radius: var(--radius-lg); padding: 1.6rem; box-shadow: var(--shadow-sm);">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.2rem;">
                <h3>Product & Price Management</h3>

                <div style="position: relative; width: 280px;">
                  <input type="text" id="adminInventorySearch" class="warm-input" style="padding-left: 2.2rem;" placeholder="Search SKU code or product name..." value="${this.adminSearchQuery}">
                  <span style="position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: var(--text-muted);">${ICONS.search}</span>
                </div>
              </div>

              <div id="adminInventoryTableContainer" style="overflow-x: auto;">
                <!-- Rendered via renderAdminInventoryTable() -->
              </div>
            </div>
          ` : (this.adminActiveTab === 'security' ? `
            <!-- SECURITY & PASSWORD MANAGEMENT TAB -->
            <div style="background: var(--bg-surface); border: 1px solid var(--border-strong); border-radius: var(--radius-lg); padding: 2rem; max-width: 520px; box-shadow: var(--shadow-sm);">
              <h3 style="margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem; color: var(--bg-dark-obsidian);">
                🔐 Security &amp; Master Password Settings
              </h3>
              <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 1.6rem;">Update your administrator credentials for store operations access.</p>

              <form onsubmit="window.app.handleChangeAdminPasswordSubmit(event)">
                <div style="margin-bottom: 1.2rem;">
                  <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.4rem;">CURRENT PASSWORD</label>
                  <input type="password" name="currentAdminPassword" class="warm-input" placeholder="Enter current password" required style="font-size: 0.95rem;">
                </div>

                <div style="margin-bottom: 1.2rem;">
                  <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.4rem;">NEW PASSWORD</label>
                  <input type="password" name="newAdminPassword" class="warm-input" placeholder="Enter new password (min 6 characters)" required minlength="6" style="font-size: 0.95rem;">
                </div>

                <div style="margin-bottom: 1.5rem;">
                  <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.4rem;">CONFIRM NEW PASSWORD</label>
                  <input type="password" name="confirmAdminPassword" class="warm-input" placeholder="Confirm new password" required minlength="6" style="font-size: 0.95rem;">
                </div>

                <div id="changePwdError" style="display: none; color: #dc2626; font-size: 0.85rem; font-weight: 700; margin-bottom: 1rem; background: #fef2f2; border: 1px solid #fca5a5; padding: 0.65rem 0.9rem; border-radius: 8px;"></div>
                <div id="changePwdSuccess" style="display: none; color: #15803d; font-size: 0.85rem; font-weight: 700; margin-bottom: 1rem; background: #dcfce7; border: 1px solid #86efac; padding: 0.65rem 0.9rem; border-radius: 8px;"></div>

                <button type="submit" class="btn-gold-action" style="width: 100%; padding: 0.9rem; font-weight: 800;">
                  ✓ Update Administrator Password
                </button>
              </form>
            </div>
          ` : `
            <!-- ORDERS & FINANCIAL CONTROL TAB -->
            <!-- KPI Metrics Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem;">
              <div class="corporate-stat-card">
                <div style="width: 48px; height: 48px; border-radius: 10px; background: var(--primary-gold-light); display: flex; align-items: center; justify-content: center; color: var(--primary-gold-dark); font-size: 1.3rem;">💰</div>
                <div>
                  <div style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--bg-dark-obsidian);">KSh ${totalRevenue.toLocaleString()}</div>
                  <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Total Store Earnings</div>
                </div>
              </div>

              <div class="corporate-stat-card">
                <div style="width: 48px; height: 48px; border-radius: 10px; background: var(--primary-gold-light); display: flex; align-items: center; justify-content: center; color: var(--primary-gold-dark); font-size: 1.3rem;">🛒</div>
                <div>
                  <div style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--bg-dark-obsidian);">${totalOrders}</div>
                  <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Orders Placed</div>
                </div>
              </div>

              <div class="corporate-stat-card">
                <div style="width: 48px; height: 48px; border-radius: 10px; background: var(--primary-gold-light); display: flex; align-items: center; justify-content: center; color: var(--primary-gold-dark); font-size: 1.3rem;">📦</div>
                <div>
                  <div style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--bg-dark-obsidian);">${totalUnitsSold}</div>
                  <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Units & Cartons Sold</div>
                </div>
              </div>

              <div class="corporate-stat-card">
                <div style="width: 48px; height: 48px; border-radius: 10px; background: var(--primary-gold-light); display: flex; align-items: center; justify-content: center; color: var(--primary-gold-dark); font-size: 1.3rem;">📈</div>
                <div>
                  <div style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--bg-dark-obsidian);">KSh ${avgOrderVal.toLocaleString()}</div>
                  <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Average Order Value</div>
                </div>
              </div>
            </div>

            <!-- Orders Management Table -->
            <div style="background: var(--bg-surface); border: 1px solid var(--border-strong); border-radius: var(--radius-lg); padding: 1.6rem; box-shadow: var(--shadow-sm);">
              <h3 style="margin-bottom: 1.2rem;">Store Order Fulfillment Pipeline</h3>

              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.9rem;">
                  <thead>
                    <tr style="background: var(--bg-warm-gold); border-bottom: 1px solid var(--border-subtle); color: var(--text-muted); font-size: 0.78rem; text-transform: uppercase;">
                      <th style="padding: 0.9rem 1rem;">Invoice Ref</th>
                      <th style="padding: 0.9rem 1rem;">Customer</th>
                      <th style="padding: 0.9rem 1rem;">Vehicle</th>
                      <th style="padding: 0.9rem 1rem;">Total Value</th>
                      <th style="padding: 0.9rem 1rem;">Payment Method</th>
                      <th style="padding: 0.9rem 1rem;">Status</th>
                      <th style="padding: 0.9rem 1rem;">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.orders.map(o => `
                      <tr style="border-bottom: 1px solid var(--border-subtle);">
                        <td style="font-family: monospace; font-weight: 700; color: var(--primary-gold-dark);">${o.id}</td>
                        <td>
                          <div style="font-weight: 700; color: var(--bg-dark-obsidian);">${o.customer.name}</div>
                          <div style="font-size: 0.78rem; color: var(--text-muted);">${o.customer.city} (${o.customer.phone})</div>
                        </td>
                        <td style="font-size: 0.85rem;">${o.vehicle}</td>
                        <td style="font-weight: 800;">KSh ${o.totalAmount.toLocaleString()}</td>
                        <td>${o.paymentMethod}</td>
                        <td>
                          <select class="warm-select" style="padding: 0.35rem 0.5rem; font-size: 0.82rem;" onchange="window.app.handleOrderStatusUpdate('${o.id}', this.value)">
                            <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
                            <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                            <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                          </select>
                        </td>
                        <td>
                          <button class="btn-gold-action" style="padding: 0.35rem 0.7rem; font-size: 0.78rem;" data-action="view-order-receipt" data-id="${o.id}">
                            Invoice
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          `)}
        </div>
      `;

      if (this.adminActiveTab === 'inventory') {
        this.renderAdminInventoryTable();
      }
    }

    renderAdminInventoryTable() {
      const container = document.getElementById('adminInventoryTableContainer');
      if (!container) return;

      let filtered = this.products;
      if (this.adminSearchQuery) {
        const q = this.adminSearchQuery.toLowerCase();
        filtered = this.products.filter(p => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q));
      }

      if (filtered.length === 0) {
        container.innerHTML = `<div style="text-align: center; padding: 2rem; color: var(--text-muted);">No products match search criteria.</div>`;
        return;
      }

      container.innerHTML = `
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.88rem;">
          <thead>
            <tr style="background: var(--bg-warm-gold); border-bottom: 1px solid var(--border-subtle); color: var(--text-muted); font-size: 0.78rem; text-transform: uppercase;">
              <th style="padding: 0.8rem; min-width: 110px;">Image</th>
              <th style="padding: 0.8rem;">SKU</th>
              <th style="padding: 0.8rem; min-width: 200px;">Product Name &amp; Brand</th>
              <th style="padding: 0.8rem;">Retail (KSh)</th>
              <th style="padding: 0.8rem;">Carton (KSh)</th>
              <th style="padding: 0.8rem;">Stock</th>
              <th style="padding: 0.8rem; text-align: center; min-width: 120px;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(p => `
              <tr style="border-bottom: 1px solid var(--border-subtle); vertical-align: top;">
                <!-- IMAGE COLUMN with preview + upload -->
                <td style="padding: 0.8rem;">
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 0.4rem;">
                    <img id="adminImgPrev_${p.id}" src="${p.image}" alt="${p.name}"
                      style="width: 60px; height: 60px; object-fit: contain; background: #fff; border-radius: 8px; border: 1.5px solid var(--border-gold); box-shadow: var(--shadow-sm);"
                      onerror="this.src='Products/Gradiator Products/Multi-Purpose Degreaser.jpg'">
                    <!-- Hidden input stores the current image src/dataURL -->
                    <input type="hidden" data-image-id="${p.id}" value="${p.image}">
                    <!-- File picker button -->
                    <label class="btn-img-upload" style="cursor: pointer;" title="Upload new product image">
                      📷 Change
                      <input type="file" accept="image/*" style="display:none;"
                        onchange="window.app.handleAdminImageUpload('${p.id}', this)">
                    </label>
                  </div>
                </td>

                <!-- SKU CODE -->
                <td style="padding: 0.8rem; font-family: monospace; font-weight: 700; color: var(--primary-gold-dark); font-size: 0.82rem;">${p.code}</td>

                <!-- EDITABLE NAME -->
                <td style="padding: 0.8rem;">
                  <input type="text" class="admin-table-input" style="max-width: 200px; font-weight: 700;"
                    data-name-id="${p.id}" value="${p.name.replace(/"/g, '&quot;')}">
                  <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: capitalize; margin-top: 0.25rem;">${p.brand.replace('_', ' ')} • ${p.category.replace(/_/g, ' ')}</div>
                </td>

                <!-- RETAIL PRICE -->
                <td style="padding: 0.8rem;">
                  <input type="number" class="admin-table-input" data-price-id="${p.id}" value="${p.price}">
                </td>

                <!-- CARTON RATE -->
                <td style="padding: 0.8rem;">
                  <input type="number" class="admin-table-input" data-ctnprice-id="${p.id}" value="${p.ctnPrice}">
                </td>

                <!-- STOCK -->
                <td style="padding: 0.8rem;">
                  <input type="number" class="admin-table-input" style="max-width: 80px;" data-stock-id="${p.id}" value="${p.stock}">
                </td>

                <!-- SAVE BUTTON -->
                <td style="padding: 0.8rem; text-align: center;">
                  <button class="btn-gold-action" style="padding: 0.45rem 0.9rem; font-size: 0.78rem; white-space: nowrap;"
                    data-action="save-product-price" data-id="${p.id}">
                    ✓ Save Changes
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.app = new AutoHomageApp();
  });
})();
