import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Characters from './Pages/Characters';
import Episodes from './Pages/Episodes';
import Locations from './Pages/Locations';
import { ROUTES } from './Constants/Routes';
import Nav from './Nav';


import '../Assets/Styles/App.css';
import '../Assets/Styles/global.css';

function App() {
  return (
    <BrowserRouter>
    	<div className="App">
        	<header className="App-header">
            		<Link to={ROUTES.HOME} className="app-link">
							Rick and Morty App
					</Link>
        	</header>
			<Nav />
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
