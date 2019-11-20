import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import styled from 'styled-components'
import Typist from 'react-typist';
import ReactHtmlParser from 'react-html-parser';
import { terminal_text1, terminal_text2 } from './terminal-text'
import 'highlight.js/styles/arta.css';
import ScrollToBottom from 'react-scroll-to-bottom';

const hljs = require("highlight.js");
hljs.initHighlighting();

const highlightedCode1 = hljs.highlightAuto(terminal_text1).value
const highlightedCode2 = hljs.highlightAuto(terminal_text2).value

export class Terminal extends React.PureComponent {
    render() {
        const TypisOpts = {
            cursor: {
                show: true,
                blink: true,
                element: '_',
                hideWhenDone: false,
                hideWhenDoneDelay: 1000,
            }
        }

        return (
            <Window>
                <TopBar />

                <AutoScroll>
                <Console>
                    (base) /root/allen/dev > <font color="#9FF">vi</font> <font color="#F0F">SolarSystem.js</font><br /><br />
                    /*  Calculations based on Kepler's Law.... cool! */
                    <pre><code>
                        {ReactHtmlParser(highlightedCode1)}
                        <Typist {...TypisOpts}>
                            <Typist.Delay ms={0} />
                            {ReactHtmlParser(highlightedCode2)}
                        </Typist>
                    </code></pre>
                    </Console>
                </AutoScroll>

            </Window>
        );
    }
};

const AutoScroll = styled(ScrollToBottom)`
    width: 100%;
    height: 100%;
    overflow-x: hidden;
`;

const Window = styled.div`
    position: absolute;
    background: rgba(0,0,0,0.8);
    border-radius: 3px;
    box-shadow: 0px 0px 12px 6px rgba(0,0,0,0.6);
    height: 80vh;
    width: 70vw;
    overflow-y: hidden;
    overflow-x: hidden;
`;

const TopBar = () => {
    const Bar = styled.div`
        width: 70vw;
        height: 42px;
        border-bottom: 1px solid rgba(255,255,255,0.09);
    `;
    return (
        <Bar>
            <Buttons />
        </Bar>
    )
}

const Console = styled.div`
    color: rgba(255,255,255,0.7);
    text-align: left;
    font-family: "DejaVu Sans Mono", "Consolas";
    font-size: 1em;
    padding: 1em 1em 3em 1em;
    top: 42px;
    width: 99%;
    bottom: 0;
    display: inline-block;
    overflow-x: hidden;
    overflow-y: hidden;
`;


const Buttons = () => {
    /* MAC-STYLE BUTTONS */
    const Circle = (color) => styled.div`
        width: 13px;
        height: 13px;
        border-radius: 100%;
        background-color: ${color};
        display: inline-block;
        margin: 15.5px 5px 0 5px;
    `;

    const mac_buttons = [
        Circle('rgba(255,240,50,0.9)'),
        Circle('rgba(50,255,70,0.9)'),
        Circle('rgba(255,50,70,0.9)'),
    ]

    /* WINDOWS 10 STYLE BUTTONS */
    const Ex_ = styled.div`
        display: inline-block;
        position: absolute;
        left: 14px;
        top: 2px;
        opacity: 1;
        &:hover {
            opacity: 1;
        };
        &:before, &:after {
        display: inline-block;
        content: ' ';
        height: 20px;
        width: 1px;
        background-color: #FFF;
        };
        &:before {
            transform: rotate(45deg);
        };
        &:after {
            transform: rotate(-45deg);
        }
    `;

    const Ex = () => {
        const Container = styled.div`
            display: inline-block;
            position: absolute;
            background-color: none;
            right: 0;
            width: 31px;
            height: 31px;
            top: 9px;
            right: 9px;
        `;
        return (
            <Container><Ex_ /></Container>
        );
    }

    const Square = styled.div`
        border: 1px solid var(--light-gray);
        width: 12px;
        height: 12px;
        display: inline-block;
        position: absolute;
        right: 63px;
        top: 14px;
    `;

    const Line = styled.div`
        border-bottom: 1px solid var(--light-gray);
        width: 14px;
        height: 2px;
        display: inline-block;
        position: absolute;
        right: 111px;
        top: 15px;
    `;

    const Menu = () => {
        const Line = (top) => styled.div`
            border-bottom: 1px solid var(--light-gray);
            width: 14px;
            height: 2px;
            display: block;
            position: absolute;
            left: 15px;
            top: ${top}px;
        `;
        return (
            [
                Line(15),
                Line(20),
                Line(25),
            ].map(L => <L />)
        );
    }

    const buttons = [
        Menu,
        Line,
        Square,
        Ex
    ]

    const ButtonContainer = styled.div`
        position: absolute;
        background: none;
        height: 100%;
        width: 70vw;
    `;

    return (
    <ButtonContainer>
        {buttons.map(Button => <Button key={Math.random()} />)}
    </ButtonContainer>
    );
}
