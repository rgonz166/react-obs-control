import { ObsContext } from "Contexts/ObsContext"
import { useContext } from "react"

const { Tabs, TabList, Tab, TabPanels, TabPanel } = require("@chakra-ui/react")
const React = require("react")
const { default: DropDown } = require("./DropDowns")


const ObsOptions = () => {

    const {tabIndex, handleTabChange} = useContext(ObsContext)

    return (
        <Tabs
            isFitted 
            variant='enclosed' 
            w={'75vw'} 
            paddingTop={'15px'} 
            index={tabIndex}
            onChange={handleTabChange}
        >
            <TabList>
                <Tab>Scene</Tab>
                <Tab>Source</Tab>
                <Tab>Filter</Tab>
                {/* <Tab>Streaming</Tab>
                <Tab>Recording</Tab> */}
            </TabList>
            <TabPanels>
                <TabPanel>
                    <DropDown type={'scene'} />
                </TabPanel>
                <TabPanel>
                    <DropDown type={'source'} />
                </TabPanel>
                <TabPanel>
                    <DropDown type={'filter'} />
                </TabPanel>
                {/* <TabPanel>
                    <h3>Streaming</h3>
                </TabPanel>
                <TabPanel>
                    <h3>Recording</h3>
                </TabPanel> */}
            </TabPanels>
        </Tabs>
    )

}

export default ObsOptions;