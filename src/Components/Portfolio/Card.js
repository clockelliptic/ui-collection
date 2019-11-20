import React from 'react';
import styled from 'styled-components'
import { makeRepoURL, makeImgURL } from './config'
import { Carousel, Image } from 'grommet'
import { Expand } from 'grommet-icons'
import { Fade } from '../Containers/Fade'
import LazyLoad from 'react-lazyload'
import './css-loading-spinners.css'
import Tilt from 'react-parallax-tilt';

export default class Card extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            fullscreen: false,
            repo_name: props.repo_name
        }
        this.getProfile = this.getProfile.bind(this)
        this.getProfile(this.state.repo_name)
    }

    async getProfile(repo_name){
        const repo_url = makeRepoURL(repo_name)
        let response,
            data,
            img_urls;

        try{
            response = await fetch(repo_url)
            data = await response.json();
            img_urls = Array(data.n_images).fill().map((_,n) => makeImgURL(repo_name, n))
            this.setState(Object.assign({imgs:img_urls}, data))
        }
        catch (e) {
            console.log("ERROR")
            this.setState(Object.assign({load_failed: true}))
        }
    }

    loadingSeemsSuccessful(){
        return (this.state.title && this.state.imgs)
    }

    render(){
        const tiltProps = {
            tiltEnable: false,
            tiltReverse: false,
            scale: 1.02,
            perspective: 4000,
            tiltMaxAngleY: 8,
            tiltMaxAngleX: 8,
            transitionSpeed: 100,
        }

        const ExpandButton = styled(Expand)`
            position: absolute;
            top: 0;
            right: 0;
            padding: 6px;
            z-index: 105;
            transition: border 2.0s ease-in, padding 0.4s cubic-bezier(.03,.98,.52,.99), width 1.0s cubic-bezier(.03,.98,.52,.99), height, 1.0s cubic-bezier(.03,.98,.52,.99), opacity 1.0s cubic-bezier(.03,.98,.52,.99);
            width: 14px;
            height: 14px;
            opacity: 0.8;
            border: 2px dashed rgba(255, 255, 255, 0.0);
            &:hover {
                border: 2px dashed rgba(255,255,255, 0.3);
                padding: 0;
                width: 26px;
                height: 26px;
                opacity: 1.0;
            }
        `;

        return(

            <Frame {...tiltProps}>
                <ExpandButton color='#fff' />
                <LazyLoad scrollContainer={'.MainAppContainer'} >
                <Fade>
                    {this.loadingSeemsSuccessful() ? <Content {...this.state} /> : <LoadingSpinner />}
                </Fade>
                </LazyLoad>
            </Frame>

        )
    }
}

const Content = (props) => (
    <React.Fragment>
        {console.log("PROPS", props)}
        <CardName>{props.title}</CardName>

        <CarouselContainer>
            <Carousel fill overflow="hidden" controls="arrows" infinite="true">
                {props.imgs.map((src, i) => <Image fit="cover" src={src} key={`${props.repo_name}_img`+i} />)}
            </Carousel>
        </CarouselContainer>

        <CardInfo>
            <p>{props.description}</p>
        </CardInfo>

        <CardTags>
            {
                props.tags.languages.map((tag) =>
                        <LanguageTag key={`${props.repo_name}_${tag}`}>
                            {tag}
                        </LanguageTag>
                )
            }
            {
                props.tags.tooling.map((tag) =>
                        <ToolingTag key={`${props.repo_name}_${tag}`}>
                            {tag}
                        </ToolingTag>
                )
            }
            {
                props.tags.keywords.map((tag) =>
                        <Tag key={`${props.repo_name}_${tag}`}>
                            {tag}
                        </Tag>
                )
            }
        </CardTags>
    </React.Fragment>
);

const LoadingSpinner = () => {
    const SpinnerContainer = styled.div`
        display: flex;
        margin-top:40%;
    `;
    return (
        <SpinnerContainer>
            <div className="cls-spinner">
                <div className="cls-circle cls-spin"></div>
            </div>
        </SpinnerContainer>
    )
}

const Frame = styled(Tilt)`
    overflow: hidden;
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.9);
    border: 0px solid var(--medium-gray);
    border-radius: 0px;
    box-shadow: 0px 0px 8px 3px rgba(0,0,0,0.4);
    transition: all 0.1s linear;
    &:hover {
        background: rgba(5,5,5,1.0);
        z-index: 102;
    }
`;

const CarouselContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 50%;
    margin-bottom: 0;
    z-index: 101;
`;

const CardName = styled.div`
    top: 0;
    height: 8%;
    left: 0;
    right: -1px;
    margin: 0;
    padding: 2.5%;
    padding-right: 32px;
    overflow: wrap;
    position: absolute;
    background: rgba(0,0,0,0.8);
    font-weight: 600;
    z-index: 102;
    transition: 0.3s linear;
    &:hover {
        background: rgba(0,0,0,0.95);
        color: rgba(50,255,200,1);
    }
`;

const CardInfo = styled.div`
    max-width: 100%;
    max-height: 25%;
    top: 50%;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 2.5% 2.5% 2.5%;
    overflow: wrap;
    position: absolute;
    display: inline-block;
`;

const CardTags = styled.div`
    max-width: 100%;
    max-height: 25%;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 2.5% 2.5% 2.5%;
    overflow: hidden;
    position: absolute;
    display: inline-block;
`;

const Tag = styled.div`
    font-size: 0.8em;
    font-weight: 400;
    display: inline-block;
    margin: 3px 3px 3px 3px;
    padding: 0 6px 3px 6px;
    border: 1px solid rgba(30,235,255,0.5);
    color: #f9f9f9;
    border-radius: 5px;
    transition: 0.15s linear;
    &:hover {
        border: 1px solid rgba(30,235,255,0.9);
    }
`;


const LanguageTag = styled(Tag)`
    border: 1px solid rgba(30,255,180,0.5);
    &:hover {
        border: 1px solid rgba(30,255,180,0.9);
    }
`;

const ToolingTag = styled(Tag)`
    border: 1px solid rgba(255,200,50,0.5);
    &:hover {
        border: 1px solid rgba(255,200,50,0.9);
    }
`;