//#region src/scripts/menu-toggle.ts
var e = ".menu-button", t = (t, n) => {
	t.toggleAttribute("data-menu-open", n), t.querySelector(e)?.setAttribute("aria-expanded", String(n));
}, n = (n = document) => {
	let r = (n) => {
		let r = (n.target instanceof Element ? n.target.closest(e) : null)?.closest(".site-header");
		r && t(r, !r.hasAttribute("data-menu-open"));
	}, i = (r) => {
		r.key !== "Escape" || n.querySelector(".site-header__item[data-open]") || n.querySelectorAll(".site-header[data-menu-open]").forEach((n) => {
			t(n, !1), n.querySelector(e)?.focus();
		});
	};
	return n.addEventListener("click", r), n.addEventListener("keydown", i), () => {
		n.removeEventListener("click", r), n.removeEventListener("keydown", i);
	};
}, r = ".site-header__item", i = ".site-header__toggle", a = (e, t) => {
	e.toggleAttribute("data-open", t), e.querySelector(`:scope > ${i}`)?.setAttribute("aria-expanded", String(t));
}, o = (e, t) => e.querySelectorAll(`${r}[data-open]`).forEach((e) => e !== t && a(e, !1)), s = (e = document) => {
	let t = (t) => {
		let n = t.target instanceof Element ? t.target : null, s = (n?.closest(i))?.closest(r);
		if (s) {
			let t = !s.hasAttribute("data-open");
			o(e, s), a(s, t), t && s.querySelector(".nav-flyout input")?.focus();
			return;
		}
		n?.closest(`${r}[data-open]`) || o(e);
	}, n = (t) => {
		if (t.key !== "Escape") return;
		let n = e.querySelector(`${r}[data-open]`);
		n && (a(n, !1), n.querySelector(i)?.focus());
	}, s = (e) => {
		let t = e.target instanceof Element ? e.target.closest(`${r}[data-open]`) : null;
		t && !(e.relatedTarget instanceof Node && t.contains(e.relatedTarget)) && a(t, !1);
	};
	return e.addEventListener("click", t), e.addEventListener("keydown", n), e.addEventListener("focusout", s), () => {
		e.removeEventListener("click", t), e.removeEventListener("keydown", n), e.removeEventListener("focusout", s);
	};
}, c = ".scheme-toggle", l = (e = document) => e.documentElement.dataset.scheme === "dark" ? "dark" : "light", u = (e = document) => {
	let t = String(l(e) === "dark");
	e.querySelectorAll(c).forEach((e) => e.setAttribute("aria-pressed", t));
}, d = (e, t = document) => {
	t.documentElement.dataset.scheme = e, u(t);
}, f = (e = document, t) => {
	let n = (n) => {
		if (!(n.target instanceof Element) || !n.target.closest(c)) return;
		let r = l(e) === "dark" ? "light" : "dark";
		d(r, e), t?.(r);
	};
	return e.addEventListener("click", n), () => e.removeEventListener("click", n);
}, p = ".site-header", m = (e = window) => {
	e.document.querySelectorAll(p).forEach((t) => {
		let n = e.scrollY > 0 && t.getBoundingClientRect().top <= 0 && getComputedStyle(t).position === "sticky";
		t.toggleAttribute("data-stuck", n);
	});
};
f(document), n(document), s(document), ((e = window) => {
	let t = 0, n = () => {
		cancelAnimationFrame(t), t = requestAnimationFrame(() => m(e));
	};
	return e.addEventListener("scroll", n, { passive: !0 }), e.addEventListener("resize", n), n(), () => {
		cancelAnimationFrame(t), e.removeEventListener("scroll", n), e.removeEventListener("resize", n);
	};
})(window), u(document), m(window);
//#endregion
