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

  /* ----- Fiona's Profile Song: official YouTube embed, no autoplay, click to play ----- */
  var songId = (cfg.songYoutubeId || "").replace(/[^A-Za-z0-9_-]/g, "");
  var songTitle = cfg.songTitle || "My Heart Will Go On";
  var songArtist = cfg.songArtist || "Celine Dion";
  var songLabel = document.getElementById("song-label");
  if (songLabel) songLabel.textContent = songTitle + " — " + songArtist;
  var playBtn = document.getElementById("song-play");
  var stage = document.getElementById("song-stage");
  if (playBtn && stage && songId) {
    playBtn.addEventListener("click", function () {
      if (stage.classList.contains("is-on")) return;
      var iframe = document.createElement("iframe");
      iframe.src =
        "https://www.youtube-nocookie.com/embed/" +
        songId +
        "?autoplay=1&rel=0&modestbranding=1";
      iframe.title = songTitle + " — " + songArtist + " (official YouTube embed)";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      stage.classList.add("is-on");
      stage.appendChild(iframe);
    });
  }

  /* ----- guestbook (local only) ----- */
  var SEED = [
    { name: "WebSurfer98", msg: "gone but not forgotten. you were a real one, Fiona. i will bookmark this memorial.", date: "Nov 19, 2026" },
    { name: "xX_hat_lord_Xx", msg: "ate the hat, couldn't help myself. rest easy. the beanie looked perfect.", date: "Nov 19, 2026" },
    { name: "Millie Longscarf", msg: "saving you a seat at the end of my scarf. love you, pal.", date: "Nov 19, 2026" }
  ];
  var gbList = document.getElementById("gb-list");
  var gbForm = document.getElementById("gb-form");
  var entries = [];
  try {
    entries = JSON.parse(localStorage.getItem("fiona-memorial-guestbook") || "null") || SEED.slice();
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
      try { localStorage.setItem("fiona-memorial-guestbook", JSON.stringify(entries)); } catch (e) {}
      document.getElementById("gb-msg").value = "";
      renderGb();
    });
  }

  /* ----- official X embeds: load widgets.js only when the wall is near ----- */
  var tweetWall = document.getElementById("fiona-posts") || document.getElementById("tweet-wall");
  if (tweetWall) {
    var tweetsLoaded = false;
    var loadTweets = function () {
      if (tweetsLoaded) return;
      tweetsLoaded = true;
      var s = document.createElement("script");
      s.src = "https://platform.twitter.com/widgets.js";
      s.async = true;
      s.charset = "utf-8";
      document.body.appendChild(s);
    };
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            loadTweets();
            io.disconnect();
          }
        });
      }, { rootMargin: "500px 0px" });
      io.observe(tweetWall);
    } else {
      loadTweets();
    }
  }

  /* ----- photo album lightbox ----- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var lbCap = document.getElementById("lb-caption");
  var lbCredit = document.getElementById("lb-credit");
  var lbClose = document.getElementById("lb-close");
  var lbLastFocus = null;

  function openLightbox(btn) {
    if (!lb || !lbImg) return;
    var fig = btn.closest("figure");
    var thumb = btn.querySelector("img");
    var full = btn.getAttribute("data-full") || (thumb && thumb.getAttribute("src"));
    if (!full) return;
    lbImg.src = full;
    lbImg.alt = (thumb && thumb.alt) || "";
    if (lbCap) {
      var cap = fig && fig.querySelector("figcaption");
      lbCap.textContent = cap ? cap.textContent : "";
    }
    if (lbCredit) {
      lbCredit.textContent = "";
      var cred = fig && fig.querySelector(".photo-credit");
      if (cred) {
        Array.prototype.forEach.call(cred.childNodes, function (n) {
          lbCredit.appendChild(n.cloneNode(true));
        });
      }
    }
    lbLastFocus = document.activeElement;
    lb.hidden = false;
    document.body.classList.add("lb-open");
    if (lbClose) lbClose.focus();
  }

  function closeLightbox() {
    if (!lb || lb.hidden) return;
    lb.hidden = true;
    document.body.classList.remove("lb-open");
    if (lbImg) {
      lbImg.removeAttribute("src");
      lbImg.alt = "";
    }
    if (lbLastFocus && typeof lbLastFocus.focus === "function") {
      try { lbLastFocus.focus(); } catch (e) {}
    }
  }

  document.querySelectorAll(".album-open").forEach(function (btn) {
    btn.addEventListener("click", function () { openLightbox(btn); });
  });
  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lbImg) lbImg.addEventListener("click", closeLightbox);
  if (lb) {
    lb.addEventListener("click", function (ev) {
      if (ev.target === lb) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "Escape") closeLightbox();
  });

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
