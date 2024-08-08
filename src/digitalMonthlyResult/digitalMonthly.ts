import { number } from 'echarts';
import { getTableRecord } from 'src/airtable-values';
import { barchartPlot, barchartPlot2, multiInputPieChartDigital } from 'src/chartFunction';
import {
  changeToPercent,
  fixYaxis,
  fixYaxisLeftToRight,
  getColumnData,
  numberWithCommas,
} from 'src/helperFunction';
///Digital Monthly Result first one
const tableId = 'tblvWhzzWu97T3XZA';

///Digital Monthly Result first one
const tableId2 = 'tblITcBULBeuft315';

const tableId3 = 'tblepo7BdqM3rs3qO';

function getRoundedNum(mobielShareV: number): number {
  const y = mobielShareV * 100;
  const x = Math.round(y * 10) / 10;
  return x;
}

const chartScroller = document.querySelector('[scroll-container]') as HTMLElement;
const yAxisWrap = document.querySelector('[y-axis-wrap]') as HTMLElement;

// loading element
const laoadingElemet = document.getElementById('monthLoadingEl') as HTMLElement;

//fixYaxis(chartScroller, yAxisWrap);
fixYaxisLeftToRight(chartScroller, yAxisWrap);

//list container wrapper
const listWrapper = document.getElementById('monthly_filter-wrap') as HTMLElement;

///Filter opening animation
const filterTl = gsap.timeline({ paused: true });

////filter open and close function
const filterContainer = document.getElementById('filterWrap') as HTMLElement;
const filerTitleWrap = document.getElementById('filterTitle') as HTMLElement;

//drop text
const filterDropTx = document.getElementById('dropText') as HTMLElement;

//month kpis wrapper
const monthKpiWrapper = document.getElementById('monthKpis') as HTMLElement;

//convertion rate wrapper
const conversionRateWrapper = document.getElementById('cvrWrapper') as HTMLElement;

//pie chart Wrapper

const pieChartWrap = document.getElementById('pieChartWrap') as HTMLElement;

const pieLegendWrap = document.getElementById('pieLegendwrap') as HTMLElement;

//BAR CHART WRAP
const barChartWrap = document.getElementById('barChart') as HTMLElement;
const revBarChart = document.getElementById('revChart') as HTMLElement;

//Booked Room wrapper
const bookedRoomWrap = document.getElementById('bookedRoom') as HTMLElement;

//web entry Wrap
const webEntryWrap = document.getElementById('webEnteryWrap') as HTMLElement;

//Top 10 visited html
const tableBodyWrap = document.getElementById('tableBody') as HTMLTableElement;

filterTl
  .set(listWrapper, { display: 'flex' })
  .from(listWrapper, { yPercent: 20, opacity: 0, duration: 0.2 })
  .to('.filter-em', { rotate: 0, duration: 0.2 }, '<');

///filter open and closs functions
///check is open class is present
const checkOpen = function (el): boolean {
  return el.classList.contains('open');
};

function playAniation() {
  filterContainer.classList.add('open');
  filterTl.play();
}
function reverseAnimation() {
  filterContainer.classList.remove('open');
  filterTl.reverse();
}

interface RenderItems {
  monthList: (string | any)[];
}

window.Webflow ||= [];
window.Webflow.push(async () => {
  //render the filter items
  const { monthList } = await RenderfilterItems();

  const monthListFilter = monthList.filter((el) => typeof el === 'string');

  const monthListHtml = monthListFilter
    .map((list, i) => {
      return `<button data-month="${list}" class="app_filter-item ${
        i === 0 ? 'active' : ''
      }"><div>${list}</div></button>`;
    })
    .join('');

  listWrapper.innerHTML = monthListHtml;

  ////
  ///get all the buttons
  const allBtn = document.querySelectorAll('[data-month]');
  allBtn.forEach((btn, i) => {
    btn.addEventListener('click', function () {
      //remove active class from other button
      allBtn.forEach((bt, e) => {
        if (i !== e) bt.classList.remove('active');
      });

      //get the text from the btn
      const btnTx = this.getAttribute('data-month');
      filterDropTx.textContent = `${btnTx}`;
      //set active state to btn
      this.classList.add('active');
      DataRow(this);
      DataRow2(this);
      DataRow3(this);
      reverseAnimation();
    });
  });
  ////

  filerTitleWrap.addEventListener('click', function () {
    !checkOpen(filterContainer) ? playAniation() : reverseAnimation();
  });

  DataRow(allBtn[0]);
  DataRow2(allBtn[0]);
  DataRow3(allBtn[0]);
});
///webflow push function end

