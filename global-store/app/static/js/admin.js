const links = document.querySelectorAll('.admin-sidebar a');
links.forEach((link) => {
  if (window.location.pathname.startsWith(link.getAttribute('href'))) {
    link.style.fontWeight = '700';
  }
});
