import { BarChart, LineChart, PieChart, ScatterChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  PieChart,
  BarChart,
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
  TitleComponent,
  ScatterChart,
]);

const axisColor = '#808080';
import { numberWithCommas } from './helperFunction';

export const plotLineChart3DataPoint = function (
  chartWrap: HTMLElement,
  color: Array<string>,
  seriesTitleArr: Array<string>,
  data: any[]
) {
  const lineChart = echarts.init(chartWrap);
  const [color1, color2, color3] = color;
  const [month, rdhotel, expedia, bookings] = data;

  lineChart.setOption({
    grid: {
      width: '95%',
      left: 35,
      //height: '80%',
    },
    color: [color1, color2, color3, 'transparent', 'transparent', 'transparent'],
    title: {
      show: false,
      text: 'ECharts Getting Started Example',
    },
    tooltip: {
      //var(--color--gray-iron-800)
      //var(--white)
      trigger: 'axis',
      backgroundColor: 'var(--color--gray-iron-800)',
      borderColor: 'transparent',
      padding: 20,
      textStyle: {
        color: 'var(--white)',
        fontSize: 10,
      },
      axisPointer: {
        // type: 'cross',
        label: {
          backgroundColor: 'var(--white)',
        },
      },
      formatter: function (params) {
        const [rdhote, expedia, bookings] = params;

        const rdIconImgUrl =
          'https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/649cc66e494f0743a50b9cc5_Frame%201000001839.png';
        const expeIconUrl =
          'https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/649cc89ebe08a2c5f2a6da19_Group%201000001833.png';
        const bookingsIconUrl =
          'https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/649cc89ff47775a036f50b58_Booking-Symbol.png';
        const renderLabelBox = function (imgUrl: string, data: object) {
          return `<span data-tooltip="minimum" style="border-radius:2px; background-color:${data.color}; display:flex; align-items:center; justify-content:center; height: 18px; width:18px; margin-right: 5px;"> <img src="${imgUrl}"> </span>`;
        };

        const ic1 = renderLabelBox(rdIconImgUrl, rdhote);
        const ic2 = renderLabelBox(expeIconUrl, expedia);
        const ic3 = renderLabelBox(bookingsIconUrl, bookings);

        const title = `<span style=" color: var(--white); border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${params[0].name} </span>`;

        const formatedToopTiprdhotel = ` <div style="display:flex; align-items:center;  gap: 3rem; margin-bottom: 5px;"> <div style="display:flex; justify-content:center;" >${ic1} ${rdhote.seriesName}</div>: ${rdhote.data} </div>`;

        const formatedToopTipExpedia = ` <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 5px; "> <div style="display:flex; justify-content:center;"> ${ic2} ${expedia.seriesName}</div>: ${expedia.data}</div>`;

        const formatedToopTipBookings = ` <div style="display:flex; align-items:center; justify-content:space-between; gap: 2rem; "> <div style="display:flex; justify-content:center;"> ${ic3} ${bookings.seriesName}</div>: ${bookings.data}  </div>`;
        return `${title} <br />
                  ${formatedToopTiprdhotel}
                  ${formatedToopTipExpedia}
                  ${formatedToopTipBookings}`;
      },
    },
    xAxis: {
      // gridIndex: 1,
      type: 'category',
      boundaryGap: false,
      axisLine: {
        //show: true,
        onZero: false,
        show: true,

        lineStyle: {
          color: '#808080',
          width: 2,
        },
      },
      axisLabel: {
        color: '#808080',
        padding: [10, 0, 0, 0],
        // interval: 0,
      },
      data: month,
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          width: 0.5,
          color: '#808080',
        },
      },
      type: 'value',
      //   axisLabel: {
      //     formatter: '{value}%',
      //     color: 'white',
      //   },
      axisLine: {
        show: true,
        color: '#808080',
        width: 2,
        lineStyle: {
          color: '#808080',
          width: 1.5,
          cap: 'round',
        },
      },
      min: 80,
      max: 105,
    },
    series: [
      {
        name: seriesTitleArr[0],
        type: 'line',
        lineStyle: {
          //width: 0.5,
          // color: 'red',
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color1,
            },
            {
              offset: 0.6,
              color: 'transparent',
            },
          ]),
        },
        showSymbol: false,
        data: rdhotel,
      },
      {
        name: seriesTitleArr[1],
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color2,
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: expedia,
      },
      {
        name: seriesTitleArr[2],
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color3,
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: bookings,
      },
    ],
  });
};

export const plotLineChart2DataPoint = function (
  chartWrap: HTMLElement,
  xAxis: string[],
  yValue1: number[],
  yValue2: number[],
  yValue1Percent: number[],
  yValue2Percent: number[],
  valueName: string[],
  color: string[]
) {
  const lineChart = echarts.init(chartWrap);

  const [firstValue, secondValue] = valueName;

  const [color1, color2] = color;

  lineChart.setOption({
    grid: {
      width: '94%',
      left: 40,
    },
    color: [color1, color2, 'transparent', 'transparent'],
    title: {
      show: false,
      text: 'Instant Bookins Vs Rfp Bookins',
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'var(--color--gray-iron-800)',
      borderColor: 'transparent',
      padding: 20,
      textStyle: {
        color: 'var(--white)',
        fontSize: 10,
      },
      axisPointer: {
        // type: 'cross',
        label: {
          //backgroundColor: 'cyan',
          // color: 'red',
        },
      },
      formatter: function (params) {
        const ic1 = `<span data-tooltip="minimum" style="border-radius:50%; text-align: left; background-color:${params[0].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const ic2 = `<span data-tooltip="minimum" style="border-radius:50%; text-align: left; background-color:${params[1].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const title = `<span style=" text-align: left; color: var(--white); border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${params[0].name} </span>`;

        const [, , instantPercent, rfpbookings] = params;
        const percentInstant = ` <span><span style="color:${
          instantPercent.data > 0 ? '#17B96B' : '#FE4B36'
        }; ">${instantPercent.data}% </span> WoW</span> `;
        const percentRfp = ` <span><span style="color:${
          rfpbookings.data > 0 ? '#17B96B' : '#FE4B36'
        }; ">${rfpbookings.data}% </span> WoW</span> `;

        // const formatedTooltip = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${params[0].seriesName}</div> : ${params[0].data} ${percentincrease1} </div>`;

        const formatedTooltip = ` <div  style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${params[0].seriesName}</div> : ${params[0].data} ${percentInstant} </div>`;
        const formatedTooltipRfp = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;" > <div> ${ic2} ${params[1].seriesName}</div> : ${params[1].data}  ${percentRfp} </div>`;

        return `${title} <br />
               ${formatedTooltip}  
                ${formatedTooltipRfp}`;
      },
    },
    xAxis: {
      // gridIndex: 1,

      type: 'category',
      boundaryGap: false,
      axisLine: {
        //show: true,
        onZero: false,
        show: true,

        lineStyle: {
          color: axisColor,
          width: 2,
        },
      },
      axisLabel: {
        color: axisColor,
        //interval: 1,
        padding: [10, 0, 0, 0],
      },
      data: xAxis,
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          width: 0.5,
          color: axisColor,
        },
      },
      type: 'value',
      axisLabel: {
        formatter: '{value}',
        color: axisColor,
      },
      axisLine: {
        show: true,
        color: axisColor,
        width: 2,
        lineStyle: {
          color: axisColor,
          width: 2,
          cap: 'round',
        },
      },
      min: 10,
      max: 180,
    },
    series: [
      {
        name: firstValue,
        type: 'line',
        lineStyle: {
          //width: 0.5,
          // color: 'red',
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color1,
            },
            {
              offset: 0.6,
              color: 'transparent',
            },
          ]),
        },
        showSymbol: false,
        data: yValue1,
      },
      {
        name: secondValue,
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color2,
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: yValue2,
      },
      {
        name: 'instantPercent',
        type: 'line',
        showSymbol: false,
        data: yValue1Percent,
      },
      {
        name: 'rfpPercent',
        type: 'scatter',
        showSymbol: false,
        data: yValue2Percent,
      },
    ],
    // dataZoom: [
    //   {
    //     type: 'inside',
    //     xAxisIndex: [0, 1],
    //     start: 5,
    //     end: 100,
    //     minSpan: 20,
    //   },
    // ],
  });
};

