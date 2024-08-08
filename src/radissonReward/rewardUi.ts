import { getTableRecord } from 'src/airtable-values';

import { rewardChart } from './reward-chart';

const rewardKpiWrapper = document.getElementById('rewardKPIs') as HTMLElement;
const cardLoader = document.getElementById('cardLoadEl') as HTMLElement;
const tableId = 'tbl0BmeZ3H9Ee6afE';

window.Webflow ||= [];
window.Webflow.push(() => {
  getTableRecord('tbl0BmeZ3H9Ee6afE').eachPage(function page(records) {
    const lastRowField = records.slice(-1).map((el) => el.fields);

    function formatQoQData(number: any) {
      const numberPer = number * 100;
      return Number(numberPer.toFixed(2));
    }

    const rowHtml = lastRowField
      .map((el) => {
        console.log(el);
        const memberSharePercent = el['Members reservations share'] as number;
        const memberQoQPercent = el['Members reservations share QoQ'];
        const memQoQformat = formatQoQData(memberQoQPercent);
        const appMemberPercent = el['App members reservations share'] as number;
        const appQoQ = el['App members reservations share QoQ'];
        const appQoQFormat = formatQoQData(appQoQ);
        const webAppenrolPercent = el['Web & app enrolments'] as number;
        const webAPpQoQ = el['Wbb & app enrolments QoQ'];
        const webAPpQoQFormat = formatQoQData(webAPpQoQ);

        return `<div id="w-node-c439c094-2463-6c3c-c56e-4f0494ba71eb-f6df2563" class="reward-card shdow"><div class="heading-white _w-500">Members reservation Share</div><div class="v-flex gap-6"><div class="h-s-40">${
          memberSharePercent * 100
        }%</div><div class="_w-500"><span class=${memQoQformat > 0 ? 'green' : 'red'} </span> ${
          memQoQformat < 0 ? '-' : ''
        }${memQoQformat}%</span> uplift vs Q4 2023</div></div></div><div class="reward-card shdow"><div class="heading-white _w-500">App members reservation share</div><div class="v-flex gap-6"><div class="h-s-40">${
          appMemberPercent * 100
        }%</div><div class="_w-500"><span class=${appQoQFormat > 0 ? 'green' : 'red'}>${
          appQoQFormat < 0 ? '-' : ''
        }${appQoQFormat}%</span> uplift vs Q4 2023</div></div></div><div class="reward-card shdow"><div class="heading-white _w-500">Web and app enrolments</div><div class="v-flex gap-6"><div class="h-s-40">${
          webAppenrolPercent * 100
        }%</div><div class="_w-500"><span class="green">${
          webAPpQoQFormat < 0 ? '-' : ''
        }${webAPpQoQFormat}%</span> uplift vs Q4 2023</div></div></div>`;
      })
      .join('');
    ///add the html to the card wrapper
    rewardKpiWrapper.innerHTML = rowHtml;
    cardLoader.style.display = `none`;
  });

  rewardChart();
});
