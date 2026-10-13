import { i as e, r as t } from "./video-B96lhCtT.js";
//#region src/scripts/lightbox.ts
var n = {
	close: "Close",
	previous: "Previous",
	next: "Next",
	play: "Play video"
}, r = (e) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="${e}"/></svg>`, i = `<figure class="lightbox-figure"><img class="lightbox-image" alt=""><div class="lightbox-player"></div><figcaption class="lightbox-caption type-caption"><span class="lightbox-text"></span><span class="lightbox-count"></span></figcaption></figure><button class="lightbox-button lightbox-close" type="button">${r("M18 6 6 18M6 6l12 12")}</button><button class="lightbox-button lightbox-nav lightbox-nav-previous" type="button" data-step="-1">${r("M19 12H5m0 0 6-6m-6 6 6 6")}</button><button class="lightbox-button lightbox-nav lightbox-nav-next" type="button" data-step="1">${r("M5 12h14m0 0-6-6m6 6-6 6")}</button>`;
//#endregion
//#region src/entries/lightbox.ts
((r = document) => {
	let a = null, o = null, s = () => a?.isConnected ? a : (a = r.createElement("dialog"), a.className = "lightbox", a.innerHTML = i, r.body.append(a), a), c = (n) => {
		if (!o || !a) return;
		let r = o.links.length;
		o.index = (n + r) % r;
		let i = o.links[o.index], s = i.querySelector("img")?.alt ?? "", c = a.querySelector(".lightbox-image"), l = a.querySelector(".lightbox-player"), u = i.querySelector("template.video-source");
		l?.replaceChildren(), c && (c.hidden = u !== null, u || (c.src = i.href), c.alt = s), u && l && e(i, l, () => {
			l.append(u.content.cloneNode(!0)), t(l);
		}), a.setAttribute("aria-label", s), a.querySelector(".lightbox-text").textContent = s, a.querySelector(".lightbox-count").textContent = r > 1 ? `${o.index + 1} / ${r}` : "", a.querySelectorAll(".lightbox-nav").forEach((e) => e.hidden = r < 2);
	}, l = (e) => {
		let t = e.closest("[data-lightbox-group]"), r = t ? [...t.querySelectorAll("a[data-lightbox]")] : [e], i = s(), a = {
			...n,
			...t ? {
				close: t.dataset.labelClose,
				previous: t.dataset.labelPrevious,
				next: t.dataset.labelNext
			} : {}
		};
		i.querySelector(".lightbox-close")?.setAttribute("aria-label", a.close ?? n.close), i.querySelector(".lightbox-nav-previous")?.setAttribute("aria-label", a.previous ?? n.previous), i.querySelector(".lightbox-nav-next")?.setAttribute("aria-label", a.next ?? n.next), o = {
			links: r,
			index: r.indexOf(e),
			trigger: e
		}, c(o.index), typeof i.showModal == "function" ? i.showModal() : i.setAttribute("open", ""), i.querySelector(".lightbox-close")?.focus();
	}, u = () => {
		a && (a.querySelector(".lightbox-player")?.replaceChildren(), typeof a.close == "function" && a.open ? a.close() : a.removeAttribute("open"));
	}, d = (e) => {
		if (!(e.target instanceof Element)) return;
		let t = e.target.closest("a[data-lightbox]");
		if (t && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
			e.preventDefault(), l(t);
			return;
		}
		if (!a || !a.contains(e.target)) return;
		let n = e.target.closest("[data-step]");
		n ? c((o?.index ?? 0) + Number(n.dataset.step)) : (e.target.closest(".lightbox-close") || e.target === a) && u();
	}, f = (e) => {
		a?.hasAttribute("open") && (e.key === "ArrowRight" ? c((o?.index ?? 0) + 1) : e.key === "ArrowLeft" ? c((o?.index ?? 0) - 1) : e.key === "Escape" && typeof a.showModal != "function" && u());
	}, p = (e) => {
		e.target === a && (a?.querySelector(".lightbox-player")?.replaceChildren(), o?.trigger.focus());
	};
	return r.addEventListener("click", d), r.addEventListener("keydown", f), r.addEventListener("close", p, !0), () => {
		r.removeEventListener("click", d), r.removeEventListener("keydown", f), r.removeEventListener("close", p, !0), a?.remove();
	};
})(document);
//#endregion