//plot3linesChartDataPoint
export const chartOnlineShareApac = function (
  chartWrap: HTMLElement,
  xAxis: any,
  yDataValues: number[][],
  yPercentChange: number[][],
  seriesTitleArr: Array<string>,
  colorArr: string[],
  timeChange: string,
  minMaxValue: number[],
  loadingEl: HTMLElement
) {
  const lineChart = echarts.init(chartWrap);
  const [color1, color2, color3] = colorArr;

  const [min, max] = minMaxValue;

  const [yAxis, yAxis2, yAxis3] = yDataValues;

  const [yWoW1, yWoW2, yWoW3] = yPercentChange;

  loadingEl.style.display = `none`;

  lineChart.setOption({
    grid: {
      width: '95%',
      left: 35,
      //height: '80%',
    },
    color: [color1, color2, color3, 'transparent', 'transparent', 'transparent'],
    title: {
      show: false,
      text: 'ECharts Getting Started Example',
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'var(--color--gray-iron-800)',
      borderColor: 'transparent',
      padding: 20,
      textStyle: {
        color: 'var(--white)',
        fontSize: 10,
      },
      axisPointer: {
        // type: 'cross',
        label: {
          backgroundColor: 'var(--white)',
        },
      },
      formatter: function (params) {
        const [, , , chinaWow, inWOW, seapWoW] = params;

        const ic1 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[0].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const ic2 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[1].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const ic3 = `<span data-tooltip="minimum" style="border-radius:2px; background-color:${params[2].color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        const title = `<span style=" color: var(--white); border-bottom: 1px solid var(--white); margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%; text-align: left;"> ${params[0].name} </span>`;

        const wowPercentStyle = function (item) {
          return `<span><span style="color: ${item.data > 0 ? '#17b96b' : '#F65340'}; ">${
            item.data > 0 ? '+' : ''
          }${item.data}%</span> ${timeChange}</span> `;
        };
        const chinaWoWPercent = wowPercentStyle(chinaWow);
        const inWOWPercent = wowPercentStyle(inWOW);
        const seapWoWPercent = wowPercentStyle(seapWoW);

        const formatedToopTipChina = ` <div style="display:flex; align-items:center; justify-content:space-between; gap: 2rem;"> <div>${ic1} ${
          params[0].seriesName
        }</div>: ${
          params[0].data <= 20 ? `${params[0].data}%` : `${params[0].data / 1000}k`
        } ${chinaWoWPercent}  </div>`;
        const formatedToopTipIN = ` <div style="display:flex; align-items:center; justify-content:space-between; "> <div>${ic2} ${
          params[1].seriesName
        }</div>: ${
          params[1].data <= 20 ? `${params[1].data}%` : `${params[1].data / 1000}k`
        } ${inWOWPercent}  </div>`;
        const formatedToopTipSeap = ` <div style="display:flex; align-items:center; justify-content:space-between; gap: 2rem;"> <div>${ic3} ${
          params[2].seriesName
        }</div>: ${
          params[2].data <= 20 ? `${params[2].data}%` : `${params[2].data / 1000}k`
        } ${seapWoWPercent}  </div>`;
        return `${title} <br />
                ${formatedToopTipChina}
                ${formatedToopTipIN}
               ${formatedToopTipSeap}  `;
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        //show: true,
        onZero: false,
        show: true,

        lineStyle: {
          color: axisColor,
          width: 2,
        },
      },
      axisLabel: {
        color: axisColor,
        padding: [10, 0, 0, 0],
        // interval: 0,
      },
      data: xAxis,
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          width: 0.5,
          color: axisColor,
        },
      },
      type: 'value',
      axisLabel: {
        formatter: function (v, b) {
          //if(v )
          if (v >= -5 && v <= 20) return `${v}%`;
          return `${v / 1000}k`;
        },
        color: axisColor,
      },
      axisLine: {
        show: true,
        color: 'white',
        width: 2,
        lineStyle: {
          color: axisColor,
          width: 2,
          cap: 'round',
        },
      },
      min: min,
      max: max,
    },
    series: [
      {
        name: seriesTitleArr[0],
        type: 'line',
        lineStyle: {
          //width: 0.5,
          // color: 'red',
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color1,
            },
            {
              offset: 0.6,
              color: 'transparent',
            },
          ]),
        },
        showSymbol: false,
        data: yAxis,
      },
      {
        name: seriesTitleArr[1],
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color2,
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: yAxis2,
      },
      {
        name: seriesTitleArr[2],
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color3,
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: yAxis3,
      },
      {
        name: 'chinaWow',
        type: 'line',
        showSymbol: false,
        data: yWoW1,
      },
      {
        name: 'inWOW',
        type: 'line',
        showSymbol: false,
        data: yWoW2,
      },
      {
        name: 'seapWoW',
        type: 'line',
        showSymbol: false,
        data: yWoW3,
      },
    ],
    // dataZoom: [
    //   {
    //     type: 'inside',
    //     xAxisIndex: [0, 1],
    //     start: 5,
    //     end: 100,
    //     minSpan: 20,
    //   },
    // ],
  });
};

export const plotLineChart = function (
  chartWrap: HTMLElement,
  xAxis: any,
  lineName: string[],
  colorArray: string[],
  yAxisValue: number[][],
  yPercentChange: number[][],
  percentChangeLabel: string,
  loadingEl: HTMLElement
) {
  const chartInstance = echarts.init(chartWrap);

  const [yAxis, yAxis2, yAxis3, yAxis4, yAxis5] = yAxisValue;

  const [yWoW1, yWoW2, yWoW3, yWoW4, yWoW5] = yPercentChange;

  // const [eerut, nob, ukr, cese, mea] = percentChangeLabel;
  loadingEl.style.display = `none`;
  chartInstance.setOption({
    grid: {
      width: '95%',
      left: 40,
      // height: '80%',
    },
    color: [
      colorArray[0],
      colorArray[1],
      colorArray[2],
      colorArray[3],
      colorArray[4],
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
    ],
    title: {
      show: false,
      text: 'ECharts Getting Started Example',
    },
    tooltip: {
      backgroundColor: 'var(--color--gray-iron-800)',
      borderColor: 'transparent',
      padding: 20,
      textStyle: {
        color: 'var(--white)',
        fontSize: 10,
      },
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        label: {
          backgroundColor: 'var(--white)',
        },
      },
      formatter: function (params) {
        const [eerut, nob, ukirwe, cese, mea, eerutWow, nobWow, ukiWow, ceseWow, meaWow] = params;

        const renderLabel = function (item) {
          return `<span data-tooltip="minimum" style="border-radius:2px; background-color:${item.color}; display:inline-block; height: 12px; width:12px; margin-right: 5px;"></span>`;
        };
        const ic1 = renderLabel(eerut);
        const ic2 = renderLabel(nob);
        const ic3 = renderLabel(ukirwe);
        const ic4 = renderLabel(cese);
        const ic5 = renderLabel(mea);
        const title = `<span style=" color: var(--white); border-bottom: 1px solid var(--white); margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%; text-align: left;"> ${eerut.name} </span>`;
        /////tooltip styling functions
        const wowPercentStyle = function (item) {
          return `<span><span style="color: ${item.data > 0 ? '#17b96b' : '#F65340'}; ">${
            item.data > 0 ? '+' : ''
          }${item.data}%</span> ${percentChangeLabel}</span> `;
        };
        const eerutPercent = wowPercentStyle(eerutWow);
        const nobPercent = wowPercentStyle(nobWow);
        const ukiPercent = wowPercentStyle(ukiWow);
        const cesePercent = wowPercentStyle(ceseWow);
        const meaPercent = wowPercentStyle(meaWow);

        const formatedTooltipEerut = `<div style="display:flex; align-items:center; justify-content: space-between; gap: 2rem;"> <div> ${ic1}${eerut.seriesName}</div>: ${eerut.data}% ${eerutPercent} </div>`;
        const formatedTooltipNob = `<div style="display:flex; align-items:center; justify-content: space-between; gap: 2rem;"> <div> ${ic2}${nob.seriesName}</div>: ${nob.data}% ${nobPercent} </div>`;
        const formatedTooltipUki = `<div style="display:flex; align-items:center; justify-content: space-between; gap: 2rem;"> <div> ${ic3}${ukirwe.seriesName}</div>: ${ukirwe.data}% ${ukiPercent} </div>`;
        const formatedTooltipCese = `<div style="display:flex; align-items:center; justify-content: space-between; gap: 2rem;"> <div> ${ic4}${cese.seriesName}</div>: ${cese.data}% ${cesePercent} </div>`;
        const formatedTooltipMea = `<div style="display:flex; align-items:center; justify-content: space-between; gap: 2rem;"> <div> ${ic5}${mea.seriesName}</div>: ${mea.data}% ${meaPercent} </div>`;
        return `${title} <br />
                 ${formatedTooltipEerut}
                ${formatedTooltipNob}
                ${formatedTooltipUki}
                ${formatedTooltipCese}
                ${formatedTooltipMea}  `;
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        //show: true,
        onZero: false,
        show: true,

        lineStyle: {
          color: '#808080',
          width: 2,
        },
      },
      axisLabel: {
        color: '#808080',
        padding: [10, 0, 0, 0],
        // interval: 0,
      },
      data: xAxis,
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          width: 0.5,
          color: '#808080',
        },
      },
      type: 'value',
      axisLabel: {
        formatter: '{value}%',
        color: '#808080',
      },
      axisLine: {
        show: true,
        color: '#808080',
        width: 2,
        lineStyle: {
          color: '#808080',
          width: 1.5,
          cap: 'round',
        },
      },
      min: 0,
      max: 50,
    },
    series: [
      {
        name: lineName[0],
        type: 'line',
        lineStyle: {
          //width: 0.5,
          // color: 'red',
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#DADADA',
            },
            {
              offset: 0.6,
              color: 'transparent',
            },
          ]),
        },
        showSymbol: false,
        //  symbol: 'rect',
        data: yAxis,
      },
      {
        name: lineName[1],
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#C0EA5F',
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: yAxis2,
      },
      {
        name: lineName[2],
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#F65340',
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: yAxis3,
      },
      {
        name: lineName[3],
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#7C74EB',
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: yAxis4,
      },
      {
        name: lineName[4],
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#9EEDFE',
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: yAxis5,
      },
      {
        name: 'eerutWow',
        type: 'line',
        showSymbol: false,
        data: yWoW1,
      },
      {
        name: 'nobWow',
        type: 'line',
        showSymbol: false,
        data: yWoW2,
      },
      {
        name: 'ukrWow',
        type: 'line',
        showSymbol: false,
        data: yWoW3,
      },
      {
        name: 'ceseWow',
        type: 'line',
        showSymbol: false,
        data: yWoW4,
      },
      {
        name: 'meaWow',
        type: 'line',
        showSymbol: false,
        data: yWoW5,
      },
    ],
    // dataZoom: [
    //   {
    //     type: 'inside',
    //     xAxisIndex: [0, 1],
    //     start: 5,
    //     end: 100,
    //     minSpan: 20,
    //   },
    // ],
  });
};

export const multiInputPieChart = function (
  chartwrap: HTMLElement,
  nameArr: string[],
  valueArr: any,
  colorsArr: string[]
) {
  const chartInstance = echarts.init(chartwrap);

  const [value1, value2, value3, value4, value5] = valueArr;
  const [name1, name2, name3, name4, name5] = nameArr;

  const [color1, color2, color3, color4, color5] = colorsArr;

  chartInstance.setOption({
    color: [color1, color2, color3, color4, color5],
    tooltip: {
      show: true,
      trigger: 'item',
      position: ['18%', '100%'],
      textStyle: {
        lineHeight: 14,
        fontSize: 10,
      },
      formatter: function (params) {
        //  console.log(params);

        const { data } = params;
        const { color } = params;
        //getting the value and name of the tool tip
        const { value } = data;
        const { name } = data;

        return `<div style="display:flex; gap:0.5rem; padding:10px; max-height: 1rem; justify-content: center; align-items: center;"> <div>${name}</div> <div>${value}%</div> </div>`;
        console.log(params);
      },
    },

    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: ['45%', '90%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 10,
            fontWeight: 'normal',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: value1, name: name1 },
          { value: value2, name: name2 },
          { value: value3, name: name3 },
          { value: value4, name: name4 },
          { value: value5, name: name5 },
        ],
      },
    ],
  });
};

export const barchartPlot = function (
  chartWrap: HTMLElement,
  DataArr: number[],
  dataNameArr: string[],
  colorArr: string[]
) {
  const [NoweBar, ceseeValue, meavalue, saValue, vrsValue, seapValue, RussiaValue, chinaValue] =
    DataArr;

  const chartInstance = echarts.init(chartWrap);

  chartInstance.setOption({
    grid: {
      width: '80%',
      left: 40,
      //height: '80%',
    },
    color: colorArr,
    xAxis: {
      type: 'category',
      data: dataNameArr,
      //show: false,
      axisLine: {
        show: true,
        symbol: ['none', 'arrow'],
        symbolOffset: [0, 5],
        symbolSize: [5, 5],
      },
      axisLabel: {
        show: false,
        align: 'center',
        verticalAlign: 'middle',

        //margin: 10,
        //  customValues: [10, 30, 15, 20],
      },
      axisTick: {
        show: false,
      },
    },
    tooltip: {
      formatter: function (params) {
        console.log(params);

        const { data } = params;
        const { name } = params;
        //getting the value and name of the tool tip
        const { value } = data;
        // const { name } = data;
        // console.log(color);

        return `<div style="display:flex; gap:0.5rem; padding:10px; max-height: 0.8rem; justify-content: center; align-items: center;"> <div>${name}: </div> <div>${value}%</div> </div>`;
        console.log(params);
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLabel: {
        formatter: '{value}%',
        color: axisColor,
      },
      axisLine: {
        show: true,
        symbol: ['none', 'arrow'],
        symbolOffset: [0, 5],
        symbolSize: [5, 5],
        lineStyle: {
          color: axisColor,
          width: 1,
          cap: 'round',
        },
      },
      min: -60,
      max: 100,

      // show: false,
    },
    series: [
      {
        data: [
          {
            value: NoweBar,
            label: {
              show: true,
              fontSize: 10,
              position: 'top',
              color: axisColor,
              formatter: function (x) {
                const xAxisLabel = x.name;
                const itemValue = x.value;

                const labelHtml = `${xAxisLabel} 
${itemValue}%`;

                return `${labelHtml}`;
              },
            },
            // barWidth: 55,
            itemStyle: {
              color: colorArr[0],
              borderRadius: [5, 5, 0, 0],
            },
          },
          {
            value: ceseeValue,
            label: {
              show: true,
              fontSize: 10,
              position: 'top',
              color: axisColor,
              formatter: function (x) {
                const xAxisLabel = x.name;
                const itemValue = x.value;

                const labelHtml = `${xAxisLabel} 
${itemValue}%`;

                return `${labelHtml}`;
              },
            },
            itemStyle: {
              color: colorArr[1],
              borderRadius: [5, 5, 0, 0],
            },
          },
          {
            value: meavalue,
            label: {
              show: true,
              fontSize: 10,
              position: 'top',
              color: axisColor,
              formatter: function (x) {
                const xAxisLabel = x.name;
                const itemValue = x.value;

                const labelHtml = `${xAxisLabel} 
${itemValue}%`;

                return `${labelHtml}`;
              },
            },
            itemStyle: {
              color: colorArr[1],
              borderRadius: [5, 5, 0, 0],
            },
          },
          {
            value: saValue,
            label: {
              show: true,
              fontSize: 10,
              position: 'bottom',
              color: axisColor,
              formatter: function (x) {
                const xAxisLabel = x.name;
                const itemValue = x.value;

                const labelHtml = `${xAxisLabel} 
${itemValue}%`;

                return `${labelHtml}`;
              },
            },
            itemStyle: {
              color: colorArr[0],
              borderRadius: [0, 0, 5, 5],
            },
          },
          {
            value: vrsValue,
            label: {
              show: true,
              fontSize: 10,
              fontWeight: 'bold',
              position: 'bottom',
              color: axisColor,
              formatter: function (x) {
                const xAxisLabel = x.name;
                const itemValue = x.value;

                const labelHtml = `${xAxisLabel} 
${itemValue}%`;

                return `${labelHtml}`;
              },
            },
            itemStyle: {
              color: colorArr[1],
              borderRadius: [0, 0, 5, 5],
            },
          },
          {
            value: seapValue,
            label: {
              show: true,
              fontSize: 10,
              position: 'top',
              color: axisColor,
              formatter: function (x) {
                const xAxisLabel = x.name;
                const itemValue = x.value;

                const labelHtml = `${xAxisLabel} 
${itemValue}%`;

                return `${labelHtml}`;
              },
            },
            itemStyle: {
              color: colorArr[0],
              borderRadius: [5, 5, 0, 0],
            },
          },
          {
            value: RussiaValue,
            label: {
              show: true,
              fontSize: 10,
              position: 'top',
              color: axisColor,
              formatter: function (x) {
                const xAxisLabel = x.name;
                const itemValue = x.value;

                const labelHtml = `${xAxisLabel} 
${itemValue}%`;

                return `${labelHtml}`;
              },
            },
            itemStyle: {
              color: colorArr[1],
              borderRadius: [5, 5, 0, 0],
            },
          },
          {
            value: chinaValue,
            label: {
              show: true,
              fontSize: 10,
              position: 'bottom',
              color: axisColor,
              formatter: function (x) {
                const xAxisLabel = x.name;
                const itemValue = x.value;

                const labelHtml = `${xAxisLabel} 
${itemValue}%`;

                return `${labelHtml}`;
              },
            },
            itemStyle: {
              color: colorArr[0],
              borderRadius: [0, 0, 5, 5],
            },
          },
        ],
        type: 'bar',
      },
    ],
  });
};

export const barchartPlot2 = function (
  chartWrap: HTMLElement,
  DataArr: number[],
  dataNameArr: string[],
  colorArr: string[]
) {
  const [NoweBar, ceseeValue, meavalue, saValue, vrsValue, seapValue, RussiaValue, chinaValue] =
    DataArr;

  const chartInstance = echarts.init(chartWrap);

  chartInstance.setOption({
    grid: {
      width: '90%',
      left: 45,
      //height: '80%',
    },
    color: '#7A5AF8',
    xAxis: {
      type: 'category',
      data: dataNameArr,
      //show: false,
      axisLine: {
        show: true,
        symbol: ['none', 'arrow'],
        symbolOffset: [0, 5],
        symbolSize: [5, 5],
      },
      axisLabel: {
        show: true,
        align: 'center',
        verticalAlign: 'middle',
        margin: 15,
        //  customValues: [10, 30, 15, 20],
      },
      axisTick: {
        show: false,
      },
    },
    tooltip: {},
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
      },
      axisLabel: {
        formatter: function (y) {
          const yV = y / 1000000;
          return `${yV}M`;
          console.log(y);
        },
        color: axisColor,
      },
      axisLine: {
        show: true,
        symbol: ['none', 'arrow'],
        symbolOffset: [0, 5],
        symbolSize: [5, 5],
        lineStyle: {
          color: axisColor,
          width: 1,
          cap: 'round',
        },
      },
      // show: false,
    },
    series: [
      {
        data: DataArr,
        type: 'bar',
        label: {
          show: true,
          fontSize: 10,
          position: 'top',
          color: axisColor,
          formatter: function (x) {
            const xAxisLabel = x.name;
            const itemValue = numberWithCommas(x.value);

            const labelHtml = `${itemValue}`;

            return `${labelHtml}`;
          },
        },
        itemStyle: {
          color: colorArr[0],
          borderRadius: [5, 5, 0, 0],
        },
      },
    ],
  });
};

/////App Page chart function
export const barchartPlotApp = function (
  chartWrap: HTMLElement,
  DataArr: number[][],
  dataNameArr: string[],
  minMax: number[],
  seriesName: string
  // percentChangeRange
) {
  const [dataArr1, dataArrYoy] = DataArr;
  const [min, max] = minMax;

  const chartInstance = echarts.init(chartWrap);

  chartInstance.setOption({
    grid: {
      width: '95%',
      left: 45,
      //height: '80%',
    },
    color: '#2970FF',
    xAxis: {
      type: 'category',
      data: dataNameArr,
      //show: false,
      axisLine: {
        show: true,
      },
      axisLabel: {
        show: true,
        interval: 0,
        // rotate: 70,
        align: 'center',
        margin: 5,
        fontSize: 12,
        //padding: [50, 0, 0, 0],

        //margin: 10,
        //  customValues: [10, 30, 15, 20],
        formatter: function (y: string) {
          if (y.length > 7) {
            return y.substring(0, 7) + '...';
          }
          return y;
        },
      },
      axisTick: {
        show: false,
      },
    },
    tooltip: {
      //  show: true,
      trigger: 'axis',
      // position: ['18%', '100%'],
      textStyle: {
        lineHeight: 14,
        fontSize: 12,
        color: 'var(--white)',
      },
      backgroundColor: 'var(--color--gray-iron-800)',
      borderColor: 'transparent',
      padding: 20,
      formatter: function (params) {
        const [mainvalue, percentChange] = params;
        const { name, seriesName, data } = mainvalue;
        const { value } = percentChange;

        const title = `<div style="display:flex; gap:1rem; justify-content:left; border-bottom: 1px solid ${axisColor}; margin-bottom: 10px; padding-bottom:5px;"> ${name} </div>`;

        const content = `<div style="display:flex; gap: 0.5rem " > <span>${seriesName}</span> <span>${numberWithCommas(
          data
        )}${data < 31 ? '%' : ''}</span><div><span style=" color:${
          value > 0 ? '#17b96b' : '#FE4B36 '
        }">${value}%</span> YoY</div> </div>`;
        return `${title}
                ${content}`;
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: axisColor,
          opacity: 0.1,
        },
      },
      axisLabel: {
        formatter: function (y) {
          const yV = y / 1000;
          if (y < 1000) {
            return y;
          }

          return `${yV}K`;
        },
        color: axisColor,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: axisColor,
          width: 1,
          cap: 'round',
        },
      },
      min: min,
      max: max,
      // show: false,
    },
    series: [
      {
        data: dataArr1,
        type: 'bar',
        stack: 'a',
        name: seriesName,
        itemStyle: {
          //color: colorArr[0],
          borderRadius: [5, 5, 0, 0],
        },
      },
      {
        data: dataArrYoy,
        type: 'bar',
        stack: 'a',
        name: 'percent Change data',
        itemStyle: {
          color: 'transparent',
          borderRadius: [5, 5, 0, 0],
        },
      },
    ],
  });
};

