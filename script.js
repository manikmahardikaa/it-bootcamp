'use strict';

/* =====================================================
   DATA KELOMPOK
   Cukup ubah bagian ini — seluruh halaman ikut berubah.
   Tambah / hapus anggota dengan menambah / menghapus
   satu blok { ... } di dalam array `members`.
   ===================================================== */
const TEAM = {
  group: 'Kelompok 1',          // nama kelompok
  number: '01',                 // angka besar di tengah orbit
  bootcamp: 'Bootcamp Web Development',
  project: 'Nama Proyek Kami',
  tagline:
    'Satu tim, satu tujuan: membangun proyek web yang rapi, responsif, dan enak dilihat — dari ide sampai jadi.',
  // kalimat yang diketik bergantian di beranda
  roles: [
    'membangun website bersama',
    'belajar HTML, CSS & JavaScript',
    'berkolaborasi sebagai satu tim',
  ],

  members: [
    {
      name: 'Anggota Satu',
      role: 'Ketua & Frontend',
      photo: '',                // isi path foto, mis. 'foto/satu.jpg' (kosong = pakai inisial)
      bio: 'Menjaga alur kerja tim dan memastikan semua bagian tersambung dengan rapi.',
      part: 'Beranda & Struktur Halaman',
      partDesc:
        'Merancang kerangka halaman, menyusun navigasi, dan memastikan setiap bagian saling terhubung dengan baik.',
      tasks: [
        'Membuat struktur HTML yang semantik',
        'Menyusun navigasi dan hero section',
        'Mengatur jadwal & pembagian tugas tim',
        'Review akhir sebelum presentasi',
      ],
      skills: [
        { name: 'HTML', level: 90 },
        { name: 'Git & GitHub', level: 75 },
        { name: 'Manajemen Tim', level: 85 },
      ],
      links: {
        github: 'https://github.com/',
        linkedin: 'https://www.linkedin.com/',
        instagram: 'https://www.instagram.com/',
        email: 'anggota1@email.com',
      },
    },
    {
      name: 'Anggota Dua',
      role: 'UI / UX Designer',
      photo: '',
      bio: 'Mengubah ide menjadi tampilan yang enak dipandang dan mudah dipakai.',
      part: 'Desain & Identitas Visual',
      partDesc:
        'Menentukan gaya visual proyek: warna, tipografi, dan tata letak yang konsisten di semua halaman.',
      tasks: [
        'Menentukan palet warna & tipografi',
        'Membuat wireframe dan mockup',
        'Merancang layout yang responsif',
        'Menyiapkan ikon dan aset gambar',
      ],
      skills: [
        { name: 'Figma', level: 85 },
        { name: 'Desain Visual', level: 90 },
        { name: 'CSS', level: 75 },
      ],
      links: {
        github: 'https://github.com/',
        linkedin: 'https://www.linkedin.com/',
        instagram: 'https://www.instagram.com/',
        email: 'anggota2@email.com',
      },
    },
    {
      name: 'Anggota Tiga',
      role: 'CSS Specialist',
      photo: '',
      bio: 'Suka bermain dengan layout dan animasi supaya halaman terasa hidup.',
      part: 'Styling & Animasi',
      partDesc:
        'Menerjemahkan desain ke dalam CSS yang bersih, responsif, dan dilengkapi animasi halus.',
      tasks: [
        'Layout dengan Flexbox & Grid',
        'Animasi dan transisi halus',
        'Mode gelap / terang',
        'Tampilan responsif di semua layar',
      ],
      skills: [
        { name: 'CSS', level: 92 },
        { name: 'Animasi', level: 80 },
        { name: 'Responsive Design', level: 88 },
      ],
      links: {
        github: 'https://github.com/',
        linkedin: 'https://www.linkedin.com/',
        instagram: 'https://www.instagram.com/',
        email: 'anggota3@email.com',
      },
    },
    {
      name: 'Anggota Empat',
      role: 'JavaScript Developer',
      photo: '',
      bio: 'Membuat halaman jadi interaktif dan memastikan semuanya berjalan tanpa bug.',
      part: 'Interaksi & Fitur',
      partDesc:
        'Menghidupkan halaman dengan JavaScript: interaksi, data dinamis, dan pengujian akhir.',
      tasks: [
        'Interaksi DOM & event listener',
        'Menampilkan data secara dinamis',
        'Menguji fitur dan memperbaiki bug',
        'Menulis dokumentasi proyek',
      ],
      skills: [
        { name: 'JavaScript', level: 85 },
        { name: 'DOM', level: 82 },
        { name: 'Debugging', level: 78 },
      ],
      links: {
        github: 'https://github.com/',
        linkedin: 'https://www.linkedin.com/',
        instagram: 'https://www.instagram.com/',
        email: 'anggota4@email.com',
      },
    },
  ],
};

