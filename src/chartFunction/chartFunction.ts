import * as echarts from 'echarts';

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

export const plotLineChart = function (
  chartWrap: HTMLElement,
  xAxis: any,
  lineName: string[],
  colorArray: string[],
  yAxisValue: number[][],
  yPercentChange: number[][]
) {
  const chartInstance = echarts.init(chartWrap);

  const [yAxis, yAxis2, yAxis3, yAxis4, yAxis5] = yAxisValue;

  const [yWoW1, yWoW2, yWoW3, yWoW4, yWoW5] = yPercentChange;

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
        const title = `<span style=" color: var(--white); border-bottom: 1px solid var(--white); margin-bottom: 10px; padding-bottom:5px; display: inline-block; width:100%;"> ${eerut.name} </span>`;
        /////tooltip styling functions
        const wowPercentStyle = function (item) {
          return `<span><span style="color: ${item.data > 0 ? '#17b96b' : '#F65340'}; ">${
            item.data > 0 ? '+' : ''
          }${item.data}%</span> Wow</span> `;
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

export const plotPieChart = function (
  chartwrap: HTMLElement,
  value1: number,
  value2: number,
  color: string
) {
  const chartInstance = echarts.init(chartwrap);

  chartInstance.setOption({
    tooltip: {},
    series: [
      {
        type: 'pie',
        radius: ['75%', '97%'],
        animationDuration: 1500,
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        labelLine: {
          show: false,
        },
        emphasis: {
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
