"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/imageQualityScore/imageQualityChart.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    console.log("iage");
  });
})();
//# sourceMappingURL=imageQualityChart.js.map
