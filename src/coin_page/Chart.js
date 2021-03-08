import React, { Component } from 'react';
import { createChart } from 'lightweight-charts';
require('dotenv').config();

class Chart extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.fetchData = this.fetchData.bind(this);
    }

    async componentDidMount() {
        this.chart = createChart(this.ref.current, {
            width: 550,
            height: 395,
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

    dateInterval(intervalday) {
        const reverseString = (str) => { return str.split("-").reverse().join("-"); }
        const endDate = reverseString(new Date().toLocaleDateString("tr-TR").replaceAll(".", "-"));
        const [day, month, year] = new Date().toLocaleDateString("tr-TR").split(".");
        let totalDay = parseInt(day) + (parseInt(month) * 30) + (parseInt(year) * 365);
        totalDay -= intervalday;
        const resultYear = Math.floor(totalDay / 365);
        const resultMonth = Math.floor((totalDay % 365) / 30) - 1;
        const resultDay = (totalDay % 365) % 30;
        const startDate = reverseString(new Date(resultYear, resultMonth, resultDay).toLocaleDateString("tr-TR").replaceAll(".", "-"));
        return [startDate, endDate];
    }

    async fetchData() {
        const corsProxy = "https://arcane-temple-76069.herokuapp.com/"
        const apiLink = "https://api.nomics.com/v1/currencies/sparkline";
        const apiKey = "key=" + process.env.REACT_APP_API_KEY;
        const coinToFetch = "ids=" + this.props.id;
        const dateInterval = this.dateInterval(this.props.timeInterval);
        const startDate = "start=" + dateInterval[0];
        const endDate = "end=" + dateInterval[1];
        const hourSuffix = "T00%3A00%3A00Z";
        const resultLink = corsProxy + apiLink + "?" + apiKey + "&" + coinToFetch + "&" + startDate + hourSuffix + "&" + endDate + hourSuffix;
        const response = await fetch(resultLink);
        const json = await response.json();
        const readyChartData = (json) => {
            const data = [];
            for (let index = 0; index < json.prices.length; index++) {
                data[index] = { "time": json.timestamps[index], "value": json.prices[index] };
            }
            return data;
        }
        return readyChartData(json[0]);
    }

    async drawChart() {
        const data = await this.fetchData();
        this.areaSeries.setData(data);
        this.chart.timeScale().fitContent();
    }

    render() {
        this.drawChart();
        return (
            <div ref={this.ref} />
        );
    }
}

export default Chart;