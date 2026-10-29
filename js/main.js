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

  const renderers = [];
  function applyLang() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
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
      ["passport.html", "nav.passport", "passport"]
    ];
    header.className = "nav" + (header.dataset.theme === "blue" ? " nav--blue" : "");
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
      footer.innerHTML = `<span class="script">From Pengudang, With love</span><span data-i18n="footer.made"></span>`;
    }
  }

  /* ---------------- Shared pieces ---------------- */
  const STAR = '<svg viewBox="0 0 64 61" aria-hidden="true"><path d="M32 0L39.5542 23.2999H64L44.2229 37.7001L51.7771 61L32 46.5999L12.2229 61L19.7771 37.7001L0 23.2999H24.4458L32 0Z"/></svg>';

  function dishLinks(ids) {
    return ids.map((id) => `<a href="menu.html#${id}">${esc(DISHES[id].name)}</a>`).join(", ");
  }

  function renderClassCards(el, compact) {
    el.innerHTML = CLASSES.map((c) => `
      <article class="class-card" id="class-${c.id}">
        ${img(c.image, L(c.name), "class-card__img")}
        <div class="class-card__body">
          <h3>${esc(L(c.name))}</h3>
          <div class="meta"><span>⏱ ${esc(L(c.duration))}</span><span>${esc(L(c.price))}</span></div>
          <p>${esc(L(c.desc))}</p>
          <p class="dishes">${esc(t("classes.youCook"))} ${dishLinks(c.dishes)}</p>
          <a class="btn btn--solid" href="${compact ? "classes.html" : ""}?class=${c.id}#book">${esc(t("classes.book"))}</a>
        </div>
      </article>`).join("");
    if (!compact) {
      el.querySelectorAll("a.btn").forEach((a) => a.addEventListener("click", (e) => {
        e.preventDefault();
        const id = new URL(a.href).searchParams.get("class");
        const sel = document.querySelector("#booking-class");
        if (sel) sel.value = id;
        document.getElementById("book").scrollIntoView({ behavior: "smooth" });
      }));
    }
  }

  /* ---------------- Booking form ---------------- */
  function initBooking() {
    const host = document.querySelector("[data-booking]");
    if (!host) return;
    const preset = new URLSearchParams(location.search).get("class") || "";
    const today = new Date().toISOString().slice(0, 10);
    const draw = () => {
      const keep = {};
      host.querySelectorAll("input, select, textarea").forEach((f) => (keep[f.name] = f.value));
      host.innerHTML = `
        <form class="form-card" novalidate>
          <h3>${esc(t("form.title"))}</h3>
          <div class="form-grid">
            <label class="field"><span>${esc(t("form.name"))}</span><input name="name" required autocomplete="name"></label>
            <label class="field"><span>${esc(t("form.pax"))}</span><input name="pax" type="number" min="1" max="30" required inputmode="numeric"></label>
            <label class="field"><span>${esc(t("form.email"))}</span><input name="email" type="email" required autocomplete="email"></label>
            <label class="field"><span>${esc(t("form.phone"))}</span><input name="phone" type="tel" autocomplete="tel"></label>
            <label class="field"><span>${esc(t("form.class"))}</span>
              <select name="class" id="booking-class">
                <option value="">${esc(t("form.anyClass"))}</option>
                ${CLASSES.map((c) => `<option value="${c.id}">${esc(L(c.name))}</option>`).join("")}
              </select></label>
            <label class="field"><span>${esc(t("form.date"))}</span><input name="date" type="date" min="${today}"></label>
            <label class="field full"><span>${esc(t("form.notes"))}</span><textarea name="notes"></textarea></label>
          </div>
          <button class="submit" type="submit">${esc(t("form.submit"))}</button>
          <p class="form-msg" role="status"></p>
        </form>`;
      host.querySelectorAll("input, select, textarea").forEach((f) => {
        if (keep[f.name] !== undefined) f.value = keep[f.name];
        else if (f.name === "class") f.value = preset;
      });
      host.querySelector("form").addEventListener("submit", onSubmit);
    };
    function onSubmit(e) {
      e.preventDefault();
      const form = e.currentTarget;
      const msg = form.querySelector(".form-msg");
      const bad = [...form.querySelectorAll("[required]")].find((f) => !f.checkValidity());
      if (bad) { bad.focus(); bad.reportValidity(); return; }
      const d = Object.fromEntries(new FormData(form));
      const cls = CLASSES.find((c) => c.id === d.class);
      const lines = [
        t("form.msgIntro"), "",
        `${t("form.name")}: ${d.name}`,
        `${t("form.pax")}: ${d.pax}`,
        `${t("form.email")}: ${d.email}`,
        d.phone && `${t("form.phone").replace(/ \(.*\)/, "")}: ${d.phone}`,
        `${t("form.class")}: ${cls ? L(cls.name) : t("form.anyClass")}`,
        d.date && `${t("form.date")}: ${d.date}`,
        d.notes && `${t("form.notes").replace(/\?.*$/, "?")} ${d.notes}`
      ].filter(Boolean).join("\n");
      let url = "";
      if (CONTACT.whatsapp) url = `https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(lines)}`;
      else if (CONTACT.email) url = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Pengudang cooking class")}&body=${encodeURIComponent(lines)}`;
      if (url) {
        msg.textContent = t("form.sent");
        window.open(url, "_blank", "noopener");
      } else {
        msg.textContent = t("form.noContact");
      }
    }
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
      renderClassCards(classes, true);
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
        ${REVIEWS.length > 1 ? `<div class="carousel__dots">${REVIEWS.map((_, i) => `<button type="button" aria-label="Review ${i + 1}" aria-pressed="${i === current}" data-i="${i}"></button>`).join("")}</div>` : ""}`;
      reviews.querySelectorAll(".carousel__dots button").forEach((b) => b.addEventListener("click", () => { current = +b.dataset.i; drawReview(); }));
    }
    if (REVIEWS.length > 1) setInterval(() => { if (!reviews.matches(":hover")) { current = (current + 1) % REVIEWS.length; drawReview(); } }, 8000);
  }

  /* ---------------- Classes ---------------- */
  function initClasses() {
    const grid = document.getElementById("class-list");
    renderers.push(() => renderClassCards(grid, false));
  }

  /* ---------------- Menu ---------------- */
  function initMenu() {
    const list = document.getElementById("menu-list");
    const listSection = document.getElementById("menu-section");
    const detail = document.getElementById("dish-detail");
    const draw = () => {
      list.innerHTML = MENU_CATEGORIES.map((cat) => `
        <div class="menu-cat">
          <h2>${esc(L(cat.name))}</h2>
          <div class="dish-grid${cat.dishes.length === 1 ? " dish-grid--single" : ""}">
            ${cat.dishes.map((id) => `<a class="dish" href="#${id}">${img(DISHES[id].image, DISHES[id].name)}<span>${esc(DISHES[id].name)}</span></a>`).join("")}
          </div>
        </div>`).join("");
      showDish();
    };
    function showDish() {
      const id = location.hash.slice(1);
      const d = DISHES[id];
      if (!d) { detail.classList.remove("is-open"); listSection.hidden = false; return; }
      const cls = CLASSES.find((c) => c.dishes.includes(id));
      detail.innerHTML = `
        <div class="wrap">
          <h1 class="script-title">${esc(d.name)}</h1>
          <p class="dish-detail__story">${esc(L(d.story))}</p>
          <div class="dish-detail__row">
            ${img(d.image, d.name)}
            <p><strong>${esc(t("menu.whatGoesIn"))}</strong> ${esc(L(d.ingredients))}</p>
          </div>
          <div class="dish-detail__actions">
            ${cls ? `<a class="btn btn--solid" href="classes.html?class=${cls.id}#book">${esc(t("menu.cookIt"))}</a>` : ""}
            <a class="btn" href="#menu">${esc(t("menu.back"))}</a>
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
    g.font = '110px "Allison", cursive'; g.fillText(t("passport.title"), W / 2, 110);
    // book
    const bx = 80, by = 150, bw = W - 160, bh = 780;
    g.fillStyle = "#efe9de"; roundRect(g, bx, by, bw, bh, 22); g.fill();
    g.lineWidth = 4; g.strokeStyle = "#1d2a3d"; g.stroke();
    const grad = g.createLinearGradient(W / 2 - 40, 0, W / 2 + 40, 0);
    grad.addColorStop(0, "rgba(0,0,0,0)"); grad.addColorStop(.5, "rgba(0,0,0,.12)"); grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad; g.fillRect(W / 2 - 40, by, 80, bh);
    // left: name + photos
    g.textAlign = "left"; g.fillStyle = "#5b5b5b"; g.font = '600 20px "Arimo", sans-serif';
    g.fillText(t("passport.holder").toUpperCase(), bx + 50, by + 60);
    g.fillStyle = "#366baa"; g.font = '78px "Allison", cursive';
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
    g.fillStyle = "#1d2a3d"; g.font = '600 40px "Cormorant Garamond", serif'; g.fillText(t("passport.stamps"), rx, by + 70);
    const r = 92, cols = 3, gapX = (bw / 2 - 120) / cols;
    defs.forEach((d, i) => {
      const cx = rx + gapX * (i % cols) + gapX / 2 - 10, cy = by + 210 + Math.floor(i / cols) * 250;
      const on = p.stamps[d.id];
      g.save(); g.translate(cx, cy); if (on) g.rotate(((i % 2 ? 7 : -9) + i) * Math.PI / 180);
      g.strokeStyle = on ? STAMP_COLORS[i % STAMP_COLORS.length] : "#b8ae9b"; g.fillStyle = g.strokeStyle;
      g.lineWidth = on ? 5 : 3; if (!on) g.setLineDash([10, 8]);
      g.beginPath(); g.arc(0, 0, r, 0, Math.PI * 2); g.stroke();
      if (on) { g.lineWidth = 2; g.beginPath(); g.arc(0, 0, r - 10, 0, Math.PI * 2); g.stroke(); }
      g.setLineDash([]); g.textAlign = "center"; g.font = '700 19px "Arimo", sans-serif';
      wrapText(g, d.label.toUpperCase(), 0, on ? -6 : 6, r * 1.5, 22);
      if (on) { g.font = '16px "Arimo", sans-serif'; g.fillText(on, 0, 44); }
      g.restore();
    });
    g.textAlign = "center"; g.fillStyle = "#366baa"; g.font = '20px "Arimo", sans-serif';
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
  initBooking();
  if (page === "home") initHome();
  if (page === "classes") initClasses();
  if (page === "menu") initMenu();
  if (page === "map") initMap();
  if (page === "passport") initPassport();
  applyLang();
})();
