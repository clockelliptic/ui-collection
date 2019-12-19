import React from 'react';
import './Orbit.css'
import styled, { keyframes } from 'styled-components'
import Particles from 'react-particles-js'
import { params as particles_config } from './particles-config'
import { OrbitalContainer, Sol, OrbitalSystem } from './OrbitalFactory'
import { fadeIn } from '../Containers/Fade'
import { Button as GrommetButton } from 'grommet'
import { Github, Catalog, Deploy } from 'grommet-icons'

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

                        <Message>
                            <Button margin='small' hoverIndicator={true} color='white' icon={<Github />} label={'See me on Github'} />
                            <Button margin='small' hoverIndicator={true} color='white' icon={<Catalog />} label={'Browse my portfolio'} />
                            <Glow>
                                <Button margin='small' icon={<Deploy />} label={'Take the tour'} />
                            </Glow>
                        </Message>
                        </HorizontalAlign>
                </VerticalAlign>


                <Space />

            </OrbitalContainer>
        );
    }
}

const Button = styled(GrommetButton)`
    border-radius: 10px;
`;

const glowKeyframes = keyframes`
    0% {
      opacity: 1.0;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1.0;
    }
`;

const Glow = styled.div`
    animation: ${glowKeyframes} infinite 2s ease-in-out;
    display: inline;

    &:hover {
        animation: none;
    }
`


const Space = () => <Particles params={particles_config} />

const Tilt = styled.div`
    /* This tilts itself and its children to the specified transform angle. */
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
