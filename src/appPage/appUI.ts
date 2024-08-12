import { type FieldSet, type Records } from 'airtable';
import { getTableRecordSecondBase } from 'src/airtable-values';
import { fixYaxis, getColumnData, numberWithCommas } from 'src/helperFunction';

const appRevTableid = 'tblOlC2ssmMJb4axU';
const appTotalTableId = `tbl1Flnz3zhU2plK6`;

const appMonthTableId = 'tblaEC9oUuXDronxp';

const five_star_reviewWrap = document.getElementById('fiveStar-review') as HTMLElement;
const other_reviewWrap = document.getElementById('otherReview') as HTMLElement;

//card
const googlePlayCardWrap = document.getElementById('googlePlayCard') as HTMLElement;
const appStoreWrap = document.getElementById('appStoreCard') as HTMLElement;
const combinedCardWrap = document.getElementById('combineRateCard') as HTMLElement;

function getRoundedNum(mobielShareV: number): number {
  const y = mobielShareV * 100;
  const x = Math.round(y * 10) / 10;
  return x;
}

export const updateChartScroll = function () {
  ////FIx chart scrolling

  const chartScroller2 = document.querySelector('[scroll-container2]') as HTMLElement;
  const yAxisWrap2 = document.querySelector('[y-axis-wrap2]') as HTMLElement;

  const chartScroller3 = document.querySelector('[scroll-container3]') as HTMLElement;
  const yAxisWrap3 = document.querySelector('[y-axis-wrap3]') as HTMLElement;

  const chartScroller4 = document.querySelector('[scroll-container4]') as HTMLElement;
  const yAxisWrap4 = document.querySelector('[y-axis-wrap4]') as HTMLElement;

  const chartScroller5 = document.querySelector('[scroll-container5]') as HTMLElement;
  const yAxisWrap5 = document.querySelector('[y-axis-wrap5]') as HTMLElement;

  const chartScroller6 = document.querySelector('[scroll-container6]') as HTMLElement;
  const yAxisWrap6 = document.querySelector('[y-axis-wrap6]') as HTMLElement;

  const chartScroller7 = document.querySelector('[scroll-container7]') as HTMLElement;
  const yAxisWrap7 = document.querySelector('[y-axis-wrap7]') as HTMLElement;

  fixYaxis(chartScroller2, yAxisWrap2);
  fixYaxis(chartScroller3, yAxisWrap3);
  fixYaxis(chartScroller4, yAxisWrap4);
  fixYaxis(chartScroller5, yAxisWrap5);
  fixYaxis(chartScroller6, yAxisWrap6);
  fixYaxis(chartScroller7, yAxisWrap7);
};

///Splide instance

const fiveStartSplideHtml = document.getElementById('testiSlide1') as HTMLElement;
const other_ratingHtml = document.getElementById('testiSlide2') as HTMLElement;

const five_star_revSplide = new Splide(fiveStartSplideHtml, {
  type: 'loop',
  direction: 'ttb',
  height: 'auto',
  gap: '1.5rem',
  pagination: false,
  arrows: false,
  autoScroll: {
    speed: 0.4,
  },
});

const other_star_revSplide = new Splide(other_ratingHtml, {
  type: 'loop',
  direction: 'ttb',
  height: 'auto',
  gap: '1.5rem',
  pagination: false,
  arrows: false,
  autoScroll: {
    speed: 0.2,
  },
});
//other_star_revSplide.mount(window.splide.Extensions);

const appRateLoading = document.getElementById('appReviewsLoading') as HTMLElement;

