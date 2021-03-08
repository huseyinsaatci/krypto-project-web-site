import React, { Component, PureComponent } from 'react';
import '../style.css';
import Chart from './Chart';
import coin_colors from '../data_files/coin_data.json';
import * as icons from '../data_files/icons'

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = { coin: [], isLoading: true };
        this.fetchData = this.fetchData.bind(this);
    }

    async componentDidMount() {
        const timeInterval = 6000;
        await this.fetchData();
        this.setState({ isLoading: false });
        this.fetchInterval = setInterval(
            () => this.fetchData(), timeInterval
        )
    }

    componentWillUnmount() {
        clearInterval(this.fetchInterval);
    }

    async fetchData() {
        const corsProxy = "https://arcane-temple-76069.herokuapp.com/"
        const apiLink = "https://heroku-vue-express.herokuapp.com/coins/";
        const resultLink = corsProxy + apiLink + this.props.coinID;
        const response = await fetch(resultLink);
        let json = await response.json();
        this.setState({ coin: json[0] });
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <div className="container dark-blue-b font my-2 p-3 rad-20">
                    <div className="row">
                        <CoinStand coin={this.state.coin} />
                    </div>
                    {/* <div className="row">
                        <StatsOutline coin={this.state.coin} />
                    </div> */}
                    <div className="row">
                        <div className="col">
                            <ChartTable id={this.state.coin.id} />
                        </div>
                        <div className="col">
                            <div className="row">
                                <PriceStatistics coin={this.state.coin} />
                            </div>
                            <div className="row">
                                <CoinConverter coin={this.state.coin} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}

