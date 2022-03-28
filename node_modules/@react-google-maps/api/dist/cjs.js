'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var ReactDOM = require('react-dom');

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	}
	n["default"] = e;
	return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var ReactDOM__namespace = /*#__PURE__*/_interopNamespace(ReactDOM);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var NODE_ENV = process.env.NODE_ENV;

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

var invariant_1 = invariant;

const MapContext = React.createContext(null);
function useGoogleMap() {
    invariant_1(!!React.useContext, 'useGoogleMap is React hook and requires React version 16.8+');
    const map = React.useContext(MapContext);
    invariant_1(!!map, 'useGoogleMap needs a GoogleMap available up in the tree');
    return map;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reduce = (obj, fn, acc) => {
    return Object.keys(obj).reduce(function reducer(newAcc, key) {
        return fn(newAcc, obj[key], key);
    }, acc);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function forEach(obj, fn) {
    Object.keys(obj).forEach(function iterator(key) {
        return fn(obj[key], key);
    });
}

/* global google */
const applyUpdaterToNextProps = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
updaterMap, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
prevProps, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
nextProps, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
instance
// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const iter = (fn, key) => {
        const nextValue = nextProps[key];
        if (nextValue !== prevProps[key]) {
            map[key] = nextValue;
            fn(instance, nextValue);
        }
    };
    forEach(updaterMap, iter);
    return map;
};
function registerEvents(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
props, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
instance, eventMap) {
    const registeredList = reduce(eventMap, function reducer(acc, googleEventName, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onEventName) {
        if (typeof props[onEventName] === 'function') {
            acc.push(google.maps.event.addListener(instance, googleEventName, props[onEventName]));
        }
        return acc;
    }, []);
    return registeredList;
}
function unregisterEvent(registered) {
    google.maps.event.removeListener(registered);
}
function unregisterEvents(events = []) {
    events.forEach(unregisterEvent);
}
function applyUpdatersToPropsAndRegisterEvents({ updaterMap, eventMap, prevProps, nextProps, instance, }) {
    const registeredEvents = registerEvents(nextProps, instance, eventMap);
    applyUpdaterToNextProps(updaterMap, prevProps, nextProps, instance);
    return registeredEvents;
}

const eventMap$i = {
    onDblClick: 'dblclick',
    onDragEnd: 'dragend',
    onDragStart: 'dragstart',
    onMapTypeIdChanged: 'maptypeid_changed',
    onMouseMove: 'mousemove',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
    onMouseDown: 'mousedown',
    onMouseUp: 'mouseup',
    onRightClick: 'rightclick',
    onTilesLoaded: 'tilesloaded',
    onBoundsChanged: 'bounds_changed',
    onCenterChanged: 'center_changed',
    onClick: 'click',
    onDrag: 'drag',
    onHeadingChanged: 'heading_changed',
    onIdle: 'idle',
    onProjectionChanged: 'projection_changed',
    onResize: 'resize',
    onTiltChanged: 'tilt_changed',
    onZoomChanged: 'zoom_changed',
};
const updaterMap$i = {
    extraMapTypes(map, extra) {
        extra.forEach(function forEachExtra(it, i) {
            map.mapTypes.set(String(i), it);
        });
    },
    center(map, center) {
        map.setCenter(center);
    },
    clickableIcons(map, clickable) {
        map.setClickableIcons(clickable);
    },
    heading(map, heading) {
        map.setHeading(heading);
    },
    mapTypeId(map, mapTypeId) {
        map.setMapTypeId(mapTypeId);
    },
    options(map, options) {
        map.setOptions(options);
    },
    streetView(map, streetView) {
        map.setStreetView(streetView);
    },
    tilt(map, tilt) {
        map.setTilt(tilt);
    },
    zoom(map, zoom) {
        map.setZoom(zoom);
    },
};
// function GoogleMapFunctional({ children, options, id, mapContainerStyle, center, clickableIcons, extraMapTypes, heading, mapContainerClassName, mapTypeId, onBoundsChanged, onCenterChanged, onClick, onDblClick, onDrag, onDragEnd, onDragStart, onHeadingChanged, onIdle, onProjectionChanged, onResize, onTiltChanged, onLoad }: GoogleMapProps): JSX.Element {
//   const [map, setMap] = React.useState<google.maps.Map | null>(null)
//   const ref = React.useRef<HTMLDivElement | null>(null)
//   const getInstance = React.useCallback(() => {
//     if (ref.current === null) {
//       return null
//     }
//     return new google.maps.Map(ref.current, options)
//   }, [options])
//   React.useEffect(() => {
//   }, [])
//   const panTo = React.useCallback((latLng: google.maps.LatLng | google.maps.LatLngLiteral): void => {
//     const map = getInstance()
//     if (map) {
//       map.panTo(latLng)
//     }
//   }, [])
//   React.useEffect(() => {
//     const map = getInstance()
//   }, [])
//   return (
//     <div
//         id={id}
//         ref={ref}
//         style={mapContainerStyle}
//         className={mapContainerClassName}
//       >
//         <MapContext.Provider value={map}>
//           {map !== null ? children : <></>}
//         </MapContext.Provider>
//       </div>
//   )
// }
class GoogleMap extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            map: null,
        };
        this.registeredEvents = [];
        this.mapRef = null;
        this.getInstance = () => {
            if (this.mapRef === null) {
                return null;
            }
            return new google.maps.Map(this.mapRef, this.props.options);
        };
        this.panTo = (latLng) => {
            const map = this.getInstance();
            if (map) {
                map.panTo(latLng);
            }
        };
        this.setMapCallback = () => {
            if (this.state.map !== null) {
                if (this.props.onLoad) {
                    this.props.onLoad(this.state.map);
                }
            }
        };
        this.getRef = (ref) => {
            this.mapRef = ref;
        };
    }
    componentDidMount() {
        const map = this.getInstance();
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$i,
            eventMap: eventMap$i,
            prevProps: {},
            nextProps: this.props,
            instance: map,
        });
        this.setState(function setMap() {
            return {
                map,
            };
        }, this.setMapCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.map !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$i,
                eventMap: eventMap$i,
                prevProps,
                nextProps: this.props,
                instance: this.state.map,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.map !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.map);
            }
            unregisterEvents(this.registeredEvents);
        }
    }
    render() {
        return (React__namespace.createElement("div", { id: this.props.id, ref: this.getRef, style: this.props.mapContainerStyle, className: this.props.mapContainerClassName },
            React__namespace.createElement(MapContext.Provider, { value: this.state.map }, this.state.map !== null ? this.props.children : React__namespace.createElement(React__namespace.Fragment, null))));
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest$1(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const isBrowser = typeof document !== 'undefined';

const injectScript = ({ url, id, nonce }) => {
    if (!isBrowser) {
        return Promise.reject(new Error('document is undefined'));
    }
    return new Promise(function injectScriptCallback(resolve, reject) {
        const existingScript = document.getElementById(id);
        const windowWithGoogleMap = window;
        if (existingScript) {
            // Same script id/url: keep same script
            const dataStateAttribute = existingScript.getAttribute('data-state');
            if (existingScript.src === url && dataStateAttribute !== 'error') {
                if (dataStateAttribute === 'ready') {
                    return resolve(id);
                }
                else {
                    const originalInitMap = windowWithGoogleMap.initMap;
                    const originalErrorCallback = existingScript.onerror;
                    windowWithGoogleMap.initMap = function initMap() {
                        if (originalInitMap) {
                            originalInitMap();
                        }
                        resolve(id);
                    };
                    existingScript.onerror = function (err) {
                        if (originalErrorCallback) {
                            originalErrorCallback(err);
                        }
                        reject(err);
                    };
                    return;
                }
            }
            // Same script id, but either
            // 1. requested URL is different
            // 2. script failed to load
            else {
                existingScript.remove();
            }
        }
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.id = id;
        script.async = true;
        script.nonce = nonce;
        script.onerror = function onerror(err) {
            script.setAttribute('data-state', 'error');
            reject(err);
        };
        windowWithGoogleMap.initMap = function onload() {
            script.setAttribute('data-state', 'ready');
            resolve(id);
        };
        document.head.appendChild(script);
    }).catch(err => {
        console.error('injectScript error: ', err);
        throw err;
    });
};

const isRobotoStyle = (element) => {
    // roboto font download
    if (element.href &&
        element.href.indexOf('https://fonts.googleapis.com/css?family=Roboto') ===
            0) {
        return true;
    }
    // roboto style elements
    if (element.tagName.toLowerCase() === 'style' &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        element.styleSheet &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        element.styleSheet.cssText &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        element.styleSheet.cssText.replace('\r\n', '').indexOf('.gm-style') === 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        element.styleSheet.cssText = '';
        return true;
    }
    // roboto style elements for other browsers
    if (element.tagName.toLowerCase() === 'style' &&
        element.innerHTML &&
        element.innerHTML.replace('\r\n', '').indexOf('.gm-style') === 0) {
        element.innerHTML = '';
        return true;
    }
    // when google tries to add empty style
    if (element.tagName.toLowerCase() === 'style' &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        !element.styleSheet &&
        !element.innerHTML) {
        return true;
    }
    return false;
};
// Preventing the Google Maps library from downloading an extra font
const preventGoogleFonts = () => {
    // we override these methods only for one particular head element
    // default methods for other elements are not affected
    const head = document.getElementsByTagName('head')[0];
    const trueInsertBefore = head.insertBefore.bind(head);
    // TODO: adding return before reflect solves the TS issue
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    head.insertBefore = function insertBefore(newElement, referenceElement) {
        if (!isRobotoStyle(newElement)) {
            Reflect.apply(trueInsertBefore, head, [newElement, referenceElement]);
        }
    };
    const trueAppend = head.appendChild.bind(head);
    // TODO: adding return before reflect solves the TS issue
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    head.appendChild = function appendChild(textNode) {
        if (!isRobotoStyle(textNode)) {
            Reflect.apply(trueAppend, head, [textNode]);
        }
    };
};

function makeLoadScriptUrl({ googleMapsApiKey, googleMapsClientId, version = 'weekly', language, region, libraries, channel, mapIds }) {
    const params = [];
    invariant_1((googleMapsApiKey && googleMapsClientId) || !(googleMapsApiKey && googleMapsClientId), 'You need to specify either googleMapsApiKey or googleMapsClientId for @react-google-maps/api load script to work. You cannot use both at the same time.');
    if (googleMapsApiKey) {
        params.push(`key=${googleMapsApiKey}`);
    }
    else if (googleMapsClientId) {
        params.push(`client=${googleMapsClientId}`);
    }
    if (version) {
        params.push(`v=${version}`);
    }
    if (language) {
        params.push(`language=${language}`);
    }
    if (region) {
        params.push(`region=${region}`);
    }
    if (libraries && libraries.length) {
        params.push(`libraries=${libraries.sort().join(',')}`);
    }
    if (channel) {
        params.push(`channel=${channel}`);
    }
    if (mapIds && mapIds.length) {
        params.push(`map_ids=${mapIds.join(',')}`);
    }
    params.push('callback=initMap');
    return `https://maps.googleapis.com/maps/api/js?${params.join('&')}`;
}

let cleaningUp = false;
function DefaultLoadingElement() {
    return React__namespace.createElement("div", null, `Loading...`);
}
const defaultLoadScriptProps = {
    id: 'script-loader',
    version: 'weekly',
};
class LoadScript extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.check = React__namespace.createRef();
        this.state = {
            loaded: false,
        };
        this.cleanupCallback = () => {
            // @ts-ignore
            delete window.google.maps;
            this.injectScript();
        };
        this.isCleaningUp = () => __awaiter(this, void 0, void 0, function* () {
            function promiseCallback(resolve) {
                if (!cleaningUp) {
                    resolve();
                }
                else {
                    if (isBrowser) {
                        const timer = window.setInterval(function interval() {
                            if (!cleaningUp) {
                                window.clearInterval(timer);
                                resolve();
                            }
                        }, 1);
                    }
                }
                return;
            }
            return new Promise(promiseCallback);
        });
        this.cleanup = () => {
            cleaningUp = true;
            const script = document.getElementById(this.props.id);
            if (script && script.parentNode) {
                script.parentNode.removeChild(script);
            }
            Array.prototype.slice
                .call(document.getElementsByTagName('script'))
                .filter(function filter(script) {
                return typeof script.src === 'string' && script.src.includes('maps.googleapis');
            })
                .forEach(function forEach(script) {
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            });
            Array.prototype.slice
                .call(document.getElementsByTagName('link'))
                .filter(function filter(link) {
                return (link.href === 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Google+Sans');
            })
                .forEach(function forEach(link) {
                if (link.parentNode) {
                    link.parentNode.removeChild(link);
                }
            });
            Array.prototype.slice
                .call(document.getElementsByTagName('style'))
                .filter(function filter(style) {
                return (style.innerText !== undefined &&
                    style.innerText.length > 0 &&
                    style.innerText.includes('.gm-'));
            })
                .forEach(function forEach(style) {
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            });
        };
        this.injectScript = () => {
            if (this.props.preventGoogleFontsLoading) {
                preventGoogleFonts();
            }
            invariant_1(!!this.props.id, 'LoadScript requires "id" prop to be a string: %s', this.props.id);
            const injectScriptOptions = {
                id: this.props.id,
                nonce: this.props.nonce,
                url: makeLoadScriptUrl(this.props),
            };
            injectScript(injectScriptOptions)
                .then(() => {
                if (this.props.onLoad) {
                    this.props.onLoad();
                }
                this.setState(function setLoaded() {
                    return {
                        loaded: true,
                    };
                });
                return;
            })
                .catch(err => {
                if (this.props.onError) {
                    this.props.onError(err);
                }
                console.error(`
          There has been an Error with loading Google Maps API script, please check that you provided correct google API key (${this
                    .props.googleMapsApiKey || '-'}) or Client ID (${this.props.googleMapsClientId ||
                    '-'}) to <LoadScript />
          Otherwise it is a Network issue.
        `);
            });
        };
    }
    componentDidMount() {
        if (isBrowser) {
            if (window.google && window.google.maps && !cleaningUp) {
                console.error('google api is already presented');
                return;
            }
            this.isCleaningUp()
                .then(this.injectScript)
                .catch(function error(err) {
                console.error('Error at injecting script after cleaning up: ', err);
            });
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.libraries !== prevProps.libraries) {
            console.warn('Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables');
        }
        if (isBrowser && prevProps.language !== this.props.language) {
            this.cleanup();
            // TODO: refactor to use gDSFP maybe... wait for hooks refactoring.
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState(function setLoaded() {
                return {
                    loaded: false,
                };
            }, this.cleanupCallback);
        }
    }
    componentWillUnmount() {
        if (isBrowser) {
            this.cleanup();
            const timeoutCallback = () => {
                if (!this.check.current) {
                    // @ts-ignore
                    delete window.google;
                    cleaningUp = false;
                }
            };
            window.setTimeout(timeoutCallback, 1);
            if (this.props.onUnmount) {
                this.props.onUnmount();
            }
        }
    }
    render() {
        return (React__namespace.createElement(React__namespace.Fragment, null,
            React__namespace.createElement("div", { ref: this.check }),
            this.state.loaded
                ? this.props.children
                : this.props.loadingElement || React__namespace.createElement(DefaultLoadingElement, null)));
    }
}
LoadScript.defaultProps = defaultLoadScriptProps;

/* eslint-disable filenames/match-regex */
let previouslyLoadedUrl;
function useLoadScript({ id = defaultLoadScriptProps.id, version = defaultLoadScriptProps.version, nonce, googleMapsApiKey, googleMapsClientId, language, region, libraries, preventGoogleFontsLoading, channel, mapIds, }) {
    const isMounted = React__namespace.useRef(false);
    const [isLoaded, setLoaded] = React__namespace.useState(false);
    const [loadError, setLoadError] = React__namespace.useState(undefined);
    React__namespace.useEffect(function trackMountedState() {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);
    React__namespace.useEffect(function applyPreventGoogleFonts() {
        if (isBrowser && preventGoogleFontsLoading) {
            preventGoogleFonts();
        }
    }, [preventGoogleFontsLoading]);
    React__namespace.useEffect(function validateLoadedState() {
        if (isLoaded) {
            invariant_1(!!window.google, 'useLoadScript was marked as loaded, but window.google is not present. Something went wrong.');
        }
    }, [isLoaded]);
    const url = makeLoadScriptUrl({
        version,
        googleMapsApiKey,
        googleMapsClientId,
        language,
        region,
        libraries,
        channel,
        mapIds
    });
    React__namespace.useEffect(function loadScriptAndModifyLoadedState() {
        if (!isBrowser) {
            return;
        }
        function setLoadedIfMounted() {
            if (isMounted.current) {
                setLoaded(true);
                previouslyLoadedUrl = url;
            }
        }
        if (window.google && window.google.maps && previouslyLoadedUrl === url) {
            setLoadedIfMounted();
            return;
        }
        injectScript({ id, url, nonce })
            .then(setLoadedIfMounted)
            .catch(function handleInjectError(err) {
            if (isMounted.current) {
                setLoadError(err);
            }
            console.warn(`
        There has been an Error with loading Google Maps API script, please check that you provided correct google API key (${googleMapsApiKey ||
                '-'}) or Client ID (${googleMapsClientId || '-'})
        Otherwise it is a Network issue.
      `);
            console.error(err);
        });
    }, [id, url, nonce]);
    const prevLibraries = React__namespace.useRef();
    React__namespace.useEffect(function checkPerformance() {
        if (prevLibraries.current && libraries !== prevLibraries.current) {
            console.warn('Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables');
        }
        prevLibraries.current = libraries;
    }, [libraries]);
    return { isLoaded, loadError, url };
}

const defaultLoadingElement = React__namespace.createElement(DefaultLoadingElement, null);
function LoadScriptNext(_a) {
    var { loadingElement, onLoad, onError, onUnmount, children } = _a, hookOptions = __rest$1(_a, ["loadingElement", "onLoad", "onError", "onUnmount", "children"]);
    const { isLoaded, loadError } = useLoadScript(hookOptions);
    React__namespace.useEffect(function handleOnLoad() {
        if (isLoaded && typeof onLoad === 'function') {
            onLoad();
        }
    }, [isLoaded, onLoad]);
    React__namespace.useEffect(function handleOnError() {
        if (loadError && typeof onError === 'function') {
            onError(loadError);
        }
    }, [loadError, onError]);
    React__namespace.useEffect(function handleOnUnmount() {
        return () => {
            if (onUnmount) {
                onUnmount();
            }
        };
    }, [onUnmount]);
    return isLoaded ? children : loadingElement || defaultLoadingElement;
}
var LoadScriptNext$1 = React__namespace.memo(LoadScriptNext);

// do not edit .js files directly - edit src/index.jst



var fastDeepEqual = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at.
 *
 *      Http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_ID = "__googleMapsScriptId";
/**
 * [[Loader]] makes it easier to add Google Maps JavaScript API to your application
 * dynamically using
 * [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
 * It works by dynamically creating and appending a script node to the the
 * document head and wrapping the callback function so as to return a promise.
 *
 * ```
 * const loader = new Loader({
 *   apiKey: "",
 *   version: "weekly",
 *   libraries: ["places"]
 * });
 *
 * loader.load().then((google) => {
 *   const map = new google.maps.Map(...)
 * })
 * ```
 */
class Loader {
    /**
     * Creates an instance of Loader using [[LoaderOptions]]. No defaults are set
     * using this library, instead the defaults are set by the Google Maps
     * JavaScript API server.
     *
     * ```
     * const loader = Loader({apiKey, version: 'weekly', libraries: ['places']});
     * ```
     */
    constructor({ apiKey, channel, client, id = DEFAULT_ID, libraries = [], language, region, version, mapIds, nonce, retries = 3, url = "https://maps.googleapis.com/maps/api/js", }) {
        this.CALLBACK = "__googleMapsCallback";
        this.callbacks = [];
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.version = version;
        this.apiKey = apiKey;
        this.channel = channel;
        this.client = client;
        this.id = id || DEFAULT_ID; // Do not allow empty string
        this.libraries = libraries;
        this.language = language;
        this.region = region;
        this.mapIds = mapIds;
        this.nonce = nonce;
        this.retries = retries;
        this.url = url;
        if (Loader.instance) {
            if (!fastDeepEqual(this.options, Loader.instance.options)) {
                throw new Error(`Loader must not be called again with different options. ${JSON.stringify(this.options)} !== ${JSON.stringify(Loader.instance.options)}`);
            }
            return Loader.instance;
        }
        Loader.instance = this;
    }
    get options() {
        return {
            version: this.version,
            apiKey: this.apiKey,
            channel: this.channel,
            client: this.client,
            id: this.id,
            libraries: this.libraries,
            language: this.language,
            region: this.region,
            mapIds: this.mapIds,
            nonce: this.nonce,
            url: this.url,
        };
    }
    get failed() {
        return this.done && !this.loading && this.errors.length >= this.retries + 1;
    }
    /**
     * CreateUrl returns the Google Maps JavaScript API script url given the [[LoaderOptions]].
     *
     * @ignore
     */
    createUrl() {
        let url = this.url;
        url += `?callback=${this.CALLBACK}`;
        if (this.apiKey) {
            url += `&key=${this.apiKey}`;
        }
        if (this.channel) {
            url += `&channel=${this.channel}`;
        }
        if (this.client) {
            url += `&client=${this.client}`;
        }
        if (this.libraries.length > 0) {
            url += `&libraries=${this.libraries.join(",")}`;
        }
        if (this.language) {
            url += `&language=${this.language}`;
        }
        if (this.region) {
            url += `&region=${this.region}`;
        }
        if (this.version) {
            url += `&v=${this.version}`;
        }
        if (this.mapIds) {
            url += `&map_ids=${this.mapIds.join(",")}`;
        }
        return url;
    }
    deleteScript() {
        const script = document.getElementById(this.id);
        if (script) {
            script.remove();
        }
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     */
    load() {
        return this.loadPromise();
    }
    /**
     * Load the Google Maps JavaScript API script and return a Promise.
     *
     * @ignore
     */
    loadPromise() {
        return new Promise((resolve, reject) => {
            this.loadCallback((err) => {
                if (!err) {
                    resolve(window.google);
                }
                else {
                    reject(err.error);
                }
            });
        });
    }
    /**
     * Load the Google Maps JavaScript API script with a callback.
     */
    loadCallback(fn) {
        this.callbacks.push(fn);
        this.execute();
    }
    /**
     * Set the script on document.
     */
    setScript() {
        if (document.getElementById(this.id)) {
            // TODO wrap onerror callback for cases where the script was loaded elsewhere
            this.callback();
            return;
        }
        const url = this.createUrl();
        const script = document.createElement("script");
        script.id = this.id;
        script.type = "text/javascript";
        script.src = url;
        script.onerror = this.loadErrorCallback.bind(this);
        script.defer = true;
        script.async = true;
        if (this.nonce) {
            script.nonce = this.nonce;
        }
        document.head.appendChild(script);
    }
    /**
     * Reset the loader state.
     */
    reset() {
        this.deleteScript();
        this.done = false;
        this.loading = false;
        this.errors = [];
        this.onerrorEvent = null;
    }
    resetIfRetryingFailed() {
        if (this.failed) {
            this.reset();
        }
    }
    loadErrorCallback(e) {
        this.errors.push(e);
        if (this.errors.length <= this.retries) {
            const delay = this.errors.length * Math.pow(2, this.errors.length);
            console.log(`Failed to load Google Maps script, retrying in ${delay} ms.`);
            setTimeout(() => {
                this.deleteScript();
                this.setScript();
            }, delay);
        }
        else {
            this.onerrorEvent = e;
            this.callback();
        }
    }
    setCallback() {
        window.__googleMapsCallback = this.callback.bind(this);
    }
    callback() {
        this.done = true;
        this.loading = false;
        this.callbacks.forEach((cb) => {
            cb(this.onerrorEvent);
        });
        this.callbacks = [];
    }
    execute() {
        this.resetIfRetryingFailed();
        if (this.done) {
            this.callback();
        }
        else {
            // short circuit and warn if google.maps is already loaded
            if (window.google && window.google.maps && window.google.maps.version) {
                console.warn("Google Maps already loaded outside @googlemaps/js-api-loader." +
                    "This may result in undesirable behavior as options and script parameters may not match.");
                this.callback();
                return;
            }
            if (this.loading) ;
            else {
                this.loading = true;
                this.setCallback();
                this.setScript();
            }
        }
    }
}

/* eslint-disable filenames/match-regex */
function useJsApiLoader({ id = defaultLoadScriptProps.id, version = defaultLoadScriptProps.version, nonce, googleMapsApiKey, 
// googleMapsClientId,
language, region, libraries, preventGoogleFontsLoading, 
// channel,
mapIds, }) {
    const isMounted = React__namespace.useRef(false);
    const [isLoaded, setLoaded] = React__namespace.useState(false);
    const [loadError, setLoadError] = React__namespace.useState(undefined);
    React__namespace.useEffect(function trackMountedState() {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);
    const loader = React__namespace.useMemo(function memo() {
        return new Loader({
            id,
            apiKey: googleMapsApiKey,
            version,
            libraries,
            language,
            region,
            mapIds,
            nonce,
        });
    }, [id, googleMapsApiKey, version, libraries, language, region, mapIds, nonce]);
    React__namespace.useEffect(function effect() {
        if (isLoaded) {
            return;
        }
        else {
            loader.load().then(function then() {
                if (isMounted.current)
                    setLoaded(true);
            })
                .catch(function onrejected(error) {
                setLoadError(error);
            });
        }
    }, []);
    React__namespace.useEffect(function applyPreventGoogleFonts() {
        if (isBrowser && preventGoogleFontsLoading) {
            preventGoogleFonts();
        }
    }, [preventGoogleFontsLoading]);
    const prevLibraries = React__namespace.useRef();
    React__namespace.useEffect(function effect() {
        if (prevLibraries.current && libraries !== prevLibraries.current) {
            console.warn('Performance warning! LoadScript has been reloaded unintentionally! You should not pass `libraries` prop as new array. Please keep an array of libraries as static class property for Components and PureComponents, or just a const variable outside of component, or somewhere in config files or ENV variables');
        }
        prevLibraries.current = libraries;
    }, [libraries]);
    return { isLoaded, loadError };
}

const eventMap$h = {};
const updaterMap$h = {
    options(instance, options) {
        instance.setOptions(options);
    },
};
class TrafficLayer extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            trafficLayer: null,
        };
        this.setTrafficLayerCallback = () => {
            if (this.state.trafficLayer !== null) {
                if (this.props.onLoad) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    this.props.onLoad(this.state.trafficLayer);
                }
            }
        };
        this.registeredEvents = [];
    }
    componentDidMount() {
        const trafficLayer = new google.maps.TrafficLayer(Object.assign(Object.assign({}, (this.props.options || {})), { map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$h,
            eventMap: eventMap$h,
            prevProps: {},
            nextProps: this.props,
            instance: trafficLayer,
        });
        this.setState(function setTrafficLayer() {
            return {
                trafficLayer,
            };
        }, this.setTrafficLayerCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.trafficLayer !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$h,
                eventMap: eventMap$h,
                prevProps,
                nextProps: this.props,
                instance: this.state.trafficLayer,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.trafficLayer !== null) {
            if (this.props.onUnmount) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                this.props.onUnmount(this.state.trafficLayer);
            }
            unregisterEvents(this.registeredEvents);
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.state.trafficLayer.setMap(null);
        }
    }
    render() {
        return null;
    }
}
TrafficLayer.contextType = MapContext;

