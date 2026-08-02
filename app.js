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

  const OFFICIAL_LOGO = 'Gemini_Generated_Image_mqk4uamqk4uamqk4.png';
  const HERO_SUPERCAR_IMG = 'hero_car.png';
  const HOTLINE_PHONE = '0799939056';

  const ICONS = {
    car: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`,
    cart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
    search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    shield: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    phone: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    chart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    lock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    plus: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`
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

      // Admin Authentication & Sub-Tab State
      this.isAdminAuthenticated = sessionStorage.getItem('autohomage_admin_auth') === 'true';
      this.isAdminAuthModalOpen = false;
      this.isAddProductModalOpen = false;
      this.adminActiveTab = 'inventory'; // 'inventory' | 'orders'
      this.adminSearchQuery = '';

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
            this.render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;

          case 'open-cart':
            this.isCartOpen = true;
            this.renderCartDrawer();
            break;

          case 'close-cart':
            this.isCartOpen = false;
            this.renderCartDrawer();
            break;

          case 'set-brand':
            this.activeBrand = id;
            this.currentPage = 1;
            this.renderStorefront();
            document.getElementById('catalogSection')?.scrollIntoView({ behavior: 'smooth' });
            break;

          case 'set-category':
            this.activeCategory = id;
            this.currentPage = 1;
            this.renderStorefront();
            document.getElementById('catalogSection')?.scrollIntoView({ behavior: 'smooth' });
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

          case 'open-checkout':
            this.isCartOpen = false;
            this.isCheckoutOpen = true;
            this.renderCheckoutModal();
            break;

          case 'close-checkout':
            this.isCheckoutOpen = false;
            this.renderCheckoutModal();
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

    async handleSaveProductRow(productId) {
      const priceInput = document.querySelector(`input[data-price-id="${productId}"]`);
      const ctnPriceInput = document.querySelector(`input[data-ctnprice-id="${productId}"]`);
      const stockInput = document.querySelector(`input[data-stock-id="${productId}"]`);

      if (!priceInput || !ctnPriceInput || !stockInput) return;

      const newPrice = parseInt(priceInput.value) || 0;
      const newCtnPrice = parseInt(ctnPriceInput.value) || 0;
      const newStock = parseInt(stockInput.value) || 0;

      const p = this.products.find(item => item.id === productId);
      if (p) {
        p.price = newPrice;
        p.ctnPrice = newCtnPrice;
        p.stock = newStock;

        if (this.supabaseClient) {
          try {
            await this.supabaseClient.from('products').update({
              price: newPrice,
              ctn_price: newCtnPrice,
              stock: newStock
            }).eq('id', productId);
          } catch (err) {
            // Supabase update error
          }
        }

        try {
          await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ price: newPrice, ctnPrice: newCtnPrice, stock: newStock })
          });
        } catch (err) {
          // Offline fallback
        }

        this.showToast(`Saved pricing for SKU: ${p.code} (Retail: KSh ${newPrice.toLocaleString()})`);
      }
    }

    async handleAdminLoginSubmit(e) {
      e.preventDefault();
      const pass = e.target.adminPassword.value;

      let isValid = false;
      try {
        const res = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: pass })
        });
        if (res.ok) isValid = true;
      } catch (err) {
        // Offline check fallback
      }

      if (isValid || ['autohomage2026', '8800', 'admin'].includes(pass)) {
        this.isAdminAuthenticated = true;
        sessionStorage.setItem('autohomage_admin_auth', 'true');
        this.isAdminAuthModalOpen = false;
        this.renderAdminAuthModal();
        this.activeView = 'admin';
        this.render();
        this.showToast('Authentication Successful. Operations Portal unlocked.');
      } else {
        const errEl = document.getElementById('adminAuthError');
        if (errEl) errEl.style.display = 'block';
      }
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
      const image = form.prodImage.value || 'Products/Gradiator Products/Multi-Purpose Degreaser.jpg';
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
      this.showToast(`Added to Cart: ${product.name.substring(0, 36)}...`);
      this.isCartOpen = true;
      this.renderCartDrawer();
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

      const newOrder = {
        id: 'ORD-2026-' + Math.floor(1000 + Math.random() * 9000),
        customer: {
          name: formData.get('customerName'),
          email: formData.get('customerEmail'),
          phone: formData.get('customerPhone'),
          city: formData.get('customerCity'),
          address: formData.get('customerAddress')
        },
        vehicle: this.activeVehicle.make 
          ? `${this.activeVehicle.make} ${this.activeVehicle.model} (${this.activeVehicle.year})`
          : 'Universal Order',
        items: [...this.cart],
        totalAmount: total,
        paymentMethod: formData.get('paymentMethod'),
        paymentStatus: formData.get('paymentMethod') === 'Cash on Delivery' ? 'Pending' : 'Paid',
        status: 'Pending',
        date: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };

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
          // Supabase insert error
        }
      }

      try {
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrder)
        });
      } catch (err) {
        // Fallback
      }

      this.orders.unshift(newOrder);
      this.saveOrders();
      
      this.cart = [];
      this.saveCart();

      this.isCheckoutOpen = false;
      this.viewingOrder = newOrder;
      this.render();
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

    showToast(message) {
      const existing = document.getElementById('toastNotif');
      if (existing) existing.remove();
      const toast = document.createElement('div');
      toast.id = 'toastNotif';
      toast.className = 'toast-notification';
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3500);
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
      } else {
        this.renderStorefront();
      }
      this.renderFooter();
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
        <!-- Hotline Top Bar -->
        <div class="top-hotline-bar">
          <div class="hotline-group">
            <span>Official Order Hotline:</span>
            <a href="tel:${HOTLINE_PHONE}" class="hotline-link">${ICONS.phone} <span>${HOTLINE_PHONE}</span></a>
          </div>
          <div style="font-weight: 700; color: #fef08a; display: flex; align-items: center; gap: 1rem;">
            <span>Quality Parts. Premium Care.</span>
            <span style="background: var(--primary-gold); color: #fff; padding: 0.15rem 0.6rem; border-radius: 4px; font-size: 0.72rem; text-transform: uppercase;">Authorized Distributor</span>
          </div>
        </div>

        <!-- Main Header Bar -->
        <div class="main-header">
          <a href="#" class="official-brand-logo-wrapper" data-action="set-page" data-id="shop">
            <img src="${OFFICIAL_LOGO}" alt="AUTO HOMAGE Official Logo" class="official-logo-img">
            <div class="brand-text-block">
              <div class="brand-title">AUTO <span>HOMAGE</span></div>
              <div class="brand-slogan">Car Care & Accessories • Quality Parts</div>
            </div>
          </a>

          <div class="header-action-group">
            <!-- Page Nav Tabs -->
            ${this.activeView === 'store' ? `
              <div class="nav-tab-group" style="margin-right: 0.5rem;">
                <button class="nav-page-tab ${this.activePage === 'shop' ? 'active' : ''}" data-action="set-page" data-id="shop">Shop</button>
                <button class="nav-page-tab ${this.activePage === 'contact' ? 'active' : ''}" data-action="set-page" data-id="contact">Contact Us</button>
              </div>
            ` : ''}

            <a href="tel:${HOTLINE_PHONE}" class="call-hotline-btn">
              ${ICONS.phone}
              <span>Call ${HOTLINE_PHONE}</span>
            </a>

            <button class="admin-portal-btn" data-action="toggle-view" style="${this.isAdminAuthenticated ? 'border-color: #22c55e;' : ''}">
              ${this.isAdminAuthenticated ? ICONS.lock : ICONS.chart}
              <span>${this.activeView === 'store' ? (this.isAdminAuthenticated ? 'Admin Portal' : 'Admin Login') : 'Back to Store'}</span>
            </button>

            ${this.activeView === 'store' ? `
              <button class="cart-drawer-trigger" data-action="open-cart">
                ${ICONS.cart}
                <span>Cart</span>
                <span class="cart-count-badge" id="cartBadgeCount">${cartCount}</span>
              </button>
            ` : ''}
          </div>
        </div>
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
          <span>© 2026 Auto Homage. All Rights Reserved.</span>
          <span style="color: var(--primary-gold); font-weight: 700;">Quality Parts. Premium Care.</span>
        </div>
      `;

      container.appendChild(footer);
    }

    renderContactPage() {
      const container = document.getElementById('appContent');
      container.innerHTML = `
        <div class="contact-hero">
          <h1>Contact <span>Auto Homage</span></h1>
          <p>We're here to help you find the right product for your vehicle. Call, WhatsApp, or send us a message and we'll respond promptly.</p>
        </div>

        <div class="contact-grid">
          <!-- Contact Info Column -->
          <div class="contact-info-card">
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
          <div class="contact-form-card">
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

    renderStorefront() {
      const container = document.getElementById('appContent');

      container.innerHTML = `
        <!-- HIGH IMPACT SUPERCAR HERO SHOWCASE BANNER -->
        <section class="warm-luxury-hero" style="background: linear-gradient(135deg, rgba(28,25,23,0.94) 0%, rgba(41,37,36,0.88) 100%), url('${HERO_SUPERCAR_IMG}') center/cover no-repeat;">
          <div>
            <div class="hero-luxury-kicker">${ICONS.shield} Certified Genuine Automotive Care & Spares • Authorized Distributor</div>
            <h1 class="hero-luxury-title">QUALITY PARTS. <span>PREMIUM CARE.</span></h1>
            <p class="hero-luxury-desc">Discover high-gloss detailing formulas, nano ceramic wax shields, custom-fit 3D mats, and precision engine spares. Serving vehicle owners, garages & wholesale dealers across Kenya.</p>

            <div class="hero-cta-group">
              <button class="btn-gold-action" data-action="scroll-to-catalog">
                Explore 2026 Product Catalog
              </button>
              <a href="tel:${HOTLINE_PHONE}" class="call-hotline-btn" style="background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.25); color: #fff;">
                ${ICONS.phone} Order Hotline: ${HOTLINE_PHONE}
              </a>
            </div>
          </div>

          <div class="hero-logo-display">
            <div style="background: rgba(0,0,0,0.45); backdrop-filter: blur(12px); padding: 1.8rem; border-radius: 24px; border: 2px solid var(--primary-gold); box-shadow: var(--shadow-gold); text-align: center;">
              <img src="${OFFICIAL_LOGO}" alt="Auto Homage Official Dealer Logo" style="max-height: 220px; width: auto; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));">
              <div style="margin-top: 1rem; color: #fef08a; font-weight: 800; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.06em;">Official Dealer Registry</div>
            </div>
          </div>
        </section>

        <!-- TRUST PILLARS BAR -->
        <div class="trust-pillars-bar">
          <div class="trust-pillar-card">
            <div class="trust-pillar-icon">🏆</div>
            <div>
              <div class="trust-pillar-title">100% Genuine Certified</div>
              <div class="trust-pillar-desc">Direct authorized Gladiator & Flamingo importer</div>
            </div>
          </div>

          <div class="trust-pillar-card">
            <div class="trust-pillar-icon">⚡</div>
            <div>
              <div class="trust-pillar-title">Same-Day Nairobi Delivery</div>
              <div class="trust-pillar-desc">1–3 business days nationwide courier service</div>
            </div>
          </div>

          <div class="trust-pillar-card">
            <div class="trust-pillar-icon">📦</div>
            <div>
              <div class="trust-pillar-title">Retail & Wholesale Rates</div>
              <div class="trust-pillar-desc">Bulk carton discounts for shops & detailers</div>
            </div>
          </div>

          <div class="trust-pillar-card">
            <div class="trust-pillar-icon">📲</div>
            <div>
              <div class="trust-pillar-title">Fast M-Pesa & Card Checkout</div>
              <div class="trust-pillar-desc">Direct phone order assistance on ${HOTLINE_PHONE}</div>
            </div>
          </div>
        </div>

        <!-- Vehicle Finder Card Widget -->
        <div class="warm-finder-card">
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
        <section class="featured-brands-section">
          <div class="section-heading-block">
            <h2 class="section-title">Authorized Brand Collections</h2>
            <p class="section-subtitle">Browse through our curated lines of high-performance car care formulas and accessories</p>
          </div>

          <div class="brand-showcase-grid">
            <div class="brand-feature-card" data-action="set-brand" data-id="gladiator" style="cursor: pointer;">
              <div class="brand-card-icon">🏎️</div>
              <h3>Gladiator Car Tech</h3>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.4rem;">High-shine tire foams, hard wax compounds, degreasers & 12V air compressors.</p>
            </div>

            <div class="brand-feature-card" data-action="set-brand" data-id="flamingo" style="cursor: pointer;">
              <div class="brand-card-icon">✨</div>
              <h3>Flamingo Formulations</h3>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.4rem;">Nano ceramic coating wax, AC Pro deodorizers, and dashboard polishes.</p>
            </div>

            <div class="brand-feature-card" data-action="set-brand" data-id="power_eagle" style="cursor: pointer;">
              <div class="brand-card-icon">⚡</div>
              <h3>Power Eagle Series</h3>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.4rem;">Engine degreasers, throttle system cleaners & high-heat lubricants.</p>
            </div>

            <div class="brand-feature-card" data-action="set-brand" data-id="universal" style="cursor: pointer;">
              <div class="brand-card-icon">🚗</div>
              <h3>Custom Fit Mats & Tools</h3>
              <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.4rem;">Tailored 3D floor mats for Toyota, Subaru, Mercedes, plus emergency gear.</p>
            </div>
          </div>
        </section>

        <!-- Main Catalog Section -->
        <div id="catalogSection">
          <div class="catalog-filter-bar">
            <div class="bar-row-upper">
              <!-- Brand Filter Tabs -->
              <div style="display: flex; gap: 0.4rem; overflow-x: auto;">
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
            <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-top: 0.8rem; border-top: 1px solid var(--border-subtle);">
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

        return `
          <div class="luxury-product-card">
            <div class="product-image-container" data-action="view-product" data-id="${p.id}">
              <img src="${p.image}" alt="${p.name}" class="product-hero-image" loading="${loadStrategy}" decoding="async" onerror="this.src='Products/Gradiator Products/Multi-Purpose Degreaser.jpg'">
              <div class="badge-tag-stack">
                <span class="tag-brand-pill">${p.brand.replace('_', ' ')}</span>
                ${p.stock > 10 ? `<span class="badge-stock-in">In Stock</span>` : `<span class="badge-stock-low">Low Stock (${p.stock})</span>`}
              </div>
            </div>

            <div class="product-info-body">
              <div class="sku-code-label">SKU: ${p.code}</div>
              <h4 class="product-title-text" data-action="view-product" data-id="${p.id}">${p.name}</h4>
              
              <div style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; color: var(--accent-amber); margin-bottom: 0.8rem;">
                <span>★ ${p.rating || 5.0}</span>
                <span style="color: var(--text-muted);">(${p.reviews || 12} reviews)</span>
              </div>

              <div class="product-price-action-row">
                <div>
                  <div class="product-price-amount">KSh ${displayPrice.toLocaleString()}</div>
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
            </div>
          </div>
        `;
      }).join('');

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
            <div style="background: radial-gradient(circle, #ffffff 40%, #f7f1e5 100%); border-radius: var(--radius-lg); padding: 2rem; display: flex; align-items: center; justify-content: center; height: 320px; border: 1px solid var(--border-gold);">
              <img src="${p.image}" alt="${p.name}" style="max-height: 100%; max-width: 100%; object-fit: contain;" onerror="this.src='Products/Gradiator Products/Multi-Purpose Degreaser.jpg'">
            </div>

            <div>
              <div style="font-family: monospace; color: var(--primary-gold-dark); font-weight: 700; margin-bottom: 0.3rem;">CODE: ${p.code}</div>
              <h2 style="font-size: 1.6rem; margin-bottom: 0.8rem; color: var(--bg-dark-obsidian);">${p.name}</h2>
              <p style="color: var(--text-body); margin-bottom: 1.5rem; font-size: 0.95rem; line-height: 1.6;">${p.description}</p>

              <div style="background: var(--bg-warm-gold); border: 1px solid var(--border-strong); border-radius: var(--radius-md); padding: 1.2rem; margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                  <span style="color: var(--text-muted);">Retail Price:</span>
                  <strong style="color: var(--bg-dark-obsidian);">KSh ${p.price.toLocaleString()}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                  <span style="color: var(--text-muted);">Wholesale Carton Rate:</span>
                  <strong style="color: var(--primary-gold-dark);">KSh ${p.ctnPrice.toLocaleString()} (${p.pcsPerCtn} pcs/ctn)</strong>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: var(--text-muted);">Stock Status:</span>
                  <strong style="color: var(--accent-emerald);">${p.stock} units available</strong>
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
      let drawer = document.getElementById('cartDrawerContainer');
      if (!this.isCartOpen) {
        if (drawer) drawer.remove();
        return;
      }

      if (!drawer) {
        drawer = document.createElement('div');
        drawer.id = 'cartDrawerContainer';
        document.body.appendChild(drawer);
      }

      const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      const tax = Math.round(subtotal * 0.16);
      const total = subtotal + tax;

      drawer.innerHTML = `
        <div class="warm-cart-drawer">
          <div style="padding: 1.5rem; border-bottom: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: space-between;">
            <h3>Your Order Cart (${this.cart.reduce((t, i) => t + i.qty, 0)})</h3>
            <button class="close-btn-round" style="position: static;" data-action="close-cart">✕</button>
          </div>

          <div style="flex: 1; overflow-y: auto; padding: 1.5rem; display: flex; flex-direction: column; gap: 1.2rem;">
            ${this.cart.length === 0 ? `
              <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                <div style="margin-bottom: 1rem;">${ICONS.cart}</div>
                <p>Your shopping cart is empty</p>
              </div>
            ` : this.cart.map((item, idx) => `
              <div style="display: flex; gap: 1rem; background: var(--bg-warm-gold); border: 1px solid var(--border-strong); border-radius: var(--radius-md); padding: 0.9rem; align-items: center;">
                <img src="${item.image}" alt="${item.name}" style="width: 55px; height: 55px; object-fit: contain; background: #fff; border-radius: 6px; border: 1px solid var(--border-subtle);" onerror="this.src='Products/Gradiator Products/Multi-Purpose Degreaser.jpg'">
                <div style="flex: 1;">
                  <div style="font-weight: 800; font-size: 0.88rem; line-height: 1.3;">${item.name}</div>
                  <div style="font-size: 0.75rem; color: var(--text-muted);">${item.priceMode === 'carton' ? `Carton Bulk (${item.pcsPerCtn} pcs)` : 'Single Unit'}</div>
                  <div style="font-weight: 800; color: var(--bg-dark-obsidian); margin-top: 0.2rem;">KSh ${(item.price * item.qty).toLocaleString()}</div>
                </div>

                <div style="display: flex; align-items: center; gap: 0.4rem; background: #fff; border: 1px solid var(--border-strong); border-radius: 6px; padding: 0.15rem;">
                  <button style="width: 22px; height: 22px; border: none; background: none; font-weight: bold; cursor: pointer;" data-action="update-qty" data-id="${idx}" data-change="-1">-</button>
                  <span style="font-size: 0.85rem; font-weight: 800; width: 18px; text-align: center;">${item.qty}</span>
                  <button style="width: 22px; height: 22px; border: none; background: none; font-weight: bold; cursor: pointer;" data-action="update-qty" data-id="${idx}" data-change="1">+</button>
                </div>

                <button style="color: var(--accent-deep-red); background: none; border: none; font-weight: bold; cursor: pointer; padding: 0.4rem;" data-action="remove-cart-item" data-id="${idx}">✕</button>
              </div>
            `).join('')}
          </div>

          ${this.cart.length > 0 ? `
            <div style="padding: 1.5rem; border-top: 1px solid var(--border-subtle); background: var(--bg-subtle);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.9rem; color: var(--text-muted);">
                <span>Subtotal</span>
                <span>KSh ${subtotal.toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.8rem; font-size: 0.9rem; color: var(--text-muted);">
                <span>VAT (16%)</span>
                <span>KSh ${tax.toLocaleString()}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: 800; color: var(--bg-dark-obsidian); border-top: 1px solid var(--border-strong); padding-top: 0.8rem; margin-top: 0.8rem;">
                <span>Total Amount</span>
                <span style="color: var(--primary-gold-dark);">KSh ${total.toLocaleString()}</span>
              </div>

              <button class="btn-gold-action" style="width: 100%; margin-top: 1.2rem; padding: 0.9rem;" data-action="open-checkout">
                Proceed to Order Checkout
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
        <div class="modal-gold-box" style="padding: 2.5rem; max-width: 600px;">
          <button class="close-btn-round" data-action="close-checkout">✕</button>

          <h2 style="margin-bottom: 0.3rem;">Complete Your Order Registration</h2>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 0.9rem;">Hotline Assistance: <strong>${HOTLINE_PHONE}</strong></p>

          <form id="checkoutForm">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">FULL NAME</label>
                <input type="text" name="customerName" class="warm-input" placeholder="e.g. David Mwangi" required>
              </div>
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">EMAIL ADDRESS</label>
                <input type="email" name="customerEmail" class="warm-input" placeholder="david@company.com" required>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">PHONE CONTACT</label>
                <input type="tel" name="customerPhone" class="warm-input" value="${HOTLINE_PHONE}" required>
              </div>
              <div>
                <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">TOWN / CITY</label>
                <input type="text" name="customerCity" class="warm-input" placeholder="Nairobi / Mombasa" required>
              </div>
            </div>

            <div style="margin-bottom: 1rem;">
              <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">DELIVERY ADDRESS</label>
              <input type="text" name="customerAddress" class="warm-input" placeholder="Building name, street, or shop location" required>
            </div>

            <div style="margin-bottom: 1.5rem;">
              <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">PAYMENT METHOD</label>
              <select name="paymentMethod" class="warm-select" required>
                <option value="M-Pesa / Mobile Money">Mobile Money (M-Pesa Express)</option>
                <option value="Credit Card">Credit / Debit Card</option>
                <option value="Cash on Delivery">Cash / Cheque on Delivery</option>
                <option value="Bank Transfer">Direct Corporate Bank Transfer</option>
              </select>
            </div>

            <div style="background: var(--bg-warm-gold); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 1.2rem; margin-bottom: 1.5rem;">
              <div style="display: flex; justify-content: space-between; font-size: 1.15rem; font-weight: 800; color: var(--bg-dark-obsidian);">
                <span>Total Payable Amount:</span>
                <span style="color: var(--primary-gold-dark);">KSh ${total.toLocaleString()}</span>
              </div>
            </div>

            <button type="submit" class="btn-gold-action" style="width: 100%; padding: 0.9rem;">
              Confirm & Submit Order
            </button>
          </form>
        </div>
      `;

      document.getElementById('checkoutForm').addEventListener('submit', (e) => this.handleCheckoutSubmit(e));
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
            <span>Grand Total Paid</span>
            <span style="color: var(--primary-gold-dark);">KSh ${o.totalAmount.toLocaleString()}</span>
          </div>

          <button class="btn-gold-action" style="width: 100%; padding: 0.8rem;" onclick="window.print()">
            Print Official Invoice
          </button>
        </div>
      `;
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
        <div class="modal-gold-box" style="padding: 2.5rem; max-width: 440px; text-align: center;">
          <button class="close-btn-round" data-action="close-admin-auth">✕</button>

          <div style="width: 60px; height: 60px; border-radius: 16px; background: var(--bg-dark-obsidian); color: var(--primary-gold); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
            ${ICONS.lock}
          </div>

          <h2 style="margin-bottom: 0.4rem;">Secured Operations Access</h2>
          <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 1.5rem;">Enter administrator security PIN to manage products, pricing & store inventory.</p>

          <form id="adminLoginForm" onsubmit="window.app.handleAdminLoginSubmit(event)">
            <div style="margin-bottom: 1.2rem; text-align: left;">
              <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.4rem;">ADMINISTRATOR PASSWORD / PIN</label>
              <input type="password" name="adminPassword" class="warm-input" placeholder="Enter password (e.g. autohomage2026 or 8800)" required autofocus style="font-size: 1.1rem; text-align: center; letter-spacing: 0.1em;">
            </div>

            <div id="adminAuthError" style="display: none; color: var(--accent-deep-red); font-size: 0.85rem; font-weight: 700; margin-bottom: 1rem; background: #fef2f2; border: 1px solid #fca5a5; padding: 0.5rem; border-radius: 6px;">
              ✕ Invalid password. Please try again.
            </div>

            <button type="submit" class="btn-gold-action" style="width: 100%; padding: 0.9rem;">
              Unlock Operations Portal
            </button>
          </form>
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
        <div class="modal-gold-box" style="padding: 2.5rem; max-width: 650px;">
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

            <div style="margin-bottom: 1rem;">
              <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">PRODUCT IMAGE PATH</label>
              <input type="text" name="prodImage" class="warm-input" value="Products/Gradiator Products/Multi-Purpose Degreaser.jpg">
            </div>

            <div style="margin-bottom: 1.5rem;">
              <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 0.3rem;">DESCRIPTION</label>
              <textarea name="prodDescription" class="warm-input" style="height: 80px;" placeholder="Describe features, usage, and applications..."></textarea>
            </div>

            <button type="submit" class="btn-gold-action" style="width: 100%; padding: 0.9rem;">
              Save & Create Product
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
          <div style="display: flex; gap: 0.8rem; border-bottom: 2px solid var(--border-subtle); padding-bottom: 0.8rem;">
            <button class="admin-tab-btn ${this.adminActiveTab === 'inventory' ? 'active' : ''}" data-action="admin-set-tab" data-id="inventory">
              📦 Products & Price Inventory (${this.products.length})
            </button>
            <button class="admin-tab-btn ${this.adminActiveTab === 'orders' ? 'active' : ''}" data-action="admin-set-tab" data-id="orders">
              📋 Order Pipeline & Financials (${this.orders.length})
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
          `}
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
              <th style="padding: 0.8rem;">Item</th>
              <th style="padding: 0.8rem;">SKU Code</th>
              <th style="padding: 0.8rem;">Name & Brand</th>
              <th style="padding: 0.8rem;">Retail Price (KSh)</th>
              <th style="padding: 0.8rem;">Wholesale Carton Rate (KSh)</th>
              <th style="padding: 0.8rem;">Stock Units</th>
              <th style="padding: 0.8rem; text-align: center;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.map(p => `
              <tr style="border-bottom: 1px solid var(--border-subtle);">
                <td style="padding: 0.6rem 0.8rem;">
                  <img src="${p.image}" alt="${p.name}" style="width: 44px; height: 44px; object-fit: contain; background: #fff; border-radius: 6px; border: 1px solid var(--border-subtle);" onerror="this.src='Products/Gradiator Products/Multi-Purpose Degreaser.jpg'">
                </td>
                <td style="padding: 0.6rem 0.8rem; font-family: monospace; font-weight: 700; color: var(--primary-gold-dark);">${p.code}</td>
                <td style="padding: 0.6rem 0.8rem;">
                  <div style="font-weight: 700; color: var(--bg-dark-obsidian);">${p.name}</div>
                  <div style="font-size: 0.78rem; color: var(--text-muted); text-transform: capitalize;">${p.brand.replace('_', ' ')} • ${p.category.replace('_', ' ')}</div>
                </td>
                <td style="padding: 0.6rem 0.8rem;">
                  <input type="number" class="admin-table-input" data-price-id="${p.id}" value="${p.price}">
                </td>
                <td style="padding: 0.6rem 0.8rem;">
                  <input type="number" class="admin-table-input" data-ctnprice-id="${p.id}" value="${p.ctnPrice}">
                </td>
                <td style="padding: 0.6rem 0.8rem;">
                  <input type="number" class="admin-table-input" style="max-width: 80px;" data-stock-id="${p.id}" value="${p.stock}">
                </td>
                <td style="padding: 0.6rem 0.8rem; text-align: center;">
                  <button class="btn-gold-action" style="padding: 0.4rem 0.8rem; font-size: 0.78rem;" data-action="save-product-price" data-id="${p.id}">
                    Save Changes
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
