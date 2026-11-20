/* $FIONA homepage behavior. Reads window.FIONA_CONFIG from config.js. */
(function () {
  "use strict";

  var cfg = window.FIONA_CONFIG || {};
  var ca = cfg.ca || "";
  var buyUrl = cfg.buyUrl || "#";
  var socials = cfg.socials || {};

  /* ----- wire buy links, CA, chart ----- */
  document.querySelectorAll(".js-buy").forEach(function (el) {
    el.href = buyUrl;
  });

  var caBox = document.getElementById("ca-text");
  if (caBox) caBox.textContent = ca;
  var footerCa = document.getElementById("footer-ca");
  if (footerCa) footerCa.textContent = "CA: " + ca;

  if (cfg.chartEmbed) {
    var iframe = document.getElementById("chart-embed");
    if (iframe) iframe.src = cfg.chartEmbed;
  }
  if (cfg.chartUrl) {
    ["chart-link", "chart-link-2"].forEach(function (id) {
      var a = document.getElementById(id);
      if (a) a.href = cfg.chartUrl;
    });
  }

  /* ----- socials: empty string => coming soon (the TODO lives in config.js) ----- */
  var navSocials = document.getElementById("nav-socials");
  if (navSocials) {
    navSocials.appendChild(socialNav("X", socials.x));
    navSocials.appendChild(sep());
    navSocials.appendChild(socialNav("Telegram", socials.telegram));
  }

  function sep() {
    var s = document.createElement("span");
    s.className = "sep";
    s.textContent = "|";
    return s;
  }

  function socialNav(label, url) {
    if (url) {
      var a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = label;
      return a;
    }
    var span = document.createElement("span");
    span.className = "soon";
    span.textContent = label + " (soon)";
    span.title = "Paste the URL in config.js when the account is live.";
    return span;
  }

  /* ----- copy CA ----- */
  var copyBtn = document.getElementById("copy-ca");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var done = function () {
        copyBtn.textContent = "Copied!!!";
        copyBtn.classList.add("copied");
        setTimeout(function () {
          copyBtn.textContent = "Copy CA to clipboard";
          copyBtn.classList.remove("copied");
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(ca).then(done).catch(legacyCopy);
      } else {
        legacyCopy();
      }
      function legacyCopy() {
        var ta = document.createElement("textarea");
        ta.value = ca;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta);
        done();
      }
    });
  }

  /* ----- hit counter (decorative; base + local visits) ----- */
  var BASE = 8124; /* a little 90s-looking starting number, not a real count */
  var visits = 1;
  try {
    visits = parseInt(localStorage.getItem("fiona-hits") || "0", 10) + 1;
    if (!isFinite(visits) || visits < 1) visits = 1;
    localStorage.setItem("fiona-hits", String(visits));
  } catch (e) {
    visits = 1;
  }
  var shown = BASE + visits;
  var digits = String(shown).padStart(6, "0").slice(-6);
  var counter = document.getElementById("hit-counter");
  if (counter) {
    counter.innerHTML = "";
    for (var i = 0; i < digits.length; i++) {
      var d = document.createElement("span");
      d.className = "digit";
      d.textContent = digits[i];
      counter.appendChild(d);
    }
  }
  var cap = document.getElementById("hit-caption");
  if (cap) cap.textContent = "You are visitor number " + shown + " (sort of)";

  /* ----- certificate ----- */
  var nameInput = document.getElementById("cert-name");
  var who = document.getElementById("cert-who");
  var dateEl = document.getElementById("cert-date");
  if (dateEl) {
    var now = new Date();
    dateEl.textContent =
      now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }
  if (nameInput && who) {
    var stored;
    try { stored = localStorage.getItem("fiona-cert-name") || ""; } catch (e) { stored = ""; }
    if (stored) {
      nameInput.value = stored;
      who.textContent = stored;
    }
    nameInput.addEventListener("input", function () {
      var v = nameInput.value.trim() || "a friend of Fiona";
      who.textContent = v;
      try { localStorage.setItem("fiona-cert-name", nameInput.value.trim()); } catch (e) {}
    });
  }
  var printBtn = document.getElementById("cert-print");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }

  /* ----- guestbook (local only) ----- */
  var SEED = [
    { name: "Fiona", msg: "the hat was delicious. no further questions.", date: "Nov 19, 2026" },
    { name: "WebSurfer98", msg: "cool site!!! i will bookmark this and tell all my AOL buddies", date: "Nov 19, 2026" },
    { name: "xX_hat_lord_Xx", msg: "dogs wear hats. hippos eat them. finally someone said it.", date: "Nov 19, 2026" }
  ];
  var gbList = document.getElementById("gb-list");
  var gbForm = document.getElementById("gb-form");
  var entries = [];
  try {
    entries = JSON.parse(localStorage.getItem("fiona-guestbook") || "null") || SEED.slice();
  } catch (e) {
    entries = SEED.slice();
  }
  renderGb();

  function renderGb() {
    if (!gbList) return;
    gbList.innerHTML = "";
    entries.forEach(function (e) {
      var div = document.createElement("div");
      div.className = "gb-entry";
      var meta = document.createElement("div");
      meta.className = "meta";
      var b = document.createElement("b");
      b.textContent = e.name;
      meta.appendChild(b);
      meta.appendChild(document.createTextNode(" wrote on " + e.date + ":"));
      var p = document.createElement("div");
      p.textContent = e.msg;
      div.appendChild(meta);
      div.appendChild(p);
      gbList.appendChild(div);
    });
    gbList.scrollTop = gbList.scrollHeight;
  }

  if (gbForm) {
    gbForm.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var name = (document.getElementById("gb-name").value || "").trim();
      var msg = (document.getElementById("gb-msg").value || "").trim();
      if (!name || !msg) return;
      var today = new Date().toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric"
      });
      entries.push({ name: name.slice(0, 32), msg: msg.slice(0, 280), date: today });
      if (entries.length > 40) entries = entries.slice(-40);
      try { localStorage.setItem("fiona-guestbook", JSON.stringify(entries)); } catch (e) {}
      document.getElementById("gb-msg").value = "";
      renderGb();
    });
  }

  /* ----- webring (decorative, 1 of 1) ----- */
  function ateTheRing() {
    alert("Fiona ate the other sites in the ring.\nYou are already home.\n(This is a decorative web ring, not a link to anyone else.)");
  }
  ["ring-prev", "ring-next", "ring-rand"].forEach(function (id) {
    var b = document.getElementById(id);
    if (b) b.addEventListener("click", ateTheRing);
  });

  /* ----- sparkle cursor trail (pointer devices only; skipped if reduced motion) ----- */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!reduce && finePointer) {
    var last = 0;
    var glyphs = ["✦", "✧", "★", "✶", "♡"];
    var colors = ["#fff45a", "#ff9ad5", "#fff", "#9cf", "#ffb6c1"];
    document.addEventListener("mousemove", function (ev) {
      var t = Date.now();
      if (t - last < 40) return;
      last = t;
      var s = document.createElement("span");
      s.className = "sparkle";
      s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      s.style.left = ev.clientX + (Math.random() * 10 - 5) + "px";
      s.style.top = ev.clientY + (Math.random() * 10 - 5) + "px";
      s.style.color = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(s);
      setTimeout(function () { s.remove(); }, 700);
    });
  }
})();