class BicyclingLayer extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            bicyclingLayer: null,
        };
        this.setBicyclingLayerCallback = () => {
            if (this.state.bicyclingLayer !== null) {
                // TODO: how is this possibly null if we're doing a null check
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                this.state.bicyclingLayer.setMap(this.context);
                if (this.props.onLoad) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    this.props.onLoad(this.state.bicyclingLayer);
                }
            }
        };
    }
    componentDidMount() {
        const bicyclingLayer = new google.maps.BicyclingLayer();
        this.setState(function setBicyclingLayer() {
            return {
                bicyclingLayer,
            };
        }, this.setBicyclingLayerCallback);
    }
    componentWillUnmount() {
        if (this.state.bicyclingLayer !== null) {
            if (this.props.onUnmount) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                this.props.onUnmount(this.state.bicyclingLayer);
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.state.bicyclingLayer.setMap(null);
        }
    }
    render() {
        return null;
    }
}
BicyclingLayer.contextType = MapContext;

class TransitLayer extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            transitLayer: null,
        };
        this.setTransitLayerCallback = () => {
            if (this.state.transitLayer !== null) {
                // TODO: how is this possibly null if we're doing a null check
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                this.state.transitLayer.setMap(this.context);
                if (this.props.onLoad) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    this.props.onLoad(this.state.transitLayer);
                }
            }
        };
    }
    componentDidMount() {
        const transitLayer = new google.maps.TransitLayer();
        this.setState(function setTransitLayer() {
            return {
                transitLayer,
            };
        }, this.setTransitLayerCallback);
    }
    componentWillUnmount() {
        if (this.state.transitLayer !== null) {
            if (this.props.onUnmount) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                this.props.onUnmount(this.state.transitLayer);
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.state.transitLayer.setMap(null);
        }
    }
    render() {
        return null;
    }
}
TransitLayer.contextType = MapContext;

/* globals google */
const eventMap$g = {
    onCircleComplete: 'circlecomplete',
    onMarkerComplete: 'markercomplete',
    onOverlayComplete: 'overlaycomplete',
    onPolygonComplete: 'polygoncomplete',
    onPolylineComplete: 'polylinecomplete',
    onRectangleComplete: 'rectanglecomplete',
};
const updaterMap$g = {
    drawingMode(instance, drawingMode) {
        instance.setDrawingMode(drawingMode);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
};
class DrawingManager extends React__namespace.PureComponent {
    constructor(props) {
        super(props);
        this.registeredEvents = [];
        this.state = {
            drawingManager: null,
        };
        this.setDrawingManagerCallback = () => {
            if (this.state.drawingManager !== null && this.props.onLoad) {
                this.props.onLoad(this.state.drawingManager);
            }
        };
        invariant_1(!!google.maps.drawing, `Did you include prop libraries={['drawing']} in the URL? %s`, google.maps.drawing);
    }
    componentDidMount() {
        const drawingManager = new google.maps.drawing.DrawingManager(Object.assign(Object.assign({}, (this.props.options || {})), { map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$g,
            eventMap: eventMap$g,
            prevProps: {},
            nextProps: this.props,
            instance: drawingManager,
        });
        this.setState(function setDrawingManager() {
            return {
                drawingManager,
            };
        }, this.setDrawingManagerCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.drawingManager !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$g,
                eventMap: eventMap$g,
                prevProps,
                nextProps: this.props,
                instance: this.state.drawingManager,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.drawingManager !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.drawingManager);
            }
            unregisterEvents(this.registeredEvents);
            this.state.drawingManager.setMap(null);
        }
    }
    render() {
        return React__namespace.createElement(React__namespace.Fragment, null);
    }
}
DrawingManager.contextType = MapContext;

const eventMap$f = {
    onAnimationChanged: 'animation_changed',
    onClick: 'click',
    onClickableChanged: 'clickable_changed',
    onCursorChanged: 'cursor_changed',
    onDblClick: 'dblclick',
    onDrag: 'drag',
    onDragEnd: 'dragend',
    onDraggableChanged: 'draggable_changed',
    onDragStart: 'dragstart',
    onFlatChanged: 'flat_changed',
    onIconChanged: 'icon_changed',
    onMouseDown: 'mousedown',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
    onMouseUp: 'mouseup',
    onPositionChanged: 'position_changed',
    onRightClick: 'rightclick',
    onShapeChanged: 'shape_changed',
    onTitleChanged: 'title_changed',
    onVisibleChanged: 'visible_changed',
    onZindexChanged: 'zindex_changed',
};
const updaterMap$f = {
    animation(instance, animation) {
        instance.setAnimation(animation);
    },
    clickable(instance, clickable) {
        instance.setClickable(clickable);
    },
    cursor(instance, cursor) {
        instance.setCursor(cursor);
    },
    draggable(instance, draggable) {
        instance.setDraggable(draggable);
    },
    icon(instance, icon) {
        instance.setIcon(icon);
    },
    label(instance, label) {
        instance.setLabel(label);
    },
    map(instance, map) {
        instance.setMap(map);
    },
    opacity(instance, opacity) {
        instance.setOpacity(opacity);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
    position(instance, position) {
        instance.setPosition(position);
    },
    shape(instance, shape) {
        instance.setShape(shape);
    },
    title(instance, title) {
        instance.setTitle(title);
    },
    visible(instance, visible) {
        instance.setVisible(visible);
    },
    zIndex(instance, zIndex) {
        instance.setZIndex(zIndex);
    },
};
class Marker extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
    }
    componentDidMount() {
        const markerOptions = Object.assign(Object.assign(Object.assign({}, (this.props.options || {})), (this.props.clusterer ? {} : { map: this.context })), { position: this.props.position });
        // Unfortunately we can't just do this in the contstructor, because the
        // `MapContext` might not be filled in yet.
        this.marker = new google.maps.Marker(markerOptions);
        if (this.props.clusterer) {
            this.props.clusterer.addMarker(this.marker, !!this.props.noClustererRedraw);
        }
        else {
            this.marker.setMap(this.context);
        }
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$f,
            eventMap: eventMap$f,
            prevProps: {},
            nextProps: this.props,
            instance: this.marker,
        });
        if (this.props.onLoad) {
            this.props.onLoad(this.marker);
        }
    }
    componentDidUpdate(prevProps) {
        if (this.marker) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$f,
                eventMap: eventMap$f,
                prevProps,
                nextProps: this.props,
                instance: this.marker,
            });
        }
    }
    componentWillUnmount() {
        if (this.marker) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.marker);
            }
            unregisterEvents(this.registeredEvents);
            if (this.props.clusterer) {
                this.props.clusterer.removeMarker(this.marker, !!this.props.noClustererRedraw);
            }
            else {
                this.marker && this.marker.setMap(null);
            }
        }
    }
    render() {
        let children = null;
        if (this.props.children) {
            children = React__namespace.Children.map(this.props.children, child => {
                if (!React__namespace.isValidElement(child)) {
                    return child;
                }
                let elementChild = child;
                return React__namespace.cloneElement(elementChild, { anchor: this.marker });
            });
        }
        return children || null;
    }
}
Marker.contextType = MapContext;

var ClusterIcon = /** @class */ (function () {
    function ClusterIcon(cluster, styles) {
        cluster.getClusterer().extend(ClusterIcon, google.maps.OverlayView);
        this.cluster = cluster;
        this.clusterClassName = this.cluster.getClusterer().getClusterClass();
        this.className = this.clusterClassName;
        this.styles = styles;
        this.center = undefined;
        this.div = null;
        this.sums = null;
        this.visible = false;
        this.boundsChangedListener = null;
        this.url = '';
        this.height = 0;
        this.width = 0;
        this.anchorText = [0, 0];
        this.anchorIcon = [0, 0];
        this.textColor = 'black';
        this.textSize = 11;
        this.textDecoration = 'none';
        this.fontWeight = 'bold';
        this.fontStyle = 'normal';
        this.fontFamily = 'Arial,sans-serif';
        this.backgroundPosition = '0 0';
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.setMap(cluster.getMap()); // Note: this causes onAdd to be called
    }
    ClusterIcon.prototype.onAdd = function () {
        var _this = this;
        var cMouseDownInCluster;
        var cDraggingMapByCluster;
        this.div = document.createElement('div');
        this.div.className = this.className;
        if (this.visible) {
            this.show();
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.getPanes().overlayMouseTarget.appendChild(this.div);
        // Fix for Issue 157
        this.boundsChangedListener = google.maps.event.addListener(
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.getMap(), 'boundschanged', function boundsChanged() {
            cDraggingMapByCluster = cMouseDownInCluster;
        });
        google.maps.event.addDomListener(this.div, 'mousedown', function onMouseDown() {
            cMouseDownInCluster = true;
            cDraggingMapByCluster = false;
        });
        // eslint-disable-next-line  @getify/proper-arrows/this, @getify/proper-arrows/name
        google.maps.event.addDomListener(this.div, 'click', 
        // eslint-disable-next-line  @getify/proper-arrows/this, @getify/proper-arrows/name
        function (event) {
            cMouseDownInCluster = false;
            if (!cDraggingMapByCluster) {
                var markerClusterer_1 = _this.cluster.getClusterer();
                /**
                 * This event is fired when a cluster marker is clicked.
                 * @name MarkerClusterer#click
                 * @param {Cluster} c The cluster that was clicked.
                 * @event
                 */
                google.maps.event.trigger(markerClusterer_1, 'click', _this.cluster);
                google.maps.event.trigger(markerClusterer_1, 'clusterclick', _this.cluster); // deprecated name
                // The default click handler follows. Disable it by setting
                // the zoomOnClick property to false.
                if (markerClusterer_1.getZoomOnClick()) {
                    // Zoom into the cluster.
                    var maxZoom_1 = markerClusterer_1.getMaxZoom();
                    var bounds_1 = _this.cluster.getBounds();
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    markerClusterer_1.getMap().fitBounds(bounds_1);
                    // There is a fix for Issue 170 here:
                    setTimeout(function timeout() {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                        // @ts-ignore
                        markerClusterer_1.getMap().fitBounds(bounds_1);
                        // Don't zoom beyond the max zoom level
                        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                        // @ts-ignore
                        if (maxZoom_1 !== null && markerClusterer_1.getMap().getZoom() > maxZoom_1) {
                            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                            // @ts-ignore
                            markerClusterer_1.getMap().setZoom(maxZoom_1 + 1);
                        }
                    }, 100);
                }
                // Prevent event propagation to the map:
                event.cancelBubble = true;
                if (event.stopPropagation) {
                    event.stopPropagation();
                }
            }
        });
        google.maps.event.addDomListener(this.div, 'mouseover', 
        // eslint-disable-next-line  @getify/proper-arrows/this, @getify/proper-arrows/name
        function () {
            /**
             * This event is fired when the mouse moves over a cluster marker.
             * @name MarkerClusterer#mouseover
             * @param {Cluster} c The cluster that the mouse moved over.
             * @event
             */
            google.maps.event.trigger(_this.cluster.getClusterer(), 'mouseover', _this.cluster);
        });
        // eslint-disable-next-line  @getify/proper-arrows/this, @getify/proper-arrows/name
        google.maps.event.addDomListener(this.div, 'mouseout', 
        // eslint-disable-next-line  @getify/proper-arrows/this, @getify/proper-arrows/name
        function () {
            /**
             * This event is fired when the mouse moves out of a cluster marker.
             * @name MarkerClusterer#mouseout
             * @param {Cluster} c The cluster that the mouse moved out of.
             * @event
             */
            google.maps.event.trigger(_this.cluster.getClusterer(), 'mouseout', _this.cluster);
        });
    };
    ClusterIcon.prototype.onRemove = function () {
        if (this.div && this.div.parentNode) {
            this.hide();
            if (this.boundsChangedListener !== null) {
                google.maps.event.removeListener(this.boundsChangedListener);
            }
            google.maps.event.clearInstanceListeners(this.div);
            this.div.parentNode.removeChild(this.div);
            this.div = null;
        }
    };
    ClusterIcon.prototype.draw = function () {
        if (this.visible && this.div !== null && this.center) {
            var _a = this.getPosFromLatLng(this.center), x = _a.x, y = _a.y;
            this.div.style.top = y + 'px';
            this.div.style.left = x + 'px';
        }
    };
    ClusterIcon.prototype.hide = function () {
        if (this.div) {
            this.div.style.display = 'none';
        }
        this.visible = false;
    };
    ClusterIcon.prototype.show = function () {
        if (this.div && this.center) {
            var img = '', divTitle = '';
            // NOTE: values must be specified in px units
            var bp = this.backgroundPosition.split(' ');
            var spriteH = parseInt(bp[0].replace(/^\s+|\s+$/g, ''), 10);
            var spriteV = parseInt(bp[1].replace(/^\s+|\s+$/g, ''), 10);
            var pos = this.getPosFromLatLng(this.center);
            if (this.sums === null || typeof this.sums.title === 'undefined' || this.sums.title === '') {
                divTitle = this.cluster.getClusterer().getTitle();
            }
            else {
                divTitle = this.sums.title;
            }
            this.div.style.cssText = this.createCss(pos);
            img =
                "<img alt='" +
                    divTitle +
                    "' src='" +
                    this.url +
                    "' style='position: absolute; top: " +
                    spriteV +
                    'px; left: ' +
                    spriteH +
                    'px; ';
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            //@ts-ignore
            if (!this.cluster.getClusterer().enableRetinaIcons) {
                img +=
                    'clip: rect(' +
                        -1 * spriteV +
                        'px, ' +
                        (-1 * spriteH + this.width) +
                        'px, ' +
                        (-1 * spriteV + this.height) +
                        'px, ' +
                        -1 * spriteH +
                        'px);';
            }
            img += "'>";
            this.div.innerHTML =
                img +
                    "<div style='" +
                    'position: absolute;' +
                    'top: ' +
                    this.anchorText[0] +
                    'px;' +
                    'left: ' +
                    this.anchorText[1] +
                    'px;' +
                    'color: ' +
                    this.textColor +
                    ';' +
                    'font-size: ' +
                    this.textSize +
                    'px;' +
                    'font-family: ' +
                    this.fontFamily +
                    ';' +
                    'font-weight: ' +
                    this.fontWeight +
                    ';' +
                    'font-style: ' +
                    this.fontStyle +
                    ';' +
                    'text-decoration: ' +
                    this.textDecoration +
                    ';' +
                    'text-align: center;' +
                    'width: ' +
                    this.width +
                    'px;' +
                    'line-height:' +
                    this.height +
                    'px;' +
                    "'>" +
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    this.sums.text +
                    '</div>';
            this.div.title = divTitle;
            this.div.style.display = '';
        }
        this.visible = true;
    };
    ClusterIcon.prototype.useStyle = function (sums) {
        this.sums = sums;
        var styles = this.cluster.getClusterer().getStyles();
        var style = styles[Math.min(styles.length - 1, Math.max(0, sums.index - 1))];
        this.url = style.url;
        this.height = style.height;
        this.width = style.width;
        if (style.className)
            this.className = this.clusterClassName + " " + style.className;
        this.anchorText = style.anchorText || [0, 0];
        this.anchorIcon = style.anchorIcon || [this.height / 2, this.width / 2];
        this.textColor = style.textColor || 'black';
        this.textSize = style.textSize || 11;
        this.textDecoration = style.textDecoration || 'none';
        this.fontWeight = style.fontWeight || 'bold';
        this.fontStyle = style.fontStyle || 'normal';
        this.fontFamily = style.fontFamily || 'Arial,sans-serif';
        this.backgroundPosition = style.backgroundPosition || '0 0';
    };
    ClusterIcon.prototype.setCenter = function (center) {
        this.center = center;
    };
    ClusterIcon.prototype.createCss = function (pos) {
        var style = [];
        style.push('cursor: pointer;');
        style.push('position: absolute; top: ' + pos.y + 'px; left: ' + pos.x + 'px;');
        style.push('width: ' + this.width + 'px; height: ' + this.height + 'px;');
        return style.join('');
    };
    ClusterIcon.prototype.getPosFromLatLng = function (latlng) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        var pos = this.getProjection().fromLatLngToDivPixel(latlng);
        pos.x -= this.anchorIcon[1];
        pos.y -= this.anchorIcon[0];
        // pos.x = pos.x
        // pos.y = pos.y
        return pos;
    };
    return ClusterIcon;
}());

var Cluster$1 = /** @class */ (function () {
    function Cluster(markerClusterer) {
        this.markerClusterer = markerClusterer;
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.map = this.markerClusterer.getMap();
        this.gridSize = this.markerClusterer.getGridSize();
        this.minClusterSize = this.markerClusterer.getMinimumClusterSize();
        this.averageCenter = this.markerClusterer.getAverageCenter();
        this.markers = [];
        this.center = undefined;
        this.bounds = null;
        this.clusterIcon = new ClusterIcon(this, this.markerClusterer.getStyles());
    }
    Cluster.prototype.getSize = function () {
        return this.markers.length;
    };
    Cluster.prototype.getMarkers = function () {
        return this.markers;
    };
    Cluster.prototype.getCenter = function () {
        return this.center;
    };
    Cluster.prototype.getMap = function () {
        return this.map;
    };
    Cluster.prototype.getClusterer = function () {
        return this.markerClusterer;
    };
    Cluster.prototype.getBounds = function () {
        var bounds = new google.maps.LatLngBounds(this.center, this.center);
        var markers = this.getMarkers();
        for (var i = 0; i < markers.length; i++) {
            var position = markers[i].getPosition();
            if (position) {
                bounds.extend(position);
            }
        }
        return bounds;
    };
    Cluster.prototype.remove = function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.clusterIcon.setMap(null);
        this.markers = [];
        // @ts-ignore
        delete this.markers;
    };
    Cluster.prototype.addMarker = function (marker) {
        if (this.isMarkerAlreadyAdded(marker)) {
            return false;
        }
        if (!this.center) {
            var position = marker.getPosition();
            if (position) {
                this.center = position;
                this.calculateBounds();
            }
        }
        else {
            if (this.averageCenter) {
                var position = marker.getPosition();
                if (position) {
                    var length_1 = this.markers.length + 1;
                    this.center = new google.maps.LatLng((this.center.lat() * (length_1 - 1) + position.lat()) / length_1, (this.center.lng() * (length_1 - 1) + position.lng()) / length_1);
                    this.calculateBounds();
                }
            }
        }
        marker.isAdded = true;
        this.markers.push(marker);
        var mCount = this.markers.length;
        var maxZoom = this.markerClusterer.getMaxZoom();
        var zoom = this.map.getZoom();
        if (maxZoom !== null && typeof zoom !== 'undefined' && zoom > maxZoom) {
            // Zoomed in past max zoom, so show the marker.
            if (marker.getMap() !== this.map) {
                marker.setMap(this.map);
            }
        }
        else if (mCount < this.minClusterSize) {
            // Min cluster size not reached so show the marker.
            if (marker.getMap() !== this.map) {
                marker.setMap(this.map);
            }
        }
        else if (mCount === this.minClusterSize) {
            // Hide the markers that were showing.
            for (var i = 0; i < mCount; i++) {
                this.markers[i].setMap(null);
            }
        }
        else {
            marker.setMap(null);
        }
        return true;
    };
    Cluster.prototype.isMarkerInClusterBounds = function (marker) {
        if (this.bounds !== null) {
            var position = marker.getPosition();
            if (position) {
                return this.bounds.contains(position);
            }
        }
        return false;
    };
    Cluster.prototype.calculateBounds = function () {
        this.bounds = this.markerClusterer.getExtendedBounds(new google.maps.LatLngBounds(this.center, this.center));
    };
    Cluster.prototype.updateIcon = function () {
        var mCount = this.markers.length;
        var maxZoom = this.markerClusterer.getMaxZoom();
        var zoom = this.map.getZoom();
        if (maxZoom !== null && typeof zoom !== 'undefined' && zoom > maxZoom) {
            this.clusterIcon.hide();
            return;
        }
        if (mCount < this.minClusterSize) {
            // Min cluster size not yet reached.
            this.clusterIcon.hide();
            return;
        }
        if (this.center) {
            this.clusterIcon.setCenter(this.center);
        }
        this.clusterIcon.useStyle(this.markerClusterer.getCalculator()(this.markers, this.markerClusterer.getStyles().length));
        this.clusterIcon.show();
    };
    Cluster.prototype.isMarkerAlreadyAdded = function (marker) {
        if (this.markers.includes) {
            return this.markers.includes(marker);
        }
        else {
            for (var i = 0; i < this.markers.length; i++) {
                if (marker === this.markers[i]) {
                    return true;
                }
            }
        }
        return false;
    };
    return Cluster;
}());

/* global google */
/**
 * Supports up to 9007199254740991 (Number.MAX_SAFE_INTEGER) markers
 * which is not a problem as max array length is 4294967296 (2**32)
 */
