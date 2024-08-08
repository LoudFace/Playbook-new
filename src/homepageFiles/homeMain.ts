import { onlineChart } from './homeChart';
import { homeUIs } from './homeUi';

window.Webflow ||= [];
window.Webflow.push(() => {
  onlineChart();
  homeUIs();
  console.log('home');
});
