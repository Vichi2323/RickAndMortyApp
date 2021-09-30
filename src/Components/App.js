import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Characters from './Pages/Characters';
import Episodes from './Pages/Episodes';
import Locations from './Pages/Locations';
import { ROUTES } from './Constants/Routes';


import '../Assets/Styles/global.css';
import '../Assets/Styles/App.css';

function App() {
  return (
    <BrowserRouter>
    	<div className="App">
        	<header className="App-header">
            	Rick and Morty App
        	</header>
			<Switch>
				<Route path={ROUTES.CHARACTERS} component={Characters} />
				<Route path={ROUTES.EPISODES} component={Episodes} />
				<Route path={ROUTES.LOCATIONS} component={Locations} />
			</Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
