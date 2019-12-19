export const proxyUrl = 'https://obscure-atoll-44974.herokuapp.com/'
export const makeRepoURL = (repository) => `${proxyUrl}https://raw.github.com/clockelliptic/${repository}/master/portfolio/portfolio.json`//master/portfolio/data.json`
export const makeImgURL = (repository, n) => `https://raw.github.com/clockelliptic/${repository}/master/portfolio/${n}.png`//master/portfolio/data.json`

export const REPOSITORIES = [
    'exercism',
    '3DGrapher',
    'data-mining',
    'realestate',
    'ui-collection',
    'jamming',
    'nodeschool',
    'ravenous-react',
    'applied-maths',
    'py-optimization',
    'python-for-science',
    'qt-svg-icon-viewer'
]