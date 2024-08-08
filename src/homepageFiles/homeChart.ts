import test from '@playwright/test';
import Airtable, { type FieldSet, type Records } from 'airtable';
import { getTableRecordSecondBase } from 'src/airtable-values';
import {
  getColumnData,
  getColumnNumberData,
  getColumnWoWDataFormated,
  isMobile,
  numberWithCommas,
  pieSecondValue,
  pieValueExtract,
  roundToFiveDecimalPlaces,
} from 'src/helperFunction';

import {
  chartOnlineShareApac,
  plotLineChart,
  plotLineChart3DataPoint,
  plotPieChart,
} from '../chartFunction';

const airtableToken =
  'patdwE10W5YOIwOla.4a633223c06422d5a54fdcc94b427170221e267365c08a0e0f9a894cffad3904';

Airtable.configure({ apiKey: airtableToken });

const baseInstance = new Airtable().base('appRQPFdsg8bGEHBO');

export const getTableRecord = function (tableId: string) {
  return baseInstance(tableId).select({
    view: 'Grid view',
  });
};

const emeaChartWrap = document.getElementById('emeaChart') as HTMLElement;
const apacChartWrap = document.getElementById('apacChart') as HTMLElement;
const downloadPieChart = document.getElementById('downloadPie') as HTMLElement;
const overallPieChartWrap = document.getElementById('overallPieChart') as HTMLElement;
const apacPieChartWrap = document.getElementById('apacPieChart') as HTMLElement;
const emeaPieChartWrap = document.getElementById('emeaPieChart') as HTMLElement;

///section ui elements
const downloadSection = document.getElementById('circle') as HTMLElement;
const imageQualitySection = document.querySelector('[section="image-content"]') as HTMLElement;

/////UI element
const appPercent = document.querySelector('[app-percent]') as HTMLElement;
//app download
const appDownloads = document.querySelector('[app-download]') as HTMLElement;

const overallValue = document.querySelector('[overall-value]') as HTMLElement;
const apacvalue = document.querySelector('[apac-value]') as HTMLElement;
const emeaValue = document.querySelector('[emea-value]') as HTMLElement;

//buttons
const emeaWeekBtn = document.querySelector('[week-emeachart]') as HTMLButtonElement;
const emeaMonthBtn = document.querySelector('[month-emeachart]') as HTMLButtonElement;
const emeaQuarterBtn = document.querySelector('[quarter-emeachart]') as HTMLButtonElement;

const emeaTimeframe = document.querySelector('[emea-timeframe]') as HTMLElement;

const allEmeaBtn = document.querySelectorAll('[emea-chart]');

//buttons
const apacWeekBtn = document.querySelector('[week-apacchart]') as HTMLButtonElement;
const apacMonthBtn = document.querySelector('[month-apacchart]') as HTMLButtonElement;
const apacQuarterBtn = document.querySelector('[quarter-apacchart]') as HTMLButtonElement;
const allApacBtn = document.querySelectorAll('[apac-chart]') as any;
const apacTimeframe = document.querySelector('[apac-timeframe]') as HTMLElement;

////
const emeaLoadingEl = document.querySelector('#emeaLoading') as HTMLElement;
const apacLoadingEl = document.querySelector('#apacLoading') as HTMLElement;
///set active button
function setActiveBtn(el: Element) {
  emeaLoadingEl.style.display = `block`;
  allEmeaBtn.forEach((btn) => {
    btn.classList.remove('active');
  });

  el.classList.add('active');
}

///set active button
function setActiveBtnApac(el: Element, allBtn: Array<NodeList>) {
  apacLoadingEl.style.display = `block`;
  allBtn.forEach((btn: any) => {
    btn.classList.remove('active');
  });

  el.classList.add('active');
}

//online Share Weekly table ID
const onlineWeklyTableId = 'tblLNvYTvvUXvs0K7';

