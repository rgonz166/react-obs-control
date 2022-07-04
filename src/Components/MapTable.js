import React, { useContext } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ObsContext } from "Contexts/ObsContext";
const MapTable = () => {

    const { obsTwitchMap } = useContext(ObsContext)

    return (
        <>
        <DataTable value={obsTwitchMap.obsTwitchMap.channelPoints} >

        </DataTable>
        </>
    )

}

export default MapTable;