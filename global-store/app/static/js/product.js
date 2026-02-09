const addToCartBtn = document.getElementById('add-to-cart');
const variantSelect = document.getElementById('variant');
const qtyInput = document.getElementById('qty');
const productSection = document.querySelector('.product-detail');
const thumbs = document.querySelectorAll('.thumb');
const mainImage = document.getElementById('main-image');

thumbs.forEach((thumb) => {
  thumb.addEventListener('click', () => {
    if (mainImage) mainImage.src = thumb.dataset.src;
  });
});

addToCartBtn?.addEventListener('click', () => {
  const cart = window.GlobalStore.getCart();
  const productId = productSection.dataset.productId;
  const variantId = variantSelect?.value || null;
  const qty = parseInt(qtyInput.value || '1', 10);
  const name = productSection.querySelector('h1').textContent;
  const priceText = productSection.querySelector('.price').textContent.replace('$', '');
  const priceCents = Math.round(parseFloat(priceText) * 100);
  cart.push({ product_id: productId, variant_id: variantId, qty, name, price_cents: priceCents });
  window.GlobalStore.saveCart(cart);
  window.GlobalStore.showToast('Added to cart');
});
