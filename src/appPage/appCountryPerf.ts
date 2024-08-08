import { getTable_record_thirdbase, getTableRecord } from 'src/airtable-values';
import {
  app_1line_chart,
  barchartPlot,
  barchartPlot2,
  multiInputPieChartDigital,
} from 'src/chartFunction';
import {
  changeToPercent,
  fixYaxis,
  formatColumnsToPercent,
  getColumnData,
  numberWithCommas,
} from 'src/helperFunction';

const tableId = 'tbl9MATT4YPuRBDbK';

function getRoundedNum(mobielShareV: number): number {
  const y = mobielShareV * 100;
  const x = Math.round(y * 10) / 10;
  return x;
}

///fix scrolling Y axis
const chartScroller = document.querySelector('[scroll-container]') as HTMLElement;
const yAxisWrap = document.querySelector('[y-axis-wrap]') as HTMLElement;

const chartScroller2 = document.querySelector('[scroll-container2]') as HTMLElement;
const yAxisWrap2 = document.querySelector('[y-axis-wrap2]') as HTMLElement;

const chartScroller3 = document.querySelector('[scroll-container3]') as HTMLElement;
const yAxisWrap3 = document.querySelector('[y-axis-wrap3]') as HTMLElement;

const chartScroller4 = document.querySelector('[scroll-container4]') as HTMLElement;
const yAxisWrap4 = document.querySelector('[y-axis-wrap4]') as HTMLElement;

fixYaxis(chartScroller, yAxisWrap);
fixYaxis(chartScroller2, yAxisWrap2);
fixYaxis(chartScroller3, yAxisWrap3);
fixYaxis(chartScroller4, yAxisWrap4);

//loading element
const fitlerLoadingEl = document.getElementById('filterLoadingEl') as HTMLElement;

//list container wrapper
const listWrapper = document.getElementById('monthly_filter-wrap') as HTMLElement;

///Filter opening animation
const filterTl = gsap.timeline({ paused: true });

////filter open and close function
const filterContainer = document.getElementById('filterWrap') as HTMLElement;
const filerTitleWrap = document.getElementById('filterTitle') as HTMLElement;

//drop text
const filterDropTx = document.getElementById('dropText') as HTMLElement;

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
  monthListForm: (string | any)[];
}

//chart htmle
const downloadChartWrap = document.getElementById('downloadsChart') as HTMLElement;
const rmNightChartWrap = document.getElementById('roomNights') as HTMLElement;
const activeUserChartWrap = document.getElementById('appShare') as HTMLElement;
const convertion_rate_chart_wrap = document.getElementById('roomNightShare') as HTMLElement;

window.Webflow ||= [];
window.Webflow.push(async () => {
  //render the filter items
  const { monthListForm } = await RenderfilterItems();

  const monthListFilter = monthListForm.filter((el) => typeof el === 'string');

  //render the items to listwrapper
  // const monthListHtml = monthListFilter
  //   .map((list, i) => {
  //     return `<button data-month="${list}" class="app_filter-item ${
  //       i === 0 ? 'active' : ''
  //     }"><div>${list}</div></button>`;
  //   })
  //   .join('');

  // listWrapper.innerHTML = monthListHtml;

  ////
  ///get all the buttons
  const allBtn = document.querySelectorAll('[tableid]');

  allBtn.forEach((btn, i) => {
    btn.addEventListener('click', function () {
      //remove active class from other button
      allBtn.forEach((bt, e) => {
        if (i !== e) bt.classList.remove('active');
      });

      //get the text from the btn
      const btnTx = this.getAttribute('data-country');
      filterDropTx.textContent = `${btnTx}`;
      //set active state to btn
      this.classList.add('active');

      ///send the btn to the DataRow for update
      DataRow(this);
      //   DataRow2(this);
      //   DataRow3(this);
      reverseAnimation();
    });
  });
  ////
  ////Drop down open function

  filerTitleWrap.addEventListener('click', function () {
    !checkOpen(filterContainer) ? playAniation() : reverseAnimation();
  });

  DataRow(allBtn[0]);
});

function DataRow(el: any) {
  return new Promise((res, rej) => {
    //table ID from the clicked button
    const countryTableId = el.getAttribute('tableid');

    getTable_record_thirdbase(countryTableId).eachPage(function page(records) {
      ////for now
      //download Data
      const getXaxis = <string[]>getColumnData('Month', records);
      const dv = <number[]>getColumnData('Downloads', records);
      const dnMoM = getColumnData('Downloads (MoM)', records);
      const downloadWoW = formatColumnsToPercent(dnMoM);

      const downloadsValue = dv.map((el) => {
        if (typeof el === 'undefined') {
          el = 0;
        }
        return el;
      });
      const yNameArr = ['Downloads'];
      const colorArr = ['#04E762'];

      //Room nights
      const rm = <number[]>getColumnData('Room Nights', records);
      const rmMoM = <number[]>getColumnData('Room Nights (MoM)', records);
      const rmMoMFmed = formatColumnsToPercent(rmMoM);
      const rmName = ['Room Nights'];
      const rmColorArr = ['#0BA5EC'];

      const roomValueY = rm.map((el) => {
        if (typeof el === 'undefined') {
          el = 0;
        }
        return el;
      });

      ///App share
      const as = <number[]>getColumnData('Active Users', records);
      const asYValue = as.map((el) => {
        if (typeof el === 'undefined') {
          el = 0;
        }
        return el;
      });
      const auMoM = getColumnData('Active Users (MoM)', records);
      const auMoMForm = formatColumnsToPercent(auMoM);

      const auName = ['Active Users'];
      const auColorArr = ['#155EEF'];

      //room night share
      const convertion_rate = <number[]>getColumnData('Conversion Rate', records);
      const convertion_rate_Yvalues = convertion_rate.map((el) => {
        if (typeof el === 'undefined') {
          el = 0;
        }
        return getRoundedNum(el);
      });
      const convertion_rateMoM = getColumnData('Conversion Rate (MoM)', records);
      const convertion_rateMoMForm = formatColumnsToPercent(convertion_rateMoM);

      const convertion_rate_Name = ['Conversion Rate'];
      const convertion_rate_color = ['#7A5AF8'];

      app_1line_chart(downloadChartWrap, getXaxis, downloadsValue, downloadWoW, yNameArr, colorArr);
      app_1line_chart(rmNightChartWrap, getXaxis, roomValueY, rmMoMFmed, rmName, rmColorArr);
      app_1line_chart(activeUserChartWrap, getXaxis, asYValue, auMoMForm, auName, auColorArr);
      app_1line_chart(
        convertion_rate_chart_wrap,
        getXaxis,
        convertion_rate_Yvalues,
        convertion_rateMoMForm,
        convertion_rate_Name,
        convertion_rate_color
      );

      fitlerLoadingEl.style.display = `none`;

      // const downloadChartWrap = clickedRowData.map((el) => {
      //   console.log(el);
      // });
    });
  });
}

function RenderfilterItems(): Promise<RenderItems> {
  return new Promise((res, rej) => {
    getTable_record_thirdbase(tableId).eachPage(
      function page(records) {
        const monthList = getColumnData('Month Full', records) as string[];

        const monthListForm = monthList.filter((el) => el !== undefined);
        res({ monthListForm });
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
