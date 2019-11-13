import { FILLER_TEXT } from '../../GrommetTheme'
import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Box, TextInput, } from 'grommet';
import styled from 'styled-components';

/* BUILT COMPONENTS */
import { SearchFilterBox } from '../SearchFilterBox/SearchFilterBox'
import DropSelect from '../DropSelect/DropSelect'
import { FilterBar as _FilterBar } from '../FilterBar/FilterBar'
import SolarSystem from '../Orbit/Orbit'
import FadeContainer from '../Containers/Fade'
import Splash from '../Containers/Splash'
import { Landing } from '../Landing/Landing'

import Portfolio from '../Portfolio/Portfolio'


const ResponsiveGridLayout = WidthProvider(Responsive);

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showOrbitalSystem: false,
      landing: () => <Landing />,
      portfolio: () => <Portfolio />,
      mainDisplayContent: () => undefined,
    }

    this.setMainDisplayContent = this.setMainDisplayContent.bind(this)
  }

  componentDidMount(){
    if (!this.state.mainDisplayContent()) this.setState({mainDisplayContent: this.state.landing})
  }

  setMainDisplayContent(content){
    this.setState({mainDisplayContent: content})
  }

  showOrbitalSystem() {
    this.setState({showOrbitalSystem: true})
  }

  hideOrbitalSystem(fadeOut) {
    setTimeout(() => {this.setState({showOrbitalSystem: false})}, 0)
  }

  render() {
    const isLanding = (this.state.mainDisplayContent===this.state.landing)

    const OrbitalSplash = (props) => <SolarSystem onExit={ this.hideOrbitalSystem.bind(this, props.onHide) }  N={8} />
    const AppContainer = MainAppContainer(isLanding)
    const TopBar = AppBarContainer(isLanding)
    return (
      <AppContainer>
        {(this.state.showOrbitalSystem) ? <Splash><FadeContainer children={OrbitalSplash} /></Splash> : ""}


        <TopBar key="AppBar">
          <AppBar onLogoClick={this.showOrbitalSystem.bind(this)} />
        </TopBar>

        <Spacer />


        <DisplayContainer>
          <Display key="Display">
            {this.state.mainDisplayContent()}
          </Display>
        </DisplayContainer>

      </AppContainer>
    )
  }
}

const MainAppContainer = (landing) => styled.div`
    position: fixed;
    bottom: 0;
    top: ${(landing?'0':'10%')};
    left: 0;
    right: 0;
    height: 100%;
    overflow-y: ${(landing)?'hidden':'auto'};
    overflow-x: hidden;
`;

const AppBarContainer = (landing) => styled.div`
  top: 0;
  left: 0;
  right: 0;
  min-height: 60px;
  height: 10%;
  position: fixed;
  background: var(--dark-gray);
  z-index: 100;
  display: ${(landing)?'none':'auto'}
`;

const AppBar = (props) => (
  <Box
    direction='row'
    align='center'
    background='none'
    width="100%"
    height="100%"
    overflow="hidden"
    position="absolute"
    pad={{ vertical: 'small', horizontal: 'medium' }}
    border={{"color":"var(--medium-gray)", "side":"bottom"}}
  >
    <div className="App-logo" onClick={props.onLogoClick} ><div className="App-logo-border"></div><img src={logo} alt="logo" /></div>
    <FilterBar /> Browse Projects / About / Connect
  </Box>
);

const FilterBar = () => (
    <Box direction='row'
      align='center'
      justify='between'
      background='none'
      width="100%"
      height="100%"
      pad={{ vertical: 'small', horizontal: 'medium' }}
    >
    <DropSelect options={["hi", "bye"]} placeholder="Select Category" />
    <div className="black" style={{"width":"100%", "marginLeft":"4px"}}>
      <TextInput placeholder="Filter Search..." />
    </div>
</Box>
);

const Spacer = styled.div`
  height: 10%
  min-height : 60px;
  position: absolute;
  display: inline-block;
`;

const DisplayContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Display = styled.div`
  width: 100%;
  height: 100%;
`;


export default App;