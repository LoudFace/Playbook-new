import { type FieldSet, type Records } from 'airtable';
import { Axis } from 'echarts';
import { getTableRecord, getTableRecordSecondBase } from 'src/airtable-values';
import {
  app_2line_chart,
  app_histogram_chart,
  barchart_PlotApp_ActiveUser,
  barchartPlotApp,
  plotMonthyDownloads,
} from 'src/chartFunction';
import {
  changeToPercent,
  fixYaxis,
  fixYaxisLeftToRight,
  formatColumnsToPercent,
  FormatMillion,
  getColumnData,
  getColumnNumberData,
  getColumnWoWDataFormated,
  isMobile,
  numberWithCommas,
} from 'src/helperFunction';
//top country Downloads + active users
const tableId = 'tblRm6jvIDgYvC6q7';

//app Monthly Downloads table
const monthTableId = 'tbluFoWvoB7DLCupG';

//app annual target
const appAnnualTableID = 'tblfZXzNmPsL5rxtw';

//active user table ID
const activeTbId = 'tblLsmVGMfrJ3N4TL';

//app ratings and reviews table ID
const appRatingTableId = 'tblaEC9oUuXDronxp';

//app monthly room night table
const app_monthly_tableId = 'tbl1l9gl9rKH8PI9S';

//conversion + revenue table
const app_conRev_tableID = 'tblkbMo2TmIzTIGxS';

//top country RNs + CVR
const cRnTableId = 'tbl3n1J1Hd8a3cgJI';

/////App chart wrappers

const monthlyDownloadWrap = document.getElementById('monthlyDownload') as HTMLElement;

const monthdownlaodValue = document.querySelector('[month-value]') as HTMLElement;

const monthly_infoWrap = document.getElementById('monthlyInfo') as HTMLElement;

const activeUserWrap = document.getElementById('activeUser') as HTMLElement;

const appRatings_chartWrap = document.getElementById('appRatings') as HTMLElement;

const roomBookedChart = document.getElementById('roomBookInstance') as HTMLElement;

const revenueChartWrap = document.getElementById('revenueChart') as HTMLElement;
const conversionChartWrap = document.getElementById('conversionChart') as HTMLElement;

///
const appHeroKpiLoadingEl = document.getElementById('app-KPIs') as HTMLElement;
//funnel loading
//const funnelLoading = document.getElementById('meFunnelLoading') as HTMLElement;

const loadingEl = document.getElementById('monthDownloadLoad') as HTMLElement;

//chart wrappers
const appPerformanceBar = document.getElementById('appPerfomance') as HTMLElement;

function getRoundedNum(mobielShareV: number): number {
  const y = mobielShareV * 100;
  const x = Math.round(y * 10) / 10;
  return x;
}

//app tabs buttons html
const downloadBtn = document.querySelector('[downloads]') as HTMLElement;
const activeUserBtn = document.querySelector('[active-user]') as HTMLElement;
const roomNightsBtn = document.querySelector('[room-nights]') as HTMLElement;
const conversionRateBtn = document.querySelector('[conversion-rate]') as HTMLElement;

const allBtns = document.querySelectorAll('[perf-chart]');

//app performance yscroller
const chartScroller = document.querySelector('[scroll-container]') as HTMLElement;
const yAxisWrap = document.querySelector('[y-axis-wrap]') as HTMLElement;

//other scrollers

const downScroller = document.getElementById('downApp') as HTMLElement;
const activeScroller = document.getElementById('activeApp') as HTMLElement;
const roomScroller = document.getElementById('roomApp') as HTMLElement;
const conScroller = document.getElementById('convApp') as HTMLElement;

const scrollerArr = [downScroller, activeScroller, roomScroller, conScroller];

fixYaxisLeftToRight(chartScroller, yAxisWrap);
fixYaxisLeftToRight(chartScroller, activeScroller);
fixYaxisLeftToRight(chartScroller, roomScroller);
fixYaxisLeftToRight(chartScroller, conScroller);

