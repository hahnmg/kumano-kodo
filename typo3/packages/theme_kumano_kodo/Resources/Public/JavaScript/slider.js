//#region src/scripts/slider.ts
var e = "[data-slider]", t = ".slider-track", n = (e) => ({
	track: e.querySelector(t),
	previous: e.querySelector("[data-direction=\"previous\"]"),
	next: e.querySelector("[data-direction=\"next\"]"),
	dots: [...e.querySelectorAll(".slider-dots-dot")]
}), r = (e) => [...e.children].filter((e) => e instanceof HTMLElement), i = (e) => Math.max(0, e.scrollWidth - e.clientWidth), a = (e) => {
	let t = r(e), n = t[0]?.offsetLeft ?? 0, a = i(e), o = [];
	for (let e of t) {
		let t = Math.min(e.offsetLeft - n, a);
		(!o.length || t - o[o.length - 1] > 1) && o.push(t);
	}
	return o.length ? o : [0];
}, o = (e) => {
	let t = Number(e.dataset.sliderTarget);
	return Number.isFinite(t) && e.dataset.sliderTarget !== void 0 ? t : e.scrollLeft;
}, s = (e, t = o(e)) => {
	let n = a(e), r = 0;
	return n.forEach((e, i) => {
		Math.abs(e - t) < Math.abs(n[r] - t) && (r = i);
	}), r;
}, c = (e, t) => {
	let n = a(e), r = n[Math.max(0, Math.min(t, n.length - 1))];
	e.dataset.sliderTarget = String(r), e.scrollTo({ left: r });
}, l = (t = document) => {
	t.querySelectorAll(e).forEach((e) => {
		let { track: t, previous: r, next: i, dots: o } = n(e);
		if (!t) return;
		t.dataset.sliderTarget !== void 0 && Math.abs(Number(t.dataset.sliderTarget) - t.scrollLeft) <= 2 && delete t.dataset.sliderTarget;
		let c = a(t).length, l = s(t);
		o.forEach((e, t) => {
			e.hidden = t >= c, t === l ? e.setAttribute("aria-current", "true") : e.removeAttribute("aria-current");
		}), r?.setAttribute("aria-disabled", String(l === 0)), i?.setAttribute("aria-disabled", String(l >= c - 1));
	});
}, u = (e, t) => c(e, s(e) + t), d = (r = document) => {
	let i = (i) => {
		if (!(i.target instanceof Element)) return;
		let a = i.target.closest(e), o = a?.querySelector(t);
		if (!a || !o) return;
		let s = i.target.closest("[data-direction]"), d = i.target.closest(".slider-dots-dot");
		s ? u(o, s.dataset.direction === "next" ? 1 : -1) : d && c(o, n(a).dots.indexOf(d)), l(r);
	}, a = (e) => {
		let n = e.target instanceof HTMLElement && e.target.matches(t) ? e.target : null;
		!n || e.key !== "ArrowRight" && e.key !== "ArrowLeft" || (e.preventDefault(), u(n, e.key === "ArrowRight" ? 1 : -1), l(r));
	}, o = 0, s = () => {
		cancelAnimationFrame(o), o = requestAnimationFrame(() => l(r));
	}, d = (e) => {
		e.target instanceof Element && e.target.matches(t) && s();
	}, f = (e) => {
		let n = e.target instanceof Element ? e.target.closest(t) : null;
		n && delete n.dataset.sliderTarget;
	}, p = r.defaultView;
	return r.addEventListener("click", i), r.addEventListener("keydown", a), r.addEventListener("scroll", d, !0), r.addEventListener("pointerdown", f), r.addEventListener("wheel", f, { passive: !0 }), p?.addEventListener("resize", s), () => {
		r.removeEventListener("click", i), r.removeEventListener("keydown", a), r.removeEventListener("scroll", d, !0), r.removeEventListener("pointerdown", f), r.removeEventListener("wheel", f), p?.removeEventListener("resize", s);
	};
}, f = "[data-slider][data-autoplay]", p = /* @__PURE__ */ new WeakMap(), m = (e, n) => {
	e.toggleAttribute("data-paused", n);
	let r = e.querySelector(".hero-pause");
	r && (r.setAttribute("aria-pressed", String(n)), r.setAttribute("aria-label", (n ? e.dataset.labelPlay : e.dataset.labelPause) ?? "")), e.querySelector(t)?.setAttribute("aria-live", n ? "polite" : "off");
}, h = (e = document) => {
	e.querySelectorAll(f).forEach((t) => {
		let n = t.querySelector(".hero-bar");
		n && t.style.setProperty("--hero-bar-height", `${n.offsetHeight}px`), t.hasAttribute("data-autoplay-ready") || (t.setAttribute("data-autoplay-ready", ""), m(t, e.defaultView?.matchMedia("(prefers-reduced-motion: reduce)").matches ?? !1), p.set(t, Date.now()));
	});
};
d(document), ((e = document) => {
	let n = () => {
		e.hidden || e.querySelectorAll(f).forEach((n) => {
			let r = n.querySelector(t), i = n.hasAttribute("data-paused") || n.matches(":hover") || n.contains(e.activeElement), o = Date.now() - (p.get(n) ?? 0) >= Number(n.dataset.autoplay || 7e3);
			if (!r || i || !o) return;
			let u = s(r) + 1;
			c(r, u >= a(r).length ? 0 : u), p.set(n, Date.now()), l(e);
		});
	}, r = (e) => {
		let t = (e.target instanceof Element ? e.target.closest(".hero-pause") : null)?.closest(f);
		t && m(t, !t.hasAttribute("data-paused"));
	}, i = (e) => {
		let t = e.target instanceof Element ? e.target.closest(f) : null;
		t && p.set(t, Date.now());
	}, o = e.defaultView, u = o?.setInterval(n, 500), d = () => h(e);
	return e.addEventListener("click", r), e.addEventListener("pointerdown", i), e.addEventListener("keydown", i), o?.addEventListener("resize", d), h(e), () => {
		u !== void 0 && o?.clearInterval(u), e.removeEventListener("click", r), e.removeEventListener("pointerdown", i), e.removeEventListener("keydown", i), o?.removeEventListener("resize", d);
	};
})(document), l(document);
//#endregion
