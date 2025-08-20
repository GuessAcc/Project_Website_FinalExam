document.addEventListener('DOMContentLoaded', () => {
  // --- 1. STATE & DATA ---
  const products = [
    { id: 'LILY Old Money Peak Lapel Blazer', name: 'LILY Old Money Peak Lapel Blazer', price: 129.80, image: './Picture/product-1.webp', desc: '- Outer Fabric: 85.7% Polyester, 8.3% Viscose, 6.0% Spandex <br>Lining 1: 100% Polyester <br>Lining 2: 55% Polyester, 45% Viscose <br>- Gentle dry cleaning, do not wash, do not bleach', category: 'Blazers' },
    { id: 'LILY Old Money Style Drapey Tailored Trousers', name: 'LILY Old Money Style Drapey Tailored Trousers', price: 69.80, image: './Picture/Product-2.webp', desc: '- Fabric: 85.7% Polyester, 8.3% Viscose, 6.0% Spandex Bag: 100% Polyester <br>- Hand wash, do not bleach, do not dry clean', category: 'Trousers' },
    { id: 'LILY Striped Embroidered Loose-Fit Shirt Jacket', name: 'LILY Striped Embroidered Loose-Fit Shirt Jacket', price: 89.80, image: './Picture/Product-3.webp', desc: '- 77.3% Cotton, 19.9% Nylon, 2.8% Spandex<br>- Hand wash or machine wash cold, do not dry clean', category: 'Shirts' },
    { id: 'LILY Grey-Toned Preppy Layered-Look Plaid Sweatshirt', name: 'LILY Grey-Toned Preppy Layered-Look Plaid Sweatshirt', price: 69.80, image: './Picture/Product-4.webp', desc: '- 60.3% Polyester, 34.3% Cotton, 5.4% Spandex<br>- Hand wash or machine wash cold, do not dry clean', category: 'Sweatshirts' },
    { id: 'LILY Vintage Embroidered Denim Shirt Jacket', name: 'LILY Vintage Embroidered Denim Shirt Jacket', price: 69.80, image: './Picture/Product-5.webp', desc: '- Fabric: 72.6% Cotton, 15.7% Polyester, 11.7% Viscose<br>- Hand wash, do not bleach, do not dry clean', category: 'Shirts' },
    { id: 'LILY Pure Cotton Green Plaid Shirt', name: 'LILY Pure Cotton Green Plaid Shirt', price: 51.80, image: './Picture/Product-6.webp', desc: '- Fabric: 100% cotton<br>- Hand wash, do not bleach, do not dry clean', category: 'Shirts' },
    { id: 'LILY French Blue Lyocell Shirt', name: 'LILY French Blue Lyocell Shirt', price: 57.80, image: './Picture/Product-7.webp', desc: '- Fabric: 72.1% Lyocell, 27.9% Cotton<br>- Gentle hand wash,Regular dry cleaning', category: 'Shirts' },
    { id: 'LILY French Check Cotton Sleeveless Belted Dress', name: 'LILY French Check Cotton Sleeveless Belted Dress', price: 57.80, image: './Picture/Product-8.webp', desc: '100% Cotton <br>- Hand wash, do not bleach, do not dry clean', category: 'Dresses' },
    { id: 'LILY Elegant Cami Midi Dress', name: 'LILY Elegant Cami Midi Dress', price: 62.80, image: './Picture/Product-9.webp', desc: '- Fabric: 100% Polyester<br>- Hand wash, do not bleach, do not dry clean', category: 'Dresses' },
    { id: 'LILY Beige Blazer – Chic Office Look', name: 'LILY Beige Blazer – Chic Office Look', price: 93.80, image: './Picture/Product-10.webp', desc: '- Fabric: 100% Polyester<br>- Gentle Dry Cleaning', category: 'Blazers' },
    { id: 'LILY Elegant Office Blazer', name: 'LILY Elegant Office Blazer', price: 89.80, image: './Picture/Product-11.webp', desc: '- Fabric: 92.8% Polyester, 3.8% Linen, 3.4% Spandex<br>Lining: 100% Polyester<br>- Gentle dry cleaning, do not wash, do not bleach', category: 'Blazers' },
    { id: 'LILY Vintage Denim Slip Dress', name: 'LILY Vintage Denim Slip Dress', price: 87.80, image: './Picture/Product-12.webp', desc: '- Fabric: 88% Cotton, 12% Regenerated Cellulose<br>- Hand wash, do not bleach, do not dry clean', category: 'Dresses' },
    { id: 'LILY Cotton Statement Straight Skirt', name: 'LILY Cotton Statement Straight Skirt', price: 49.80, image: './Picture/Product-13.webp', desc: '- Fabric: 100% Cotton<br>- Hand wash, do not bleach, do not dry clean', category: 'Skirts' },
    { id: 'LILY French Lace A-Line Skirt', name: 'LILY French Lace A-Line Skirt', price: 66.80, image: './Picture/Product-14.webp', desc: '- Fabric: 81.1% Polyester, 18.9% Cotton<br>Lining: 100% Polyester<br>- Hand wash, do not bleach, do not dry clean', category: 'Skirts' },
    { id: 'LILY Elegant Cotton Drawstring Collar White Shirt', name: 'LILY Elegant Cotton Drawstring Collar White Shirt', price: 55.80, image: './Picture/Product-15.webp', desc: '- Fabric: 100% cotton<br>Hand wash, do not bleach, do not dry clean', category: 'Shirts' },
  ];

  let cart = JSON.parse(localStorage.getItem('lilyCart_v2')) || [];
  let currentCheckoutStep = 1;
  const categories = [...new Set(products.map(p => p.category))];
  let activeCategory = null;
  let searchQuery = '';

  // --- SOUND EFFECT ---
  const checkoutSound = new Audio('./Sound/AppleSound.mp3');

  // --- 2. UTILITY FUNCTIONS ---
  const saveCart = () => {
    localStorage.setItem('lilyCart_v2', JSON.stringify(cart));
    updateCartUI();
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  };

  const filterProducts = () => {
    return products.filter(p =>
      (activeCategory ? p.category === activeCategory : true) &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // --- ADVERTISEMENT & RECOMMENDATION FUNCTIONS ---
  const showWelcomeAd = () => {
    if (sessionStorage.getItem('welcomeAdShown')) return;
    const modalHTML = `
      <div class="welcome-ad-modal" id="welcome-ad">
        <div class="welcome-ad-modal__content">
          <button class="welcome-ad-modal__close" aria-label="Close modal">×</button>
          <h2>Welcome to LILY!</h2>
          <p>Get <strong>15% OFF</strong> your first order. Use code <br><strong>WELCOME15</strong> at checkout.</p>
          <a href="#product-grid-section" class="btn welcome-ad-modal__cta">Start Shopping</a>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setTimeout(() => {
      const el = document.getElementById('welcome-ad');
      if (el) {
        el.classList.add('active');
        sessionStorage.setItem('welcomeAdShown', 'true');
      }
    }, 300);
  };

  const closeWelcomeAd = () => {
    const modal = document.getElementById('welcome-ad');
    if (modal) {
      modal.classList.remove('active');
      modal.addEventListener('transitionend', () => modal.remove(), { once: true });
    }
  };

  const showRecommendationModal = (addedProduct) => {
    const otherProducts = products.filter(p => p.id !== addedProduct.id);
    const recommendedProduct = otherProducts[Math.floor(Math.random() * otherProducts.length)];
    const modalHTML = `
      <div class="recommendation-modal" id="rec-modal">
        <div class="recommendation-modal__content">
          <button class="recommendation-modal__close" aria-label="Close modal">×</button>
          <div class="recommendation-modal__item">
            <h3>Successfully Added to Cart!</h3>
            <img src="${addedProduct.image}" alt="${addedProduct.name}">
            <p>${addedProduct.name}</p>
          </div>
          <div class="recommendation-modal__item">
            <h3>You Might Also Like...</h3>
            <img src="${recommendedProduct.image}" alt="${recommendedProduct.name}">
            <p>${recommendedProduct.name}</p>
            <a href="ProductDetail.html?id=${encodeURIComponent(recommendedProduct.id)}" class="btn">View Item</a>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    setTimeout(() => {
      const el = document.getElementById('rec-modal');
      if (el) el.classList.add('active');
      // Auto close after 1s
      setTimeout(() => {
        closeRecommendationModal();
      }, 1000);
    }, 10);
  };

  const closeRecommendationModal = () => {
    const modal = document.getElementById('rec-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.addEventListener('transitionend', () => modal.remove(), { once: true });
    }
  };

  // --- CHECKOUT MODAL FUNCTIONS ---
  const showCheckoutModal = () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Add items before checking out.");
      return;
    }
    currentCheckoutStep = 1;
    const total = getCartTotal().toFixed(2);
    const modalHTML = `
      <div class="checkout-modal" id="checkout-modal">
        <div class="checkout-modal__content">
          <div class="checkout-modal__header">
            <button class="checkout-modal__close" aria-label="Close checkout">×</button>
            <h2>Checkout</h2>
          </div>
          <div class="checkout-progress-bar">
            <div class="progress-step active" data-step="1">Shipping</div>
            <div class="progress-step" data-step="2">Payment</div>
            <div class="progress-step" data-step="3">Confirmation</div>
          </div>
          <div class="checkout-body">
            <!-- Step 1: Shipping -->
            <div class="checkout-step active" data-step="1">
              <h3>Shipping Information</h3>
              <form id="shipping-form" class="form-grid" novalidate>
                <div class="form-group full-width">
                  <label for="name" class="form-label">Full Name</label>
                  <input type="text" id="name" class="form-input" required>
                </div>
                <div class="form-group full-width">
                  <label for="address" class="form-label">Address</label>
                  <input type="text" id="address" class="form-input" required>
                </div>
                <div class="form-group">
                  <label for="city" class="form-label">City</label>
                  <input type="text" id="city" class="form-input" required>
                </div>
                <div class="form-group">
                  <label for="zip" class="form-label">Zip Code</label>
                  <input type="text" id="zip" class="form-input" required>
                </div>
              </form>
            </div>

            <!-- Step 2: Payment -->
            <div class="checkout-step" data-step="2">
              <h3>Payment Details</h3>
              <form id="payment-form" class="form-grid" novalidate>
                <div class="form-group full-width">
                  <label for="card-number" class="form-label">Card Number</label>
                  <input type="text" id="card-number" class="form-input" placeholder="XXXX XXXX XXXX XXXX" required>
                </div>
                <div class="form-group">
                  <label for="expiry" class="form-label">Expiry Date</label>
                  <input type="text" id="expiry" class="form-input" placeholder="MM/YY" required>
                </div>
                <div class="form-group">
                  <label for="cvv" class="form-label">CVV</label>
                  <input type="text" id="cvv" class="form-input" placeholder="123" required>
                </div>
              </form>
            </div>

            <!-- Step 3: Confirmation -->
            <div class="checkout-step" data-step="3">
              <h3>Confirm Your Order</h3>
              <div id="order-summary"></div>
              <div class="order-summary-item order-summary-total">
                <span>Total</span>
                <span>$${total}</span>
              </div>
            </div>

            <!-- Step 4: Thank You -->
            <div class="checkout-step" data-step="4" id="thank-you-message">
              <h3>Thank You!</h3>
              <p>Your order has been placed successfully.</p>
            </div>
          </div>

          <div class="checkout-modal__footer">
            <button class="btn btn-prev" style="display: none;">Previous</button>
            <button class="btn btn-next">Next</button>
            <button class="btn btn-confirm" style="display: none;">Confirm Purchase</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.querySelector('.cart-popup')?.classList.remove('active');
    setTimeout(() => {
      const el = document.getElementById('checkout-modal');
      if (el) el.classList.add('active');
      updateCheckoutUI();
    }, 10);
  };

  const closeCheckoutModal = () => {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.addEventListener('transitionend', () => modal.remove(), { once: true });
    }
  };

  const navigateCheckoutStep = (direction) => {
    // Validate current form when moving forward
    if (direction === 1) {
      const currentForm = document.querySelector('.checkout-step.active form');
      if (currentForm && !currentForm.checkValidity()) {
        currentForm.reportValidity();
        return;
      }
    }
    const nextStep = currentCheckoutStep + direction;
    if (nextStep >= 1 && nextStep <= 4) {
      currentCheckoutStep = nextStep;
      updateCheckoutUI();
    }
  };

  const confirmPurchase = () => {
    currentCheckoutStep = 4;
    updateCheckoutUI();
    cart = [];
    saveCart();
    checkoutSound.play().catch(error => console.log('Audio playback failed:', error));
    setTimeout(closeCheckoutModal, 1500);
  };

  const updateCheckoutUI = () => {
    const modal = document.getElementById('checkout-modal');
    if (!modal) return;
    const steps = modal.querySelectorAll('.checkout-step');
    const progressSteps = modal.querySelectorAll('.progress-step');
    const prevBtn = modal.querySelector('.btn-prev');
    const nextBtn = modal.querySelector('.btn-next');
    const confirmBtn = modal.querySelector('.btn-confirm');
    const footer = modal.querySelector('.checkout-modal__footer');
    steps.forEach(step => step.classList.remove('active'));
    const activeStepEl = modal.querySelector(`.checkout-step[data-step="${currentCheckoutStep}"]`);
    if (activeStepEl) activeStepEl.classList.add('active');
    progressSteps.forEach(step => {
      step.classList.toggle('active', parseInt(step.dataset.step, 10) <= currentCheckoutStep);
    });
    prevBtn.style.display = (currentCheckoutStep > 1 && currentCheckoutStep < 4) ? 'inline-block' : 'none';
    nextBtn.style.display = currentCheckoutStep < 3 ? 'inline-block' : 'none';
    confirmBtn.style.display = currentCheckoutStep === 3 ? 'inline-block' : 'none';
    if (footer) {
      footer.style.display = currentCheckoutStep === 4 ? 'none' : 'flex';
    }
    if (currentCheckoutStep === 3) {
      const summaryContainer = modal.querySelector('#order-summary');
      if (summaryContainer) {
        summaryContainer.innerHTML = cart.map(item => `
          <div class="order-summary-item">
            <span>${item.name} (x${item.qty})</span>
            <span>$${(item.price * item.qty).toFixed(2)}</span>
          </div>
        `).join('');
      }
    }
  };
  // --- 3. RENDERING FUNCTIONS ---
  const renderHomePage = () => {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;
    const filteredProducts = filterProducts();
    productGrid.innerHTML = filteredProducts.map(product => `
      <article class="product-card">
        <a href="ProductDetail.html?id=${encodeURIComponent(product.id)}">
          <img src="${product.image}" alt="${product.name}" class="product-card__image" loading="lazy">
        </a>
        <div class="product-card__info">
          <a href="ProductDetail.html?id=${encodeURIComponent(product.id)}" class="product-card__name">${product.name}</a>
          <p class="product-card__price">$${product.price.toFixed(2)}</p>
          <a href="ProductDetail.html?id=${encodeURIComponent(product.id)}" class="btn">View Details</a>
        </div>
      </article>
    `).join('');
  };
  const renderCategories = () => {
    const categoriesSection = document.getElementById('categories-section');
    if (!categoriesSection) return;
    categoriesSection.innerHTML = categories.map(cat => `
      <button class="category-btn" data-category="${cat}">${cat}</button>
    `).join('');
  };
  const renderDetailPage = () => {
    const detailContainer = document.getElementById('product-detail');
    const relatedGrid = document.getElementById('related-grid');
    if (!detailContainer || !relatedGrid) return;
    const productId = new URLSearchParams(window.location.search).get('id');
    const product = products.find(p => p.id === productId);
    if (!product) {
      detailContainer.innerHTML = '<h2>Product Not Found</h2>';
      relatedGrid.innerHTML = '';
      return;
    }
    detailContainer.innerHTML = `
      <figure class="product-detail__gallery">
        <img src="${product.image}" alt="${product.name}" class="product-detail__image">
      </figure>
      <section class="product-detail__info">
        <h1>${product.name}</h1>
        <p class="product-detail__price">$${product.price.toFixed(2)}</p>
        <p class="product-detail__desc">${product.desc}</p>
        <div class="option-group">
          <label for="size">Size</label>
          <select id="size" required>
            <option value="S">S</option>
            <option value="M" selected>M</option>
            <option value="L">L</option>
          </select>
        </div>
        <div class="option-group">
          <label for="color">Color</label>
          <select id="color" required>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
          </select>
        </div>
        <button class="btn add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
      </section>
    `;
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    relatedGrid.innerHTML = relatedProducts.map(rel => `
      <article class="product-card">
        <a href="ProductDetail.html?id=${encodeURIComponent(rel.id)}">
          <img src="${rel.image}" alt="${rel.name}" class="product-card__image" loading="lazy">
        </a>
        <div class="product-card__info">
          <a href="ProductDetail.html?id=${encodeURIComponent(rel.id)}" class="product-card__name">${rel.name}</a>
          <p class="product-card__price">$${rel.price.toFixed(2)}</p>
          <a href="ProductDetail.html?id=${encodeURIComponent(rel.id)}" class="btn">View Details</a>
        </div>
      </article>
    `).join('');
  };
  const updateCartUI = () => {
    const cartCountEl = document.getElementById('cart-count');
    const cartBodyEl = document.querySelector('.cart-popup__body');
    const cartTotalEl = document.getElementById('cart-total');
    if (!cartCountEl || !cartBodyEl || !cartTotalEl) {
      return;
    }
    const cartQuantity = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = cartQuantity;
    cartCountEl.style.display = cartQuantity > 0 ? 'flex' : 'none';
    if (cart.length === 0) {
      cartBodyEl.innerHTML = '<p>Your cart is empty.</p>';
    } else {
      cartBodyEl.innerHTML = cart.map((item, index) => `
        <div class="cart-item" data-cart-item-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item__img">
          <div class="cart-item__info">
            <div class="cart-item__name">${item.name}</div>
            <div class="cart-item__details">Size: ${item.size || '-'} | Qty: ${item.qty}</div>
            <button class="cart-item__remove" data-item-index="${index}">Remove</button>
          </div>
          <div class="cart-item__price">$${(item.price * item.qty).toFixed(2)}</div>
        </div>
      `).join('');
    }
    cartTotalEl.textContent = `$${getCartTotal().toFixed(2)}`;
  };
  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  };
  // --- 4. EVENT HANDLERS ---
  const handleAddToCart = (e) => {
    // delegate add-to-cart button clicks
    const btn = e.target.closest('.add-to-cart-btn');
    if (!btn) return;
    const productId = btn.dataset.productId;
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const sizeEl = document.getElementById('size');
    const colorEl = document.getElementById('color');
    const size = sizeEl ? sizeEl.value : 'M';
    const color = colorEl ? colorEl.value : 'Default';
    const existingItem = cart.find(item => item.id === productId && item.size === size && item.color === color);
    if (existingItem) {
      existingItem.qty++;
    } else {
      cart.push({ ...product, size, color, qty: 1 });
    }
    saveCart();
    showRecommendationModal(product);
    btn.classList.add('success');
    const originalText = btn.textContent;
    btn.textContent = 'Added!';
    setTimeout(() => {
      btn.classList.remove('success');
      btn.textContent = originalText;
    }, 1500);
  };
  const handleGlobalClicks = (e) => {
    // cart toggle
    if (e.target.closest('.cart-toggle')) {
      document.querySelector('.cart-popup')?.classList.toggle('active');
      return;
    }
    // close cart
    if (e.target.closest('.cart-popup__close')) {
      document.querySelector('.cart-popup')?.classList.remove('active');
      return;
    }
    // remove cart item
    if (e.target.matches('.cart-item__remove')) {
      const idx = parseInt(e.target.dataset.itemIndex, 10);
      if (!Number.isNaN(idx)) {
        cart.splice(idx, 1);
        saveCart();
      }
      return;
    }
    // recommendation modal close (overlay or close button)
    if (e.target.closest('.recommendation-modal') && e.target.classList.contains('recommendation-modal')) {
      closeRecommendationModal();
      return;
    }
    if (e.target.closest('.recommendation-modal__close')) {
      closeRecommendationModal();
      return;
    }
    // welcome ad close or CTA
    if (e.target.closest('.welcome-ad-modal')) {
      closeWelcomeAd();
      return;
    }
    if (e.target.closest('.welcome-ad-modal__close')) {
      closeWelcomeAd();
      return;
    }
    if (e.target.closest('.welcome-ad-modal__cta')) {
      closeWelcomeAd();
      return;
    }
    // open checkout
    if (e.target.closest('#checkout-btn')) {
      showCheckoutModal();
      return;
    }
    // checkout modal close
    if (e.target.closest('.checkout-modal__close') || (e.target.classList && e.target.classList.contains('checkout-modal'))) {
      closeCheckoutModal();
      return;
    }
    // checkout step controls
    if (e.target.closest('.btn-next')) {
      navigateCheckoutStep(1);
      return;
    }
    if (e.target.closest('.btn-prev')) {
      navigateCheckoutStep(-1);
      return;
    }
    if (e.target.closest('.btn-confirm')) {
      confirmPurchase();
      return;
    }
    // categories
    if (e.target.closest('.category-btn')) {
      const btn = e.target.closest('.category-btn');
      activeCategory = btn.dataset.category || null;
      document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderHomePage();
      return;
    }
    // dark mode toggle
    if (e.target.closest('#dark-mode-toggle')) {
      toggleDarkMode();
      return;
    }
    // newsletter submit
    if (e.target.closest('#newsletter-submit')) {
      e.preventDefault();
      alert('Subscribed! Thank you.');
      return;
    }
  };
  const handleSearch = (e) => {
    searchQuery = e.target.value || '';
    renderHomePage();
  };
  // --- 5. INITIALIZATION ---
renderHomePage();
  renderCategories();
  renderDetailPage();
  updateCartUI();
  if (document.getElementById('product-grid')) {
    showWelcomeAd();
  }
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  document.body.addEventListener('click', handleAddToCart);
  document.body.addEventListener('click', handleGlobalClicks);

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }

  // Allow clicking outside the cart-popup to close it
  document.addEventListener('mousedown', function(e) {
    const cartPopup = document.querySelector('.cart-popup');
    if (cartPopup && cartPopup.classList.contains('active')) {
      if (!cartPopup.contains(e.target) && !e.target.closest('.cart-toggle')) {
        cartPopup.classList.remove('active');
      }
    }
  });
});
