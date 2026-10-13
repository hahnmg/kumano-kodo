import { n as e } from "./video-Dj9eFOb2.js";
//#region src/scripts/lightbox.ts
var t = {
	close: "Close",
	previous: "Previous",
	next: "Next",
	play: "Play video"
}, n = (e) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="${e}"/></svg>`, r = `<figure class="lightbox-figure"><img class="lightbox-image" alt=""><div class="lightbox-player"></div><figcaption class="lightbox-caption type-caption"><span class="lightbox-text"></span><span class="lightbox-count"></span></figcaption></figure><button class="lightbox-button lightbox-close" type="button">${n("M18 6 6 18M6 6l12 12")}</button><button class="lightbox-button lightbox-nav lightbox-nav-previous" type="button" data-step="-1">${n("M19 12H5m0 0 6-6m-6 6 6 6")}</button><button class="lightbox-button lightbox-nav lightbox-nav-next" type="button" data-step="1">${n("M5 12h14m0 0-6-6m6 6-6 6")}</button>`;
//#endregion
//#region src/entries/lightbox.ts
((n = document) => {
	let i = null, a = null, o = () => i?.isConnected ? i : (i = n.createElement("dialog"), i.className = "lightbox", i.innerHTML = r, n.body.append(i), i), s = (t) => {
		if (!a || !i) return;
		let n = a.links.length;
		a.index = (t + n) % n;
		let r = a.links[a.index], o = r.querySelector("img")?.alt ?? "", s = i.querySelector(".lightbox-image"), c = i.querySelector(".lightbox-player"), l = r.querySelector("template.video-source");
		c?.replaceChildren(), s && (s.hidden = l !== null, l || (s.src = r.href), s.alt = o), l && c && (c.append(l.content.cloneNode(!0)), e(c)), i.setAttribute("aria-label", o), i.querySelector(".lightbox-text").textContent = o, i.querySelector(".lightbox-count").textContent = n > 1 ? `${a.index + 1} / ${n}` : "", i.querySelectorAll(".lightbox-nav").forEach((e) => e.hidden = n < 2);
	}, c = (e) => {
		let n = e.closest("[data-lightbox-group]"), r = n ? [...n.querySelectorAll("a[data-lightbox]")] : [e], i = o(), c = {
			...t,
			...n ? {
				close: n.dataset.labelClose,
				previous: n.dataset.labelPrevious,
				next: n.dataset.labelNext
			} : {}
		};
		i.querySelector(".lightbox-close")?.setAttribute("aria-label", c.close ?? t.close), i.querySelector(".lightbox-nav-previous")?.setAttribute("aria-label", c.previous ?? t.previous), i.querySelector(".lightbox-nav-next")?.setAttribute("aria-label", c.next ?? t.next), a = {
			links: r,
			index: r.indexOf(e),
			trigger: e
		}, s(a.index), typeof i.showModal == "function" ? i.showModal() : i.setAttribute("open", ""), i.querySelector(".lightbox-close")?.focus();
	}, l = () => {
		i && (i.querySelector(".lightbox-player")?.replaceChildren(), typeof i.close == "function" && i.open ? i.close() : i.removeAttribute("open"));
	}, u = (e) => {
		if (!(e.target instanceof Element)) return;
		let t = e.target.closest("a[data-lightbox]");
		if (t && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
			e.preventDefault(), c(t);
			return;
		}
		if (!i || !i.contains(e.target)) return;
		let n = e.target.closest("[data-step]");
		n ? s((a?.index ?? 0) + Number(n.dataset.step)) : (e.target.closest(".lightbox-close") || e.target === i) && l();
	}, d = (e) => {
		i?.hasAttribute("open") && (e.key === "ArrowRight" ? s((a?.index ?? 0) + 1) : e.key === "ArrowLeft" ? s((a?.index ?? 0) - 1) : e.key === "Escape" && typeof i.showModal != "function" && l());
	}, f = (e) => {
		e.target === i && (i?.querySelector(".lightbox-player")?.replaceChildren(), a?.trigger.focus());
	};
	return n.addEventListener("click", u), n.addEventListener("keydown", d), n.addEventListener("close", f, !0), () => {
		n.removeEventListener("click", u), n.removeEventListener("keydown", d), n.removeEventListener("close", f, !0), i?.remove();
	};
})(document);
//#endregion
