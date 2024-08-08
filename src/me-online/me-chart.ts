import { type FieldSet, type Records } from 'airtable';
import { number } from 'echarts';
import { plotLineChart2DataPoint } from 'src/chartFunction';
import { getTableRecord } from 'src/homepageFiles/homeChart';

import {
  changeToPercent,
  fixYaxis,
  getColumnData,
  getColumnNumberData,
  getColumnWoWDataFormated,
  numberWithCommas,
  pieSecondValue,
  pieValueExtract,
  pieValueExtractPercent,
} from '../helperFunction';

const ombtTabelId = 'tbl4ueTwB1q5I84F0';

window.Webflow ||= [];
window.Webflow.push(() => {
  /////
  /////
  //HTML elements
  const chartWrapper = document.getElementById('rfpInstantBooking') as HTMLElement;
  const bookingsKeyWrap = document.getElementById('bookingsKey') as HTMLElement;

  const meFunnelEls = document.querySelectorAll('[me-funnel]');

  const funnelWrap = document.querySelector('#funnelWrap') as HTMLElement;

  ///scroll elements

  const chartScroller = document.querySelector('[scroll-container]') as HTMLElement;
  const yAxisWrap = document.querySelector('[y-axis-wrap]') as HTMLElement;
  //funnel loading
  //const funnelLoading = document.getElementById('meFunnelLoading') as HTMLElement;

  fixYaxis(chartScroller, yAxisWrap);

  //swiper instance
  //swiperloadingEl
  const swiperLoadingEl = document.getElementById('swiperLoadingEl') as HTMLElement;
  const swiperWrapper = document.getElementById('bookingSlide') as HTMLElement;
  const swiper = new Swiper(swiperWrapper, {
    slidesPerView: 3,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      // when window width is >= 640px
      992: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
    },
    spaceBetween: 16,
    navigation: {
      nextEl: '.next',
      prevEl: '.prev',
    },
    pagination: {
      el: '#keyPagi',
      type: 'bullets',
      clickable: true,
      // dynamicBullets: true,
      // dynamicBullets: false,
    },
    init: false,
  });

  ///

  getTableRecord(ombtTabelId).eachPage(function page(records: Records<FieldSet>) {
    const weeksData = getColumnData('x-axis(week)', records) as string[];
    const instantBookingsData = getColumnData('Instant Bookings', records) as number[];
    const rfpBookingsData = getColumnData('RFP Bookings', records) as number[];
    const instantPercentWoW = getColumnWoWDataFormated('Instant Bookings (WoW)', records);
    const rfpPercentWoW = getColumnWoWDataFormated('RFP Bookings (WoW)', records);

    const colorArr: string[] = ['#C1E963', '#7C74EB'];
    const nameArr: string[] = ['Instant bookings', 'RFP bookings'];

    plotLineChart2DataPoint(
      chartWrapper,
      weeksData,
      instantBookingsData,
      rfpBookingsData,
      instantPercentWoW,
      rfpPercentWoW,
      nameArr,
      colorArr
    );
    /////
    ////
    //chart Key
    const recordField = records.map((el) => el.fields).reverse();

    const rfpInstantBookingKey = recordField
      .map((el) => {
        const ibWow = changeToPercent(el['Instant Bookings (WoW)']);
        const rfpWow = changeToPercent(el['RFP Bookings (WoW)']);

        return `<div class="booking-slide-wrap shdow swiper-slide"><div class="t-s-20 _w-500 h-whote ">${
          el['Week Start Date']
        } ${
          el['x-axis(week)']
        }</div><div class="h-line full"></div><div class="v-flex gap-8"><div class="h-flex sb"><div id="w-node-_5d5ab1f8-2c70-d47d-5b83-de0909e87fa5-fb879aae">Total Instant bookings</div><div>: ${
          el['Instant Bookings']
        }</div><div class="${ibWow >= 0 ? 'green' : 'red'}">${
          ibWow >= 0 ? '+' : ''
        }${ibWow}%</div></div><div class="h-flex sb"><div id="w-node-c727aa0e-8d2b-030c-b4b7-f41b8c423423-fb879aae">Total RFP bookings</div><div>: ${
          el['RFP Bookings']
        }</div><div class="${rfpWow >= 0 ? 'green' : 'red'}">${
          rfpWow >= 0 ? '+' : ''
        }${rfpWow}%</div></div></div></div>`;
      })
      .join('');

    bookingsKeyWrap.innerHTML = rfpInstantBookingKey;
    swiper.init();
    swiperLoadingEl.style.display = `none`;

    ////
    ////
  });

  ///

  function roundToTwoDecimalPlaces(number) {
    return Number((number * 100).toFixed(1));
  }
  ///
  //M & E Online KPIs
  const meKPIsID = 'tblmQlut5fLek2EpV';
  getTableRecord(meKPIsID).eachPage(function page(records: Records<FieldSet>) {
    console.log(records);
    const meKPIs = records.map((rec) => rec.fields);

    const kpisArr = meKPIs
      .map((kpi) => {
        console.log(kpi);
        ///values
        const seResultV = numberWithCommas(kpi['Search Results visits']);
        const rmDisplayV = numberWithCommas(kpi['Room Display visits']);
        const checkoutV = numberWithCommas(kpi['Checkout visits']);
        const confirnV = numberWithCommas(kpi['Confirmation visits']);

        ///percentage values
        const seResultVPerc = roundToTwoDecimalPlaces(kpi['Search Results visits percentage']);
        const rmDisplayVPerc = roundToTwoDecimalPlaces(kpi['Room Display visits percentage']);
        const checkoutVPerc = roundToTwoDecimalPlaces(kpi['Checkout visits percentage']);
        const confirnVPerc = roundToTwoDecimalPlaces(kpi['Confirmation visits percentage']);

        return `<div me-funnel="" class="h-flex gap-48"><div class="booking-title"><div class="t-s-20 _w-500 t-c-white">ME search results</div><div class="h-flex gap-16"><div class="_w-500 t-c-purple">${seResultV}</div><div>${seResultVPerc}%</div></div></div><div class="funnel-range-wrap"><div  style="width: ${seResultVPerc}%"class="range-value"></div></div></div><div me-funnel="" class="h-flex gap-48"><div class="booking-title"><div class="t-s-20 _w-500 t-c-white">ME room display</div><div class="h-flex gap-16"><div class="_w-500 t-c-purple">${rmDisplayV}</div><div>${rmDisplayVPerc}%</div></div></div><div class="funnel-range-wrap"><div style="width: ${rmDisplayVPerc}%" class="range-value _2"></div></div></div><div me-funnel="" class="h-flex gap-48"><div class="booking-title"><div class="t-s-20 _w-500 t-c-white">ME checkout</div><div class="h-flex gap-16"><div class="_w-500 t-c-purple">${checkoutV}</div><div>${checkoutVPerc}%</div></div></div><div class="funnel-range-wrap"><div style="width: ${checkoutVPerc}%" class="range-value _3"></div></div></div><div me-funnel="" class="h-flex gap-48"><div class="booking-title"><div class="t-s-20 _w-500 t-c-white">ME confirmation</div><div class="h-flex gap-16"><div class="_w-500 t-c-purple">${confirnV}</div><div>${confirnVPerc}%</div></div></div><div class="funnel-range-wrap"><div style="width: ${confirnVPerc}%" class="range-value _4"></div></div></div>`;
      })
      .join('');

    funnelWrap.innerHTML = kpisArr;
    console.log(kpisArr);
  });
  ///
});
