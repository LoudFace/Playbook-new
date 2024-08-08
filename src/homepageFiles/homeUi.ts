import { type FieldSet, type Records } from 'airtable';
import { getTableRecord, getTableRecordSecondBase } from 'src/airtable-values';
import {
  fixYaxis,
  FormatMillion,
  getColumnData,
  getColumnNumberData,
  getColumnWoWDataFormated,
  numberWithCommas,
} from 'src/helperFunction';

const chartScroller = document.querySelector('[scroll-container]') as HTMLElement;
const yAxisWrap = document.querySelector('[y-axis-wrap]') as HTMLElement;

const chartScroller2 = document.querySelector('[scroll-container-2]') as HTMLElement;
const yAxisWrap2 = document.querySelector('[y-axis-wrap-2]') as HTMLElement;

const totalRevCard = document.querySelector('[rd-element="totalRevenue"]') as HTMLElement;
//totalRev html
const totalRevNumwrapper = document.querySelector('[rd-element="totalRev"]') as HTMLElement;
const totalRevPercentWrapper = document.querySelector('[rd-element="revUplift"]') as HTMLElement;
///Booked html
const bookedNumwrapper = document.querySelector('[rd-element="bookedroom"]') as HTMLElement;
const bookPercentWrap = document.querySelector('[rd-element="bookedPercent"]') as HTMLElement;
/// Enrollment hmtl
const enrolNum = document.getElementById('appEnroll') as HTMLElement;
const enrolPercent = document.querySelector('[rd-element="enrollPercent"]') as HTMLElement;
///Ap download html
const appDownloadNum = document.getElementById('appDownloads') as HTMLElement;
const appdownloadPercent = document.querySelector('[rd-element="appDownload"]') as HTMLElement;
const appDownloadWrap = document.querySelector('[rd-element="appDownload"]') as HTMLElement;

const appTargetEl = document.getElementById('appTargetEl') as HTMLElement;

///KPIs
const webEnrolment = document.querySelector('[web-enrolment]') as HTMLElement;
const memberShare = document.querySelector('[members-share]') as HTMLElement;
const kpisLoadingEl = document.getElementById('kpisLoading') as HTMLElement;

//app download
const appDownloads = document.querySelector('[app-download]') as HTMLElement;

///loadingEl
const perfLoading = document.getElementById('performanceLoading') as HTMLElement;

function percentFormated(fieldName: string, lastRole): number {
  const [percentValue]: any = lastRole.get(fieldName);
  const percentValueFmtd = percentValue * 100;
  return percentValueFmtd;
}

export const homeUIs = function () {
  fixYaxis(chartScroller, yAxisWrap);
  fixYaxis(chartScroller2, yAxisWrap2);

  getTableRecord('tbl8Ye0eoBXdPGyL5').eachPage(function page(records: Records<FieldSet>) {
    //get last role of the record
    const [lastRole] = records.slice(-1);
    //get the fieldValues
    const [totalRev]: any = lastRole.get('Total revenue');
    const [totalRevPercentChange]: any = lastRole.get('Total revenue % change');

    ///remove the laoading el
    perfLoading.style.display = `none`;

    const totalRevPercentChangeFormat = totalRevPercentChange * 100;
    //////total Revenue
    const totalRevFormated = FormatMillion(totalRev);
    totalRevNumwrapper.textContent = `${totalRevFormated}M €`;
    totalRevPercentWrapper.innerHTML = `<span rd-element="percentChange" class="${
      totalRevPercentChangeFormat > 0 ? 'green' : 'red'
    }">${
      totalRevPercentChangeFormat > 0 ? '+' : ''
    }${totalRevPercentChangeFormat}%</span> uplift MoM`;
    ////Booked room nights
    const [bookedRoom]: any = lastRole.get('Booked room nights');
    const bookedRoomFormated = numberWithCommas(bookedRoom);
    const [bookedRoomPercent]: any = lastRole.get('Booked room nights % change');
    const bookedRoomPercentFmtd = bookedRoomPercent * 100;
    bookedNumwrapper.textContent = bookedRoomFormated;
    bookPercentWrap.innerHTML = `<span rd-element="percentChange" class="${
      bookedRoomPercentFmtd > 0 ? 'green' : 'red'
    }">${bookedRoomPercentFmtd > 0 ? '+' : ''}${bookedRoomPercentFmtd}%</span> uplift MoM`;
    /////enrollment download 2023
    const [enrollNum]: any = lastRole.get('Enrolments web & app');
    const enrollNumfmtd = numberWithCommas(enrollNum);
    const enrollPercent = percentFormated('Enrolments web & app % change', lastRole);
    enrolNum.textContent = enrollNumfmtd;
    enrolPercent.innerHTML = `<span rd-element class="${enrollPercent > 0 ? 'green' : 'red'}">${
      enrollPercent > 0 ? '+' : ''
    }${enrollPercent}%</span> uplift MoM`;
  });

  ////Update the app download value
  getTableRecordSecondBase('tblfZXzNmPsL5rxtw').eachPage(function page(records) {
    const lastRole = records.slice(-1);

    const lastRollArr = lastRole.map((el) => el.fields);

    const appInfo = lastRollArr
      .map((el) => {
        const totalDownload = numberWithCommas(el['Total downloads (Combined)']);
        const downloadProgressPercent: any = el['Progress Percent'];
        const annualTarget = el['Annual Target'];

        appTargetEl.textContent = `${FormatMillion(annualTarget)}M`;

        const downloadProgressPercentFmtd = Number((downloadProgressPercent * 100).toFixed(2));
        return `<div>App downloads in ${
          el.Name
        }</div><div id="appDownloads" rd-element="appDownload" class="h-s-40">${totalDownload}</div><div rd-element="appDownload" class="grey-white"><span rd-element="appPercentchange" class="${
          downloadProgressPercentFmtd > 0 ? 'green' : 'red'
        }">${
          downloadProgressPercentFmtd > 0 ? '+' : ''
        }${downloadProgressPercentFmtd}</span> &nbsp;vs Annual Target: ${FormatMillion(
          annualTarget
        )}m</div>`;
      })
      .join('');
    appDownloadWrap.innerHTML = appInfo;

    console.log(appInfo);
  });

  const rewardKPIsTableId = 'tbl0BmeZ3H9Ee6afE';
  getTableRecord(rewardKPIsTableId).eachPage(function page(records) {
    const lastRole = records.slice(-1);
    const [lastRollValues] = lastRole.map((el) => el.fields);

    const memberShareValue = lastRollValues['Members reservations share'] as number;
    const webAppEnrolment = lastRollValues['Web & app enrolments'] as number;

    kpisLoadingEl.style.display = `none`;
    memberShare.textContent = `${memberShareValue * 100}.0%`;
    webEnrolment.textContent = `${webAppEnrolment * 100}.0%`;
  });
  ///app download total

  // getTableRecordSecondBase('tblfZXzNmPsL5rxtw').eachPage(function page(records) {
  //   console.log(records);
  //   const ttDownload = getColumnNumberData('Total downloads (Combined)', records);
  // });
};

//          // appDownloads.textContent = `${totalDownloadsFormat}`;
