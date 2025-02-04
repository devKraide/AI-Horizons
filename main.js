// Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Newsletter form handling with Supabase
  const newsletterForm = document.getElementById('newsletterForm');
  
  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    
    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ name, email }]);

      if (error) throw error;
      
      alert('Thank you for subscribing! You will receive our updates soon.');
      newsletterForm.reset();
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing your subscription. Please try again.');
    }
  });

  // Stats counter animation
  const stats = document.querySelectorAll('.stat-number');
  
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value.toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Animate stats when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const endValue = parseInt(target.getAttribute('data-value'));
        animateValue(target, 0, endValue, 2000);
        observer.unobserve(target);
      }
    });
  });

  stats.forEach(stat => observer.observe(stat));
});