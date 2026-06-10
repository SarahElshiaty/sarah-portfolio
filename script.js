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
    if (mouse.x !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repel = 100;

      if (dist < repel && dist !== 0) {
        const force = (repel - dist) / repel;
        this.x += (dx / dist) * force * 2.5;
        this.y += (dy / dist) * force * 2.5;
      }
    }

    this.x += this.vx + (this.baseX - this.x) * 0.004;
    this.y += this.vy + (this.baseY - this.y) * 0.004;

    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(196,181,253,${this.opacity})`;
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
        ctx.strokeStyle = `rgba(196,181,253,${0.14 * (1 - dist / 90)})`;
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

window.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

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
    tags: ['Python', 'Pandas', 'Scikit-learn', 'XGBoost', 'Machine Learning', 'Healthcare Informatics'],
    link: 'https://github.com/SarahElshiaty/ICU-Mortality-Prediction-ML',
    linkLabel: 'GitHub'
  },

  p2: {
    title: 'ICU Clinical Data Analysis & Visualization',
    category: 'AI & Data Science',
    desc: 'Performed a complete data science workflow on ICU patient data, including cleaning, exploratory data analysis, feature interpretation, visualizations, and final reporting. The project focused on identifying mortality-related clinical patterns and presenting insights in a clear, stakeholder-oriented format.',
    tags: ['Python', 'Pandas', 'EDA', 'Visualization', 'Healthcare Data'],
    link: 'https://github.com/SarahElshiaty/ICU-Mortality-Data-Science',
    linkLabel: 'GitHub'
  },

  p3: {
    title: 'Web Application Security Assessment',
    category: 'Security & Networking',
    desc: 'Performed a structured web application security assessment using DVWA and ethical hacking concepts. The project involved testing and documenting vulnerabilities related to SQL injection, cross-site scripting, authentication weaknesses, and common web security risks in a controlled environment.',
    tags: ['Security', 'Ethical Hacking', 'DVWA', 'SQL Injection', 'XSS'],
    link: 'https://github.com/SarahElshiaty/web-security-assessment-dvwa',
    linkLabel: 'GitHub'
  },

  p4: {
    title: 'Smart ATM Banking System',
    category: 'Software',
    desc: 'Developed a Java-based ATM banking system using object-oriented programming principles. The system supports account management, transaction handling, deposits, withdrawals, and structured user interaction through modular class-based design.',
    tags: ['Java', 'OOP', 'Banking System', 'Transactions'],
    link: 'https://github.com/SarahElshiaty/Java-ATM-System',
    linkLabel: 'GitHub'
  },

  p5: {
    title: 'MindBalance Web Application',
    category: 'Web & Database',
    desc: 'Designed and developed a mental wellness web application focused on user support, accessibility, and database-driven interaction. The system combines front-end structure, backend logic, and database functionality to organize content and support user-centered workflows.',
    tags: ['HTML', 'CSS', 'PHP', 'SQL', 'Web Development'],
    link: 'https://github.com/SarahElshiaty/MindBalance-Web-App',
    linkLabel: 'GitHub'
  },

  p6: {
    title: 'AI Tutor Recommendation System',
    category: 'AI & Data Science',
    desc: 'Developed an AI-focused tutor recommendation system designed to connect students with suitable tutors through intelligent matching logic. The project explores recommendation behavior, personalized learning support, and structured educational service workflows.',
    tags: ['Python', 'AI', 'Recommendation Systems', 'Intelligent Systems'],
    link: 'https://github.com/SarahElshiaty/AI-Tutor-Recommendation-System',
    linkLabel: 'GitHub'
  },

  p7: {
    title: 'Tutor Uberization Platform',
    category: 'Software',
    desc: 'Designed a software engineering project for a tutor-booking platform that connects students and tutors through scheduling, service management, communication, and structured system workflows. The project includes requirements analysis, UML diagrams, user personas, business planning, and SDLC documentation.',
    tags: ['SRS', 'UML', 'System Design', 'SDLC', 'Software Engineering'],
    link: 'https://github.com/SarahElshiaty/Tutor-Uberization',
    linkLabel: 'GitHub'
  },

  p8: {
    title: 'Hospital Management System',
    category: 'Software',
    desc: 'Built a hospital management system focused on organizing healthcare-related records, operational workflows, and structured system functionality. The project demonstrates software logic, data organization, modular design, and practical system development for a healthcare context.',
    tags: ['C++', 'Data Structures', 'Healthcare System', 'System Design'],
    link: 'https://github.com/SarahElshiaty/Hospital-System',
    linkLabel: 'GitHub'
  },

  p9: {
    title: 'Network Design & Simulation',
    category: 'Security & Networking',
    desc: 'Created and simulated a computer network environment using Cisco Packet Tracer. The project included network topology design, router and switch configuration, IP addressing, connectivity testing, and network communication analysis.',
    tags: ['Networking', 'Packet Tracer', 'Routers', 'Switches'],
    link: 'https://github.com/SarahElshiaty/Network-Design-Project',
    linkLabel: 'GitHub'
  },

  p10: {
    title: 'Blood Donation Management System Database',
    category: 'Web & Database',
    desc: 'Developed a database management system for blood donation records, focusing on relational schema design, SQL queries, structured data storage, and database-supported record management. The project demonstrates practical database design and information organization.',
    tags: ['SQL', 'Database', 'MySQL', 'Relational Design'],
    link: 'https://github.com/SarahElshiaty/Blood-Donation-Management-System-Database',
    linkLabel: 'GitHub'
  },

  p11: {
    title: 'Interactive Tic Tac Toe Game',
    category: 'Software',
    desc: 'Developed and enhanced an interactive C++ Tic Tac Toe game with user account creation, login authentication, selectable 3x3 and 4x4 boards, score tracking, replay functionality, alternating starting players, input validation, and final match results.',
    tags: ['C++', 'Game Logic', 'File Handling', 'Authentication', 'CLI'],
    link: 'https://github.com/SarahElshiaty/Tic-Tac-Toe-CPP',
    linkLabel: 'GitHub'
  },

  p12: {
    title: 'Contact Management System',
    category: 'Software',
    desc: 'Built and enhanced a Python contact management system with contact storage, searching, updating, deletion, validation checks, duplicate prevention, backup creation, corrupted-file handling, and organized command-line workflows.',
    tags: ['Python', 'File Handling', 'Validation', 'Regex', 'CLI'],
    link: 'https://github.com/SarahElshiaty/Contact-Management-System',
    linkLabel: 'GitHub'
  },

  p13: {
    title: 'EpiLoad: AI Framework for Hospital Load Management',
    category: 'Current Project',
    desc: 'EpiLoad is an ongoing senior project focused on hospital load management during epidemic surges. The framework combines current-state analytics, predictive analytics, decision support, and cross-hospital coordination. It aims to support healthcare decision-making by identifying overload risks, recommending operational actions, and enabling privacy-conscious coordination between hospitals.',
    tags: ['AI', 'Healthcare Informatics', 'Decision Support', 'Predictive Analytics', 'Senior Project'],
    link: 'https://github.com/SarahElshiaty/epiload-ai-hospital-load-management',
    linkLabel: 'GitHub'
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

modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

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
    btn.style.background = '#7c3aed';
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