var CALCULATOR = function CALCULATOR(markers, numStyles) {
    var count = markers.length;
    var numberOfDigits = count.toString().length;
    var index = Math.min(numberOfDigits, numStyles);
    return {
        text: count.toString(),
        index: index,
        title: '',
    };
};
var BATCH_SIZE = 2000;
var BATCH_SIZE_IE = 500;
var IMAGE_PATH = 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';
var IMAGE_EXTENSION = 'png';
var IMAGE_SIZES = [53, 56, 66, 78, 90];
var CLUSTERER_CLASS = 'cluster';
var Clusterer = /** @class */ (function () {
    function Clusterer(map, optMarkers, optOptions) {
        if (optMarkers === void 0) { optMarkers = []; }
        if (optOptions === void 0) { optOptions = {}; }
        this.extend(Clusterer, google.maps.OverlayView);
        this.markers = [];
        this.clusters = [];
        this.listeners = [];
        this.activeMap = null;
        this.ready = false;
        this.gridSize = optOptions.gridSize || 60;
        this.minClusterSize = optOptions.minimumClusterSize || 2;
        this.maxZoom = optOptions.maxZoom || null;
        this.styles = optOptions.styles || [];
        this.title = optOptions.title || '';
        this.zoomOnClick = true;
        if (optOptions.zoomOnClick !== undefined) {
            this.zoomOnClick = optOptions.zoomOnClick;
        }
        this.averageCenter = false;
        if (optOptions.averageCenter !== undefined) {
            this.averageCenter = optOptions.averageCenter;
        }
        this.ignoreHidden = false;
        if (optOptions.ignoreHidden !== undefined) {
            this.ignoreHidden = optOptions.ignoreHidden;
        }
        this.enableRetinaIcons = false;
        if (optOptions.enableRetinaIcons !== undefined) {
            this.enableRetinaIcons = optOptions.enableRetinaIcons;
        }
        this.imagePath = optOptions.imagePath || IMAGE_PATH;
        this.imageExtension = optOptions.imageExtension || IMAGE_EXTENSION;
        this.imageSizes = optOptions.imageSizes || IMAGE_SIZES;
        this.calculator = optOptions.calculator || CALCULATOR;
        this.batchSize = optOptions.batchSize || BATCH_SIZE;
        this.batchSizeIE = optOptions.batchSizeIE || BATCH_SIZE_IE;
        this.clusterClass = optOptions.clusterClass || CLUSTERER_CLASS;
        if (navigator.userAgent.toLowerCase().indexOf('msie') !== -1) {
            // Try to avoid IE timeout when processing a huge number of markers:
            this.batchSize = this.batchSizeIE;
        }
        this.timerRefStatic = null;
        this.setupStyles();
        this.addMarkers(optMarkers, true);
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.setMap(map); // Note: this causes onAdd to be called
    }
    Clusterer.prototype.onAdd = function () {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.activeMap = this.getMap();
        this.ready = true;
        this.repaint();
        // Add the map event listeners
        this.listeners = [
            google.maps.event.addListener(
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.getMap(), 'zoom_changed', 
            // eslint-disable-next-line  @getify/proper-arrows/this, @getify/proper-arrows/name
            function () {
                _this.resetViewport(false);
                // Workaround for this Google bug: when map is at level 0 and "-" of
                // zoom slider is clicked, a "zoom_changed" event is fired even though
                // the map doesn't zoom out any further. In this situation, no "idle"
                // event is triggered so the cluster markers that have been removed
                // do not get redrawn. Same goes for a zoom in at maxZoom.
                if (
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                _this.getMap().getZoom() === (_this.get('minZoom') || 0) ||
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    _this.getMap().getZoom() === _this.get('maxZoom')) {
                    google.maps.event.trigger(_this, 'idle');
                }
            }),
            google.maps.event.addListener(
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.getMap(), 'idle', 
            // eslint-disable-next-line  @getify/proper-arrows/this, @getify/proper-arrows/name
            function () {
                _this.redraw();
            }),
        ];
    };
    // eslint-disable-next-line @getify/proper-arrows/this
    Clusterer.prototype.onRemove = function () {
        // Put all the managed markers back on the map:
        for (var i = 0; i < this.markers.length; i++) {
            if (this.markers[i].getMap() !== this.activeMap) {
                this.markers[i].setMap(this.activeMap);
            }
        }
        // Remove all clusters:
        for (var i = 0; i < this.clusters.length; i++) {
            this.clusters[i].remove();
        }
        this.clusters = [];
        // Remove map event listeners:
        for (var i = 0; i < this.listeners.length; i++) {
            google.maps.event.removeListener(this.listeners[i]);
        }
        this.listeners = [];
        this.activeMap = null;
        this.ready = false;
    };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    Clusterer.prototype.draw = function () { };
    Clusterer.prototype.setupStyles = function () {
        if (this.styles.length > 0) {
            return;
        }
        for (var i = 0; i < this.imageSizes.length; i++) {
            this.styles.push({
                url: this.imagePath + (i + 1) + '.' + this.imageExtension,
                height: this.imageSizes[i],
                width: this.imageSizes[i],
            });
        }
    };
    Clusterer.prototype.fitMapToMarkers = function () {
        var markers = this.getMarkers();
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            var position = markers[i].getPosition();
            if (position) {
                bounds.extend(position);
            }
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.getMap().fitBounds(bounds);
    };
    Clusterer.prototype.getGridSize = function () {
        return this.gridSize;
    };
    Clusterer.prototype.setGridSize = function (gridSize) {
        this.gridSize = gridSize;
    };
    Clusterer.prototype.getMinimumClusterSize = function () {
        return this.minClusterSize;
    };
    Clusterer.prototype.setMinimumClusterSize = function (minimumClusterSize) {
        this.minClusterSize = minimumClusterSize;
    };
    Clusterer.prototype.getMaxZoom = function () {
        return this.maxZoom;
    };
    Clusterer.prototype.setMaxZoom = function (maxZoom) {
        this.maxZoom = maxZoom;
    };
    Clusterer.prototype.getStyles = function () {
        return this.styles;
    };
    Clusterer.prototype.setStyles = function (styles) {
        this.styles = styles;
    };
    Clusterer.prototype.getTitle = function () {
        return this.title;
    };
    Clusterer.prototype.setTitle = function (title) {
        this.title = title;
    };
    Clusterer.prototype.getZoomOnClick = function () {
        return this.zoomOnClick;
    };
    Clusterer.prototype.setZoomOnClick = function (zoomOnClick) {
        this.zoomOnClick = zoomOnClick;
    };
    Clusterer.prototype.getAverageCenter = function () {
        return this.averageCenter;
    };
    Clusterer.prototype.setAverageCenter = function (averageCenter) {
        this.averageCenter = averageCenter;
    };
    Clusterer.prototype.getIgnoreHidden = function () {
        return this.ignoreHidden;
    };
    Clusterer.prototype.setIgnoreHidden = function (ignoreHidden) {
        this.ignoreHidden = ignoreHidden;
    };
    Clusterer.prototype.getEnableRetinaIcons = function () {
        return this.enableRetinaIcons;
    };
    Clusterer.prototype.setEnableRetinaIcons = function (enableRetinaIcons) {
        this.enableRetinaIcons = enableRetinaIcons;
    };
    Clusterer.prototype.getImageExtension = function () {
        return this.imageExtension;
    };
    Clusterer.prototype.setImageExtension = function (imageExtension) {
        this.imageExtension = imageExtension;
    };
    Clusterer.prototype.getImagePath = function () {
        return this.imagePath;
    };
    Clusterer.prototype.setImagePath = function (imagePath) {
        this.imagePath = imagePath;
    };
    Clusterer.prototype.getImageSizes = function () {
        return this.imageSizes;
    };
    Clusterer.prototype.setImageSizes = function (imageSizes) {
        this.imageSizes = imageSizes;
    };
    Clusterer.prototype.getCalculator = function () {
        return this.calculator;
    };
    Clusterer.prototype.setCalculator = function (calculator) {
        this.calculator = calculator;
    };
    Clusterer.prototype.getBatchSizeIE = function () {
        return this.batchSizeIE;
    };
    Clusterer.prototype.setBatchSizeIE = function (batchSizeIE) {
        this.batchSizeIE = batchSizeIE;
    };
    Clusterer.prototype.getClusterClass = function () {
        return this.clusterClass;
    };
    Clusterer.prototype.setClusterClass = function (clusterClass) {
        this.clusterClass = clusterClass;
    };
    Clusterer.prototype.getMarkers = function () {
        return this.markers;
    };
    Clusterer.prototype.getTotalMarkers = function () {
        return this.markers.length;
    };
    Clusterer.prototype.getClusters = function () {
        return this.clusters;
    };
    Clusterer.prototype.getTotalClusters = function () {
        return this.clusters.length;
    };
    Clusterer.prototype.addMarker = function (marker, optNoDraw) {
        this.pushMarkerTo(marker);
        if (!optNoDraw) {
            this.redraw();
        }
    };
    Clusterer.prototype.addMarkers = function (markers, optNoDraw) {
        for (var key in markers) {
            if (markers.hasOwnProperty(key)) {
                this.pushMarkerTo(markers[key]);
            }
        }
        if (!optNoDraw) {
            this.redraw();
        }
    };
    Clusterer.prototype.pushMarkerTo = function (marker) {
        var _this = this;
        // If the marker is draggable add a listener so we can update the clusters on the dragend:
        if (marker.getDraggable()) {
            // eslint-disable-next-line @getify/proper-arrows/name, @getify/proper-arrows/this
            google.maps.event.addListener(marker, 'dragend', function () {
                if (_this.ready) {
                    marker.isAdded = false;
                    _this.repaint();
                }
            });
        }
        marker.isAdded = false;
        this.markers.push(marker);
    };
    Clusterer.prototype.removeMarker_ = function (marker) {
        var index = -1;
        if (this.markers.indexOf) {
            index = this.markers.indexOf(marker);
        }
        else {
            for (var i = 0; i < this.markers.length; i++) {
                if (marker === this.markers[i]) {
                    index = i;
                    break;
                }
            }
        }
        if (index === -1) {
            // Marker is not in our list of markers, so do nothing:
            return false;
        }
        marker.setMap(null);
        this.markers.splice(index, 1); // Remove the marker from the list of managed markers
        return true;
    };
    Clusterer.prototype.removeMarker = function (marker, optNoDraw) {
        var removed = this.removeMarker_(marker);
        if (!optNoDraw && removed) {
            this.repaint();
        }
        return removed;
    };
    Clusterer.prototype.removeMarkers = function (markers, optNoDraw) {
        var removed = false;
        for (var i = 0; i < markers.length; i++) {
            removed = removed || this.removeMarker_(markers[i]);
        }
        if (!optNoDraw && removed) {
            this.repaint();
        }
        return removed;
    };
    Clusterer.prototype.clearMarkers = function () {
        this.resetViewport(true);
        this.markers = [];
    };
    Clusterer.prototype.repaint = function () {
        var oldClusters = this.clusters.slice();
        this.clusters = [];
        this.resetViewport(false);
        this.redraw();
        // Remove the old clusters.
        // Do it in a timeout to prevent blinking effect.
        setTimeout(function timeout() {
            for (var i = 0; i < oldClusters.length; i++) {
                oldClusters[i].remove();
            }
        }, 0);
    };
    Clusterer.prototype.getExtendedBounds = function (bounds) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        var projection = this.getProjection();
        // Convert the points to pixels and the extend out by the grid size.
        var trPix = projection.fromLatLngToDivPixel(
        // Turn the bounds into latlng.
        new google.maps.LatLng(bounds.getNorthEast().lat(), bounds.getNorthEast().lng()));
        trPix.x += this.gridSize;
        trPix.y -= this.gridSize;
        var blPix = projection.fromLatLngToDivPixel(
        // Turn the bounds into latlng.
        new google.maps.LatLng(bounds.getSouthWest().lat(), bounds.getSouthWest().lng()));
        blPix.x -= this.gridSize;
        blPix.y += this.gridSize;
        // Extend the bounds to contain the new bounds.
        bounds.extend(
        // Convert the pixel points back to LatLng nw
        projection.fromDivPixelToLatLng(trPix));
        bounds.extend(
        // Convert the pixel points back to LatLng sw
        projection.fromDivPixelToLatLng(blPix));
        return bounds;
    };
    Clusterer.prototype.redraw = function () {
        // Redraws all the clusters.
        this.createClusters(0);
    };
    Clusterer.prototype.resetViewport = function (optHide) {
        // Remove all the clusters
        for (var i = 0; i < this.clusters.length; i++) {
            this.clusters[i].remove();
        }
        this.clusters = [];
        // Reset the markers to not be added and to be removed from the map.
        for (var i = 0; i < this.markers.length; i++) {
            var marker = this.markers[i];
            marker.isAdded = false;
            if (optHide) {
                marker.setMap(null);
            }
        }
    };
    Clusterer.prototype.distanceBetweenPoints = function (p1, p2) {
        var R = 6371; // Radius of the Earth in km
        var dLat = ((p2.lat() - p1.lat()) * Math.PI) / 180;
        var dLon = ((p2.lng() - p1.lng()) * Math.PI) / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((p1.lat() * Math.PI) / 180) *
                Math.cos((p2.lat() * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    };
    Clusterer.prototype.isMarkerInBounds = function (marker, bounds) {
        var position = marker.getPosition();
        if (position) {
            return bounds.contains(position);
        }
        return false;
    };
    Clusterer.prototype.addToClosestCluster = function (marker) {
        var cluster;
        var distance = 40000; // Some large number
        var clusterToAddTo = null;
        for (var i = 0; i < this.clusters.length; i++) {
            cluster = this.clusters[i];
            var center = cluster.getCenter();
            var position = marker.getPosition();
            if (center && position) {
                var d = this.distanceBetweenPoints(center, position);
                if (d < distance) {
                    distance = d;
                    clusterToAddTo = cluster;
                }
            }
        }
        if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
            clusterToAddTo.addMarker(marker);
        }
        else {
            cluster = new Cluster$1(this);
            cluster.addMarker(marker);
            this.clusters.push(cluster);
        }
    };
    Clusterer.prototype.createClusters = function (iFirst) {
        var _this = this;
        if (!this.ready) {
            return;
        }
        // Cancel previous batch processing if we're working on the first batch:
        if (iFirst === 0) {
            /**
             * This event is fired when the <code>Clusterer</code> begins
             *  clustering markers.
             * @name Clusterer#clusteringbegin
             * @param {Clusterer} mc The Clusterer whose markers are being clustered.
             * @event
             */
            google.maps.event.trigger(this, 'clusteringbegin', this);
            if (this.timerRefStatic !== null) {
                window.clearTimeout(this.timerRefStatic);
                // @ts-ignore
                delete this.timerRefStatic;
            }
        }
        // Get our current map view bounds.
        // Create a new bounds object so we don't affect the map.
        //
        // See Comments 9 & 11 on Issue 3651 relating to this workaround for a Google Maps bug:
        var mapBounds = 
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.getMap().getZoom() > 3
            ? new google.maps.LatLngBounds(
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.getMap()
                .getBounds()
                .getSouthWest(), 
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.getMap()
                .getBounds()
                .getNorthEast())
            : new google.maps.LatLngBounds(new google.maps.LatLng(85.02070771743472, -178.48388434375), new google.maps.LatLng(-85.08136444384544, 178.00048865625));
        var bounds = this.getExtendedBounds(mapBounds);
        var iLast = Math.min(iFirst + this.batchSize, this.markers.length);
        for (var i = iFirst; i < iLast; i++) {
            var marker = this.markers[i];
            if (!marker.isAdded && this.isMarkerInBounds(marker, bounds)) {
                if (!this.ignoreHidden || (this.ignoreHidden && marker.getVisible())) {
                    this.addToClosestCluster(marker);
                }
            }
        }
        if (iLast < this.markers.length) {
            this.timerRefStatic = window.setTimeout(
            // eslint-disable-next-line @getify/proper-arrows/this, @getify/proper-arrows/name
            function () {
                _this.createClusters(iLast);
            }, 0);
        }
        else {
            this.timerRefStatic = null;
            /**
             * This event is fired when the <code>Clusterer</code> stops
             *  clustering markers.
             * @name Clusterer#clusteringend
             * @param {Clusterer} mc The Clusterer whose markers are being clustered.
             * @event
             */
            google.maps.event.trigger(this, 'clusteringend', this);
            for (var i = 0; i < this.clusters.length; i++) {
                this.clusters[i].updateIcon();
            }
        }
    };
    Clusterer.prototype.extend = function (obj1, obj2) {
        return function applyExtend(object) {
            // eslint-disable-next-line guard-for-in
            for (var property in object.prototype) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                this.prototype[property] = object.prototype[property];
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            return this;
        }.apply(obj1, [obj2]);
    };
    return Clusterer;
}());

/* eslint-disable filenames/match-exported */
const eventMap$e = {
    onClick: 'click',
    onClusteringBegin: 'clusteringbegin',
    onClusteringEnd: 'clusteringend',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
};
const updaterMap$e = {
    averageCenter(instance, averageCenter) {
        instance.setAverageCenter(averageCenter);
    },
    batchSizeIE(instance, batchSizeIE) {
        instance.setBatchSizeIE(batchSizeIE);
    },
    calculator(instance, calculator) {
        instance.setCalculator(calculator);
    },
    clusterClass(instance, clusterClass) {
        instance.setClusterClass(clusterClass);
    },
    enableRetinaIcons(instance, enableRetinaIcons) {
        instance.setEnableRetinaIcons(enableRetinaIcons);
    },
    gridSize(instance, gridSize) {
        instance.setGridSize(gridSize);
    },
    ignoreHidden(instance, ignoreHidden) {
        instance.setIgnoreHidden(ignoreHidden);
    },
    imageExtension(instance, imageExtension) {
        instance.setImageExtension(imageExtension);
    },
    imagePath(instance, imagePath) {
        instance.setImagePath(imagePath);
    },
    imageSizes(instance, imageSizes) {
        instance.setImageSizes(imageSizes);
    },
    maxZoom(instance, maxZoom) {
        instance.setMaxZoom(maxZoom);
    },
    minimumClusterSize(instance, minimumClusterSize) {
        instance.setMinimumClusterSize(minimumClusterSize);
    },
    styles(instance, styles) {
        instance.setStyles(styles);
    },
    title(instance, title) {
        instance.setTitle(title);
    },
    zoomOnClick(instance, zoomOnClick) {
        instance.setZoomOnClick(zoomOnClick);
    },
};
class ClustererComponent extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            markerClusterer: null,
        };
        this.setClustererCallback = () => {
            if (this.state.markerClusterer !== null && this.props.onLoad) {
                this.props.onLoad(this.state.markerClusterer);
            }
        };
    }
    componentDidMount() {
        if (this.context) {
            const markerClusterer = new Clusterer(this.context, [], this.props.options);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$e,
                eventMap: eventMap$e,
                prevProps: {},
                nextProps: this.props,
                instance: markerClusterer,
            });
            this.setState(function setClusterer() {
                return {
                    markerClusterer,
                };
            }, this.setClustererCallback);
        }
    }
    componentDidUpdate(prevProps) {
        if (this.state.markerClusterer) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$e,
                eventMap: eventMap$e,
                prevProps,
                nextProps: this.props,
                instance: this.state.markerClusterer,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.markerClusterer !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.markerClusterer);
            }
            unregisterEvents(this.registeredEvents);
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.state.markerClusterer.setMap(null);
        }
    }
    render() {
        return this.state.markerClusterer !== null
            ? this.props.children(this.state.markerClusterer)
            : null;
    }
}
ClustererComponent.contextType = MapContext;

var InfoBox = /** @class */ (function () {
    function InfoBox(options) {
        if (options === void 0) { options = {}; }
        this.extend(InfoBox, google.maps.OverlayView);
        // Standard options (in common with google.maps.InfoWindow):
        this.content = options.content || '';
        this.disableAutoPan = options.disableAutoPan || false;
        this.maxWidth = options.maxWidth || 0;
        this.pixelOffset = options.pixelOffset || new google.maps.Size(0, 0);
        this.position = options.position || new google.maps.LatLng(0, 0);
        this.zIndex = options.zIndex || null;
        // Additional options (unique to InfoBox):
        this.boxClass = options.boxClass || 'infoBox';
        this.boxStyle = options.boxStyle || {};
        this.closeBoxMargin = options.closeBoxMargin || '2px';
        this.closeBoxURL = options.closeBoxURL || 'http://www.google.com/intl/en_us/mapfiles/close.gif';
        if (options.closeBoxURL === '') {
            this.closeBoxURL = '';
        }
        this.infoBoxClearance = options.infoBoxClearance || new google.maps.Size(1, 1);
        if (typeof options.visible === 'undefined') {
            if (typeof options.isHidden === 'undefined') {
                options.visible = true;
            }
            else {
                options.visible = !options.isHidden;
            }
        }
        this.isHidden = !options.visible;
        this.alignBottom = options.alignBottom || false;
        this.pane = options.pane || 'floatPane';
        this.enableEventPropagation = options.enableEventPropagation || false;
        this.div = null;
        this.closeListener = null;
        this.moveListener = null;
        this.mapListener = null;
        this.contextListener = null;
        this.eventListeners = null;
        this.fixedWidthSet = null;
    }
    InfoBox.prototype.createInfoBoxDiv = function () {
        var _this = this;
        // This handler prevents an event in the InfoBox from being passed on to the map.
        function cancelHandler(event) {
            event.cancelBubble = true;
            if (event.stopPropagation) {
                event.stopPropagation();
            }
        }
        // This handler ignores the current event in the InfoBox and conditionally prevents
        // the event from being passed on to the map. It is used for the contextmenu event.
        // eslint-disable-next-line  @getify/proper-arrows/this
        var ignoreHandler = function (event) {
            event.returnValue = false;
            if (event.preventDefault) {
                event.preventDefault();
            }
            if (!_this.enableEventPropagation) {
                cancelHandler(event);
            }
        };
        if (!this.div) {
            this.div = document.createElement('div');
            this.setBoxStyle();
            if (typeof this.content === 'string') {
                this.div.innerHTML = this.getCloseBoxImg() + this.content;
            }
            else {
                this.div.innerHTML = this.getCloseBoxImg();
                this.div.appendChild(this.content);
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            var panes = this.getPanes();
            panes[this.pane].appendChild(this.div); // Add the InfoBox div to the DOM
            this.addClickHandler();
            if (this.div.style.width) {
                this.fixedWidthSet = true;
            }
            else {
                if (this.maxWidth !== 0 && this.div.offsetWidth > this.maxWidth) {
                    this.div.style.width = this.maxWidth + 'px';
                    this.fixedWidthSet = true;
                }
                else {
                    // The following code is needed to overcome problems with MSIE
                    var bw = this.getBoxWidths();
                    this.div.style.width = this.div.offsetWidth - bw.left - bw.right + 'px';
                    this.fixedWidthSet = false;
                }
            }
            this.panBox(this.disableAutoPan);
            if (!this.enableEventPropagation) {
                this.eventListeners = [];
                // Cancel event propagation.
                // Note: mousemove not included (to resolve Issue 152)
                var events = [
                    'mousedown',
                    'mouseover',
                    'mouseout',
                    'mouseup',
                    'click',
                    'dblclick',
                    'touchstart',
                    'touchend',
                    'touchmove',
                ];
                for (var i = 0; i < events.length; i++) {
                    this.eventListeners.push(google.maps.event.addDomListener(this.div, events[i], cancelHandler));
                }
                // Workaround for Google bug that causes the cursor to change to a pointer
                // when the mouse moves over a marker underneath InfoBox.
                this.eventListeners.push(google.maps.event.addDomListener(this.div, 'mouseover', 
                // eslint-disable-next-line  @getify/proper-arrows/this, @getify/proper-arrows/name
                function () {
                    if (_this.div) {
                        _this.div.style.cursor = 'default';
                    }
                }));
            }
            this.contextListener = google.maps.event.addDomListener(this.div, 'contextmenu', ignoreHandler);
            /**
             * This event is fired when the DIV containing the InfoBox's content is attached to the DOM.
             * @name InfoBox#domready
             * @event
             */
            google.maps.event.trigger(this, 'domready');
        }
    };
    InfoBox.prototype.getCloseBoxImg = function () {
        var img = '';
        if (this.closeBoxURL !== '') {
            img = '<img alt=""';
            img += ' aria-hidden="true"';
            img += " src='" + this.closeBoxURL + "'";
            img += ' align=right'; // Do this because Opera chokes on style='float: right;'
            img += " style='";
            img += ' position: relative;'; // Required by MSIE
            img += ' cursor: pointer;';
            img += ' margin: ' + this.closeBoxMargin + ';';
            img += "'>";
        }
        return img;
    };
    InfoBox.prototype.addClickHandler = function () {
        if (this.div && this.div.firstChild && this.closeBoxURL !== '') {
            var closeBox = this.div.firstChild;
            this.closeListener = google.maps.event.addDomListener(closeBox, 'click', this.getCloseClickHandler());
        }
        else {
            this.closeListener = null;
        }
    };
    InfoBox.prototype.getCloseClickHandler = function () {
        var _this = this;
        // eslint-disable-next-line  @getify/proper-arrows/this, @getify/proper-arrows/name
        return function (event) {
            // 1.0.3 fix: Always prevent propagation of a close box click to the map:
            event.cancelBubble = true;
            if (event.stopPropagation) {
                event.stopPropagation();
            }
            /**
             * This event is fired when the InfoBox's close box is clicked.
             * @name InfoBox#closeclick
             * @event
             */
            google.maps.event.trigger(_this, 'closeclick');
            _this.close();
        };
    };
    InfoBox.prototype.panBox = function (disablePan) {
        if (this.div && !disablePan) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            var map = this.getMap();
            // Only pan if attached to map, not panorama
            if (map instanceof google.maps.Map) {
                var xOffset = 0;
                var yOffset = 0;
                var bounds = map.getBounds();
                if (bounds && !bounds.contains(this.position)) {
                    // Marker not in visible area of map, so set center
                    // of map to the marker position first.
                    map.setCenter(this.position);
                }
                var mapDiv = map.getDiv();
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                var mapWidth = mapDiv.offsetWidth;
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                var mapHeight = mapDiv.offsetHeight;
                var iwOffsetX = this.pixelOffset.width;
                var iwOffsetY = this.pixelOffset.height;
                var iwWidth = this.div.offsetWidth;
                var iwHeight = this.div.offsetHeight;
                var padX = this.infoBoxClearance.width;
                var padY = this.infoBoxClearance.height;
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                var projection = this.getProjection();
                var pixPosition = projection.fromLatLngToContainerPixel(this.position);
                if (pixPosition !== null) {
                    if (pixPosition.x < -iwOffsetX + padX) {
                        xOffset = pixPosition.x + iwOffsetX - padX;
                    }
                    else if (pixPosition.x + iwWidth + iwOffsetX + padX > mapWidth) {
                        xOffset = pixPosition.x + iwWidth + iwOffsetX + padX - mapWidth;
                    }
                    if (this.alignBottom) {
                        if (pixPosition.y < -iwOffsetY + padY + iwHeight) {
                            yOffset = pixPosition.y + iwOffsetY - padY - iwHeight;
                        }
                        else if (pixPosition.y + iwOffsetY + padY > mapHeight) {
                            yOffset = pixPosition.y + iwOffsetY + padY - mapHeight;
                        }
                    }
                    else {
                        if (pixPosition.y < -iwOffsetY + padY) {
                            yOffset = pixPosition.y + iwOffsetY - padY;
                        }
                        else if (pixPosition.y + iwHeight + iwOffsetY + padY > mapHeight) {
                            yOffset = pixPosition.y + iwHeight + iwOffsetY + padY - mapHeight;
                        }
                    }
                }
                if (!(xOffset === 0 && yOffset === 0)) {
                    // Move the map to the shifted center.
                    map.panBy(xOffset, yOffset);
                }
            }
        }
    };
    InfoBox.prototype.setBoxStyle = function () {
        if (this.div) {
            // Apply style values from the style sheet defined in the boxClass parameter:
            this.div.className = this.boxClass;
            // Clear existing inline style values:
            this.div.style.cssText = '';
            // Apply style values defined in the boxStyle parameter:
            var boxStyle = this.boxStyle;
            for (var i in boxStyle) {
                if (boxStyle.hasOwnProperty(i)) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    this.div.style[i] = boxStyle[i];
                }
            }
            // Fix for iOS disappearing InfoBox problem
            // See http://stackoverflow.com/questions/9229535/google-maps-markers-disappear-at-certain-zoom-level-only-on-iphone-ipad
            this.div.style.webkitTransform = 'translateZ(0)';
            // Fix up opacity style for benefit of MSIE
            if (typeof this.div.style.opacity !== 'undefined' && this.div.style.opacity !== '') {
                // See http://www.quirksmode.org/css/opacity.html
                var opacity = parseFloat(this.div.style.opacity || '');
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                this.div.style.msFilter =
                    '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity * 100 + ')"';
                this.div.style.filter = 'alpha(opacity=' + opacity * 100 + ')';
            }
            // Apply required styles
            this.div.style.position = 'absolute';
            this.div.style.visibility = 'hidden';
            if (this.zIndex !== null) {
                this.div.style.zIndex = this.zIndex + '';
            }
            if (!this.div.style.overflow) {
                this.div.style.overflow = 'auto';
            }
        }
    };
    InfoBox.prototype.getBoxWidths = function () {
        var bw = { top: 0, bottom: 0, left: 0, right: 0 };
        if (!this.div) {
            return bw;
        }
        if (document.defaultView && document.defaultView.getComputedStyle) {
            var ownerDocument = this.div.ownerDocument;
            var computedStyle = ownerDocument && ownerDocument.defaultView
                ? ownerDocument.defaultView.getComputedStyle(this.div, '')
                : null;
            if (computedStyle) {
                // The computed styles are always in pixel units (good!)
                bw.top = parseInt(computedStyle.borderTopWidth || '', 10) || 0;
                bw.bottom = parseInt(computedStyle.borderBottomWidth || '', 10) || 0;
                bw.left = parseInt(computedStyle.borderLeftWidth || '', 10) || 0;
                bw.right = parseInt(computedStyle.borderRightWidth || '', 10) || 0;
            }
        }
        else if (
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        document.documentElement.currentStyle // MSIE
        ) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            var currentStyle = this.div.currentStyle;
            if (currentStyle) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // The current styles may not be in pixel units, but assume they are (bad!)
                bw.top = parseInt(currentStyle.borderTopWidth || '', 10) || 0;
                bw.bottom = parseInt(currentStyle.borderBottomWidth || '', 10) || 0;
                bw.left = parseInt(currentStyle.borderLeftWidth || '', 10) || 0;
                bw.right = parseInt(currentStyle.borderRightWidth || '', 10) || 0;
            }
        }
        return bw;
    };
    InfoBox.prototype.onRemove = function () {
        if (this.div && this.div.parentNode) {
            this.div.parentNode.removeChild(this.div);
            this.div = null;
        }
    };
    InfoBox.prototype.draw = function () {
        this.createInfoBoxDiv();
        if (this.div) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            var projection = this.getProjection();
            var pixPosition = projection.fromLatLngToDivPixel(this.position);
            if (pixPosition !== null) {
                this.div.style.left = pixPosition.x + this.pixelOffset.width + 'px';
                if (this.alignBottom) {
                    this.div.style.bottom = -(pixPosition.y + this.pixelOffset.height) + 'px';
                }
                else {
                    this.div.style.top = pixPosition.y + this.pixelOffset.height + 'px';
                }
            }
            if (this.isHidden) {
                this.div.style.visibility = 'hidden';
            }
            else {
                this.div.style.visibility = 'visible';
            }
        }
    };
    InfoBox.prototype.setOptions = function (options) {
        if (options === void 0) { options = {}; }
        if (typeof options.boxClass !== 'undefined') {
            // Must be first
            this.boxClass = options.boxClass;
            this.setBoxStyle();
        }
        if (typeof options.boxStyle !== 'undefined') {
            // Must be second
            this.boxStyle = options.boxStyle;
            this.setBoxStyle();
        }
        if (typeof options.content !== 'undefined') {
            this.setContent(options.content);
        }
        if (typeof options.disableAutoPan !== 'undefined') {
            this.disableAutoPan = options.disableAutoPan;
        }
        if (typeof options.maxWidth !== 'undefined') {
            this.maxWidth = options.maxWidth;
        }
        if (typeof options.pixelOffset !== 'undefined') {
            this.pixelOffset = options.pixelOffset;
        }
        if (typeof options.alignBottom !== 'undefined') {
            this.alignBottom = options.alignBottom;
        }
        if (typeof options.position !== 'undefined') {
            this.setPosition(options.position);
        }
        if (typeof options.zIndex !== 'undefined') {
            this.setZIndex(options.zIndex);
        }
        if (typeof options.closeBoxMargin !== 'undefined') {
            this.closeBoxMargin = options.closeBoxMargin;
        }
        if (typeof options.closeBoxURL !== 'undefined') {
            this.closeBoxURL = options.closeBoxURL;
        }
        if (typeof options.infoBoxClearance !== 'undefined') {
            this.infoBoxClearance = options.infoBoxClearance;
        }
        if (typeof options.isHidden !== 'undefined') {
            this.isHidden = options.isHidden;
        }
        if (typeof options.visible !== 'undefined') {
            this.isHidden = !options.visible;
        }
        if (typeof options.enableEventPropagation !== 'undefined') {
            this.enableEventPropagation = options.enableEventPropagation;
        }
        if (this.div) {
            this.draw();
        }
    };
    InfoBox.prototype.setContent = function (content) {
        this.content = content;
        if (this.div) {
            if (this.closeListener) {
                google.maps.event.removeListener(this.closeListener);
                this.closeListener = null;
            }
            // Odd code required to make things work with MSIE.
            if (!this.fixedWidthSet) {
                this.div.style.width = '';
            }
            if (typeof content === 'string') {
                this.div.innerHTML = this.getCloseBoxImg() + content;
            }
            else {
                this.div.innerHTML = this.getCloseBoxImg();
                this.div.appendChild(content);
            }
            // Perverse code required to make things work with MSIE.
            // (Ensures the close box does, in fact, float to the right.)
            if (!this.fixedWidthSet) {
                this.div.style.width = this.div.offsetWidth + 'px';
                if (typeof content === 'string') {
                    this.div.innerHTML = this.getCloseBoxImg() + content;
                }
                else {
                    this.div.innerHTML = this.getCloseBoxImg();
                    this.div.appendChild(content);
                }
            }
            this.addClickHandler();
        }
        /**
         * This event is fired when the content of the InfoBox changes.
         * @name InfoBox#content_changed
         * @event
         */
        google.maps.event.trigger(this, 'content_changed');
    };
    InfoBox.prototype.setPosition = function (latLng) {
        this.position = latLng;
        if (this.div) {
            this.draw();
        }
        /**
         * This event is fired when the position of the InfoBox changes.
         * @name InfoBox#position_changed
         * @event
         */
        google.maps.event.trigger(this, 'position_changed');
    };
    InfoBox.prototype.setVisible = function (isVisible) {
        this.isHidden = !isVisible;
        if (this.div) {
            this.div.style.visibility = this.isHidden ? 'hidden' : 'visible';
        }
    };
    InfoBox.prototype.setZIndex = function (index) {
        this.zIndex = index;
        if (this.div) {
            this.div.style.zIndex = index + '';
        }
        /**
         * This event is fired when the zIndex of the InfoBox changes.
         * @name InfoBox#zindex_changed
         * @event
         */
        google.maps.event.trigger(this, 'zindex_changed');
    };
    InfoBox.prototype.getContent = function () {
        return this.content;
    };
    InfoBox.prototype.getPosition = function () {
        return this.position;
    };
    InfoBox.prototype.getZIndex = function () {
        return this.zIndex;
    };
    InfoBox.prototype.getVisible = function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        var map = this.getMap();
        var isVisible;
        if (typeof map === 'undefined' || map === null) {
            isVisible = false;
        }
        else {
            isVisible = !this.isHidden;
        }
        return isVisible;
    };
    InfoBox.prototype.show = function () {
        this.isHidden = false;
        if (this.div) {
            this.div.style.visibility = 'visible';
        }
    };
    InfoBox.prototype.hide = function () {
        this.isHidden = true;
        if (this.div) {
            this.div.style.visibility = 'hidden';
        }
    };
    InfoBox.prototype.open = function (map, anchor) {
        var _this = this;
        if (anchor) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.position = anchor.getPosition();
            this.moveListener = google.maps.event.addListener(anchor, 'position_changed', 
            // eslint-disable-next-line  @getify/proper-arrows/this, @getify/proper-arrows/name
            function () {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                var position = anchor.getPosition();
                _this.setPosition(position);
            });
            this.mapListener = google.maps.event.addListener(anchor, 'map_changed', 
            // eslint-disable-next-line  @getify/proper-arrows/this, @getify/proper-arrows/name
            function () {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                _this.setMap(anchor.map);
            });
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.setMap(map);
        if (this.div) {
            this.panBox();
        }
    };
    InfoBox.prototype.close = function () {
        if (this.closeListener) {
            google.maps.event.removeListener(this.closeListener);
            this.closeListener = null;
        }
        if (this.eventListeners) {
            for (var i = 0; i < this.eventListeners.length; i++) {
                google.maps.event.removeListener(this.eventListeners[i]);
            }
            this.eventListeners = null;
        }
        if (this.moveListener) {
            google.maps.event.removeListener(this.moveListener);
            this.moveListener = null;
        }
        if (this.mapListener) {
            google.maps.event.removeListener(this.mapListener);
            this.mapListener = null;
        }
        if (this.contextListener) {
            google.maps.event.removeListener(this.contextListener);
            this.contextListener = null;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.setMap(null);
    };
    InfoBox.prototype.extend = function (obj1, obj2) {
        return function applyExtend(object) {
            // eslint-disable-next-line guard-for-in
            for (var property in object.prototype) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                // @ts-ignore
                if (!this.prototype.hasOwnProperty(property)) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    this.prototype[property] = object.prototype[property];
                }
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            return this;
        }.apply(obj1, [obj2]);
    };
    return InfoBox;
}());

