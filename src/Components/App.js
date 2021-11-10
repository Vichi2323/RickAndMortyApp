import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import Characters from './Pages/Characters';
import Episodes from './Pages/Episodes';
import Episode from './Pages/Episode';
import Locations from './Pages/Locations';
import Character from './Pages/Character';
import Location from './Pages/Location';

import { ROUTES } from './Constants/Routes';
import Nav from './Nav';


import '../Assets/Styles/App.css';
import '../Assets/Styles/global.css';
import NotFound from './Pages/404';
import Homepage from './Pages/HomePage';


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
					<Route exact path={ROUTES.HOME} component={Homepage} />
					<Route path={ROUTES.CHARACTERS} component={Characters} />
					<Route path={ROUTES.EPISODES} component={Episodes} />
					<Route path={`${ROUTES.EPISODE}${ROUTES.ID}`} component={Episode} />
					<Route path={ROUTES.LOCATIONS} component={Locations} />
					<Route path={`${ROUTES.CHARACTER}${ROUTES.ID}`} component={Character} />
					<Route path={`${ROUTES.LOCATION}${ROUTES.ID}`} component={Location} />
					<Route path={ROUTES[404]} component={NotFound} />

				</Switch>
			</div>
		</BrowserRouter>
	);
};

export default App;
