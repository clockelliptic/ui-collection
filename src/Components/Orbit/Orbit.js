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
            heading: props.heading,
            message1: props.message1,
            message2: props.message2,
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

                <VerticalAlign>
                    <HorizontalAlign>
                        <Heading>
                        <font color={"#FFCC67"}>{this.state.heading || ""}</font>
                        </Heading>

                        <Message>
                            {this.state.message1 || ""}
                        </Message>

                        <Message>
                            {this.state.message2 || ""}
                        </Message>
                        </HorizontalAlign>
                </VerticalAlign>


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

const VerticalAlign = styled.div`
    position: absolute
    margin: auto;
    left: auto;
    right: auto;
    top: 45%;
`;

const HorizontalAlign = styled.div`
    margin: auto;
    width: 50%;
    min-width: 500px;
    animation: ${fadeIn} 1 5s linear;
`;

const Heading = styled.div`
    display: block;
    line-height: 7vh;
    font-size: 7vh;
`;

const Message = styled.div`
    display: block;
    line-height: 4vh;
    font-size: 3vh;
    margin-top: 2vh;
`;
