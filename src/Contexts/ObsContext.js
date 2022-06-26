/* eslint-disable no-fallthrough */
import React, { useState } from "react";
import OBSWebSocket from "obs-websocket-js";
import { useToast } from "@chakra-ui/toast";
import { useEffect } from "react";

/**
 * @typedef {'Scene' | 'Source' | 'Filter' | 'Start Streaming' | 'Stop Streaming' | 'Start Recording' | 'Stop Recording'} obsTogglingType
 */

/**
 * @typedef {Object} obsToggling
 * @property {obsTogglingType} type
 * @property {string} [sceneName]
 * @property {string} [sourceName]
 * @property {string} [sourceType]
 * @property {number} [sourceTime]
 * @property {Array} [sourceGroup]
 * @property {string} [filterName]
 * @property {boolean} [isRandom]
 * @property {boolean} [isRarity] will the source have rarity
 * @property {number} [rarity] will the source have rarity
 * @property {number} [timed]
 */

/**
 * @typedef {Object} bits
 * @property {number} minBits
 * @property {number} maxBits
 * @property {Array<obsToggling>} obsToggling 
 */

/**
 * @typedef {Object} channelPoints
 * @property {string} id
 * @property {string} name
 * @property {number} cost
 * @property {Array<obsToggling>} obsToggling 
 */

/**
 * @typedef {Object} subscriptions
 * @property {number} minSubs
 * @property {number} maxSubs
 * @property {Array<obsToggling>} obsToggling 
 */

/**
 * @typedef {Object} setObsTwitchMapType
 * @property {Array<bits>} bits
 * @property {Array<channelPoints>} channelPoints
 * @property {Array<subscriptions>} subscriptions
 */

/**
 * @callback toggleSource
 * @param {string} source the source that will be toggled off/on
 * @param {boolean} toggled the value true/false to toggle source
 * 
 * @callback changeScene
 * @param {string} scene scene to be changed
 * 
 * @callback setObsTwitchMapAndLocal
 * @param {setObsTwitchMapType} data
 * 
 * @callback startStreaming
 * @param {number} timeOffset
 * 
 * @callback handleTabChange
 * @param {number} index
 * 
 * @callback handleSaveDisabled
 * @returns {boolean} disabled
 * 
 * @callback setObsToggleData
 * @return {obsToggling}
 * 
 * @callback getObsTogglingIndex
 * @param {Array<obsToggling>} value 
 * @returns number
 *
 *
 * 
 * @type {React.Context<{
 * scenes: Array, setScenes: function, 
 * sources: Array, setSources,
 * filters: Array, setFilters,
 * obsConnected: boolean, setObsConnected,
 * obsPort: string, setOBSPort,
 * obsPassword: string, setOBSPassword,
 * sceneSelected: string, setSceneSelected,
 * sourceSelected: string, setSourceSelected,
 * sourceSelectedComplete,
 * filterSelected: string, setFilterSelected
 * connectObs: Function, disconnectObs: Function,
 * handleSceneSelection, handleSourceSelection, handleFilterSelection
 * startRecording, stopRecording: function,
 * startStreaming: startStreaming, stopStreaming: function,
 * toggleSource: toggleSource, changeScene: changeScene,
 * obsTwitchMap: setObsTwitchMapType, setObsTwitchMapAndLocal: setObsTwitchMapAndLocal
 * tabIndex: number, handleTabChange: handleTabChange
 * handleSaveDisabled: handleSaveDisabled, setObsToggleData: setObsToggleData,
 * getObsTogglingIndex: getObsTogglingIndex
 * }>}
 * 
 */
export const ObsContext = React.createContext(null);

