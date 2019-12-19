import React, { useEffect, useReducer } from 'react';
import { Actions, stateReducer } from './stateManagement'
import PropTypes from 'prop-types';

    /* *********************************************************
    *                  ABOUT STATE MANAGEMENT
    *  *********************************************************
    *
    * This app/component's state is comprised of:
    *
    *  - `state`, which is driven by react's useReducer() hook
    *    and can be changed only by dispatching actions to the
    *    state reducer
    *
    *  - `store`, which is a basic JavaScript object that holds
    *    any state conditions that should not cause the UI to
    *    re-render. This object can be directly mutated.
    *
    * **********************************************************
    *///////////////////////////////////////////////////////////

/*
 * ***************************************************
 *      MAIN COMPONENT
 * ***************************************************
 */

export default function Scroll ({
  children = [],
  easing = 'cubic-bezier(0.19, 1, 0.22, 1)',
  initialPage = 1,        // 1-based !
  isEnabled = true,
  onAfterScroll = function () {},
  onBeforeScroll = function () {},
  swipeSensitivity = 100, // how much Y movement there should be to be considered a scroll
  transDuration = .8,    // seconds
}){
    const initialState = {
        children:children,
        easing:easing,
        initialPage:initialPage,
        isEnabled:isEnabled,
        onAfterScroll:onAfterScroll,
        onBeforeScroll:onBeforeScroll,
        swipeSensitivity:swipeSensitivity,
        transDuration:transDuration,
        curPage: initialPage,
        totalPages: children.length,
    }

    const store = {
      /* App state conditions that should *NOT* cause component to re-render */
      isScrolling: false,
      touchStartPosY: 0,  // Y position of touch start
      touchMoveDelta: 0,  // delta moved from start of swipe
      isSwiping: false,   // whether we're currently in a swipe
      reqAnim: null,      // handle to requestAnimationFrame

      isTransitionEnabled: false,
      isAnimating: false,     // whether we're currently animating
      supportsPassive: true,  // write custom logic to support older browsers that do not support passive

      containerEl: document.getElementById("SliderContainer"),

      prevTime: new Date().getTime(),
      scrollings: [],
    }

    const [state, dispatch] = useReducer(stateReducer, initialState)

    useTurnTo(state, store, dispatch)
    useScrollHooks(state, store, dispatch)

    return (
        <div
          onTransitionEnd={handleTransitionEnd(state, store, dispatch)}
          ref={(c) => { console.log("c", c); store.containerEl=c; console.log("str", store.containerEl) }}
          id="SliderContainer"
          style={{
            width: '100%',
            height: '100%',
            position: 'fixed',
          }}
        >
          {children}
        </div>
      );
}

/*
 * ***************************************************
 *      DEFAULT PROPS & PROPTYPES
 * ***************************************************
 */

/*
Scroll.defaultProps = {
    children: [],
    easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
    initialPage: 1,        // 1-based !
    isEnabled: true,
    onAfterScroll: function () {},
    onBeforeScroll: function () {},
    swipeSensitivity: 100, // how much Y movement there should be to be considered a scroll
    transDuration: .8,    // seconds
}
*/

Scroll.propTypes = {
    children: PropTypes.node,
    easing: PropTypes.string,
    initialPage: PropTypes.number,
    isEnabled: PropTypes.bool,
    onAfterScroll: PropTypes.func,
    onBeforeScroll: PropTypes.func,
    swipeSensitivity: PropTypes.number,
    transDuration: PropTypes.number, // seconds
  };

/*
 * **************************************************************************
 *                              CUSTOM HOOKS
 *                     and accompanying helper functions
 * **************************************************************************
 */

    /* ********************************************
     * MAIN SCROLL HOOK -- composed of other scroll-event hooks
     */////////////////////////////////////////////

const useScrollHooks = (state, store, dispatch) => {
    const hooks = [
        useButtonEvents,
        useWheelEvents,
        useTouchEvents,
        useTurnTo,
    ]
    hooks.forEach(fn => fn(state, store, dispatch))
}

    /* ********************************************
     * BUTTON CLICK EVENTS (navigation)
     *
     *   Special Note:
     *     As a control feature, nav buttons continue to work even if
     *     `state.isEabled = false`. This allows normal, scrollable child elements
     *     to scroll normally without triggering fullpage scroll, but *requires*
     *     our users to use nav button rather than touch/mousewheel.
     *
     *     When a user uses one of the nav buttons, it sets `state.isEabled = true`
     *     and our scrolling component will once again respond to all scroll events.
     *
     *     This way we can set `props.isEabled` in order to create stop-pages where
     *     users see some showcased and/or interactive content.
     *
     */////////////////////////////////////////////