const eventMap$d = {
    onCloseClick: 'closeclick',
    onContentChanged: 'content_changed',
    onDomReady: 'domready',
    onPositionChanged: 'position_changed',
    onZindexChanged: 'zindex_changed',
};
const updaterMap$d = {
    options(instance, options) {
        instance.setOptions(options);
    },
    position(instance, position) {
        if (position instanceof google.maps.LatLng) {
            instance.setPosition(position);
        }
        else {
            instance.setPosition(new google.maps.LatLng(position.lat, position.lng));
        }
    },
    visible(instance, visible) {
        instance.setVisible(visible);
    },
    zIndex(instance, zIndex) {
        instance.setZIndex(zIndex);
    },
};
class InfoBoxComponent extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.containerElement = null;
        this.state = {
            infoBox: null,
        };
        this.open = (infoBox, anchor) => {
            if (anchor) {
                infoBox.open(this.context, anchor);
            }
            else if (infoBox.getPosition()) {
                infoBox.open(this.context);
            }
            else {
                invariant_1(false, 'You must provide either an anchor or a position prop for <InfoBox>.');
            }
        };
        this.setInfoBoxCallback = () => {
            const { anchor, onLoad } = this.props;
            const { infoBox } = this.state;
            if (infoBox !== null && this.containerElement !== null) {
                infoBox.setContent(this.containerElement);
                this.open(infoBox, anchor);
                if (onLoad) {
                    onLoad(infoBox);
                }
            }
        };
    }
    componentDidMount() {
        const { options } = this.props;
        const _a = options || {}, { position } = _a, infoBoxOptions = __rest$1(_a, ["position"]);
        let positionLatLng;
        if (position && !(position instanceof google.maps.LatLng)) {
            positionLatLng = new google.maps.LatLng(position.lat, position.lng);
        }
        const infoBox = new InfoBox(Object.assign(Object.assign({}, infoBoxOptions), (positionLatLng ? { position: positionLatLng } : {})));
        this.containerElement = document.createElement('div');
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$d,
            eventMap: eventMap$d,
            prevProps: {},
            nextProps: this.props,
            instance: infoBox,
        });
        this.setState({ infoBox }, this.setInfoBoxCallback);
    }
    componentDidUpdate(prevProps) {
        const { infoBox } = this.state;
        if (infoBox !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$d,
                eventMap: eventMap$d,
                prevProps,
                nextProps: this.props,
                instance: infoBox,
            });
        }
    }
    componentWillUnmount() {
        const { onUnmount } = this.props;
        const { infoBox } = this.state;
        if (infoBox !== null) {
            if (onUnmount) {
                onUnmount(infoBox);
            }
            unregisterEvents(this.registeredEvents);
            infoBox.close();
        }
    }
    render() {
        if (!this.containerElement) {
            return null;
        }
        return ReactDOM__namespace.createPortal(React__namespace.Children.only(this.props.children), this.containerElement);
    }
}
InfoBoxComponent.contextType = MapContext;

/**
 * @module helpers
 */
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 *
 * @memberof helpers
 * @type {number}
 */
var earthRadius = 6371008.8;
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 *
 * @memberof helpers
 * @type {Object}
 */
var factors = {
    centimeters: earthRadius * 100,
    centimetres: earthRadius * 100,
    degrees: earthRadius / 111325,
    feet: earthRadius * 3.28084,
    inches: earthRadius * 39.37,
    kilometers: earthRadius / 1000,
    kilometres: earthRadius / 1000,
    meters: earthRadius,
    metres: earthRadius,
    miles: earthRadius / 1609.344,
    millimeters: earthRadius * 1000,
    millimetres: earthRadius * 1000,
    nauticalmiles: earthRadius / 1852,
    radians: 1,
    yards: earthRadius * 1.0936,
};
/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geom, properties, options) {
    if (options === void 0) { options = {}; }
    var feat = { type: "Feature" };
    if (options.id === 0 || options.id) {
        feat.id = options.id;
    }
    if (options.bbox) {
        feat.bbox = options.bbox;
    }
    feat.properties = properties || {};
    feat.geometry = geom;
    return feat;
}
/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function point(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (!coordinates) {
        throw new Error("coordinates is required");
    }
    if (!Array.isArray(coordinates)) {
        throw new Error("coordinates must be an Array");
    }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be at least 2 numbers long");
    }
    if (!isNumber(coordinates[0]) || !isNumber(coordinates[1])) {
        throw new Error("coordinates must contain numbers");
    }
    var geom = {
        type: "Point",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
function featureCollection(features, options) {
    if (options === void 0) { options = {}; }
    var fc = { type: "FeatureCollection" };
    if (options.id) {
        fc.id = options.id;
    }
    if (options.bbox) {
        fc.bbox = options.bbox;
    }
    fc.features = features;
    return fc;
}
/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} distance
 */
function radiansToLength(radians, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return radians * factor;
}
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} radians
 */
function lengthToRadians(distance, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return distance / factor;
}
/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
function degreesToRadians(degrees) {
    var radians = degrees % 360;
    return (radians * Math.PI) / 180;
}
/**
 * Converts a length to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} length to be converted
 * @param {Units} [originalUnit="kilometers"] of the length
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted length
 */
function convertLength(length, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "kilometers"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(length >= 0)) {
        throw new Error("length must be a positive number");
    }
    return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
}
/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
function isNumber(num) {
    return !isNaN(num) && num !== null && !Array.isArray(num);
}

/**
 * Returns a cloned copy of the passed GeoJSON Object, including possible 'Foreign Members'.
 * ~3-5x faster than the common JSON.parse + JSON.stringify combo method.
 *
 * @name clone
 * @param {GeoJSON} geojson GeoJSON Object
 * @returns {GeoJSON} cloned GeoJSON Object
 * @example
 * var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]], {color: 'red'});
 *
 * var lineCloned = turf.clone(line);
 */
function clone(geojson) {
    if (!geojson) {
        throw new Error("geojson is required");
    }
    switch (geojson.type) {
        case "Feature":
            return cloneFeature(geojson);
        case "FeatureCollection":
            return cloneFeatureCollection(geojson);
        case "Point":
        case "LineString":
        case "Polygon":
        case "MultiPoint":
        case "MultiLineString":
        case "MultiPolygon":
        case "GeometryCollection":
            return cloneGeometry(geojson);
        default:
            throw new Error("unknown GeoJSON type");
    }
}
/**
 * Clone Feature
 *
 * @private
 * @param {Feature<any>} geojson GeoJSON Feature
 * @returns {Feature<any>} cloned Feature
 */
function cloneFeature(geojson) {
    var cloned = { type: "Feature" };
    // Preserve Foreign Members
    Object.keys(geojson).forEach(function (key) {
        switch (key) {
            case "type":
            case "properties":
            case "geometry":
                return;
            default:
                cloned[key] = geojson[key];
        }
    });
    // Add properties & geometry last
    cloned.properties = cloneProperties(geojson.properties);
    cloned.geometry = cloneGeometry(geojson.geometry);
    return cloned;
}
/**
 * Clone Properties
 *
 * @private
 * @param {Object} properties GeoJSON Properties
 * @returns {Object} cloned Properties
 */
function cloneProperties(properties) {
    var cloned = {};
    if (!properties) {
        return cloned;
    }
    Object.keys(properties).forEach(function (key) {
        var value = properties[key];
        if (typeof value === "object") {
            if (value === null) {
                // handle null
                cloned[key] = null;
            }
            else if (Array.isArray(value)) {
                // handle Array
                cloned[key] = value.map(function (item) {
                    return item;
                });
            }
            else {
                // handle generic Object
                cloned[key] = cloneProperties(value);
            }
        }
        else {
            cloned[key] = value;
        }
    });
    return cloned;
}
/**
 * Clone Feature Collection
 *
 * @private
 * @param {FeatureCollection<any>} geojson GeoJSON Feature Collection
 * @returns {FeatureCollection<any>} cloned Feature Collection
 */
function cloneFeatureCollection(geojson) {
    var cloned = { type: "FeatureCollection" };
    // Preserve Foreign Members
    Object.keys(geojson).forEach(function (key) {
        switch (key) {
            case "type":
            case "features":
                return;
            default:
                cloned[key] = geojson[key];
        }
    });
    // Add features
    cloned.features = geojson.features.map(function (feature) {
        return cloneFeature(feature);
    });
    return cloned;
}
/**
 * Clone Geometry
 *
 * @private
 * @param {Geometry<any>} geometry GeoJSON Geometry
 * @returns {Geometry<any>} cloned Geometry
 */
function cloneGeometry(geometry) {
    var geom = { type: geometry.type };
    if (geometry.bbox) {
        geom.bbox = geometry.bbox;
    }
    if (geometry.type === "GeometryCollection") {
        geom.geometries = geometry.geometries.map(function (g) {
            return cloneGeometry(g);
        });
        return geom;
    }
    geom.coordinates = deepSlice(geometry.coordinates);
    return geom;
}
/**
 * Deep Slice coordinates
 *
 * @private
 * @param {Coordinates} coords Coordinates
 * @returns {Coordinates} all coordinates sliced
 */
function deepSlice(coords) {
    var cloned = coords;
    if (typeof cloned[0] !== "object") {
        return cloned.slice();
    }
    return cloned.map(function (coord) {
        return deepSlice(coord);
    });
}

/**
 * Callback for coordEach
 *
 * @callback coordEachCallback
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 *
 * @name coordEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function coordEach(geojson, callback, excludeWrapCoord) {
  // Handles null Geometry -- Skips this GeoJSON
  if (geojson === null) return;
  var j,
    k,
    l,
    geometry,
    stopG,
    coords,
    geometryMaybeCollection,
    wrapShrink = 0,
    coordIndex = 0,
    isGeometryCollection,
    type = geojson.type,
    isFeatureCollection = type === "FeatureCollection",
    isFeature = type === "Feature",
    stop = isFeatureCollection ? geojson.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
    geometryMaybeCollection = isFeatureCollection
      ? geojson.features[featureIndex].geometry
      : isFeature
      ? geojson.geometry
      : geojson;
    isGeometryCollection = geometryMaybeCollection
      ? geometryMaybeCollection.type === "GeometryCollection"
      : false;
    stopG = isGeometryCollection
      ? geometryMaybeCollection.geometries.length
      : 1;

    for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
      var multiFeatureIndex = 0;
      var geometryIndex = 0;
      geometry = isGeometryCollection
        ? geometryMaybeCollection.geometries[geomIndex]
        : geometryMaybeCollection;

      // Handles null Geometry -- Skips this geometry
      if (geometry === null) continue;
      coords = geometry.coordinates;
      var geomType = geometry.type;

      wrapShrink =
        excludeWrapCoord &&
        (geomType === "Polygon" || geomType === "MultiPolygon")
          ? 1
          : 0;

      switch (geomType) {
        case null:
          break;
        case "Point":
          if (
            callback(
              coords,
              coordIndex,
              featureIndex,
              multiFeatureIndex,
              geometryIndex
            ) === false
          )
            return false;
          coordIndex++;
          multiFeatureIndex++;
          break;
        case "LineString":
        case "MultiPoint":
          for (j = 0; j < coords.length; j++) {
            if (
              callback(
                coords[j],
                coordIndex,
                featureIndex,
                multiFeatureIndex,
                geometryIndex
              ) === false
            )
              return false;
            coordIndex++;
            if (geomType === "MultiPoint") multiFeatureIndex++;
          }
          if (geomType === "LineString") multiFeatureIndex++;
          break;
        case "Polygon":
        case "MultiLineString":
          for (j = 0; j < coords.length; j++) {
            for (k = 0; k < coords[j].length - wrapShrink; k++) {
              if (
                callback(
                  coords[j][k],
                  coordIndex,
                  featureIndex,
                  multiFeatureIndex,
                  geometryIndex
                ) === false
              )
                return false;
              coordIndex++;
            }
            if (geomType === "MultiLineString") multiFeatureIndex++;
            if (geomType === "Polygon") geometryIndex++;
          }
          if (geomType === "Polygon") multiFeatureIndex++;
          break;
        case "MultiPolygon":
          for (j = 0; j < coords.length; j++) {
            geometryIndex = 0;
            for (k = 0; k < coords[j].length; k++) {
              for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                if (
                  callback(
                    coords[j][k][l],
                    coordIndex,
                    featureIndex,
                    multiFeatureIndex,
                    geometryIndex
                  ) === false
                )
                  return false;
                coordIndex++;
              }
              geometryIndex++;
            }
            multiFeatureIndex++;
          }
          break;
        case "GeometryCollection":
          for (j = 0; j < geometry.geometries.length; j++)
            if (
              coordEach(geometry.geometries[j], callback, excludeWrapCoord) ===
              false
            )
              return false;
          break;
        default:
          throw new Error("Unknown Geometry Type");
      }
    }
  }
}

/**
 * Callback for featureEach
 *
 * @callback featureEachCallback
 * @param {Feature<any>} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name featureEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.featureEach(features, function (currentFeature, featureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 * });
 */
function featureEach(geojson, callback) {
  if (geojson.type === "Feature") {
    callback(geojson, 0);
  } else if (geojson.type === "FeatureCollection") {
    for (var i = 0; i < geojson.features.length; i++) {
      if (callback(geojson.features[i], i) === false) break;
    }
  }
}

/**
 * Get all coordinates from any GeoJSON object.
 *
 * @name coordAll
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @returns {Array<Array<number>>} coordinate position array
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * var coords = turf.coordAll(features);
 * //= [[26, 37], [36, 53]]
 */
function coordAll(geojson) {
  var coords = [];
  coordEach(geojson, function (coord) {
    coords.push(coord);
  });
  return coords;
}

var distance$1 = {
	/**
  * Euclidean distance
  */
	eudist: function eudist(v1, v2, sqrt) {
		var len = v1.length;
		var sum = 0;

		for (var i = 0; i < len; i++) {
			var d = (v1[i] || 0) - (v2[i] || 0);
			sum += d * d;
		}
		// Square root not really needed
		return sqrt ? Math.sqrt(sum) : sum;
	},
	mandist: function mandist(v1, v2, sqrt) {
		var len = v1.length;
		var sum = 0;

		for (var i = 0; i < len; i++) {
			sum += Math.abs((v1[i] || 0) - (v2[i] || 0));
		}

		// Square root not really needed
		return sqrt ? Math.sqrt(sum) : sum;
	},


	/**
  * Unidimensional distance
  */
	dist: function dist(v1, v2, sqrt) {
		var d = Math.abs(v1 - v2);
		return sqrt ? d : d * d;
	}
};

var Distance$1 = distance$1,
    eudist$1 = Distance$1.eudist,
    dist = Distance$1.dist;

var kinit = {
	kmrand: function kmrand(data, k) {
		var map = {},
		    ks = [],
		    t = k << 2;
		var len = data.length;
		var multi = data[0].length > 0;

		while (ks.length < k && t-- > 0) {
			var d = data[Math.floor(Math.random() * len)];
			var key = multi ? d.join("_") : "" + d;
			if (!map[key]) {
				map[key] = true;
				ks.push(d);
			}
		}

		if (ks.length < k) throw new Error("Error initializating clusters");else return ks;
	},


	/**
  * K-means++ initial centroid selection
  */
	kmpp: function kmpp(data, k) {
		var distance = data[0].length ? eudist$1 : dist;
		var ks = [],
		    len = data.length;
		var multi = data[0].length > 0;
		var map = {};

		// First random centroid
		var c = data[Math.floor(Math.random() * len)];
		var key = multi ? c.join("_") : "" + c;
		ks.push(c);
		map[key] = true;

		// Retrieve next centroids
		while (ks.length < k) {
			// Min Distances between current centroids and data points
			var dists = [],
			    lk = ks.length;
			var dsum = 0,
			    prs = [];

			for (var i = 0; i < len; i++) {
				var min = Infinity;
				for (var j = 0; j < lk; j++) {
					var _dist = distance(data[i], ks[j]);
					if (_dist <= min) min = _dist;
				}
				dists[i] = min;
			}

			// Sum all min distances
			for (var _i = 0; _i < len; _i++) {
				dsum += dists[_i];
			}

			// Probabilities and cummulative prob (cumsum)
			for (var _i2 = 0; _i2 < len; _i2++) {
				prs[_i2] = { i: _i2, v: data[_i2], pr: dists[_i2] / dsum, cs: 0 };
			}

			// Sort Probabilities
			prs.sort(function (a, b) {
				return a.pr - b.pr;
			});

			// Cummulative Probabilities
			prs[0].cs = prs[0].pr;
			for (var _i3 = 1; _i3 < len; _i3++) {
				prs[_i3].cs = prs[_i3 - 1].cs + prs[_i3].pr;
			}

			// Randomize
			var rnd = Math.random();

			// Gets only the items whose cumsum >= rnd
			var idx = 0;
			while (idx < len - 1 && prs[idx++].cs < rnd) {}
			ks.push(prs[idx - 1].v);
			/*
   let done = false;
   while(!done) {
   	// this is our new centroid
   	c = prs[idx-1].v
   	key = multi? c.join("_") : `${c}`;
   	if(!map[key]) {
   		map[key] = true;
   		ks.push(c);
   		done = true;
   	}
   	else {
   		idx++;
   	}
   }
   */
		}

		return ks;
	}
};

/*jshint esversion: 6 */

var Distance = distance$1,
    ClusterInit = kinit,
    eudist = Distance.eudist,
    kmrand = ClusterInit.kmrand,
    kmpp = ClusterInit.kmpp;

var MAX = 10000;

/**
 * Inits an array with values
 */
function init(len, val, v) {
	v = v || [];
	for (var i = 0; i < len; i++) {
		v[i] = val;
	}return v;
}