//online share monthly table ID
const onlineMonthlyId = 'tblHtSQ3Evr2lgwWu';

//online share quarterly table ID
const onlineQuarterlyTableID = 'tblIDR7EEAwBTxDrg';

interface TableRecordData {
  weeksData: (string | any)[];
  yDataArray: (number | any)[][];
  percentChangeData: (string | any)[][];
  yName: string[];
  colorArray: string[];
  timeRange: string;
}

interface TableRecordDataApac {
  xAxisValue: (string | any)[];
  yChartData: (number | any)[][];
  percentWoWdata: (string | any)[][];
  seriesTitle: string[];
  apacTf: string | any;
}

/////
///btn tab for EMEA CHARTS
////
//Mobile dropdown functionality
const dropDownHeading = document.getElementById('dropHeading') as HTMLElement;
const dropDownHeading2 = document.getElementById('dropHeading2') as HTMLElement;

function addIsOpenClass(el: HTMLElement) {
  if (el)
    el.addEventListener('click', function () {
      //get the parent el
      const parentEl = this.parentElement;
      parentEl?.classList.toggle('is-open');
    });
}

addIsOpenClass(dropDownHeading);
addIsOpenClass(dropDownHeading2);

function handleMbDropOpen(el: HTMLElement, textel: string): void {
  const secParentEl = el.parentElement?.parentElement;
  //get the droptext el
  const dropText = secParentEl?.querySelector('[dropText]') as HTMLElement;
  dropText.textContent = `${textel}`;
  secParentEl?.classList.toggle('is-open');
}

const loopThroughArr = ['CESE OS (MoM)', 'CESE OS (Monthly Average)', 'Month'];

