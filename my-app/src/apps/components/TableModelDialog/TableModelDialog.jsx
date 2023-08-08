
import React, {useState,useEffect} from 'react';

// import styles from './TableModelDialog.module.css';


import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Button} from '..'
import config_app from '../../../data/config_app';
import swagger_date_temp from '../../../data/jsonobject_swagger_temp'

import { SwaggerAPITree } from '..';

const TableModelDialog = (props)=> {
  
  const [swaggerData,setSwaggerData] = useState(JSON.parse(JSON.stringify(swagger_date_temp)))
  const [selectedModel, setSelectedModel] = useState(props.model)
  const [isLaoded, setIsLoaded] = useState(true)
  
  let apiUrl = config_app.projects.filter(item=>item.name==='kamaz')[0]['swagger-path']
  // setSwaggerData()
  // setIsLoaded(true)
  useEffect(()=>{
    // fetch(apiUrl,{method:"get"})
    // .then(async resolve=>{
    //   setSwaggerData(await resolve.json())
    //   setIsLoaded(true)
    // })
    // .catch(reject=>{
    //   setSwaggerData(JSON.parse(JSON.stringify(swagger_date_temp)))
    //   setIsLoaded(true)
    // })  
  },[])    

    return (
      <div>
        <Modal isOpen={props.modal} toggle={props.toggle} >
          <ModalHeader toggle={props.toggle}>{Object.keys(selectedModel).length>0 ?selectedModel["title"]:'Выбирите модель'} </ModalHeader>
          <ModalBody>
            {isLaoded&&<SwaggerAPITree data_objects={swaggerData} selectedModel={selectedModel} setSelectedModel={setSelectedModel}/>}
          </ModalBody>
          <ModalFooter className='d-flex justify-content-between'>
            <Button color="info" onClick={()=>{
              props.changeModel(selectedModel)
              props.toggle(props.modal)
            }}>
              Выбрать
            </Button>{' '}
            <Button color="secondary" onClick={props.toggle}>
              Отмена
            </Button>
          </ModalFooter>
        </Modal>
        
      </div>
    )
}

export default TableModelDialog;