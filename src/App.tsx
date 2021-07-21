import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import HomeScreen from './screen/home/HomeScreen';
import MetamaskScreen from './screen/metamaskScreen/MetamaskScreen';

function App() {


  return (
    <div className="App">
      {(window as any).ethereum && (window as any).ethereum.isMetaMask ? <HomeScreen /> :
        <MetamaskScreen />
      }
    </div>
  );
}

export default App;
