import React, { PureComponent } from 'react';
import { createChart } from 'lightweight-charts';

class Chart extends PureComponent {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.fetchData = this.fetchData.bind(this);
    }

    toTimestamps(strDate) {
        const datum = Date.parse(strDate);
        return datum / 1000;
    }

    async componentDidMount() {
        this.chart = createChart(this.ref.current, {
            width: 550,
            height: 383,
        });
        this.chart.applyOptions(
            {
                layout: {
                    backgroundColor: '#131722',
                    textColor: '#d1d4dc',
                    fontSize: 12,
                    fontFamily: 'Poppins',
                },
                grid: {
                    vertLines: {
                        color: 'rgba(42, 46, 57, 0)',
                    },
                    horzLines: {
                        color: 'rgba(42, 46, 57, 0.6)',
                    },
                }, rightPriceScale: {
                    scaleMargins: {
                        top: 0.3,
                        bottom: 0.25,
                    },
                    borderVisible: false,
                },
                timeScale: {
                    rightBarStaysOnScroll: true,
                    timeVisible: this.props.isTimeVisible,
                }
            }
        );
        this.areaSeries = this.chart.addAreaSeries({
            topColor: 'rgba(38,198,218, 0.56)',
            bottomColor: 'rgba(38,198,218, 0.04)',
            lineColor: 'rgba(38,198,218, 1)',
            lineWidth: 2,
        });
    }

    async fetchData() {
        const corsProxy = "https://arcane-temple-76069.herokuapp.com/"
        const apiLink = "https://heroku-vue-express.herokuapp.com/sparkline/";
        const dateInterval = this.props.timeInterval + "/";
        const coinID = this.props.id;
        const resultLink = corsProxy + apiLink + dateInterval + coinID;
        const response = await fetch(resultLink);
        const json = await response.json();
        const readyChartData = (json) => {
            const data = [];
            for (let index = 0; index < json.prices.length; index++) {
                data[index] = { "time": this.toTimestamps(json.timestamps[index]), "value": json.prices[index] };
            }
            return data;
        }
        return readyChartData(json);
    }

    async drawChart() {
        const data = await this.fetchData();
        this.areaSeries.setData(data);
        this.chart.timeScale().fitContent();
        this.chart.applyOptions({
            timeScale: {
                timeVisible: this.props.isTimeVisible,
            }
        })
    }

    render() {
        this.drawChart();
        return (
            <div ref={this.ref} />
        );
    }
}

export default Chart;