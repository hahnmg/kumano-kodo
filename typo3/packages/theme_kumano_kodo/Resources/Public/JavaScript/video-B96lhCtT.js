//#region src/scripts/video.ts
var e = (e) => {
	let t = e.querySelector("video");
	if (t) {
		t.play(), t.focus();
		return;
	}
	let n = e.querySelector("iframe");
	if (n) {
		let e = new URL(n.src, location.href);
		e.searchParams.set("autoplay", "1"), n.src = e.href, n.allow = [n.allow, "autoplay"].filter(Boolean).join("; "), n.focus();
	}
}, t = "kumano-kodo.external-media", n = () => {
	try {
		return localStorage.getItem(t) === "allow";
	} catch {
		return !1;
	}
}, r = (e) => {
	try {
		e ? localStorage.setItem(t, "allow") : localStorage.removeItem(t);
	} catch {}
}, i = (e, t, i) => {
	let a = e.querySelector("template.video-consent-source")?.content.firstElementChild?.cloneNode(!0);
	if (!(a instanceof HTMLElement) || n()) {
		i();
		return;
	}
	t.append(a);
	let o = a.querySelector(".button");
	o?.addEventListener("click", () => {
		a.querySelector(".choice-input")?.checked && r(!0), a.remove(), i();
	}), o?.focus();
}, a = (t) => {
	let n = t.querySelector("template.video-source");
	!n || "playing" in t.dataset || (t.dataset.playing = "", i(t, t, () => {
		let r = document.createElement("div");
		r.className = "video-stage", r.append(n.content.cloneNode(!0)), t.append(r), e(r);
	}));
}, o = (e = document) => {
	e.querySelectorAll(".media-consent .choice-input").forEach((e) => e.checked = n());
}, s = (e) => {
	let t = (e) => {
		let t = e.target instanceof HTMLInputElement ? e.target : null;
		t?.closest(".media-consent") && r(t.checked);
	};
	return e.addEventListener("change", t), o(e), () => e.removeEventListener("change", t);
}, c = (e) => {
	let t = (e) => {
		let t = (e.target instanceof Element ? e.target.closest(".video-play") : null)?.closest(".video");
		t && a(t);
	};
	return e.addEventListener("click", t), () => e.removeEventListener("click", t);
};
//#endregion
export { i, c as n, e as r, s as t };
