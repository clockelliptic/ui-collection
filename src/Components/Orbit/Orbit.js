import React from 'react';
import './Orbit.css'
import styled from 'styled-components'
import Particles from 'react-particles-js'
import { params as particles_config } from './particles-config'
import { OrbitalContainer, Sol, OrbitalSystem } from './OrbitalFactory'
import { fadeIn } from '../Containers/Fade'

export default class SolarSystem extends React.Component {
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
                <Heading>
                    {this.state.heading || "Hi, I'm Allen."}
                </Heading>
                <Message>
                    {this.state.message || "Web designer, programmer, and math buff. I have experience ranging from mathematics, statistics, and machine learning, to UI design and scripting in Python and Javascript."}
                </Message>
                <Space />
            </OrbitalContainer>
        );
    }
}

const Space = () => <Particles params={particles_config} />

const Tilt = styled.div`
    /* This tilts itself and its children elements to the specified transform angle. */
    top: 25%;
    left: 25%;
    position: absolute;
    transform-style: preserve-3d;
    transform: rotate(-33deg);
`;

const Heading = styled.div`
    margin-left: -30%;
    line-height: 100%;
    position: absolute;
    top: 55%;
    left: 50%;
    font-size: 7vh;
    animation: ${fadeIn} 1 5s linear;
`;

const Message = styled.div`
    margin-left: -30%;
    line-height: 4vh;
    position: absolute;
    top: 65%;
    left: 50%;
    font-size: 3vh;
    animation: ${fadeIn} 1 5s linear;
    width: 55%;
`;