class PriceStatistics extends Component {
    render() {
        const parseData = (number) => { return (Number.parseFloat(number)).toFixed(2) };
        const { coin } = this.props;
        return (
            <div className="mb-2">
                <div className="container rad-10 dark-b">

                    <div className="row mb-4 pt-3">
                        <span className="fs-3 text-center">
                            {coin.id} Price Statistics
                        </span>
                    </div>

                    <div className="row fs-5_6 py-3 border-bottom">
                        <div className="col">
                            {coin.name} Price
                        </div>

                        <div className="col text-end">
                            ${parseData(coin.price)}
                        </div>
                    </div>

                    <div className="row fs-5_6 py-3 border-bottom">
                        <div className="col-4">
                            Price Change
                        </div>

                        <div className="col-8 text-end">
                            <div className="row mb-2">
                                <div className="col">
                                    ${parseData(coin["1d"].price_change)}
                                    {icons.changeVisualizer(parseData(coin["1d"].price_change_pct), "fs-7 p-0_5 rad-5 ms-2")}
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="row fs-5_6 py-3 border-bottom">
                        <div className="col-4">
                            Volume
                        </div>

                        <div className="col-8 text-end">
                            <div className="row mb-2">
                                <div className="col">
                                    ${parseData(coin["1d"].volume)}
                                    {icons.changeVisualizer(parseData(coin["1d"].volume_change_pct), "fs-7 p-0_5 rad-5 ms-2")}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row fs-5_6 py-3">
                        <div className="col-4">
                            Market Cap
                        </div>

                        <div className="col-8 text-end">
                            <div className="row mb-2">
                                <div className="col">
                                    ${coin.market_cap}
                                    {icons.changeVisualizer(parseData(coin["1d"].market_cap_change_pct), "fs-7 p-0_5 rad-5 ms-2")}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

class StatsOutline extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const parseData = (number) => { return (Number.parseFloat(number)).toFixed(2) };
        const { coin } = this.props;
        return (
            <div className="container mb-4 mt-2 fs-5_6">
                <div className="container border-top border-bottom">
                    <div className="row text-start py-4">
                        <div className="col border-end">
                            <div className="row m-1 pb-2">
                                <div className="col text-info pastel">
                                    Market Cap
                                </div>
                            </div>
                            <div className="row m-1 pb-3">
                                <div className="col">
                                    ${coin.market_cap}
                                </div>
                            </div>
                            <div className="row m-1 pb-2">
                                <div className="col">
                                    {icons.changeVisualizer(parseData(coin["1d"].market_cap_change_pct), "p-1")}
                                </div>
                            </div>
                        </div>
                        <div className="col border-end">
                            Fully Diluted Market Cap
                        </div>
                        <div className="col border-end">
                            <div className="row m-1 pb-2">
                                <div className="col">
                                    Volume
                                </div>
                            </div>
                            <div className="row m-1 pb-3">
                                <div className="col">
                                    ${coin["1d"].volume}
                                </div>
                            </div>
                            <div className="row m-1 pb-2">
                                <div className="col">
                                    {icons.changeVisualizer(parseData(coin["1d"].volume_change_pct), "p-1")}
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            Circulating Supply
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class CoinStand extends Component {
    render() {
        const { coin } = this.props;
        const parseData = (number) => { return (Number.parseFloat(number)).toFixed(2) };
        const change = parseData((coin["1d"].price_change_pct) * 100);

        return (
            <div className="container">
                <div className="row">
                    <div className="row my-3 mx-auto">
                        <div className="col text-start border border-end-0 border-primary p-3 rad-10-left">
                            {icons.cryptoCoinIconCustom(coin.id, "icon-big me-2")}
                            <span className="fs-1">
                                {coin.name}
                            </span>
                        </div>
                        <div className="col text-end border border-start-0 border-primary p-3 rad-10-right">
                            <div className="col">
                                <span className="fs-1">
                                    ${(Number.parseFloat(coin.price)).toFixed(4)}
                                    {icons.changeVisualizer(change, "p-1 ms-3 fs-4 align-middle")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class CoinConverter extends Component {
    constructor(props) {
        super(props);
        this.coinRef = React.createRef();
        this.usdRef = React.createRef();
        this.setter = (ref, value) => { ref.current.value = value };
        this.onfocusUSD = () => { this.setter(this.usdRef, null); this.setter(this.coinRef, 0) };
        this.onfocusCoin = () => { this.setter(this.usdRef, 0); this.setter(this.coinRef, null) };
        this.setcoinValue = () => { this.setter(this.coinRef, (this.usdRef.current.value / this.props.coin.price).toFixed(4)) }
        this.setusdValue = () => { this.setter(this.usdRef, (this.coinRef.current.value * this.props.coin.price).toFixed(4)) }
    }

    render() {
        const { coin } = this.props;
        return (
            <div className="rad-10 fs-5_6" >

                <div className="container rad-10-top " style={{ backgroundColor: coin_colors[coin.id] }}>
                    <div className="row p-2">
                        <div className="col-2 my-auto">
                            <span
                                className="iconify image-fluid icon-big"
                                data-icon={"cryptocurrency:" + coin.id.toLowerCase()} >
                            </span>
                        </div>
                        <div className="col-4 my-auto">
                            <div className="row pastel">{coin.id}</div>
                            <div className="row">{coin.name}</div>
                        </div>
                        <div className="col-6 my-auto">
                            <div className="input-group my-2">
                                <input
                                    type="text"
                                    ref={this.coinRef}
                                    maxLength="8"
                                    onInput={this.setusdValue}
                                    onFocus={this.onfocusCoin}
                                    value={null}
                                    className="form-control input bg-transparent border-0 shadow-none fw-bolder"
                                    aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container bg-white rad-10-bottom ">
                    <div className="row p-2">
                        <div className="col-2 my-auto">
                            <span
                                className="iconify image-fluid icon-dollar"
                                data-icon="ant-design:dollar-circle-filled">
                            </span>
                        </div>
                        <div className="col-4 my-auto text-dark">
                            <div className="row pastel">USD</div>
                            <div className="row">United States Dollar</div>
                        </div>
                        <div className="col-6 my-auto">
                            <div className="input-group my-2" >
                                <input type="text"
                                    ref={this.usdRef}
                                    maxLength="8"
                                    onInput={this.setcoinValue}
                                    onFocus={this.onfocusUSD}
                                    value={null}
                                    className="form-control input-dollar bg-transparent border-0 shadow-none fw-bolder"
                                    placeholder="" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ChartTable extends PureComponent {
    constructor(props) {
        super(props);
        this.state = { dateInterval: 30 };
    }

    render() {
        return (
            <div className="container rad-10 dark-b">
                <div className="row p-2">
                    <Chart id={this.props.id} timeInterval={this.state.dateInterval} />
                </div>
                <div className="row p-2">
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input
                            type="radio"
                            className="btn-check"
                            onClick={() => { this.setState({ dateInterval: 1 }) }}
                            name="btnradio"
                            id="btnradio1"
                            autoComplete="off" />
                        <label
                            className="btn btn-outline-primary"
                            htmlFor="btnradio1">
                            Day
                        </label>

                        <input
                            type="radio"
                            className="btn-check"
                            onClick={() => { this.setState({ dateInterval: 7 }) }}
                            name="btnradio"
                            id="btnradio2"
                            autoComplete="off" />
                        <label
                            className="btn btn-outline-primary"
                            htmlFor="btnradio2">
                            Week
                        </label>

                        <input
                            type="radio"
                            className="btn-check"
                            onClick={() => { this.setState({ dateInterval: 30 }) }}
                            name="btnradio"
                            id="btnradio3"
                            autoComplete="off"
                            defaultChecked />
                        <label
                            className="btn btn-outline-primary"
                            htmlFor="btnradio3">
                            Month
                        </label>

                        <input
                            type="radio"
                            className="btn-check"
                            onClick={() => { this.setState({ dateInterval: 365 }) }}
                            name="btnradio"
                            id="btnradio4"
                            autoComplete="off" />
                        <label
                            className="btn btn-outline-primary"
                            htmlFor="btnradio4">
                            Year
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;