export const onlineChart = async function () {
  ////
  const emeaWeekData = await getTabsData(
    onlineWeklyTableId,
    'x-axis(weeks)',
    'EERUT',
    'NOB',
    'UKIREWE',
    'CESE',
    'MEA OS',
    'EERUT (WoW)',
    'NOB (WoW)',
    'UKIRWE (WoW)',
    'CESE (WoW)',
    'MEA (WoW)',
    'Week'
  );

  const emeaMonthData = await getTabsData(
    onlineMonthlyId,
    'Month',
    'EERUT OS (Monthly Average)',
    'NOB OS (Monthly Average)',
    'UKIRWE OS (Monthly Average)',
    'CESE OS (Monthly Average)',
    'MEA OS (Monthly Average)',
    'EERUT OS (MoM)',
    'NOB OS (MoM)',
    'UKIRWE OS (MoM)',
    'CESE OS (MoM)',
    'MEA OS (MoM)',
    'Month'
  );

  const emeaQuarterData = await getTabsData(
    onlineQuarterlyTableID,
    'x-axis(quarters)',
    'EERUT OS (Quarterly Average)',
    'NOB OS (Quarterly Average)',
    'UKIRWE OS (Quarterly Average)',
    'CESE OS (Quarterly Average)',
    'MEA OS (Quarterly Average)',
    'EERUT QoQ',
    'NOB QoQ',
    'UKIRWE QoQ',
    'CESE QoQ',
    'MEA QoQ',
    'Quarter'
  );

  ///plot on page load
  const { colorArray, percentChangeData, weeksData, yDataArray, yName, timeRange } = emeaWeekData;
  emeaTimeframe.textContent = `${timeRange}`;
  console.log(timeRange);
  plotLineChart(
    emeaChartWrap,
    weeksData,
    yName,
    colorArray,
    yDataArray,
    percentChangeData,
    'WoW',
    emeaLoadingEl
  );
  updateKey('WoW', percentChangeData, yDataArray);

  emeaWeekBtn?.addEventListener('click', function () {
    setActiveBtn(this);
    const { colorArray, percentChangeData, weeksData, yDataArray, yName, timeRange } = emeaWeekData;

    emeaTimeframe.textContent = `${timeRange}`;

    plotLineChart(
      emeaChartWrap,
      weeksData,
      yName,
      colorArray,
      yDataArray,
      percentChangeData,
      'WoW',
      emeaLoadingEl
    );
    updateKey('WoW', percentChangeData, yDataArray);

    const textEl = <string>this.querySelector('div')?.textContent;

    if (isMobile()) {
      handleMbDropOpen(this, textEl);
    }
  });

  emeaMonthBtn?.addEventListener('click', function (): void {
    setActiveBtn(this);
    const { colorArray, percentChangeData, weeksData, yDataArray, yName, timeRange } =
      emeaMonthData;
    emeaTimeframe.textContent = `${timeRange}`;
    plotLineChart(
      emeaChartWrap,
      weeksData,
      yName,
      colorArray,
      yDataArray,
      percentChangeData,
      'MoM',
      emeaLoadingEl
    );
    updateKey('MoM', percentChangeData, yDataArray);

    const textEl = <string>this.querySelector('div')?.textContent;

    if (isMobile()) {
      handleMbDropOpen(this, textEl);
    }
  });

  emeaQuarterBtn.addEventListener('click', function () {
    setActiveBtn(this);

    const { colorArray, percentChangeData, weeksData, yDataArray, yName, timeRange } =
      emeaQuarterData;
    emeaTimeframe.textContent = `${timeRange}`;
    plotLineChart(
      emeaChartWrap,
      weeksData,
      yName,
      colorArray,
      yDataArray,
      percentChangeData,
      'QoQ',
      emeaLoadingEl
    );
    updateKey('QoQ', percentChangeData, yDataArray);

    const textEl = <string>this.querySelector('div')?.textContent;

    if (isMobile()) {
      handleMbDropOpen(this, textEl);
    }
  });
  //
  //
  //
  ////image quality scores benchmark
  //const imageBenId = 'tbl0yB8Gvd71zGiED';

  const chartColor = ['#C1E963', '#7C74EB', '#DCDFE5'];

  ////values input from airtable
  const apacWeeklyData = await getTabsDataApac(
    onlineWeklyTableId,
    'x-axis(weeks)',
    'CN OS',
    'IN OS',
    'SEAP OS',
    'CN (WoW)',
    'IN (WoW)',
    'SEAP (WoW)',
    'Week'
  );

  const apacMonthlyData = await getTabsDataApac(
    onlineMonthlyId,
    'Month',
    'CN OS (Monthly Average)',
    'IN OS (Monthly Average)',
    'SEAP OS (Monthly Average)',
    'CN OS (MoM)',
    'IN OS (MoM)',
    'SEAP OS (MoM)',
    'Month'
  );

  const apacQuarterData = await getTabsDataApac(
    onlineQuarterlyTableID,
    'x-axis(quarters)',
    'CN OS (Quarterly Average)',
    'IN OS (Quarterly Average)',
    'SEAP OS (Quarterly Average)',
    'CN QoQ',
    'IN QoQ',
    'SEAP QoQ',
    'Quarter'
  );

  ////Loading chart on page load
  const minMaxValue = [-5, 20] as number[];
  const { xAxisValue, yChartData, percentWoWdata, seriesTitle, apacTf } = apacWeeklyData;

  apacTimeframe.textContent = `${apacTf}`;
  chartOnlineShareApac(
    apacChartWrap,
    xAxisValue,
    yChartData,
    percentWoWdata,
    seriesTitle,
    chartColor,
    'WoW',
    minMaxValue,
    apacLoadingEl
  );
  updateKeyApac('WoW', percentWoWdata, yChartData);
  ///////
  //btn click
  //////
  apacWeekBtn.addEventListener('click', function () {
    setActiveBtnApac(this, allApacBtn);
    ///
    const { xAxisValue, yChartData, percentWoWdata, seriesTitle, apacTf } = apacWeeklyData;
    apacTimeframe.textContent = `${apacTf}`;
    chartOnlineShareApac(
      apacChartWrap,
      xAxisValue,
      yChartData,
      percentWoWdata,
      seriesTitle,
      chartColor,
      'WoW',
      minMaxValue,
      apacLoadingEl
    );
    updateKeyApac('WoW', percentWoWdata, yChartData);

    //get the text content of the button
    const textEl = <string>this.querySelector('div')?.textContent;

    if (isMobile()) {
      handleMbDropOpen(this, textEl);
    }
  });

  apacMonthBtn.addEventListener('click', function () {
    setActiveBtnApac(this, allApacBtn);

    const { xAxisValue, yChartData, percentWoWdata, seriesTitle, apacTf } = apacMonthlyData;
    apacTimeframe.textContent = `${apacTf}`;
    chartOnlineShareApac(
      apacChartWrap,
      xAxisValue,
      yChartData,
      percentWoWdata,
      seriesTitle,
      chartColor,
      'MoM',
      minMaxValue,
      apacLoadingEl
    );
    updateKeyApac('MoM', percentWoWdata, yChartData);

    const textEl = <string>this.querySelector('div')?.textContent;

    if (isMobile()) {
      handleMbDropOpen(this, textEl);
    }
  });

  apacQuarterBtn.addEventListener('click', function () {
    setActiveBtnApac(this, allApacBtn);

    const { xAxisValue, yChartData, percentWoWdata, seriesTitle, apacTf } = apacQuarterData;
    apacTimeframe.textContent = `${apacTf}`;

    chartOnlineShareApac(
      apacChartWrap,
      xAxisValue,
      yChartData,
      percentWoWdata,
      seriesTitle,
      chartColor,
      'QoQ',
      minMaxValue,
      apacLoadingEl
    );
    updateKeyApac('QoQ', percentWoWdata, yChartData);

    const textEl = <string>this.querySelector('div')?.textContent;

    if (isMobile()) {
      handleMbDropOpen(this, textEl);
    }
  });

  const appdownloadTable = 'tblfZXzNmPsL5rxtw';
  getTableRecordSecondBase(appdownloadTable).eachPage(function page(records: Records<FieldSet>) {
    const [downloadsData] = records
      .map((record) => record.get('Progress Percent'))
      .filter((rec) => rec !== undefined)
      .map((rec: any) => Math.floor(rec * 100))
      .slice(-1);

    const [lastRecord] = records.slice(-1);

    const totalDownloads = <number>lastRecord.fields['Total downloads (Combined)'];
    const totalDownloadsFormat = numberWithCommas(totalDownloads);

    const secondValue = pieSecondValue(downloadsData);

    ////Intersection Observer type interface

    const pieintoView = function (entries: Array<IntersectionObserverEntry>): void {
      entries.forEach((el: { isIntersecting: boolean }) => {
        if (el.isIntersecting) {
          appPercent.textContent = `${downloadsData}%`;
          appDownloads.textContent = `${totalDownloadsFormat}`;
          plotPieChart(downloadPieChart, downloadsData, secondValue, '#7A5AF8');
        }
      });
    };

    const options = {
      threshold: 0.5,
    };
    const newObserve = new IntersectionObserver(pieintoView, options);
    newObserve.observe(downloadSection);
  });
  /////image Quality Score KPIS
  const imageQualityTableID = 'tbl8Ye0eoBXdPGyL5';
  getTableRecord(imageQualityTableID).eachPage(function page(records: Records<FieldSet>) {
    const overallScoreValue = pieValueExtract('Image Quality: Overall Score', records);
    const overallScoreValueSecond = pieSecondValue(overallScoreValue);
    const overallColor = '#BA24D5';

    console.log(records);

    const emeaPieValue = pieValueExtract('Image Quality: EMEA', records);
    const emaePieSecondValue = pieSecondValue(emeaPieValue);
    const emeaColor = '#7839EE';

    const apacPieValue = pieValueExtract('Image Quality: APAC', records);
    const apacSecondValue = pieSecondValue(apacPieValue);
    const apacColor = '#444CE7';

    console.log(overallScoreValue);

    const pieintoView = function (entries: Array<IntersectionObserverEntry>): void {
      entries.forEach((el: { isIntersecting: boolean }) => {
        if (el.isIntersecting) {
          plotPieChart(
            overallPieChartWrap,
            overallScoreValue,
            overallScoreValueSecond,
            overallColor
          );
          overallValue.textContent = `${overallScoreValue}%`;
          plotPieChart(emeaPieChartWrap, emeaPieValue, emaePieSecondValue, emeaColor);
          emeaValue.textContent = `${emeaPieValue}%`;
          plotPieChart(apacPieChartWrap, apacPieValue, apacSecondValue, apacColor);
          apacvalue.textContent = `${apacPieValue}%`;
        }
      });
    };

    const options = {
      threshold: 0.4,
    };
    const newObserve = new IntersectionObserver(pieintoView, options);
    newObserve.observe(imageQualitySection);
  });
};
///EMEA function
function getTabsData(
  tableId: string,
  xAxisData: string,
  eerutName: string,
  nobName: string,
  ukireweName: string,
  ceseName: string,
  meaName: string,
  eerutWoWname: string,
  nobWoWname: string,
  ukirweWoWname: string,
  ceseWoWname: string,
  meaWoWname: string,
  timeframe: string
): Promise<TableRecordData> {
  return new Promise((resolve, reject) => {
    getTableRecord(tableId).eachPage(
      function page(records: Records<FieldSet>) {
        const weeksData = records
          .map((record) => record.get(xAxisData))
          .filter((rec) => rec !== undefined);

        // time data
        const eerutData = getColumnNumberData(eerutName, records);
        const nobData = getColumnNumberData(nobName, records);
        const ukrwData = getColumnNumberData(ukireweName, records);
        const ceseData = getColumnNumberData(ceseName, records);
        const meaData = getColumnNumberData(meaName, records);

        //timeframe
        const [timeRange] = getColumnData(timeframe, records).slice(-1);
        console.log(timeRange);

        // time data Percent change
        const eerutWow = getColumnWoWDataFormated(eerutWoWname, records);
        const nobWow = getColumnWoWDataFormated(nobWoWname, records);
        const ukrWow = getColumnWoWDataFormated(ukirweWoWname, records);
        const ceseWow = getColumnWoWDataFormated(ceseWoWname, records);
        const meaWow = getColumnWoWDataFormated(meaWoWname, records);

        console.log(records);

        const x = records.map((el) => el.fields);

        x.forEach((el) => {
          console.log(el['NOB OS (Monthly Average)']);
        });

        const b = x.map((el, i) => {
          return el[loopThroughArr[i]];
        });

        console.log(b);

        //  NOB OS (Monthly Average)

        const y = x.find((el) => {
          return el['NOB OS (Monthly Average)'];
        });

        console.log(y);

        const yDataArray = [eerutData, nobData, ukrwData, ceseData, meaData];

        const percentChangeData = [eerutWow, nobWow, ukrWow, ceseWow, meaWow];
        const yName = ['EERUT', 'NOB', 'UKIRWE', 'CESE', 'MEA'];
        const colorArray = ['#DADADA', '#C0EA5F', '#F65340', '#7C74EB', '#9EEDFE'];
        // Resolve the Promise with the data
        resolve({
          weeksData,
          yDataArray,
          percentChangeData,
          yName,
          colorArray,
          timeRange,
        });
      },
      function done(err) {
        if (err) {
          reject(err);
        }
      }
    );
  });
}