scrollerArr.forEach((scroll) => {
  scroll.style.display = `none`;
});

///set active button
function setScrollY(i) {
  // emeaLoadingEl.style.display = `block`;
  scrollerArr.forEach((el) => {
    el.style.display = `none`;
  });

  scrollerArr[i].style.display = `flex`;
}

///set active button
function setActiveBtn(el: Element) {
  // emeaLoadingEl.style.display = `block`;
  allBtns.forEach((btn) => {
    btn.classList.remove('active');
  });

  el.classList.add('active');
}
//Mobile dropdown functionality
//const dropDownHeading = document.getElementById('dropHeading') as HTMLElement;
const dropDownHeading2 = document.getElementById('dropHeading2') as HTMLElement;
function addIsOpenClass(el: HTMLElement) {
  if (el)
    el.addEventListener('click', function () {
      //get the parent el
      const parentEl = this.parentElement;
      parentEl?.classList.toggle('is-open');
    });
}

addIsOpenClass(dropDownHeading2);

function handleMbDropOpen(el: HTMLElement, textel: string): void {
  const secParentEl = el.parentElement?.parentElement;
  //get the droptext el
  const dropText = secParentEl?.querySelector('[dropText]') as HTMLElement;
  dropText.textContent = `${textel}`;
  secParentEl?.classList.toggle('is-open');
}
///loading element
const app_performance = document.getElementById('app-perf-loading') as HTMLElement;

