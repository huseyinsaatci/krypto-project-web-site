import { Route, Switch } from 'react-router-dom';
import Content from './Content';
import MainPage from './MainPage';

function App() {
  //<MobileappStand></MobileappStand>
  return (
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/:coinID" component={Content} />
    </Switch>
  );
}

export default App;