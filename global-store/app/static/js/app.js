const themeToggle = document.getElementById('theme-toggle');
const drawer = document.getElementById('cart-drawer');
const drawerBackdrop = document.getElementById('cart-backdrop');
const cartOpen = document.getElementById('cart-open');
const cartClose = document.getElementById('cart-close');
const toast = document.getElementById('toast');

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
if (themeToggle) {
  themeToggle.setAttribute('aria-pressed', savedTheme === 'dark');
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.setAttribute('aria-pressed', next === 'dark');
  });
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

function getCart() {
  return JSON.parse(localStorage.getItem('cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  if (!cartItems || !cartTotal) return;
  const cart = getCart();
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item) => {
    total += item.price_cents * item.qty;
    const row = document.createElement('div');
    row.className = 'card';
    row.innerHTML = `<strong>${item.name}</strong><p>Qty: ${item.qty}</p>`;
    cartItems.appendChild(row);
  });
  cartTotal.textContent = `$${(total / 100).toFixed(2)}`;
}

function openDrawer() {
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  drawerBackdrop.classList.add('show');
  renderCart();
}

function closeDrawer() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  drawerBackdrop.classList.remove('show');
}

if (cartOpen) cartOpen.addEventListener('click', openDrawer);
if (cartClose) cartClose.addEventListener('click', closeDrawer);
if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeDrawer();
  }
});

window.GlobalStore = { showToast, getCart, saveCart, renderCart };