function skmeans(data, k, initial, maxit) {
	var ks = [],
	    old = [],
	    idxs = [],
	    dist = [];
	var conv = false,
	    it = maxit || MAX;
	var len = data.length,
	    vlen = data[0].length,
	    multi = vlen > 0;
	var count = [];

	if (!initial) {
		var _idxs = {};
		while (ks.length < k) {
			var idx = Math.floor(Math.random() * len);
			if (!_idxs[idx]) {
				_idxs[idx] = true;
				ks.push(data[idx]);
			}
		}
	} else if (initial == "kmrand") {
		ks = kmrand(data, k);
	} else if (initial == "kmpp") {
		ks = kmpp(data, k);
	} else {
		ks = initial;
	}

	do {
		// Reset k count
		init(k, 0, count);

		// For each value in data, find the nearest centroid
		for (var i = 0; i < len; i++) {
			var min = Infinity,
			    _idx = 0;
			for (var j = 0; j < k; j++) {
				// Multidimensional or unidimensional
				var dist = multi ? eudist(data[i], ks[j]) : Math.abs(data[i] - ks[j]);
				if (dist <= min) {
					min = dist;
					_idx = j;
				}
			}
			idxs[i] = _idx; // Index of the selected centroid for that value
			count[_idx]++; // Number of values for this centroid
		}

		// Recalculate centroids
		var sum = [],
		    old = [];
		for (var _j = 0; _j < k; _j++) {
			// Multidimensional or unidimensional
			sum[_j] = multi ? init(vlen, 0, sum[_j]) : 0;
			old[_j] = ks[_j];
		}

		// If multidimensional
		if (multi) {
			for (var _j2 = 0; _j2 < k; _j2++) {
				ks[_j2] = [];
			} // Sum values and count for each centroid
			for (var _i = 0; _i < len; _i++) {
				var _idx2 = idxs[_i],
				    // Centroid for that item
				vsum = sum[_idx2],
				    // Sum values for this centroid
				vect = data[_i]; // Current vector

				// Accumulate value on the centroid for current vector
				for (var h = 0; h < vlen; h++) {
					vsum[h] += vect[h];
				}
			}
			// Calculate the average for each centroid
			conv = true;
			for (var _j3 = 0; _j3 < k; _j3++) {
				var ksj = ks[_j3],
				    // Current centroid
				sumj = sum[_j3],
				    // Accumulated centroid values
				oldj = old[_j3],
				    // Old centroid value
				cj = count[_j3]; // Number of elements for this centroid

				// New average
				for (var _h = 0; _h < vlen; _h++) {
					ksj[_h] = sumj[_h] / cj || 0; // New centroid
				}

				// Find if centroids have moved
				if (conv) {
					for (var _h2 = 0; _h2 < vlen; _h2++) {
						if (oldj[_h2] != ksj[_h2]) {
							conv = false;
							break;
						}
					}
				}
			}
		}
		// If unidimensional
		else {
				// Sum values and count for each centroid
				for (var _i2 = 0; _i2 < len; _i2++) {
					var _idx3 = idxs[_i2];
					sum[_idx3] += data[_i2];
				}
				// Calculate the average for each centroid
				for (var _j4 = 0; _j4 < k; _j4++) {
					ks[_j4] = sum[_j4] / count[_j4] || 0; // New centroid
				}
				// Find if centroids have moved
				conv = true;
				for (var _j5 = 0; _j5 < k; _j5++) {
					if (old[_j5] != ks[_j5]) {
						conv = false;
						break;
					}
				}
			}

		conv = conv || --it <= 0;
	} while (!conv);

	return {
		it: MAX - it,
		k: k,
		idxs: idxs,
		centroids: ks
	};
}

var main = skmeans;

/**
 * Takes a set of {@link Point|points} and partition them into clusters using the k-mean .
 * It uses the [k-means algorithm](https://en.wikipedia.org/wiki/K-means_clustering)
 *
 * @name clustersKmeans
 * @param {FeatureCollection<Point>} points to be clustered
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.numberOfClusters=Math.sqrt(numberOfPoints/2)] numberOfClusters that will be generated
 * @param {boolean} [options.mutate=false] allows GeoJSON input to be mutated (significant performance increase if true)
 * @returns {FeatureCollection<Point>} Clustered Points with an additional two properties associated to each Feature:
 * - {number} cluster - the associated clusterId
 * - {[number, number]} centroid - Centroid of the cluster [Longitude, Latitude]
 * @example
 * // create random points with random z-values in their properties
 * var points = turf.randomPoint(100, {bbox: [0, 30, 20, 50]});
 * var options = {numberOfClusters: 7};
 * var clustered = turf.clustersKmeans(points, options);
 *
 * //addToMap
 * var addToMap = [clustered];
 */
function clustersKmeans(points, options) {
    if (options === void 0) { options = {}; }
    // Default Params
    var count = points.features.length;
    options.numberOfClusters =
        options.numberOfClusters || Math.round(Math.sqrt(count / 2));
    // numberOfClusters can't be greater than the number of points
    // fallbacks to count
    if (options.numberOfClusters > count)
        options.numberOfClusters = count;
    // Clone points to prevent any mutations (enabled by default)
    if (options.mutate !== true)
        points = clone(points);
    // collect points coordinates
    var data = coordAll(points);
    // create seed to avoid skmeans to drift
    var initialCentroids = data.slice(0, options.numberOfClusters);
    // create skmeans clusters
    var skmeansResult = main(data, options.numberOfClusters, initialCentroids);
    // store centroids {clusterId: [number, number]}
    var centroids = {};
    skmeansResult.centroids.forEach(function (coord, idx) {
        centroids[idx] = coord;
    });
    // add associated cluster number
    featureEach(points, function (point, index) {
        var clusterId = skmeansResult.idxs[index];
        point.properties.cluster = clusterId;
        point.properties.centroid = centroids[clusterId];
    });
    return points;
}

/**
 * Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
 *
 * @name getCoord
 * @param {Array<number>|Geometry<Point>|Feature<Point>} coord GeoJSON Point or an Array of numbers
 * @returns {Array<number>} coordinates
 * @example
 * var pt = turf.point([10, 10]);
 *
 * var coord = turf.getCoord(pt);
 * //= [10, 10]
 */
function getCoord(coord) {
    if (!coord) {
        throw new Error("coord is required");
    }
    if (!Array.isArray(coord)) {
        if (coord.type === "Feature" &&
            coord.geometry !== null &&
            coord.geometry.type === "Point") {
            return coord.geometry.coordinates;
        }
        if (coord.type === "Point") {
            return coord.coordinates;
        }
    }
    if (Array.isArray(coord) &&
        coord.length >= 2 &&
        !Array.isArray(coord[0]) &&
        !Array.isArray(coord[1])) {
        return coord;
    }
    throw new Error("coord must be GeoJSON Point or an Array of numbers");
}

//http://en.wikipedia.org/wiki/Haversine_formula
//http://www.movable-type.co.uk/scripts/latlong.html
/**
 * Calculates the distance between two {@link Point|points} in degrees, radians, miles, or kilometers.
 * This uses the [Haversine formula](http://en.wikipedia.org/wiki/Haversine_formula) to account for global curvature.
 *
 * @name distance
 * @param {Coord | Point} from origin point or coordinate
 * @param {Coord | Point} to destination point or coordinate
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units='kilometers'] can be degrees, radians, miles, or kilometers
 * @returns {number} distance between the two points
 * @example
 * var from = turf.point([-75.343, 39.984]);
 * var to = turf.point([-75.534, 39.123]);
 * var options = {units: 'miles'};
 *
 * var distance = turf.distance(from, to, options);
 *
 * //addToMap
 * var addToMap = [from, to];
 * from.properties.distance = distance;
 * to.properties.distance = distance;
 */
function distance(from, to, options) {
    if (options === void 0) { options = {}; }
    var coordinates1 = getCoord(from);
    var coordinates2 = getCoord(to);
    var dLat = degreesToRadians(coordinates2[1] - coordinates1[1]);
    var dLon = degreesToRadians(coordinates2[0] - coordinates1[0]);
    var lat1 = degreesToRadians(coordinates1[1]);
    var lat2 = degreesToRadians(coordinates2[1]);
    var a = Math.pow(Math.sin(dLat / 2), 2) +
        Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    return radiansToLength(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)), options.units);
}

var lib = {exports: {}};

var DBSCAN = {exports: {}};

/**
 * DBSCAN - Density based clustering
 *
 * @author Lukasz Krawczyk <contact@lukaszkrawczyk.eu>
 * @copyright MIT
 */

(function (module) {
/**
 * DBSCAN class construcotr
 * @constructor
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distanceFunction
 * @returns {DBSCAN}
 */
function DBSCAN(dataset, epsilon, minPts, distanceFunction) {
  /** @type {Array} */
  this.dataset = [];
  /** @type {number} */
  this.epsilon = 1;
  /** @type {number} */
  this.minPts = 2;
  /** @type {function} */
  this.distance = this._euclideanDistance;
  /** @type {Array} */
  this.clusters = [];
  /** @type {Array} */
  this.noise = [];

  // temporary variables used during computation

  /** @type {Array} */
  this._visited = [];
  /** @type {Array} */
  this._assigned = [];
  /** @type {number} */
  this._datasetLength = 0;

  this._init(dataset, epsilon, minPts, distanceFunction);
}
/******************************************************************************/
// public functions

/**
 * Start clustering
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distanceFunction
 * @returns {undefined}
 * @access public
 */
DBSCAN.prototype.run = function(dataset, epsilon, minPts, distanceFunction) {
  this._init(dataset, epsilon, minPts, distanceFunction);

  for (var pointId = 0; pointId < this._datasetLength; pointId++) {
    // if point is not visited, check if it forms a cluster
    if (this._visited[pointId] !== 1) {
      this._visited[pointId] = 1;

      // if closest neighborhood is too small to form a cluster, mark as noise
      var neighbors = this._regionQuery(pointId);

      if (neighbors.length < this.minPts) {
        this.noise.push(pointId);
      } else {
        // create new cluster and add point
        var clusterId = this.clusters.length;
        this.clusters.push([]);
        this._addToCluster(pointId, clusterId);

        this._expandCluster(clusterId, neighbors);
      }
    }
  }

  return this.clusters;
};

/******************************************************************************/
// protected functions

/**
 * Set object properties
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distance
 * @returns {undefined}
 * @access protected
 */
DBSCAN.prototype._init = function(dataset, epsilon, minPts, distance) {

  if (dataset) {

    if (!(dataset instanceof Array)) {
      throw Error('Dataset must be of type array, ' +
        typeof dataset + ' given');
    }

    this.dataset = dataset;
    this.clusters = [];
    this.noise = [];

    this._datasetLength = dataset.length;
    this._visited = new Array(this._datasetLength);
    this._assigned = new Array(this._datasetLength);
  }

  if (epsilon) {
    this.epsilon = epsilon;
  }

  if (minPts) {
    this.minPts = minPts;
  }

  if (distance) {
    this.distance = distance;
  }
};

/**
 * Expand cluster to closest points of given neighborhood
 *
 * @param {number} clusterId
 * @param {Array} neighbors
 * @returns {undefined}
 * @access protected
 */
DBSCAN.prototype._expandCluster = function(clusterId, neighbors) {

  /**
   * It's very important to calculate length of neighbors array each time,
   * as the number of elements changes over time
   */
  for (var i = 0; i < neighbors.length; i++) {
    var pointId2 = neighbors[i];

    if (this._visited[pointId2] !== 1) {
      this._visited[pointId2] = 1;
      var neighbors2 = this._regionQuery(pointId2);

      if (neighbors2.length >= this.minPts) {
        neighbors = this._mergeArrays(neighbors, neighbors2);
      }
    }

    // add to cluster
    if (this._assigned[pointId2] !== 1) {
      this._addToCluster(pointId2, clusterId);
    }
  }
};

/**
 * Add new point to cluster
 *
 * @param {number} pointId
 * @param {number} clusterId
 */
DBSCAN.prototype._addToCluster = function(pointId, clusterId) {
  this.clusters[clusterId].push(pointId);
  this._assigned[pointId] = 1;
};

/**
 * Find all neighbors around given point
 *
 * @param {number} pointId,
 * @param {number} epsilon
 * @returns {Array}
 * @access protected
 */
DBSCAN.prototype._regionQuery = function(pointId) {
  var neighbors = [];

  for (var id = 0; id < this._datasetLength; id++) {
    var dist = this.distance(this.dataset[pointId], this.dataset[id]);
    if (dist < this.epsilon) {
      neighbors.push(id);
    }
  }

  return neighbors;
};

/******************************************************************************/
// helpers

/**
 * @param {Array} a
 * @param {Array} b
 * @returns {Array}
 * @access protected
 */
DBSCAN.prototype._mergeArrays = function(a, b) {
  var len = b.length;

  for (var i = 0; i < len; i++) {
    var P = b[i];
    if (a.indexOf(P) < 0) {
      a.push(P);
    }
  }

  return a;
};

/**
 * Calculate euclidean distance in multidimensional space
 *
 * @param {Array} p
 * @param {Array} q
 * @returns {number}
 * @access protected
 */
DBSCAN.prototype._euclideanDistance = function(p, q) {
  var sum = 0;
  var i = Math.min(p.length, q.length);

  while (i--) {
    sum += (p[i] - q[i]) * (p[i] - q[i]);
  }

  return Math.sqrt(sum);
};

if (module.exports) {
  module.exports = DBSCAN;
}
}(DBSCAN));

var KMEANS = {exports: {}};

(function (module) {
/**
 * KMEANS clustering
 *
 * @author Lukasz Krawczyk <contact@lukaszkrawczyk.eu>
 * @copyright MIT
 */

/**
 * KMEANS class constructor
 * @constructor
 *
 * @param {Array} dataset
 * @param {number} k - number of clusters
 * @param {function} distance - distance function
 * @returns {KMEANS}
 */
 function KMEANS(dataset, k, distance) {
  this.k = 3; // number of clusters
  this.dataset = []; // set of feature vectors
  this.assignments = []; // set of associated clusters for each feature vector
  this.centroids = []; // vectors for our clusters

  this.init(dataset, k, distance);
}

/**
 * @returns {undefined}
 */
KMEANS.prototype.init = function(dataset, k, distance) {
  this.assignments = [];
  this.centroids = [];

  if (typeof dataset !== 'undefined') {
    this.dataset = dataset;
  }

  if (typeof k !== 'undefined') {
    this.k = k;
  }

  if (typeof distance !== 'undefined') {
    this.distance = distance;
  }
};

/**
 * @returns {undefined}
 */
KMEANS.prototype.run = function(dataset, k) {
  this.init(dataset, k);

  var len = this.dataset.length;

  // initialize centroids
  for (var i = 0; i < this.k; i++) {
    this.centroids[i] = this.randomCentroid();
	}

  var change = true;
  while(change) {

    // assign feature vectors to clusters
    change = this.assign();

    // adjust location of centroids
    for (var centroidId = 0; centroidId < this.k; centroidId++) {
      var mean = new Array(maxDim);
      var count = 0;

      // init mean vector
      for (var dim = 0; dim < maxDim; dim++) {
        mean[dim] = 0;
      }

      for (var j = 0; j < len; j++) {
        var maxDim = this.dataset[j].length;

        // if current cluster id is assigned to point
        if (centroidId === this.assignments[j]) {
          for (var dim = 0; dim < maxDim; dim++) {
            mean[dim] += this.dataset[j][dim];
          }
          count++;
        }
      }

      if (count > 0) {
        // if cluster contain points, adjust centroid position
        for (var dim = 0; dim < maxDim; dim++) {
          mean[dim] /= count;
        }
        this.centroids[centroidId] = mean;
      } else {
        // if cluster is empty, generate new random centroid
        this.centroids[centroidId] = this.randomCentroid();
        change = true;
      }
    }
  }

  return this.getClusters();
};

/**
 * Generate random centroid
 *
 * @returns {Array}
 */
KMEANS.prototype.randomCentroid = function() {
  var maxId = this.dataset.length -1;
  var centroid;
  var id;

  do {
    id = Math.round(Math.random() * maxId);
    centroid = this.dataset[id];
  } while (this.centroids.indexOf(centroid) >= 0);

  return centroid;
};

/**
 * Assign points to clusters
 *
 * @returns {boolean}
 */
KMEANS.prototype.assign = function() {
  var change = false;
  var len = this.dataset.length;
  var closestCentroid;

  for (var i = 0; i < len; i++) {
    closestCentroid = this.argmin(this.dataset[i], this.centroids, this.distance);

    if (closestCentroid != this.assignments[i]) {
      this.assignments[i] = closestCentroid;
      change = true;
    }
  }

  return change;
};

/**
 * Extract information about clusters
 *
 * @returns {undefined}
 */
KMEANS.prototype.getClusters = function() {
  var clusters = new Array(this.k);
  var centroidId;

  for (var pointId = 0; pointId < this.assignments.length; pointId++) {
    centroidId = this.assignments[pointId];

    // init empty cluster
    if (typeof clusters[centroidId] === 'undefined') {
      clusters[centroidId] = [];
    }

    clusters[centroidId].push(pointId);
  }

  return clusters;
};

// utils

/**
 * @params {Array} point
 * @params {Array.<Array>} set
 * @params {Function} f
 * @returns {number}
 */
KMEANS.prototype.argmin = function(point, set, f) {
  var min = Number.MAX_VALUE;
  var arg = 0;
  var len = set.length;
  var d;

  for (var i = 0; i < len; i++) {
    d = f(point, set[i]);
    if (d < min) {
      min = d;
      arg = i;
    }
  }

  return arg;
};

/**
 * Euclidean distance
 *
 * @params {number} p
 * @params {number} q
 * @returns {number}
 */
KMEANS.prototype.distance = function(p, q) {
  var sum = 0;
  var i = Math.min(p.length, q.length);

  while (i--) {
    var diff = p[i] - q[i];
    sum += diff * diff;
  }

  return Math.sqrt(sum);
};

if (module.exports) {
  module.exports = KMEANS;
}
}(KMEANS));

var OPTICS = {exports: {}};

var PriorityQueue = {exports: {}};

/**
 * PriorityQueue
 * Elements in this queue are sorted according to their value
 *
 * @author Lukasz Krawczyk <contact@lukaszkrawczyk.eu>
 * @copyright MIT
 */

(function (module) {
/**
 * PriorityQueue class construcotr
 * @constructor
 *
 * @example
 * queue: [1,2,3,4]
 * priorities: [4,1,2,3]
 * > result = [1,4,2,3]
 *
 * @param {Array} elements
 * @param {Array} priorities
 * @param {string} sorting - asc / desc
 * @returns {PriorityQueue}
 */
function PriorityQueue(elements, priorities, sorting) {
  /** @type {Array} */
  this._queue = [];
  /** @type {Array} */
  this._priorities = [];
  /** @type {string} */
  this._sorting = 'desc';

  this._init(elements, priorities, sorting);
}
/**
 * Insert element
 *
 * @param {Object} ele
 * @param {Object} priority
 * @returns {undefined}
 * @access public
 */
PriorityQueue.prototype.insert = function(ele, priority) {
  var indexToInsert = this._queue.length;
  var index = indexToInsert;

  while (index--) {
    var priority2 = this._priorities[index];
    if (this._sorting === 'desc') {
      if (priority > priority2) {
        indexToInsert = index;
      }
    } else {
      if (priority < priority2) {
        indexToInsert = index;
      }
    }
  }

  this._insertAt(ele, priority, indexToInsert);
};

/**
 * Remove element
 *
 * @param {Object} ele
 * @returns {undefined}
 * @access public
 */
PriorityQueue.prototype.remove = function(ele) {
  var index = this._queue.length;

  while (index--) {
    var ele2 = this._queue[index];
    if (ele === ele2) {
      this._queue.splice(index, 1);
      this._priorities.splice(index, 1);
      break;
    }
  }
};

/**
 * For each loop wrapper
 *
 * @param {function} func
 * @returs {undefined}
 * @access public
 */
PriorityQueue.prototype.forEach = function(func) {
  this._queue.forEach(func);
};

/**
 * @returns {Array}
 * @access public
 */
PriorityQueue.prototype.getElements = function() {
  return this._queue;
};

/**
 * @param {number} index
 * @returns {Object}
 * @access public
 */
PriorityQueue.prototype.getElementPriority = function(index) {
  return this._priorities[index];
};

/**
 * @returns {Array}
 * @access public
 */
PriorityQueue.prototype.getPriorities = function() {
  return this._priorities;
};

/**
 * @returns {Array}
 * @access public
 */
PriorityQueue.prototype.getElementsWithPriorities = function() {
  var result = [];

  for (var i = 0, l = this._queue.length; i < l; i++) {
    result.push([this._queue[i], this._priorities[i]]);
  }

  return result;
};

/**
 * Set object properties
 *
 * @param {Array} elements
 * @param {Array} priorities
 * @returns {undefined}
 * @access protected
 */
PriorityQueue.prototype._init = function(elements, priorities, sorting) {

  if (elements && priorities) {
    this._queue = [];
    this._priorities = [];

    if (elements.length !== priorities.length) {
      throw new Error('Arrays must have the same length');
    }

    for (var i = 0; i < elements.length; i++) {
      this.insert(elements[i], priorities[i]);
    }
  }

  if (sorting) {
    this._sorting = sorting;
  }
};

/**
 * Insert element at given position
 *
 * @param {Object} ele
 * @param {number} index
 * @returns {undefined}
 * @access protected
 */
PriorityQueue.prototype._insertAt = function(ele, priority, index) {
  if (this._queue.length === index) {
    this._queue.push(ele);
    this._priorities.push(priority);
  } else {
    this._queue.splice(index, 0, ele);
    this._priorities.splice(index, 0, priority);
  }
};

if (module.exports) {
  module.exports = PriorityQueue;
}
}(PriorityQueue));

(function (module) {
/**
 * @requires ./PriorityQueue.js
 */

if (module.exports) {
      var PriorityQueue$1 = PriorityQueue.exports;
}

/**
 * OPTICS - Ordering points to identify the clustering structure
 *
 * @author Lukasz Krawczyk <contact@lukaszkrawczyk.eu>
 * @copyright MIT
 */

/**
 * OPTICS class constructor
 * @constructor
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distanceFunction
 * @returns {OPTICS}
 */
function OPTICS(dataset, epsilon, minPts, distanceFunction) {
  /** @type {number} */
  this.epsilon = 1;
  /** @type {number} */
  this.minPts = 1;
  /** @type {function} */
  this.distance = this._euclideanDistance;

  // temporary variables used during computation

  /** @type {Array} */
  this._reachability = [];
  /** @type {Array} */
  this._processed = [];
  /** @type {number} */
  this._coreDistance = 0;
  /** @type {Array} */
  this._orderedList = [];

  this._init(dataset, epsilon, minPts, distanceFunction);
}

/******************************************************************************/
// pulic functions

/**
 * Start clustering
 *
 * @param {Array} dataset
 * @returns {undefined}
 * @access public
 */
OPTICS.prototype.run = function(dataset, epsilon, minPts, distanceFunction) {
  this._init(dataset, epsilon, minPts, distanceFunction);

  for (var pointId = 0, l = this.dataset.length; pointId < l; pointId++) {
    if (this._processed[pointId] !== 1) {
      this._processed[pointId] = 1;
      this.clusters.push([pointId]);
      var clusterId = this.clusters.length - 1;

      this._orderedList.push(pointId);
      var priorityQueue = new PriorityQueue$1(null, null, 'asc');
      var neighbors = this._regionQuery(pointId);

      // using priority queue assign elements to new cluster
      if (this._distanceToCore(pointId) !== undefined) {
        this._updateQueue(pointId, neighbors, priorityQueue);
        this._expandCluster(clusterId, priorityQueue);
      }
    }
  }

  return this.clusters;
};

/**
 * Generate reachability plot for all points
 *
 * @returns {array}
 * @access public
 */
OPTICS.prototype.getReachabilityPlot = function() {
  var reachabilityPlot = [];

  for (var i = 0, l = this._orderedList.length; i < l; i++) {
    var pointId = this._orderedList[i];
    var distance = this._reachability[pointId];

    reachabilityPlot.push([pointId, distance]);
  }

  return reachabilityPlot;
};

/******************************************************************************/
// protected functions

/**
 * Set object properties
 *
 * @param {Array} dataset
 * @param {number} epsilon
 * @param {number} minPts
 * @param {function} distance
 * @returns {undefined}
 * @access protected
 */
OPTICS.prototype._init = function(dataset, epsilon, minPts, distance) {

  if (dataset) {

    if (!(dataset instanceof Array)) {
      throw Error('Dataset must be of type array, ' +
        typeof dataset + ' given');
    }

    this.dataset = dataset;
    this.clusters = [];
    this._reachability = new Array(this.dataset.length);
    this._processed = new Array(this.dataset.length);
    this._coreDistance = 0;
    this._orderedList = [];
  }

  if (epsilon) {
    this.epsilon = epsilon;
  }

  if (minPts) {
    this.minPts = minPts;
  }

  if (distance) {
    this.distance = distance;
  }
};

/**
 * Update information in queue
 *
 * @param {number} pointId
 * @param {Array} neighbors
 * @param {PriorityQueue} queue
 * @returns {undefined}
 * @access protected
 */
OPTICS.prototype._updateQueue = function(pointId, neighbors, queue) {
  var self = this;

  this._coreDistance = this._distanceToCore(pointId);
  neighbors.forEach(function(pointId2) {
    if (self._processed[pointId2] === undefined) {
      var dist = self.distance(self.dataset[pointId], self.dataset[pointId2]);
      var newReachableDistance = Math.max(self._coreDistance, dist);

      if (self._reachability[pointId2] === undefined) {
        self._reachability[pointId2] = newReachableDistance;
        queue.insert(pointId2, newReachableDistance);
      } else {
        if (newReachableDistance < self._reachability[pointId2]) {
          self._reachability[pointId2] = newReachableDistance;
          queue.remove(pointId2);
          queue.insert(pointId2, newReachableDistance);
        }
      }
    }
  });
};

/**
 * Expand cluster
 *
 * @param {number} clusterId
 * @param {PriorityQueue} queue
 * @returns {undefined}
 * @access protected
 */
OPTICS.prototype._expandCluster = function(clusterId, queue) {
  var queueElements = queue.getElements();

  for (var p = 0, l = queueElements.length; p < l; p++) {
    var pointId = queueElements[p];
    if (this._processed[pointId] === undefined) {
      var neighbors = this._regionQuery(pointId);
      this._processed[pointId] = 1;

      this.clusters[clusterId].push(pointId);
      this._orderedList.push(pointId);

      if (this._distanceToCore(pointId) !== undefined) {
        this._updateQueue(pointId, neighbors, queue);
        this._expandCluster(clusterId, queue);
      }
    }
  }
};

/**
 * Calculating distance to cluster core
 *
 * @param {number} pointId
 * @returns {number}
 * @access protected
 */
OPTICS.prototype._distanceToCore = function(pointId) {
  var l = this.epsilon;
  for (var coreDistCand = 0; coreDistCand < l; coreDistCand++) {
    var neighbors = this._regionQuery(pointId, coreDistCand);
    if (neighbors.length >= this.minPts) {
      return coreDistCand;
    }
  }

  return;
};

/**
 * Find all neighbors around given point
 *
 * @param {number} pointId
 * @param {number} epsilon
 * @returns {Array}
 * @access protected
 */
OPTICS.prototype._regionQuery = function(pointId, epsilon) {
  epsilon = epsilon || this.epsilon;
  var neighbors = [];

  for (var id = 0, l = this.dataset.length; id < l; id++) {
    if (this.distance(this.dataset[pointId], this.dataset[id]) < epsilon) {
      neighbors.push(id);
    }
  }

  return neighbors;
};

/******************************************************************************/
// helpers

/**
 * Calculate euclidean distance in multidimensional space
 *
 * @param {Array} p
 * @param {Array} q
 * @returns {number}
 * @access protected
 */
OPTICS.prototype._euclideanDistance = function(p, q) {
  var sum = 0;
  var i = Math.min(p.length, q.length);

  while (i--) {
    sum += (p[i] - q[i]) * (p[i] - q[i]);
  }

  return Math.sqrt(sum);
};

if (module.exports) {
  module.exports = OPTICS;
}
}(OPTICS));

