<script lang="ts">
  import { quantize, interpolatePlasma, pie, arc, type PieArcDatum } from 'd3';
  
  export let chartData: any;
  export let labelIndex: number;
  export let dataIndex: number;
  
  let width: number = 400;
  let height: number = width;
  let percent: boolean = false;
  let fontSize: number = 10;
  let strokeWidth: number = 1;
  let strokeLinejoin: string = 'round';
  let outerRadius: number = Math.min(width, height) * 0.5 - 60;
  let innerRadius: number = 50;
  let labelPosition: number = 0.4;
  let labelRadius: number = innerRadius * labelPosition + outerRadius * 0.6;
  let strokeColorWOR: string = 'white';
  let strokeColorWIR: string = 'none';
  let stroke: string = innerRadius > 0 ? strokeColorWIR : strokeColorWOR;
  let padAngle: number = stroke === 'none' ? 1 / outerRadius : 0;

  let x: string;
  let y: string;
  let xVals: any[];
  let yVals: number[];
  let iVals: number[];
  let colors: string[];
  let wedges: PieArcDatum<number>[];
  let arcPath: any;
  let arcLabel: any;

  $: {
    x = Object.keys(chartData[0])[labelIndex];
    y = Object.keys(chartData[0])[dataIndex];
    xVals = chartData.map((el: any) => el[x]);
    yVals = chartData.map((el: any) => Number(el[y]));
    
    if (percent) {
      const total: number = yVals.reduce((a: number, b: number) => a + b, 0);
      yVals = yVals.map((el: number) => el / total);
    }

    iVals = chartData.map((_el: any, i: number) => i);
    colors = quantize((t: number) => interpolatePlasma(t * 0.7 + 0.3), xVals.length);

    wedges = pie<number>()
      .padAngle(padAngle)
      .sort(null)
      .value((i: number) => yVals[i])(iVals);

    arcPath = arc<PieArcDatum<number>>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    arcLabel = arc<PieArcDatum<number>>()
      .innerRadius(labelRadius)
      .outerRadius(labelRadius);
  }
</script>

<svg width={width} height={height} viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}>
  {#each wedges as wedge (wedge.index)}
    <path fill={colors[wedge.index]} d={arcPath(wedge)} stroke={stroke} stroke-width={strokeWidth} stroke-linejoin='round' />
    <g text-anchor='middle' transform={`translate(${arcLabel.centroid(wedge)})`}>
      <text font-size={fontSize}>
        <tspan font-weight='bold'>{xVals[wedge.index]}</tspan>
        <tspan x='0' dy='1.1em'>{percent ? `${(yVals[wedge.index] * 100).toFixed(2)}%` : yVals[wedge.index].toLocaleString('en-US')}</tspan>
      </text>
    </g>
  {/each}
</svg>

<style>
</style>