///APAC function
function getTabsDataApac(
  tableId: string,
  xAxisName: string,
  chinaName: string,
  INname: string,
  seapName: string,
  cnWoWname: string,
  inWoWname: string,
  seapWoWname: string,
  apacTimeframe: string
): Promise<TableRecordDataApac> {
  return new Promise((res, rej) => {
    getTableRecord(tableId).eachPage(
      function page(records: Records<FieldSet>) {
        const xAxisValue = getColumnData(xAxisName, records);
        const chinaData = getColumnData(chinaName, records).map((el) => el * 100) as number[];
        const INData = getColumnData(INname, records).map((el) => el * 100) as number[];
        const seapData = getColumnData(seapName, records).map((el) => el * 100) as number[];

        const chinaDataFormated = chinaData.map((num) => roundToFiveDecimalPlaces(num));
        const INDataFormated = INData.map((num) => roundToFiveDecimalPlaces(num));
        const seapDataFormated = seapData.map((num) => roundToFiveDecimalPlaces(num));

        //Percent change Data
        const chinaWoW = getColumnWoWDataFormated(cnWoWname, records) as number[];
        const idWoW = getColumnWoWDataFormated(inWoWname, records) as number[];
        const seapWoW = getColumnNumberData(seapWoWname, records) as number[];

        const [apacTf] = getColumnData(apacTimeframe, records).slice(-1);
        console.log(apacTf);

        const yChartData: number[][] = [chinaDataFormated, INDataFormated, seapDataFormated];

        const percentWoWdata = [chinaWoW, idWoW, seapWoW];
        const seriesTitle = ['China', 'South Asia', 'SEAP'];
        res({
          xAxisValue,
          yChartData,
          percentWoWdata,
          seriesTitle,
          apacTf,
        });
      },
      function done(err) {
        if (err) {
          rej(err);
        }
      }
    );
  });
}

