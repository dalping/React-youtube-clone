import React,{useEffect,useState} from 'react'
import {Row, Col, List, Avatar} from 'antd'
import Axios from 'axios'
import SideVideo from './SideVideo'
import Subscribe from './Subscribe'

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId
    const variable = { videoId : videoId}
    const [Video, setVideo] = useState([])

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
        .then(res => {
            if(res.data.success){
                setVideo(res.data.videoDetail)
            }else{
                alert('fail')
            }
        })
    }, [])

    if(Video.writer){
    return (
        <Row gutter={[16,16]}>
            <Col lg={18} xs={24}>
            <div style={{width:'100%', padding:'3rem 4rem'}}>
                <video style={{width:'100%'}} src={`http://localhost:5000/${Video.filePath}`} controls/>
                <List.Item
                    actions={[<Subscribe userTo={Video.writer} userFrom={localStorage.getItem('userId')}/>]}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={Video.writer.image}/>}
                        title = {Video.writer.name}
                        description = {Video.description}
                        />

                </List.Item>
            </div>
            </Col>
            <Col lg={6} xs={24}>
                <SideVideo/>
            </Col>
        </Row>
    )
    } else{
        return <div>Loading...</div>
    }
}

export default VideoDetailPage