export const plotMonthyDownloads = function (
  chartWrap: HTMLElement,
  xAxis: any,
  lineName: string[],
  colorArray: string[],
  yAxisValue: number[][],
  yPercentChange: number[][],
  percentChangeLabel: string
  // loadingEl: HTMLElement
) {
  const chartInstance = echarts.init(chartWrap);

  const [yAxis, yAxis2, yAxis3, yAxis4, yAxis5] = yAxisValue;

  const [yWoW1, yWoW2, yWoW3, yWoW4, yWoW5] = yPercentChange;

  // const [eerut, nob, ukr, cese, mea] = percentChangeLabel;
  // loadingEl.style.display = `none`;
  chartInstance.setOption({
    grid: {
      width: '95%',
      left: 40,
      // height: '80%',
    },
    color: [
      colorArray[0],
      colorArray[1],
      colorArray[2],
      colorArray[3],
      colorArray[4],
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
    ],
    title: {
      show: false,
      // text: 'ECharts Getting Started Example',
    },
    tooltip: {
      backgroundColor: 'var(--color--gray-iron-800)',
      borderColor: 'transparent',
      padding: 20,
      textStyle: {
        color: 'var(--white)',
        fontSize: 10,
      },
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        label: {
          backgroundColor: 'var(--white)',
        },
      },
      formatter: function (params) {
        const [eerut, nob, ukirwe, cese, mea, eerutWow, nobWow, ukiWow, ceseWow, meaWow] = params;

        const renderLabel = function (item) {
          return `<span data-tooltip="minimum" style="border-radius:50%; background-color:${item.color}; display:inline-block; height: 5px; width:5px; margin-right: 5px;"></span>`;
        };
        const ic1 = renderLabel(eerut);
        const ic2 = renderLabel(nob);
        const ic3 = renderLabel(ukirwe);
        const ic4 = renderLabel(cese);
        const ic5 = renderLabel(mea);
        const title = `<span style=" color: var(--white); border-bottom: 1px solid var(--white); margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%; text-align: left;"> ${eerut.name} </span>`;
        /////tooltip styling functions
        const wowPercentStyle = function (item) {
          return `<span><span style="color: ${item.data > 0 ? '#17b96b' : '#F65340'}; ">${
            item.data > 0 ? '+' : ''
          }${item.data}%</span> ${percentChangeLabel}</span> `;
        };
        const eerutPercent = wowPercentStyle(eerutWow);
        const nobPercent = wowPercentStyle(nobWow);
        const ukiPercent = wowPercentStyle(ukiWow);
        const cesePercent = wowPercentStyle(ceseWow);
        const meaPercent = wowPercentStyle(meaWow);

        const formatedTooltipEerut = `<div style="display:flex; align-items:center; justify-content: space-between; gap: 2rem;"> <div> ${ic1}${
          eerut.seriesName
        }</div>: ${numberWithCommas(eerut.data)} ${eerutPercent} </div>`;
        const formatedTooltipNob = `<div style="display:flex; align-items:center; justify-content: space-between; gap: 2rem;"> <div> ${ic2}${
          nob.seriesName
        }</div>: ${numberWithCommas(nob.data)} ${nobPercent} </div>`;
        const formatedTooltipUki = `<div style="display:flex; align-items:center; justify-content: space-between; gap: 2rem;"> <div> ${ic3}${
          ukirwe.seriesName
        }</div>: ${numberWithCommas(ukirwe.data)} ${ukiPercent} </div>`;
        const formatedTooltipCese = `<div style="display:flex; align-items:center; justify-content: space-between; gap: 2rem;"> <div> ${ic4}${
          cese.seriesName
        }</div>: ${numberWithCommas(cese.data)} ${cesePercent} </div>`;
        const formatedTooltipMea = `<div style="display:flex; align-items:center; justify-content: space-between; gap: 2rem;"> <div> ${ic5}${
          mea.seriesName
        }</div>: ${numberWithCommas(mea.data)} ${meaPercent} </div>`;
        return `${title} <br />
                 ${formatedTooltipEerut}
                ${formatedTooltipNob}
                ${formatedTooltipUki}
                ${formatedTooltipCese}
                ${formatedTooltipMea}  `;
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        //show: true,
        onZero: false,
        show: true,

        lineStyle: {
          color: axisColor,
          width: 2,
        },
      },
      axisLabel: {
        color: axisColor,
        padding: [10, 0, 0, 0],
        // interval: 0,
      },
      data: xAxis,
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          width: 0.5,
          color: axisColor,
        },
      },
      type: 'value',
      axisLabel: {
        formatter: function (y) {
          const yV = y / 1000;
          return `${yV}K`;
        },
        color: axisColor,
      },
      axisLine: {
        show: true,
        color: axisColor,
        width: 2,
        lineStyle: {
          color: axisColor,
          width: 1.5,
          cap: 'round',
        },
      },
      min: 0,
      max: 200000,
    },
    series: [
      {
        name: lineName[0],
        type: 'line',
        lineStyle: {
          //width: 0.5,
          // color: 'red',
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: colorArray[0],
            },
            {
              offset: 0.6,
              color: 'transparent',
            },
          ]),
        },
        showSymbol: false,
        //  symbol: 'rect',
        data: yAxis,
      },
      {
        name: lineName[1],
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: colorArray[1],
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: yAxis2,
      },
      {
        name: lineName[2],
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: colorArray[2],
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: yAxis3,
      },
      {
        name: lineName[3],
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: colorArray[3],
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: yAxis4,
      },
      {
        name: lineName[4],
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: colorArray[4],
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: yAxis5,
      },
      {
        name: 'eerutWow',
        type: 'line',
        showSymbol: false,
        data: yWoW1,
      },
      {
        name: 'nobWow',
        type: 'line',
        showSymbol: false,
        data: yWoW2,
      },
      {
        name: 'ukrWow',
        type: 'line',
        showSymbol: false,
        data: yWoW3,
      },
      {
        name: 'ceseWow',
        type: 'line',
        showSymbol: false,
        data: yWoW4,
      },
      {
        name: 'meaWow',
        type: 'line',
        showSymbol: false,
        data: yWoW5,
      },
    ],
  });
};