(function (module) {
if (module.exports) {
    module.exports = {
      DBSCAN: DBSCAN.exports,
      KMEANS: KMEANS.exports,
      OPTICS: OPTICS.exports,
      PriorityQueue: PriorityQueue.exports
    };
}
}(lib));

var clustering = lib.exports;

/**
 * Takes a set of {@link Point|points} and partition them into clusters according to {@link DBSCAN's|https://en.wikipedia.org/wiki/DBSCAN} data clustering algorithm.
 *
 * @name clustersDbscan
 * @param {FeatureCollection<Point>} points to be clustered
 * @param {number} maxDistance Maximum Distance between any point of the cluster to generate the clusters (kilometers only)
 * @param {Object} [options={}] Optional parameters
 * @param {string} [options.units="kilometers"] in which `maxDistance` is expressed, can be degrees, radians, miles, or kilometers
 * @param {boolean} [options.mutate=false] Allows GeoJSON input to be mutated
 * @param {number} [options.minPoints=3] Minimum number of points to generate a single cluster,
 * points which do not meet this requirement will be classified as an 'edge' or 'noise'.
 * @returns {FeatureCollection<Point>} Clustered Points with an additional two properties associated to each Feature:
 * - {number} cluster - the associated clusterId
 * - {string} dbscan - type of point it has been classified as ('core'|'edge'|'noise')
 * @example
 * // create random points with random z-values in their properties
 * var points = turf.randomPoint(100, {bbox: [0, 30, 20, 50]});
 * var maxDistance = 100;
 * var clustered = turf.clustersDbscan(points, maxDistance);
 *
 * //addToMap
 * var addToMap = [clustered];
 */
function clustersDbscan(points, maxDistance, options) {
    // Input validation being handled by Typescript
    // collectionOf(points, 'Point', 'points must consist of a FeatureCollection of only Points');
    // if (maxDistance === null || maxDistance === undefined) throw new Error('maxDistance is required');
    // if (!(Math.sign(maxDistance) > 0)) throw new Error('maxDistance is invalid');
    // if (!(minPoints === undefined || minPoints === null || Math.sign(minPoints) > 0)) throw new Error('options.minPoints is invalid');
    if (options === void 0) { options = {}; }
    // Clone points to prevent any mutations
    if (options.mutate !== true)
        points = clone(points);
    // Defaults
    options.minPoints = options.minPoints || 3;
    // create clustered ids
    var dbscan = new clustering.DBSCAN();
    var clusteredIds = dbscan.run(coordAll(points), convertLength(maxDistance, options.units), options.minPoints, distance);
    // Tag points to Clusters ID
    var clusterId = -1;
    clusteredIds.forEach(function (clusterIds) {
        clusterId++;
        // assign cluster ids to input points
        clusterIds.forEach(function (idx) {
            var clusterPoint = points.features[idx];
            if (!clusterPoint.properties)
                clusterPoint.properties = {};
            clusterPoint.properties.cluster = clusterId;
            clusterPoint.properties.dbscan = "core";
        });
    });
    // handle noise points, if any
    // edges points are tagged by DBSCAN as both 'noise' and 'cluster' as they can "reach" less than 'minPoints' number of points
    dbscan.noise.forEach(function (noiseId) {
        var noisePoint = points.features[noiseId];
        if (!noisePoint.properties)
            noisePoint.properties = {};
        if (noisePoint.properties.cluster)
            noisePoint.properties.dbscan = "edge";
        else
            noisePoint.properties.dbscan = "noise";
    });
    return points;
}

var supercluster = {exports: {}};