const useButtonEvents = (state, store, dispatch) => {
    const handleClick = useButton(state, store, dispatch)
    useEffect(() => {
        document.getElementById('PageUpButton').addEventListener('click', handleClick);
        document.getElementById('PageDownButton').addEventListener('click', handleClick);
        return (() => { /* CLEANUP */
            try {
                document.getElementById('PageUpButton').removeEventListener('click', handleClick)
                document.getElementById('PageDownButton').removeEventListener('click', handleClick)
            } catch (e){
                console.error(e)
            }
        })
    })
}

const useButton = (state, store, dispatch) => (e) => {
    // if (!this.props.isEnabled) return; // see special note above!!!
    if (store.isAnimating) return;

    let from, to;
    try {
        from = e.target.attributes.from.value
        to = e.target.attributes.to.value
    } catch (e) {
        console.error(e)
        return;
    }

    const turnTo = pageTurnHandler(state, store, dispatch)

    const changePage = (from, to) => {
        enableTransition(state, store)
        turnTo(to);
    }

    changePage(Math.floor(from), Math.floor(to));

    //addButtonEvent() // maintain persistence
}

    /* ********************************************
     * MOUSEWHEEL EVENTS
     */////////////////////////////////////////////

const useWheelEvents = (state, store, dispatch) => {
    const handleWheel = onWheel(state, store, dispatch)
    useEffect(() => {
        window.removeEventListener('wheel', handleWheel, { passive: true });
        return (() => {
            window.addEventListener('wheel', handleWheel, { passive: true });
        })
    })
}

const onWheel = (state, store, dispatch) => (event) => {
    if (!state.isEnabled) return;

    const curTime = new Date().getTime();

    const value = event.wheelDelta || -event.deltaY || -event.detail;
    const delta = Math.max(-1, Math.min(1, value));

    if (store.scrollings.length > 149) store.scrollings = store.scrollings.slice(1,);
    store.scrollings = [Math.abs(value)].concat(store.scrollings)

    const timeDiff = curTime - store.prevTime;
    store.prevTime = curTime
    if (timeDiff > 200) store.scrollings = []

    if (store.isAnimating) return;

    const averageEnd = getAverage(store.scrollings, 10);
    const averageMiddle = getAverage(store.scrollings, 70);
    const isAccelerating = averageEnd >= averageMiddle;

    if (!isAccelerating) return;

    if (delta) {
        const handleChange = handleWheelDelta(state, store, dispatch)
        handleChange(delta);
    }

    //addButtonEvent()
}

const handleWheelDelta = (state, store, dispatch) => (delta) => {
  const turnTo = pageTurnHandler(state, store, dispatch)

  if (delta < 0) {
    if (state.curPage < state.totalPages) {
      enableTransition(state, store)
      turnTo(state.curPage + 1);
    }
  } else {
    /* eslint-disable no-lonely-if */
    if (state.curPage > 1) {
      enableTransition(state, store)
      turnTo(state.curPage - 1);
    }
    /* eslint-enable no-lonely-if */
  }
}

const getAverage = (elements, number) => {
    let sum = 0;
    const lastElements = elements.slice(Math.max(elements.length - number, 1));

    for (let i = 0; i < lastElements.length; i++) {
      sum += lastElements[i];
    }

    return Math.ceil(sum / number);
}

    /* ********************************************
     * TOUCH EVENTS
     */////////////////////////////////////////////

const useTouchEvents = (state, store, dispatch) => {
    const handleTouchStart = onTouchStart(state, store, dispatch)
    const handleTouchMove = onTouchMove(state, store, dispatch)
    const handleTouchEnd = onTouchEnd(state, store, dispatch)
    useEffect(() => {
        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });
        return (() => {
            document.removeEventListener('touchstart', handleTouchStart, { passive: true });
            document.removeEventListener('touchmove', handleTouchMove, { passive: true });
            document.removeEventListener('touchend', handleTouchEnd, { passive: true });
        })
    })
}

const onTouchStart = (state, store, dispatch) => (e) => {
    if (!state.isEnabled || store.isAnimating || store.isSwiping) return

    store.isSwiping = true
    store.reqAnim = requestAnimationFrame(updateTouchMove)

    store.isSwiping = true
    store.reqAnim = requestAnimationFrame(updateTouchMove)

    store.touchStartPosY = e.touches[0].clientY
    disableTransition(store)
}

const onTouchMove = (state, store, dispatch) => (e) => {
    if (!state.isEnabled || store.isAnimating || !store.isSwiping) return
    const touchPosY = e.changedTouches[0].clientY;
    store.touchStartPosY = touchPosY
    store.touchMoveDelta = touchPosY - store.touchStartPosY
}