export const barchart_PlotApp_ActiveUser = function (
  chartWrap: HTMLElement,
  DataArr: number[][],
  dataNameArr: string[],
  CoC: string
) {
  const [dataArr1, dataArr2, dataArrPercentChange1, dataArrPercentChange2] = DataArr;

  const chartInstance = echarts.init(chartWrap);

  chartInstance.setOption({
    grid: {
      width: '95%',
      left: 75,
      //height: '80%',
    },
    color: '#2970FF',
    xAxis: {
      type: 'category',
      data: dataNameArr,
      //show: false,
      axisLine: {
        show: true,
      },
      axisLabel: {
        show: true,
        interval: 0,
        align: 'center',
        margin: 5,
        fontSize: 10,
        //padding: [50, 0, 0, 0],

        //margin: 10,
        //  customValues: [10, 30, 15, 20],
      },
      axisTick: {
        show: false,
      },
    },
    tooltip: {
      //  show: true,
      trigger: 'axis',
      // position: ['18%', '100%'],
      textStyle: {
        lineHeight: 14,
        fontSize: 12,
        color: 'var(--white)',
      },
      backgroundColor: 'var(--color--gray-iron-800)',
      borderColor: 'transparent',
      padding: 20,
      formatter: function (params) {
        const ic1 = `<span data-tooltip="minimum" style="border-radius:50%; text-align: left; background-color:${params[0].color}; display:inline-block; height: 6px; width:6px; margin-right: 5px;"></span>`;
        const ic2 = `<span data-tooltip="minimum" style="border-radius:50%; text-align: left; background-color:${params[1].color}; display:inline-block; height: 6px; width:6px; margin-right: 5px;"></span>`;
        const title = `<span style=" text-align: left; color: var(--white); border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${params[0].name} </span>`;

        const [, , instantPercent, rfpbookings] = params;
        const percentInstant = ` <span><span style="color:${
          instantPercent.data > 0 ? '#17B96B' : '#FE4B36'
        }; ">${instantPercent.data}% </span> ${CoC}</span> `;
        const percentRfp = ` <span><span style="color:${
          rfpbookings.data > 0 ? '#17B96B' : '#FE4B36'
        }; ">${rfpbookings.data}% </span> ${CoC}</span> `;

        // const formatedTooltip = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${params[0].seriesName}</div> : ${params[0].data} ${percentincrease1} </div>`;

        const formatedTooltip = ` <div  style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${
          params[0].seriesName
        }</div> : ${numberWithCommas(params[0].data)} ${percentInstant} </div>`;
        const formatedTooltipRfp = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;" > <div> ${ic2} ${
          params[1].seriesName
        }</div> : ${numberWithCommas(params[1].data)} ${percentRfp} </div>`;

        return `${title} <br />
                ${formatedTooltipRfp}
                 ${formatedTooltip}  `;
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: axisColor,
          opacity: 0.1,
        },
      },
      axisLabel: {
        formatter: function (y) {
          const yV = y / 1000;
          const yM = y / 1000000;
          if (y > 1200000) {
            return `${yM}M`;
          }
          return `${yV}K`;
        },
        color: axisColor,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: axisColor,
          width: 1,
          cap: 'round',
        },
      },
      min: 0,
      //  max: 1000000,
      // show: false,
    },
    series: [
      {
        data: dataArr1,
        type: 'bar',
        stack: 'a',
        name: 'Android',
        itemStyle: {
          color: '#16B364',
          borderRadius: [5, 5, 0, 0],
        },
      },
      {
        data: dataArr2,
        type: 'bar',
        stack: 'a',
        name: 'iOS',
        itemStyle: {
          color: '#2970FF',
          borderRadius: [5, 5, 0, 0],
        },
      },

      {
        data: dataArrPercentChange1,
        type: 'bar',
        stack: 'a',
        name: 'Android',
        itemStyle: {
          color: 'black',
          borderRadius: [5, 5, 0, 0],
        },
      },
      {
        data: dataArrPercentChange2,
        type: 'bar',
        stack: 'a',
        name: 'iOS',
        itemStyle: {
          color: 'red',
          borderRadius: [5, 5, 0, 0],
        },
      },
    ],
  });
};

export const app_histogram_chart = function (
  chartWrap: HTMLElement,
  DataArr: number[][],
  dataNameArr: string[]
  // percentChangeRange
) {
  const [dataArr1, dataArr2, dataArrPercentChange1, dataArrPercentChange2] = DataArr;

  const chartInstance = echarts.init(chartWrap);

  chartInstance.setOption({
    grid: {
      width: '95%',
      left: 75,
      //height: '80%',
    },
    color: '#2970FF',
    xAxis: {
      type: 'category',
      data: dataNameArr,
      //show: false,
      axisLine: {
        show: true,
      },
      axisLabel: {
        show: true,
        interval: 0,
        align: 'center',
        margin: 5,
        fontSize: 10,
        //padding: [50, 0, 0, 0],

        //margin: 10,
        //  customValues: [10, 30, 15, 20],
      },
      axisTick: {
        show: false,
      },
    },
    tooltip: {
      //  show: true,
      trigger: 'axis',
      // position: ['18%', '100%'],
      textStyle: {
        lineHeight: 14,
        fontSize: 12,
        color: 'var(--white)',
      },
      backgroundColor: 'var(--color--gray-iron-800)',
      borderColor: 'transparent',
      padding: 20,
      formatter: function (params) {
        console.log(params);

        const ic1 = `<span data-tooltip="minimum" style="border-radius:50%; text-align: left; background-color:${params[0].color}; display:inline-block; height: 6px; width:6px; margin-right: 5px;"></span>`;
        const ic2 = `<span data-tooltip="minimum" style="border-radius:50%; text-align: left; background-color:${params[1].color}; display:inline-block; height: 6px; width:6px; margin-right: 5px;"></span>`;
        const title = `<span style=" text-align: left; color: var(--white); border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${params[0].name} </span>`;

        const [, , instantPercent, rfpbookings] = params;
        const percentInstant = ` <span><span style="color:${
          instantPercent.data > 0 ? '#17B96B' : '#FE4B36'
        }; ">${instantPercent.data}% </span> YoY</span> `;
        const percentRfp = ` <span><span style="color:${
          rfpbookings.data > 0 ? '#17B96B' : '#FE4B36'
        }; ">${rfpbookings.data}% </span> YoY</span> `;

        // const formatedTooltip = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${params[0].seriesName}</div> : ${params[0].data} ${percentincrease1} </div>`;

        const formatedTooltip = ` <div  style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${
          params[0].seriesName
        }</div> : ${numberWithCommas(params[0].data)} ${percentInstant} </div>`;
        const formatedTooltipRfp = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;" > <div> ${ic2} ${
          params[1].seriesName
        }</div> : ${numberWithCommas(params[1].data)} ${percentRfp} </div>`;

        return `${title} <br />
                ${formatedTooltipRfp}
                ${formatedTooltip}  `;
      },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: axisColor,
          opacity: 0.1,
        },
      },
      axisLabel: {
        formatter: function (y) {
          return `${y}%`;
        },
        color: axisColor,
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: axisColor,
          width: 1,
          cap: 'round',
        },
      },
      min: 0,
      max: 20,
      // show: false,
    },
    series: [
      {
        data: dataArr1,
        type: 'bar',
        stack: 'a',
        barGap: 0.1,
        name: 'Android',
        itemStyle: {
          color: '#16B364',
          borderRadius: [5, 5, 0, 0],
        },
      },
      {
        data: dataArr2,
        type: 'bar',
        //stack: 'a',
        name: 'iOS',
        itemStyle: {
          color: '#2970FF',
          borderRadius: [5, 5, 0, 0],
        },
      },

      {
        data: dataArrPercentChange1,
        type: 'bar',
        stack: 'a',
        name: 'Android',
        itemStyle: {
          color: 'transparent',
          borderRadius: [5, 5, 0, 0],
        },
      },
      {
        data: dataArrPercentChange2,
        type: 'bar',
        stack: 'a',
        name: 'iOS',
        itemStyle: {
          color: 'transparent',
          borderRadius: [5, 5, 0, 0],
        },
      },
    ],
  });
};

export const app_2line_chart = function (
  chartWrap: HTMLElement,
  xAxis: string[],
  yValue1: number[],
  yValue2: number[],
  yValue1Percent: number[],
  yValue2Percent: number[],
  valueName: string[],
  color: string[],
  minMax: number[],
  rating: string
) {
  const lineChart = echarts.init(chartWrap);
  const [min, max] = minMax;

  const [firstValue, secondValue] = valueName;

  const [color1, color2] = color;

  lineChart.setOption({
    grid: {
      width: '94%',
      left: 40,
    },
    color: [color1, color2, 'transparent', 'transparent'],
    title: {
      show: false,
      text: 'Instant Bookins Vs Rfp Bookins',
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'var(--color--gray-iron-800)',
      borderColor: 'transparent',
      padding: 20,
      textStyle: {
        color: 'var(--white)',
        fontSize: 10,
      },
      axisPointer: {
        // type: 'cross',
        label: {
          //backgroundColor: 'cyan',
          // color: 'red',
        },
      },
      formatter: function (params) {
        const ic1 = `<span data-tooltip="minimum" style="border-radius:50%; text-align: left; background-color:${params[0].color}; display:inline-block; height: 6px; width:6px; margin-right: 5px;"></span>`;
        const ic2 = `<span data-tooltip="minimum" style="border-radius:50%; text-align: left; background-color:${params[1].color}; display:inline-block; height: 6px; width:6px; margin-right: 5px;"></span>`;
        const title = `<span style=" text-align: left; color: var(--white); border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${params[0].name} </span>`;

        const [, , instantPercent, rfpbookings] = params;
        const percentInstant = ` <span><span style="color:${
          instantPercent.data > 0 ? '#17B96B' : '#FE4B36'
        }; ">${instantPercent.data}% </span> YoY</span> `;
        const percentRfp = ` <span><span style="color:${
          rfpbookings.data > 0 ? '#17B96B' : '#FE4B36'
        }; ">${rfpbookings.data}% </span> YoY</span> `;

        // const formatedTooltip = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${params[0].seriesName}</div> : ${params[0].data} ${percentincrease1} </div>`;

        const formatedTooltip = ` <div  style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${params[0].seriesName}</div> : ${params[0].data} ${rating} ${percentInstant} </div>`;
        const formatedTooltipRfp = `<div style= "display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;" > <div> ${ic2} ${params[1].seriesName}</div> : ${params[1].data} ${rating}  ${percentRfp} </div>`;

        return `${title} <br />
                ${formatedTooltipRfp}
                ${formatedTooltip}  `;
      },
    },
    xAxis: {
      // gridIndex: 1,

      type: 'category',
      boundaryGap: false,
      axisLine: {
        //show: true,
        onZero: false,
        show: true,

        lineStyle: {
          color: axisColor,
          width: 2,
        },
      },
      axisLabel: {
        color: axisColor,
        //interval: 1,
        padding: [10, 0, 0, 0],
      },
      data: xAxis,
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          width: 0.5,
          color: axisColor,
        },
      },
      type: 'value',
      axisLabel: {
        formatter: function (y) {
          const yV = y / 1000;
          if (y > 1000) {
            return `${yV}K`;
          }
          return y;
        },
        color: axisColor,
      },
      axisLine: {
        show: true,
        color: axisColor,
        width: 2,
        lineStyle: {
          color: axisColor,
          width: 2,
          cap: 'round',
        },
      },
      min: min,
      max: max,
    },
    series: [
      {
        name: firstValue,
        type: 'line',
        lineStyle: {
          //width: 0.5,
          // color: 'red',
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color1,
            },
            {
              offset: 0.6,
              color: 'transparent',
            },
          ]),
        },
        showSymbol: false,
        data: yValue1,
      },
      {
        name: secondValue,
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color2,
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: yValue2,
      },
      {
        name: 'instantPercent',
        type: 'line',
        showSymbol: false,
        data: yValue1Percent,
      },
      {
        name: 'rfpPercent',
        type: 'scatter',
        showSymbol: false,
        data: yValue2Percent,
      },
    ],
  });
};

