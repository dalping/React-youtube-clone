import React,{useState} from 'react'
import {Typography, Button, Form, message, Input, Icon} from 'antd';
import DropZone from 'react-dropzone';

import axios from 'axios';

const {Title} = Typography;
const {TextArea} = Input;

const PrivateOption = [
    {value:0, label:"Private"},
    {value:1, label:"Public"}
]

const CategoryOption = [
    {value:0, label:"Film & Animation"},
    {value:1, label:"Auto & Vehicles"},
    {value:2, label:"Music"},
    {value:3, label:"Pets & Animals"}
]

function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")

    function onTitleChange(e){
        setVideoTitle(e.target.value);
    }
    
    function onDescriptionChange(e){
        setDescription(e.target.value);
    }

    function onPrivateChange(e){
        setPrivate(e.currentTarget.value);
    }

    function onCategoryChange(e){
        setCategory(e.currentTarget.value);
    }

    function onDrop(files){ 
        let formData = new FormData;
        const config={ //에러 방지 
            header:{'content-type' : 'multipart/form-data'}
        }
            formData.append("file", files[0])
            
            axios.post('/api/video/uploadfiles', formData, config) //서버에 리퀘스트 보내기
            .then(response => {
                if(response.data.success){ //동영상 업로드 성공!
                    console.log(response.data)

                    let variable = {
                        filePath: response.data.filePath,
                        fileName: response.data.fileName
                    }

                    //setFilePath(response.data.filePath)

                    console.log('hello world!');

                    //썸네일 생성 //err..
                    axios.post('/api/video/thumbnail', variable)
                    .then(response => {
                        if(response.data.success){
                        }else{
                            console.log(response);
                            alert("썸네일 생성에 실패했습니다.")
                        }
                    })

                }else{
                    console.log(response);
                    alert('비디오 업로드를 실패했습니다.')
                }
            }) 
        }       
   
    return (
        <div style={{maxWidth:'700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
            <Title level={2}>Upload Video</Title>
            </div>
            <div>

            <Form onSubmit>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <DropZone
                        onDrop = {onDrop}
                        multiple = {false}
                        maxSize = {800000000}>
                            {({getRootProps, getInputProps}) => (
                            <div style={{ width: '300px', height:'240px', border:'1px solid lightgray',
                            display:'flex',alignItems:'center', justifyContent:'center'}}{...getRootProps()}>
                            <input {...getInputProps()}/>
                            <Icon type='plus' style={{fontSize:'3rem'}} />
                            </div>
                        )}
                        </DropZone>
                    </div>
                    <div>
                        <img src alt/>
                    </div>

                    <br/>
                    <br/>
                    <label>Title</label>
                    <Input 
                        onChange={onTitleChange}
                        value={VideoTitle}
                    />
                    <br/>
                    <br/>
                    <label>Description</label>
                    <TextArea
                        onChange={onDescriptionChange}
                        value = {Description}
                    />
                    <br/>
                    <br/>
                    <select onChange={onPrivateChange}>
                        {PrivateOption.map((item,index) =>(
                            <option key={index} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    <br/>
                    <br/>
                    <select onChange={onCategoryChange}>
                        {CategoryOption.map((item,index) =>(
                            <option key={index} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    <br/>
                    <br/>
                    <Button type="primary" size="large" onClick>
                        Submit
                    </Button>

                    
                </Form>
            </div>
        </div>
    )
}

export default VideoUploadPage
