//#region src/scripts/back-to-top.ts
var e = ".back-to-top", t = (t = window) => {
	let n = t.scrollY > t.innerHeight;
	t.document.querySelectorAll(e).forEach((e) => e.toggleAttribute("data-visible", n));
}, n = (n = window) => {
	let r = n.document, i = (t) => {
		if (!(t.target instanceof Element) || !t.target.closest(e)) return;
		let i = n.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
		n.scrollTo({
			top: 0,
			behavior: i ? "auto" : "smooth"
		}), r.querySelector("a[href], button")?.focus({ preventScroll: !0 });
	}, a = 0, o = () => {
		cancelAnimationFrame(a), a = requestAnimationFrame(() => t(n));
	};
	return r.addEventListener("click", i), n.addEventListener("scroll", o, { passive: !0 }), n.addEventListener("resize", o), () => {
		cancelAnimationFrame(a), r.removeEventListener("click", i), n.removeEventListener("scroll", o), n.removeEventListener("resize", o);
	};
}, r = ".menu-button", i = (e, t) => {
	e.toggleAttribute("data-menu-open", t), e.querySelector(r)?.setAttribute("aria-expanded", String(t));
}, a = (e = document) => {
	let t = (e) => {
		let t = (e.target instanceof Element ? e.target.closest(r) : null)?.closest(".site-header");
		t && i(t, !t.hasAttribute("data-menu-open"));
	}, n = (t) => {
		t.key !== "Escape" || e.querySelector(".site-header-item[data-open]") || e.querySelectorAll(".site-header[data-menu-open]").forEach((e) => {
			i(e, !1), e.querySelector(r)?.focus();
		});
	}, a = (e) => {
		let t = e.target instanceof Element ? e.target.closest(".site-header[data-menu-open]") : null;
		t && e.relatedTarget instanceof Node && !t.contains(e.relatedTarget) && i(t, !1);
	};
	return e.addEventListener("click", t), e.addEventListener("keydown", n), e.addEventListener("focusout", a), () => {
		e.removeEventListener("click", t), e.removeEventListener("keydown", n), e.removeEventListener("focusout", a);
	};
}, o = ".site-header-item", s = ".site-header-toggle", c = (e, t) => {
	e.toggleAttribute("data-open", t), e.querySelector(`:scope > ${s}`)?.setAttribute("aria-expanded", String(t));
}, l = (e, t) => e.querySelectorAll(`${o}[data-open]`).forEach((e) => e !== t && c(e, !1)), u = (e = document) => {
	let t = (t) => {
		let n = t.target instanceof Element ? t.target : null, r = (n?.closest(s))?.closest(o);
		if (r) {
			let t = !r.hasAttribute("data-open");
			l(e, r), c(r, t), t && r.querySelector(".nav-flyout input")?.focus();
			return;
		}
		n?.closest(`${o}[data-open]`) || l(e);
	}, n = (t) => {
		if (t.key !== "Escape") return;
		let n = e.querySelector(`${o}[data-open]`);
		n && (c(n, !1), n.querySelector(s)?.focus());
	}, r = (e) => {
		let t = e.target instanceof Element ? e.target.closest(`${o}[data-open]`) : null;
		t && !(e.relatedTarget instanceof Node && t.contains(e.relatedTarget)) && c(t, !1);
	};
	return e.addEventListener("click", t), e.addEventListener("keydown", n), e.addEventListener("focusout", r), () => {
		e.removeEventListener("click", t), e.removeEventListener("keydown", n), e.removeEventListener("focusout", r);
	};
}, d = ".scheme-toggle", f = (e = document) => e.documentElement.dataset.scheme === "dark" ? "dark" : "light", p = (e = document) => {
	let t = String(f(e) === "dark");
	e.querySelectorAll(d).forEach((e) => e.setAttribute("aria-pressed", t));
}, m = (e, t = document) => {
	t.documentElement.dataset.scheme = e, p(t);
}, h = (e = document, t) => {
	let n = (n) => {
		if (!(n.target instanceof Element) || !n.target.closest(d)) return;
		let r = f(e) === "dark" ? "light" : "dark";
		m(r, e), t?.(r);
	};
	return e.addEventListener("click", n), () => e.removeEventListener("click", n);
}, g = ".site-header", _ = (e = window) => {
	e.document.querySelectorAll(g).forEach((t) => {
		let n = e.scrollY > 0 && t.getBoundingClientRect().top <= 0 && getComputedStyle(t).position === "sticky";
		t.toggleAttribute("data-stuck", n);
	});
};
h(document), a(document), u(document), ((e = window) => {
	let t = 0, n = () => {
		cancelAnimationFrame(t), t = requestAnimationFrame(() => _(e));
	};
	return e.addEventListener("scroll", n, { passive: !0 }), e.addEventListener("resize", n), n(), () => {
		cancelAnimationFrame(t), e.removeEventListener("scroll", n), e.removeEventListener("resize", n);
	};
})(window), n(window), p(document), _(window);
//#endregion
