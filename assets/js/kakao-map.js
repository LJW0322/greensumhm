(() => {
  const root = document.getElementById("daumRoughmapContainer1794285130890");
  if (!root || !window.daum?.roughmap?.Lander) return;
  const lander = new daum.roughmap.Lander({
    timestamp: "1794285130890",
    key: "4rmsinjso6g",
    mapWidth: String(Math.round(root.parentElement.clientWidth) || 640),
    mapHeight: matchMedia("(max-width:760px)").matches ? "300" : "360",
  });
  lander.render();
  new ResizeObserver(() => {
    if (lander.jsMap) {
      lander.jsMap.relayout();
      if (lander.mapCenter) lander.jsMap.setCenter(lander.mapCenter);
    }
  }).observe(root.parentElement);
})();
