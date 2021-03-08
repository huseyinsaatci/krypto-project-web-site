import Header from '../Header';
import Footer from '../Footer';
import CoinTable from './CoinTable';

function MainPage() {
    return (
        <div className="main dark-gradient-b">
            <Header />
            <CoinTable />
            <Footer />
        </div>
    );
}

export default MainPage;