// ==============================
// Primasept Band — Script Lengkap (Full Features)
// ==============================

// 1) Toggle menu mobile
const toggle = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-list');
if (toggle) {
  toggle.addEventListener('click', () => navList.classList.toggle('open'));
}

// 2) Copy email ke clipboard
const copyBtn = document.getElementById('copyEmail');
const emailSpan = document.getElementById('email');
if (copyBtn && emailSpan) {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailSpan.textContent.trim());
      copyBtn.textContent = 'Disalin ✓';
      setTimeout(() => (copyBtn.textContent = 'Salin Email'), 1500);
    } catch (e) {
      alert('Gagal menyalin. Silakan salin manual.');
    }
  });
}

// 3) Efek interaktif Vanta Waves full halaman
// Pastikan di index.html sudah menambahkan:
// <script src="https://cdn.jsdelivr.net/npm/three@0.141.0/build/three.min.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.waves.min.js"></script>
if (window.VANTA && document.body) {
  VANTA.WAVES({
    el: "body",
    mouseControls: true,
    touchControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x000000,
    shininess: 50,
    waveHeight: 20,
    waveSpeed: 1.2,
    zoom: 0.85,
    backgroundColor: 0x0b0b0b
  });
}

// 4) Tombol "Back to top" muncul saat scroll
const backToTop = document.createElement('button');
backToTop.textContent = "↑";
backToTop.className = "btn ghost small";
Object.assign(backToTop.style, {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  display: "none",
  zIndex: "100",
  backdropFilter: "blur(8px)"
});
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 5) Animasi reveal sederhana saat scroll (tanpa library)
const revealElements = document.querySelectorAll('.glass, .section-head, .track, .masonry figure');
revealElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(12px)";
});
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  revealElements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// 6) Lightbox galeri (klik foto → fullscreen)
const galleryImages = document.querySelectorAll('#gallery img');
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
Object.assign(lightbox.style, {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.9)',
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: '200'
});
document.body.appendChild(lightbox);

const lightboxImg = document.createElement('img');
Object.assign(lightboxImg.style, {
  maxWidth: '90%',
  maxHeight: '90%',
  filter: 'grayscale(100%) contrast(110%)'
});
lightbox.appendChild(lightboxImg);

galleryImages.forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});
lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// 7) Smooth anchor offset untuk header sticky (fallback JS)
const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href').slice(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      const headerHeight = 72; // samakan dengan CSS :target offset
      const y = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top: y, behavior: 'smooth' });
      navList?.classList.remove('open');
    }
  });
});

// 8) Lazy loading untuk gambar galeri (optimasi performa)
document.querySelectorAll('img').forEach(img => {
  if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
});

// 9) Fokus visible untuk aksesibilitas (JS fallback)
document.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
  }
});
document.addEventListener('mousedown', () => {
  document.body.classList.remove('user-is-tabbing');
});

// 10) Proteksi audio: pause saat pindah track (UX rapi)
const audioPlayers = document.querySelectorAll('audio');
audioPlayers.forEach(player => {
  player.addEventListener('play', () => {
    audioPlayers.forEach(other => {
      if (other !== player) other.pause();
    });
  });
});

// 11) Social feed loader
document.addEventListener('DOMContentLoaded', () => {
  // Instagram embed refresh
  if (window.instgrm) {
    window.instgrm.Embeds.process();
  }

  const spotifyFrames = document.querySelectorAll('iframe[src*="spotify.com"]');
  spotifyFrames.forEach(frame => {
    frame.style.width = "100%";
  });
});

// Carousel dengan dot indicators
const track = document.querySelector('.gallery-track');
const slides = document.querySelectorAll('.gallery-track figure');
const indicators = document.querySelector('.gallery-indicators');

if (track && slides.length && indicators) {
  let currentIndex = 0;

  // Buat dot sesuai jumlah slide
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
    indicators.appendChild(dot);
  });

  const dots = indicators.querySelectorAll('.dot');

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
  }
}


// Member carousel dengan dot indicators + auto scroll + animasi masuk bertahap
const memberTrack = document.querySelector('.member-track');
const memberSlides = document.querySelectorAll('.member-slide');
const memberIndicators = document.querySelector('.member-indicators');

if (memberTrack && memberSlides.length && memberIndicators) {
  const itemsPerView = 3; // tampil 3 kotak sekaligus
  const totalPages = Math.ceil(memberSlides.length / itemsPerView);
  let currentIndex = 0;

  // Buat dot sesuai jumlah page
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateMemberCarousel();
    });
    memberIndicators.appendChild(dot);
  }

  const dots = memberIndicators.querySelectorAll('.dot');

function updateMemberCarousel() {
  const offset = currentIndex * 100;
  memberTrack.style.transform = `translateX(-${offset}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));

  // Reset animasi
  memberSlides.forEach(slide => {
    slide.classList.remove('animate-up','animate-right','animate-zoom');
  });

  // Ambil slide yang sedang tampil
  const visibleSlides = Array.from(memberSlides).slice(
    currentIndex * itemsPerView,
    currentIndex * itemsPerView + itemsPerView
  );

  // Tambahkan efek berbeda per kotak dengan delay bertahap
  visibleSlides.forEach((slide, idx) => {
    void slide.offsetWidth; // reflow
    if (idx === 0) slide.classList.add('animate-up');
    if (idx === 1) slide.classList.add('animate-right');
    if (idx === 2) slide.classList.add('animate-zoom');
    slide.style.animationDelay = `${idx * 0.15}s`;
  });
}

  // Auto scroll setiap 5 detik
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalPages;
    updateMemberCarousel();
  }, 5000);
}

// kirim
document.getElementById('waForm').addEventListener('submit', function(e) {
  e.preventDefault(); // cegah submit default

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  // Nomor tujuan WhatsApp (format internasional tanpa +)
  const phone = "6288215455705";

  // Format pesan
  const text = `Halo, saya ${name} (%20${email}).%0A%0A${message}`;

  // Buat URL WhatsApp
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  // Buka WhatsApp
  window.open(waUrl, '_blank');
});