export const appChart = async function () {
  //load chart on pageload App performance overview chart
  const { dataArrs, fetchXLabel } = await getBarChartValues(
    tableId,
    'Country',
    'Monthly Downloads',
    'Downloads (YoY)'
  );
  const perfMinMax = [0, 25000];
  barchartPlotApp(appPerformanceBar, dataArrs, fetchXLabel, perfMinMax, 'Downloads');
  app_performance.style.display = `none`;

  scrollerArr[0].style.display = `flex`;

  ///Btn clicks
  downloadBtn.addEventListener('click', async function () {
    setActiveBtn(this);

    const { dataArrs, fetchXLabel } = await getBarChartValues(
      tableId,
      'Country',
      'Monthly Downloads',
      'Downloads (YoY)'
    );
    const perfMinMax = [0, 25000];
    barchartPlotApp(appPerformanceBar, dataArrs, fetchXLabel, perfMinMax, 'Downloads');
    setScrollY(0);

    ///Drop down handling
    const textEl = <string>this.querySelector('div')?.textContent;
    if (isMobile()) {
      handleMbDropOpen(this, textEl);
    }
  });

  activeUserBtn.addEventListener('click', async function () {
    setActiveBtn(this);

    const { dataArrs, fetchXLabel } = await getBarChartValues(
      tableId,
      'Country',
      'Monthly Active Users',
      'Active User (YoY)'
    );
    const perfMinMax = [0, 300000];
    barchartPlotApp(appPerformanceBar, dataArrs, fetchXLabel, perfMinMax, 'Active Users');
    setScrollY(1);

    ///Drop down handling
    const textEl = <string>this.querySelector('div')?.textContent;
    if (isMobile()) {
      handleMbDropOpen(this, textEl);
    }
  });

  roomNightsBtn.addEventListener('click', async function () {
    setActiveBtn(this);

    const { dataArrs, fetchXLabel } = await getBarChartValues(
      cRnTableId,
      'Country',
      'Monthly Room Nights',
      'Room Nights (YoY)'
    );
    const perfMinMax = [0, 30000];
    barchartPlotApp(appPerformanceBar, dataArrs, fetchXLabel, perfMinMax, 'Room Nights');
    setScrollY(2);
    ///Drop down handling
    const textEl = <string>this.querySelector('div')?.textContent;
    if (isMobile()) {
      handleMbDropOpen(this, textEl);
    }
  });

  conversionRateBtn.addEventListener('click', async function () {
    setActiveBtn(this);

    const { dataArrs, fetchXLabel } = await getBarChartValues(
      cRnTableId,
      'Country',
      'Monthly CVR',
      'CVR (YoY)'
    );
    const [cvrArr, cvrPercent] = dataArrs;
    const cvrFmted = cvrArr
      .map((el) => {
        if (typeof el === 'object' || typeof el === 'undefined') el = 0;
        return el;
      })
      .map((el) => getRoundedNum(el));

    const cvrPercentFmtd = cvrPercent.map((el): any => {
      if (el === 'NaN') el = '0';
      return el;
    });
    const newArr = [cvrFmted, cvrPercentFmtd];
    const perfMinMax = [0, 30];
    barchartPlotApp(appPerformanceBar, newArr, fetchXLabel, perfMinMax, 'Conversion Rate');

    setScrollY(3);

    ///Drop down handling
    const textEl = <string>this.querySelector('div')?.textContent;
    if (isMobile()) {
      handleMbDropOpen(this, textEl);
    }
  });

  //monhtly downloads
  const { weeksData, yDataArray, percentChangeData, yName, colorArray } = await getTabsData(
    monthTableId,
    'Month',
    'Total Downloads',
    'iOS Downloads',
    'Android Downloads',
    'Organic Downloads',
    'Campaign Downloads',
    'Total Downloads (MoM)',
    'iOS DL (MoM)',
    'Android DL (MoM)',
    'Organic Downloads (MoM)',
    'Campaign Downloads (MoM)'
  );

  const [monthLast] = weeksData.slice(-1);
  monthdownlaodValue.textContent = `${monthLast}`;
  plotMonthyDownloads(
    monthlyDownloadWrap,
    weeksData,
    yName,
    colorArray,
    yDataArray,
    percentChangeData,
    'MoM'
  );

  ///monthly download hero html
  const monthly_value_wrap = document.querySelector('[download-value-wrap]') as HTMLElement;
  const total_downloads = document.querySelector('[download-value]') as HTMLElement;

  const [totalDownloadArr] = yDataArray;
  const [tt_percentChange] = percentChangeData;
  const [total_downloads_V] = totalDownloadArr.slice(-1);
  const [tt_percent_V] = tt_percentChange.slice(-1);

  total_downloads.textContent = `${numberWithCommas(total_downloads_V)}`;
  const download_percent_html = `<p download-percent-wrap="" class="t-s-14 white-grey"><span download-percent="" class="${
    tt_percent_V > 0 ? 'green' : 'red'
  }">${tt_percent_V}%</span> uplift MoM</p>`;

  monthly_value_wrap.insertAdjacentHTML('beforeend', download_percent_html);

  updateKey('MoM', percentChangeData, yDataArray);

  //monthly downlaods Range
  getTableRecordSecondBase(appAnnualTableID).eachPage(function page(records) {
    const lastRole = records.slice(-1);

    const lastRoleFields = lastRole.map((el) => el.fields);

    const annual_target_Html = lastRoleFields
      .map((el) => {
        const achievedPercent = getRoundedNum(<number>el['Progress Percent']);
        const targetPerent = getRoundedNum(<number>el['Projected Target']);
        const annual_target = FormatMillion(<number>el['Annual Target']);
        const totalDownloads = numberWithCommas(<number>el['Total downloads (Combined)']);

        return `<div class="app_downlpad-grid"><div id="w-node-_3eba5a87-4c98-edc2-5540-c131713696a6-31433050" class="app_grid-col"><div class="h-s-24">${achievedPercent}%</div><div>Achieved to date</div></div><div id="w-node-_45bc3703-f5cf-93ef-a79f-12c28ed41e65-31433050" class="app_grid-col"><div class="h-s-24">${targetPerent}%</div><div>Projected target year to date</div></div><div id="w-node-_67da0700-5d6d-1dd1-9d66-d2943f31b281-31433050" class="app_grid-col"><div class="h-s-24">${annual_target} M</div><div>Downloads target for 2024</div></div></div><div class="month-range-wrap"><div class="app_download--range"><div style="width:${achievedPercent}%" class="app_d-range-value"><div class="app_range-details"><div class="r-flx"><div class="t-s-10">Download year to date</div><div class="_w-500">${totalDownloads}</div></div><div class="arrow-point w-embed"><svg width="1rem" height=".625rem" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M8 8.5L16 0.5H0L8 8.5Z" fill="#26272B"></path></svg></div></div></div></div><div class="app_monthly-wrap"><div class="month"><div>Jan</div><div class="mark"></div></div><div class="month"><div>Feb</div><div class="mark"></div></div><div class="month"><div>Mar</div><div class="mark"></div></div><div class="month"><div>Apr</div><div class="mark"></div></div><div class="month"><div>May</div><div class="mark"></div></div><div class="month"><div>Jun</div><div class="mark"></div></div><div class="month"><div>Jul</div><div class="mark"></div></div><div class="month"><div>Aug</div><div class="mark"></div></div><div class="month"><div>Sep</div><div class="mark"></div></div><div class="month"><div>Oct</div><div class="mark"></div></div><div class="month"><div>Nov</div><div class="mark"></div></div><div class="month"><div>Dec</div><div class="mark hide"></div></div></div></div>`;
      })
      .join('');

    monthly_infoWrap.innerHTML = annual_target_Html;
    loadingEl.style.display = `none`;
  });
  //
  //
  //active user

  const activeUSerLoadingEl = document.getElementById('active-user-loadingel') as HTMLElement;

  const active = await getBarChartValuesActiveUSer(
    activeTbId,
    'Month',
    'Android Active Users',
    'iOS Active Users',
    'Android MoM',
    'iOS MoM'
  );
  const activeDataArr = active.dataArrs;
  const activeLabel = active.fetchXLabel;
  barchart_PlotApp_ActiveUser(activeUserWrap, activeDataArr, activeLabel, 'MoM');
  ///loading elements
  activeUSerLoadingEl.style.display = `none`;

  const appShareValue = document.querySelector('[app-share-value]') as HTMLElement;
  const appValueApp = document.querySelector('[appshare-value-wrap]') as HTMLElement;

  getTableRecordSecondBase(activeTbId).eachPage(function page(records) {
    const [appShareV] = getColumnData('App Share (%)', records).slice(-1);
    appShareValue.textContent = `${getRoundedNum(appShareV)}%`;

    const [percent_change_appshare] = getColumnData('App Share Difference (MoM)', records).slice(
      -1
    );
    const share_percent_html = `<p download-percent-wrap="" class="t-s-14 white-grey"><span download-percent="" class="${
      percent_change_appshare > 0 ? 'green' : 'red'
    }">${getRoundedNum(percent_change_appshare)}%</span> uplift MoM</p>`;

    appValueApp.insertAdjacentHTML('beforeend', share_percent_html);
  });

  ///
  //App ratings
  const { xAxis, iOsRatingValue, androidRatingValue, iOSYoYForm, androidYoYForm } =
    await getAppData(
      appRatingTableId,
      'Month',
      'Android Rating',
      'iOS Rating',
      'Android Rating (YoY)',
      'iOS Rating (YoY)'
    );
  const colorArr = ['#12B76A', '#2E90FA'];
  const appNameArr = ['Android', 'iOS'];
  const ratingMinMax = [0, 5];

  ///updated HTML key
  const iosKey = document.querySelector('[ioslastvalue]') as HTMLElement;
  const andKey = document.querySelector('[androidlastvalue]') as HTMLElement;
  andKey.textContent = `${androidYoYForm.slice(-1)}%`;
  iosKey.textContent = `${iOSYoYForm.slice(-1)}%`;

  app_2line_chart(
    appRatings_chartWrap,
    xAxis,
    androidRatingValue,
    iOsRatingValue,
    androidYoYForm,
    iOSYoYForm,
    appNameArr,
    colorArr,
    ratingMinMax,
    'rating'
  );
  ///

  ///Room nights bookings
  const roomNightsData = await getAppData(
    app_monthly_tableId,
    'Month',
    'Android RNs',
    'iOS RNs',
    'Android RNs (MoM)',
    'iOS RNs (MoM)'
  );
  //console.log(roomNightsData);
  const {
    xAxis: bookxAxis,
    androidRatingValue: andRNs,
    iOsRatingValue: iOSRNs,
    androidYoYForm: andRNsMoM,
    iOSYoYForm: iosRNsMoM,
  } = roomNightsData;

  const bookMinMax = [0, 120000];

  udpateAppInfoKey('MoM', andRNs, iOSRNs, andRNsMoM, iosRNsMoM);

  app_2line_chart(
    roomBookedChart,
    bookxAxis,
    andRNs,
    iOSRNs,
    andRNsMoM,
    iosRNsMoM,
    appNameArr,
    colorArr,
    bookMinMax,
    ''
  );
  ////Room night combined HTML
  const rmValue = document.querySelector('[roomnight-value]') as HTMLElement;
  const rmValueWrap = document.querySelector('[roomnight-value-wrap]') as HTMLElement;

  const rnShareValue = document.querySelector('[roomnight-share-value]') as HTMLElement;
  const rnshareWrap = document.querySelector('[rmshare-value-wrap]') as HTMLElement;

  getTableRecordSecondBase(app_monthly_tableId).eachPage(function page(records) {
    const [rnComb] = getColumnData('Combined RNs', records).slice(-1);
    const [rnCombCoC] = getColumnData('Combined RNs (MoM)', records).slice(-1);

    const [rmV] = getColumnData('App Room Night Share (%)', records).slice(-1);
    const [rmPercentChange] = getColumnData('RN Share Difference (MoM)', records).slice(-1);

    const share_percent_html = `<p download-percent-wrap="" class="t-s-14 white-grey"><span download-percent="" class="${
      rmPercentChange > 0 ? 'green' : 'red'
    }">${getRoundedNum(rmPercentChange)}%</span> uplift MoM</p>`;

    rnshareWrap.insertAdjacentHTML('beforeend', share_percent_html);

    rnShareValue.textContent = `${getRoundedNum(rmV)}%`;

    rmValue.textContent = `${numberWithCommas(rnComb)}`;
    const rm_percent_html = `<p download-percent-wrap="" class="t-s-14 white-grey"><span download-percent="" class="${
      rnCombCoC > 0 ? 'green' : 'red'
    }">${rnCombCoC}%</span> uplift MoM</p>`;

    rmValueWrap.insertAdjacentHTML('beforeend', rm_percent_html);

    //console.log(rnComb);
  });

  const revGeneratedData = await getAppData(
    app_conRev_tableID,
    'Month',
    'Android Revenue',
    'iOS Revenue',
    'Android Rev (YoY)',
    'iOS Rev (YoY)'
  );

  const conversionRateData = await getAppData(
    app_conRev_tableID,
    'Month',
    'Android Conversion',
    'iOS Conversion',
    'Android Conversion (YoY)',
    'iOS Conversion (YoY)'
  );
  ////Combined Rev card html
  const cmRevValue = document.querySelector('[rev-value]') as HTMLElement;
  const cmRevWrap = document.querySelector('[rev-value-wrap]') as HTMLElement;

  getTableRecordSecondBase(app_conRev_tableID).eachPage(function page(records) {
    const [cmRev] = getColumnData('Combined Revenue', records).slice(-2);
    const [cmRevCoC] = getColumnData('Combined Rev (MoM)', records).slice(-2);

    cmRevValue.textContent = `${numberWithCommas(cmRev)} M`;

    const cm_html = `<p download-percent-wrap="" class="t-s-14 white-grey"><span download-percent="" class="${
      cmRevCoC > 0 ? 'green' : 'red'
    }">${getRoundedNum(cmRevCoC)}%</span> uplift MoM</p>`;

    cmRevWrap.insertAdjacentHTML('beforeend', cm_html);

    appHeroKpiLoadingEl.style.display = `none`;
    ///remove loading Element
  });

  ///converion rate Data
  const {
    xAxis: conversionXaxis,
    androidRatingValue: andConvertion,
    iOsRatingValue: iosConverion,
    androidYoYForm: andConvertionYoY,
    iOSYoYForm: iosConverionYoY,
  } = conversionRateData;

  const andConvertionPercent = andConvertion.map((el) => getRoundedNum(el));
  const iOSConvertionPercent = iosConverion.map((el) => getRoundedNum(el));

  const conDataArr = [
    andConvertionPercent,
    iOSConvertionPercent,
    andConvertionYoY,
    iosConverionYoY,
  ];
  udpateConRevKey(
    'YoY',
    andConvertionPercent,
    iOSConvertionPercent,
    andConvertionYoY,
    iosConverionYoY,
    'andconversionwrap',
    'iosconversionwrap',
    '',
    '%'
  );
  app_histogram_chart(conversionChartWrap, conDataArr, conversionXaxis);

  ///Revenue rate Data
  const {
    xAxis: revenueXaxis,
    androidRatingValue: andRev,
    iOsRatingValue: iosRev,
    androidYoYForm: andRevYoY,
    iOSYoYForm: iosRevYoY,
  } = revGeneratedData;

  const revDataArr = [andRev, iosRev, andRevYoY, iosRevYoY];
  // const revNameArr = ['Android', 'iOS'];

  udpateConRevKey('YoY', andRev, iosRev, andRevYoY, iosRevYoY, 'andrevwrap', 'iosrevwrap', '€', '');
  barchart_PlotApp_ActiveUser(revenueChartWrap, revDataArr, revenueXaxis, 'YoY');
};

