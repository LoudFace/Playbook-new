import Airtable, { type FieldSet, type Records } from 'airtable';

import { imageQualityHotelLineChart, plotPieChart } from '../chartFunction';
import {
  getColumnData,
  getColumnNumberData,
  getColumnWoWDataFormated,
  isMobile,
  numberWithCommas,
  pieSecondValue,
  pieValueExtract,
  pieValueExtractPercent,
} from '../helperFunction';
import { imagePieChartKeyUi } from './imageUi';

const airtableToken =
  'patdwE10W5YOIwOla.4a633223c06422d5a54fdcc94b427170221e267365c08a0e0f9a894cffad3904';

Airtable.configure({ apiKey: airtableToken });
const baseInstance = new Airtable().base('appRQPFdsg8bGEHBO');
export const getTableRecord = function (tableId: string) {
  return baseInstance(tableId).select({
    view: 'Grid view',
  });
};

//html element
const pieChartWrap = document.getElementById('me-piechart') as HTMLElement;
const meHtmlValueWrap = document.querySelector('[me-percent]') as HTMLElement;
const meSection = document.getElementById('meSection') as HTMLElement;

///pie chart wrap
const pieChartContainer = document.getElementById('pieChartWrap') as HTMLElement;
const qualityScoresSection = document.querySelector('[quality-score-section]') as HTMLElement;
const scoreValue = document.querySelectorAll('[score-value]');

//pie btn trigger button
const overallBtn = document.querySelector('[overall-btn]') as HTMLButtonElement;
const emeaBtn = document.querySelector('[emea-btn]') as HTMLButtonElement;
const apacBtn = document.querySelector('[apac-btn]') as HTMLButtonElement;

const allBtn = document.querySelectorAll('.pie-btn');

///chart pie key wrap
const pieKeyWrap = [...document.querySelectorAll('.chart__key--container')];
const pieKeyContainer = document.querySelector('[pie-key-wrap]') as HTMLElement;

const ceseFilterArea = document.querySelector('#cese') as HTMLElement;
//pie title
const pieTitle = document.querySelector('[pie-title]') as HTMLElement;
//set Btn active state

const setTitle = function (btn: HTMLElement) {
  const t = btn.getAttribute('title');
  pieTitle.textContent = `${t}`;
};

const setBtnActiveState = function (clickedBtn: HTMLButtonElement) {
  allBtn.forEach((el) => {
    el.classList.remove('active');
  });
  clickedBtn.classList.add('active');
};

//Mobile dropdown functionality
const dropDownHeading = document.getElementById('dropHeading') as HTMLElement;

function addIsOpenClass(el: HTMLElement) {
  if (el)
    el.addEventListener('click', function () {
      //get the parent el
      const parentEl = this.parentElement;
      parentEl?.classList.toggle('is-open');
    });
}

function handleMbDropOpen(el: HTMLElement, textel: string): void {
  const secParentEl = el.parentElement?.parentElement;
  //get the droptext el
  const dropText = secParentEl?.querySelector('[dropText]') as HTMLElement;
  dropText.textContent = `${textel}`;
  secParentEl?.classList.toggle('is-open');
}

addIsOpenClass(dropDownHeading);

export const imageQualityTableId = 'tblmC8Nrz9KepbrI4';

const pieChartPlotControl = function (
  tableId: string,
  rowValue: string,
  htmlWrapper: HTMLElement,
  color: string,
  sectionWrap: HTMLElement,
  htmlValuewrap?: HTMLElement,
  allValue?: any
) {
  getTableRecord(tableId).eachPage(function page(records: Records<FieldSet>) {
    const firstValue = pieValueExtractPercent(rowValue, records);
    const secondValue = pieSecondValue(firstValue);

    const pieintoView = function (entries: Array<IntersectionObserverEntry>): void {
      entries.forEach((el: { isIntersecting: boolean }) => {
        if (el.isIntersecting) {
          plotPieChart(htmlWrapper, firstValue, secondValue, color);
          htmlValuewrap ? (htmlValuewrap.textContent = `${firstValue}%`) : '';

          allValue
            ? allValue.forEach((el: HTMLElement) => {
                el.textContent = `${firstValue}%`;
              })
            : '';
        }
      });
    };

    const options = {
      threshold: 0.4,
    };
    const newObserve = new IntersectionObserver(pieintoView, options);
    newObserve.observe(sectionWrap);
  });
};

