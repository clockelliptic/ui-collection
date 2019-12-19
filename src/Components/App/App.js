
import React from 'react';
import styled from 'styled-components';

/*   BUILT COMPONENTS   */
import { FilterBar as _FilterBar } from '../FilterBar/FilterBar'

/*   VIEWS & PAGES   */
import Landing from '../Landing/Landing'
import Portfolio from '../Portfolio/Portfolio'

/* STATIC */
import ColorfulImage from '../Landing/static/colorful.png'


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      landing: () => <Landing />,
      portfolio: () => <Portfolio />,
      mainDisplayContent: () => undefined,
    }

    this.setMainDisplayContent = this.setMainDisplayContent.bind(this)
  }

  componentDidMount(){
    if (!this.state.mainDisplayContent()) this.setState({mainDisplayContent: this.state.landing}) /* <---- SET DEFAULT VIEW HERE <---- */
  }

  setMainDisplayContent(content){
    this.setState({mainDisplayContent: content})
  }

  render() {
    const portfolioShowing = this.state.mainDisplayContent === this.state.portfolio
    const AppContainer = styled.div`
        position: fixed;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
        overflow-y: ${ (portfolioShowing) ? 'scroll' : 'auto' };
        overflow-x: ${ (portfolioShowing) ? 'hidden' : 'auto' };
        background: var(--dark-gray) url(${ColorfulImage});
        background-size: ${ (portfolioShowing) ? 'auto' : 'cover' };
        background-position: center;
        background-attachment: fixed;
    `;

    return (
      <AppContainer className="MainAppContainer">
        { this.state.mainDisplayContent() }
      </AppContainer>
    )
  }
}

export default App;