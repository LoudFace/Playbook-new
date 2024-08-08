import { fixYaxis } from 'src/helperFunction';

import { getTableRecord } from './imageQualityChart';
import { imageQualityTableId } from './imageQualityChart';

///key html values

//image quality KPIS
const imageScoreKpi = 'tblmC8Nrz9KepbrI4';

const meaHtml = document.querySelector('[score-mea]') as HTMLElement;
const eeruHtml = document.querySelector('[score-eeru]') as HTMLElement;
const nobaHtml = document.querySelector('[score-noba]') as HTMLElement;
const ceseHtml = document.querySelector('[score-cese]') as HTMLElement;
const chinaHtml = document.querySelector('[score-china]') as HTMLElement;
const seapHtml = document.querySelector('[score-seap]') as HTMLElement;
const saHtml = document.querySelector('[score-sa]') as HTMLElement;

///
const imageKpiWrapper = document.getElementById('iamgeKPIs') as HTMLElement;

const overallScoreValue = document.querySelector('[overall-score]') as HTMLElement;
const iceImages = document.querySelector('[ice-images]') as HTMLElement;

///Y axis scroll fixer
const chartScroller = document.querySelector('[scroll-container]') as HTMLElement;
const yAxisWrap = document.querySelector('[y-axis-wrap]') as HTMLElement;

/////chart label wrapper
//function to update label
const updatelabel = function (wrap: HTMLElement, data: number) {
  wrap.textContent = `${data}`;
};

export const imagePieChartKeyUi = function () {
  ///YAxis scroll
  fixYaxis(chartScroller, yAxisWrap);

  getTableRecord(imageQualityTableId).eachPage(function page(records) {
    const [getLastRole] = records.slice(-1);
    const overAllscore = getLastRole.fields['Overall Score'] as number;
    //  const iceImagesValue = getLastRole.fields[''];

    console.log(overAllscore);
    overallScoreValue.textContent = `${overAllscore}%`;

    ///
    //hero section KPIs

    const metaScore = getLastRole.fields['Middle East, Africa & Turkey Overall Score'] as number;
    //change made
    const ceseScore = getLastRole.fields['CESE & Baltics Overall Score'] as number;
    // const ukirScore = getLastRole.fields['Mediterranean Overall Score'] as number;
    const nobaScore = getLastRole.fields['Nordics & Benelux, UK & Ireland Overall Score'] as number; // name change made
    const eeruScore = getLastRole.fields['Russia Overall Score'] as number;
    const chinaScore = getLastRole.fields['CHINA Overall Score'] as number;
    const saScore = getLastRole.fields['South Asia Overall Score'] as number;
    const seapScore = getLastRole.fields['SEAP Overall Score'] as number;

    updatelabel(meaHtml, metaScore);
    updatelabel(eeruHtml, eeruScore);
    updatelabel(nobaHtml, nobaScore);
    updatelabel(ceseHtml, ceseScore);
    updatelabel(chinaHtml, chinaScore);
    updatelabel(seapHtml, seapScore);
    updatelabel(saHtml, saScore);
  });
};