/* =====================================================
   HELPER
   ===================================================== */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

const HUES = [262, 190, 330, 35, 150, 215]; // warna khas tiap anggota
const pad = (n) => String(n).padStart(2, '0');
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const initials = (name) =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
const hueOf = (member, i) => member.hue ?? HUES[i % HUES.length];

const ICONS = {
  github:
    '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
  linkedin:
    '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  instagram:
    '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
  email:
    '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/>',
};
const SOCIALS = {
  github: { label: 'GitHub', href: (v) => v },
  linkedin: { label: 'LinkedIn', href: (v) => v },
  instagram: { label: 'Instagram', href: (v) => v },
  email: { label: 'Email', href: (v) => `mailto:${v}` },
};
const svg = (paths) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;

const avatar = (m, extra = '') =>
  m.photo
    ? `<img class="avatar ${extra}" src="${esc(m.photo)}" alt="Foto ${esc(m.name)}" loading="lazy">`
    : `<span class="avatar ${extra}" aria-hidden="true">${esc(initials(m.name))}</span>`;

/* =====================================================
   RENDER
   ===================================================== */
function renderHero() {
  const { members } = TEAM;

  document.title = `${TEAM.group} — Beranda`;
  $('#logoMark').textContent = `K${TEAM.number.replace(/^0+/, '') || TEAM.number}`;
  $('#logoText').textContent = TEAM.group;
  $('#groupName').textContent = TEAM.group;
  $('#bootcamp').textContent = TEAM.bootcamp;
  $('#tagline').textContent = TEAM.tagline;
  $('#projectName').textContent = TEAM.project;
  $('#footName').textContent = TEAM.group;
  $('#year').textContent = new Date().getFullYear();

  // statistik (dihitung otomatis dari data)
  const totalTasks = members.reduce((sum, m) => sum + m.tasks.length, 0);
  const totalSkills = new Set(members.flatMap((m) => m.skills.map((s) => s.name.toLowerCase()))).size;
  $('#stats').innerHTML = [
    ['Anggota', members.length],
    ['Tugas', totalTasks],
    ['Keahlian', totalSkills],
  ]
    .map(([label, n]) => `<div class="stat"><dt>${label}</dt><dd data-count="${n}">0</dd></div>`)
    .join('');

  // orbit: avatar anggota mengelilingi nomor kelompok
  const faces = members
    .map((m, i) => {
      const angle = (360 / members.length) * i;
      return `<div class="orbit-slot" style="--a:${angle}deg; --h:${hueOf(m, i)}">
        <div class="orbit-pos"><span class="orbit-face">${avatar(m)}</span></div>
      </div>`;
    })
    .join('');
  $('#orbit').innerHTML = `
    <div class="orbit-box">
      <div class="orbit-ring">${faces}</div>
      <div class="orbit-core"><strong>${esc(TEAM.number)}</strong><span>Kelompok</span></div>
    </div>`;

  // pita nama berjalan (2 set identik supaya loop mulus)
  const names = members.map((m) => `<span>${esc(m.name)}</span>`).join('');
  const half = names.repeat(Math.max(2, Math.ceil(6 / members.length)));
  $('#ticker').innerHTML = half + half;
}

function renderCards() {
  $('#cards').innerHTML = TEAM.members
    .map((m, i) => {
      const tags = m.skills.slice(0, 3).map((s) => `<span class="tag">${esc(s.name)}</span>`).join('');
      return `
      <div class="reveal" style="--d:${i * 90}ms">
        <article class="card panel" style="--h:${hueOf(m, i)}">
          ${avatar(m)}
          <h3>${esc(m.name)}</h3>
          <span class="role">${esc(m.role)}</span>
          <p class="bio">${esc(m.bio)}</p>
          <div class="tags">${tags}</div>
          <a class="card-link" href="#bagian-${i + 1}">Lihat bagian <span aria-hidden="true">→</span></a>
        </article>
      </div>`;
    })
    .join('');
}

