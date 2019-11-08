import React from 'react';
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
`;

const Fade = styled.div`
    position: fixed;
    visibility: ${props => props.out ? 'hidden' : 'visible'};
    animation: ${props => props.out ? fadeOut : fadeIn} 1s linear;
    transition: visibility 1s linear;
    background: none;

    position: fixed;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    transform-style: preserve-3d;
    outline: 0px solid rgba(255,255,255,0.2);
    z-index: 1;
`;

export default class FaceContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            children: props.children,
        }
    }

    onHide () {
        this.setState({visibility: false})
    }

    render() {
        const Children = this.state.children
        return (
            <div>
            <Fade out={!this.state.visible}>
                <Children onHide={this.onHide.bind(this)} />
            </Fade>
            </div>
        );
    }
}