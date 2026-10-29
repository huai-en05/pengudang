/* From Pengudang, With love — site behaviour */
(function () {
  "use strict";

  const PLACEHOLDER = "images/graphics/placeholder.svg";
  const LANG_KEY = "pengudang-lang";
  const PASS_KEY = "pengudang-passport";
  const page = document.body.dataset.page;

  /* ---------------- Language ---------------- */
  let lang = (function () {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "id") return q;
    try { const s = localStorage.getItem(LANG_KEY); if (s) return s; } catch (e) {}
    return (navigator.language || "").toLowerCase().startsWith("id") ? "id" : "en";
  })();

  const t = (key) => (STRINGS[lang] && STRINGS[lang][key]) || STRINGS.en[key] || key;
  const L = (obj) => (obj && typeof obj === "object" ? (obj[lang] ?? obj.en) : obj);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const img = (src, alt, cls = "") =>
    `<img src="${esc(src)}" alt="${esc(alt)}" class="${cls}" loading="lazy" onerror="this.onerror=null;this.src='${PLACEHOLDER}'">`;
  const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k]);
  const locale = () => (lang === "id" ? "id-ID" : "en-GB");
  /* Prices always show as "Rp 450.000", the way they're written locally */
  const money = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: CURRENCY, maximumFractionDigits: 0 }).format(n);
  const parseDay = (s) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const dayStr = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const fmtDate = (s, opts = { weekday: "short", day: "numeric", month: "short", year: "numeric" }) =>
    new Intl.DateTimeFormat(locale(), opts).format(parseDay(s));

  const renderers = [];
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); el.title = t(el.dataset.i18nAria); });
    document.querySelectorAll(".lang button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    const titleKey = document.body.dataset.titleKey;
    if (titleKey) document.title = t(titleKey) + " · From Pengudang, With love";
    renderers.forEach((fn) => fn());
  }
  function setLang(l) {
    lang = l;
    try { localStorage.setItem(LANG_KEY, l); } catch (e) {}
    applyLang();
  }

  /* ---------------- Nav + footer ---------------- */
  function buildNav() {
    const header = document.getElementById("nav");
    if (!header) return;
    const links = [
      ["index.html", "nav.home", "home"],
      ["menu.html", "nav.menu", "menu"],
      ["classes.html", "nav.classes", "classes"],
      ["map.html", "nav.map", "map"],
      ["passport.html", "nav.passport", "passport"],
      ["contact.html", "nav.contact", "contact"]
    ];
    header.className = "nav";
    header.innerHTML = `
      <a class="nav__brand" href="index.html" aria-label="Home">Pengudang</a>
      <ul class="nav__links">
        ${links.map(([h, k, p]) => `<li><a href="${h}" data-i18n="${k}"${p === page ? ' aria-current="page"' : ""}></a></li>`).join("")}
      </ul>
      <div class="lang" role="group" aria-label="Language">
        <button type="button" data-lang="en">EN</button><button type="button" data-lang="id">ID</button>
      </div>
      <button class="nav__toggle" type="button" aria-label="Menu" aria-expanded="false">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>`;
    header.querySelectorAll(".lang button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
    const toggle = header.querySelector(".nav__toggle");
    toggle.addEventListener("click", () => {
      const open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
    });

    const footer = document.getElementById("footer");
    if (footer) {
      footer.className = "footer";
      renderers.push(() => drawFooter(footer, links));
    }
  }

  const SOCIAL_ICONS = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z"/>',
    tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.4 2.8 2.2 4.6 5 5"/>',
    youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.2v5.6l4.8-2.8z" fill="currentColor"/>',
    whatsapp: '<path d="M4 20l1.3-4A8 8 0 1 1 8.4 19z"/><path d="M9 8.5c0 3.5 2.6 6.5 6.5 6.5l1-1.6-2-1-1 1c-1.2-.5-2.4-1.7-2.9-2.9l1-1-1-2z" fill="currentColor" stroke="none"/>',
    phone: '<path d="M5 3h3.5l1.5 5-2.2 1.5a11 11 0 0 0 6.7 6.7L16 13l5 1.5V18a3 3 0 0 1-3 3A15 15 0 0 1 3 6a3 3 0 0 1 2-3z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6l8.5 7 8.5-7"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    cancel: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4M9.5 13.5l5 4M14.5 13.5l-5 4"/>',
    wallet: '<path d="M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V7z"/><path d="M4 7l11-3v3"/><circle cx="16" cy="13.5" r="1.3" fill="currentColor" stroke="none"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14c2.7 0 4.5 2.2 4.5 5"/>'
  };
  const icon = (name, size = 22) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${SOCIAL_ICONS[name]}</svg>`;

  function drawFooter(footer, links) {
    const wa = SOCIALS.find((s) => s.id === "whatsapp");
    footer.innerHTML = `
      <img class="footer__art" src="images/graphics/village-band.png" alt="" aria-hidden="true">
      <div class="footer__grid">
        <div class="footer__brand">
          <a class="script" href="index.html">From Pengudang, With love</a>
          <p>${esc(t("footer.made"))}</p>
          <ul class="socials">
            ${SOCIALS.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}" title="${esc(s.label)}">${icon(s.id)}</a></li>`).join("")}
          </ul>
        </div>
        <nav aria-label="${esc(t("footer.explore"))}">
          <h2>${esc(t("footer.explore"))}</h2>
          <ul>${links.map(([h, k]) => `<li><a href="${h}">${esc(t(k))}</a></li>`).join("")}</ul>
        </nav>
        <div>
          <h2>${esc(t("footer.menu"))}</h2>
          <ul>${MENU_CATEGORIES.flatMap((c) => c.dishes).map((id) => `<li><a href="menu.html#${id}">${esc(DISHES[id].name)}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h2>${esc(t("footer.contact"))}</h2>
          <ul class="contact-list">
            <li>${icon("phone", 18)}<a href="tel:${esc(CONTACT.phoneLink)}">${esc(CONTACT.phoneDisplay)}</a></li>
            ${wa ? `<li>${icon("whatsapp", 18)}<a href="${esc(wa.url)}" target="_blank" rel="noopener">WhatsApp</a></li>` : ""}
            <li>${icon("mail", 18)}<a href="mailto:${esc(CONTACT.emailDisplay)}">${esc(CONTACT.emailDisplay)}</a></li>
            <li>${icon("pin", 18)}<a href="${esc(CONTACT.mapsUrl)}" target="_blank" rel="noopener">${esc(L(CONTACT.address))}</a></li>
            <li>${icon("clock", 18)}<span>${esc(L(CONTACT.hours))}</span></li>
          </ul>
        </div>
      </div>
      <div class="footer__base">© ${new Date().getFullYear()} From Pengudang, With love · <a href="credits.html">${esc(t("footer.credits"))}</a></div>`;
  }

  /* ---------------- Shared pieces ---------------- */
  const STAR = '<svg viewBox="0 0 64 61" aria-hidden="true"><path d="M32 0L39.5542 23.2999H64L44.2229 37.7001L51.7771 61L32 46.5999L12.2229 61L19.7771 37.7001L0 23.2999H24.4458L32 0Z"/></svg>';

  const stars = (r) => `<span class="rating"><span class="rating__star" aria-hidden="true">★</span> <b>${r.toFixed(1)}</b></span>`;

  /* Class card: photo, name, one line of facts, price. Everything else is on the class page. */
  function renderClassCards(el, list = CLASSES) {
    el.innerHTML = list.map((c) => {
      const [, sub] = L(c.name).split(": ");
      return `
      <article class="class-card">
        ${img(c.image, L(c.short), "class-card__img")}
        <div class="class-card__body">
          <h3><a class="class-card__link" href="class.html?id=${c.id}">${esc(L(c.short))}</a></h3>
          ${sub ? `<p class="class-card__sub">${esc(sub)}</p>` : ""}
          <p class="class-card__facts">${stars(c.rating)} <span>(${c.reviewCount})</span> · ${esc(L(c.duration))}</p>
          <p class="price"><small>${esc(t("class.from"))}</small> <b>${money(c.price)}</b> <small>${esc(t("class.perPerson"))}</small></p>
        </div>
      </article>`;
    }).join("");
  }

  /* Sends text to the Ibus by WhatsApp (or email). Returns false when no contact is set up yet. */
  function sendToIbus(text, subject) {
    let url = "";
    if (CONTACT.whatsapp) url = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
    else if (CONTACT.email) url = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    if (!url) return false;
    window.open(url, "_blank", "noopener");
    return true;
  }
  const checkForm = (form) => {
    const bad = [...form.querySelectorAll("[required]")].find((f) => !f.checkValidity());
    if (bad) { bad.focus(); bad.reportValidity(); }
    return !bad;
  };

  /* ---------------- Contact page ---------------- */
  function initContact() {
    const host = document.getElementById("contact-form");
    const info = document.getElementById("contact-info");
    const draw = () => {
      const keep = {};
      host.querySelectorAll("input, select, textarea").forEach((f) => (keep[f.name] = f.value));
      host.innerHTML = `
        <form class="form-card" novalidate>
          <div class="form-grid">
            <label class="field"><span>${esc(t("form.name"))}</span><input name="name" required autocomplete="name"></label>
            <label class="field"><span>${esc(t("form.email"))}</span><input name="email" type="email" required autocomplete="email"></label>
            <label class="field"><span>${esc(t("form.phone"))}</span><input name="phone" type="tel" autocomplete="tel"></label>
            <label class="field"><span>${esc(t("contact.topic"))}</span>
              <select name="topic">${["contact.t1", "contact.t2", "contact.t3", "contact.t4"].map((k) => `<option>${esc(t(k))}</option>`).join("")}</select></label>
            <label class="field full"><span>${esc(t("contact.message"))}</span><textarea name="message" required rows="5"></textarea></label>
          </div>
          <button class="submit" type="submit">${esc(t("contact.send"))}</button>
          <p class="form-msg" role="status"></p>
        </form>`;
      host.querySelectorAll("input, select, textarea").forEach((f) => { if (keep[f.name] !== undefined) f.value = keep[f.name]; });
      host.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (!checkForm(form)) return;
        const d = Object.fromEntries(new FormData(form));
        const text = [`${d.topic}`, "", d.message, "", `${d.name} · ${d.email}${d.phone ? " · " + d.phone : ""}`].join("\n");
        form.querySelector(".form-msg").textContent = sendToIbus(text, d.topic) ? t("contact.sent") : t("form.noContact");
      });
      const wa = SOCIALS.find((s) => s.id === "whatsapp");
      info.innerHTML = `
        <ul class="contact-cards">
          <li>${icon("phone")}<div><b>${esc(t("contact.call"))}</b><a href="tel:${esc(CONTACT.phoneLink)}">${esc(CONTACT.phoneDisplay)}</a></div></li>
          ${wa ? `<li>${icon("whatsapp")}<div><b>WhatsApp</b><a href="${esc(wa.url)}" target="_blank" rel="noopener">${esc(CONTACT.phoneDisplay)}</a></div></li>` : ""}
          <li>${icon("mail")}<div><b>${esc(t("form.email"))}</b><a href="mailto:${esc(CONTACT.emailDisplay)}">${esc(CONTACT.emailDisplay)}</a></div></li>
          <li>${icon("pin")}<div><b>${esc(t("contact.find"))}</b><a href="${esc(CONTACT.mapsUrl)}" target="_blank" rel="noopener">${esc(L(CONTACT.address))}</a></div></li>
          <li>${icon("clock")}<div><b>${esc(t("contact.hours"))}</b><span>${esc(L(CONTACT.hours))}</span></div></li>
        </ul>
        <ul class="socials socials--dark">
          ${SOCIALS.map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.label)}" title="${esc(s.label)}">${icon(s.id)}</a></li>`).join("")}
        </ul>`;
    };
    renderers.push(draw);
  }

  /* ---------------- Home ---------------- */
  function initHome() {
    const ibus = document.getElementById("ibus");
    const classes = document.getElementById("home-classes");
    const reviews = document.getElementById("reviews");
    let current = 0;
    renderers.push(() => {
      ibus.innerHTML = IBUS.map((i) => `
        <article class="ibu">
          <div class="polaroid">${img(i.image, i.name)}</div>
          <div><h3>${esc(i.name)}</h3><p>${esc(L(i.bio))}</p></div>
        </article>`).join("");
      renderClassCards(classes);
      drawReview();
    });
    function drawReview() {
      const r = REVIEWS[current];
      reviews.innerHTML = `
        <div class="review">
          ${img(r.image, r.name, "review__img")}
          <div class="review__body">
            <div class="stars" aria-label="${r.stars} / 5">${STAR.repeat(r.stars)}</div>
            <blockquote>“${esc(L(r.text))}”</blockquote>
            <cite>${esc(r.name)}</cite>
          </div>
        </div>
        ${REVIEWS.length > 1 ? `
        <div class="carousel__nav">
          <button type="button" class="carousel__arrow" data-step="-1" aria-label="${esc(t("home.prevReview"))}">‹</button>
          <div class="carousel__dots">${REVIEWS.map((_, i) => `<button type="button" aria-label="${i + 1} / ${REVIEWS.length}" aria-pressed="${i === current}" data-i="${i}"></button>`).join("")}</div>
          <button type="button" class="carousel__arrow" data-step="1" aria-label="${esc(t("home.nextReview"))}">›</button>
        </div>` : ""}`;
      reviews.querySelectorAll(".carousel__dots button").forEach((b) => b.addEventListener("click", () => { current = +b.dataset.i; drawReview(); }));
      reviews.querySelectorAll("[data-step]").forEach((b) => b.addEventListener("click", () => {
        current = (current + +b.dataset.step + REVIEWS.length) % REVIEWS.length; drawReview();
      }));
    }
    if (REVIEWS.length > 1) setInterval(() => { if (!reviews.matches(":hover")) { current = (current + 1) % REVIEWS.length; drawReview(); } }, 8000);
  }

  /* ---------------- Classes ---------------- */
  function initClasses() {
    const grid = document.getElementById("class-list");
    renderers.push(() => renderClassCards(grid));
  }

  /* ---------------- Availability ----------------
     Sessions come from each class's weekly schedule in data.js. Until there is a
     real booking system, how full a session is gets estimated from a hash of the
     class, date and time, so the same day always shows the same spots left. */
  const AVAIL_MONTHS = 4; // this month + the next three
  function hashUnit(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return ((h >>> 0) % 10000) / 10000;
  }
  function sessionsFor(c, ds) {
    if (CLOSED_DATES.includes(ds) || !c.schedule.days.includes(parseDay(ds).getDay())) return [];
    const cap = c.schedule.capacity;
    return c.schedule.times.map((time) => {
      const r = hashUnit(`${c.id}|${ds}|${time}`);
      const booked = r < 0.1 ? cap : Math.floor(r * r * cap);
      return { time, left: cap - booked };
    });
  }
  function bookableRange() {
    const now = new Date();
    const first = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const last = new Date(now.getFullYear(), now.getMonth() + AVAIL_MONTHS, 0);
    return { first: dayStr(first), last: dayStr(last), month0: new Date(now.getFullYear(), now.getMonth(), 1) };
  }

  function availabilityWidget(host, c) {
    const st = { month: 0, pax: 2, date: "", time: "", msg: "" };
    const range = bookableRange();
    // open on the month of the first available day
    const draw = () => {
      const m = new Date(range.month0.getFullYear(), range.month0.getMonth() + st.month, 1);
      const daysIn = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
      const lead = (m.getDay() + 6) % 7; // weeks start on Monday
      const wd = [...Array(7)].map((_, i) => new Intl.DateTimeFormat(locale(), { weekday: "narrow" }).format(new Date(2024, 0, 1 + i)));
      const cells = [];
      for (let i = 0; i < lead; i++) cells.push('<span class="cal__blank"></span>');
      for (let d = 1; d <= daysIn; d++) {
        const ds = dayStr(new Date(m.getFullYear(), m.getMonth(), d));
        const inRange = ds >= range.first && ds <= range.last;
        const ss = inRange ? sessionsFor(c, ds) : [];
        const most = Math.max(0, ...ss.map((s) => s.left));
        const state = most >= st.pax ? (most <= 3 ? "few" : "open") : "off";
        const label = fmtDate(ds, { weekday: "long", day: "numeric", month: "long" });
        cells.push(state === "off"
          ? `<span class="cal__day is-off" aria-label="${esc(label)}">${d}</span>`
          : `<button type="button" class="cal__day is-${state}${ds === st.date ? " is-sel" : ""}" data-date="${ds}" aria-pressed="${ds === st.date}" aria-label="${esc(label)}">${d}</button>`);
      }
      const ss = st.date ? sessionsFor(c, st.date) : [];
      host.innerHTML = `
        <div class="avail__price"><small>${esc(t("class.from"))}</small> <b>${money(c.price)}</b> <small>${esc(t("class.perPerson"))}</small></div>
        <h2 class="avail__title">${esc(t("avail.title"))}</h2>
        <div class="avail__pax">
          <span>${esc(t("avail.participants"))}</span>
          <div class="stepper">
            <button type="button" data-pax="-1" aria-label="${esc(t("avail.less"))}"${st.pax <= 1 ? " disabled" : ""}>−</button>
            <output aria-live="polite">${st.pax}</output>
            <button type="button" data-pax="1" aria-label="${esc(t("avail.more"))}"${st.pax >= c.schedule.capacity ? " disabled" : ""}>+</button>
          </div>
        </div>
        <div class="cal">
          <div class="cal__head">
            <button type="button" data-month="-1" aria-label="${esc(t("avail.prev"))}"${st.month === 0 ? " disabled" : ""}>‹</button>
            <b>${esc(new Intl.DateTimeFormat(locale(), { month: "long", year: "numeric" }).format(m))}</b>
            <button type="button" data-month="1" aria-label="${esc(t("avail.next"))}"${st.month >= AVAIL_MONTHS - 1 ? " disabled" : ""}>›</button>
          </div>
          <div class="cal__grid">${wd.map((w) => `<span class="cal__wd">${esc(w)}</span>`).join("")}${cells.join("")}</div>
          <div class="cal__legend">
            <span><i class="dot dot--open"></i>${esc(t("avail.legendOpen"))}</span>
            <span><i class="dot dot--few"></i>${esc(t("avail.legendFew"))}</span>
            <span><i class="dot dot--off"></i>${esc(t("avail.legendFull"))}</span>
          </div>
        </div>
        <div class="avail__times">
          ${st.date ? `<p class="avail__label">${esc(fill(t("avail.times"), { date: fmtDate(st.date, { weekday: "long", day: "numeric", month: "long" }) }))}</p>
            <div class="slots">${ss.map((s) => {
              const ok = s.left >= st.pax;
              const note = s.left === 0 ? t("avail.full") : ok ? fill(t("avail.spots"), { n: s.left }) : fill(t("avail.notEnough"), { n: s.left });
              return `<button type="button" class="slot${s.time === st.time ? " is-sel" : ""}" data-time="${s.time}" aria-pressed="${s.time === st.time}"${ok ? "" : " disabled"}><b>${s.time}</b><small>${esc(note)}</small></button>`;
            }).join("")}</div>`
          : `<p class="avail__label">${esc(t("avail.pickDate"))}</p>`}
        </div>
        <div class="avail__total"><span>${esc(t("avail.total"))} · ${st.pax} × ${money(c.price)}</span><b>${money(c.price * st.pax)}</b></div>
        <button type="button" class="btn btn--solid avail__reserve">${esc(t("avail.reserve"))}</button>
        <p class="avail__msg" role="status">${esc(st.msg)}</p>
        <ul class="avail__perks">
          <li>${icon("cancel", 18)}<span><b>${esc(t("class.cancelTitle"))}</b> ${esc(t("class.cancelText"))}</span></li>
          <li>${icon("wallet", 18)}<span><b>${esc(t("class.payTitle"))}</b></span></li>
        </ul>`;
      host.querySelectorAll("[data-pax]").forEach((b) => b.onclick = () => {
        st.pax = Math.min(c.schedule.capacity, Math.max(1, st.pax + +b.dataset.pax));
        if (st.date) {
          const s = sessionsFor(c, st.date).find((x) => x.time === st.time);
          if (!sessionsFor(c, st.date).some((x) => x.left >= st.pax)) { st.date = ""; st.time = ""; }
          else if (s && s.left < st.pax) st.time = "";
        }
        st.msg = ""; draw();
      });
      host.querySelectorAll("[data-month]").forEach((b) => b.onclick = () => { st.month += +b.dataset.month; draw(); });
      host.querySelectorAll("[data-date]").forEach((b) => b.onclick = () => {
        st.date = b.dataset.date;
        const open = sessionsFor(c, st.date).filter((s) => s.left >= st.pax);
        st.time = open.length === 1 ? open[0].time : "";
        st.msg = ""; draw();
      });
      host.querySelectorAll("[data-time]").forEach((b) => b.onclick = () => { st.time = b.dataset.time; st.msg = ""; draw(); });
      host.querySelector(".avail__reserve").onclick = () => {
        if (!st.date || !st.time) { st.msg = t("avail.choose"); draw(); return; }
        openCheckout(c, st);
      };
    };
    // open on the first month with a few open days (skip a nearly-finished current month)
    for (let k = 0; k < AVAIL_MONTHS; k++) {
      const m = new Date(range.month0.getFullYear(), range.month0.getMonth() + k, 1);
      const days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
      const open = [...Array(days)].filter((_, i) => {
        const ds = dayStr(new Date(m.getFullYear(), m.getMonth(), i + 1));
        return ds >= range.first && sessionsFor(c, ds).some((s) => s.left >= st.pax);
      }).length;
      if (open >= 3) { st.month = k; break; }
    }
    return draw;
  }

  /* Checkout: after choosing a date and time, guests confirm their booking here.
     The request goes to the Ibus by WhatsApp/email (see CONTACT in data.js). */
  function openCheckout(c, sel) {
    let dlg = document.getElementById("checkout");
    if (!dlg) {
      dlg = document.createElement("dialog");
      dlg.id = "checkout"; dlg.className = "modal checkout";
      document.body.appendChild(dlg);
      dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    }
    const when = `${fmtDate(sel.date, { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · ${sel.time}`;
    dlg.innerHTML = `
      <form class="modal__inner" novalidate>
        <button class="modal__close" type="button" aria-label="${esc(t("checkout.close"))}">×</button>
        <h3>${esc(t("checkout.title"))}</h3>
        <div class="checkout__summary">
          ${img(c.image, L(c.short))}
          <div>
            <b>${esc(L(c.short))}</b>
            <span>${esc(when)}</span>
            <span>${sel.pax} × ${money(c.price)}</span>
          </div>
          <p class="checkout__total"><span>${esc(t("avail.total"))}</span><b>${money(c.price * sel.pax)}</b></p>
        </div>
        <div class="form-grid">
          <label class="field"><span>${esc(t("checkout.name"))}</span><input name="name" required autocomplete="name"></label>
          <label class="field"><span>${esc(t("form.email"))}</span><input name="email" type="email" required autocomplete="email"></label>
          <label class="field full"><span>${esc(t("form.phone"))}</span><input name="phone" type="tel" autocomplete="tel"></label>
          <label class="field full"><span>${esc(t("form.notes"))}</span><textarea name="notes" rows="2"></textarea></label>
        </div>
        <button class="btn btn--solid checkout__confirm" type="submit">${esc(t("checkout.confirm"))}</button>
        <p class="checkout__note">${icon("wallet", 16)} ${esc(t("checkout.payNote"))}</p>
        <p class="form-msg" role="status"></p>
      </form>`;
    dlg.querySelector(".modal__close").onclick = () => dlg.close();
    dlg.querySelector("form").onsubmit = (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      if (!checkForm(form)) return;
      const d = Object.fromEntries(new FormData(form));
      const text = [
        t("checkout.msgIntro"), "",
        `${L(c.short)}`, when, `${t("avail.participants")}: ${sel.pax}`, `${t("avail.total")}: ${money(c.price * sel.pax)}`, "",
        `${t("checkout.name")}: ${d.name}`, `${t("form.email")}: ${d.email}`,
        d.phone ? `WhatsApp: ${d.phone}` : null,
        d.notes ? `${t("form.notes").replace(/\?.*$/, "?")} ${d.notes}` : null
      ].filter((x) => x !== null).join("\n");
      form.querySelector(".form-msg").textContent = sendToIbus(text, `Booking: ${L(c.short)}, ${sel.date}`) ? t("checkout.sent") : t("form.noContact");
    };
    dlg.showModal();
  }

  /* ---------------- Class detail page ---------------- */
  function initClass() {
    const id = new URLSearchParams(location.search).get("id");
    const c = CLASSES.find((x) => x.id === id) || CLASSES[0];
    const main = document.getElementById("class-main");
    const aside = document.getElementById("class-avail");
    const more = document.getElementById("class-more");
    const drawAvail = availabilityWidget(aside, c);
    const ibu = IBUS[c.ibu];
    const reviews = REVIEWS.filter((r) => r.class === c.id);
    const list = (arr, cls = "ticks") => `<ul class="${cls}">${arr.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
    const draw = () => {
      document.title = L(c.short) + " · From Pengudang, With love";
      const [, sub] = L(c.name).split(": ");
      main.innerHTML = `
        <a class="crumb" href="classes.html">‹ ${esc(t("class.back"))}</a>
        <h1 class="script-title class-title">${esc(L(c.short))}</h1>
        ${sub ? `<p class="class-sub">${esc(sub)}</p>` : ""}
        <p class="class-meta">${stars(c.rating)} <a href="#reviews">${esc(fill(t("class.reviews"), { n: c.reviewCount }))}</a> · Pengudang, Bintan · ${esc(ibu.name)}</p>
        <p class="only-mobile"><a class="btn btn--solid" href="#class-avail">${esc(t("avail.title"))}</a></p>
        <div class="gallery">
          ${img(c.image, L(c.short), "gallery__main")}
          ${c.dishes.filter((d) => DISHES[d].image.split("/").pop() !== c.image.split("/").pop()).slice(0, 2).map((d) => img(DISHES[d].image, DISHES[d].name)).join("")}
        </div>
        <p class="lead">${esc(L(c.summary))}</p>

        <section class="detail">
          <h2>${esc(t("class.about"))}</h2>
          <ul class="about">
            <li>${icon("cancel")}<div><b>${esc(t("class.cancelTitle"))}</b><span>${esc(t("class.cancelText"))}</span></div></li>
            <li>${icon("wallet")}<div><b>${esc(t("class.payTitle"))}</b><span>${esc(t("class.payText"))}</span></div></li>
            <li>${icon("clock")}<div><b>${esc(fill(t("class.durTitle"), { d: L(c.duration) }))}</b><span>${esc(t("class.durText"))}: ${c.schedule.times.join(", ")}</span></div></li>
            <li>${icon("chat")}<div><b>${esc(t("class.langTitle"))}</b><span>${esc(t("class.langText"))}</span></div></li>
            <li>${icon("users")}<div><b>${esc(t("class.groupTitle"))}</b><span>${esc(fill(t("class.groupText"), { n: c.schedule.capacity }))}</span></div></li>
          </ul>
        </section>

        <section class="detail">
          <h2>${esc(t("class.highlights"))}</h2>
          ${list(L(c.highlights), "bullets")}
        </section>

        <section class="detail">
          <h2>${esc(t("class.fullDesc"))}</h2>
          ${L(c.description).map((p) => `<p>${esc(p)}</p>`).join("")}
        </section>

        <section class="detail">
          <h2>${esc(t("class.includes"))}</h2>
          ${list(L(c.includes), "ticks")}
          ${list(L(c.notIncluded), "ticks ticks--no")}
        </section>

        <section class="detail">
          <h2>${esc(t("class.itinerary"))}</h2>
          <ol class="timeline">
            ${c.itinerary.map((s) => `<li><span class="timeline__time">${esc(L(s.time))}</span><div><b>${esc(L(s.title))}</b><p>${esc(L(s.text))}</p></div></li>`).join("")}
          </ol>
        </section>

        <section class="detail">
          <h2>${esc(t("class.youCook"))}</h2>
          <div class="mini-dishes">
            ${c.dishes.map((d) => `<a class="mini-dish" href="menu.html#${d}">${img(DISHES[d].image, DISHES[d].name)}<span>${esc(DISHES[d].name)}</span></a>`).join("")}
          </div>
        </section>

        <section class="detail">
          <h2>${esc(t("class.yourIbu"))}</h2>
          <div class="teacher">${img(ibu.image, ibu.name)}<div><b>${esc(ibu.name)}</b><p>${esc(L(ibu.bio))}</p></div></div>
        </section>

        <section class="detail">
          <h2>${esc(t("class.meeting"))}</h2>
          <p>${esc(L(c.meetingPoint))}</p>
          <p><a class="text-link" href="${esc(CONTACT.mapsUrl)}" target="_blank" rel="noopener">${esc(t("class.openMap"))} ›</a></p>
        </section>

        <section class="detail">
          <h2>${esc(t("class.important"))}</h2>
          <div class="important">
            <div><h3>${esc(t("class.bring"))}</h3>${list(L(c.bring), "bullets")}</div>
            <div><h3>${esc(t("class.notAllowed"))}</h3>${list(L(c.notAllowed), "ticks ticks--no")}</div>
            <div><h3>${esc(t("class.know"))}</h3>${list(L(c.know), "bullets")}</div>
          </div>
        </section>

        <section class="detail" id="reviews">
          <h2>${esc(t("class.reviewsTitle"))}</h2>
          <p class="review-summary"><span class="big">${c.rating.toFixed(1)}</span><span><span class="rating__star">★★★★★</span><br>${esc(fill(t("class.reviews"), { n: c.reviewCount }))}</span></p>
          ${reviews.map((r) => `
            <figure class="mini-review">
              <div class="stars stars--sm" aria-label="${r.stars} / 5">${STAR.repeat(r.stars)}</div>
              <blockquote>“${esc(L(r.text))}”</blockquote>
              <figcaption>${esc(r.name)}</figcaption>
            </figure>`).join("")}
        </section>`;
      drawAvail();
      renderClassCards(more, CLASSES.filter((x) => x !== c));
    };
    renderers.push(draw);
  }

  /* ---------------- Credits ---------------- */
  function initCredits() {
    const el = document.getElementById("credits");
    renderers.push(() => {
      el.innerHTML = `<ul class="credits">${PHOTO_CREDITS.map((p) => `
        <li><a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.title)}</a> · ${esc(p.author)} · ${esc(p.license)}<br><small>${esc(p.file)}</small></li>`).join("")}</ul>`;
    });
  }

  /* ---------------- Menu ---------------- */
  function initMenu() {
    const list = document.getElementById("menu-list");
    const strip = document.getElementById("menu-strip");
    const listSection = document.getElementById("menu-section");
    const detail = document.getElementById("dish-detail");
    const firstSentence = (s) => s.split(/(?<=\.)\s/)[0];
    const classFor = (id) => CLASSES.find((c) => c.dishes.includes(id));
    const draw = () => {
      strip.innerHTML = MENU_CATEGORIES.flatMap((c) => c.dishes)
        .map((id) => `<a href="#${id}" aria-label="${esc(DISHES[id].name)}">${img(DISHES[id].image, DISHES[id].name)}</a>`).join("");
      let n = 0;
      list.innerHTML = MENU_CATEGORIES.map((cat, ci) => `
        <section class="section ${ci % 2 ? "section--cream" : "section--pink"} menu-cat">
          <div class="wrap">
            <p class="eyebrow"><span>0${ci + 1}</span>${esc(L(cat.name))}</p>
            ${cat.dishes.map((id) => {
              const d = DISHES[id], cls = classFor(id);
              return `
              <article class="dish-row${n++ % 2 ? " is-flip" : ""}">
                <a class="dish-row__img" href="#${id}" tabindex="-1">${img(d.image, d.name)}</a>
                <div class="dish-row__text">
                  <h3><a href="#${id}">${esc(d.name)}</a></h3>
                  <p>${esc(firstSentence(L(d.story)))}</p>
                  ${cls ? `<p class="dish-row__class">${esc(t("menu.cookedIn"))} <a href="class.html?id=${cls.id}">${esc(L(cls.short))}</a></p>` : ""}
                  <a class="more-link" href="#${id}">${esc(t("menu.readStory"))} <span aria-hidden="true">→</span></a>
                </div>
              </article>`;
            }).join("")}
          </div>
        </section>`).join("");
      showDish();
    };
    function showDish() {
      const id = location.hash.slice(1);
      const d = DISHES[id];
      if (!d) { detail.classList.remove("is-open"); listSection.hidden = false; return; }
      const cls = classFor(id);
      detail.innerHTML = `
        <div class="wrap">
          <a class="crumb" href="#menu">‹ ${esc(t("menu.back"))}</a>
          <div class="dish-detail__grid">
            ${img(d.image, d.name, "dish-detail__img")}
            <div>
              <h1 class="script-title">${esc(d.name)}</h1>
              <p class="dish-detail__story">${esc(L(d.story))}</p>
              <div class="dish-detail__box">
                <p class="eyebrow eyebrow--sm">${esc(t("menu.whatGoesIn"))}</p>
                <p>${esc(L(d.ingredients))}</p>
              </div>
              ${cls ? `
              <div class="dish-detail__cta">
                <div><span class="muted">${esc(t("menu.cookedIn"))}</span><b>${esc(L(cls.short))}</b><span class="muted">${esc(t("class.from"))} ${money(cls.price)} · ${esc(L(cls.duration))}</span></div>
                <a class="btn btn--solid" href="class.html?id=${cls.id}">${esc(t("menu.cookIt"))}</a>
              </div>` : ""}
            </div>
          </div>
        </div>`;
      listSection.hidden = true;
      detail.classList.add("is-open");
      window.scrollTo({ top: 0 });
    }
    window.addEventListener("hashchange", showDish);
    renderers.push(draw);
  }

  /* ---------------- Passport state ---------------- */
  const STAMP_COLORS = ["#366baa", "#c2185b", "#2e7d32", "#6a1b9a", "#e65100", "#00838f"];
  function stampDefs() {
    return [
      ...LANDMARKS.map((l) => ({ id: l.id, label: L(l.name) })),
      { id: "cooked", label: t("passport.cooked") },
      { id: "photo", label: t("passport.photoStamp") }
    ];
  }
  function loadPass() {
    try { return Object.assign({ name: "", stamps: {}, photos: [] }, JSON.parse(localStorage.getItem(PASS_KEY) || "{}")); }
    catch (e) { return { name: "", stamps: {}, photos: [] }; }
  }
  function savePass(p) {
    try { localStorage.setItem(PASS_KEY, JSON.stringify(p)); return true; }
    catch (e) { return false; }
  }
  function stampOn(id) {
    const p = loadPass();
    if (!p.stamps[id]) { p.stamps[id] = new Date().toISOString().slice(0, 10); savePass(p); }
  }
  function readPhoto(file) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => {
        const im = new Image();
        im.onload = () => {
          const max = 700, s = Math.min(1, max / Math.max(im.width, im.height));
          const c = document.createElement("canvas");
          c.width = Math.round(im.width * s); c.height = Math.round(im.height * s);
          c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
          res(c.toDataURL("image/jpeg", 0.78));
        };
        im.onerror = rej; im.src = r.result;
      };
      r.onerror = rej; r.readAsDataURL(file);
    });
  }
  function addPhotoFlow(after) {
    const input = document.createElement("input");
    input.type = "file"; input.accept = "image/*";
    input.onchange = async () => {
      if (!input.files[0]) return;
      const data = await readPhoto(input.files[0]);
      const p = loadPass();
      p.photos = [...p.photos, data].slice(-3);
      p.stamps.photo = p.stamps.photo || new Date().toISOString().slice(0, 10);
      if (!savePass(p)) { p.photos = p.photos.slice(-1); savePass(p); }
      after && after();
    };
    input.click();
  }

  /* ---------------- Map ---------------- */
  function initMap() {
    const box = document.getElementById("map-box");
    const list = document.getElementById("landmark-list");
    const guests = document.getElementById("guest-grid");
    const modal = document.getElementById("landmark-modal");
    const PIN = '<svg viewBox="0 0 38 50" aria-hidden="true"><path class="pin" fill="#111" d="M19 0C8.5 0 0 8.3 0 18.6 0 32.5 19 50 19 50s19-17.5 19-31.4C38 8.3 29.5 0 19 0z"/><circle cx="19" cy="18" r="7" fill="#fff"/></svg>';
    const draw = () => {
      const p = loadPass();
      box.querySelectorAll(".marker").forEach((m) => m.remove());
      LANDMARKS.forEach((l) => {
        const b = document.createElement("button");
        b.className = "marker" + (p.stamps[l.id] ? " is-stamped" : "");
        b.style.left = l.x + "%"; b.style.top = l.y + "%";
        b.setAttribute("aria-label", L(l.name));
        b.innerHTML = PIN + `<span class="marker__label">${esc(L(l.name))}</span>`;
        b.addEventListener("click", () => openLandmark(l));
        box.appendChild(b);
      });
      list.innerHTML = LANDMARKS.map((l) => `
        <article class="landmark" id="${l.id}">
          <h3>${esc(L(l.name))}</h3>
          <div class="landmark__row">
            ${img(l.image, L(l.name))}
            <div>${L(l.text).map((x) => `<p>${esc(x)}</p>`).join("")}
              <button class="btn btn--solid" type="button" data-stamp="${l.id}">${esc(p.stamps[l.id] ? t("map.collected") : t("map.collect"))}</button>
            </div>
          </div>
        </article>`).join("");
      list.querySelectorAll("[data-stamp]").forEach((b) => b.addEventListener("click", () => { stampOn(b.dataset.stamp); draw(); }));
      const own = loadPass().photos;
      guests.innerHTML = [...GUEST_PHOTOS.map((s) => img(s, t("map.guests"))), ...own.map((s) => `<img src="${s}" alt="">`)].join("") +
        `<button class="add-box" type="button" id="add-photo"><span>${esc(t("map.addYours"))}</span><span class="plus">+</span></button>`;
      guests.querySelector("#add-photo").addEventListener("click", () => addPhotoFlow(draw));
    };
    function openLandmark(l) {
      const p = loadPass();
      modal.innerHTML = `<div class="modal__inner">
          <button class="modal__close" type="button" aria-label="Close">×</button>
          ${img(l.image, L(l.name))}
          <h3>${esc(L(l.name))}</h3>
          <p>${esc(L(l.text)[0])}</p>
          <div class="modal__actions">
            <button class="btn btn--solid" type="button" data-act="stamp">${esc(p.stamps[l.id] ? t("map.collected") : t("map.collect"))}</button>
            <a class="btn" href="#${l.id}" data-act="more">${lang === "id" ? "Baca selengkapnya" : "Read more"}</a>
          </div></div>`;
      modal.querySelector(".modal__close").onclick = () => modal.close();
      modal.querySelector('[data-act="stamp"]').onclick = () => { stampOn(l.id); modal.close(); draw(); };
      modal.querySelector('[data-act="more"]').onclick = () => {
        modal.close();
        const el = document.getElementById(l.id);
        setTimeout(() => { el.classList.remove("is-flash"); void el.offsetWidth; el.classList.add("is-flash"); }, 300);
      };
      modal.showModal();
    }
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });
    renderers.push(draw);
  }

  /* ---------------- Passport page ---------------- */
  function initPassport() {
    const book = document.getElementById("passport");
    const draw = () => {
      const p = loadPass();
      const defs = stampDefs();
      const n = defs.filter((d) => p.stamps[d.id]).length;
      book.innerHTML = `
        <div class="passport__left">
          <label class="name" for="pp-name">${esc(t("passport.holder"))}</label>
          <input class="name" id="pp-name" maxlength="40" value="${esc(p.name)}" placeholder="${esc(t("passport.namePh"))}">
          <div class="photos">
            ${p.photos.map((s, i) => `<div class="photo-frame"><img src="${s}" alt=""><button class="remove" type="button" data-rm="${i}" aria-label="Remove">×</button></div>`).join("")}
            ${p.photos.length === 0 ? `<button class="add-box" type="button" id="pp-add"><span>${esc(t("passport.addPhoto"))}</span><span class="plus">+</span></button>` : ""}
          </div>
        </div>
        <div class="passport__right">
          <h2 class="stamps-title">${esc(t("passport.stamps"))}</h2>
          <p class="progress">${esc(t("passport.progress").replace("{n}", n).replace("{t}", defs.length))}</p>
          <div class="stamp-grid">
            ${defs.map((d, i) => p.stamps[d.id]
              ? `<div class="stamp is-on" style="--c:${STAMP_COLORS[i % STAMP_COLORS.length]};--r:${(i % 2 ? 7 : -9) + i}deg"><span>${esc(d.label)}<small>${esc(p.stamps[d.id])}</small></span></div>`
              : `<div class="stamp"><span>${esc(d.label)}</span></div>`).join("")}
          </div>
          ${p.stamps.cooked ? "" : `<button class="btn cook-btn" type="button" id="pp-cooked">${esc(t("passport.cookedBtn"))}</button>`}
        </div>`;
      book.querySelector("#pp-name").addEventListener("input", (e) => { const q = loadPass(); q.name = e.target.value; savePass(q); });
      book.querySelectorAll("[data-rm]").forEach((b) => b.addEventListener("click", () => { const q = loadPass(); q.photos.splice(+b.dataset.rm, 1); savePass(q); draw(); }));
      const add = book.querySelector("#pp-add"); if (add) add.addEventListener("click", () => addPhotoFlow(draw));
      const ck = book.querySelector("#pp-cooked"); if (ck) ck.addEventListener("click", () => { stampOn("cooked"); draw(); });
      document.getElementById("pp-more").hidden = p.photos.length === 0 || p.photos.length >= 3;
    };
    document.getElementById("pp-more").addEventListener("click", () => addPhotoFlow(draw));
    document.getElementById("pp-download").addEventListener("click", (e) => { e.preventDefault(); downloadPassport(); });
    document.getElementById("pp-reset").addEventListener("click", () => {
      if (confirm(t("passport.resetConfirm"))) { try { localStorage.removeItem(PASS_KEY); } catch (e) {} draw(); }
    });
    renderers.push(draw);
  }

  async function downloadPassport() {
    await document.fonts.ready;
    const p = loadPass();
    const defs = stampDefs();
    const W = 1600, H = 1000;
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const g = c.getContext("2d");
    g.fillStyle = "#f8e1e6"; g.fillRect(0, 0, W, H);
    g.fillStyle = "#366baa"; g.textAlign = "center";
    g.font = '700 96px "Dancing Script", cursive'; g.fillText(t("passport.title"), W / 2, 110);
    // book
    const bx = 80, by = 150, bw = W - 160, bh = 780;
    g.fillStyle = "#efe9de"; roundRect(g, bx, by, bw, bh, 22); g.fill();
    g.lineWidth = 4; g.strokeStyle = "#1d2a3d"; g.stroke();
    const grad = g.createLinearGradient(W / 2 - 40, 0, W / 2 + 40, 0);
    grad.addColorStop(0, "rgba(0,0,0,0)"); grad.addColorStop(.5, "rgba(0,0,0,.12)"); grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad; g.fillRect(W / 2 - 40, by, 80, bh);
    // left: name + photos
    g.textAlign = "left"; g.fillStyle = "#5b5b5b"; g.font = '600 20px "Josefin Sans", sans-serif';
    g.fillText(t("passport.holder").toUpperCase(), bx + 50, by + 60);
    g.fillStyle = "#366baa"; g.font = '600 64px "Dancing Script", cursive';
    g.fillText(p.name || "—", bx + 50, by + 135);
    g.strokeStyle = "#9a917f"; g.lineWidth = 2; g.beginPath(); g.moveTo(bx + 50, by + 150); g.lineTo(W / 2 - 60, by + 150); g.stroke();
    const imgs = await Promise.all(p.photos.map((s) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.onerror = () => r(null); i.src = s; })));
    const spots = [[bx + 70, by + 200, -6], [bx + 300, by + 360, 5], [bx + 110, by + 470, -2]];
    imgs.filter(Boolean).forEach((im, i) => {
      const [x, y, rot] = spots[i]; const w = 360, h = 270;
      g.save(); g.translate(x + w / 2, y + h / 2); g.rotate(rot * Math.PI / 180);
      g.shadowColor = "rgba(0,0,0,.3)"; g.shadowBlur = 14; g.fillStyle = "#fff"; g.fillRect(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24);
      g.shadowBlur = 0; g.strokeStyle = "#c62828"; g.lineWidth = 5; g.setLineDash([14, 10]); g.strokeRect(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24); g.setLineDash([]);
      const s = Math.max(w / im.width, h / im.height); const sw = w / s, sh = h / s;
      g.drawImage(im, (im.width - sw) / 2, (im.height - sh) / 2, sw, sh, -w / 2, -h / 2, w, h);
      g.restore();
    });
    // right: stamps
    const rx = W / 2 + 60;
    g.fillStyle = "#1d2a3d"; g.font = '600 36px "Josefin Sans", sans-serif'; g.fillText(t("passport.stamps"), rx, by + 70);
    const r = 92, cols = 3, gapX = (bw / 2 - 120) / cols;
    defs.forEach((d, i) => {
      const cx = rx + gapX * (i % cols) + gapX / 2 - 10, cy = by + 210 + Math.floor(i / cols) * 250;
      const on = p.stamps[d.id];
      g.save(); g.translate(cx, cy); if (on) g.rotate(((i % 2 ? 7 : -9) + i) * Math.PI / 180);
      g.strokeStyle = on ? STAMP_COLORS[i % STAMP_COLORS.length] : "#b8ae9b"; g.fillStyle = g.strokeStyle;
      g.lineWidth = on ? 5 : 3; if (!on) g.setLineDash([10, 8]);
      g.beginPath(); g.arc(0, 0, r, 0, Math.PI * 2); g.stroke();
      if (on) { g.lineWidth = 2; g.beginPath(); g.arc(0, 0, r - 10, 0, Math.PI * 2); g.stroke(); }
      g.setLineDash([]); g.textAlign = "center"; g.font = '700 19px "Josefin Sans", sans-serif';
      wrapText(g, d.label.toUpperCase(), 0, on ? -6 : 6, r * 1.5, 22);
      if (on) { g.font = '16px "Josefin Sans", sans-serif'; g.fillText(on, 0, 44); }
      g.restore();
    });
    g.textAlign = "center"; g.fillStyle = "#366baa"; g.font = '20px "Josefin Sans", sans-serif';
    g.fillText("From Pengudang, With love · Bintan, Indonesia", W / 2, H - 28);
    const a = document.createElement("a");
    a.download = "my-pengudang-passport.png";
    a.href = c.toDataURL("image/png");
    a.click();
  }
  function roundRect(g, x, y, w, h, r) {
    g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
  }
  function wrapText(g, text, x, y, maxW, lh) {
    const words = text.split(" "); const lines = []; let line = "";
    words.forEach((w) => { const test = line ? line + " " + w : w; if (g.measureText(test).width > maxW && line) { lines.push(line); line = w; } else line = test; });
    lines.push(line);
    lines.forEach((l, i) => g.fillText(l, x, y + (i - (lines.length - 1) / 2) * lh));
  }

  /* ---------------- Boot ---------------- */
  buildNav();
  if (page === "home") initHome();
  if (page === "classes") initClasses();
  if (page === "menu") initMenu();
  if (page === "map") initMap();
  if (page === "passport") initPassport();
  if (page === "class") initClass();
  if (page === "credits") initCredits();
  if (page === "contact") initContact();
  applyLang();
})();
