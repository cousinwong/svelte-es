<script lang="ts">
    import { quantize, interpolatePlasma, pie, arc, type PieArcDatum } from 'd3';
    import data from './donut-data';
  
    const width: number = 400;
    const height: number = width;
    const percent: boolean = false;
    const fontSize: number = 10;
    const strokeWidth: number = 1;
    const strokeLinejoin: string = 'round';
    const outerRadius: number = Math.min(width, height) * 0.5 - 60;
    const innerRadius: number = 50;
    const labelPosition: number = 0.4;
    const labelRadius: number = innerRadius * labelPosition + outerRadius * 0.6;
    const strokeColorWOR: string = 'white';
    const strokeColorWIR: string = 'none';
    const stroke: string = innerRadius > 0 ? strokeColorWIR : strokeColorWOR;
    const padAngle: number = stroke === 'none' ? 1 / outerRadius : 0;
  
    const x: string = Object.keys(data[0])[0];
    const y: string = Object.keys(data[0])[1];
    const xVals: any[] = data.map((el: any) => el[x]);
    let yVals: number[] = data.map((el: any) => Number(el[y]));
    if (percent) {
      const total: number = yVals.reduce((a: number, b: number) => a + b, 0);
      yVals = yVals.map((el: number) => el / total);
    }
    const iVals: number[] = data.map((_el: any, i: number) => i);
  
    let colors: string[] = quantize((t: number) => interpolatePlasma(t * 0.7 + 0.3), xVals.length);
  
    const wedges: PieArcDatum<number>[] = pie<number>()
      .padAngle(padAngle)
      .sort(null)
      .value((i: number) => yVals[i])(iVals);
  
    const arcPath: any = arc<PieArcDatum<number>>()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);
  
    const arcLabel: any = arc<PieArcDatum<number>>()
      .innerRadius(labelRadius)
      .outerRadius(labelRadius);
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
  