(function (module, exports) {
(function (global, factory) {
module.exports = factory() ;
})(commonjsGlobal, (function () {
function sortKD(ids, coords, nodeSize, left, right, depth) {
    if (right - left <= nodeSize) { return; }

    var m = (left + right) >> 1;

    select(ids, coords, m, left, right, depth % 2);

    sortKD(ids, coords, nodeSize, left, m - 1, depth + 1);
    sortKD(ids, coords, nodeSize, m + 1, right, depth + 1);
}

function select(ids, coords, k, left, right, inc) {

    while (right > left) {
        if (right - left > 600) {
            var n = right - left + 1;
            var m = k - left + 1;
            var z = Math.log(n);
            var s = 0.5 * Math.exp(2 * z / 3);
            var sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            var newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            var newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            select(ids, coords, k, newLeft, newRight, inc);
        }

        var t = coords[2 * k + inc];
        var i = left;
        var j = right;

        swapItem(ids, coords, left, k);
        if (coords[2 * right + inc] > t) { swapItem(ids, coords, left, right); }

        while (i < j) {
            swapItem(ids, coords, i, j);
            i++;
            j--;
            while (coords[2 * i + inc] < t) { i++; }
            while (coords[2 * j + inc] > t) { j--; }
        }

        if (coords[2 * left + inc] === t) { swapItem(ids, coords, left, j); }
        else {
            j++;
            swapItem(ids, coords, j, right);
        }

        if (j <= k) { left = j + 1; }
        if (k <= j) { right = j - 1; }
    }
}

function swapItem(ids, coords, i, j) {
    swap(ids, i, j);
    swap(coords, 2 * i, 2 * j);
    swap(coords, 2 * i + 1, 2 * j + 1);
}

function swap(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function range(ids, coords, minX, minY, maxX, maxY, nodeSize) {
    var stack = [0, ids.length - 1, 0];
    var result = [];
    var x, y;

    while (stack.length) {
        var axis = stack.pop();
        var right = stack.pop();
        var left = stack.pop();

        if (right - left <= nodeSize) {
            for (var i = left; i <= right; i++) {
                x = coords[2 * i];
                y = coords[2 * i + 1];
                if (x >= minX && x <= maxX && y >= minY && y <= maxY) { result.push(ids[i]); }
            }
            continue;
        }

        var m = Math.floor((left + right) / 2);

        x = coords[2 * m];
        y = coords[2 * m + 1];

        if (x >= minX && x <= maxX && y >= minY && y <= maxY) { result.push(ids[m]); }

        var nextAxis = (axis + 1) % 2;

        if (axis === 0 ? minX <= x : minY <= y) {
            stack.push(left);
            stack.push(m - 1);
            stack.push(nextAxis);
        }
        if (axis === 0 ? maxX >= x : maxY >= y) {
            stack.push(m + 1);
            stack.push(right);
            stack.push(nextAxis);
        }
    }

    return result;
}

function within(ids, coords, qx, qy, r, nodeSize) {
    var stack = [0, ids.length - 1, 0];
    var result = [];
    var r2 = r * r;

    while (stack.length) {
        var axis = stack.pop();
        var right = stack.pop();
        var left = stack.pop();

        if (right - left <= nodeSize) {
            for (var i = left; i <= right; i++) {
                if (sqDist(coords[2 * i], coords[2 * i + 1], qx, qy) <= r2) { result.push(ids[i]); }
            }
            continue;
        }

        var m = Math.floor((left + right) / 2);

        var x = coords[2 * m];
        var y = coords[2 * m + 1];

        if (sqDist(x, y, qx, qy) <= r2) { result.push(ids[m]); }

        var nextAxis = (axis + 1) % 2;

        if (axis === 0 ? qx - r <= x : qy - r <= y) {
            stack.push(left);
            stack.push(m - 1);
            stack.push(nextAxis);
        }
        if (axis === 0 ? qx + r >= x : qy + r >= y) {
            stack.push(m + 1);
            stack.push(right);
            stack.push(nextAxis);
        }
    }

    return result;
}

function sqDist(ax, ay, bx, by) {
    var dx = ax - bx;
    var dy = ay - by;
    return dx * dx + dy * dy;
}

var defaultGetX = function (p) { return p[0]; };
var defaultGetY = function (p) { return p[1]; };

var KDBush = function KDBush(points, getX, getY, nodeSize, ArrayType) {
    if ( getX === void 0 ) getX = defaultGetX;
    if ( getY === void 0 ) getY = defaultGetY;
    if ( nodeSize === void 0 ) nodeSize = 64;
    if ( ArrayType === void 0 ) ArrayType = Float64Array;

    this.nodeSize = nodeSize;
    this.points = points;

    var IndexArrayType = points.length < 65536 ? Uint16Array : Uint32Array;

    var ids = this.ids = new IndexArrayType(points.length);
    var coords = this.coords = new ArrayType(points.length * 2);

    for (var i = 0; i < points.length; i++) {
        ids[i] = i;
        coords[2 * i] = getX(points[i]);
        coords[2 * i + 1] = getY(points[i]);
    }

    sortKD(ids, coords, nodeSize, 0, ids.length - 1, 0);
};

KDBush.prototype.range = function range$1 (minX, minY, maxX, maxY) {
    return range(this.ids, this.coords, minX, minY, maxX, maxY, this.nodeSize);
};

KDBush.prototype.within = function within$1 (x, y, r) {
    return within(this.ids, this.coords, x, y, r, this.nodeSize);
};

var defaultOptions = {
    minZoom: 0,   // min zoom to generate clusters on
    maxZoom: 16,  // max zoom level to cluster the points on
    minPoints: 2, // minimum points to form a cluster
    radius: 40,   // cluster radius in pixels
    extent: 512,  // tile extent (radius is calculated relative to it)
    nodeSize: 64, // size of the KD-tree leaf node, affects performance
    log: false,   // whether to log timing info

    // whether to generate numeric ids for input features (in vector tiles)
    generateId: false,

    // a reduce function for calculating custom cluster properties
    reduce: null, // (accumulated, props) => { accumulated.sum += props.sum; }

    // properties to use for individual points when running the reducer
    map: function (props) { return props; } // props => ({sum: props.my_value})
};

var fround = Math.fround || (function (tmp) { return (function (x) { tmp[0] = +x; return tmp[0]; }); })(new Float32Array(1));

var Supercluster = function Supercluster(options) {
    this.options = extend(Object.create(defaultOptions), options);
    this.trees = new Array(this.options.maxZoom + 1);
};

Supercluster.prototype.load = function load (points) {
    var ref = this.options;
        var log = ref.log;
        var minZoom = ref.minZoom;
        var maxZoom = ref.maxZoom;
        var nodeSize = ref.nodeSize;

    if (log) { console.time('total time'); }

    var timerId = "prepare " + (points.length) + " points";
    if (log) { console.time(timerId); }

    this.points = points;

    // generate a cluster object for each point and index input points into a KD-tree
    var clusters = [];
    for (var i = 0; i < points.length; i++) {
        if (!points[i].geometry) { continue; }
        clusters.push(createPointCluster(points[i], i));
    }
    this.trees[maxZoom + 1] = new KDBush(clusters, getX, getY, nodeSize, Float32Array);

    if (log) { console.timeEnd(timerId); }

    // cluster points on max zoom, then cluster the results on previous zoom, etc.;
    // results in a cluster hierarchy across zoom levels
    for (var z = maxZoom; z >= minZoom; z--) {
        var now = +Date.now();

        // create a new set of clusters for the zoom and index them with a KD-tree
        clusters = this._cluster(clusters, z);
        this.trees[z] = new KDBush(clusters, getX, getY, nodeSize, Float32Array);

        if (log) { console.log('z%d: %d clusters in %dms', z, clusters.length, +Date.now() - now); }
    }

    if (log) { console.timeEnd('total time'); }

    return this;
};

Supercluster.prototype.getClusters = function getClusters (bbox, zoom) {
    var minLng = ((bbox[0] + 180) % 360 + 360) % 360 - 180;
    var minLat = Math.max(-90, Math.min(90, bbox[1]));
    var maxLng = bbox[2] === 180 ? 180 : ((bbox[2] + 180) % 360 + 360) % 360 - 180;
    var maxLat = Math.max(-90, Math.min(90, bbox[3]));

    if (bbox[2] - bbox[0] >= 360) {
        minLng = -180;
        maxLng = 180;
    } else if (minLng > maxLng) {
        var easternHem = this.getClusters([minLng, minLat, 180, maxLat], zoom);
        var westernHem = this.getClusters([-180, minLat, maxLng, maxLat], zoom);
        return easternHem.concat(westernHem);
    }

    var tree = this.trees[this._limitZoom(zoom)];
    var ids = tree.range(lngX(minLng), latY(maxLat), lngX(maxLng), latY(minLat));
    var clusters = [];
    for (var i = 0, list = ids; i < list.length; i += 1) {
        var id = list[i];

            var c = tree.points[id];
        clusters.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
    }
    return clusters;
};

Supercluster.prototype.getChildren = function getChildren (clusterId) {
    var originId = this._getOriginId(clusterId);
    var originZoom = this._getOriginZoom(clusterId);
    var errorMsg = 'No cluster with the specified id.';

    var index = this.trees[originZoom];
    if (!index) { throw new Error(errorMsg); }

    var origin = index.points[originId];
    if (!origin) { throw new Error(errorMsg); }

    var r = this.options.radius / (this.options.extent * Math.pow(2, originZoom - 1));
    var ids = index.within(origin.x, origin.y, r);
    var children = [];
    for (var i = 0, list = ids; i < list.length; i += 1) {
        var id = list[i];

            var c = index.points[id];
        if (c.parentId === clusterId) {
            children.push(c.numPoints ? getClusterJSON(c) : this.points[c.index]);
        }
    }

    if (children.length === 0) { throw new Error(errorMsg); }

    return children;
};

Supercluster.prototype.getLeaves = function getLeaves (clusterId, limit, offset) {
    limit = limit || 10;
    offset = offset || 0;

    var leaves = [];
    this._appendLeaves(leaves, clusterId, limit, offset, 0);

    return leaves;
};

Supercluster.prototype.getTile = function getTile (z, x, y) {
    var tree = this.trees[this._limitZoom(z)];
    var z2 = Math.pow(2, z);
    var ref = this.options;
        var extent = ref.extent;
        var radius = ref.radius;
    var p = radius / extent;
    var top = (y - p) / z2;
    var bottom = (y + 1 + p) / z2;

    var tile = {
        features: []
    };

    this._addTileFeatures(
        tree.range((x - p) / z2, top, (x + 1 + p) / z2, bottom),
        tree.points, x, y, z2, tile);

    if (x === 0) {
        this._addTileFeatures(
            tree.range(1 - p / z2, top, 1, bottom),
            tree.points, z2, y, z2, tile);
    }
    if (x === z2 - 1) {
        this._addTileFeatures(
            tree.range(0, top, p / z2, bottom),
            tree.points, -1, y, z2, tile);
    }

    return tile.features.length ? tile : null;
};

Supercluster.prototype.getClusterExpansionZoom = function getClusterExpansionZoom (clusterId) {
    var expansionZoom = this._getOriginZoom(clusterId) - 1;
    while (expansionZoom <= this.options.maxZoom) {
        var children = this.getChildren(clusterId);
        expansionZoom++;
        if (children.length !== 1) { break; }
        clusterId = children[0].properties.cluster_id;
    }
    return expansionZoom;
};

Supercluster.prototype._appendLeaves = function _appendLeaves (result, clusterId, limit, offset, skipped) {
    var children = this.getChildren(clusterId);

    for (var i = 0, list = children; i < list.length; i += 1) {
        var child = list[i];

            var props = child.properties;

        if (props && props.cluster) {
            if (skipped + props.point_count <= offset) {
                // skip the whole cluster
                skipped += props.point_count;
            } else {
                // enter the cluster
                skipped = this._appendLeaves(result, props.cluster_id, limit, offset, skipped);
                // exit the cluster
            }
        } else if (skipped < offset) {
            // skip a single point
            skipped++;
        } else {
            // add a single point
            result.push(child);
        }
        if (result.length === limit) { break; }
    }

    return skipped;
};

Supercluster.prototype._addTileFeatures = function _addTileFeatures (ids, points, x, y, z2, tile) {
    for (var i$1 = 0, list = ids; i$1 < list.length; i$1 += 1) {
        var i = list[i$1];

            var c = points[i];
        var isCluster = c.numPoints;

        var tags = (void 0), px = (void 0), py = (void 0);
        if (isCluster) {
            tags = getClusterProperties(c);
            px = c.x;
            py = c.y;
        } else {
            var p = this.points[c.index];
            tags = p.properties;
            px = lngX(p.geometry.coordinates[0]);
            py = latY(p.geometry.coordinates[1]);
        }

        var f = {
            type: 1,
            geometry: [[
                Math.round(this.options.extent * (px * z2 - x)),
                Math.round(this.options.extent * (py * z2 - y))
            ]],
            tags: tags
        };

        // assign id
        var id = (void 0);
        if (isCluster) {
            id = c.id;
        } else if (this.options.generateId) {
            // optionally generate id
            id = c.index;
        } else if (this.points[c.index].id) {
            // keep id if already assigned
            id = this.points[c.index].id;
        }

        if (id !== undefined) { f.id = id; }

        tile.features.push(f);
    }
};

Supercluster.prototype._limitZoom = function _limitZoom (z) {
    return Math.max(this.options.minZoom, Math.min(+z, this.options.maxZoom + 1));
};

Supercluster.prototype._cluster = function _cluster (points, zoom) {
    var clusters = [];
    var ref = this.options;
        var radius = ref.radius;
        var extent = ref.extent;
        var reduce = ref.reduce;
        var minPoints = ref.minPoints;
    var r = radius / (extent * Math.pow(2, zoom));

    // loop through each point
    for (var i = 0; i < points.length; i++) {
        var p = points[i];
        // if we've already visited the point at this zoom level, skip it
        if (p.zoom <= zoom) { continue; }
        p.zoom = zoom;

        // find all nearby points
        var tree = this.trees[zoom + 1];
        var neighborIds = tree.within(p.x, p.y, r);

        var numPointsOrigin = p.numPoints || 1;
        var numPoints = numPointsOrigin;

        // count the number of points in a potential cluster
        for (var i$1 = 0, list = neighborIds; i$1 < list.length; i$1 += 1) {
            var neighborId = list[i$1];

                var b = tree.points[neighborId];
            // filter out neighbors that are already processed
            if (b.zoom > zoom) { numPoints += b.numPoints || 1; }
        }

        // if there were neighbors to merge, and there are enough points to form a cluster
        if (numPoints > numPointsOrigin && numPoints >= minPoints) {
            var wx = p.x * numPointsOrigin;
            var wy = p.y * numPointsOrigin;

            var clusterProperties = reduce && numPointsOrigin > 1 ? this._map(p, true) : null;

            // encode both zoom and point index on which the cluster originated -- offset by total length of features
            var id = (i << 5) + (zoom + 1) + this.points.length;

            for (var i$2 = 0, list$1 = neighborIds; i$2 < list$1.length; i$2 += 1) {
                var neighborId$1 = list$1[i$2];

                    var b$1 = tree.points[neighborId$1];

                if (b$1.zoom <= zoom) { continue; }
                b$1.zoom = zoom; // save the zoom (so it doesn't get processed twice)

                var numPoints2 = b$1.numPoints || 1;
                wx += b$1.x * numPoints2; // accumulate coordinates for calculating weighted center
                wy += b$1.y * numPoints2;

                b$1.parentId = id;

                if (reduce) {
                    if (!clusterProperties) { clusterProperties = this._map(p, true); }
                    reduce(clusterProperties, this._map(b$1));
                }
            }

            p.parentId = id;
            clusters.push(createCluster(wx / numPoints, wy / numPoints, id, numPoints, clusterProperties));

        } else { // left points as unclustered
            clusters.push(p);

            if (numPoints > 1) {
                for (var i$3 = 0, list$2 = neighborIds; i$3 < list$2.length; i$3 += 1) {
                    var neighborId$2 = list$2[i$3];

                        var b$2 = tree.points[neighborId$2];
                    if (b$2.zoom <= zoom) { continue; }
                    b$2.zoom = zoom;
                    clusters.push(b$2);
                }
            }
        }
    }

    return clusters;
};

// get index of the point from which the cluster originated
Supercluster.prototype._getOriginId = function _getOriginId (clusterId) {
    return (clusterId - this.points.length) >> 5;
};

// get zoom of the point from which the cluster originated
Supercluster.prototype._getOriginZoom = function _getOriginZoom (clusterId) {
    return (clusterId - this.points.length) % 32;
};

Supercluster.prototype._map = function _map (point, clone) {
    if (point.numPoints) {
        return clone ? extend({}, point.properties) : point.properties;
    }
    var original = this.points[point.index].properties;
    var result = this.options.map(original);
    return clone && result === original ? extend({}, result) : result;
};

function createCluster(x, y, id, numPoints, properties) {
    return {
        x: fround(x), // weighted cluster center; round for consistency with Float32Array index
        y: fround(y),
        zoom: Infinity, // the last zoom the cluster was processed at
        id: id, // encodes index of the first child of the cluster and its zoom level
        parentId: -1, // parent cluster id
        numPoints: numPoints,
        properties: properties
    };
}

function createPointCluster(p, id) {
    var ref = p.geometry.coordinates;
    var x = ref[0];
    var y = ref[1];
    return {
        x: fround(lngX(x)), // projected point coordinates
        y: fround(latY(y)),
        zoom: Infinity, // the last zoom the point was processed at
        index: id, // index of the source feature in the original input array,
        parentId: -1 // parent cluster id
    };
}

function getClusterJSON(cluster) {
    return {
        type: 'Feature',
        id: cluster.id,
        properties: getClusterProperties(cluster),
        geometry: {
            type: 'Point',
            coordinates: [xLng(cluster.x), yLat(cluster.y)]
        }
    };
}

function getClusterProperties(cluster) {
    var count = cluster.numPoints;
    var abbrev =
        count >= 10000 ? ((Math.round(count / 1000)) + "k") :
        count >= 1000 ? ((Math.round(count / 100) / 10) + "k") : count;
    return extend(extend({}, cluster.properties), {
        cluster: true,
        cluster_id: cluster.id,
        point_count: count,
        point_count_abbreviated: abbrev
    });
}

// longitude/latitude to spherical mercator in [0..1] range
function lngX(lng) {
    return lng / 360 + 0.5;
}
function latY(lat) {
    var sin = Math.sin(lat * Math.PI / 180);
    var y = (0.5 - 0.25 * Math.log((1 + sin) / (1 - sin)) / Math.PI);
    return y < 0 ? 0 : y > 1 ? 1 : y;
}

// spherical mercator to longitude/latitude
function xLng(x) {
    return (x - 0.5) * 360;
}
function yLat(y) {
    var y2 = (180 - y * 360) * Math.PI / 180;
    return 360 * Math.atan(Math.exp(y2)) / Math.PI - 90;
}

function extend(dest, src) {
    for (var id in src) { dest[id] = src[id]; }
    return dest;
}

function getX(p) {
    return p.x;
}
function getY(p) {
    return p.y;
}

return Supercluster;

}));
}(supercluster));

var SuperCluster = supercluster.exports;

var es6 = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }


    if ((a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      for (i of a.entries())
        if (!equal(i[1], b.get(i[0]))) return false;
      return true;
    }

    if ((a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      for (i of a.entries())
        if (!b.has(i[0])) return false;
      return true;
    }

    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }


    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a!==a && b!==b;
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Cluster {
    constructor({ markers, position }) {
        this.markers = markers;
        if (position) {
            if (position instanceof google.maps.LatLng) {
                this._position = position;
            }
            else {
                this._position = new google.maps.LatLng(position);
            }
        }
    }
    get bounds() {
        if (this.markers.length === 0 && !this._position) {
            return undefined;
        }
        return this.markers.reduce((bounds, marker) => {
            return bounds.extend(marker.getPosition());
        }, new google.maps.LatLngBounds(this._position, this._position));
    }
    get position() {
        return this._position || this.bounds.getCenter();
    }
    /**
     * Get the count of **visible** markers.
     */
    get count() {
        return this.markers.filter((m) => m.getVisible())
            .length;
    }
    /**
     * Add a marker to the cluster.
     */
    push(marker) {
        this.markers.push(marker);
    }
    /**
     * Cleanup references and remove marker from map.
     */
    delete() {
        if (this.marker) {
            this.marker.setMap(null);
            delete this.marker;
        }
        this.markers.length = 0;
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const filterMarkersToPaddedViewport = (map, mapCanvasProjection, markers, viewportPadding) => {
    const extendedMapBounds = extendBoundsToPaddedViewport(map.getBounds(), mapCanvasProjection, viewportPadding);
    return markers.filter((marker) => extendedMapBounds.contains(marker.getPosition()));
};
/**
 * Extends a bounds by a number of pixels in each direction.
 */
const extendBoundsToPaddedViewport = (bounds, projection, pixels) => {
    const { northEast, southWest } = latLngBoundsToPixelBounds(bounds, projection);
    const extendedPixelBounds = extendPixelBounds({ northEast, southWest }, pixels);
    return pixelBoundsToLatLngBounds(extendedPixelBounds, projection);
};
/**
 * @hidden
 */
const distanceBetweenPoints = (p1, p2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((p2.lat - p1.lat) * Math.PI) / 180;
    const dLon = ((p2.lng - p1.lng) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((p1.lat * Math.PI) / 180) *
            Math.cos((p2.lat * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
/**
 * @hidden
 */
const latLngBoundsToPixelBounds = (bounds, projection) => {
    return {
        northEast: projection.fromLatLngToDivPixel(bounds.getNorthEast()),
        southWest: projection.fromLatLngToDivPixel(bounds.getSouthWest()),
    };
};
/**
 * @hidden
 */
const extendPixelBounds = ({ northEast, southWest }, pixels) => {
    northEast.x += pixels;
    northEast.y -= pixels;
    southWest.x -= pixels;
    southWest.y += pixels;
    return { northEast, southWest };
};
/**
 * @hidden
 */
const pixelBoundsToLatLngBounds = ({ northEast, southWest }, projection) => {
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(projection.fromDivPixelToLatLng(northEast));
    bounds.extend(projection.fromDivPixelToLatLng(southWest));
    return bounds;
};

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @hidden
 */
class AbstractAlgorithm {
    constructor({ maxZoom = 16 }) {
        this.maxZoom = maxZoom;
    }
    /**
     * Helper function to bypass clustering based upon some map state such as
     * zoom, number of markers, etc.
     *
     * ```typescript
     *  cluster({markers, map}: AlgorithmInput): Cluster[] {
     *    if (shouldBypassClustering(map)) {
     *      return this.noop({markers, map})
     *    }
     * }
     * ```
     */
    noop({ markers }) {
        return noop$1(markers);
    }
}
/**
 * Abstract viewport algorithm proves a class to filter markers by a padded
 * viewport. This is a common optimization.
 *
 * @hidden
 */
class AbstractViewportAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
        var { viewportPadding = 60 } = _a, options = __rest(_a, ["viewportPadding"]);
        super(options);
        this.viewportPadding = 60;
        this.viewportPadding = viewportPadding;
    }
    calculate({ markers, map, mapCanvasProjection, }) {
        if (map.getZoom() >= this.maxZoom) {
            return {
                clusters: this.noop({
                    markers,
                    map,
                    mapCanvasProjection,
                }),
                changed: false,
            };
        }
        return {
            clusters: this.cluster({
                markers: filterMarkersToPaddedViewport(map, mapCanvasProjection, markers, this.viewportPadding),
                map,
                mapCanvasProjection,
            }),
        };
    }
}
/**
 * @hidden
 */
const noop$1 = (markers) => {
    const clusters = markers.map((marker) => new Cluster({
        position: marker.getPosition(),
        markers: [marker],
    }));
    return clusters;
};

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * The default Grid algorithm historically used in Google Maps marker
 * clustering.
 *
 * The Grid algorithm does not implement caching and markers may flash as the
 * viewport changes. Instead use {@link SuperClusterAlgorithm}.
 */
class GridAlgorithm extends AbstractViewportAlgorithm {
    constructor(_a) {
        var { maxDistance = 40000, gridSize = 40 } = _a, options = __rest(_a, ["maxDistance", "gridSize"]);
        super(options);
        this.clusters = [];
        this.maxDistance = maxDistance;
        this.gridSize = gridSize;
    }
    cluster({ markers, map, mapCanvasProjection, }) {
        this.clusters = [];
        markers.forEach((marker) => {
            this.addToClosestCluster(marker, map, mapCanvasProjection);
        });
        return this.clusters;
    }
    addToClosestCluster(marker, map, projection) {
        let maxDistance = this.maxDistance; // Some large number
        let cluster = null;
        for (let i = 0; i < this.clusters.length; i++) {
            const candidate = this.clusters[i];
            const distance = distanceBetweenPoints(candidate.bounds.getCenter().toJSON(), marker.getPosition().toJSON());
            if (distance < maxDistance) {
                maxDistance = distance;
                cluster = candidate;
            }
        }
        if (cluster &&
            extendBoundsToPaddedViewport(cluster.bounds, projection, this.gridSize).contains(marker.getPosition())) {
            cluster.push(marker);
        }
        else {
            const cluster = new Cluster({ markers: [marker] });
            this.clusters.push(cluster);
        }
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Noop algorithm does not generate any clusters or filter markers by the an extended viewport.
 */
class NoopAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
        var options = __rest(_a, []);
        super(options);
    }
    calculate({ markers, map, mapCanvasProjection, }) {
        return {
            clusters: this.cluster({ markers, map, mapCanvasProjection }),
            changed: false,
        };
    }
    cluster(input) {
        return this.noop(input);
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Experimental algorithm using Kmeans.
 *
 * The Grid algorithm does not implement caching and markers may flash as the
 * viewport changes. Instead use {@link SuperClusterAlgorithm}.
 *
 * @see https://www.npmjs.com/package/@turf/clusters-kmeans
 */
class KmeansAlgorithm extends AbstractViewportAlgorithm {
    constructor(_a) {
        var { numberOfClusters } = _a, options = __rest(_a, ["numberOfClusters"]);
        super(options);
        this.numberOfClusters = numberOfClusters;
    }
    cluster({ markers, map }) {
        const clusters = [];
        if (markers.length === 0) {
            return clusters;
        }
        const points = featureCollection(markers.map((marker) => {
            return point([marker.getPosition().lng(), marker.getPosition().lat()]);
        }));
        let numberOfClusters;
        if (this.numberOfClusters instanceof Function) {
            numberOfClusters = this.numberOfClusters(markers.length, map.getZoom());
        }
        else {
            numberOfClusters = this.numberOfClusters;
        }
        clustersKmeans(points, { numberOfClusters }).features.forEach((point, i) => {
            if (!clusters[point.properties.cluster]) {
                clusters[point.properties.cluster] = new Cluster({
                    position: {
                        lng: point.properties.centroid[0],
                        lat: point.properties.centroid[1],
                    },
                    markers: [],
                });
            }
            clusters[point.properties.cluster].push(markers[i]);
        });
        return clusters;
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_INTERNAL_DBSCAN_OPTION = {
    units: "kilometers",
    mutate: false,
    minPoints: 1,
};
/**
 *
 * **This algorithm is not yet ready for use!**
 *
 * Experimental algorithm using DBScan.
 *
 * The Grid algorithm does not implement caching and markers may flash as the
 * viewport changes. Instead use {@link SuperClusterAlgorithm}.
 *
 * @see https://www.npmjs.com/package/@turf/clusters-dbscan
 */
class DBScanAlgorithm extends AbstractViewportAlgorithm {
    constructor(_a) {
        var { maxDistance = 200, minPoints = DEFAULT_INTERNAL_DBSCAN_OPTION.minPoints } = _a, options = __rest(_a, ["maxDistance", "minPoints"]);
        super(options);
        this.maxDistance = maxDistance;
        this.options = Object.assign(Object.assign({}, DEFAULT_INTERNAL_DBSCAN_OPTION), { minPoints });
    }
    cluster({ markers, mapCanvasProjection, }) {
        const points = featureCollection(markers.map((marker) => {
            const projectedPoint = mapCanvasProjection.fromLatLngToContainerPixel(marker.getPosition());
            return point([projectedPoint.x, projectedPoint.y]);
        }));
        const grouped = [];
        clustersDbscan(points, this.maxDistance, this.options).features.forEach((point, i) => {
            if (!grouped[point.properties.cluster]) {
                grouped[point.properties.cluster] = [];
            }
            grouped[point.properties.cluster].push(markers[i]);
        });
        return grouped.map((markers) => new Cluster({ markers }));
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * A very fast JavaScript algorithm for geospatial point clustering using KD trees.
 *
 * @see https://www.npmjs.com/package/supercluster for more information on options.
 */
class SuperClusterAlgorithm extends AbstractAlgorithm {
    constructor(_a) {
        var { maxZoom, radius = 60 } = _a, options = __rest(_a, ["maxZoom", "radius"]);
        super({ maxZoom });
        this.superCluster = new SuperCluster(Object.assign({ maxZoom: this.maxZoom, radius }, options));
        this.state = { zoom: null };
    }
    calculate(input) {
        let changed = false;
        if (!es6(input.markers, this.markers)) {
            changed = true;
            // TODO use proxy to avoid copy?
            this.markers = [...input.markers];
            const points = this.markers.map((marker) => {
                return {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            marker.getPosition().lng(),
                            marker.getPosition().lat(),
                        ],
                    },
                    properties: { marker },
                };
            });
            this.superCluster.load(points);
        }
        const state = { zoom: input.map.getZoom() };
        if (!changed) {
            if (this.state.zoom > this.maxZoom && state.zoom > this.maxZoom) ;
            else {
                changed = changed || !es6(this.state, state);
            }
        }
        this.state = state;
        if (changed) {
            this.clusters = this.cluster(input);
        }
        return { clusters: this.clusters, changed };
    }
    cluster({ map }) {
        return this.superCluster
            .getClusters([-180, -90, 180, 90], map.getZoom())
            .map(this.transformCluster.bind(this));
    }
    transformCluster({ geometry: { coordinates: [lng, lat], }, properties, }) {
        if (properties.cluster) {
            return new Cluster({
                markers: this.superCluster
                    .getLeaves(properties.cluster_id, Infinity)
                    .map((leaf) => leaf.properties.marker),
                position: new google.maps.LatLng({ lat, lng }),
            });
        }
        else {
            const marker = properties.marker;
            return new Cluster({
                markers: [marker],
                position: marker.getPosition(),
            });
        }
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Provides statistics on all clusters in the current render cycle for use in {@link Renderer.render}.
 */
class ClusterStats {
    constructor(markers, clusters) {
        this.markers = { sum: markers.length };
        const clusterMarkerCounts = clusters.map((a) => a.count);
        const clusterMarkerSum = clusterMarkerCounts.reduce((a, b) => a + b, 0);
        this.clusters = {
            count: clusters.length,
            markers: {
                mean: clusterMarkerSum / clusters.length,
                sum: clusterMarkerSum,
                min: Math.min(...clusterMarkerCounts),
                max: Math.max(...clusterMarkerCounts),
            },
        };
    }
}
class DefaultRenderer {
    /**
     * The default render function for the library used by {@link MarkerClusterer}.
     *
     * Currently set to use the following:
     *
     * ```typescript
     * // change color if this cluster has more markers than the mean cluster
     * const color =
     *   count > Math.max(10, stats.clusters.markers.mean)
     *     ? "#ff0000"
     *     : "#0000ff";
     *
     * // create svg url with fill color
     * const svg = window.btoa(`
     * <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
     *   <circle cx="120" cy="120" opacity=".6" r="70" />
     *   <circle cx="120" cy="120" opacity=".3" r="90" />
     *   <circle cx="120" cy="120" opacity=".2" r="110" />
     *   <circle cx="120" cy="120" opacity=".1" r="130" />
     * </svg>`);
     *
     * // create marker using svg icon
     * return new google.maps.Marker({
     *   position,
     *   icon: {
     *     url: `data:image/svg+xml;base64,${svg}`,
     *     scaledSize: new google.maps.Size(45, 45),
     *   },
     *   label: {
     *     text: String(count),
     *     color: "rgba(255,255,255,0.9)",
     *     fontSize: "12px",
     *   },
     *   // adjust zIndex to be above other markers
     *   zIndex: 1000 + count,
     * });
     * ```
     */
    render({ count, position }, stats) {
        // change color if this cluster has more markers than the mean cluster
        const color = count > Math.max(10, stats.clusters.markers.mean) ? "#ff0000" : "#0000ff";
        // create svg url with fill color
        const svg = window.btoa(`
  <svg fill="${color}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
    <circle cx="120" cy="120" opacity=".6" r="70" />
    <circle cx="120" cy="120" opacity=".3" r="90" />
    <circle cx="120" cy="120" opacity=".2" r="110" />
  </svg>`);
        // create marker using svg icon
        return new google.maps.Marker({
            position,
            icon: {
                url: `data:image/svg+xml;base64,${svg}`,
                scaledSize: new google.maps.Size(45, 45),
            },
            label: {
                text: String(count),
                color: "rgba(255,255,255,0.9)",
                fontSize: "12px",
            },
            // adjust zIndex to be above other markers
            zIndex: Number(google.maps.Marker.MAX_ZINDEX) + count,
        });
    }
}

/**
 * Copyright 2019 Google LLC. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Extends an object's prototype by another's.
 *
 * @param type1 The Type to be extended.
 * @param type2 The Type to extend with.
 * @ignore
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extend(type1, type2) {
    /* istanbul ignore next */
    // eslint-disable-next-line prefer-const
    for (let property in type2.prototype) {
        type1.prototype[property] = type2.prototype[property];
    }
}
/**
 * @ignore
 */
class OverlayViewSafe {
    constructor() {
        // MarkerClusterer implements google.maps.OverlayView interface. We use the
        // extend function to extend MarkerClusterer with google.maps.OverlayView
        // because it might not always be available when the code is defined so we
        // look for it at the last possible moment. If it doesn't exist now then
        // there is no point going ahead :)
        extend(OverlayViewSafe, google.maps.OverlayView);
    }
}

/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MarkerClustererEvents;
(function (MarkerClustererEvents) {
    MarkerClustererEvents["CLUSTERING_BEGIN"] = "clusteringbegin";
    MarkerClustererEvents["CLUSTERING_END"] = "clusteringend";
    MarkerClustererEvents["CLUSTER_CLICK"] = "click";
})(MarkerClustererEvents || (MarkerClustererEvents = {}));
const defaultOnClusterClickHandler = (_, cluster, map) => {
    map.fitBounds(cluster.bounds);
};
/**
 * MarkerClusterer creates and manages per-zoom-level clusters for large amounts
 * of markers. See {@link MarkerClustererOptions} for more details.
 *
 * <iframe src="https://googlemaps.github.io/js-three/public/anchor/index.html"></iframe>
 */
class MarkerClusterer extends OverlayViewSafe {
    constructor({ map, markers = [], algorithm = new SuperClusterAlgorithm({}), renderer = new DefaultRenderer(), onClusterClick = defaultOnClusterClickHandler, }) {
        super();
        this.markers = [...markers];
        this.clusters = [];
        this.algorithm = algorithm;
        this.renderer = renderer;
        this.onClusterClick = onClusterClick;
        if (map) {
            this.setMap(map);
        }
    }
    addMarker(marker, noDraw) {
        if (this.markers.includes(marker)) {
            return;
        }
        this.markers.push(marker);
        if (!noDraw) {
            this.render();
        }
    }
    addMarkers(markers, noDraw) {
        markers.forEach((marker) => {
            this.addMarker(marker, true);
        });
        if (!noDraw) {
            this.render();
        }
    }
    removeMarker(marker, noDraw) {
        const index = this.markers.indexOf(marker);
        if (index === -1) {
            // Marker is not in our list of markers, so do nothing:
            return false;
        }
        marker.setMap(null);
        this.markers.splice(index, 1); // Remove the marker from the list of managed markers
        if (!noDraw) {
            this.render();
        }
        return true;
    }
    removeMarkers(markers, noDraw) {
        let removed = false;
        markers.forEach((marker) => {
            removed = this.removeMarker(marker, true) || removed;
        });
        if (removed && !noDraw) {
            this.render();
        }
        return removed;
    }
    clearMarkers(noDraw) {
        this.markers.length = 0;
        if (!noDraw) {
            this.render();
        }
    }
    /**
     * Recalculates and draws all the marker clusters.
     */
    render() {
        const map = this.getMap();
        if (map instanceof google.maps.Map && this.getProjection()) {
            google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_BEGIN, this);
            const { clusters, changed } = this.algorithm.calculate({
                markers: this.markers,
                map,
                mapCanvasProjection: this.getProjection(),
            });
            // allow algorithms to return flag on whether the clusters/markers have changed
            if (changed || changed == undefined) {
                // reset visibility of markers and clusters
                this.reset();
                // store new clusters
                this.clusters = clusters;
                this.renderClusters();
            }
            google.maps.event.trigger(this, MarkerClustererEvents.CLUSTERING_END, this);
        }
    }
    onAdd() {
        this.idleListener = this.getMap().addListener("idle", this.render.bind(this));
        this.render();
    }
    onRemove() {
        google.maps.event.removeListener(this.idleListener);
        this.reset();
    }
    reset() {
        this.markers.forEach((marker) => marker.setMap(null));
        this.clusters.forEach((cluster) => cluster.delete());
        this.clusters = [];
    }
    renderClusters() {
        // generate stats to pass to renderers
        const stats = new ClusterStats(this.markers, this.clusters);
        const map = this.getMap();
        this.clusters.forEach((cluster) => {
            if (cluster.markers.length === 1) {
                cluster.marker = cluster.markers[0];
            }
            else {
                cluster.marker = this.renderer.render(cluster, stats);
                if (this.onClusterClick) {
                    cluster.marker.addListener("click", 
                    /* istanbul ignore next */
                    (event) => {
                        google.maps.event.trigger(this, MarkerClustererEvents.CLUSTER_CLICK, cluster);
                        this.onClusterClick(event, cluster, map);
                    });
                }
            }
            cluster.marker.setMap(map);
        });
    }
}

var index_esm = /*#__PURE__*/Object.freeze({
	__proto__: null,
	AbstractAlgorithm: AbstractAlgorithm,
	AbstractViewportAlgorithm: AbstractViewportAlgorithm,
	Cluster: Cluster,
	ClusterStats: ClusterStats,
	DBScanAlgorithm: DBScanAlgorithm,
	DefaultRenderer: DefaultRenderer,
	GridAlgorithm: GridAlgorithm,
	KmeansAlgorithm: KmeansAlgorithm,
	MarkerClusterer: MarkerClusterer,
	get MarkerClustererEvents () { return MarkerClustererEvents; },
	NoopAlgorithm: NoopAlgorithm,
	SuperClusterAlgorithm: SuperClusterAlgorithm,
	defaultOnClusterClickHandler: defaultOnClusterClickHandler,
	distanceBetweenPoints: distanceBetweenPoints,
	extendBoundsToPaddedViewport: extendBoundsToPaddedViewport,
	extendPixelBounds: extendPixelBounds,
	filterMarkersToPaddedViewport: filterMarkersToPaddedViewport,
	noop: noop$1,
	pixelBoundsToLatLngBounds: pixelBoundsToLatLngBounds
});

const useGoogleMarkerClusterer = (options) => {
    const map = useGoogleMap();
    const [markerClusterer, setMarkerClusterer] = React.useState(null);
    React.useEffect(() => {
        if (map && markerClusterer === null) {
            const markerCluster = new MarkerClusterer(Object.assign(Object.assign({}, options), { map }));
            setMarkerClusterer(markerCluster);
        }
    }, [map]);
    return markerClusterer;
};
/** Wrapper around [@googlemaps/markerclusterer](https://github.com/googlemaps/js-markerclusterer)
 *
 * Accepts {@link  MarkerClustererOptionsSubset} which is a subset of  {@link MarkerClustererOptions}
 */
const GoogleMarkerClusterer = ({ children, options }) => {
    const markerClusterer = useGoogleMarkerClusterer(options);
    return markerClusterer !== null ? children(markerClusterer) : null;
};

/* global google */
const eventMap$c = {
    onCloseClick: 'closeclick',
    onContentChanged: 'content_changed',
    onDomReady: 'domready',
    onPositionChanged: 'position_changed',
    onZindexChanged: 'zindex_changed',
};
const updaterMap$c = {
    options(instance, options) {
        instance.setOptions(options);
    },
    position(instance, position) {
        instance.setPosition(position);
    },
    zIndex(instance, zIndex) {
        instance.setZIndex(zIndex);
    },
};
class InfoWindow extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.containerElement = null;
        this.state = {
            infoWindow: null,
        };
        this.open = (infoWindow, anchor) => {
            if (anchor) {
                infoWindow.open(this.context, anchor);
            }
            else if (infoWindow.getPosition()) {
                infoWindow.open(this.context);
            }
            else {
                invariant_1(false, `You must provide either an anchor (typically render it inside a <Marker>) or a position props for <InfoWindow>.`);
            }
        };
        this.setInfoWindowCallback = () => {
            if (this.state.infoWindow !== null && this.containerElement !== null) {
                this.state.infoWindow.setContent(this.containerElement);
                this.open(this.state.infoWindow, this.props.anchor);
                if (this.props.onLoad) {
                    this.props.onLoad(this.state.infoWindow);
                }
            }
        };
    }
    componentDidMount() {
        const infoWindow = new google.maps.InfoWindow(Object.assign({}, (this.props.options || {})));
        this.containerElement = document.createElement('div');
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$c,
            eventMap: eventMap$c,
            prevProps: {},
            nextProps: this.props,
            instance: infoWindow,
        });
        this.setState(function setInfoWindow() {
            return {
                infoWindow,
            };
        }, this.setInfoWindowCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.infoWindow !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$c,
                eventMap: eventMap$c,
                prevProps,
                nextProps: this.props,
                instance: this.state.infoWindow,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.infoWindow !== null) {
            unregisterEvents(this.registeredEvents);
            this.state.infoWindow.close();
        }
    }
    render() {
        return this.containerElement ? (ReactDOM__namespace.createPortal(React__namespace.Children.only(this.props.children), this.containerElement)) : (React__namespace.createElement(React__namespace.Fragment, null));
    }
}
InfoWindow.contextType = MapContext;

const eventMap$b = {
    onClick: 'click',
    onDblClick: 'dblclick',
    onDrag: 'drag',
    onDragEnd: 'dragend',
    onDragStart: 'dragstart',
    onMouseDown: 'mousedown',
    onMouseMove: 'mousemove',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
    onMouseUp: 'mouseup',
    onRightClick: 'rightclick',
};
const updaterMap$b = {
    draggable(instance, draggable) {
        instance.setDraggable(draggable);
    },
    editable(instance, editable) {
        instance.setEditable(editable);
    },
    map(instance, map) {
        instance.setMap(map);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
    path(instance, path) {
        instance.setPath(path);
    },
    visible(instance, visible) {
        instance.setVisible(visible);
    },
};
class Polyline extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            polyline: null,
        };
        this.setPolylineCallback = () => {
            if (this.state.polyline !== null && this.props.onLoad) {
                this.props.onLoad(this.state.polyline);
            }
        };
    }
    componentDidMount() {
        const polyline = new google.maps.Polyline(Object.assign(Object.assign({}, (this.props.options || {})), { map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$b,
            eventMap: eventMap$b,
            prevProps: {},
            nextProps: this.props,
            instance: polyline,
        });
        this.setState(function setPolyline() {
            return {
                polyline,
            };
        }, this.setPolylineCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.polyline !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$b,
                eventMap: eventMap$b,
                prevProps,
                nextProps: this.props,
                instance: this.state.polyline,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.polyline !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.polyline);
            }
            unregisterEvents(this.registeredEvents);
            this.state.polyline.setMap(null);
        }
    }
    render() {
        return React__namespace.createElement(React__namespace.Fragment, null);
    }
}
Polyline.contextType = MapContext;

/* global google */
const eventMap$a = {
    onClick: 'click',
    onDblClick: 'dblclick',
    onDrag: 'drag',
    onDragEnd: 'dragend',
    onDragStart: 'dragstart',
    onMouseDown: 'mousedown',
    onMouseMove: 'mousemove',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
    onMouseUp: 'mouseup',
    onRightClick: 'rightclick',
};
const updaterMap$a = {
    draggable(instance, draggable) {
        instance.setDraggable(draggable);
    },
    editable(instance, editable) {
        instance.setEditable(editable);
    },
    map(instance, map) {
        instance.setMap(map);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
    path(instance, path) {
        instance.setPath(path);
    },
    paths(instance, paths) {
        instance.setPaths(paths);
    },
    visible(instance, visible) {
        instance.setVisible(visible);
    },
};
class Polygon extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            polygon: null,
        };
        this.setPolygonCallback = () => {
            if (this.state.polygon !== null && this.props.onLoad) {
                this.props.onLoad(this.state.polygon);
            }
        };
    }
    componentDidMount() {
        const polygon = new google.maps.Polygon(Object.assign(Object.assign({}, (this.props.options || {})), { map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$a,
            eventMap: eventMap$a,
            prevProps: {},
            nextProps: this.props,
            instance: polygon,
        });
        this.setState(function setPolygon() {
            return {
                polygon,
            };
        }, this.setPolygonCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.polygon !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$a,
                eventMap: eventMap$a,
                prevProps,
                nextProps: this.props,
                instance: this.state.polygon,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.polygon !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.polygon);
            }
            unregisterEvents(this.registeredEvents);
            this.state.polygon && this.state.polygon.setMap(null);
        }
    }
    render() {
        return null;
    }
}
Polygon.contextType = MapContext;

const eventMap$9 = {
    onBoundsChanged: 'bounds_changed',
    onClick: 'click',
    onDblClick: 'dblclick',
    onDrag: 'drag',
    onDragEnd: 'dragend',
    onDragStart: 'dragstart',
    onMouseDown: 'mousedown',
    onMouseMove: 'mousemove',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
    onMouseUp: 'mouseup',
    onRightClick: 'rightclick',
};
const updaterMap$9 = {
    bounds(instance, bounds) {
        instance.setBounds(bounds);
    },
    draggable(instance, draggable) {
        instance.setDraggable(draggable);
    },
    editable(instance, editable) {
        instance.setEditable(editable);
    },
    map(instance, map) {
        instance.setMap(map);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
    visible(instance, visible) {
        instance.setVisible(visible);
    },
};
class Rectangle extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            rectangle: null,
        };
        this.setRectangleCallback = () => {
            if (this.state.rectangle !== null && this.props.onLoad) {
                this.props.onLoad(this.state.rectangle);
            }
        };
    }
    componentDidMount() {
        const rectangle = new google.maps.Rectangle(Object.assign(Object.assign({}, (this.props.options || {})), { map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$9,
            eventMap: eventMap$9,
            prevProps: {},
            nextProps: this.props,
            instance: rectangle,
        });
        this.setState(function setRectangle() {
            return {
                rectangle,
            };
        }, this.setRectangleCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.rectangle !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$9,
                eventMap: eventMap$9,
                prevProps,
                nextProps: this.props,
                instance: this.state.rectangle,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.rectangle !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.rectangle);
            }
            unregisterEvents(this.registeredEvents);
            this.state.rectangle.setMap(null);
        }
    }
    render() {
        return React__namespace.createElement(React__namespace.Fragment, null);
    }
}
Rectangle.contextType = MapContext;

const eventMap$8 = {
    onCenterChanged: 'center_changed',
    onClick: 'click',
    onDblClick: 'dblclick',
    onDrag: 'drag',
    onDragEnd: 'dragend',
    onDragStart: 'dragstart',
    onMouseDown: 'mousedown',
    onMouseMove: 'mousemove',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
    onMouseUp: 'mouseup',
    onRadiusChanged: 'radius_changed',
    onRightClick: 'rightclick',
};
const updaterMap$8 = {
    center(instance, center) {
        instance.setCenter(center);
    },
    draggable(instance, draggable) {
        instance.setDraggable(draggable);
    },
    editable(instance, editable) {
        instance.setEditable(editable);
    },
    map(instance, map) {
        instance.setMap(map);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
    radius(instance, radius) {
        instance.setRadius(radius);
    },
    visible(instance, visible) {
        instance.setVisible(visible);
    },
};
class Circle extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            circle: null,
        };
        this.setCircleCallback = () => {
            if (this.state.circle !== null && this.props.onLoad) {
                this.props.onLoad(this.state.circle);
            }
        };
    }
    componentDidMount() {
        const circle = new google.maps.Circle(Object.assign(Object.assign({}, (this.props.options || {})), { map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$8,
            eventMap: eventMap$8,
            prevProps: {},
            nextProps: this.props,
            instance: circle,
        });
        this.setState(function setCircle() {
            return {
                circle,
            };
        }, this.setCircleCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.circle !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$8,
                eventMap: eventMap$8,
                prevProps,
                nextProps: this.props,
                instance: this.state.circle,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.circle !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.circle);
            }
            unregisterEvents(this.registeredEvents);
            this.state.circle && this.state.circle.setMap(null);
        }
    }
    render() {
        return React__namespace.createElement(React__namespace.Fragment, null);
    }
}
Circle.contextType = MapContext;

