import React, { useState, createContext, useContext } from "react"
import { Steps, Hints } from "intro.js-react";
import 'intro.js/introjs.css';
import 'intro.js/themes/introjs-modern.css'



export const TutorialContext = createContext(null)



export function TutorialProvider ({ children }) {
    const [enabled,setEnabled] = useState(true)
    const [enabledSettings, setEnabledSettings] = useState(true)

    const [initialStep, setInitialStep] = useState(0)
    
    

    
    const steps = [
        {
            element: '.beforewebegin',
            intro: 'Welcome, before we begin, we must set some settings first. (Make sure to tick the "Dont show this again" button)',
            position: 'left',
        }
    ]

    const stepsSettings = [
        {
            element: '.downloadthis',
            intro: 'Download this version of WebSocket for OBS and install',
            position: 'right',
        },
        {
            element: '.settings1',
            intro: 'Type in your Twitch Username, OBS Port should be 4444, and input the password that you will set on OBS Websocket. Finally, Authenticate your Twitch account to this website.',
            position: 'right'
        },
        {
            element: '.settings2',
            intro: 'Now we can click Save Settings but first, make sure to set up the connection on OBS, if you go to  Tools > Websocket Server Settings  (4.x Compat) and input the same port and password.',
            position: 'right'
        },
        {
            element: '.homebutton',
            intro: 'You should be able to connect to both OBS and Twitch now in the Home page.'
        }

    ]
    
    const introjsOptions = {
        doneLabel: "Next Page",
        skipLabel: '',
        dontShowAgain: true,
        
    }
    
    const onSettingsExit = () => {
        setEnabledSettings(false)
        document.cookie = "introjs-dontShowAgain=true; path=/;";
    }

    const onExit = () => {
        setEnabled(false)
        document.cookie = "introjs-dontShowAgain=true; path=/;";
    }

    const playAgain = () => {
        document.cookie = "introjs-dontShowAgain=false; path=/;";
        setEnabledSettings(true)
        setInitialStep(0)
        setEnabled(true)
    }
    
    return (
        <TutorialContext.Provider value={
            {
                enabled, setEnabled, 
                enabledSettings, setEnabledSettings,
                initialStep, setInitialStep,
                onExit, playAgain, 
                onSettingsExit,
                steps, stepsSettings, 
                introjsOptions
            }
        }>{children}</TutorialContext.Provider>
    )

}