interface PieObject {
  name: string;
  value: number;
}

const colorArr = ['#16B364', '#06AED4', '#155EEF', '#7A5AF8', '#EE46BC'];

function DataRow(el: any) {
  return new Promise((res, rej) => {
    getTableRecord(tableId).eachPage(function page(records) {
      const fieldsRecord = records.map((rec) => rec.fields);

      //get the data attribute of the clicked button
      const monthData = el.getAttribute('data-month');
      //filter the row of the selected button
      const clickedRowData = fieldsRecord.filter((fieldrec) => fieldrec.Month === monthData);

      ///Pie chart values

      const piePlotValues = clickedRowData.map((el) => {
        const desktopShareV = <number>el['% share desktop'] * 100;
        const mobielShareV = <number>el['% share mobile'] * 100;
        const tabletShareV = <number>el['% share tablet'] * 100;
        const iOsShareV = <number>el['% share iOS'] * 100;
        const androidShareV = <number>el['% share Android'] * 100;

        const desktopShareVFm = Math.round(desktopShareV * 10) / 10;
        const mobielShareVFm = Math.round(mobielShareV * 10) / 10;
        const tabletShareVFm = Math.round(tabletShareV * 10) / 10;
        const iOsShareVFm = Math.round(iOsShareV * 10) / 10;
        const androidShareVFm = Math.round(androidShareV * 10) / 10;

        return [
          { name: 'Desktop', value: desktopShareVFm },
          { name: 'Mobile', value: mobielShareVFm },
          { name: 'Tablet', value: tabletShareVFm },
          { name: 'iOS', value: iOsShareVFm },
          { name: 'Android', value: androidShareVFm },
        ];
      });

      const piePlotValueArr: PieObject[] = piePlotValues[0];
      multiInputPieChartDigital(pieChartWrap, piePlotValueArr, colorArr);

      //render Html Legends
      //legend color arr
      const l_color_arr = ['green', 'sky-blue', 'blue', 'purple', 'pink'];

      const legengHtml = piePlotValueArr
        .map((el, i) => {
          return `<div class="key-wrap"><div class="key-color ${l_color_arr[i]}"></div><div class="t-s-12">${el.name}: ${el.value}%</div></div>`;
        })
        .join('');
      pieLegendWrap.innerHTML = legengHtml;

      ///BAR CHART

      clickedRowData.map((el) => {
        const MoM_Booked_Nowe = getRoundedNum(<number>el['MoM Booked room nights NOWE']);
        const MoM_Booked_CESEE = getRoundedNum(<number>el['MoM Booked room nights CESEE']);
        const MoM_Booked_MEA = getRoundedNum(<number>el['MoM Booked room nights MEA']);
        const MoM_Booked_SA = getRoundedNum(<number>el['MoM Booked room nights SA']);
        const MoM_Booked_Prizeotel = getRoundedNum(<number>el['MoM Booked room nights Prizeotel']);
        const MoM_Booked_SEAP = getRoundedNum(<number>el['MoM Booked room nights SEAP']);
        const MoM_Booked_Russia = getRoundedNum(<number>el['MoM Booked room nights Russia']);
        const MoM_Booked_China = getRoundedNum(<number>el['MoM Booked room nights China']);

        const barValuesArr = [
          MoM_Booked_Nowe,
          MoM_Booked_CESEE,
          MoM_Booked_MEA,
          MoM_Booked_SA,
          MoM_Booked_Prizeotel,
          MoM_Booked_SEAP,
          MoM_Booked_Russia,
          MoM_Booked_China,
        ];

        const valueNameArr = ['NOWE', 'CESEE', 'MEA', 'SA', 'VRS', 'SEAP', 'Russia', 'CHINA'];

        const colorArr = [
          '#099250',
          '#155EEF',
          '#155EEF',
          '#099250',
          '#155EEF',
          '#099250',
          '#155EEF',
          '#099250',
        ];

        barchartPlot(barChartWrap, barValuesArr, valueNameArr, colorArr);
      });

      ////Booked Room Nights by Area

      const bookedRoomArr = clickedRowData.map((el) => {
        const Booked_night_Nowe = <number>el['Booked room nights NOWE'];
        const Booked_night_CESEE = <number>el['Booked room nights CESEE'];
        const Booked_night_MEA = <number>el['Booked room nights MEA'];
        const Booked_night_SA = <number>el['Booked room nights SA'];
        const Booked_night_Prizeotel = <number>el['Booked room nights Prizeotel'];
        const Booked_night_SEAP = <number>el['Booked room nights SEAP'];
        const Booked_night_Russia = <number>el['Booked room nights Russia'];
        const Booked_night_China = <number>el['Booked room nights China'];

        //Percent value using 5000 as the upper end value

        const book_nowe_percent = (Booked_night_Nowe / 5000) * 83;
        const book_cesee_percent = (Booked_night_CESEE / 5000) * 83;
        const book_mea_percent = (Booked_night_MEA / 5000) * 83;
        const book_sa_percent = (Booked_night_SA / 5000) * 83;
        const book_prizeotel_percent = (Booked_night_Prizeotel / 5000) * 83;
        const book_seap_percent = (Booked_night_SEAP / 5000) * 83;
        const book_russia_percent = (Booked_night_Russia / 5000) * 83;
        const book_china_percent = (Booked_night_China / 5000) * 83;

        return [
          { name: 'RHG Ops Area: NOWE', value: Booked_night_Nowe, percentValue: book_nowe_percent },
          {
            name: 'RHG Ops Area: CESEE',
            value: Booked_night_CESEE,
            percentValue: book_cesee_percent,
          },
          { name: 'RHG Ops Area: MEA', value: Booked_night_MEA, percentValue: book_mea_percent },
          { name: 'RHG Ops Area: SA', value: Booked_night_SA, percentValue: book_sa_percent },
          {
            name: 'RHG Ops Area: VRS',
            value: Booked_night_Prizeotel,
            percentValue: book_prizeotel_percent,
          },
          { name: 'RHG Ops Area: SEAP', value: Booked_night_SEAP, percentValue: book_seap_percent },
          { name: 'Russia', value: Booked_night_Russia, percentValue: book_russia_percent },
          {
            name: 'RHG Ops Area: China',
            value: Booked_night_China,
            percentValue: book_china_percent,
          },
        ];
      });
      const [bookedRoomsValue] = bookedRoomArr;

      const bookedRoomHtml = bookedRoomsValue
        .map((el) => {
          return `<div class="h-flex gap-25"><div class="book-areas"><div>${el.name}</div></div><div class="book-hotel-range"><div style="width: ${el.percentValue}%;" class="booked-range-value _1"><div class="book-range-text">${el.value}</div></div></div></div>`;
        })
        .join('');

      bookedRoomWrap.innerHTML = bookedRoomHtml;

      ///kpiHtml
      const kpiHtml = clickedRowData
        .map((el) => {
          const visitV = el.Visits;
          const visitsUplift = el['Visits uplift'];
          const visitVFormatd = numberWithCommas(visitV);
          const visitsUpliftFormatd = changeToPercent(visitsUplift);

          const roomNightV = el['Room nights'];
          const roomNightUplift = el['Room nights uplift'];

          const roomNightVFormatd = numberWithCommas(roomNightV);
          const roomNightUpliftFormatd = changeToPercent(roomNightUplift);

          const RevenueV = el.Revenue;
          const RevenueUplift = el['Revenue uplift'];
          const RevenueVFormatd = numberWithCommas(RevenueV);
          const RevenueUpliftFormatd = changeToPercent(RevenueUplift);

          return `<div rd-element="totalRevenue" id="w-node-a49779b8-96d3-6636-d536-cc1b9527c597-fe12cacf" class="performace-grid-col shdow"><div>Visits</div><div id="totalRev" rd-element="totalRev" class="h-s-40">${visitVFormatd}</div><div><div rd-element="revUplift" class="grey-white"><span class="${
            visitsUpliftFormatd > 0 ? 'green' : 'red'
          }">${
            visitsUpliftFormatd > 0 ? '+' : ''
          }${visitsUpliftFormatd}%</span> uplift MoM</div></div></div><div rd-element="totalRevenue" id="w-node-_5d42fa3d-7e92-d154-2ec5-769f0ee39b71-fe12cacf" class="performace-grid-col shdow"><div>Room nights</div><div id="totalRev" rd-element="totalRev" class="h-s-40">${roomNightVFormatd}</div><div><div rd-element="revUplift" class="grey-white"><span class="${
            roomNightUpliftFormatd > 0 ? 'green' : 'red'
          }">${
            roomNightUpliftFormatd > 0 ? '+' : ''
          }${roomNightUpliftFormatd}%</span> uplift MoM</div></div></div><div rd-element="totalRevenue" id="w-node-_2a07c614-9ca0-b87e-d9df-518182a0b4a0-fe12cacf" class="performace-grid-col shdow"><div>Revenue</div><div id="totalRev" rd-element="totalRev" class="h-s-40">${RevenueVFormatd}</div><div><div rd-element="revUplift" class="grey-white"><span class="${
            RevenueUpliftFormatd > 0 ? 'green' : 'red'
          }">${
            RevenueUpliftFormatd > 0 ? '+' : ''
          }${RevenueUpliftFormatd}%</span> uplift MoM</div></div></div>`;
        })
        .join('');

      monthKpiWrapper.innerHTML = kpiHtml;

      const conversionRateHtml = clickedRowData
        .map((el) => {
          //  const
          const cvrDesk = el['CVR desktop'];
          const cvrDeskPerc = changeToPercent(cvrDesk);

          const cvrMobile = el['CVR mobile'];
          const cvrMobilePerc = changeToPercent(cvrMobile);

          const cvriOS = el['CVR iOS'];
          const cvriOSPerc = changeToPercent(cvriOS);

          const cvrAndroid = el['CVR Android'];
          const cvrAndroidPerc = changeToPercent(cvrAndroid);

          return `<div id="w-node-_6deeba7d-ff19-911c-5526-32565982d14f-fe12cacf" class="conv-rate--card "><div class="t-s-14 t-c-white">Desktop</div><div class="h-s-40 heading-white">${cvrDeskPerc}%</div><div>2024 target:&nbsp;3.35%</div></div><div id="w-node-_7b1c5a8f-cb1c-b40e-99a9-bdf5375bf50b-fe12cacf" class="conv-rate--card "><div class="t-s-14 t-c-white">Mobile</div><div class="h-s-40 heading-white">${cvrMobilePerc}%</div><div>2024 target:&nbsp;0.90%</div></div><div id="w-node-bf0ccd24-5d21-cccc-210b-cb08e5ad4240-fe12cacf" class="conv-rate--card "><div class="t-s-14 t-c-white">Andriod</div><div class="h-s-40 heading-white">${cvrAndroidPerc}%</div><div>2024 target:&nbsp;18.7%</div></div><div id="w-node-da242a30-c7d9-2e02-8f91-98b9ca0562c6-fe12cacf" class="conv-rate--card "><div class="t-s-14 t-c-white">iOS</div><div class="h-s-40 heading-white">${cvriOSPerc}%</div><div>2024 target:&nbsp;14.8%</div></div>`;
        })
        .join('');

      conversionRateWrapper.innerHTML = conversionRateHtml;
    });
  });
}

