const grid = document.getElementById('product-grid');
const loadMore = document.getElementById('load-more');
const search = document.getElementById('search');
const category = document.getElementById('category');
const minPrice = document.getElementById('min-price');
const maxPrice = document.getElementById('max-price');
const sort = document.getElementById('sort');
const applyFilters = document.getElementById('apply-filters');
let page = 1;

function renderSkeletons() {
  grid.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton';
    grid.appendChild(skeleton);
  }
}

function buildParams() {
  const params = new URLSearchParams();
  if (search.value) params.set('q', search.value);
  if (category.value) params.set('category', category.value);
  if (minPrice.value) params.set('min_price', minPrice.value);
  if (maxPrice.value) params.set('max_price', maxPrice.value);
  if (sort.value) params.set('sort', sort.value);
  params.set('page', page);
  return params.toString();
}

async function fetchProducts(reset = false) {
  renderSkeletons();
  const response = await fetch(`/api/products?${buildParams()}`);
  const data = await response.json();
  if (reset) grid.innerHTML = '';
  data.items.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'card product-card';
    card.innerHTML = `
      <div class="product-image"></div>
      <h3>${item.name}</h3>
      <p>$${(item.price_cents / 100).toFixed(2)}</p>
      <button class="btn ghost" data-id="${item.id}">Quick view</button>
    `;
    card.querySelector('button').addEventListener('click', () => openModal(item.id));
    grid.appendChild(card);
  });
}

function openModal(id) {
  const modal = document.createElement('div');
  modal.className = 'backdrop show';
  modal.innerHTML = `<div class="card" role="dialog" aria-modal="true"><h3>Loading...</h3></div>`;
  document.body.appendChild(modal);
  fetch(`/api/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
      modal.innerHTML = `
        <div class="card" role="dialog" aria-modal="true">
          <h3>${data.name}</h3>
          <p>${data.description}</p>
          <button class="btn" id="modal-add">Add to cart</button>
          <button class="btn ghost" id="modal-close">Close</button>
        </div>`;
      modal.querySelector('#modal-close').addEventListener('click', () => modal.remove());
      modal.querySelector('#modal-add').addEventListener('click', () => {
        const cart = window.GlobalStore.getCart();
        cart.push({ product_id: data.id, variant_id: data.variants[0]?.id || null, qty: 1, name: data.name, price_cents: data.price_cents });
        window.GlobalStore.saveCart(cart);
        window.GlobalStore.showToast('Added to cart');
        modal.remove();
      });
    });
}

applyFilters?.addEventListener('click', () => {
  page = 1;
  fetchProducts(true);
});

loadMore?.addEventListener('click', () => {
  page += 1;
  fetchProducts();
});

fetchProducts(true);
