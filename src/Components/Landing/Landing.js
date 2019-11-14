import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import styled from 'styled-components'
import ColorfulImage from './colorful.png'
import GoldImage from './gold.jpg'
import Terminal from './Terminal'
import SolarSystem from '../Orbit/Orbit'
import { Hearticle } from './Hearticle'

export const Landing = () => (
<BackgroundWrapper>
  <ReactFullpage
    //fullpage options
    //licenseKey = {'YOUR_KEY_HERE'}
    scrollingSpeed = {700} /* Options here */

    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>

                <Hello className="section">
                    <h1>Hi, I'm Message.</h1>
                    <HelloMessage>Web designer, programmer, and math buff. I have experience ranging from mathematics, statistics, and machine learning, to UI design and scripting in Python and Javascript.</HelloMessage>
                    <Hearticle />
                </Hello>

                <Developer className="section">
                    <DevTitle><h1>Developer</h1></DevTitle>
                    <Term><Terminal /></Term>
                </Developer>

                <Designer className="section">
                    <SolarSystem onExit={() => {}} N={8} />
                </Designer>

                <Programmer className="section">
                    <h1>Programmer</h1>
                </Programmer>



        </ReactFullpage.Wrapper>
      );
    }}
  />
  </BackgroundWrapper>
);

const BackgroundWrapper = styled.div`
    min-height: 100%
    top: 0;
    left: 0;
    z-index: -9999;
    height: auto;
    position: fixed;
    background: var(--dark-gray) url(${ColorfulImage});
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
`;

const Hello = styled.div`
    position: absolute;
    color: #000;
    text-align: center;
    font-size: 1.5em;
    line-height: 1.5em;
    width: 100%;
    background:linear-gradient(#AFE, #FAC);
`;

const HelloMessage = styled.div`
    width: 55%;
    margin-left: auto;
    margin-right: auto;
`;

const Developer = styled.div`
`;

const Term = styled.div`
    position: absolute;
    top: 15%;
    bottom: 0;
    width: 90%;
    margin: 0 5% 5% 5%;
`;

const DevTitle = styled.div`
    height: 100%;
    margin: 10% 0 0 5%;
    color: rgba(255,255,255,0.7);
    text-align: left;
    font-family: "Lucida Console", "DejaVu Sans Mono", "Consolas";
    font-size: 2em;
`;


const Designer = styled.div`
    background: var(--medium-gray);
    width: 100%;
    height: 100%;
`;

const Programmer = styled.div`
    background: var(--gray);
`;