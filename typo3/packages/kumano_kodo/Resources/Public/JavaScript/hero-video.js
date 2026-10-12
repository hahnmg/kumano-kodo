//#region src/scripts/hero-video.ts
var e = (e) => {
	let t = e.querySelector("video");
	if (t) return t.play(), t.focus(), t;
	let n = e.querySelector("iframe");
	if (n) {
		let e = new URL(n.src, location.href);
		e.searchParams.set("autoplay", "1"), n.src = e.href, n.allow = [n.allow, "autoplay"].filter(Boolean).join("; "), n.focus();
	}
	return null;
}, t = (e) => {
	e.querySelector(".hero-player")?.replaceChildren(), delete e.dataset.playing, e.querySelector(".hero-play")?.focus();
}, n = (n) => {
	let r = n.querySelector("template.hero-player-source"), i = n.querySelector(".hero-player");
	r && i && (i.replaceChildren(r.content.cloneNode(!0)), n.dataset.playing = "", e(i)?.addEventListener("ended", () => t(n)));
};
//#endregion
//#region src/entries/hero-video.ts
((e) => {
	let r = (e) => {
		let r = e.target instanceof Element ? e.target.closest(".hero-play, .hero-close") : null, i = r?.closest(".hero[data-video]");
		r && i && (r.classList.contains("hero-play") ? n(i) : t(i));
	}, i = (e) => {
		let n = e.target instanceof Element ? e.target.closest(".hero[data-playing]") : null;
		e.key === "Escape" && n && t(n);
	};
	return e.addEventListener("click", r), e.addEventListener("keydown", i), () => {
		e.removeEventListener("click", r), e.removeEventListener("keydown", i);
	};
})(document);
//#endregion
