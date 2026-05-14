/* =====================================================
   SARAH ELSHIATY PORTFOLIO — script.js
===================================================== */

// ===================== PARTICLE CANVAS =====================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };
let animId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.getElementById('hero').offsetHeight;
}

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.5;
    this.baseX = this.x;
    this.baseY = this.y;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.15;
  }
  update() {
    // Mouse repulsion
    if (mouse.x !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repel = 100;
      if (dist < repel) {
        const force = (repel - dist) / repel;
        this.x += (dx / dist) * force * 2.5;
        this.y += (dy / dist) * force * 2.5;
      }
    }
    // Drift back & float
    this.x += this.vx + (this.baseX - this.x) * 0.004;
    this.y += this.vy + (this.baseY - this.y) * 0.004;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(181,212,176,${this.opacity})`;
    ctx.fill();
  }
}

function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 90) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(181,212,176,${0.12 * (1 - dist / 90)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function initParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 12000);
  for (let i = 0; i < Math.min(count, 100); i++) particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  animId = requestAnimationFrame(animate);
}

window.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});
window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
canvas.addEventListener('touchmove', e => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.touches[0].clientX - rect.left;
  mouse.y = e.touches[0].clientY - rect.top;
}, { passive: true });

resizeCanvas();
initParticles();
animate();

// ===================== NAVBAR SCROLL =====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===================== HAMBURGER MENU =====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// ===================== SCROLL REVEAL =====================
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===================== PROJECT FILTER =====================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const cat = card.dataset.category;
      const show = filter === 'all' || cat === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

// ===================== PROJECT MODAL DATA =====================
const projectData = {
  p1: {
    title: 'ICU Mortality Risk Prediction',
    category: 'AI & Data Science',
    desc: 'Developed a machine learning workflow for ICU mortality prediction using structured clinical data. The project included preprocessing, exploratory analysis, feature refinement, class imbalance handling, model comparison, threshold tuning, and evaluation using recall, F1-score, ROC-AUC, and confusion matrices. The final direction emphasized detecting high-risk ICU patients while keeping the model interpretable.',
    tags: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'ML', 'Healthcare AI'],
    link: 'https://github.com/SarahElshiaty/ICU-Mortality-Prediction-ML',
    linkLabel: 'View Code'
  },
  p2: {
    title: 'ICU Clinical Data Analysis & Visualization',
    category: 'AI & Data Science',
    desc: 'Performed a full data science workflow on ICU monitoring data, including data cleaning, exploratory analysis, feature interpretation, visualization, and final reporting. The project focused on understanding mortality-related clinical patterns and presenting insights in a clear, stakeholder-friendly format.',
    tags: ['Python', 'Pandas', 'EDA', 'Visualization', 'Healthcare Data'],
    link: 'https://github.com/SarahElshiaty/icu-clinical-data-analysis',
    linkLabel: 'View Code'
  },
  p3: {
    title: 'Web Application Security Assessment',
    category: 'Security & Networking',
    desc: 'Performed a structured security assessment on a web application environment using ethical hacking concepts and vulnerability testing techniques. The project involved analyzing common web vulnerabilities such as SQL injection, XSS, authentication weaknesses, and password-related risks, followed by documenting findings and security observations through organized reporting.',
    tags: ['Security', 'Ethical Hacking', 'SQLi', 'XSS', 'Vulnerability Analysis'],
    link: 'https://github.com/SarahElshiaty/web-security-assessment',
    linkLabel: 'View Project'
  },
  p4: {
    title: 'Smart ATM Banking System',
    category: 'Software',
    desc: 'Developed an ATM banking system using Java and object-oriented programming principles. The system supports multiple account types, transaction handling, deposits, withdrawals, and user/admin interactions through a modular class-based structure designed to simulate real banking workflows.',
    tags: ['Java', 'OOP', 'Banking System', 'Transactions'],
    link: 'https://github.com/SarahElshiaty/smart-atm-banking-system',
    linkLabel: 'View Code'
  },
  p5: {
    title: 'MindBalance Web Application',
    category: 'Web & Database',
    desc: 'Designed and developed a mental wellness web application concept aimed at supporting users through an organized and user-friendly platform. The system integrates front-end design with backend and database functionality to manage user interaction, content organization, and structured web application behavior.',
    tags: ['HTML', 'CSS', 'PHP', 'SQL', 'Web Development'],
    link: 'https://github.com/SarahElshiaty/mindbalance-web-application',
    linkLabel: 'View Code'
  },
  p6: {
    title: 'Intelligent Tutor Recommendation System',
    category: 'AI & Data Science',
    desc: 'Developed an AI-focused tutoring platform concept designed to connect students with suitable tutors through intelligent recommendation logic and structured user interaction. The project explored AI-driven matching behavior, decision-making concepts, and personalized educational support through a modern tutoring system workflow.',
    tags: ['Python', 'AI', 'Intelligent Systems', 'Recommendation Logic'],
    link: 'https://github.com/SarahElshiaty/intelligent-tutor-recommendation-system',
    linkLabel: 'View Project'
  },
  p7: {
    title: 'TutorLink System Design',
    category: 'Software',
    desc: 'Designed a complete tutoring service platform connecting students and tutors through booking, scheduling, communication, and service management features. The project included system architecture, UML diagrams, workflows, personas, business planning, and structured software documentation.',
    tags: ['SRS', 'UML', 'System Design', 'SDLC'],
    link: 'https://github.com/SarahElshiaty/tutorlink-system-design',
    linkLabel: 'View Project'
  },
  p8: {
    title: 'Structured Data Management System',
    category: 'Software',
    desc: 'Built a C++ system designed around structured data handling and algorithm-based operations. The project focused on organizing, processing, and managing data efficiently while applying core data structure concepts and logical program flow.',
    tags: ['C++', 'Data Structures', 'Algorithms'],
    link: 'https://github.com/SarahElshiaty/structured-data-management-system',
    linkLabel: 'View Code'
  },
  p9: {
    title: 'Network Design & Simulation',
    category: 'Security & Networking',
    desc: 'Created and simulated a computer network environment using Cisco Packet Tracer. The project included configuring routers and switches, assigning IP addressing schemes, testing communication between devices, and analyzing network connectivity through a structured simulated environment.',
    tags: ['Networking', 'Packet Tracer', 'Routers', 'Switches'],
    link: 'https://github.com/SarahElshiaty/network-design-simulation',
    linkLabel: 'View Project'
  },
  p10: {
    title: 'Relational Database Management System',
    category: 'Web & Database',
    desc: 'Developed a relational database system integrating SQL operations with Python functionality. The project involved creating database schemas, managing structured records, performing queries, and organizing data relationships through a functional database environment.',
    tags: ['SQL', 'Python', 'Database', 'MySQL'],
    link: 'https://github.com/SarahElshiaty/relational-database-management-system',
    linkLabel: 'View Code'
  },
  p11: {
    title: 'Interactive Tic Tac Toe Game',
    category: 'Software',
    desc: 'Developed and enhanced an interactive Tic Tac Toe game using C++. The project included player interaction handling, replay functionality, score tracking, turn management, and structured gameplay logic designed to improve the overall user experience and program organization.',
    tags: ['C++', 'Game Logic', 'Advanced Programming'],
    link: 'https://github.com/SarahElshiaty/interactive-tic-tac-toe',
    linkLabel: 'View Code'
  },
  p12: {
    title: 'Contact Management System',
    category: 'Software',
    desc: 'Built and enhanced a contact management system using Python with features including contact storage, searching, updating, deletion, validation checks, duplicate prevention, and backup handling. The project focused on creating an organized command-line system with practical file handling and user interaction functionality.',
    tags: ['Python', 'File Handling', 'Validation', 'CLI'],
    link: 'https://github.com/SarahElshiaty/contact-management-system',
    linkLabel: 'View Code'
  },
  p13: {
    title: 'EpiLoad: AI Framework for Hospital Load Management',
    category: 'Current Project',
    desc: 'EpiLoad is an ongoing senior project focused on hospital load management during epidemic surges. The framework combines current-state analytics, predictive analytics, decision support, and cross-hospital coordination. It aims to support healthcare decision-making by identifying overload risks, recommending operational actions, and enabling privacy-conscious coordination between hospitals. The project was also represented through an L&T poster and continues to be implemented.',
    tags: ['AI', 'Healthcare', 'Decision Support', 'Predictive Analytics', 'Senior Project'],
    link: 'https://github.com/SarahElshiaty/epiload-ai-hospital-load-management',
    linkLabel: 'View Concept'
  }
};

// ===================== MODAL LOGIC =====================
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.btn-details').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.project;
    const data = projectData[key];
    if (!data) return;
    document.getElementById('modalCat').textContent = data.category;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;
    const tagsEl = document.getElementById('modalTags');
    tagsEl.innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');
    const linksEl = document.getElementById('modalLinks');
    linksEl.innerHTML = `<a href="${data.link}" target="_blank" class="btn btn-primary">${data.linkLabel} <i class="fas fa-external-link-alt"></i></a>`;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// ===================== TABS =====================
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
  });
});

// ===================== COPY PHONE =====================
document.getElementById('copyPhone').addEventListener('click', () => {
  navigator.clipboard.writeText('+966 56 813 2683').then(() => {
    const btn = document.getElementById('copyPhone');
    btn.innerHTML = '<i class="fas fa-check"></i>';
    btn.style.background = '#4a7c44';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-copy"></i>';
      btn.style.background = '';
      btn.style.color = '';
    }, 2000);
  });
});

// ===================== CONTACT FORM =====================
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const message = document.getElementById('fmessage').value.trim();
  if (!name || !email || !message) return;
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.location.href = `mailto:eldinseif22@gmail.com?subject=${subject}&body=${body}`;
});

// ===================== SMOOTH NAV SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===================== ACTIVE NAV HIGHLIGHT =====================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${entry.target.id}`) {
          a.style.color = 'var(--green-deep)';
        }
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));
