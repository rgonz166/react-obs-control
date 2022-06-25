import React, { useState } from "react";
import OBSWebSocket from "obs-websocket-js";
import { useToast } from "@chakra-ui/toast";
import { useEffect } from "react";

/**
 * @typedef {Object} setObsTwitchMapType
 * @property {Array} bits
 * @property {Array} channelPoints
 * @property {Array} subscriptions
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
 * 
 * @type {React.Context<{
 * scenes: Array, setScenes: function, 
 * sources: Array, setSources,
 * obsConnected: boolean, setObsConnected,
 * obsPort: string, setOBSPort,
 * obsPassword: string, setOBSPassword,
 * sceneSelected: string, setSceneSelected,
 * sourceSelected: string, setSourceSelected,
 * connectObs: Function, disconnectObs: Function,
 * handleSceneSelection, handleSourceSelection,
 * getSceneList, getSourcesList,
 * startRecording, stopRecording: function,
 * startStreaming: startStreaming, stopStreaming: function,
 * toggleSource: toggleSource, changeScene: changeScene,
 * obsTwitchMap: setObsTwitchMapType, setObsTwitchMapAndLocal: setObsTwitchMapAndLocal
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
    const [ obsTwitchMap, setObsTwitchMap] = useState(() => {
        const saved = localStorage.getItem('obsTwitchMap');
        const initialValue = JSON.parse(saved);
        // TODO Add extra twitch events here
        return initialValue || {
            'bits': [],
            'channelPoints': [],
            'subscriptions': []
        }
    })

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
        setSourceSelected(source)
    }

    const getSceneList = () => {
        console.log('scenes', scenes)
        return scenes;
    }
  
    const getSourcesList = () => {
        console.log('sources', sources)
        return sources;
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

    return (
        <ObsContext.Provider 
        // variables and functions that will be used globally
            value={
                {
                    scenes, setScenes, 
                    sources, setSources,
                    obsConnected, setObsConnected,
                    obsPort, setOBSPort,
                    obsPassword, setOBSPassword,
                    sceneSelected, setSceneSelected,
                    sourceSelected, setSourceSelected,
                    connectObs, disconnectObs,
                    handleSceneSelection, handleSourceSelection,
                    getSceneList, getSourcesList,
                    startRecording, stopRecording,
                    startStreaming, stopStreaming,
                    toggleSource, changeScene,
                    obsTwitchMap, setObsTwitchMapAndLocal
                }
            }
        >
            {children}
        </ObsContext.Provider>
    )
}