function updateKey(changeRange: string, percentData: number[][], yDataValue: number[][]) {
  //key percent value
  const [eerut, nod, ukr, cese, mea] = percentData;
  const [lasteerutItem] = eerut.slice(-1);
  const [lastNodItem] = nod.slice(-1);
  const [lastUkrItem] = ukr.slice(-1);
  const [lastCeseItem] = cese.slice(-1);
  const [lastMeaItem] = mea.slice(-1);

  ////
  //key normal value
  const [eerutV, nodV, ukrV, ceseV, meaV] = yDataValue;
  const [eerutVLast] = eerutV.slice(-1);
  const [nodVLast] = nodV.slice(-1);
  const [ukrVLast] = ukrV.slice(-1);
  const [ceseVLast] = ceseV.slice(-1);
  const [meaVLast] = meaV.slice(-1);

  //key wrapper
  const nodKey = document.querySelector('[nod-key]') as HTMLElement;
  const eerutKeyWrapper = document.querySelector('[eerut-key]') as HTMLElement;
  const ukrKeyWrapper = document.querySelector('[ukirwe-key]') as HTMLElement;
  const ceseKeyWrapper = document.querySelector('[cese-key]') as HTMLElement;
  const meaKeyWrapper = document.querySelector('[mea-key]') as HTMLElement;

  nodKey.innerHTML = `<div class="h-s-20">${
    nodVLast ? nodVLast : 'xx'
  }%</div><div class="key--percent"><span class="key__span--text ${
    lastNodItem > 0 ? 'green' : 'red'
  }">${lastNodItem}% </span>${changeRange}</div>`;

  eerutKeyWrapper.innerHTML = `<div class="h-s-20">${eerutVLast}.0%</div><div class="key--percent"><span class="key__span--text ${
    lasteerutItem > 0 ? 'green' : 'red'
  }">${lasteerutItem}% </span>${changeRange}</div>`;

  ukrKeyWrapper.innerHTML = `<div class="h-s-20">${ukrVLast}.0%</div><div class="key--percent"><span class="key__span--text ${
    lastUkrItem > 0 ? 'green' : 'red'
  }">${lastUkrItem}% </span>${changeRange}</div>`;

  ceseKeyWrapper.innerHTML = `<div class="h-s-20">${ceseVLast}.0%</div><div class="key--percent"><span class="key__span--text ${
    lastCeseItem > 0 ? 'green' : 'red'
  }">${lastCeseItem}% </span>${changeRange}</div>`;

  meaKeyWrapper.innerHTML = `<div class="h-s-20">${meaVLast}.0%</div><div class="key--percent"><span class="key__span--text ${
    lastMeaItem > 0 ? 'green' : 'red'
  }">${lastMeaItem}% </span>${changeRange}</div>`;
}

