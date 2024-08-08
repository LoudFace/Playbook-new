import { getTableRecord } from 'src/airtable-values';
import { multiInputPieChart } from 'src/chartFunction';
import {
  getColumnData,
  getColumnNumberData,
  numberWithCommas,
  pieSecondValue,
} from 'src/helperFunction';

///project KPIs
const tableId = 'tblswJIqfwbzLhid0';
const planTableId = 'tblSmpTzP9lZR9MlH';

const projectEtaWrap = document.querySelector('#projectETAWrap') as HTMLElement;

const htmlTableWrap = document.getElementById('tableId') as HTMLElement;

//total project
const totalProject = document.querySelector('[total-projects]') as HTMLElement;

const wipValueHtml = document.querySelector('[wip-value]') as HTMLElement;
const planningVHtml = document.querySelector('[planning-value]') as HTMLElement;
const backloqVHtml = document.querySelector('[backloq-value]') as HTMLElement;
const blockedVHtml = document.querySelector('[blocked-value]') as HTMLElement;
const alwaysVHtml = document.querySelector('[always-value]') as HTMLElement;

//loadingEl
const loadingEl = document.querySelector('#roadMapLoading');

//[pie chart wrap]
const pieChartWrap = document.querySelector('#pieChart') as HTMLElement;

//sectionWrao
const pieKpiSection = document.querySelector('#projectKpiSection') as HTMLElement;

type ProjectETA = { name: string; value: any };

window.Webflow ||= [];
window.Webflow.push(() => {
  getTableRecord(tableId).eachPage(function page(records) {
    const [lastRole] = records.slice(-1);
    const [totalProjectV] = getColumnData('Total projects', records);
    const [wipValue] = getColumnData('WIP', records);
    const [planningValue] = getColumnData('Planning', records);
    const [Backlog] = getColumnData('Backlog', records);
    const [alwaysOnValue] = getColumnData('Always-on', records);
    const [blockedValue] = getColumnData('Blocked', records);

    const valueArr = [wipValue, planningValue, Backlog, blockedValue, alwaysOnValue];

    const valueArrFrmtd = valueArr.map((el) => el * 100);

    const colorArr = <string[]>['#155EEF', '#6938EF', '#BA24D5', '#0BA5EC', 'cyan'];
    const nameArr = ['WIP', 'Planning', 'Backlog', 'Blocked', 'Always-on'];

    // multiInputPieChart(pieChartWrap, nameArr, valueArrFrmtd, colorArr);

    const pieintoView = function (entries: Array<IntersectionObserverEntry>): void {
      entries.forEach((el: { isIntersecting: boolean }) => {
        multiInputPieChart(pieChartWrap, nameArr, valueArrFrmtd, colorArr);
        wipValueHtml.textContent = `${valueArrFrmtd[0]}%`;
        planningVHtml.textContent = `${valueArrFrmtd[1]}%`;
        backloqVHtml.textContent = `${valueArrFrmtd[2]}%`;
        blockedVHtml.textContent = `${valueArrFrmtd[3]}%`;
        alwaysVHtml.textContent = `${valueArrFrmtd[4]}%`;

        loadingEl.style.display = `none`;

        // overallValue.textContent = `${overallScoreValue}%`;
        // plotPieChart(emeaPieChartWrap, emeaPieValue, emaePieSecondValue, emeaColor);
        // emeaValue.textContent = `${emeaPieValue}%`;
        // plotPieChart(apacPieChartWrap, apacPieValue, apacSecondValue, apacColor);
        // apacvalue.textContent = `${apacPieValue}%`;
      });
    };

    const options = {
      threshold: 0.4,
    };
    const newObserve = new IntersectionObserver(pieintoView, options);

    newObserve.observe(pieKpiSection);

    //total project html
    totalProject.textContent = `${totalProjectV}`;

    const [q1_2024Value] = getColumnData('Q1 2024', records);
    const [q2_2024Value] = getColumnData('Q2 2024', records);
    const [q3_2024Value] = getColumnData('Q3 2024', records);
    const [q4_2024Value] = getColumnData('Q4 2024', records);
    const [tbd_Value] = getColumnData('TBD', records);
    //project eta array
    const projectETA: ProjectETA[] = [
      { name: 'Q1 2024', value: q1_2024Value },
      { name: 'Q2 2024', value: q2_2024Value },
      { name: 'Q3 2024', value: q3_2024Value },
      { name: 'Q4 2024', value: q4_2024Value },
      { name: 'TBC', value: tbd_Value },
    ];

    const projectEtaHtml = projectETA
      .map((el) => {
        return `<div class="h-flex gap-25"><div class="eta-quarter"><div class="heading-white">${
          el.name
        }</div></div><div class="eta-range"><div style="width: ${
          el.value * 100
        }% " class="eta-range-value _1"><div class="range-percent">${
          el.value * 100
        }%</div></div></div></div>`;
      })
      .join('');

    projectEtaWrap.innerHTML = projectEtaHtml;
  });

  const statusColor = [
    { name: 'WIP', color: 'green' },
    { name: 'PLANNING', color: 'yellow' },
    { name: 'BLOCKED', color: 'red' },
    { name: 'BACKLOG', color: 'blue' },
  ];

  getTableRecord(planTableId).eachPage(function page(records) {
    const planFields = records.map((el) => el.fields);

    const planHtml = planFields
      .map((el) => {
        console.log(el.Status);
        console.log(el);

        const [status] = statusColor.filter((xx) => {
          return xx.name === el.Status;
        });

        console.log(status?.name);

        return `<tr class="table_row rd"><td class="table_cell rdmp"><div>${el.Project}</div></td><td class="table_cell c"><div class="status ${status?.color} ">${el.Status}</div></td><td class="table_cell rdmp-2"><div>${el['Quarterly Delivery']}</div></td></tr>`;
      })
      .join('');

    htmlTableWrap.innerHTML = planHtml;
  });

  console.log('Rewards');
});

`<div class="h-flex gap-25"><div class="eta-quarter"><div>Q1 2024</div></div><div class="eta-range"><div class="eta-range-value _1"><div class="range-percent">30%</div></div></div></div>`;

//tableId
`<tr class="table_row rd"><td class="table_cell rdmp"><div>This is some text inside of a div block.</div></td><td class="table_cell c"><div class="status">status</div></td><td class="table_cell rdmp-2"><div>This is some text inside of a div block.</div></td></tr>`;
