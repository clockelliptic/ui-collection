import React from 'react';
import styled from 'styled-components'
import { Scroller as _FullPage, Section as _Slide } from './react-fully-scrolled/src';
import LazyLoad from 'react-lazyload'
import SVG from 'react-inlinesvg'

/* BUILT COMPONENTS */
import { Terminal } from './Terminal/Terminal'
import SolarSystem from '../Orbit/Orbit'
import SlideNav from './SlideNav/SlideNav'
import resume_svg from './resume_web.svg'
import portrait from './portrait.svg'


document.ontouchmove = function(ev) {
    ev.preventDefault();
}


export default class Landing extends React.Component {
    state = {
        curPage: 1,
        maxPage: 3,
        minPage: 1,
        scrollState: true,
    }

    handlePageChange(from, to){
        if ((to > this.state.maxPage) || (to < this.state.minPage)) {
            return;
        }

        this.setState({
            scrollState: !(to>=3),
            curPage: to,
        })
    }

    render(){

        return (
            <React.Fragment>
                <SlideNav
                    /* Up & Down navigation buttons of slide layout */
                    showUpButton={(this.state.curPage!=this.state.minPage)}
                    showDownButton={(this.state.curPage!=this.state.maxPage)}
                    shouldUpdate={true}
                    curPage={this.state.curPage}
                />
                <FullPage
                    onBeforeScroll={(from, to) => {this.handlePageChange(from, to)}}
                    isEnabled={this.state.scrollState}
                >
                    <Slide id="Designer">
                            <SolarSystem
                                onExit={() => {}}
                                N={7}
                                heading={`Hi, I'm Allen.`}
                                message1={
                                    `I'm have an education focused in math and the physical sciences. My experience ranges from statistics, machine learning,
                                    and advanced calculus, to UI design, scripting, and scientific computing in Python and Javascript.
                                    `
                                }
                                //message2={`I live in the Developer-Stylist star system.`}
                            />
                    </Slide>

                    <Slide id="Developer">
                        <DevPresentation>
                            <TermContainer>
                                <Terminal />
                            </TermContainer>
                            <MessageContainer>
                                <DevTitle>
                                    Physics in motion.
                                </DevTitle>
                                Slides:
                                <br /> - Physics in motion
                                <br /> ---- Capture UI/UX motion & animation with mathematics that reflect natural movement for an experience so smooth that users just want to stay.
                                <br /> - Masterful state management
                                <br /> ---- Your app is built for long-term mainenance. Isolate state logic from UI components, side-effects, and other core features that compose your app. Every action is pre-defined and perfectly testable.
                                <br /> - Modular design
                                <br /> ---- Expand and refine your product as easily as you might configure power tools with bits and blades. Your app will fit together like plugs and sockets. Integrate and configure new and exsting feature seamlessly, without the mess.
                            </MessageContainer>
                        </DevPresentation>
                    </Slide>

                    <Slide>
                        <div style={{
                            overflowY: 'scroll',
                            height: '100vh',
                        }}>
                            <div style={{
                                background: 'rgba(0,0,0,0.0)',
                                width: '100vw',
                            }}>
                                <SVG src={portrait} style={{
                                    width: '100px',
                                    height: '100px',
                                    position: 'absolute',
                                    zIndex: '101',
                                }} />
                                <SVG src={resume_svg} style={{
                                    margin: '0 auto 0 auto',
                                    height: '2300px',
                                    width: '100vw',
                                    display: 'table',
                                    background: 'rgba(0,0,0,0.8)',
                                    backdropFilter: 'blur(6px)'
                                }} />
                            </div>
                        </div>
                    </Slide>

                </FullPage>
            </React.Fragment>
        );
    }
}

const FullPage = styled(_FullPage)`
`;


class Slide extends React.Component{
    shouldComponentUpdate(){
        return false;
    }
    render(){
        const ScrollSlide = styled(_Slide)`
            display: block;
            height: 100vh;
            width: 100%;
        `;

        return (
            <LazyLoad><ScrollSlide>{this.props.children}</ScrollSlide></LazyLoad>
        );
    }
}

const DevPresentation = styled.div`
    width: 95vw;
    height: 95vh;
    top: 2.5vh;
    bottom: 2.5vh;
    left: 2.5vw;
    right: 2.5vw;
    display: inline-block;
    position: absolute;
    vertical-align: top;
`;

const TermContainer = styled.div`
    width: 60%;
    height: 100%;
    left: 0px;
    position: absolute;
    display: inline-block;
`;

const MessageContainer = styled.div`
    width: 40%;
    height: 100%;
    right: 0px;
    position: absolute;
    display: inline-block;
    background: rgba(0,0,0,0.2)
`;

const DevTitle = styled.div`
    color: rgba(255,255,255,0.8);
    text-align: left;
    font-family: "Lucida Console", "DejaVu Sans Mono", "Consolas";
    font-size: 3em;
    line-height: 1em;
    display: inline-block;
    text-align: justify;
    test-justify: inter-word;
`;