function updateKeyApac(changeRange: string, percentData: number[][], yDataValue: number[][]) {
  //key percent value
  const [chinaPerc, inPerc, seapPerc] = percentData;
  const [chinaPercLastNum] = chinaPerc.slice(-1);
  const [inPercLastNum] = inPerc.slice(-1);
  const [seapPercLastNum] = seapPerc.slice(-1);

  ////
  //key normal value
  const [chinaV, inV, seapV] = yDataValue;
  const [chinavLast] = chinaV.slice(-1);
  const [invLast] = inV.slice(-1);
  const [seapvLast] = seapV.slice(-1);

  //key wrapper
  const chinaKeyWrapper = document.querySelector('[cn-key]') as HTMLElement;
  const inKeyWrapper = document.querySelector('[in-key]') as HTMLElement;
  const seapKeyWrapper = document.querySelector('[seap-key]') as HTMLElement;

  chinaKeyWrapper.innerHTML = `<div class="h-s-20">${
    chinavLast ? chinavLast : 'xx'
  }%</div><div class="key--percent"><span class="key__span--text ${
    chinaPercLastNum > 0 ? 'green' : 'red'
  }">${chinaPercLastNum}% </span>${changeRange}</div>`;

  inKeyWrapper.innerHTML = `<div class="h-s-20">${invLast}%</div><div class="key--percent"><span class="key__span--text ${
    inPercLastNum > 0 ? 'green' : 'red'
  }">${inPercLastNum}% </span>${changeRange}</div>`;

  seapKeyWrapper.innerHTML = `<div class="h-s-20">${seapvLast}%</div><div class="key--percent"><span class="key__span--text ${
    seapPercLastNum > 0 ? 'green' : 'red'
  }">${seapPercLastNum}% </span>${changeRange}</div>`;
}

