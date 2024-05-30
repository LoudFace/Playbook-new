import Airtable, { type FieldSet, type Records } from 'airtable';
import {
  getColumnData,
  getColumnNumberData,
  getColumnWoWDataFormated,
  numberWithCommas,
  pieSecondValue,
  pieValueExtract,
} from 'src/helperFunction';

import { plotLineChart, plotLineChart3DataPoint, plotPieChart } from '../chartFunction';

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
const appDownloads = document.querySelector('[app-download]') as HTMLElement;

const overallValue = document.querySelector('[overall-value]') as HTMLElement;
const apacvalue = document.querySelector('[apac-value]') as HTMLElement;
const emeaValue = document.querySelector('[emea-value]') as HTMLElement;

//online Share Weekly
const onlineWeklyTableId = 'tblLNvYTvvUXvs0K7';

export const onlineChart = async function () {
  getTableRecord(onlineWeklyTableId).eachPage(function page(records: Records<FieldSet>) {
    const weeksData = records
      .map((record) => record.get('x-axis(weeks)'))
      .filter((rec) => rec !== undefined);

    // const weeksData = getXaxisData('x-axis(weeks', records);
    const eerutData = getColumnNumberData('EERUT', records);
    const nobData = getColumnNumberData('NOB', records);
    const ukrwData = getColumnNumberData('UKIREWE', records);
    const ceseData = getColumnNumberData('CESE', records);
    const meaData = getColumnNumberData('MEA OS', records);

    ///
    const eerutWow = getColumnWoWDataFormated('EERUT (WoW)', records);
    const nobWow = getColumnWoWDataFormated('NOB (WoW)', records);
    const ukrWow = getColumnWoWDataFormated('UKIRWE (WoW)', records);
    const ceseWow = getColumnWoWDataFormated('CESE (WoW)', records);
    const meaWow = getColumnWoWDataFormated('MEA (WoW)', records);

    const yDataArray = [eerutData, nobData, ukrwData, ceseData, meaData];

    const percentChangeData = [eerutWow, nobWow, ukrWow, ceseWow, meaWow];
    const yName = ['EERUT', 'NOB', 'UKIRWE', 'CESE', 'MEA'];
    // const colorArray = [
    //   'var(--color--box-grey)',
    //   'var(--color--box-light-green)',
    //   'var(--color--text-red)',
    //   'var(--color--box-purple)',
    //   'var(--color--box-light-blue)',
    // ];
    const colorArray = ['#DADADA', '#C0EA5F', '#F65340', '#7C74EB', '#9EEDFE'];

    console.log(yDataArray, percentChangeData);

    plotLineChart(emeaChartWrap, weeksData, yName, colorArray, yDataArray, percentChangeData);
  });

  ////image quality scores benchmark
  const imageBenId = 'tbl0yB8Gvd71zGiED';
  const chartColor = ['#C1E963', '#7C74EB', '#DCDFE5'];

  getTableRecord(imageBenId).eachPage(function page(records: Records<FieldSet>) {
    //console.log(records);
    const month = getColumnData('Month Year', records);
    const rhgData = getColumnData('RHG', records);
    const expediaData = getColumnData('Expedia', records);
    const bookingData = getColumnData('Booking', records);

    const lineChartData = [month, rhgData, expediaData, bookingData];

    const seriesTitle = ['Radisson hotels', 'Expedia', 'Booking.com'];

    plotLineChart3DataPoint(apacChartWrap, chartColor, seriesTitle, lineChartData);
  });

  //PIE chart APP DOWNload
  ////Total Downloads
  const appdownloadTable = 'tblCxvDHIID3Z8ncV';
  getTableRecord(appdownloadTable).eachPage(function page(records: Records<FieldSet>) {
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
          appDownloads.textContent = `${totalDownloadsFormat}`;
          appPercent.textContent = `${downloadsData}%`;
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
    console.log(records);

    const overallScoreValue = pieValueExtract('Image Quality: Overall Score', records);
    const overallScoreValueSecond = pieSecondValue(overallScoreValue);
    const overallColor = '#BA24D5';

    const emeaPieValue = pieValueExtract('Image Quality: EMEA', records);
    const emaePieSecondValue = pieSecondValue(emeaPieValue);
    const emeaColor = '#7839EE';

    const apacPieValue = pieValueExtract('Image Quality: APAC', records);
    const apacSecondValue = pieSecondValue(apacPieValue);
    const apacColor = '#444CE7';

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
