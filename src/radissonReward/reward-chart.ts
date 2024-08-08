import Airtable, { type FieldSet, type Records } from 'airtable';
import { getTableRecord } from 'src/airtable-values';
import { chartOnlineShareApac } from 'src/chartFunction';
import {
  fixYaxis,
  getColumnData,
  getColumnNumberData,
  getColumnWoWDataFormated,
  isMobile,
  numberWithCommas,
} from 'src/helperFunction';

interface TableRecordDataApac {
  xAxis: (string | any)[];
  yAxisData: (number | any)[][];
  percentWoWData: (string | any)[][];
  yTitleArr: string[];
}

/// fix y axis scroll
const chartScroller = document.querySelector('[scroll-container]') as HTMLElement;
const yAxisWrap = document.querySelector('[y-axis-wrap]') as HTMLElement;
const yAxisWrap2 = document.querySelector('[y-axis-wrap2]') as HTMLElement;

const scollOnline = document.getElementById('webappScroll') as HTMLElement;
const scollORoom = document.getElementById('roomRedemScroll') as HTMLElement;

scollORoom.style.display = `none`;

fixYaxis(chartScroller, yAxisWrap);
fixYaxis(chartScroller, yAxisWrap2);

//Mobile dropdown functionality
const dropDownHeading = document.getElementById('dropHeading') as HTMLElement;
console.log(dropDownHeading);

function addIsOpenClass(el: HTMLElement) {
  if (el)
    el.addEventListener('click', function () {
      //get the parent el
      const parentEl = this.parentElement;
      parentEl?.classList.toggle('is-open');
    });
}

addIsOpenClass(dropDownHeading);

function handleMbDropOpen(el: HTMLElement, textel: string): void {
  const secParentEl = el.parentElement?.parentElement;
  //get the droptext el
  const dropText = secParentEl?.querySelector('[dropText]') as HTMLElement;
  dropText.textContent = `${textel}`;
  secParentEl?.classList.toggle('is-open');
}

//Table ID
const tableId = 'tblcoWdSYmqWdB6Qf';
const chartWrapper = document.getElementById('performaceChart') as HTMLElement;
const loaderEl = document.getElementById('loaderEl') as HTMLElement;
//btn elements
const onlineBtn = document.querySelector('#onlineWebBtn') as HTMLButtonElement;
const roomRemBtn = document.querySelector('[roomAppBtn]') as HTMLButtonElement;
const allBtn = document.querySelectorAll('[webbtn]') as any;
///set active button
function setActiveBtnApac(el: Element, allBtn: Array<NodeList>) {
  loaderEl.style.display = `block`;
  allBtn.forEach((btn: any) => {
    btn.classList.remove('active');
  });

  el.classList.add('active');
}

console.log(roomRemBtn);

const colorArr = ['#C1E963', '#7C74EB', '#DCDFE5'];
const minMax = [10000, 200000];

export const rewardChart = async function () {
  ////load chart on page load
  const { xAxis, yAxisData, percentWoWData, yTitleArr } = await getAirtableChartData(
    'App enrolments',
    'Web enrolments',
    'Total enrolments',
    'App enrolments - MoM',
    'Web enrolments - MoM',
    'Total enrolments - MoM'
  );

  chartOnlineShareApac(
    chartWrapper,
    xAxis,
    yAxisData,
    percentWoWData,
    yTitleArr,
    colorArr,
    'MoM',
    minMax,
    loaderEl
  );

  ///button click handlers
  roomRemBtn.addEventListener('click', async function () {
    const { xAxis, yAxisData, percentWoWData, yTitleArr } = await getAirtableChartData(
      'App room redemption',
      'Web room redemption',
      'Total room redemption',
      'App room redemption - MoM',
      'Web room redemption - MoM',
      'Total room redemption - MoM'
    );

    const minMax = [5000, 15000];

    setActiveBtnApac(this, allBtn);

    ///show scroll y
    scollORoom.style.display = `flex`;
    //hide scrollOnlinr
    scollOnline.style.display = `none`;

    chartOnlineShareApac(
      chartWrapper,
      xAxis,
      yAxisData,
      percentWoWData,
      yTitleArr,
      colorArr,
      'MoM',
      minMax,
      loaderEl
    );

    ////mobile dropdown function
    const textEl = <string>this.querySelector('div')?.textContent;

    if (isMobile()) {
      handleMbDropOpen(this, textEl);
    }
  });

  onlineBtn.addEventListener('click', async function () {
    const { xAxis, yAxisData, percentWoWData, yTitleArr } = await getAirtableChartData(
      'App enrolments',
      'Web enrolments',
      'Total enrolments',
      'App enrolments - MoM',
      'Web enrolments - MoM',
      'Total enrolments - MoM'
    );

    setActiveBtnApac(this, allBtn);

    ///show scroll y
    scollOnline.style.display = `flex`;
    //hide scrollOnlinr
    scollORoom.style.display = `none`;

    chartOnlineShareApac(
      chartWrapper,
      xAxis,
      yAxisData,
      percentWoWData,
      yTitleArr,
      colorArr,
      'MoM',
      minMax,
      loaderEl
    );

    ////mobile dropdown function
    const textEl = <string>this.querySelector('div')?.textContent;

    if (isMobile()) {
      handleMbDropOpen(this, textEl);
    }
  });
};

function getAirtableChartData(
  appString: string,
  webString: string,
  totalString: string,
  appStringPercent: string,
  webStringPercent: string,
  totalStringPercent: string
): Promise<TableRecordDataApac> {
  return new Promise((res, rej) => {
    getTableRecord(tableId).eachPage(function page(records: Records<FieldSet>) {
      console.log(records);

      const xAxis = getColumnData('Month', records) as string[];

      const appEnrolmentData = getColumnData(appString, records) as number[];
      const webEnrolmentData = getColumnData(webString, records) as number[];
      const totalEnrolmentData = getColumnData(totalString, records) as number[];

      //format data

      //percentage change
      const appEnrolPercentChange = getColumnWoWDataFormated(appStringPercent, records) as number[];
      const webEnrolPercentChange = getColumnWoWDataFormated(webStringPercent, records) as number[];
      const totalEnrolPercentChange = getColumnWoWDataFormated(
        totalStringPercent,
        records
      ) as number[];

      console.log(webEnrolPercentChange);

      const yAxisData: number[][] = [webEnrolmentData, appEnrolmentData, totalEnrolmentData];
      const percentWoWData: number[][] = [
        webEnrolPercentChange,
        appEnrolPercentChange,
        totalEnrolPercentChange,
      ];
      const yTitleArr: string[] = ['Web', 'App', 'Total'];

      res({
        xAxis,
        yAxisData,
        percentWoWData,
        yTitleArr,
      });
    });
  });
}
