import type { FieldSet, Records } from 'airtable';
import { dataTool } from 'echarts';

export function roundToFiveDecimalPlaces(number: number) {
  return Number(number.toFixed(5));
}

export const FormatMillion = function (x) {
  return x / 1000000;
};

// export function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// }
////scrolling Y axis
///////////////FUnctiont that fix the y-axis .
export const fixYaxis = function (scrollCont: HTMLElement, yAxisContainer: HTMLElement) {
  scrollCont.scrollBy(scrollCont.scrollWidth, 0);

  scrollCont.addEventListener('scroll', function () {
    const pxScrolled = scrollCont.scrollLeft;

    if (pxScrolled > yAxisContainer.scrollWidth) {
      yAxisContainer.classList.add('scroll-y');
      // yAxisContainer.style.backgroundColor = color;
    } else {
      yAxisContainer.classList.remove('scroll-y');
      //yAxisContainer.style.backgroundColor = 'transparent';
    }
  });
};

export const fixYaxisLeftToRight = function (scrollCont: HTMLElement, yAxisContainer: HTMLElement) {
  //scrollCont.scrollBy(scrollCont.scrollWidth, 0);

  scrollCont.addEventListener('scroll', function () {
    const pxScrolled = scrollCont.scrollLeft;

    if (pxScrolled > yAxisContainer.scrollWidth) {
      yAxisContainer.classList.add('scroll-y');
      // yAxisContainer.style.backgroundColor = color;
    } else {
      yAxisContainer.classList.remove('scroll-y');
      //yAxisContainer.style.backgroundColor = 'transparent';
    }
  });
};

export function isMobile() {
  return window.innerWidth < 479;
}

///Helpers function
export const getColumnNumberData = function (
  nameOfField: string,
  records: Records<FieldSet>
): number[] {
  const rawValue = records.map((rec: any) => rec.get(nameOfField));
  return rawValue.map((value: number) => Math.floor(value * 100));
};

export const changeToPercent = function (x: any) {
  return Number(x * 100).toFixed(1);
};

export const getColumnData = function (nameOfField: string, records: Records<FieldSet>) {
  return records.map((rec) => rec.get(nameOfField));
};

/// formated column data with percent and change NaN and infinity to Zero
export const formatColumnsToPercent = function (arr: any): number[] {
  const formatedArr = arr
    .map((el: any) => {
      if (typeof el === 'object' || typeof el === 'undefined') el = 0;
      return el;
    })
    .map((el: number) => {
      return +(el * 100).toFixed(2);
    });
  return formatedArr;
};

export const getColumnWoWDataFormated = function (nameOfField: string, records: Records<FieldSet>) {
  const xArray = records.map((rec) => rec.get(nameOfField));
  return formatColumnsToPercent(xArray);
};

export function numberWithCommas(x: any): string {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//Pie chart second Number function
export const pieSecondValue = function (x: number): number {
  return 100 - x;
};

export const pieValueExtract = function (nameOfField: string, records: Records<FieldSet>): number {
  const [value] = records
    .map((record) => <number>record.get(nameOfField))
    .filter((rec) => rec !== undefined);
  // .map((rec: any) => Math.floor(rec));
  //.slice(-3);

  return value;
};

export const pieValueExtractPercent = function (
  nameOfField: string,
  records: Records<FieldSet>
): number {
  const [value] = records
    .map((record) => record.get(nameOfField))
    .filter((rec) => rec !== undefined)

    .slice(-3);

  return value;
};

// const [overallData] = records
//   .map((record) => record.get('Overall Score'))
//   .filter((rec) => rec !== undefined)
//   .map((rec) => rec)
//   .slice(-1);

// const [downloadsData] = records
//   .map((record) => record.get('Progress Percent'))
//   .filter((rec) => rec !== undefined)
//   .map((rec: any) => Math.floor(rec * 100))
//   .slice(-1);
