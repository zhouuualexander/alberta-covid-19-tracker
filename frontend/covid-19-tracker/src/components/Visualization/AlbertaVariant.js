import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Legend,
    ValueAxis,
    Chart,
    Title,
    ArgumentAxis,
    SplineSeries,
} from '@devexpress/dx-react-chart-material-ui';
const labelHalfWidth = 500;
let lastLabelCoordinate;

const ArgumentLabel = props => {
    const { x } = props;
    // filter Labels
    if (
        lastLabelCoordinate &&
        lastLabelCoordinate < x &&
        x - lastLabelCoordinate <= labelHalfWidth
    ) {
        return null;
    }
    lastLabelCoordinate = x;
    return <ArgumentAxis.Label {...props} />;
};
export default class AlbertaVariant extends React.PureComponent {

    old = [...this.props.albertaDailyVariant];
    newCases = this.old.map((data, i) => {
        if (this.props.albertaDailyVariant[i + 1]) {
            return ({
                india: Math.round(this.props.albertaDailyVariant[i]["b_1_617"]),
                british: Math.round(this.props.albertaDailyVariant[i]["b_1_1_7"]),
                brazil: Math.round(this.props.albertaDailyVariant[i]["p_1"]),
                southAfrica: Math.round(this.props.albertaDailyVariant[i]["b_1_351"]),
                argument: data.date.slice(0, 10),
            });
        }
        else {
            return ({
                southAfrica: Math.round(this.props.albertaDailyVariant[i]["b_1_351"]),
                brazil: Math.round(this.props.albertaDailyVariant[i - 1]["p_1"]),
                british: Math.round(this.props.albertaDailyVariant[i - 1]["b_1_1_7"]),
                india: Math.round(this.props.albertaDailyVariant[i - 1]["b_1_617"]),
                argument: 0,
            });;
        }

    });
    state = {
        data: this.newCases
    };

    render() {

        const { data: chartData } = this.state;
        return (
            <React.Fragment >
                <Paper style={{ width: "70vw", marginBottom: '3vh' }} >
                    <Chart height={300}
                        width="70vw"
                        data={chartData}
                    >
                        <Title text="Alberta Variant Beta VS Delta curve VS Gamma curve" />
                        <ValueAxis />
                        <SplineSeries
                            name="Delta (India B.1.617)"
                            valueField="india"
                            argumentField="argument"
                        />
                        <SplineSeries
                            name="Beta (South Africa B.1.351)"
                            valueField="southAfrica"
                            argumentField="argument"
                        />
                        <SplineSeries
                            name="Gamma (Brazil P.1)"
                            valueField="brazil"
                            argumentField="argument"
                        />
                        <ArgumentAxis labelComponent={ArgumentLabel} />
                        <Legend />
                    </Chart>
                </Paper>
                <Paper style={{ width: "70vw", marginBottom: '3vh' }}>
                    <Chart height={300}
                        width="70vw"
                        data={chartData}
                    >
                        <Title text="Alberta Variant Alpha curve" />
                        <ValueAxis />
                        <SplineSeries
                            name="Alpha (British B.1.1.7)"
                            valueField="british"
                            argumentField="argument"
                        />
                        <SplineSeries
                            name="Gamma (Brazil P.1)"
                            valueField="brazil"
                            argumentField="argument"
                        />
                        <ArgumentAxis labelComponent={ArgumentLabel} />
                        <Legend />
                    </Chart>

                </Paper>
            </React.Fragment>
        );
    }
}