export const appReviews = function () {
  getTableRecordSecondBase(appRevTableid).eachPage(function page(records) {
    const reviews_field = records.map((el) => el.fields);

    const five_star_reviews = reviews_field.filter((el) => el.Rating === 5);
    const less_than_5star = reviews_field.filter((el) => el.Rating < 5);

    const five_star_html = five_star_reviews
      .map((el) => {
        return `<div class="testimonial--slide splide__slide"><div class="star-rating-wrap"><img src="${el.starSVG}" loading="lazy" alt="" class="star--img"></div><div class="review-text-wrap"><div>${el.Review}</div></div><div class="country-flg-wrap"><img src="${el.FlagLink}" loading="lazy" width="75" alt="" class="flg--img"></div></div>`;
      })
      .join('');

    const other_star_html = less_than_5star
      .map((el) => {
        return `<div class="testimonial--slide splide__slide"><div class="star-rating-wrap"><img src="${el.starSVG}" loading="lazy" alt="" class="star--img"></div><div class="review-text-wrap"><div>${el.Review}</div></div><div class="country-flg-wrap"><img src="${el.FlagLink}" loading="lazy" width="75" alt="" class="flg--img"></div></div>`;
      })
      .join('');

    //Append to html
    five_star_reviewWrap.innerHTML = five_star_html;
    other_reviewWrap.innerHTML = other_star_html;

    five_star_revSplide.mount(window.splide.Extensions);
    other_star_revSplide.mount(window.splide.Extensions);

    appRateLoading.style.display = `none`;
  });

  const andRevHtml = document.getElementById('googleReviewsNum') as HTMLElement;
  const andRatHtml = document.getElementById('googleRatingsNum') as HTMLElement;

  const iosRevHtml = document.getElementById('appReviewsNum') as HTMLElement;
  const iosRatHtml = document.getElementById('appRatingsNum') as HTMLElement;

  const comRevHtml = document.getElementById('comReviewsNum') as HTMLElement;
  const comRatHtml = document.getElementById('comRatingsNum') as HTMLElement;

  getTableRecordSecondBase(appTotalTableId).eachPage(function page(records) {
    console.log(records);
    const lastRole = records.map((el) => el.fields).slice(-1);
    lastRole.map((el) => {
      const andRating = el['Android Ratings'];
      const andReviews = el['Android Reviews'];

      const iOSRating = el['iOS Ratings'];
      const iOSReview = el['iOS Reviews'];

      const comRating = el['Combined Ratings'];
      const comReview = el['Combined Reviews'];

      andRevHtml.textContent = `${numberWithCommas(andReviews)}`;
      andRatHtml.textContent = `${numberWithCommas(andRating)}`;

      iosRevHtml.textContent = `${numberWithCommas(iOSReview)}`;
      iosRatHtml.textContent = `${numberWithCommas(iOSRating)}`;

      comRevHtml.textContent = `${numberWithCommas(comReview)}`;
      comRatHtml.textContent = `${numberWithCommas(comRating)}`;
    });
    console.log(lastRole);
  });

  const andAll_values = document.getElementById('googleAllvalues') as HTMLElement;
  const andUpliftWrap = document.getElementById('google-uplift-wrap') as HTMLElement;

  const iosAll_values = document.getElementById('appStoreNum') as HTMLElement;
  const iosUpliftWrap = document.getElementById('app-uplift-wrap') as HTMLElement;

  const comAll_values = document.getElementById('comAllvalues') as HTMLElement;
  const comUpliftWrap = document.getElementById('com-uplift-wrap') as HTMLElement;

  getTableRecordSecondBase(appMonthTableId).eachPage(function page(records) {
    const [[prevYear]] = getColumnData('Previous Year', records).slice(-1);
    const [andYoYRating] = <any>getColumnData('Android Rating (YoY)', records).slice(-1);
    const [andRating] = getColumnData('Android Rating', records).slice(-1);

    const [iosYoYRating] = <any>getColumnData('iOS Rating (YoY)', records).slice(-1);
    const [iosRating] = getColumnData('iOS Rating', records).slice(-1);

    const [comYoYRating] = <any>getColumnData('Combined Rating uplift (YoY)', records).slice(-1);
    const [comRating] = getColumnData('Combined Rating', records).slice(-1);

    const and_html = `<div><span class="${andYoYRating > 0 ? 'green' : 'red'}">+${getRoundedNum(
      andYoYRating
    )}% </span>difference vs previous year</div>`;

    const ios_html = `<div><span class="${iosYoYRating > 0 ? 'green' : 'red'}">+${getRoundedNum(
      iosYoYRating
    )}% </span>difference vs previous year</div>`;

    const com_html = `<div><span class="${comYoYRating > 0 ? 'green' : 'red'}">+${getRoundedNum(
      comYoYRating
    )}% </span>difference vs previous year</div>`;

    andAll_values.textContent = `${andRating}`;
    andUpliftWrap.insertAdjacentHTML('beforeend', and_html);

    iosAll_values.textContent = `${iosRating}`;
    iosUpliftWrap.insertAdjacentHTML('beforeend', ios_html);

    comAll_values.textContent = `${comRating}`;
    comUpliftWrap.insertAdjacentHTML('beforeend', com_html);
  });
};
