
import React from 'react';
import styled from 'styled-components'
import { makeRepoURL, makeImgURL, REPOSITORIES } from './config'
import { Carousel, Image, Box } from 'grommet'
import LazyLoad from 'react-lazyload'

import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveGridLayout = WidthProvider(Responsive);

export default class Portfolio extends React.Component {
    constructor(props){
        super(props)
        this.state = {
        }
        this.getProfile = this.getProfile.bind(this)
    }

    componentDidUpdate(){
        console.log(Object.keys("STATE",this.state))
    }

    async getProfile(repo_name){
        const repo_url = makeRepoURL(repo_name)

        console.log(repo_url)

        let response = await fetch(repo_url);
        let data = await response.json();

        console.log(data)

        let img_urls = Array(data.n_images).fill().map((_,n) => makeImgURL(repo_name, n))

        this.setState({[repo_name]:Object.assign({"imgs":img_urls},data)})
        console.log("STATE",this.state)
    }

    componentDidMount(){
        REPOSITORIES.map(repo_name => this.getProfile(repo_name))
    }

    render(){
        const layouts = {
            lg: Object.keys(this.state).map((key, i) => Object.assign({i: key, x: (i%4)*3, y: (Math.floor(i/12)*11), w: 3, h: 11, static:true})),
            md: Object.keys(this.state).map((key, i) => Object.assign({i: key, x: (i%3)*3, y: (Math.floor(i/12)*11), w: 3, h: 11, static:true})),
            sm: Object.keys(this.state).map((key, i) => Object.assign({i: key, x: (i%2)*3, y: (Math.floor(i/12)*11), w: 3, h: 11, static:true})),
            sx: Object.keys(this.state).map((key, i) => Object.assign({i: key, x: (i%1)*3, y: (Math.floor(i/12)*11), w: 3, h: 11, static:true})),
          }

        console.log(layouts)

        return(
            <ResponsiveGridLayout
                autoResize={true}
                containerPadding={[16,16]}
                margin={[24,24]}
                verticalCompact={true}
                compactType={'horizontal'}
                rowHeight={32}
                className="layout"
                layouts={layouts}
                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{lg: 12, md: 9, sm: 6, xs: 3, xxs: 0}}>

            { /* Map portfolio cards over keys in this.state, making 1 card per item. */
                Object.keys(this.state)
                    .map(key => (
                            <Card key={key}>
                                <CardName>{this.state[key].title}</CardName>

                                <CardShowcase>
                                    <Carousel fill overflow="hidden" controls="arrows" infinite="true">
                                        {this.state[key].imgs.map((src, i) => <Image fit="cover" src={src} key={`${key}_img${i}`} />)}
                                    </Carousel>
                                </CardShowcase>

                                <CardInfo>
                                    <p>{this.state[key].description}</p>
                                </CardInfo>

                                <CardTags>
                                    {this.state[key].tags.keywords.map((tag) => <Tag>{tag}</Tag>)}
                                </CardTags>

                            </Card>
                        )
                    )
            }
            </ResponsiveGridLayout>
        )
    }
}

const Card = styled.div`
    height: 100%;
    background: var(--dark-gray);
    border: 1px solid var(--medium-gray);
    border-radius: 0px;
`;

const CardShowcase = styled.div`
    width: 100%;
    height: 63%;
    margin-bottom: 0;
    display: inline-block;
    z-index: 101;
`;

const CardName = styled.div`
    float: left;
    top: 0;
    height: 8%;
    left: 0;
    right: 0;
    margin: 0;
    padding: 2.5%;
    overflow: wrap;
    position: absolute;
    display: inline-block;
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
    max-height: 22%;
    top: 63%;
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
    max-height: 15%;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 2.5% 2.5% 2.5%;
    overflow: hidden;
    position: absolute;
    display: inline-block;
`;

const Tag = styled.div`
    font-size: 0.9em;
    font-weight: 600;
    display: inline-block;
    margin: 3px 3px 3px 3px;
    padding: 0 6px 3px 6px;
    border: 1px solid rgba(50,255,200,0.3);
    color: #f9f9f9;
    border-radius: 5px;
    transition: 0.1s linear;
    &:hover {
        border: 1px solid rgba(50,255,200,0.7);
    }
`;
