import React, {useState/*, useEffect*/} from 'react';


import { AgGridReact } from 'ag-grid-react'; 
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import styles from './Table.module.css';

const Table = (props)=> {
    let tempModel = [
        {
            "name": "field1",
            "field": "id"
        },
        {
            "name": "field2",
            "field": "scaption"
        },
        {
            "name": "field3",
            "field": "smnemocode"
        }
    ] // модель если она не задана
    const [rowData] = useState( // формирование временного заполнения таблицы
        ['Строка1', 'Строка2', 'Строка3'].map(row=>{
                if(props.model) {
                    let vRow = {}
                    props.model.forEach(item=>{
                        vRow[item['name']] = row+'.'+item.field
                    })
                    return vRow;
                }
                else {
                    let vRow = {}
                    tempModel.forEach(item=>{
                        vRow[item['name']] = row+'.'+item.field
                    })
                    return vRow;
                }
            }
        )
    )
    
  const [columnDefs] = useState(props.model?props.model.map(item=>{return {field: item["name"]}}):tempModel.map(item=>{return {field: item["name"]}}));
    return (
            <AgGridReact style={props.style}
                rowData={rowData}
                columnDefs={columnDefs}>
            </AgGridReact>
    )
}

export default Table;