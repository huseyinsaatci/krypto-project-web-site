import { Route, Switch } from 'react-router-dom';
import CoinPage from './coin_page/CoinPage';
import MainPage from './main_page/MainPage';

function App() {
  return (
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/:coinID" component={CoinPage} />
    </Switch>
  );
}

export default App;