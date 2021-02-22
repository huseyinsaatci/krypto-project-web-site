import React, { Component } from 'react';
import { createChart } from 'lightweight-charts';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.fetchData = this.fetchData.bind(this);
    }

    async componentDidMount() {
        this.chart = createChart(this.ref.current, { width: 500, height: 250 });
        this.areaSeries = this.chart.addAreaSeries();
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
        //const corsProxy = "https://thingproxy.freeboard.io/fetch/"
        const apiLink = "https://api.nomics.com/v1/currencies/sparkline";
        const demoKey = "key=demo-6410726746980cead2a17c9db9ef29af";
        const coinToFetch = "ids=" + this.props.coin.coinID;
        const dateInterval = this.dateInterval(this.props.coin.timeInterval);
        const startDate = "start=" + dateInterval[0];
        const endDate = "end=" + dateInterval[1];
        const hourSuffix = "T00%3A00%3A00Z";
        const resultLink = apiLink + "?" + demoKey + "&" + coinToFetch + "&" + startDate + hourSuffix + "&" + endDate + hourSuffix;
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