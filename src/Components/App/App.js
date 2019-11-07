import logo from './logo.svg';
import React from 'react';
import './App.css';
import { FILLER_TEXT } from '../../GrommetTheme'
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Box, } from 'grommet';

/* BUILT COMPONENTS */
import { SearchFilterBox } from '../SearchFilterBox/SearchFilterBox'
import Button from '../Button/Button'
import DropSelect from '../DropSelect/DropSelect'
import { FilterBar as _FilterBar } from '../FilterBar/FilterBar'


function App() {
  return (
      <MyResponsiveGrid />
  );
}

const layouts = (keys = [], ) => {

}
/* PRODUCTION LAYOUTS
const layouts = {
      lg: [
        {i: 'TopBar', x: 0, y: 0, w: 12, h: 6, static:true},
        {i: 'FilterBar', x: 0, y: 6, w: 0, h: 6, static:true},
        {i: 'SearchPanel', x: 0, y: 6, w: 2.4, h: 60, static:true},
        {i: 'Display', x: 3, y: 6, w: 9.6, h: 60, static:true},
        {i: 'Footer', x: 6, y: 66, w: 12, h: 10, static:true}
      ],
      md: [
        {i: 'TopBar', x: 0, y: 0, w: 12, h: 6, static:true},
        {i: 'FilterBar', x: 0, y: 6, w: 12, h: 6, static:true},
        {i: 'SearchPanel', x: 0, y: 12, w: 0, h: 0, static:true},
        {i: 'Display', x: 0, y: 12, w: 9.6, h: 60, static:true},
        {i: 'Footer', x: 6, y: 72, w: 12, h: 10, static:true}
      ],
    }
*/

const ResponsiveGridLayout = WidthProvider(Responsive);

class MyResponsiveGrid extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    const layouts = {
      lg: [
        {i: 'TopBar', x: 0, y: 0, w: 12, h: 6, static:true},
        {i: 'FilterBar', x: 0, y: 6, w: 12, h: 6, static:true},
        {i: 'SearchPanel', x: 0, y: 12, w: 2.4, h: 60, static:true},
        {i: 'Display', x: 3, y: 12, w: 9.6, h: 60, static:true},
        {i: 'Footer', x: 6, y: 72, w: 12, h: 10, static:true}
      ],
      md: [
        {i: 'TopBar', x: 0, y: 0, w: 12, h: 6, static:true},
        {i: 'FilterBar', x: 0, y: 6, w: 12, h: 6, static:true},
        {i: 'SearchPanel', x: 0, y: 12, w: 0, h: 0, static:true},
        {i: 'Display', x: 0, y: 12, w: 9.6, h: 60, static:true},
        {i: 'Footer', x: 6, y: 72, w: 12, h: 10, static:true}
      ],
    }
    console.log(this.state)
    return (
      <ResponsiveGridLayout
        rowHeight={1}
        align="left"
        alignContent="left"
        className="layout"
        layouts={layouts}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>

        <div key="TopBar" className="dark-gray grid-box"><TopBar /></div>
        <div key="FilterBar" className="dark-gray grid-box"><FilterBar /></div>
        <div key="SearchPanel" className="dark-gray grid-box"><SearchFilterBox /></div>
        <div key="Display" className="dark-gray grid-box"><Display /></div>
        <div key="Footer" className="dark-gray grid-box"><div className="grid-content"><Button /></div></div>

      </ResponsiveGridLayout>
    )
  }
}

const TopBar = () => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='none'
    width="100%"
    height="100%"
    pad={{ vertical: 'small', horizontal: 'medium' }}
  >
    <div className="App-logo" ><div className="App-logo-border"></div><img src={logo} alt="logo" /></div>
    Home
  </Box>
);

const FilterBar = () => (
    <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='none'
    width="100%"
    height="100%"
    pad={{ vertical: 'small', horizontal: 'medium' }}
  >
    <DropSelect />
    <DropSelect />
    <DropSelect />
</Box>
);

const Display = () => (
  <Box
  tag='header'
  direction='column'
  align='center'
  justify='between'
  background='none'
  width="100%"
  height="100%"
  pad={{ vertical: 'small', horizontal: 'medium' }}
>
  <p>{FILLER_TEXT}</p>
</Box>
);

export default App;