interface ReturnValueType {
  dataArrs: number[][];
  fetchXLabel: (string[] | any)[];
}

interface ratingsReturnValue {
  xAxis: string[];
  iOsRatingValue: number[];
  androidRatingValue: number[];
  iOSYoYForm: number[];
  androidYoYForm: number[];
}

function getAppData(
  tabelID: string,
  xaxis_label: string,
  firstValue: string,
  secondValue: string,
  firstValue_CoC: string,
  secondValue_CoC: string
): Promise<ratingsReturnValue> {
  return new Promise((res, rej) => {
    getTableRecordSecondBase(tabelID).eachPage(
      function page(records) {
        const x = <string[]>getColumnData(xaxis_label, records);

        const xAxis = x.filter((el) => el !== undefined);
        // const xAxis = <string[]>getColumnData(xaxis_label, records);

        const iOsRatingValue = <number[]>(
          getColumnData(secondValue, records).filter((el) => el !== undefined)
        );

        const androidRatingValue = <number[]>(
          getColumnData(firstValue, records).filter((el) => el !== undefined)
        );

        const androidYoY = <number[]>(
          getColumnData(firstValue_CoC, records).filter((el) => el !== undefined)
        );

        const iOsYoY = <number[]>(
          getColumnData(secondValue_CoC, records).filter((el) => el !== undefined)
        );

        const androidYoYForm = formatColumnsToPercent(androidYoY);
        const iOSYoYForm = formatColumnsToPercent(iOsYoY);

        res({
          xAxis,
          iOsRatingValue,
          androidRatingValue,
          iOSYoYForm,
          androidYoYForm,
        });
      },
      function Err(err) {
        if (err) {
          rej(err);
        }
      }
    );
  });
}

