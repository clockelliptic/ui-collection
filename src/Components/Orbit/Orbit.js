import React from 'react';
import './Orbit.css'
import styled, { keyframes, css } from 'styled-components'
import Particles from 'react-particles-js'
import { params as particles_config } from './particles-config'
import heimerdinger from '../../heimerdinger.png'
import { OrbitalContainer, Sol, OrbitalSystem } from './OrbitalFactory'

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
                <Sol onClick={this.onExit.bind(this)} />
                {OrbitalSystem(this.state.N).map(Planet => <Planet />)}
                <Message>
                    {this.state.message}
                </Message>
                <Space />
            </OrbitalContainer>
        );
    }
}

const Space = () => <Particles params={particles_config} />

const Message = styled.div`
    position: absolute;
    top: 55%;
    left: 50%;
    font-size: 7vh;
    animation:
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