export const app_1line_chart = function (
  chartWrap: HTMLElement,
  xAxis: string[],
  yValue1: number[],
  yValue1Percent: number[],
  valueName: string[],
  color: string[]
  // minMax: number[],
  // rating: string
) {
  const lineChart = echarts.init(chartWrap);
  // const [min, max] = minMax;

  const [firstValue, secondValue] = valueName;

  const [color1, color2] = color;

  lineChart.setOption({
    grid: {
      width: '94%',
      left: 40,
    },
    color: [color1, 'transparent'],
    title: {
      show: false,
      text: 'Instant Bookins Vs Rfp Bookins',
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'var(--color--gray-iron-800)',
      borderColor: 'transparent',
      padding: 10,
      textStyle: {
        color: 'var(--white)',
        fontSize: 10,
      },
      axisPointer: {
        // type: 'cross',
        label: {
          //backgroundColor: 'cyan',
          // color: 'red',
        },
      },
      formatter: function (params) {
        console.log(params);
        const ic1 = `<span data-tooltip="minimum" style="border-radius:50%; text-align: left; background-color:${params[0].color}; display:inline-block; height: 6px; width:6px; margin-right: 5px;"></span>`;
        const ic2 = `<span data-tooltip="minimum" style="border-radius:50%; text-align: left; background-color:${params[1].color}; display:inline-block; height: 6px; width:6px; margin-right: 5px;"></span>`;
        const title = `<span style=" text-align: left; color: var(--white); border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${params[0].name} </span>`;

        const [, instantPercent] = params;
        const percentInstant = ` <span><span style="color:${
          instantPercent.data > 0 ? '#17B96B' : '#FE4B36'
        }; ">${instantPercent.data}% </span> MoM</span> `;
        const formatedTooltip = ` <div  style= "display: flex; align-items: center; justify-content: space-between; gap: 1rem;"> <div> ${ic1} ${params[0].seriesName}</div> : ${params[0].data} ${percentInstant} </div>`;

        return `${title} <br />
               ${formatedTooltip}`;
      },
    },
    xAxis: {
      // gridIndex: 1,

      type: 'category',
      boundaryGap: false,
      axisLine: {
        //show: true,
        onZero: false,
        show: true,

        lineStyle: {
          color: axisColor,
          width: 2,
        },
      },
      axisLabel: {
        color: axisColor,
        //interval: 1,
        padding: [10, 0, 0, 0],
      },
      data: xAxis,
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          width: 0.5,
          color: axisColor,
        },
      },
      type: 'value',
      axisLabel: {
        formatter: function (y) {
          const yV = y / 1000;
          if (y > 1000) {
            return `${yV}K`;
          }
          return y;
        },
        color: axisColor,
      },
      axisLine: {
        show: true,
        color: axisColor,
        width: 2,
        lineStyle: {
          color: axisColor,
          width: 2,
          cap: 'round',
        },
      },
      min: 0,
      //max: max,
    },
    series: [
      {
        name: firstValue,
        type: 'line',
        lineStyle: {
          //width: 0.5,
          // color: 'red',
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color1,
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        showSymbol: false,
        data: yValue1,
      },
      {
        name: 'instantPercent',
        type: 'line',
        showSymbol: false,
        data: yValue1Percent,
      },
    ],
  });
};
//// APp page chart end