// chartOnlineShareApac(
//   apacChartWrap,
//   xAxisValue,
//   yChartData,
//   percentChangeData,
//   seriesTitle,
//   chartColor,
//   'WoW'
// );
//  getTableRecordData();
// Usage
// getTabsData()
//   .then((data) => {
//     const { colorArray, percentChangeData, weeksData, yDataArray, yName } = data;
//     plotLineChart(emeaChartWrap, weeksData, yName, colorArray, yDataArray, percentChangeData);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });

///quick table check
// getTableRecord(onlineMonthlyId).eachPage(function page(records: Records<FieldSet>) {
//   //console.log(records);
//   // const xAxisValue = getColumnData('x-axis(weeks)', records);
//   // const chinaData = getColumnData('CN OS', records);
//   // const INData = getColumnData('IN OS', records);
//   // const seapData = getColumnData('SEAP OS', records);
//   console.log(records);

//   const nob = records.map((record) => record.fields['NOB OS (Monthly Average)']);

//   console.log(nob);

//   const nobData = getColumnNumberData('NOB OS (Monthly Average)', records);
//   const cesedata = getColumnNumberData('CESE OS (Monthly Average)', records);
//   console.log(cesedata);

//   console.log(nobData);
//   // console.log(chinaData);

//   // const lineChartData = [xAxisValue, chinaData, INData, seapData];

//   const seriesTitle = ['Radisson hotels', 'Expedia', 'Booking.com'];

//   // chartOnlineShareApac(apacChartWrap, xAxisValue, lineChartData, seriesTitle, lineChartData);
// });
