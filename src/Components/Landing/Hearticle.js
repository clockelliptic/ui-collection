import React from 'react';
import Particles from 'react-particles-js';
import styled from 'styled-components'
import 'pathseg'
import { params } from './particles-config'


class ParticleAnimation extends React.Component{
    render(){
        return (
            <Particles params={params} />
        );
    };
}

export const Hearticle = styled(ParticleAnimation)`
    width: auto;
    min-height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;