interface PieObject {
  name: string;
  value: number;
}

export const multiInputPieChartDigital = function (
  chartwrap: HTMLElement,
  pieData: PieObject[],
  colorsArr: string[]
) {
  const chartInstance = echarts.init(chartwrap);

  const [color1, color2, color3, color4, color5] = colorsArr;

  chartInstance.setOption({
    color: colorsArr,
    tooltip: {
      show: true,
      trigger: 'item',
      // position: ['auto', '100%'],
      textStyle: {
        lineHeight: 14,
        fontSize: 10,
      },
      formatter: function (params) {
        //  console.log(params);

        const { data } = params;
        const { color } = params;
        //getting the value and name of the tool tip
        const { value } = data;
        const { name } = data;
        // console.log(color);

        return `<div style="display:flex; gap:0.5rem; padding:10px; max-height: 0.8rem; justify-content: center; align-items: center;"> <div>${name}</div> <div>${value}%</div> </div>`;
        console.log(params);
      },
    },

    series: [
      {
        // name: 'Access From',
        type: 'pie',
        // radius: '50%',
        radius: ['45%', '90%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 10,
            fontWeight: 'normal',
          },
        },
        labelLine: {
          show: false,
        },
        data: [pieData[0], pieData[1], pieData[2], pieData[3], pieData[4]],
      },
    ],
  });
};