export function ObsProvider ({children}) {
    const toast = useToast();

    // Add states below
    /**
     * @typedef {OBSWebSocket} obs — documentation for obs
     * @description Additional doc
     */
    /**
     * @typedef {Function} LoadingStateSetter — documentation for setIsLoading
     */
    /**
     * @type {[obs, LoadingStateSetter]} Loading
     */
    const [obs, setObs] = useState(null);
    const [scenes, setScenes] = useState([])
    const [sources, setSources] = useState([])
    const [filters, setFilters] = useState([])
    const [obsConnected, setObsConnected] = useState(false)
    const [ obsPort, setOBSPort ] = useState(() => {
        const saved = localStorage.getItem('obsPort');
        const initialValue = JSON.parse(saved);
        return initialValue || '4444';
    })
    const [ obsPassword, setOBSPassword ] = useState(() => {
        const saved = localStorage.getItem('obsPassword');
        const initialValue = JSON.parse(saved);
        return initialValue || '';
    })
    const [ sceneSelected, setSceneSelected ] = useState('')
    const [ sourceSelected, setSourceSelected ] = useState('')
    const [ sourceSelectedComplete, setSourceSelectedComplete ] = useState(null)
    const [ filterSelected, setFilterSelected ] = useState('')
    const [ obsTwitchMap, setObsTwitchMap] = useState(() => {
        const saved = localStorage.getItem('obsTwitchMap');
        const initialValue = JSON.parse(saved);
        // * Add extra twitch events here
        return initialValue || {
            'bits': [],
            'channelPoints': [],
            'subscriptions': []
        }
    })

    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (index) => {
        console.log('index', index)
        setTabIndex(index);
    }

    // Add useEffect below
    useEffect(() => {
        if (obs) {
            obs.on('SourceCreated', data => {
                console.log('sourceCreated', data)
            })
            obs.on('ScenesChanged', data => {
                // When scene order changed
                console.log('sceneOrderChange', data)
            })
            obs.on('SwitchScenes', data => {
                console.log('scenesSwitched', data)
            })
        } else {
            setObs(new OBSWebSocket());
        }
        

    }, [obs])

    // Add Functions below
    const setObsTwitchMapAndLocal = (data) => {
        console.log('mapData', data)
        setObsTwitchMap(data);
        localStorage.setItem('obsTwitchMap', JSON.stringify(data))
    }

    /**
   * Connect OBS Websocket and sets scenes and sources
   */
    const connectObs =  () => {
        obs.connect({address: `localhost:${obsPort}`, password: obsPassword}).then(() => {
            setObsConnected(true);
            obs.send('GetSceneList')
        .then( data => {
            setScenes(data.scenes);
        })
        toast({
            title: `OBS Connected`,
            description: 'OBS Connection has been successfully established',
            status: 'success',
            duration: 7000,
            isClosable: true
        })
        }).catch(rejected => {
            setObsConnected(false)
            setScenes([]);
            setSources([]);
            toast({
                title: `OBS Connection Unsuccessful`,
                description: 'OBS Connection has not been successfully established, verify port and password have been entered correctly in settings.',
                status: 'error',
                duration: 15000,
                isClosable: true
            })
            console.error('rejected', rejected)
        })

        
    }

    const disconnectObs = () => {
        obs.disconnect();
        setObsConnected(false);
        setScenes([]);
        setSources([]);
        setFilters([]);
        setSceneSelected('')
        setSourceSelected('')
        setSourceSelectedComplete(null)
        setFilterSelected('')

        toast({
            title: `OBS Disconnected`,
            description: 'OBS Connection has been successfully disconnected',
            status: 'success',
            duration: 7000,
            isClosable: true
        })
    }

    const handleSceneSelection = (scene) => {
        if(!scene) {
          setSceneSelected('')
          setSources([])
        } else {
          setSceneSelected(scene)
          const selectedScene =  scenes.find((s) => s.name === scene)
          console.log('sceneSelected', sceneSelected)
          console.log(selectedScene)
          setSources(selectedScene.sources)
        }
    }
    
    const handleSourceSelection = (source) => {
        console.log('source', source.value);
        setSourceSelected(source.value)
        setSourceSelectedComplete(JSON.parse(source.selectedOptions[0].dataset.source));
        getFilterBySource(source.value)
    }

    const handleFilterSelection = (filter) => {
        setFilterSelected(filter)
    }

    const getFilterBySource = (source) => {
        obs.sendCallback('GetSourceFilters', {
            sourceName: source
        }, (err, res) => {
            if(err) console.error(err)
            console.log('filters', res)
            setFilters(res.filters)
            setFilterSelected('')
        })
    } 

    const handleSaveDisabled = () => {
        // Return true if disable
        let disabled = false;
        switch(tabIndex) {
            // Cascading testing
            case 2:
                disabled = filterSelected === '' ;
            case 1: 
                disabled = sourceSelected === '' || disabled;
            case 0:
                disabled = sceneSelected === '' || disabled;
                break;
            default: 
                break;
        }
        return disabled;
    }

    // OBS Trigger Commands
    const startRecording = () => {
        console.log('startRecording')
        obs.sendCallback('StartRecording', (err) => {
            if (err) console.error(err)
        });
    }

    const stopRecording = () => {
        obs.sendCallback('StopRecording', (err) => {
            if (err) console.error(err);
        });
    }
    

    const startStreaming = (timeOffset) => {
        setTimeout(() => {
            obs.sendCallback('GetStreamSettings', (err, res) => {
                if (err) console.error(err);
                const streamOptions = res;
                obs.sendCallback('StartStreaming', {
                    stream: {
                        type: streamOptions.type,
                        settings: streamOptions.settings
                    }
                }, (err, res) => {
                    if (err) console.error(err)
                    console.log('startStreaming')
                })
            })

        }, timeOffset)
    }
    

    const stopStreaming = () => {
        obs.sendCallback('StopStreaming', (err) => {
            if (err) console.error(err);
        });
    }


    const toggleSource = (source, toggled) => {
        obs.sendCallback('SetSceneItemRender', {
            source: source,
            render: toggled
        }, (err, res) => {
        if (err) console.error(err);
        })
    }

    const changeScene = (scene) => {
        obs.sendCallback('SetCurrentScene', {
            "scene-name": scene
        }, (err, res) => {
            if (err) console.error(err)
        })
    }

    const setObsToggleData = () => {
        /**@type obsToggling */
        let tempData;
        switch(tabIndex) {
            case 0:
                tempData = {
                    type: 'Scene',
                    sceneName: sceneSelected,
                }
                break;
            case 1:
                tempData = {
                    type: 'Source',
                    sceneName: sceneSelected,
                    sourceName: sourceSelected,
                    sourceType: sourceSelectedComplete.type
                }
                if (sourceSelectedComplete.type === 'group') {
                    // TODO: Add rarity object for each child
                    tempData['sourceGroup'] = sourceSelectedComplete.groupChildren
                }
                break;
            case 2:
                tempData = {
                    type: 'Filter',
                    sceneName: sceneSelected,
                    sourceName: sourceSelected,
                    filterName: filterSelected
                }
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                break;
        }

        return tempData;
    }

    /** @type getObsTogglingIndex */
    const getObsTogglingIndex = (value) => {
        let selectedIndex = -1;
        switch(tabIndex) {
            // Scene
            case 0:
                selectedIndex = value.findIndex(f => (f.type === 'Scene' && f.sceneName === sceneSelected))
                break;
            // Source
            case 1:
                selectedIndex = value.findIndex(f => (f.type === 'Source' && f.sourceName === sourceSelected))
                break;
            // Filter
            case 2:
                selectedIndex = value.findIndex(f => (f.type === 'Filter' && f.filterName === filterSelected))
                break;
            // Streaming
            case 3:
                break;
            case 4:
                break;
            // Recording
            default:
                break;
        }

        return selectedIndex;
    }

    return (
        <ObsContext.Provider 
        // variables and functions that will be used globally
            value={
                {
                    scenes, setScenes, 
                    sources, setSources,
                    filters, setFilters,
                    obsConnected, setObsConnected,
                    obsPort, setOBSPort,
                    obsPassword, setOBSPassword,
                    sceneSelected, setSceneSelected,
                    sourceSelected, setSourceSelected,
                    sourceSelectedComplete,
                    filterSelected, setFilterSelected,
                    connectObs, disconnectObs,
                    handleSceneSelection, handleSourceSelection,
                    handleFilterSelection,
                    startRecording, stopRecording,
                    startStreaming, stopStreaming,
                    toggleSource, changeScene,
                    obsTwitchMap, setObsTwitchMapAndLocal,
                    tabIndex, handleTabChange,
                    handleSaveDisabled, setObsToggleData,
                    getObsTogglingIndex
                }
            }
        >
            {children}
        </ObsContext.Provider>
    )
}