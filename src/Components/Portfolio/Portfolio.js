import React from 'react';
import styled from 'styled-components'
import { Box, TextInput, } from 'grommet';

/*   BUILT COMPONENTS   */
import { FilterBar as _FilterBar } from '../FilterBar/FilterBar'

/* STATIC FILES */
import Card from './Card'
import logo from './logo.svg';
import './AppLogo.css';
import { REPOSITORIES } from './config'

/* LAYOUT */
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);


export default class Portfolio extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            repo_names: REPOSITORIES,
            available_cards: {},
            applied_filters: {}
        }
    }

    render(){
        const static_layout = true;
        const layouts = {
           xxl: this.state.repo_names.map((key, i) => Object.assign({i: key, x: (i%4), y: (Math.floor(i/12)*10), w: 1, h: 10, static: static_layout})),
            xl: this.state.repo_names.map((key, i) => Object.assign({i: key, x: (i%4), y: (Math.floor(i/12)*10), w: 1, h: 10, static: static_layout})),
            lg: this.state.repo_names.map((key, i) => Object.assign({i: key, x: (i%3), y: (Math.floor(i/12)*10), w: 1, h: 10, static: static_layout})),
            md: this.state.repo_names.map((key, i) => Object.assign({i: key, x: (i%3), y: (Math.floor(i/12)*10), w: 1, h: 10, static: static_layout})),
          smmd: this.state.repo_names.map((key, i) => Object.assign({i: key, x: (i%2), y: (Math.floor(i/12)*10), w: 1, h: 10, static: static_layout})),
            sm: this.state.repo_names.map((key, i) => Object.assign({i: key, x: (i%2), y: (Math.floor(i/12)*10), w: 1, h: 10, static: static_layout})),
            xs: this.state.repo_names.map((key, i) => Object.assign({i: key, x: (i%1), y: (Math.floor(i/12)*10), w: 1, h: 10, static: static_layout})),
           xxs: this.state.repo_names.map((key, i) => Object.assign({i: key, x: (i%1), y: (Math.floor(i/12)*10), w: 1, h: 10, static: static_layout})),
          xxxs: this.state.repo_names.map((key, i) => Object.assign({i: key, x: (i%1), y: (Math.floor(i/12)*10), w: 1, h: 10, static: static_layout})),
        }

        const gridParams = {
            "autoResize" : false,
            "breakpoints" : {
              xxl: 1380,
              xl: 1280,
              lg: 1080,
              md: 996,
              smmd: 860,
              sm: 768,
              xs: 700,
              xxs: 656,
              xxxs: 560
            },
            "cols" : {
              xxl:  4,
              xl:  4,
              lg: 3,
              md: 3,
              smmd: 2,
              sm: 2,
              xs: 1,
              xxs: 1,
              xxxs: 1
            },
            "containerPadding" : {
              xxl: [28, 28],
              xl: [8,28],
              lg: [28,28],
              md: [8, 28],
              smmd: [64,28],
              sm: [20, 28],
              xs: [180, 28],
              xxs: [128, 28],
              xxxs: [64, 28]
            },
            "margin" : {
              xxl: [32,24],
              xl: [12,24],
              lg: [32,24],
              md: [12,24],
              smmd: [32,24],
              sm: [12,24],
              xs: [24,24],
              xxs: [24,24],
              xxxs: [24,24]
            },
            "verticalCompact" : true,
            "compactType" : 'vertical',
            "rowHeight" : 32,
            "className": "layout",
            "layouts" : layouts,
        }

        return(
            <DisplayContainer>
                <TopBar key="AppBar">
                    <AppBar onLogoClick={()=>{}} />
                </TopBar>

                <Display key="Display">
                    <ResponsiveGridLayout {...gridParams}>
                        {
                            this.state.repo_names.map(key => <div key={key} id={key}> <Card repo_name={key} /> </div>)
                        }
                    </ResponsiveGridLayout>
                </Display>
            </DisplayContainer>
        )
    }
}

const TopBar = styled.div`
  top: 0;
  left: 0;
  right: 0;
  min-height: 60px;
  height: 10%;
  position: fixed;
  background: rgba(0,0,0,0.8);
  z-index: 103;
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
    <KeywordInput id="search" placeholder="Search tags..." />
    <KeywordInput id="filter" placeholder="Filter tags..." />
    <Box width='100%' />
  </Box>
);

const KeywordInput = (props) => (
    <Box direction='row'
      align='center'
      justify='between'
      background='none'
      width="100%"
      height="100%"
      pad={{ vertical: 'small', horizontal: 'xsmall' }}
    >
    <div className="black" style={{"width":"100%"}}>
      <TextInput placeholder={props.placeholder} />
    </div>
</Box>
);

const DisplayContainer = styled.div`
  width: 100%;
  height: 100%;
  background: none;
`;

const Display = styled.div`
  position: absolute;
  width: 100%;
  height: 90%;
  top: 10%;
  bottom:0;
  display: block;
`;