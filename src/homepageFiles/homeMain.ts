import { onlineChart } from './homeChart';

window.Webflow ||= [];
window.Webflow.push(() => {
  onlineChart();
  console.log('home');
});
