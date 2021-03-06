import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';
import './index.css';
import App from './App';
import AppStateProvider, {useAppState} from './state';
import {VideoProvider} from "./components/VideoProvider";
import generateConnectionOptions from "./utils/generateConnectionOptions/generateConnectionOptions";
import CssBaseline from "@material-ui/core/CssBaseline";
import {MuiThemeProvider} from '@material-ui/core/styles';
import theme from "./theme";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import config from './config';

const basePath = config.appBasePath || "/";

const VideoApp = () => {
    const {setError, settings} = useAppState();
    const connectionOptions = generateConnectionOptions(settings);

    return (
        <>
            <VideoProvider options={connectionOptions} onError={setError}>
                {/*<ErrorDialog dismissError={() => setError(null)} error={error} />*/}
                <App/>
            </VideoProvider>
        </>
    );
};

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
            <AppStateProvider>
                <Switch>
                    <PrivateRoute exact path={basePath}>
                        <VideoApp/>
                    </PrivateRoute>
                    <PrivateRoute exact path={`${basePath}room/:URLRoomName`}>
                        <VideoApp/>
                    </PrivateRoute>
                    <PrivateRoute exact path={`${basePath}room/:URLRoomName/:UserName`}>
                        <VideoApp/>
                    </PrivateRoute>
                    <Redirect to={basePath}/>
                </Switch>
            </AppStateProvider>
        </Router>
    </MuiThemeProvider>,
    document.getElementById('root')
);


