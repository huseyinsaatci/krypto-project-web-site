import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function TableItem(props) {
    const parseData = (number) => { return (Number.parseFloat(number)).toFixed(2) };
    const change = parseData((props.coinPercentage) * 100);
    const color = change < 0 ? "red" : "green";
    const arrowIcon = change < 0 ? "bi bi-caret-down-fill " + color : "bi bi-caret-up-fill " + color;
    return (
        <Link to={props.coinId}>
            <li className="row p-2 list-border rad-20 mt-2">
                <div className="col-2 my-auto">
                    <div className="row">
                        <div className="col-2"><img src={props.coinLogo} alt="coin_logo" className=" image-fluid icon me-3" /></div>
                        <div className="col-10 my-auto">{props.coinId}</div>
                    </div>
                </div>
                <div className="col-2 my-auto">{props.coinName}</div>
                <div className="col-2 my-auto">${parseData(props.coinPrice)}</div>
                <div className="col-4">
                    <div className="row">
                        <div className={"col-4 my-auto " + color}><i className={arrowIcon}></i> ${parseData(props.coin24hChange).replace("-", "")} </div>
                        <div className={color + "-b percentage rad-10 col-8 my-auto"}>{change.replace("-", "")}%</div>
                    </div>
                </div>
                <div className="col-2 my-auto">{parseData(props.coinVolume)}</div>
            </li>
        </Link>
    );
}


class CoinTable extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [], isLoading: true };
        this.fetchData = this.fetchData.bind(this);
    }

    async componentDidMount() {
        const timeInterval = 6000;
        await this.fetchData();
        this.fetchInterval = setInterval(
            () => this.fetchData(), timeInterval
        )
        this.setState({ isLoading: false });
    }

    componentWillUnmount() {
        clearInterval(this.fetchInterval);
    }

    async fetchData() {
        //const corsProxy = "https://cors-anywhere.herokuapp.com/"
        const corsProxy = "https://thingproxy.freeboard.io/fetch/"
        const apiLink = "https://heroku-vue-express.herokuapp.com/coins/relevant";
        const resultLink = apiLink;
        const response = await fetch(resultLink);
        let json = await response.json();
        this.setState({ data: json });
    }

    createTableItem(data) {
        return <TableItem key={data.rank} coinName={data.name} coinId={data.id} coinLogo={data.logo_url} coinPrice={data.price} coinVolume={data["1d"].volume} coin24hChange={data["1d"].price_change} coinPercentage={data["1d"].price_change_pct} />
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <div className="container font mt-4 mb-4 bg-white p-3 rad-20">
                    <div className="row p-1 fw-bold list-border text-info">
                        <div className="col-2"> Coin</div>
                        <div className="col-2">Name</div>
                        <div className="col-2">Price</div>
                        <div className="col-4">24h Change / Percentage</div>
                        <div className="col-2">Volume</div>
                    </div>
                    <ul>
                        {this.state.data.map(this.createTableItem)}
                    </ul>
                </div>
            );
        }
        return null;
    }
}

export default CoinTable;