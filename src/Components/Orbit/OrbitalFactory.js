import React from 'react';
import styled, { keyframes } from 'styled-components'

/*
 * MODULE USAGE:
 *  See example below. Additional styling may be needed (i.e. a background and size/position container(s).)
 *
 * EXAMPLE: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~V V~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *      Import { Sol, OrbitalSystem, OrbitalContainer } from 'path/to/OrbitalFactory'
 *
 *
 *      () => (
 *              <OrbitalContainer>
 *                  <Sol />
 *                  {OrbitalSystem(n_planets).map((Planet, i) => <Planet key={i} />)}
 *              </ OrbitalContainer>
 *      );
 *
 *
 */

export const Sol = styled.div`
    position: absolute;
    transform-style: preserve-3d;
    transform: perspective(100px) translateZ(1.5px);
    width: 200px;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    background: rgba(0,0,0,1.0);
    box-shadow:
        inset 0 0 50px #fff,      /* inner white */
        inset 20px 0 80px #f0f,   /* inner left magenta short */
        inset -20px 0 80px #0ff,  /* inner right cyan short */
        inset 20px 0 300px #f0f,  /* inner left magenta broad */
        inset -20px 0 300px #0ff, /* inner right cyan broad */
        0 0 50px #fff,            /* outer white */
        -10px 0 80px #f0f,        /* outer left magenta */
        10px 0 80px #0ff;         /* outer right cyan */
    z-index: 3;
`;

function make_orbit_keyframes(t_max, orbit_radius, phaseShift, tiltZ) {

    function _single_orbit_keyframe(t, t_max, R, phaseShift, tiltZ){
        const
            percent = Math.floor((t/t_max) * 100),
            angle_rad = (percent/100)*2*Math.PI + phaseShift,
            translateX = Math.floor(R * Math.sin(angle_rad)),
            translateY = Math.floor(tiltZ * Math.cos(angle_rad)),
            scale = 1+ Math.sin(angle_rad/2)*Math.sin(angle_rad/2),
            zIndex = 1.5 + Math.cos(angle_rad+Math.PI),
            rgbaColor = (amt0, amt1 = amt0, amt2 = amt0, opacity=0.9+(1/(scale*scale))) => `rgba(${amt0},${amt1},${amt2},${opacity})`;

        const keyframe =`
            ${percent}% {
                transform:
                    translateX(${translateX}px)
                    translateY(${translateY}px)
                    translateZ(${zIndex}px)
                    scaleX(${scale})
                    scaleY(${scale});
                background-color: ${rgbaColor(255 - 255*(scale-1))};
                box-shadow:
                    0 0 ${1}px ${0}px ${rgbaColor(0, 0, 255, scale-1)},
                    0 0 ${4}px ${1}px ${rgbaColor(255, 255,255, scale-1)}
            }
        `;

        return keyframe;
    };

    return keyframes`{
        ${Array(t_max).fill().map((_, t) => _single_orbit_keyframe(t, t_max, orbit_radius, phaseShift, tiltZ)).join(' ')}
    }`;
}

export const Orbital = (diameter=40, orbit_radius=300, phaseShift=0, tiltZ=0, initial_velocity=5) => {
    const N_FRAMES = 75;
    const orbit = make_orbit_keyframes(N_FRAMES, orbit_radius, phaseShift, tiltZ);
    const scale = 1 + Math.sin(phaseShift/2)*Math.sin(phaseShift/2)
    const period = Math.floor((35+Math.random()*initial_velocity)/*sec*/ * ((orbit_radius**2)/(Math.sqrt(diameter/10)*300**2)) ) //seconds; note that 300 is the default radius

    return styled.div`
        transform: perspective(100px) translateZ(1.6px) translateX(${Math.floor(orbit_radius * Math.sin(phaseShift))}) scaleX(${scale}) scaleY(${scale});
        position: absolute;
        text-align: center;
        color: white;
        width: ${diameter}px;
        height: ${diameter}px;
        margin-left: auto;
        margin-right: auto;
        border-radius: 50%;
        background-color: rgba(255,255,255,0.9);
        animation: ${orbit} infinite ${period}s linear;
    `;
}

export const RandomOrbital = () => Orbital(
    7+Math.floor(Math.random()*50),
    200+Math.floor(Math.random()*600),
    0,//(Math.random()*2*Math.PI),
    0,//Math.floor(Math.random()*30),
    Math.random()*5,
    );


export const OrbitalSystem = (N) => Array(N).fill().map(() => RandomOrbital())


export const OrbitalContainer = styled.div`
    background: rgba(0,0,0,0.92);
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    transform-style: preserve-3d;
    z-index: 1;
    overflow: hidden;
`;


