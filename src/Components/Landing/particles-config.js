import { svg } from './static/brainheart.svg'

export const params = {
    "polygon": {
      "enable": false,
      "type": "inside",
      "move": {
          "radius": 10
        },
      "url": "",
      "scale": 10,
      "draw": {
        "enable": true,
        "stroke": {
          "color": "#FF0000",
          "width": 5
        }
      }
    },
    "particles": {
      "number": {
        "value": 30,
        "density": {
          "enable": true,
          "value_area": 600
        }
      },
      "color": {
        "value": "#FFEEDD"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 1,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "opacity_min": 0,
          "sync": false
        }
      },
      "size": {
        "value": 7.6,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "size_min": 0.2,
          "sync": false
        }
      },
      "line_linked": {
        "enable": false,
        "distance": 265,
        "color": "#FF50AA",
        "opacity": 0.3,
        "width": 1,
        "shadow": {
          "enable": false,
          "color": "#FFA0CC",
          "opacity": 0.5,
        }
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "bottom",
        "random": true,
        "straight": true,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": true,
          "rotateX": 999,
          "rotateY": 999
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "bubble"
        },
        "onclick": {
          "enable": true,
          "mode": "bubble"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 150,
          "line_linked": {
            "opacity": 0.35
          }
        },
        "bubble": {
          "distance": 250,
          "size": 2,
          "duration": 0.5,
          "opacity": 1,
          "speed": 0.1
        },
        "repulse": {
          "distance": 100,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  }