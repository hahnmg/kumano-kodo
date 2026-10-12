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
}, r = "[data-file-upload]", i = (e) => [...e.files ?? []].map((e) => e.name).join(", "), a = (e = document) => {
	let t = (e, t) => {
		(e.target instanceof Element ? e.target.closest(r) : null)?.toggleAttribute("data-dragover", t);
	}, n = (e) => t(e, !0), a = (e) => t(e, !1), o = (e) => {
		let t = e.target instanceof HTMLInputElement && e.target.type === "file" ? e.target : null, n = t?.closest(r);
		if (!t || !n) return;
		n.removeAttribute("data-dragover");
		let a = n.querySelector(".file-upload-chosen");
		a && (a.textContent = i(t));
	};
	return e.addEventListener("dragenter", n), e.addEventListener("dragleave", a), e.addEventListener("drop", a), e.addEventListener("change", o), () => {
		e.removeEventListener("dragenter", n), e.removeEventListener("dragleave", a), e.removeEventListener("drop", a), e.removeEventListener("change", o);
	};
}, o = ".menu-button", s = (e, t) => {
	e.toggleAttribute("data-menu-open", t), e.querySelector(o)?.setAttribute("aria-expanded", String(t));
}, c = (e = document) => {
	let t = (e) => {
		let t = (e.target instanceof Element ? e.target.closest(o) : null)?.closest(".site-header");
		t && s(t, !t.hasAttribute("data-menu-open"));
	}, n = (t) => {
		t.key !== "Escape" || e.querySelector(".site-header-item[data-open]") || e.querySelectorAll(".site-header[data-menu-open]").forEach((e) => {
			s(e, !1), e.querySelector(o)?.focus();
		});
	}, r = (e) => {
		let t = e.target instanceof Element ? e.target.closest(".site-header[data-menu-open]") : null;
		t && e.relatedTarget instanceof Node && !t.contains(e.relatedTarget) && s(t, !1);
	};
	return e.addEventListener("click", t), e.addEventListener("keydown", n), e.addEventListener("focusout", r), () => {
		e.removeEventListener("click", t), e.removeEventListener("keydown", n), e.removeEventListener("focusout", r);
	};
}, l = ".site-header-item", u = ".site-header-toggle", d = (e, t) => {
	e.toggleAttribute("data-open", t), e.querySelector(`:scope > ${u}`)?.setAttribute("aria-expanded", String(t));
}, f = (e, t) => e.querySelectorAll(`${l}[data-open]`).forEach((e) => e !== t && d(e, !1)), p = (e = document) => {
	let t = (t) => {
		let n = t.target instanceof Element ? t.target : null, r = (n?.closest(u))?.closest(l);
		if (r) {
			let t = !r.hasAttribute("data-open");
			f(e, r), d(r, t), t && r.querySelector(".nav-flyout input")?.focus();
			return;
		}
		n?.closest(`${l}[data-open]`) || f(e);
	}, n = (t) => {
		if (t.key !== "Escape") return;
		let n = e.querySelector(`${l}[data-open]`);
		n && (d(n, !1), n.querySelector(u)?.focus());
	}, r = (e) => {
		let t = e.target instanceof Element ? e.target.closest(`${l}[data-open]`) : null;
		t && !(e.relatedTarget instanceof Node && t.contains(e.relatedTarget)) && d(t, !1);
	};
	return e.addEventListener("click", t), e.addEventListener("keydown", n), e.addEventListener("focusout", r), () => {
		e.removeEventListener("click", t), e.removeEventListener("keydown", n), e.removeEventListener("focusout", r);
	};
}, m = ".scheme-toggle", h = (e = document) => e.documentElement.dataset.scheme === "dark" ? "dark" : "light", g = (e = document) => {
	let t = String(h(e) === "dark");
	e.querySelectorAll(m).forEach((e) => e.setAttribute("aria-pressed", t));
}, _ = (e, t = document) => {
	t.documentElement.dataset.scheme = e, g(t);
}, v = (e = document, t) => {
	let n = (n) => {
		if (!(n.target instanceof Element) || !n.target.closest(m)) return;
		let r = h(e) === "dark" ? "light" : "dark";
		_(r, e), t?.(r);
	};
	return e.addEventListener("click", n), () => e.removeEventListener("click", n);
}, y = ".site-header", b = (e = window) => {
	e.document.querySelectorAll(y).forEach((t) => {
		let n = e.scrollY > 0 && t.getBoundingClientRect().top <= 0 && getComputedStyle(t).position === "sticky";
		t.toggleAttribute("data-stuck", n);
	});
};
v(document), c(document), p(document), ((e = window) => {
	let t = 0, n = () => {
		cancelAnimationFrame(t), t = requestAnimationFrame(() => b(e));
	};
	return e.addEventListener("scroll", n, { passive: !0 }), e.addEventListener("resize", n), n(), () => {
		cancelAnimationFrame(t), e.removeEventListener("scroll", n), e.removeEventListener("resize", n);
	};
})(window), n(window), a(document), g(document), b(window);
//#endregion