export const plotPieChart = function (
  chartwrap: HTMLElement,
  value1: number,
  value2: number,
  color: string
) {
  const chartInstance = echarts.init(chartwrap);

  chartInstance.setOption({
    //tooltip: {},
    series: [
      {
        type: 'pie',
        radius: ['75%', '100%'],
        animationDuration: 1500,
        avoidLabelOverlap: false,
        tooltip: { enabled: false },
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        emphasis: {
          disabled: true,
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold',
          },
        },
        data: [
          {
            value: value1,
            // name: 'Overall',
            itemStyle: {
              borderRadius: 20,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: color,
                },
                {
                  offset: 1,
                  color: color,
                },
              ]),
            },
            areaStyle: { opacity: 0.2, color: 'green' },
          },
          { value: value2, itemStyle: { color: 'transparent' } },
        ],
      },
    ],
  });
};

export const imageQualityHotelLineChart = function (
  chartWrap: HTMLElement,
  color: Array<string>,
  data: any,
  loaderEl: HTMLElement
) {
  const lineChart = echarts.init(chartWrap);
  const [color1, color2, color3] = color;
  const [month, rdhotel, bookings, expedia] = data;

  loaderEl.style.display = `none`;

  lineChart.setOption({
    grid: {
      width: '95%',
      left: 35,
      //height: '80%',
    },
    color: [color1, color2, color3, 'transparent', 'transparent', 'transparent'],
    title: {
      show: false,
      text: 'ECharts Getting Started Example',
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'var(--color--gray-iron-800)',
      borderColor: 'transparent',
      padding: 20,
      textStyle: {
        color: 'var(--white)',
        fontSize: 10,
      },
      axisPointer: {
        // type: 'cross',
        label: {
          backgroundColor: 'red',
        },
      },
      formatter: function (params) {
        const [rdhote, expedia, bookings] = params;

        const rdIconImgUrl =
          'https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/649cc66e494f0743a50b9cc5_Frame%201000001839.png';
        const expeIconUrl =
          'https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/649cc89ebe08a2c5f2a6da19_Group%201000001833.png';
        const bookingsIconUrl =
          'https://uploads-ssl.webflow.com/63ee41b9862db4b9345f1a50/649cc89ff47775a036f50b58_Booking-Symbol.png';
        const renderLabelBox = function (imgUrl: string, data: object) {
          return `<span data-tooltip="minimum" style="border-radius:2px; background-color:${data.color}; display:flex; align-items:center; justify-content:center; height: 18px; width:18px; margin-right: 5px;"> <img src="${imgUrl}"> </span>`;
        };

        const ic1 = renderLabelBox(rdIconImgUrl, rdhote);
        const ic2 = renderLabelBox(expeIconUrl, expedia);
        const ic3 = renderLabelBox(bookingsIconUrl, bookings);

        const title = `<span style=" color: var(--white); border-bottom: 1px solid #4D4D4D; margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${params[0].name} </span>`;

        const formatedToopTiprdhotel = ` <div style="display:flex; align-items:center;  gap: 3rem; margin-bottom: 5px;"> <div style="display:flex; justify-content:center;" >${ic1} ${rdhote.seriesName}</div>: ${rdhote.data} </div>`;

        const formatedToopTipExpedia = ` <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 5px; "> <div style="display:flex; justify-content:center;"> ${ic2} ${expedia.seriesName}</div>: ${expedia.data}</div>`;

        const formatedToopTipBookings = ` <div style="display:flex; align-items:center; justify-content:space-between; gap: 2rem; margin-bottom: 5px; "> <div style="display:flex; justify-content:center;"> ${ic3} ${bookings.seriesName}</div>: ${bookings.data}  </div>`;
        return `${title} <br />
                ${formatedToopTiprdhotel}
                ${formatedToopTipBookings}  
                ${formatedToopTipExpedia}`;
      },
    },
    xAxis: {
      // gridIndex: 1,

      type: 'category',
      boundaryGap: false,
      axisLine: {
        //show: true,
        onZero: false,
        show: true,

        lineStyle: {
          color: axisColor,
          width: 2,
        },
      },
      axisLabel: {
        color: axisColor,
        padding: [10, 0, 0, 0],
        // interval: 0,
      },
      data: month,
    },
    yAxis: {
      splitLine: {
        show: true,
        lineStyle: {
          width: 0.5,
          color: axisColor,
        },
      },
      type: 'value',
      //   axisLabel: {
      //     formatter: '{value}%',
      //     color: 'white',
      //   },
      axisLine: {
        show: true,
        color: axisColor,
        width: 2,
        lineStyle: {
          color: axisColor,
          width: 2,
          cap: 'round',
        },
      },
      min: 80,
      max: 105,
    },
    series: [
      {
        name: 'Radisson hotels',
        type: 'line',
        lineStyle: {
          //width: 0.5,
          // color: 'red',
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color1,
            },
            {
              offset: 0.6,
              color: 'transparent',
            },
          ]),
        },
        showSymbol: false,
        data: rdhotel,
      },
      {
        name: 'Expedia',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color2,
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: expedia,
      },
      {
        name: 'Booking.com',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          opacity: 0.2,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: color3,
            },
            {
              offset: 1,
              color: 'transparent',
            },
          ]),
        },
        data: bookings,
      },
    ],
  });
};
