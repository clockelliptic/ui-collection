import React from 'react';
import styled, { keyframes } from 'styled-components'
import { Scroller as _FullPage, Section as _Slide } from './react-fully-scrolled/src';
import { SwipeableViews } from 'react-swipeable-views';
import LazyLoad from 'react-lazyload'

/* BUILT COMPONENTS */
import { Terminal } from './Terminal/Terminal'
import SolarSystem from '../Orbit/Orbit'
import SlideNav from './SlideNav/SlideNav'

document.ontouchmove = function(ev) {
    ev.preventDefault();
}

export default class Landing extends React.Component {
    state = {
        curPage: 1,
        maxPage: 3,
        minPage: 1,
    }

    handlePageChange(from, to){
        if ((to > this.state.maxPage) || (to < this.state.minPage)) {
            return;
        }

        this.setState({
            scrollState: !(to>=3),
            curPage: to,
        })
        console.log(this.state)
    }

    render(){

        return (
            <React.Fragment>
                <SlideNav
                    showUpButton={(this.state.curPage!==this.state.minPage)}
                    showDownButton={(this.state.curPage!==this.state.maxPage)}
                    shouldUpdate={(this.state.curPage!==this.state.minPage) || (this.state.curPage!==this.state.maxPage)}
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
                                message2={`I live in the Developer-Stylist star system.`}
                            />
                    </Slide>

                    <Slide id="Developer">
                        <DevTitle>Developer / Designer</DevTitle>
                        <Term>
                            <Terminal />
                        </Term>
                    </Slide>

                    <Slide style={{background:"rgba(0,0,0,0.2)"}}>
                            <h1>Programmer</h1>
                    </Slide>
            </FullPage></React.Fragment>
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

const Term = styled.div`
    margin: 0 15% 0 15%;
`;


const DevTitle = styled.div`
    margin: 3% 0 0 15%;
    color: rgba(255,255,255,0.8);
    text-align: left;
    font-family: "Lucida Console", "DejaVu Sans Mono", "Consolas";
    font-size: 4em;
    line-height: 1em;
    max-height: 15%;
`;