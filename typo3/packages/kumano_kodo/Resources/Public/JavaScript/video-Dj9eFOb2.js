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
}, t = (t) => {
	let n = t.querySelector("template.video-source");
	if (!n || "playing" in t.dataset) return;
	let r = document.createElement("div");
	r.className = "video-stage", r.append(n.content.cloneNode(!0)), t.append(r), t.dataset.playing = "", e(r);
}, n = (e) => {
	let n = (e) => {
		let n = (e.target instanceof Element ? e.target.closest(".video-play") : null)?.closest(".video");
		n && t(n);
	};
	return e.addEventListener("click", n), () => e.removeEventListener("click", n);
};
//#endregion
export { e as n, n as t };