const onTouchEnd = (state, store, dispatch) => (e) => {
    cancelAnimationFrame(store.reqAnim)
    store.touchMoveDelta = 0

    if (!state.isEnabled || store.isAnimating || !store.isSwiping) return

    store.isSwiping = true

    const touchEndY = e.changedTouches[0].clientY;
    const delta = touchEndY - store.touchStartPosY;

    const handleSwipeEnd = onSwipeEnd(state, store, dispatch)
    handleSwipeEnd(delta)
    //addButtonEvent()
}

const updateTouchMove = (state, store, dispatch) => () => {
    const translatey = -((window.innerHeight * (state.curPage - 1)) - store.touchMoveDelta);
    const translateyStr = `translatey(${translatey}px)`;

    setStyles(store.containerEl, { transform: translateyStr })
    store.reqAnim = requestAnimationFrame(updateTouchMove)
}

const onSwipeEnd = (state, store, dispatch) => (delta) => {
    if (Math.abs(delta) > store.swipeSensitivity) {
      const duration = (1.0 - (Math.abs(delta) / window.innerHeight)) * store.transDuration
      enableTransition(state, store, dispatch, duration)

      const turnTo = pageTurnHandler(state, store, dispatch)

      if (delta < 0) {
        if (state.curPage < state.totalPages) {
          turnTo(state.curPage + 1);
        } else {
          resetTranslateY(state, store)
        }
      } else {
        /* eslint-disable no-lonely-if */
        if (state.curPage > 1) {
          turnTo(state.curPage - 1);
        } else {
          resetTranslateY(state, store)
        }
        /* eslint-enable no-lonely-if */
      }
    } else if (Math.abs(delta) > 10) {
      enableTransition(state, store, dispatch, 0.5 * state.transDuration)
      resetTranslateY(state, store, true)
    } else {
      resetTranslateY(state, store, false)
    }
}

    /* ********************************************
     * RESIZE EVENTS
     */////////////////////////////////////////////

const useResizeEvents = (state, store) => {
    useEffect(() => {
        window.addEventListener('resize', resize(state, store), false);
        document.addEventListener('resize', resize(state, store), false);
        return (() => {
            window.removeEventListener('resize', resize(state, store), false);
            document.removeEventListener('resize', resize(state, store), false);
        })
    })
}

const resize = (state, store) => {
    const translateyStr = `translatey(-${window.innerHeight * (this.state.curPage - 1)}px)`;
    setStyles(store.containerEl, {
      transform: translateyStr,
      height: `${window.innerHeight}px`,
    });
}

    /* ********************************************
     * PAGE TURN & TRANSITION HANDLING
     */////////////////////////////////////////////

const useTurnTo = (state, store, dispatch) => {
    const turnTo = pageTurnHandler(state, store, dispatch)
    useEffect(() => {
        window.fpTurnTo = document.fpTurnTo = turnTo;
        return (() => {
            delete window.fpTurnTo
            delete document.fpTurnTo
        });
    })
}

const pageTurnHandler = (state, store, dispatch) => (num) => {
    if (
      (state.curPage == num) || (state.totalPages < num) || (num < 1)
    ){
      return
    }

    store.isScrolling = true

    /* FIRE SCROLL-LIFECYCLE CALLBACK --> */ state.onBeforeScroll(state.curPage, num);

    dispatch({type: Actions.SET_PAGE, page: num})

    if (store.isTransitionEnabled) store.isAnimating = true

    const translateyStr = `translatey(-${window.innerHeight * (num - 1)}px)`;
    setStyles(store.containerEl, { transform: translateyStr })

    enableTransition(state,store)
}

const enableTransition = (state, store, duration) => {
    setStyles(store.containerEl, { transition: `transform ${duration||state.duration}s ${state.easing}` })
    store.isTransitionEnabled = true
}

const disableTransition = (store) => {
    setStyles(store.containerEl, { transition: 'transform 0s' })
    store.isTransitionEnabled = false
}


    /* ********************************************
     * OTHER STATE & ANIMATION FUNCTIONS
     */////////////////////////////////////////////

// assign styles to element
function setStyles(elementRef, style) {
    console.log(elementRef)
    Object.keys(style).forEach((key) => {
      console.log("H", style, elementRef)
      try {
        elementRef.style[key] = style[key]
      }
      catch {}
    })
}


function resetTranslateY(state, store, animate){
    const translatey = -(window.innerHeight * (state.curPage - 1));
    const translateyStr = `translatey(${translatey}px)`;

    if (animate) store.setIsAnimating(true);
    setStyles(store.containerEl, { transform: translateyStr })
  }

const handleTransitionEnd = (state, store, dispatch) => (e) => {
    store.isAnimating = false
    if (store.isScrolling) {
      store.isScrolling = false
      state.onAfterScroll(state.curPage);
    }
}