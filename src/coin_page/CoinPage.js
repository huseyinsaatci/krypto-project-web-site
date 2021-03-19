import Header from '../Header';
import Footer from '../Footer';
import Content from './Content';
import '../style.css';

const isValidCoin = (coinID) => {
    const validCoins = ["BTC", "ETH", "ADA", "DOT", "DOGE", "XRP", "LTC", "LINK", "XLM", "ATOM", "EOS", "TRX", "CHZ", "NEO", "DASH"]
    return validCoins.includes(coinID);
}

function CoinPage(props) {
    if (isValidCoin(props.match.params.coinID)) {
        return (
            <div className=" dark-gradient-b">
                <Header />
                <Content coinID={props.match.params.coinID} />
                <Footer />
            </div>
        );
    }
    return "404 Page Not Found";
}

export default CoinPage;