//Overall Score
const overallScore = 'Overall Score';
const emeaValue = 'EMEA Overall Score';
const apacValue = 'APAC Overall Score';
const overallColor = '#BA24D5';
const emeaColor = '#7839EE';
const apacColor = '#444CE7';

pieChartPlotControl(
  imageQualityTableId,
  'M&E Score',
  pieChartWrap,
  '#155eef',
  meSection,
  meHtmlValueWrap
);

pieChartPlotControl(
  imageQualityTableId,
  overallScore,
  pieChartContainer,
  overallColor,
  qualityScoresSection,
  undefined,
  scoreValue
);

emeaBtn?.addEventListener('click', function (e) {
  const xx = emeaBtn.getAttribute('filter-btn');
  const activeEl = pieKeyWrap.filter((el) => el.getAttribute('filter-by') === xx);
  pieKeyContainer.innerHTML = ``;
  activeEl.forEach((el) => {
    pieKeyContainer.appendChild(el);
  });

  setTitle(emeaBtn);

  ceseFilterArea.classList.add('no-border');

  pieChartPlotControl(
    imageQualityTableId,
    emeaValue,
    pieChartContainer,
    emeaColor,
    qualityScoresSection,
    undefined,
    scoreValue
  );

  setBtnActiveState(emeaBtn);
  const textEl = <string>this.querySelector('div')?.textContent;

  if (isMobile()) {
    handleMbDropOpen(this, textEl);
  }
});

apacBtn?.addEventListener('click', function (e) {
  const xx = apacBtn.getAttribute('filter-btn');
  const activeEl = pieKeyWrap.filter((el) => el.getAttribute('filter-by') === xx);
  pieKeyContainer.innerHTML = ``;
  activeEl.forEach((el) => {
    pieKeyContainer.appendChild(el);
  });

  setTitle(apacBtn);
  ceseFilterArea.classList.remove('no-border');

  pieChartPlotControl(
    imageQualityTableId,
    apacValue,
    pieChartContainer,
    apacColor,
    qualityScoresSection,
    undefined,
    scoreValue
  );
  setBtnActiveState(apacBtn);

  const textEl = <string>this.querySelector('div')?.textContent;

  if (isMobile()) {
    handleMbDropOpen(this, textEl);
  }
});

overallBtn?.addEventListener('click', function (e) {
  pieKeyContainer.innerHTML = ``;
  pieKeyWrap.forEach((el) => {
    pieKeyContainer.appendChild(el);
  });

  setTitle(overallBtn);
  ceseFilterArea.classList.remove('no-border');
  pieChartPlotControl(
    imageQualityTableId,
    overallScore,
    pieChartContainer,
    overallColor,
    qualityScoresSection,
    undefined,
    scoreValue
  );
  setBtnActiveState(overallBtn);

  const textEl = <string>this.querySelector('div')?.textContent;

  if (isMobile()) {
    handleMbDropOpen(this, textEl);
  }
});

/////line chart

const hotelImagChartWrap = document.getElementById('hotelChart') as HTMLElement;

const loaderElement = document.querySelector('#loaderElement') as HTMLElement;

////image quality scores benchmark
const imageBenId = 'tbl0yB8Gvd71zGiED';
const chartColor = ['#C1E963', '#7C74EB', '#DCDFE5'];
getTableRecord(imageBenId).eachPage(function page(records: Records<FieldSet>) {
  //console.log(records);
  const month = getColumnData('Month Year', records);
  const rhgData = getColumnData('RHG', records);
  const expediaData = getColumnData('Expedia', records);
  const bookingData = getColumnData('Booking', records);

  const lineChartData = [month, rhgData, bookingData, expediaData];

  imageQualityHotelLineChart(hotelImagChartWrap, chartColor, lineChartData, loaderElement);
});

window.Webflow ||= [];
window.Webflow.push(() => {
  imagePieChartKeyUi();
});

// getTableRecord(imageQualityTableId).eachPage(function page(records: Records<FieldSet>) {
//   const meValue = pieValueExtractPercent('M&E Score', records);
//   const meSecondValue = pieSecondValue(meValue);
//   const meColor = `#155EEF`;
//   plotPieChart(pieChartWrap, meValue, meSecondValue, meColor);
// });