const eventMap$7 = {
    onAddFeature: 'addfeature',
    onClick: 'click',
    onDblClick: 'dblclick',
    onMouseDown: 'mousedown',
    onMouseOut: 'mouseout',
    onMouseOver: 'mouseover',
    onMouseUp: 'mouseup',
    onRemoveFeature: 'removefeature',
    onRemoveProperty: 'removeproperty',
    onRightClick: 'rightclick',
    onSetGeometry: 'setgeometry',
    onSetProperty: 'setproperty',
};
const updaterMap$7 = {
    add(instance, features) {
        instance.add(features);
    },
    addgeojson(instance, geojson, options) {
        instance.addGeoJson(geojson, options);
    },
    contains(instance, feature) {
        instance.contains(feature);
    },
    foreach(instance, callback) {
        instance.forEach(callback);
    },
    loadgeojson(instance, url, options, callback) {
        instance.loadGeoJson(url, options, callback);
    },
    overridestyle(instance, feature, style) {
        instance.overrideStyle(feature, style);
    },
    remove(instance, feature) {
        instance.remove(feature);
    },
    revertstyle(instance, feature) {
        instance.revertStyle(feature);
    },
    controlposition(instance, controlPosition) {
        instance.setControlPosition(controlPosition);
    },
    controls(instance, controls) {
        instance.setControls(controls);
    },
    drawingmode(instance, mode) {
        instance.setDrawingMode(mode);
    },
    map(instance, map) {
        instance.setMap(map);
    },
    style(instance, style) {
        instance.setStyle(style);
    },
    togeojson(instance, callback) {
        instance.toGeoJson(callback);
    },
};
class Data extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            data: null,
        };
        this.setDataCallback = () => {
            if (this.state.data !== null && this.props.onLoad) {
                this.props.onLoad(this.state.data);
            }
        };
    }
    componentDidMount() {
        const data = new google.maps.Data(Object.assign(Object.assign({}, (this.props.options || {})), { map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$7,
            eventMap: eventMap$7,
            prevProps: {},
            nextProps: this.props,
            instance: data,
        });
        this.setState(function setData() {
            return {
                data,
            };
        }, this.setDataCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.data !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$7,
                eventMap: eventMap$7,
                prevProps,
                nextProps: this.props,
                instance: this.state.data,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.data !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.data);
            }
            unregisterEvents(this.registeredEvents);
            if (this.state.data) {
                this.state.data.setMap(null);
            }
        }
    }
    render() {
        return null;
    }
}
Data.contextType = MapContext;

const eventMap$6 = {
    onClick: 'click',
    onDefaultViewportChanged: 'defaultviewport_changed',
    onStatusChanged: 'status_changed',
};
const updaterMap$6 = {
    options(instance, options) {
        instance.setOptions(options);
    },
    url(instance, url) {
        instance.setUrl(url);
    },
    zIndex(instance, zIndex) {
        instance.setZIndex(zIndex);
    },
};
class KmlLayer extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            kmlLayer: null,
        };
        this.setKmlLayerCallback = () => {
            if (this.state.kmlLayer !== null && this.props.onLoad) {
                this.props.onLoad(this.state.kmlLayer);
            }
        };
    }
    componentDidMount() {
        const kmlLayer = new google.maps.KmlLayer(Object.assign(Object.assign({}, this.props.options), { map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$6,
            eventMap: eventMap$6,
            prevProps: {},
            nextProps: this.props,
            instance: kmlLayer,
        });
        this.setState(function setLmlLayer() {
            return {
                kmlLayer,
            };
        }, this.setKmlLayerCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.kmlLayer !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$6,
                eventMap: eventMap$6,
                prevProps,
                nextProps: this.props,
                instance: this.state.kmlLayer,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.kmlLayer !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.kmlLayer);
            }
            unregisterEvents(this.registeredEvents);
            this.state.kmlLayer.setMap(null);
        }
    }
    render() {
        return null;
    }
}
KmlLayer.contextType = MapContext;

/* eslint-disable filenames/match-regex */
function getOffsetOverride(containerElement, getPixelPositionOffset) {
    return typeof getPixelPositionOffset === 'function'
        ? getPixelPositionOffset(containerElement.offsetWidth, containerElement.offsetHeight)
        : {};
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createLatLng = (inst, Type) => new Type(inst.lat, inst.lng);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createLatLngBounds = (inst, Type) => new Type(new google.maps.LatLng(inst.ne.lat, inst.ne.lng), new google.maps.LatLng(inst.sw.lat, inst.sw.lng));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ensureOfType = (inst, type, factory) => {
    return inst instanceof type ? inst : factory(inst, type);
};
const getLayoutStylesByBounds = (mapCanvasProjection, offset, bounds) => {
    const ne = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(bounds.getNorthEast());
    const sw = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(bounds.getSouthWest());
    if (ne && sw) {
        return {
            left: `${sw.x + offset.x}px`,
            top: `${ne.y + offset.y}px`,
            width: `${ne.x - sw.x - offset.x}px`,
            height: `${sw.y - ne.y - offset.y}px`,
        };
    }
    return {
        left: '-9999px',
        top: '-9999px',
    };
};
const getLayoutStylesByPosition = (mapCanvasProjection, offset, position) => {
    const point = mapCanvasProjection && mapCanvasProjection.fromLatLngToDivPixel(position);
    if (point) {
        const { x, y } = point;
        return {
            left: `${x + offset.x}px`,
            top: `${y + offset.y}px`,
        };
    }
    return {
        left: '-9999px',
        top: '-9999px',
    };
};
const getLayoutStyles = (mapCanvasProjection, offset, bounds, position) => {
    return bounds !== undefined
        ? getLayoutStylesByBounds(mapCanvasProjection, offset, ensureOfType(bounds, google.maps.LatLngBounds, createLatLngBounds))
        : getLayoutStylesByPosition(mapCanvasProjection, offset, ensureOfType(position, google.maps.LatLng, createLatLng));
};
const arePositionsEqual = (currentPosition, previousPosition) => {
    return currentPosition.left === previousPosition.left
        && currentPosition.top === previousPosition.top
        && currentPosition.width === previousPosition.height
        && currentPosition.height === previousPosition.height;
};

function convertToLatLngString(latLngLike) {
    if (!latLngLike) {
        return '';
    }
    const latLng = latLngLike instanceof google.maps.LatLng
        ? latLngLike
        : new google.maps.LatLng(latLngLike.lat, latLngLike.lng);
    return latLng + '';
}
function convertToLatLngBoundsString(latLngBoundsLike) {
    if (!latLngBoundsLike) {
        return '';
    }
    const latLngBounds = latLngBoundsLike instanceof google.maps.LatLngBounds
        ? latLngBoundsLike
        : new google.maps.LatLngBounds(new google.maps.LatLng(latLngBoundsLike.south, latLngBoundsLike.east), new google.maps.LatLng(latLngBoundsLike.north, latLngBoundsLike.west));
    return latLngBounds + '';
}
class OverlayView extends React__namespace.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            paneEl: null,
            containerStyle: {
                // set initial position
                position: 'absolute'
            },
        };
        this.updatePane = () => {
            const mapPaneName = this.props.mapPaneName;
            // https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapPanes
            const mapPanes = this.overlayView.getPanes();
            invariant_1(!!mapPaneName, `OverlayView requires props.mapPaneName but got %s`, mapPaneName);
            if (mapPanes) {
                this.setState({
                    paneEl: mapPanes[mapPaneName]
                });
            }
            else {
                this.setState({
                    paneEl: null
                });
            }
        };
        this.onAdd = () => {
            var _a, _b;
            this.updatePane();
            (_b = (_a = this.props).onLoad) === null || _b === void 0 ? void 0 : _b.call(_a, this.overlayView);
        };
        this.onPositionElement = () => {
            const mapCanvasProjection = this.overlayView.getProjection();
            const offset = Object.assign({ x: 0, y: 0 }, (this.containerRef.current
                ? getOffsetOverride(this.containerRef.current, this.props.getPixelPositionOffset)
                : {}));
            const layoutStyles = getLayoutStyles(mapCanvasProjection, offset, this.props.bounds, this.props.position);
            const { left, top, width, height } = this.state.containerStyle;
            if (!arePositionsEqual(layoutStyles, { left, top, width, height })) {
                this.setState({
                    containerStyle: Object.assign(Object.assign({}, layoutStyles), { position: 'absolute' }),
                });
            }
        };
        this.draw = () => {
            this.onPositionElement();
        };
        this.onRemove = () => {
            var _a, _b;
            this.setState(() => ({
                paneEl: null
            }));
            // this.mapPaneEl = null
            (_b = (_a = this.props).onUnmount) === null || _b === void 0 ? void 0 : _b.call(_a, this.overlayView);
        };
        this.containerRef = React__namespace.createRef();
        // You must implement three methods: onAdd(), draw(), and onRemove().
        const overlayView = new google.maps.OverlayView();
        overlayView.onAdd = this.onAdd;
        overlayView.draw = this.draw;
        overlayView.onRemove = this.onRemove;
        this.overlayView = overlayView;
    }
    componentDidMount() {
        // You must call setMap() with a valid Map object to trigger the call to
        // the onAdd() method and setMap(null) in order to trigger the onRemove() method.
        this.overlayView.setMap(this.context);
    }
    componentDidUpdate(prevProps) {
        const prevPositionString = convertToLatLngString(prevProps.position);
        const positionString = convertToLatLngString(this.props.position);
        const prevBoundsString = convertToLatLngBoundsString(prevProps.bounds);
        const boundsString = convertToLatLngBoundsString(this.props.bounds);
        if (prevPositionString !== positionString || prevBoundsString !== boundsString) {
            this.overlayView.draw();
        }
        if (prevProps.mapPaneName !== this.props.mapPaneName) {
            this.updatePane();
        }
    }
    componentWillUnmount() {
        this.overlayView.setMap(null);
    }
    render() {
        const paneEl = this.state.paneEl;
        if (paneEl) {
            return ReactDOM__namespace.createPortal(React__namespace.createElement("div", { ref: this.containerRef, style: this.state.containerStyle }, React__namespace.Children.only(this.props.children)), paneEl);
        }
        else {
            return null;
        }
    }
}
OverlayView.FLOAT_PANE = `floatPane`;
OverlayView.MAP_PANE = `mapPane`;
OverlayView.MARKER_LAYER = `markerLayer`;
OverlayView.OVERLAY_LAYER = `overlayLayer`;
OverlayView.OVERLAY_MOUSE_TARGET = `overlayMouseTarget`;
OverlayView.contextType = MapContext;

function noop() { }

const eventMap$5 = {
    onDblClick: 'dblclick',
    onClick: 'click',
};
const updaterMap$5 = {
    opacity(instance, opacity) {
        instance.setOpacity(opacity);
    },
};
class GroundOverlay extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            groundOverlay: null,
        };
        this.setGroundOverlayCallback = () => {
            if (this.state.groundOverlay !== null && this.props.onLoad) {
                this.props.onLoad(this.state.groundOverlay);
            }
        };
    }
    componentDidMount() {
        invariant_1(!!this.props.url || !!this.props.bounds, `For GroundOverlay, url and bounds are passed in to constructor and are immutable after instantiated. This is the behavior of Google Maps JavaScript API v3 ( See https://developers.google.com/maps/documentation/javascript/reference#GroundOverlay) Hence, use the corresponding two props provided by \`react-google-maps-api\`, url and bounds. In some cases, you'll need the GroundOverlay component to reflect the changes of url and bounds. You can leverage the React's key property to remount the component. Typically, just \`key={url}\` would serve your need. See https://github.com/tomchentw/react-google-maps/issues/655`);
        const groundOverlay = new google.maps.GroundOverlay(this.props.url, this.props.bounds, Object.assign(Object.assign({}, this.props.options), { map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$5,
            eventMap: eventMap$5,
            prevProps: {},
            nextProps: this.props,
            instance: groundOverlay,
        });
        this.setState(function setGroundOverlay() {
            return {
                groundOverlay,
            };
        }, this.setGroundOverlayCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.groundOverlay !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$5,
                eventMap: eventMap$5,
                prevProps,
                nextProps: this.props,
                instance: this.state.groundOverlay,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.groundOverlay) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.groundOverlay);
            }
            this.state.groundOverlay.setMap(null);
        }
    }
    render() {
        return null;
    }
}
GroundOverlay.defaultProps = {
    onLoad: noop,
};
GroundOverlay.contextType = MapContext;

const eventMap$4 = {};
const updaterMap$4 = {
    data(instance, data) {
        instance.setData(data);
    },
    map(instance, map) {
        instance.setMap(map);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
};
class HeatmapLayer extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            heatmapLayer: null,
        };
        this.setHeatmapLayerCallback = () => {
            if (this.state.heatmapLayer !== null && this.props.onLoad) {
                this.props.onLoad(this.state.heatmapLayer);
            }
        };
    }
    componentDidMount() {
        invariant_1(!!google.maps.visualization, 'Did you include prop libraries={["visualization"]} to <LoadScript />? %s', google.maps.visualization);
        invariant_1(!!this.props.data, 'data property is required in HeatmapLayer %s', this.props.data);
        const heatmapLayer = new google.maps.visualization.HeatmapLayer(Object.assign(Object.assign({}, (this.props.options || {})), { data: this.props.data, map: this.context }));
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$4,
            eventMap: eventMap$4,
            prevProps: {},
            nextProps: this.props,
            instance: heatmapLayer,
        });
        this.setState(function setHeatmapLayer() {
            return {
                heatmapLayer,
            };
        }, this.setHeatmapLayerCallback);
    }
    componentDidUpdate(prevProps) {
        unregisterEvents(this.registeredEvents);
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$4,
            eventMap: eventMap$4,
            prevProps,
            nextProps: this.props,
            instance: this.state.heatmapLayer,
        });
    }
    componentWillUnmount() {
        if (this.state.heatmapLayer !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.heatmapLayer);
            }
            unregisterEvents(this.registeredEvents);
            this.state.heatmapLayer.setMap(null);
        }
    }
    render() {
        return null;
    }
}
HeatmapLayer.contextType = MapContext;

const eventMap$3 = {
    onCloseClick: 'closeclick',
    onPanoChanged: 'pano_changed',
    onPositionChanged: 'position_changed',
    onPovChanged: 'pov_changed',
    onResize: 'resize',
    onStatusChanged: 'status_changed',
    onVisibleChanged: 'visible_changed',
    onZoomChanged: 'zoom_changed',
};
const updaterMap$3 = {
    register(instance, provider, options) {
        instance.registerPanoProvider(provider, options);
    },
    links(instance, links) {
        instance.setLinks(links);
    },
    motionTracking(instance, motionTracking) {
        instance.setMotionTracking(motionTracking);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
    pano(instance, pano) {
        instance.setPano(pano);
    },
    position(instance, position) {
        instance.setPosition(position);
    },
    pov(instance, pov) {
        instance.setPov(pov);
    },
    visible(instance, visible) {
        instance.setVisible(visible);
    },
    zoom(instance, zoom) {
        instance.setZoom(zoom);
    },
};
class StreetViewPanorama extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            streetViewPanorama: null,
        };
        this.setStreetViewPanoramaCallback = () => {
            if (this.state.streetViewPanorama !== null && this.props.onLoad) {
                this.props.onLoad(this.state.streetViewPanorama);
            }
        };
    }
    componentDidMount() {
        const streetViewPanorama = this.context.getStreetView();
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$3,
            eventMap: eventMap$3,
            prevProps: {},
            nextProps: this.props,
            instance: streetViewPanorama,
        });
        this.setState(function setStreetViewPanorama() {
            return {
                streetViewPanorama,
            };
        }, this.setStreetViewPanoramaCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.streetViewPanorama !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$3,
                eventMap: eventMap$3,
                prevProps,
                nextProps: this.props,
                instance: this.state.streetViewPanorama,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.streetViewPanorama !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.streetViewPanorama);
            }
            unregisterEvents(this.registeredEvents);
            this.state.streetViewPanorama.setVisible(false);
        }
    }
    render() {
        return null;
    }
}
StreetViewPanorama.contextType = MapContext;

class StreetViewService extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            streetViewService: null,
        };
        this.setStreetViewServiceCallback = () => {
            if (this.state.streetViewService !== null && this.props.onLoad) {
                this.props.onLoad(this.state.streetViewService);
            }
        };
    }
    componentDidMount() {
        const streetViewService = new google.maps.StreetViewService();
        this.setState(function setStreetViewService() {
            return {
                streetViewService,
            };
        }, this.setStreetViewServiceCallback);
    }
    componentWillUnmount() {
        if (this.state.streetViewService !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.streetViewService);
            }
        }
    }
    render() {
        return null;
    }
}
StreetViewService.contextType = MapContext;

class DirectionsService extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            directionsService: null,
        };
        this.setDirectionsServiceCallback = () => {
            if (this.state.directionsService !== null && this.props.onLoad) {
                this.props.onLoad(this.state.directionsService);
            }
        };
    }
    componentDidMount() {
        invariant_1(!!this.props.options, 'DirectionsService expected options object as parameter, but got %s', this.props.options);
        const directionsService = new google.maps.DirectionsService();
        this.setState(function setDirectionsService() {
            return {
                directionsService,
            };
        }, this.setDirectionsServiceCallback);
    }
    componentDidUpdate() {
        if (this.state.directionsService !== null) {
            this.state.directionsService.route(this.props.options, this.props.callback);
        }
    }
    componentWillUnmount() {
        if (this.state.directionsService !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.directionsService);
            }
        }
    }
    render() {
        return React__namespace.createElement(React__namespace.Fragment, null);
    }
}

const eventMap$2 = {
    onDirectionsChanged: 'directions_changed',
};
const updaterMap$2 = {
    directions(instance, directions) {
        instance.setDirections(directions);
    },
    map(instance, map) {
        instance.setMap(map);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
    panel(instance, panel) {
        instance.setPanel(panel);
    },
    routeIndex(instance, routeIndex) {
        instance.setRouteIndex(routeIndex);
    },
};
class DirectionsRenderer extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.state = {
            directionsRenderer: null,
        };
        this.setDirectionsRendererCallback = () => {
            if (this.state.directionsRenderer !== null) {
                this.state.directionsRenderer.setMap(this.context);
                if (this.props.onLoad) {
                    this.props.onLoad(this.state.directionsRenderer);
                }
            }
        };
    }
    componentDidMount() {
        const directionsRenderer = new google.maps.DirectionsRenderer(this.props.options);
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap: updaterMap$2,
            eventMap: eventMap$2,
            prevProps: {},
            nextProps: this.props,
            instance: directionsRenderer,
        });
        this.setState(function setDirectionsRenderer() {
            return {
                directionsRenderer,
            };
        }, this.setDirectionsRendererCallback);
    }
    componentDidUpdate(prevProps) {
        if (this.state.directionsRenderer !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$2,
                eventMap: eventMap$2,
                prevProps,
                nextProps: this.props,
                instance: this.state.directionsRenderer,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.directionsRenderer !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.directionsRenderer);
            }
            unregisterEvents(this.registeredEvents);
            if (this.state.directionsRenderer) {
                this.state.directionsRenderer.setMap(null);
            }
        }
    }
    render() {
        return React__namespace.createElement(React__namespace.Fragment, null);
    }
}
DirectionsRenderer.contextType = MapContext;

class DistanceMatrixService extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            distanceMatrixService: null,
        };
        this.setDistanceMatrixServiceCallback = () => {
            if (this.state.distanceMatrixService !== null && this.props.onLoad) {
                this.props.onLoad(this.state.distanceMatrixService);
            }
        };
    }
    componentDidMount() {
        invariant_1(!!this.props.options, 'DistanceMatrixService expected options object as parameter, but go %s', this.props.options);
        const distanceMatrixService = new google.maps.DistanceMatrixService();
        this.setState(function setDistanceMatrixService() {
            return {
                distanceMatrixService,
            };
        }, this.setDistanceMatrixServiceCallback);
    }
    componentDidUpdate() {
        if (this.state.distanceMatrixService !== null) {
            this.state.distanceMatrixService.getDistanceMatrix(this.props.options, this.props.callback);
        }
    }
    componentWillUnmount() {
        if (this.state.distanceMatrixService !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.distanceMatrixService);
            }
        }
    }
    render() {
        return React__namespace.createElement(React__namespace.Fragment, null);
    }
}

const eventMap$1 = {
    onPlacesChanged: 'places_changed',
};
const updaterMap$1 = {
    bounds(instance, bounds) {
        instance.setBounds(bounds);
    },
};
class StandaloneSearchBox extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.containerElement = React__namespace.createRef();
        this.state = {
            searchBox: null,
        };
        this.setSearchBoxCallback = () => {
            if (this.state.searchBox !== null && this.props.onLoad) {
                this.props.onLoad(this.state.searchBox);
            }
        };
    }
    componentDidMount() {
        invariant_1(!!google.maps.places, 'You need to provide libraries={["places"]} prop to <LoadScript /> component %s', google.maps.places);
        if (this.containerElement !== null && this.containerElement.current !== null) {
            const input = this.containerElement.current.querySelector('input');
            if (input !== null) {
                const searchBox = new google.maps.places.SearchBox(input, this.props.options);
                this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                    updaterMap: updaterMap$1,
                    eventMap: eventMap$1,
                    prevProps: {},
                    nextProps: this.props,
                    instance: searchBox,
                });
                this.setState(function setSearchBox() {
                    return {
                        searchBox,
                    };
                }, this.setSearchBoxCallback);
            }
        }
    }
    componentDidUpdate(prevProps) {
        if (this.state.searchBox !== null) {
            unregisterEvents(this.registeredEvents);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap: updaterMap$1,
                eventMap: eventMap$1,
                prevProps,
                nextProps: this.props,
                instance: this.state.searchBox,
            });
        }
    }
    componentWillUnmount() {
        if (this.state.searchBox !== null) {
            if (this.props.onUnmount) {
                this.props.onUnmount(this.state.searchBox);
            }
            unregisterEvents(this.registeredEvents);
        }
    }
    render() {
        return React__namespace.createElement("div", { ref: this.containerElement }, React__namespace.Children.only(this.props.children));
    }
}
StandaloneSearchBox.contextType = MapContext;

const eventMap = {
    onPlaceChanged: 'place_changed',
};
const updaterMap = {
    bounds(instance, bounds) {
        instance.setBounds(bounds);
    },
    restrictions(instance, restrictions) {
        instance.setComponentRestrictions(restrictions);
    },
    fields(instance, fields) {
        instance.setFields(fields);
    },
    options(instance, options) {
        instance.setOptions(options);
    },
    types(instance, types) {
        instance.setTypes(types);
    },
};
class Autocomplete extends React__namespace.PureComponent {
    constructor() {
        super(...arguments);
        this.registeredEvents = [];
        this.containerElement = React__namespace.createRef();
        this.state = {
            autocomplete: null,
        };
        this.setAutocompleteCallback = () => {
            if (this.state.autocomplete !== null && this.props.onLoad) {
                this.props.onLoad(this.state.autocomplete);
            }
        };
    }
    componentDidMount() {
        invariant_1(!!google.maps.places, 'You need to provide libraries={["places"]} prop to <LoadScript /> component %s', google.maps.places);
        // TODO: why current could be equal null?
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const input = this.containerElement.current.querySelector('input');
        if (input) {
            const autocomplete = new google.maps.places.Autocomplete(input, this.props.options);
            this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
                updaterMap,
                eventMap,
                prevProps: {},
                nextProps: this.props,
                instance: autocomplete,
            });
            this.setState(function setAutocomplete() {
                return {
                    autocomplete,
                };
            }, this.setAutocompleteCallback);
        }
    }
    componentDidUpdate(prevProps) {
        unregisterEvents(this.registeredEvents);
        this.registeredEvents = applyUpdatersToPropsAndRegisterEvents({
            updaterMap,
            eventMap,
            prevProps,
            nextProps: this.props,
            instance: this.state.autocomplete,
        });
    }
    componentWillUnmount() {
        if (this.state.autocomplete !== null) {
            unregisterEvents(this.registeredEvents);
        }
    }
    render() {
        return React__namespace.createElement("div", { ref: this.containerElement, className: this.props.className || '' }, React__namespace.Children.only(this.props.children));
    }
}
Autocomplete.contextType = MapContext;

exports.Autocomplete = Autocomplete;
exports.BicyclingLayer = BicyclingLayer;
exports.Circle = Circle;
exports.Data = Data;
exports.DirectionsRenderer = DirectionsRenderer;
exports.DirectionsService = DirectionsService;
exports.DistanceMatrixService = DistanceMatrixService;
exports.DrawingManager = DrawingManager;
exports.GoogleMap = GoogleMap;
exports.GoogleMapsMarkerClusterer = index_esm;
exports.GoogleMarkerClusterer = GoogleMarkerClusterer;
exports.GroundOverlay = GroundOverlay;
exports.HeatmapLayer = HeatmapLayer;
exports.InfoBox = InfoBoxComponent;
exports.InfoWindow = InfoWindow;
exports.KmlLayer = KmlLayer;
exports.LoadScript = LoadScript;
exports.LoadScriptNext = LoadScriptNext$1;
exports.MapContext = MapContext;
exports.Marker = Marker;
exports.MarkerClusterer = ClustererComponent;
exports.OverlayView = OverlayView;
exports.Polygon = Polygon;
exports.Polyline = Polyline;
exports.Rectangle = Rectangle;
exports.StandaloneSearchBox = StandaloneSearchBox;
exports.StreetViewPanorama = StreetViewPanorama;
exports.StreetViewService = StreetViewService;
exports.TrafficLayer = TrafficLayer;
exports.TransitLayer = TransitLayer;
exports.useGoogleMap = useGoogleMap;
exports.useJsApiLoader = useJsApiLoader;
exports.useLoadScript = useLoadScript;
//# sourceMappingURL=cjs.js.map
