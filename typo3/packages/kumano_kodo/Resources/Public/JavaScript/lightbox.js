//#region src/scripts/lightbox.ts
var e = {
	close: "Close",
	previous: "Previous",
	next: "Next"
}, t = (e) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="${e}"/></svg>`, n = `<figure class="lightbox__figure"><img class="lightbox__image" alt=""><figcaption class="lightbox__caption type-caption"><span class="lightbox__text"></span><span class="lightbox__count"></span></figcaption></figure><button class="lightbox__button lightbox__close" type="button">${t("M18 6 6 18M6 6l12 12")}</button><button class="lightbox__button lightbox__nav lightbox__nav--previous" type="button" data-step="-1">${t("M19 12H5m0 0 6-6m-6 6 6 6")}</button><button class="lightbox__button lightbox__nav lightbox__nav--next" type="button" data-step="1">${t("M5 12h14m0 0-6-6m6 6-6 6")}</button>`;
//#endregion
//#region src/entries/lightbox.ts
((t = document) => {
	let r = null, i = null, a = () => r?.isConnected ? r : (r = t.createElement("dialog"), r.className = "lightbox", r.innerHTML = n, t.body.append(r), r), o = (e) => {
		if (!i || !r) return;
		let t = i.links.length;
		i.index = (e + t) % t;
		let n = i.links[i.index], a = n.querySelector("img")?.alt ?? "", o = r.querySelector(".lightbox__image");
		o && (o.src = n.href, o.alt = a), r.setAttribute("aria-label", a), r.querySelector(".lightbox__text").textContent = a, r.querySelector(".lightbox__count").textContent = t > 1 ? `${i.index + 1} / ${t}` : "", r.querySelectorAll(".lightbox__nav").forEach((e) => e.hidden = t < 2);
	}, s = (t) => {
		let n = t.closest("[data-lightbox-group]"), r = n ? [...n.querySelectorAll("a[data-lightbox]")] : [t], s = a(), c = {
			...e,
			...n ? {
				close: n.dataset.labelClose,
				previous: n.dataset.labelPrevious,
				next: n.dataset.labelNext
			} : {}
		};
		s.querySelector(".lightbox__close")?.setAttribute("aria-label", c.close ?? e.close), s.querySelector(".lightbox__nav--previous")?.setAttribute("aria-label", c.previous ?? e.previous), s.querySelector(".lightbox__nav--next")?.setAttribute("aria-label", c.next ?? e.next), i = {
			links: r,
			index: r.indexOf(t),
			trigger: t
		}, o(i.index), typeof s.showModal == "function" ? s.showModal() : s.setAttribute("open", ""), s.querySelector(".lightbox__close")?.focus();
	}, c = () => {
		r && (typeof r.close == "function" && r.open ? r.close() : r.removeAttribute("open"));
	}, l = (e) => {
		if (!(e.target instanceof Element)) return;
		let t = e.target.closest("a[data-lightbox]");
		if (t && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
			e.preventDefault(), s(t);
			return;
		}
		if (!r || !r.contains(e.target)) return;
		let n = e.target.closest("[data-step]");
		n ? o((i?.index ?? 0) + Number(n.dataset.step)) : (e.target.closest(".lightbox__close") || e.target === r) && c();
	}, u = (e) => {
		r?.hasAttribute("open") && (e.key === "ArrowRight" ? o((i?.index ?? 0) + 1) : e.key === "ArrowLeft" ? o((i?.index ?? 0) - 1) : e.key === "Escape" && typeof r.showModal != "function" && c());
	}, d = (e) => {
		e.target === r && i?.trigger.focus();
	};
	return t.addEventListener("click", l), t.addEventListener("keydown", u), t.addEventListener("close", d, !0), () => {
		t.removeEventListener("click", l), t.removeEventListener("keydown", u), t.removeEventListener("close", d, !0), r?.remove();
	};
})(document);
//#endregion