function DataRow2(el: any) {
  return new Promise((res, rej) => {
    getTableRecord(tableId2).eachPage(function page(records) {
      const fieldsRecord = records.map((rec) => rec.fields);

      //get the data attribute of the clicked button
      const monthData = el.getAttribute('data-month');
      //filter the row of the selected button
      const clickedRowData = fieldsRecord.filter((fieldrec) => fieldrec.Month === monthData);

      ///Pie chart values

      //render Html Legends

      ///BAR CHART

      clickedRowData.map((el) => {
        const en_value = <number>el.EN;
        const ru_value = <number>el.RU;
        const de_value = <number>el.DE;
        const fr_value = <number>el.FR;
        const ar_value = <number>el.AR;
        const fi_value = <number>el.FI;
        const no_value = <number>el.NO;
        const pl_value = <number>el.PL;
        const sv_value = <number>el.SV;
        const tr_value = <number>el.TR;
        const nl_value = <number>el.NL;
        const it_value = <number>el.IT;
        const es_value = <number>el.ES;
        const da_value = <number>el.DA;
        const pt_value = <number>el.PT;
        const zh_value = <number>el.ZH;
        const ro_value = <number>el.RO;
        const hu_value = <number>el.HU;
        const vi_value = <number>el.VI;
        const hr_value = <number>el.HR;
        const et_value = <number>el.ET;
        const lt_value = <number>el.LT;
        const lv_value = <number>el.LV;
        const zt_value = <number>el.ZT;
        const uk_value = <number>el.UK;
        const hi_value = <number>el.HI;
        const el_value = <number>el.EL;
        const he_value = <number>el.HE;
        const cs_value = <number>el.CS;
        const ko_value = <number>el.KO;
        const ja_value = <number>el.JA;
        const is_value = <number>el.IS;
        const iw_value = <number>el.IW;

        const barValue: number[] = [
          en_value,
          ru_value,
          de_value,
          fr_value,
          ar_value,
          fi_value,
          no_value,
          pl_value,
          sv_value,
          tr_value,
          nl_value,
          it_value,
          es_value,
          da_value,
          pt_value,
          zh_value,
          ro_value,
          hu_value,
          vi_value,
          hr_value,
          et_value,
          lt_value,
          lv_value,
          zt_value,
          uk_value,
          hi_value,
          el_value,
          he_value,
          cs_value,
          ko_value,
          ja_value,
          is_value,
          iw_value,
        ];

        const barName = [
          'EN',
          'RU',
          'DE',
          'FR',
          'AR',
          'FI',
          'No',
          'PL',
          'SV',
          'TR',
          'NL',
          'IT',
          'ES',
          'DA',
          'PT',
          'ZH',
          'RO',
          'HU',
          'VI',
          'HR',
          'ET',
          'LT',
          'LV',
          'ZT',
          'UK',
          'HI',
          'EL',
          'HE',
          'CS',
          'KO',
          'JA',
          'IS',
          'IW',
        ];

        const colorArr = [
          '#099250',
          '#155EEF',
          '#155EEF',
          '#099250',
          '#155EEF',
          '#099250',
          '#155EEF',
          '#099250',
        ];

        barchartPlot2(revBarChart, barValue, barName, colorArr);

        // barchartPlot(barChartWrap, barValuesArr, valueNameArr, colorArr);
      });
    });
  });
}

