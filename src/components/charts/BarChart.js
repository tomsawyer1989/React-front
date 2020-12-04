import React, {useState} from 'react';
import {FlexibleXYPlot, XAxis, YAxis, Hint, LabelSeries, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, DiscreteColorLegend } from 'react-vis';
import 'react-vis/dist/style.css';

function BarChart (props) {
    const [event1, setEvent1] = useState(null);
    const [serie1, setSerie1] = useState(null);

    const {title1, data1, color1, height, margin} = props;

    /* Probando con Datos Ficticios */

    // const aux1 = undefined;

    // const aux1 = [
    //     {x: '2020-03', y: 10},
    //     {x: '2020-04', y: 5},
    //     {x: '2020-05', y: 15}
    // ]

    const labelIn = [];

    let minYValue1 = 0;
    let maxYValue1 = 0;

    data1.forEach(item => {
      maxYValue1 = item.y > maxYValue1 ? item.y : maxYValue1;
      minYValue1 = item.y < minYValue1 ? item.y : minYValue1;
      const offset = -5 + -10 * (item.y.toString().length - 1);
      labelIn.push({ x: item.x, y: item.y, yOffset: offset, rotation: -90 });
    });
    
    const datos = [
      {data: data1, title: title1, color: color1}
    ];

    const items = []; //Construyendo los items de la leyenda de la gráfica, para darle manejo a los datos indefinidos.

    datos.map((item, i) => {
      if((item.data === undefined) || (item.title === undefined) || (item.color === undefined)){
        //datos.splice(i, 1);
      }
      else {
        items.push({title: item.title, color: item.color});
      }
    });

    return(
        <>
        <FlexibleXYPlot
            height={height}
            margin={margin}
            xType="ordinal"
            yType="linear"
            animation
        >
            <HorizontalGridLines />
            <VerticalGridLines />
            <VerticalBarSeries
                yDomanin={[0, 20000]}
                data={data1}
                color={color1}
                onNearestX={(datapoint, event) => {
                    setSerie1(datapoint);
                    setEvent1(event);
                }}
            />
            <XAxis tickLabelAngle={-35}/>
            <DiscreteColorLegend
                style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    left: '42%',
                    top: '-10px',
                }}
                orientation="horizontal"
                items={items}
            />
            <YAxis />
            {event1 && 
            <Hint
                xType="literal"
                yType="literal"
                value={{
                [title1]: serie1.y,
                }}
                style={{ fontSize: 14, position: 'absolute', left: '0px', top: '0px', bottom: '20px' }}
            />
            }
            <LabelSeries
                animation
                data={labelIn}
                getLabel={d => d.y}
                labelAnchorX="start"
                labelAnchorY="text-after-edge"
                style={{ fill: 'gray', stroke: color1, strokeWidth: 0.5 }}
            />
        </FlexibleXYPlot>
        </>
    );
}

export default BarChart;