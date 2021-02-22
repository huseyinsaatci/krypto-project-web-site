import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import './style.css';
import Chart from './Chart';
import coin_colors from './coin_data.json';

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = { coin: [], isLoading: true, dateInterval: 30, firstInteraction: false };
        this.fetchData = this.fetchData.bind(this);
        this.coinConverter = this.coinConverter.bind(this);
        this.chartTable = this.chartTable.bind(this);
        this.coinRef = React.createRef();
        this.usdRef = React.createRef();
        this.chartRefs = { chartbtn1: React.createRef(), chartbtn2: React.createRef(), chartbtn3: React.createRef(), chartbtn4: React.createRef() }
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

    coinConverter() {
        const setter = (ref, value) => { ref.current.value = value };
        const onfocusUSD = () => { setter(this.usdRef, null); setter(this.coinRef, 0) };
        const onfocusCoin = () => { setter(this.usdRef, 0); setter(this.coinRef, null) };
        const setcoinValue = () => { setter(this.coinRef, (this.usdRef.current.value / this.state.coin.price)) }
        const setusdValue = () => { setter(this.usdRef, (this.coinRef.current.value * this.state.coin.price)) }
        return (
            <div className="mb-4 rad-10 container fs-5_6" >

                <div className="container rad-10-top " style={{ "backgroundColor": coin_colors[this.props.match.params.coinID] }}>
                    <div className="row p-2">
                        <div className="col-2 my-auto"><span className="iconify image-fluid icon-crypto" data-icon={"cryptocurrency:" + this.props.match.params.coinID.toLowerCase()} ></span></div>
                        <div className="col-4 my-auto">
                            <div className="row pastel">{this.props.match.params.coinID}</div>
                            <div className="row">{this.state.coin.name}</div>
                        </div>
                        <div className="col-6 my-auto">
                            <div className="input-group mb-2 mt-2">
                                <input type="text" ref={this.coinRef} maxLength="8" onInput={setusdValue} onFocus={onfocusCoin} value={null} className="form-control input bg-transparent border-0 shadow-none fw-bolder" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container bg-white rad-10-bottom ">
                    <div className="row p-2">
                        <div className="col-2 my-auto"><span className="iconify image-fluid icon-dollar" data-icon="ant-design:dollar-circle-filled"></span></div>
                        <div className="col-4 my-auto text-dark">
                            <div className="row pastel">USD</div>
                            <div className="row">United States Dollar</div>
                        </div>
                        <div className="col-6 my-auto">
                            <div className="input-group mb-2 mt-2" >
                                <input type="text" ref={this.usdRef} maxLength="8" onInput={setcoinValue} onFocus={onfocusUSD} value={null} className="form-control input-dollar bg-transparent border-0 shadow-none fw-bolder" placeholder="" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    chartTable() {
        return (
            <div className="container bg-white rad-10">
                <div className="row p-2">
                    <Chart coin={{ coinID: this.props.match.params.coinID, timeInterval: this.state.dateInterval }} />
                </div>
                <div className="row p-2">
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input ref={this.chartRefs.chartbtn1} type="radio" className="btn-check" onClick={() => { this.setState({ dateInterval: 1 }) }} name="btnradio" id="btnradio1" autoComplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="btnradio1">Day</label>

                        <input ref={this.chartRefs.chartbtn2} type="radio" className="btn-check" onClick={() => { this.setState({ dateInterval: 7 }) }} name="btnradio" id="btnradio2" autoComplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="btnradio2">Week</label>

                        <input ref={this.chartRefs.chartbtn3} type="radio" className="btn-check" onClick={() => { this.setState({ dateInterval: 30 }) }} name="btnradio" id="btnradio3" autoComplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="btnradio3">Month</label>

                        <input ref={this.chartRefs.chartbtn4} type="radio" className="btn-check" onClick={() => { this.setState({ dateInterval: 365 }) }} name="btnradio" id="btnradio4" autoComplete="off" />
                        <label className="btn btn-outline-primary" htmlFor="btnradio4">Year</label>
                    </div>
                </div>
            </div>
        );
    }

    async fetchData() {
        //const corsProxy = "https://cors-anywhere.herokuapp.com/"
        const corsProxy = "https://thingproxy.freeboard.io/fetch/"
        const apiLink = "https://heroku-vue-express.herokuapp.com/coins/";
        const resultLink = corsProxy + apiLink + this.props.match.params.coinID;
        const response = await fetch(resultLink);
        let json = await response.json();
        this.setState({ coin: json[0] });
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <div className="gradient">
                    <Header />
                    <div className="container dark-blue-b font mt-4 mb-4 p-3 rad-20">
                        <div className="row">
                            <div className="col">
                                {this.chartTable()}
                            </div>
                            <div className="col">{this.coinConverter()}</div>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        }
        return null;
    }
}

export default Content;