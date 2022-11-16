/* eslint-disable no-unused-vars */
/* eslint-disable no-fallthrough */
// @ts-ignore
import React, { useState, Dispatch } from "react";
// @ts-ignore
import OBSWebSocket, {SceneItem} from "obs-websocket-js";
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
 * @property {boolean} [sourceRender]
 * @property {number} [sourceTime]
 * @property {Array} [sourceGroup]
 * @property {string} [filterName]
 * @property {boolean} [filterRender]
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
 * @typedef {Object} obsTwitchMap
 * @property {setObsTwitchMapType} obsTwitchMap
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
 * @callback handleSetObsTwitchMapAndLocal
 * @param {obsTwitchMap} data
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
 * @callback handleObsToggling
 * @param {obsToggling} toggle
 * @param {string} user
 * @returns obsToggling
 * 
 * @callback handleMapEditClickFunction
 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
 *
 * @callback handleMapDeleteClickFunction
 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
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
 * sourceSelectedComplete: SceneItem,
 * filterSelected: string, setFilterSelected,
 * timed: number, setTimed,
 * randomRarity: Object, setRandomRarity: Dispatch<Object>,
 * totalPercent: number, setTotalPercent: Dispatch<number>,
 * isRandomized: boolean, setIsRandomized: Dispatch<boolean>,
 * connectObs: Function, disconnectObs: Function,
 * handleSceneSelection, handleSourceSelection, handleFilterSelection,
 * startRecording, stopRecording: function,
 * startStreaming: startStreaming, stopStreaming: function,
 * toggleSource: toggleSource,
 * obsTwitchMap: obsTwitchMap, setObsTwitchMap, handleSetObsTwitchMapAndLocal: handleSetObsTwitchMapAndLocal,
 * addChannelPoints,
 * tabIndex: number, handleTabChange: handleTabChange,
 * handleSaveDisabled: handleSaveDisabled, setObsToggleData: setObsToggleData,
 * getObsTogglingIndex: getObsTogglingIndex, handleObsToggling: handleObsToggling,
 * handleMapEditClick: handleMapEditClickFunction, handleMapDeleteClick: handleMapDeleteClickFunction
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
     * @typedef {Dispatch<OBSWebSocket>} LoadingStateSetter — documentation for setIsLoading
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
    /**@type {[SceneItem,  Dispatch<SceneItem>]} */
    const [ sourceSelectedComplete, setSourceSelectedComplete ] = useState(null)
    const [ filterSelected, setFilterSelected ] = useState('')
    const [ timed, setTimed ] = useState(0); 
    const [randomRarity, setRandomRarity] = useState({data: {}})
    const [isRandomized, setIsRandomized] = useState(false)
    const [totalPercent, setTotalPercent] = useState(0);
    /** @type {[obsTwitchMap, Dispatch<obsTwitchMap>]} */
    const [ obsTwitchMap, setObsTwitchMap] = useState(() => {
        const saved = localStorage.getItem('obsTwitchMap');
        const initialValue = JSON.parse(saved);
        // * Add extra twitch events here
        return initialValue || { obsTwitchMap: {
            'bits': [],
            'channelPoints': [],
            'subscriptions': []
        }}
    })

    /**
     * Different queue for scene, source and filter
     * Each toggle will have its own array
     */
    /**
     * @typedef {Object.<string, Array<string>>} GenericType
     * 
     * @typedef {Object} QueueMapType
     * @property {GenericType} types
     * 
     * @type {[QueueMapType, Dispatch<QueueMapType>]}
     */
    const [queueMap, setQueueMap] = useState({types: {
        sourceMap: {},
        filterMap: {}
    }});

    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (index) => {
        setTabIndex(index);
        setRandomFieldsNull();
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
    /**
     * 
     * @param {obsTwitchMap} data 
     */
    const handleSetObsTwitchMapAndLocal = (data) => {
        setObsTwitchMap({
            ...obsTwitchMap,
            obsTwitchMap: data.obsTwitchMap
        });
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
            Promise.all(
                data.scenes.map(async scene =>{
                    return Promise.all(scene.sources.map(async source => handlePromiseMediaDuration(source))).then(asyncSrc => {
                        return {
                            name: scene.name,
                            sources: asyncSrc
                        };
                    })
                })
            ).then(asyncData => {
                setScenes(asyncData)
                toast({
                    title: `OBS Connected`,
                    description: 'OBS Connection has been successfully established',
                    status: 'success',
                    duration: 7000,
                    isClosable: true
                })
            })
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
        setRandomFieldsNull();

        toast({
            title: `OBS Disconnected`,
            description: 'OBS Connection has been successfully disconnected',
            status: 'success',
            duration: 7000,
            isClosable: true
        })
    }

    const setRandomFieldsNull = () => {
        setRandomRarity({data: {}})
        setIsRandomized(false)
        setTotalPercent(0)
    };

    const handleSceneSelection = (scene) => {
        setRandomFieldsNull();
        setSourceSelectedComplete(null);
        setSources([])
        if(!scene) {
          setSceneSelected('')
        } else {
            setSceneSelected(scene)
            const selectedScene =  scenes.find((s) => s.name === scene)
            setSources(selectedScene.sources)
        }
    }

    const handlePromiseMediaDuration = async (source) => {
        const currentSourcePromise = new Promise((resolve, reject) => {
            let currentSource;
            if (source.type === 'ffmpeg_source') {
                obs.sendCallback('GetMediaDuration', {sourceName: source.name}, (err, res) => {
                    if (err) console.error(err);
                    source['time'] = res.mediaDuration;
                    currentSource = source;
                    resolve(currentSource);
                })
            } else if(source.groupChildren && source.groupChildren.length > 0) {
                currentSource = source;
                Promise.all(
                    source.groupChildren.map(async grp => handlePromiseMediaDuration(grp))
                ).then(asyncData => {
                    currentSource.groupChildren = asyncData;
                    resolve(currentSource)
                })
            } else {
                currentSource = source;
                resolve(currentSource);
            }
        });
        return currentSourcePromise;
    }
    
    const handleSourceSelection = (source) => {
        console.log('sourceSelected', source)
        setSourceSelected(source)
        setRandomFieldsNull();
        console.log('sources', sources)
        const selectedSource = sources.find((s) => s.name === source)
        console.log('selectedSource', selectedSource)
        // const sourceCompleteData = source.value ? JSON.parse(source.selectedOptions[0].dataset.source) : null;
        setSourceSelectedComplete(selectedSource);
        setTimed(selectedSource?.time ? selectedSource.time : 0);
        getFilterBySource(source)
    }

    const handleFilterSelection = (filter) => {
        setTimed(0);
        setFilterSelected(filter)
        setRandomFieldsNull();
    }

    const getFilterBySource = (source) => {
        if (source) {
            obs.sendCallback('GetSourceFilters', {
                sourceName: source
            }, (err, res) => {
                if(err) console.error(err)
                setFilters(res.filters)
                setFilterSelected('')
            })
        } else {
            setFilters([])
            setFilterSelected('')
        }
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
                disabled = true;
                break;
        }
        // CHeck if isRandomized is checked and totalPercent === 100
        disabled = (isRandomized && !(totalPercent === 100 || totalPercent === 0)) || disabled;
        return disabled;
    }

    /**
     * 
     * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event 
     */
    const handleMapEditClick = (event) => {
        console.log('event', event);
        const dataset = event['target']['dataset'];
        const currentChannelId = dataset.channelid;
        const currentToggle = JSON.parse(dataset.toggle);
        console.log('channelId', currentChannelId);
        console.log('toggle', currentToggle);
        
        handleSceneSelection(currentToggle.sceneName)
        if (currentToggle.type === 'Source' || currentToggle.type === 'Filter') {
            handleSourceSelection(currentToggle.sourceName)
            if (currentToggle.isRandom) {
                setIsRandomized(currentToggle.isRandom)
            }
        }
        if (currentToggle.type === 'Filter') {
            handleFilterSelection(currentToggle.filterName)
        }
        
    }

    /**
     * 
     * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event 
     */
    const handleMapDeleteClick = (event) => {
        const currentMap = obsTwitchMap;
        const dataset = event['target']['dataset'];
        const currentChannelId = dataset.channelid;
        const currentToggle = JSON.parse(dataset.toggle);
        
        // Find channelId
        const rewardIndex = currentMap.obsTwitchMap.channelPoints.findIndex(f => f.id === currentChannelId);
        const reward = currentMap.obsTwitchMap.channelPoints[rewardIndex];
        if (reward.obsToggling.length === 1) {
            // If there is only one then delete the whole reward
            currentMap.obsTwitchMap.channelPoints.splice(rewardIndex, 1)
        } else {
            // If there is more than one obs toggle then just delete the toggle chosen
            const toggleIndex = currentToggle.type === 'Scene' ? 
                currentMap.obsTwitchMap.channelPoints[rewardIndex].obsToggling.findIndex(o => o.sceneName === currentToggle.sceneName) :
                currentToggle.type === 'Source' ? currentMap.obsTwitchMap.channelPoints[rewardIndex].obsToggling.findIndex(o => o.sourceName === currentToggle.sourceName) :
                currentMap.obsTwitchMap.channelPoints[rewardIndex].obsToggling.findIndex(o => o.filterName === currentToggle.filterName);
            
                currentMap.obsTwitchMap.channelPoints[rewardIndex].obsToggling.splice(toggleIndex, 1);
            }

        handleSetObsTwitchMapAndLocal(currentMap);

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

    const toggleScene = (scene) => {
        obs.sendCallback('SetCurrentScene', {"scene-name": scene}, (err, res) => {
            if (err) console.error(err);
        })
    }

    const toggleSource = (source, toggled) => {
        obs.sendCallback('SetSceneItemRender', {
            source: source,
            render: toggled
        }, (err, res) => {
        if (err) console.error(err);
        })
    }

    const toggleFilter = (source, filter, toggle) => {
        obs.sendCallback('SetSourceFilterVisibility', {
            sourceName: source,
            filterName: filter,
            filterEnabled: toggle
        }, (err, res) => {
            if (err) console.error(err);
        })
    }

    const addChannelPoints = (selectedReward) => {
        const currentMap = obsTwitchMap;
        const parsedReward = JSON.parse(selectedReward)
        // Check if its the first time being added
        const rewardIndex = currentMap.obsTwitchMap.channelPoints.findIndex(f => f.id === parsedReward.id);
        if (rewardIndex === -1) {
            let initialMapItem = {
                id: parsedReward.id,
                name: parsedReward.title,
                cost: parsedReward.cost,
                obsToggling: [setObsToggleData()]
            };

            currentMap.obsTwitchMap.channelPoints.push(initialMapItem)
        } else {
            // If rewardIndex id exists, add to things to toggle
            const obsToggleIndex = getObsTogglingIndex(currentMap.obsTwitchMap.channelPoints[rewardIndex].obsToggling);
            if (obsToggleIndex === -1) {
                // If none are found then add to array
                currentMap.obsTwitchMap.channelPoints[rewardIndex].obsToggling.push(setObsToggleData())
            } else {
                // Update the data at the index
                currentMap.obsTwitchMap.channelPoints[rewardIndex].obsToggling[obsToggleIndex] = setObsToggleData();
            }
            
            
        }
        handleSetObsTwitchMapAndLocal(currentMap);
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
                    sourceType: sourceSelectedComplete.type,
                    sourceRender: sourceSelectedComplete.render,
                    timed: timed
                }
                if (sourceSelectedComplete.type === 'group') {
                    tempData['sourceGroup'] = sourceSelectedComplete.groupChildren
                    tempData.isRandom = isRandomized;
                    if (isRandomized) {
                        tempData['weighted'] = randomRarity;
                        tempData['totalPerc'] = totalPercent;
                    }
                }
                break;
            case 2:
                tempData = {
                    type: 'Filter',
                    sceneName: sceneSelected,
                    sourceName: sourceSelected,
                    filterName: filterSelected,
                    timed: timed
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


    /** @type handleObsToggling */
    const handleObsToggling = (toggle, user) => {

        switch(toggle.type) {
            case "Scene":
                toggleScene(toggle.sceneName)
                break;
            case "Source":
                // eslint-disable-next-line eqeqeq
                if (toggle.timed == 0 && !toggle.isRandom) {
                    toggleSource(toggle.sourceName, !toggle.sourceRender)
                    toggle.sourceRender = !toggle.sourceRender;
                } else {
                    checkQueueStatus('source', toggle, user)
                }
                break;
            case "Filter":
                if (toggle.timed === 0) {
                    toggleFilter(toggle.sourceName, toggle.filterName, !toggle.filterRender)
                    toggle.filterRender = !toggle.filterRender;
                } else {
                    checkQueueStatus('filter', toggle, user)
                }
                break;
            case "Start Recording":
                startRecording();
                break;
            case "Stop Recording":
                stopRecording();
                break;
            case "Start Streaming":
                startStreaming(5000);
                break;
            case "Stop Streaming":
                stopStreaming()
                break;
            default:
                break
        }
        return toggle;
    }

    /**
     * 
     * @param {'source' | 'filter'} type 
     * @param {obsToggling} toggle 
     * @param {string} user
     */
    const checkQueueStatus = (type, toggle, user) => {
        const currentMap = queueMap;
        if (type === 'source') {
            if (currentMap.types.sourceMap[toggle.sourceName]) {
                currentMap.types.sourceMap[toggle.sourceName].queueArray.push({toggleCurrent: toggle, user})
                setQueueMap({...currentMap})
                const currentActiveToggle = currentMap.types.sourceMap[toggle.sourceName];
                handleTimedToggle(currentActiveToggle);
            } else {
                // currentMap.types.sourceMap[toggle.sourceName] = {queueFlag: false, toggleName: toggle.sourceName, toggleData: toggle, queueArray: [{toggleD: toggle,user: user}], queueType: type}
                currentMap.types.sourceMap[toggle.sourceName] = {queueFlag: false, queueArray: [{toggleCurrent: toggle, user: user}], queueType: type}
                setQueueMap({...currentMap})
                const currentActiveToggle = currentMap.types.sourceMap[toggle.sourceName];
                handleTimedToggle(currentActiveToggle);
            }
        } else if (type === 'filter') {
            if (currentMap.types.filterMap[toggle.filterName]) {
                currentMap.types.filterMap[toggle.filterName].queueArray.push({toggleCurrent: toggle, user})
                setQueueMap({...currentMap})
                const currentActiveToggle = currentMap.types.filterMap[toggle.filterName];
                handleTimedToggle(currentActiveToggle);
            } else {
                currentMap.types.filterMap[toggle.filterName] = {queueFlag: false, queueArray: [{toggleCurrent: toggle, user: user}], queueType: type}
                setQueueMap({...currentMap})
                const currentActiveToggle = currentMap.types.filterMap[toggle.filterName];
                handleTimedToggle(currentActiveToggle);
            }
        }
    }

    /**
     * Failsafe if active queue is live but user is added to array
     * @param {any} queue 
     */
    const handleTimedToggle = (queue) => {
        if (!queue.queueFlag) {
            timeToggle(queue)
        }
    }

    const timeToggle = (activeQueue) => {
        // Only run if array is not empty
        //* For recursion purposes
        if (activeQueue.queueArray.length > 0) {
            activeQueue.queueFlag = true;
            const currentActiveQueue = activeQueue.queueArray.shift();
            // Initialize toggling by setting to off
            if (activeQueue.queueType === 'source') {
                if (currentActiveQueue.toggleCurrent.isRandom) {
                    /**
                     * @constant
                     * @type {Array<{time: number, perc: number, name: string}>}
                     */
                    const weightedArray = Object.values(currentActiveQueue.toggleCurrent.weighted.data);
                    if (currentActiveQueue.toggleCurrent.totalPerc === 0) {
                        const randomSelectionIndex = Math.floor(Math.random() * weightedArray.length);
                        const selectedToggle = weightedArray[randomSelectionIndex];

                        timedToggleSource(selectedToggle.name, selectedToggle.time, activeQueue);
                    } else {
                        const randomWeight = Math.floor(Math.random() * 100);
                        let addedPercent = 0;
                        const selectedToggle = weightedArray.find(f => {
                            addedPercent += f.perc;
                            return randomWeight < addedPercent;
                        });

                        timedToggleSource(selectedToggle.name, selectedToggle.time, activeQueue);
                    }
                } else {
                    timedToggleSource(currentActiveQueue.toggleCurrent.sourceName, currentActiveQueue.toggleCurrent.timed, activeQueue);
                }
            } else if (activeQueue.queueType === 'filter') {
                toggleFilter(currentActiveQueue.toggleCurrent.sourceName, currentActiveQueue.toggleCurrent.sourceName, false);
                // Let toggle turn off before turning on
                setTimeout(() => {
                    toggleFilter(currentActiveQueue.toggleCurrent.sourceName, currentActiveQueue.toggleCurrent.sourceName, true);
                    setTimeout(() => {
                        toggleFilter(currentActiveQueue.toggleCurrent.sourceName, currentActiveQueue.toggleCurrent.sourceName, false)
                        if (activeQueue.queueArray.length > 0) {
                            timeToggle(activeQueue);
                        } else {
                            activeQueue.queueFlag = false;
                        }
                    }, currentActiveQueue.toggleCurrent.timed)
                }, 500)
            }

        }
    }

    const timedToggleSource = (selectedToggleName, selectedToggleTime, activeQueue) => {
        // Turn off source in case it was previously on and wait 500 milliseconds
        toggleSource(selectedToggleName, false);
        setTimeout(() => {
            // Toggle source on and wait for the toggle time to turn off
            toggleSource(selectedToggleName, true);
            setTimeout(() => {
                toggleSource(selectedToggleName, false)
                if (activeQueue.queueArray.length > 0) {
                    timeToggle(activeQueue);
                } else {
                    activeQueue.queueFlag = false;
                }
            }, selectedToggleTime)
        }, 1000)
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
                    timed, setTimed,
                    randomRarity, setRandomRarity,
                    totalPercent, setTotalPercent,
                    isRandomized, setIsRandomized,
                    connectObs, disconnectObs,
                    handleSceneSelection, handleSourceSelection,
                    handleFilterSelection,
                    startRecording, stopRecording,
                    startStreaming, stopStreaming,
                    toggleSource,
                    obsTwitchMap, setObsTwitchMap, addChannelPoints,
                    tabIndex, handleTabChange,
                    handleSaveDisabled, setObsToggleData,
                    getObsTogglingIndex, handleObsToggling,
                    handleSetObsTwitchMapAndLocal,
                    handleMapEditClick, handleMapDeleteClick
                }
            }
        >
            {children}
        </ObsContext.Provider>
    )
    /**
     * TODO:
     * Stress test queue logic
     * Add: edit and delete buttons to array
     */
}
