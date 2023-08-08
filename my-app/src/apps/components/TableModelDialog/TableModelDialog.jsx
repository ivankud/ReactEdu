
import React, {useState,useEffect} from 'react';

// import styles from './TableModelDialog.module.css';


import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Button} from '..'
import config_app from '../../../data/config_app';

import { SwaggerAPITree } from '..';

const TableModelDialog = (props)=> {
  
  const [swaggerData,setSwaggerData] = useState({})
  const [selectedModel, setSelectedModel] = useState(props.model)
  const [isLaoded, setIsLoaded] = useState(false)
  
  let apiUrl = config_app.projects.filter(item=>item.name==='kamaz')[0]['swagger-path']
  useEffect(()=>{
    fetch(apiUrl,{method:"get"})
    .then(async resolve=>{
      setSwaggerData(await resolve.json())
      setIsLoaded(true)
    })
    .catch(reject=>{})  
  },[])    

    return (
      <div>
        <Modal isOpen={props.modal} toggle={props.toggle} >
          {Object.keys(selectedModel).join(',')}
          <ModalHeader toggle={props.toggle}>{Object.keys(selectedModel).length>0 ?selectedModel["title"]:'Выбирите модель'} </ModalHeader>
          <ModalBody>
            {isLaoded&&<SwaggerAPITree data_objects={swaggerData} selectedModel={selectedModel} setSelectedModel={setSelectedModel}/>}
          </ModalBody>
          <ModalFooter className='d-flex justify-content-between'>
            <Button color="info" onClick={()=>{
              props.changeModel()
              props.toggle()
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