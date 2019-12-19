import React from 'react';
import styled, { keyframes } from 'styled-components'
import { Down, Up } from 'grommet-icons'
import PropTypes from 'prop-types';

export default class SlideNav extends React.Component {

    shouldComponentUpdate(){
        return this.props.shouldUpdate;
    }
    render() {
        const
            curPage = this.props.curPage,
            nextPage = Number(curPage)+1,
            prevPage = curPage-1;
        const PageDownButton = () => (
            <NavButton direction='down' display={this.props.showDownButton}>
                <Down id="PageDownButton" from={curPage} to={nextPage} size='large' style={{"margin":"8px 0 0 0"}} />
            </NavButton>
        )

        const PageUpButton = () => (
            <NavButton direction='up' display={this.props.showUpButton}>
                <Up id="PageUpButton" from={curPage} to={prevPage} size='large' style={{"margin":"8px 0 0 0"}} />
            </NavButton>
        )

        return (
            <React.Fragment>
                <PageUpButton />
                <PageDownButton />
            </React.Fragment>
        );
    }
}

class NavButton extends React.PureComponent {
    render() {
        const ButtonTemplate = styled.div`
            display: ${(this.props.display)?'auto':'none'};
            position: fixed;
            border-radius: 100%;
            background: rgba(0,0,0,1.0);
            opacity: 0.5;
            text-align: center;
            align-items: center;
            width: 64px;
            height: 64px;
            right: 2%;
            z-index: 9999;
            transition: all 0.1s ease-in;
            animation: ${(this.props.animate) ? `${PulseAnimation} 3.0s ease-in-out infinite` : `none` };
            :hover {
                opacity: 0.9;
            }
            :active {
                background: rgba(170,195,185,0.2);
                opacity: 0.9;
            }
            > * > polyline {
                pointer-events: none;
            }
        `;

        const PageDown = styled(ButtonTemplate)`
            bottom: 52px;
        `;

        const PageUp = styled(ButtonTemplate)`
            top: 52px;
        `;

        return (
            (this.props.direction==='up')
                ?(<PageUp>{this.props.children}</PageUp>)
                :(<PageDown>{this.props.children}</PageDown>)
        );
    }
}

const pulse = `
    from {
        transform: translateY(0px) rotate(-15.5deg) translateX(-8px)
    }
    25% {
        transform: translateY(13px) rotate(0deg) translateX(0px)
    }
    50% {
        transform: translateY(0px) rotate(15.5deg) translateX(8px)
    }
    75% {
        transform: translateY(13px) rotate(0deg) translateX(0px)
    }
    to {
        transform: translateY(0px) rotate(-15.5deg) translateX(-8px)
    }
`;


const PulseAnimation = keyframes`${pulse}`;