function DataRow3(el: any) {
  return new Promise((res, rej) => {
    getTableRecord(tableId3).eachPage(function page(records) {
      const fieldsRecord = records.map((rec) => rec.fields);

      //get the data attribute of the clicked button
      const monthData = el.getAttribute('data-month');

      //filter the row of the selected button
      const clickedRowData = fieldsRecord.filter((fieldrec) => fieldrec.Month === monthData);

      //web main entry
      const webMainEntry = clickedRowData.map((el) => {
        const section1 = el['Section 1'];
        const section1_visits = numberWithCommas(el['Section 1 - visits']);
        const section1_percent = getRoundedNum(<number>el['Section 1 - percentage']);

        const section2 = el['Section 2'];
        const section2_visits = numberWithCommas(el['Section 2 - visits']);
        const section2_percent = getRoundedNum(<number>el['Section 2 - percentage']);

        const section3 = el['Section 3'];
        const section3_visits = numberWithCommas(el['Section 3 - visits']);
        const section3_percent = getRoundedNum(<number>el['Section 3 - percentage']);

        const section4 = el['Section 4'];
        const section4_visits = numberWithCommas(el['Section 4 - visits']);
        const section4_percent = getRoundedNum(<number>el['Section 4 - percentage']);

        const section5 = el['Section 5'];
        const section5_visits = numberWithCommas(el['Section 5 - visits']);
        const section5_percent = getRoundedNum(<number>el['Section 5 - percentage']);

        const section6 = el['Section 6'];
        const section6_visits = numberWithCommas(el['Section 6 - visits']);
        const section6_percent = getRoundedNum(<number>el['Section 6 - percentage']);

        const section7 = el['Section 7'];
        const section7_visits = numberWithCommas(el['Section 7 - visits']);
        const section7_percent = getRoundedNum(<number>el['Section 7 - percentage']);

        const section8 = el['Section 8'];
        const section8_visits = numberWithCommas(el['Section 8 - visits']);
        const section8_percent = getRoundedNum(<number>el['Section 8 - percentage']);

        const section9 = el['Section 9'];
        const section9_visits = numberWithCommas(el['Section 9 - visits']);
        const section9_percent = getRoundedNum(<number>el['Section 9 - percentage']);

        const section10 = el['Section 10'];
        const section10_visits = numberWithCommas(el['Section 10 - visits']);
        const section10_percent = getRoundedNum(<number>el['Section 10 - percentage']);

        return [
          {
            sectionName: section1,
            sectionVisits: section1_visits,
            sectionPercent: section1_percent,
          },
          {
            sectionName: section2,
            sectionVisits: section2_visits,
            sectionPercent: section2_percent,
          },
          {
            sectionName: section3,
            sectionVisits: section3_visits,
            sectionPercent: section3_percent,
          },
          {
            sectionName: section4,
            sectionVisits: section4_visits,
            sectionPercent: section4_percent,
          },
          {
            sectionName: section5,
            sectionVisits: section5_visits,
            sectionPercent: section5_percent,
          },
          {
            sectionName: section6,
            sectionVisits: section6_visits,
            sectionPercent: section6_percent,
          },
          {
            sectionName: section7,
            sectionVisits: section7_visits,
            sectionPercent: section7_percent,
          },
          {
            sectionName: section8,
            sectionVisits: section8_visits,
            sectionPercent: section8_percent,
          },
          {
            sectionName: section9,
            sectionVisits: section9_visits,
            sectionPercent: section9_percent,
          },
          {
            sectionName: section10,
            sectionVisits: section10_visits,
            sectionPercent: section10_percent,
          },
        ];
      });
      const [webMainEntryArr] = webMainEntry;
      const webMainEntryArrHtml = webMainEntryArr
        .map((el) => {
          return `<div class="h-flex gap-25"><div class="entry-sec-heading"><div class="h-color-white _w-500">${el?.sectionName}</div><div class="h-flex-sb"><div class="t-c-purple _w-500">${el?.sectionVisits} visits</div><div>${el?.sectionPercent}%</div></div></div><div class="web-entry-range-bg"><div style="width: ${el?.sectionPercent}%" class="web-entry-rangecvalue _1"></div></div></div>`;
        })
        .join('');

      webEntryWrap.innerHTML = webMainEntryArrHtml;

      laoadingElemet.style.display = ` none`;

      const visitedArr = clickedRowData.map((el) => {
        const topWebHotels = <string[]>el['Web - top 10 hotels'];
        const topAppHotels = <string[]>el['App - top 10 hotels'];

        return [
          { web: topWebHotels[0], app: topAppHotels[0] },
          { web: topWebHotels[1], app: topAppHotels[1] },
          { web: topWebHotels[2], app: topAppHotels[2] },
          { web: topWebHotels[3], app: topAppHotels[3] },
          { web: topWebHotels[4], app: topAppHotels[4] },
          { web: topWebHotels[5], app: topAppHotels[5] },
          { web: topWebHotels[6], app: topAppHotels[6] },
          { web: topWebHotels[7], app: topAppHotels[7] },
          { web: topWebHotels[8], app: topAppHotels[8] },
          { web: topWebHotels[9], app: topAppHotels[9] },
        ];
      });

      const [visitedArrValues] = visitedArr;

      const visitedArrHtml = visitedArrValues
        .map((el, i) => {
          return `<tr class="table_row"><td class="table_cell"><div class="h-flex gap-12"><div class="index-num">${
            i + 1
          }</div><div class="t-s-14">${
            el?.web
          }</div></div></td><td class="table_cell"><div class="t-s-14">${el?.app}</div></td></tr>`;
        })
        .join('');

      tableBodyWrap.innerHTML = visitedArrHtml;
    });
  });
}

function RenderfilterItems(): Promise<RenderItems> {
  return new Promise((res, rej) => {
    getTableRecord(tableId).eachPage(
      function page(records) {
        const monthList = getColumnData('Month', records) as string[];
        res({ monthList });
      },
      function error(err) {
        if (err) {
          rej(err);
          console.log(err);
        }
      }
    );
  });
}

`<div class="h-flex gap-25"><div class="entry-sec-heading"><div class="h-color-white _w-500">hotels</div><div class="h-flex-sb"><div class="t-c-purple _w-500">2,078,316</div><div>53.0%</div></div></div><div class="web-entry-range-bg"><div class="web-entry-rangecvalue _1"></div></div></div>`;

//`<div class="key-wrap"><div class="key-color ${color[i]"></div><div class="t-s-12">${name} ${v}</div></div>`;

`<tr class="table_row"><td class="table_cell"><div class="h-flex gap-12"><div class="index-num">1</div><div class="t-s-14">Radisson Collection Resort Sochi SPA</div></div></td><td class="table_cell"><div class="t-s-14">Radisson Collection Resort Sochi SPA</div></td></tr>`;
