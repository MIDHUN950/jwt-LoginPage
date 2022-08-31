import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from 'history';
import { Route, BrowserRouter, HashRouter, Switch,Redirect } from 'react-router-dom';
import { Login } from './screens/login'
import { Register } from './screens/register'
import { createRoot } from 'react-dom/client';
import Layout from './Layout';

const hist = createBrowserHistory()


export default function MyApp() {
  return (
    <BrowserRouter>
    <HashRouter history={hist} basename='/'>
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/app' component={App} />
              <Redirect from='/' to='/login' />
            </Switch>
          </HashRouter>
    {/* <Router>
      <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Navigate from='/' to='/login' />
      </Switch>
    </Router> */}
      {/* <Routes>
        <Route  path="/" element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<App/>}/>
        </Route>
      </Routes> */}
    </BrowserRouter>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <MyApp />
  // <Route history={hist} basename='/'>
  //      <Route path='/login' component={Login} />
  //      <Route path='/register' component={Register} />
  //      <Navigate from='/' to='/app' />
  // </Route>,
  //document.getElementById('root')
)
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <HashRouter history={hist} basename='/'>
//      <Switch>
//        <Route path='/login' component={Login} />
//        <Route path='/register' component={Register} />
//        <PrivateRoute path='/app' component={App} />
//        <Redirect from='/' to='/app' />
//      </Switch>
//   </HashRouter>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
