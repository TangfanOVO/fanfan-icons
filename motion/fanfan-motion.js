/* fanfan 图标 Fanfan Icons · 动态版 helper · MIT · by @唐幡
 * FanfanMotion.play(svg, "wake" | "sleep" | "bounce" | "blush" | "trick")
 * FanfanMotion.asleep(svg, true | false)   set the resting state without animating
 * FanfanMotion.idle(svg, true | false)     slow breathing + an occasional blink
 * `svg` can be the <svg class="bb"> itself or any element that contains one. */
(function (root) {
  var DO = ["do-wake", "do-sleep", "do-bounce", "do-blush", "do-trick"];
  var reduce = root.matchMedia ? root.matchMedia("(prefers-reduced-motion: reduce)") : { matches: false };

  function find(el) {
    if (!el) return null;
    if (el.tagName && el.tagName.toLowerCase() === "svg" && el.classList.contains("bb")) return el;
    return el.querySelector ? el.querySelector("svg.bb") : null;
  }
  function play(el, motion) {
    var svg = find(el); if (!svg) return;
    DO.forEach(function (c) { svg.classList.remove(c); });
    if (motion === "wake") svg.classList.remove("is-asleep");
    if (motion === "sleep") svg.classList.add("is-asleep");
    if (reduce.matches) return;                 // reduced motion: jump straight to where the motion ends
    void svg.getBoundingClientRect();           // restart the animation even if the same class comes back
    svg.classList.add("do-" + motion);
  }
  function asleep(el, on) {
    var svg = find(el); if (!svg) return;
    DO.forEach(function (c) { svg.classList.remove(c); });
    svg.classList.toggle("is-asleep", on !== false);
  }
  function idle(el, on) {
    var svg = find(el); if (svg) svg.classList.toggle("idle", on !== false);
  }
  var api = { play: play, asleep: asleep, idle: idle };
  root.FanfanMotion = api;
  if (!root.BaobaoMotion) root.BaobaoMotion = api;   // 豹宝和 fanfan 用同一套动作，哪个名字都能用
})(typeof window !== "undefined" ? window : this);
