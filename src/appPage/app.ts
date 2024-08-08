import { appChart } from './appChart';
import { appReviews, updateChartScroll } from './appUI';

window.Webflow ||= [];
window.Webflow.push(async () => {
  updateChartScroll();
  appChart();
  appReviews();
  console.log('app');
});