function renderMembers() {
  const check = svg('<path d="M20 6 9 17l-5-5"/>');

  $('#members').innerHTML = TEAM.members
    .map((m, i) => {
      const socials = Object.entries(m.links || {})
        .filter(([key, value]) => SOCIALS[key] && value)
        .map(([key, value]) => {
          const external = key !== 'email';
          return `<a href="${esc(SOCIALS[key].href(value))}" aria-label="${SOCIALS[key].label} ${esc(m.name)}"${
            external ? ' target="_blank" rel="noopener noreferrer"' : ''
          }>${svg(ICONS[key])}</a>`;
        })
        .join('');

      const tasks = m.tasks.map((t) => `<li><span class="tick">${check}</span><span>${esc(t)}</span></li>`).join('');
      const skills = m.skills
        .map(
          (s) => `<div class="skill">
            <div class="skill-top"><span>${esc(s.name)}</span><span>${s.level}%</span></div>
            <div class="bar" aria-hidden="true" style="--lvl:${s.level}%"><span></span></div>
          </div>`
        )
        .join('');

      return `
      <article class="member panel reveal${i % 2 ? ' flip' : ''}" id="bagian-${i + 1}" style="--h:${hueOf(m, i)}" aria-label="Bagian ${esc(m.name)}">
        <span class="member-num" aria-hidden="true">${pad(i + 1)}</span>
        <div class="profile">
          ${avatar(m, 'lg')}
          <h3>${esc(m.name)}</h3>
          <span class="role">${esc(m.role)}</span>
          <div class="socials">${socials}</div>
        </div>
        <div class="detail">
          <p class="part-label">Bagian ${pad(i + 1)}</p>
          <p class="part-title">${esc(m.part)}</p>
          <p class="part-desc">${esc(m.partDesc)}</p>
          <h4>Yang dikerjakan</h4>
          <ul class="tasks">${tasks}</ul>
          <h4>Keahlian</h4>
          <div class="skills">${skills}</div>
        </div>
      </article>`;
    })
    .join('');
}

/* =====================================================
   INTERAKSI
   ===================================================== */

// ---- Tema terang / gelap ----
function initTheme() {
  const root = document.documentElement;
  const meta = $('meta[name="theme-color"]');
  const apply = (theme) => {
    root.dataset.theme = theme;
    meta.content = theme === 'light' ? '#f5f6ff' : '#080a14';
  };
  apply(root.dataset.theme === 'light' ? 'light' : 'dark');

  $('#themeToggle').addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    apply(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* abaikan jika storage diblokir */ }
  });
}

// ---- Menu mobile ----
function initMenu() {
  const nav = $('#nav');
  const toggle = $('#menuToggle');
  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  $$('.menu a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  addEventListener('resize', () => { if (innerWidth > 760) setOpen(false); });
}

// ---- Progress bar, bayangan navbar, link aktif ----
function initScroll() {
  const nav = $('#nav');
  const bar = $('.progress');
  let ticking = false;

  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    nav.classList.toggle('scrolled', scrollY > 24);
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();

  const links = $$('.menu a');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => {
        const active = a.getAttribute('href') === `#${entry.target.id}`;
        a.classList.toggle('active', active);
        if (active) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['beranda', 'anggota', 'bagian'].forEach((id) => spy.observe(document.getElementById(id)));
}

// ---- Efek mengetik ----
function initTyping() {
  const el = $('#typed');
  const words = TEAM.roles;
  if (reduceMotion || words.length < 2) { el.textContent = words[0] || ''; return; }

  let w = 0, c = 0, deleting = false;
  const tick = () => {
    const word = words[w];
    c += deleting ? -1 : 1;
    el.textContent = word.slice(0, c);

    let delay = deleting ? 32 : 70;
    if (!deleting && c === word.length) { deleting = true; delay = 1700; }
    else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 380; }
    setTimeout(tick, delay);
  };
  tick();
}

// ---- Muncul saat discroll + hitung angka + isi bar keahlian ----
function initReveal() {
  const finalizeCount = (el) => { el.textContent = el.dataset.count; };

  const countUp = (el) => {
    const target = Number(el.dataset.count);
    if (reduceMotion) return finalizeCount(el);
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / 1300, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      entry.target.querySelectorAll('[data-count]').forEach(countUp);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  $$('.reveal').forEach((el) => observer.observe(el));

  // angka statistik ada di hero (bukan .reveal) — amati terpisah
  const stats = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('[data-count]').forEach(countUp);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  stats.observe($('#stats'));
}

// ---- Kartu miring mengikuti kursor + sorot cahaya hero ----
function initPointerEffects() {
  if (!finePointer || reduceMotion) return;

  $$('.card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--ry', `${(x - 0.5) * 10}deg`);
      card.style.setProperty('--rx', `${(0.5 - y) * 10}deg`);
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });

  const hero = $('#beranda');
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    hero.style.setProperty('--mx', `${e.clientX - r.left}px`);
    hero.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
}

/* =====================================================
   MULAI
   ===================================================== */
renderHero();
renderCards();
renderMembers();
initTheme();
initMenu();
initScroll();
initTyping();
initReveal();
initPointerEffects();
