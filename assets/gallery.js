/* Greg Leigh site — featured listing galleries + lightbox.
Thumbnails drive an inline hero swap; expand / play / thumb opens a fullscreen lightbox.
Video items support local mp4 files and YouTube links (rendered as an embed). */
(function () {
"use strict";

// ---- Collect media per feature (keyed by the .feature element id) ----
var registry = {}; // id -> [{type,src,poster,label}]
document.querySelectorAll("[data-thumbs]").forEach(function (row) {
var id = row.getAttribute("data-thumbs");
var items = [];
row.querySelectorAll(".thumb").forEach(function (btn) {
var tag = btn.querySelector(".thumb__tag");
items.push({
type: btn.getAttribute("data-type"),
src: btn.getAttribute("data-src"),
poster: btn.getAttribute("data-poster") || "",
label: tag ? tag.textContent.trim() : (btn.getAttribute("data-type") === "video" ? "Video tour" : "Photo")
});
});
registry[id] = items;
});

function featureOf(el) {
var f = el.closest(".feature");
return f ? f.id : null;
}
function firstVideoIndex(items) {
for (var i = 0; i < items.length; i++) if (items[i].type === "video") return i;
return 0;
}
function firstImageIndex(items) {
for (var i = 0; i < items.length; i++) if (items[i].type === "image") return i;
return 0;
}
function youtubeId(src) {
var m = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/.exec(src || "");
return m ? m[1] : null;
}

// ---- Inline hero swap when clicking an image thumbnail ----
document.querySelectorAll("[data-thumbs]").forEach(function (row) {
var id = row.getAttribute("data-thumbs");
var stage = document.querySelector('.feature__stage[data-feature="' + id + '"]');
var hero = stage ? stage.querySelector(".feature__hero") : null;
if (stage && hero && stage.dataset.active == null) stage.dataset.active = String(firstImageIndex(registry[id]));
row.querySelectorAll(".thumb").forEach(function (btn, idx) {
btn.addEventListener("click", function () {
var item = registry[id][idx];
if (item.type === "video") { openLightbox(id, idx); return; }
if (hero) { hero.src = item.src; }
if (stage) stage.dataset.active = String(idx);
row.querySelectorAll(".thumb").forEach(function (t) { t.classList.remove("is-active"); });
btn.classList.add("is-active");
});
});
});

// ---- Triggers that open the lightbox ----
document.addEventListener("click", function (e) {
var expand = e.target.closest(".feature__expand");
var hero = e.target.closest(".feature__hero");
var pill = e.target.closest("[data-play]");
var playFor = e.target.closest("[data-play-for]");

if (playFor) {
var pid = playFor.getAttribute("data-play-for");
if (registry[pid]) openLightbox(pid, firstVideoIndex(registry[pid]));
return;
}
if (pill) {
var id1 = featureOf(pill);
if (id1 && registry[id1]) openLightbox(id1, firstVideoIndex(registry[id1]));
return;
}
if (expand || hero) {
var stage = (expand || hero).closest(".feature__stage");
var id2 = stage ? stage.getAttribute("data-feature") : featureOf(expand || hero);
if (id2 && registry[id2]) openLightbox(id2, parseInt(stage && stage.dataset.active || firstImageIndex(registry[id2]), 10));
return;
}
});

// ---- Lightbox ----
var lb = document.getElementById("lightbox");
if (!lb) return;
var lbStage = document.getElementById("lb-stage");
var lbCap = document.getElementById("lb-caption");
var current = { items: [], i: 0 };

function render() {
var item = current.items[current.i];
if (!item) return;
lbStage.innerHTML = "";
var node;
if (item.type === "video") {
var yt = youtubeId(item.src);
if (yt) {
node = document.createElement("iframe");
node.src = "https://www.youtube-nocookie.com/embed/" + yt + "?autoplay=1&rel=0&modestbranding=1";
node.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
node.setAttribute("allowfullscreen", "");
node.setAttribute("frameborder", "0");
node.setAttribute("title", "Video tour");
node.style.width = "min(92vw, 1100px)";
node.style.height = "min(51.75vw, 619px)";
node.style.border = "0";
node.style.background = "#000";
} else {
node = document.createElement("video");
node.src = item.src;
node.controls = true;
node.autoplay = true;
node.playsInline = true;
node.setAttribute("playsinline", "");
if (item.poster) node.poster = item.poster;
}
} else {
node = document.createElement("img");
node.src = item.src;
node.alt = item.label || "";
}
lbStage.appendChild(node);
var label = item.type === "video" ? "Video tour" : (item.label && item.label !== "Photo" ? item.label : "Photo");
lbCap.innerHTML = label + ' <span class="count">' + (current.i + 1) + " / " + current.items.length + "</span>";
}
function stopVideo() {
var v = lbStage.querySelector("video");
if (v) { try { v.pause(); } catch (e) {} }
var f = lbStage.querySelector("iframe");
if (f) { f.src = "about:blank"; }
}
function openLightbox(id, index) {
current.items = registry[id] || [];
if (!current.items.length) return;
current.i = Math.max(0, Math.min(index || 0, current.items.length - 1));
lb.classList.add("is-open");
lb.setAttribute("aria-hidden", "false");
document.body.style.overflow = "hidden";
render();
}
function close() {
stopVideo();
lb.classList.remove("is-open");
lb.setAttribute("aria-hidden", "true");
document.body.style.overflow = "";
lbStage.innerHTML = "";
}
function go(step) {
stopVideo();
current.i = (current.i + step + current.items.length) % current.items.length;
render();
}

document.getElementById("lb-close").addEventListener("click", close);
document.getElementById("lb-prev").addEventListener("click", function () { go(-1); });
document.getElementById("lb-next").addEventListener("click", function () { go(1); });
lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
document.addEventListener("keydown", function (e) {
if (!lb.classList.contains("is-open")) return;
if (e.key === "Escape") close();
else if (e.key === "ArrowLeft") go(-1);
else if (e.key === "ArrowRight") go(1);
});

// expose for inline handlers above
window.__glOpen = openLightbox;
})();
