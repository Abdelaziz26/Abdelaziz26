const cartPageItems = document.getElementById('cart-page-items');
const cartPageTotal = document.getElementById('cart-page-total');
const checkoutForm = document.getElementById('checkout-form');
const checkoutError = document.getElementById('checkout-error');

function renderCartPage() {
  if (!cartPageItems || !cartPageTotal) return;
  const cart = window.GlobalStore.getCart();
  cartPageItems.innerHTML = '';
  let total = 0;
  cart.forEach((item) => {
    total += item.price_cents * item.qty;
    const row = document.createElement('div');
    row.className = 'card';
    row.innerHTML = `<strong>${item.name}</strong><p>Qty: ${item.qty}</p>`;
    cartPageItems.appendChild(row);
  });
  cartPageTotal.textContent = `$${(total / 100).toFixed(2)}`;
}

renderCartPage();

checkoutForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  checkoutError.textContent = '';
  const items = window.GlobalStore.getCart();
  const response = await fetch('/api/checkout/create-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: items.map((item) => ({ product_id: item.product_id, variant_id: item.variant_id, qty: item.qty })) }),
  });
  const data = await response.json();
  if (data.url) {
    window.location.href = data.url;
  } else {
    checkoutError.textContent = data.error || 'Checkout failed';
  }
});
