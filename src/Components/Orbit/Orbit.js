import React from 'react';
import './Orbit.css'
import styled, { keyframes, css } from 'styled-components'
import Particles from 'react-particles-js'
import { params as particles_config } from './particles-config'
import heimerdinger from '../../heimerdinger.png'
import { OrbitalContainer, Sol, OrbitalSystem } from './OrbitalFactory'
import { fadeIn, fadeOut } from '../Containers/Fade'

class Orbit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            onExit: props.onExit,
            message: props.message,
            N: props.N,
        };
    }

    onExit(){
        this.state.onExit()
    }

    render(){
        return (
            <OrbitalContainer>
                <Tilt>
                    <Sol onClick={this.onExit.bind(this)} />
                    {OrbitalSystem(this.state.N).map((Planet, i) => <Planet key={i} />)}
                </Tilt>
                <Message>
                    {this.state.message || "Hello, citizen of the galaxy."}
                </Message>
                <Space />
            </OrbitalContainer>
        );
    }
}

const Tilt = styled.div`
    /* This tilts itself and its children elements to the specified transform angle. */
    top: 25%;
    left: 25%;
    position: absolute;
    transform-style: preserve-3d;
    transform: rotate(-33deg);
`;


const Space = () => <Particles params={particles_config} />

const Message = styled.div`
    margin-left: -30%;
    line-height: 100%;
    position: absolute;
    top: 55%;
    left: 50%;
    font-size: 7vh;
    animation: fadeIn 1 2s linear;
`;

const Heimerdinger = () => {
    const Heimer = styled.div`
        position: absolute;
        background-image: url(${heimerdinger});
        background-size: 100% 100%;
        width: 200px;
        height: 200px;
        bottom: 5%;
        right: 5%;
        opacity: 0.8;
    `;
    return <Heimer />
}

export default Orbit;