function getBarChartValues(
  tableId: string,
  xAxisLabel: string,
  mainDataString: any,
  percentChage: string
): Promise<ReturnValueType> {
  return new Promise((res, rej) => {
    getTableRecordSecondBase(tableId).eachPage(
      function page(records: Records<FieldSet>) {
        const mainData = <number[]>getColumnData(mainDataString, records);
        const fetchXLabel = <string[]>getColumnData(xAxisLabel, records);
        const percentChange = <number[]>getColumnData(percentChage, records);

        const percentChangeFrm = percentChange.map((el) => changeToPercent(el));

        const dataArrs = <number[][]>[mainData, percentChangeFrm];

        res({
          dataArrs,
          fetchXLabel,
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

function getBarChartValuesActiveUSer(
  tableId: string,
  xAxisLabel: string,
  androidDataString: any,
  iOSDataString: string,
  androidDataStringChange: any,
  iOSDataStringChange: any
): Promise<ReturnValueType> {
  return new Promise((res, rej) => {
    getTableRecordSecondBase(tableId).eachPage(
      function page(records: Records<FieldSet>) {
        const mainDataAnd = <number[]>getColumnData(androidDataString, records);
        const iOs_mainData = <number[]>getColumnData(iOSDataString, records);
        const fetchXLabel = <string[]>getColumnData(xAxisLabel, records);
        const percentChangeAndroid = <number[]>getColumnData(androidDataStringChange, records);
        const percentChangeiOS = <number[]>getColumnData(iOSDataStringChange, records);

        const percentChangeFrmAnd = percentChangeAndroid.map((el) => changeToPercent(el));
        const percentChangeFrmIos = percentChangeiOS.map((el) => changeToPercent(el));

        console.log(percentChangeFrmAnd);

        const dataArrs = <number[][]>[
          mainDataAnd,
          iOs_mainData,
          percentChangeFrmAnd,
          percentChangeFrmIos,
        ];

        res({
          dataArrs,
          fetchXLabel,
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

interface TableRecordData {
  weeksData: (string | any)[];
  yDataArray: (number | any)[][];
  percentChangeData: (string | any)[][];
  yName: string[];
  colorArray: string[];
  // timeRange: string;
}

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
  meaWoWname: string
): Promise<TableRecordData> {
  return new Promise((resolve, reject) => {
    getTableRecordSecondBase(tableId).eachPage(
      function page(records: Records<FieldSet>) {
        const weeksData = records
          .map((record) => record.get(xAxisData))
          .filter((rec) => rec !== undefined);

        // time data
        const totalDownload = getColumnData(eerutName, records);
        const iOs = getColumnData(nobName, records);
        const Android = getColumnData(ukireweName, records);
        const Organic_Downloads = getColumnData(ceseName, records);
        const campaign_downloads = getColumnData(meaName, records);

        // time data Percent change
        const totalDownload_WoW = getColumnWoWDataFormated(eerutWoWname, records);
        const ios_wow = getColumnWoWDataFormated(nobWoWname, records);
        const android_wow = getColumnWoWDataFormated(ukirweWoWname, records);
        const organic_download_wow = getColumnWoWDataFormated(ceseWoWname, records);
        const campaign_downloads_wow = getColumnWoWDataFormated(meaWoWname, records);

        const yDataArray = [totalDownload, iOs, Android, Organic_Downloads, campaign_downloads];

        const percentChangeData = [
          totalDownload_WoW,
          ios_wow,
          android_wow,
          organic_download_wow,
          campaign_downloads_wow,
        ];
        const yName = [
          'Total downloads',
          'iOS',
          'Android',
          'Organic downloads',
          'Campaign downloads',
        ];
        const colorArray = ['#7C74EB', '#9EEDFE', '#FAACA8', '#C0EA5F', '#FBD881'];

        // Resolve the Promise with the data
        resolve({
          weeksData,
          yDataArray,
          percentChangeData,
          yName,
          colorArray,
          // timeRange,
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
  const totalDownload_key_wrap = document.querySelector('[totalDownload-key]') as HTMLElement;
  const iosKey_wrap = document.querySelector('[iOS-key]') as HTMLElement;
  const android_key_wrap = document.querySelector('[android-key]') as HTMLElement;
  const organic_download_keywrap = document.querySelector('[organicdownloads-key]') as HTMLElement;
  const camp_download_keywrap = document.querySelector('[campdownload-key]') as HTMLElement;

  totalDownload_key_wrap.innerHTML = `<div class="h-s-20">${
    nodVLast ? numberWithCommas(nodVLast) : 'xx'
  }</div><div class="key--percent"><span class="key__span--text ${
    lasteerutItem > 0 ? 'green' : 'red'
  }">${lasteerutItem}% </span>${changeRange}</div>`;

  iosKey_wrap.innerHTML = `<div class="h-s-20">${numberWithCommas(
    eerutVLast
  )}</div><div class="key--percent"><span class="key__span--text ${
    lastNodItem > 0 ? 'green' : 'red'
  }">${lastNodItem}% </span>${changeRange}</div>`;

  android_key_wrap.innerHTML = `<div class="h-s-20">${numberWithCommas(
    ukrVLast
  )}</div><div class="key--percent"><span class="key__span--text ${
    lastUkrItem > 0 ? 'green' : 'red'
  }">${lastUkrItem}% </span>${changeRange}</div>`;

  organic_download_keywrap.innerHTML = `<div class="h-s-20">${numberWithCommas(
    ceseVLast
  )}</div><div class="key--percent"><span class="key__span--text ${
    lastCeseItem > 0 ? 'green' : 'red'
  }">${lastCeseItem}% </span>${changeRange}</div>`;

  camp_download_keywrap.innerHTML = `<div class="h-s-20">${numberWithCommas(
    meaVLast
  )}</div><div class="key--percent"><span class="key__span--text ${
    lastMeaItem > 0 ? 'green' : 'red'
  }">${lastMeaItem}% </span>${changeRange}</div>`;
}

function udpateAppInfoKey(
  changeRange: string,
  androidValue: number[],
  iosValue: number[],
  andCoC: any,
  iosCoC: any
) {
  const andData = androidValue.slice(-1);
  const iosData = <number[]>iosValue.slice(-1);
  const andPercentV = andCoC.slice(-1);
  const iosPercentV = iosCoC.slice(-1);

  //Html wrappers
  const andKeyHtml_wrap = document.querySelector('[rd-element="androidRoomnight"]') as HTMLElement;

  const iOSKeyHtml_wrap = document.querySelector('[rd-element="iosRoomnight"]') as HTMLElement;

  andKeyHtml_wrap.innerHTML = ` <div class="h-s-20">${numberWithCommas(
    andData
  )}</div><div class="key--percent"><span class="key__span--text ${
    andPercentV > 0 ? 'green' : 'red'
  }">${andPercentV}% </span>${changeRange}</div>`;

  iOSKeyHtml_wrap.innerHTML = ` <div class="h-s-20">${numberWithCommas(
    iosData
  )}</div><div class="key--percent"><span class="key__span--text ${
    iosPercentV > 0 ? 'green' : 'red'
  }">${iosPercentV}% </span>${changeRange}</div>`;
}

function udpateConRevKey(
  changeRange: string,
  androidValue: number[],
  iosValue: number[],
  andCoC: any,
  iosCoC: any,
  andWrapper: string,
  iOSWrapper: string,
  curSym: string,
  symAfter: string
) {
  const andData = androidValue.slice(-1);
  const iosData = <number[]>iosValue.slice(-1);
  const andPercentV = andCoC.slice(-1);
  const iosPercentV = iosCoC.slice(-1);

  //Html wrappers
  const andKeyHtml_wrap = document.querySelector(`[${andWrapper}]`) as HTMLElement;

  const iOSKeyHtml_wrap = document.querySelector(`[${iOSWrapper}]`) as HTMLElement;

  andKeyHtml_wrap.innerHTML = ` <div class="h-s-20">${curSym}${numberWithCommas(
    andData
  )}${symAfter}</div><div class="key--percent"><span class="key__span--text ${
    andPercentV > 0 ? 'green' : 'red'
  }">${andPercentV}% </span>${changeRange}</div>`;

  iOSKeyHtml_wrap.innerHTML = ` <div class="h-s-20">${curSym}${numberWithCommas(
    iosData
  )}${symAfter}</div><div class="key--percent"><span class="key__span--text ${
    iosPercentV > 0 ? 'green' : 'red'
  }">${iosPercentV}% </span>${changeRange}</div>`;
}
