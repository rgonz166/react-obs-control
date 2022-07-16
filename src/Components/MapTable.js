import React, { useContext } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ObsContext } from "Contexts/ObsContext";


const MapTable = () => {

    const { obsTwitchMap } = useContext(ObsContext)

    return (
        <>
        <DataTable value={obsTwitchMap.obsTwitchMap.channelPoints} rowGroupMode="subheader" groupRowsBy="name"
            sortMode="single" sortField="name" sortOrder={1} scrollable scrollHeight="400px"
            responsiveLayout="scroll">
            <Column field="name" header="Name" style={{ minWidth: '200px' }}></Column>
            <Column field="cost" header="Cost" style={{ minWidth: '200px' }}></Column>
            {/* <Column field="country" header="Country" body={countryBodyTemplate} style={{ minWidth: '200px' }}></Column>
            <Column field="company" header="Company" style={{ minWidth: '200px' }}></Column>
            <Column field="status" header="Status" body={statusBodyTemplate} style={{ minWidth: '200px' }}></Column>
            <Column field="date" header="Date" style={{ minWidth: '200px' }}></Column> */}
        </DataTable>
        </>
    )

}

export default MapTable;