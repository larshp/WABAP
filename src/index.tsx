/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

class Main extends React.Component<{}, {}> {
  public render(): React.ReactElement<Provider> {
    return (<p>Hello world</p>);
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));