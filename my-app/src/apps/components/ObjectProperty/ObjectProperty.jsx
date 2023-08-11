import React, {useState,useEffect} from 'react';

import styles from './ObjectProperty.module.css';


import {TableModelDialog} from '../'

// import { Input, Form } from 'reactstrap';

import config_app from '../../../data/config_app';

const ObjectProperty = (props)=> {
    // console.log('props.block',props.block)
    const [model,setModel] = useState({})
    let inputPropertyName = Object.keys(props.property)[0]; 
    let inputValue = JSON.stringify(props.property[inputPropertyName], null,4);
    const [modal, setModal] = useState(false)
    const changeModal =()=>{
      setModal(!modal)
    }
    const [swaggerData,setSwaggerData] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    
    const changeModel=(vModel)=>{
      let tmpModel = []
      Object.keys(vModel["properties"]).forEach(modelField=>{
        tmpModel.push({"name":vModel["properties"][modelField]['description'], "field":modelField,"type":vModel["properties"][modelField]['type']})
      })
      setModel(vModel)      
      let val = JSON.stringify(tmpModel);
      props.setProperty(inputPropertyName,val)
    }
    const [modelPropertiesList,setModelPropertiesList] = useState(Object.keys(props.property)[0]!=='model')
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
            <div className={styles['ObjectProperty']}>
                <div className={styles['ObjectProperty_head']}>
                {Object.keys(props.property)[0]==='model'&&<button style={{background:'none', border:'none',padding: '0px'}} onClick={changeModal}>{Object.keys(props.property)[0]}</button>}
                {Object.keys(props.property)[0]!=='model'&&Object.keys(props.property)[0]}
                </div>
                <div className={styles['ObjectProperty_value']}>
                    {modelPropertiesList===false
                        ?
                            <textarea           
                                className={styles['ObjectProperty_textarea']}   
                                disabled={ 
                                    props.block===true
                                } 
                                value={inputValue} 
                                onChange={
                                    (e)=>{
                                        let val = e.target.value;
                                        val = JSON.stringify(e.target.value);
                                        val = JSON.stringify(JSON.parse(e.target.value));
                                        props.setProperty(inputPropertyName,val)
                                    }
                                }
                            />
                        :
                            <textarea           
                                className={styles['ObjectProperty_textarea']}   
                                disabled={ 
                                    props.block===true
                                } 
                                value={inputValue} 
                                onChange={
                                    (e)=>{
                                        let val = e.target.value;
                                        val = JSON.stringify(e.target.value);
                                        val = JSON.stringify(JSON.parse(e.target.value));
                                        props.setProperty(inputPropertyName,val)
                                    }
                                }
                            />
                    }
                </div>
            </div>
            {modal&&<TableModelDialog modal={modal} toggle={changeModal} model={model} changeModel={changeModel}/>}
        </div>
    )
}

export default ObjectProperty;