import { useEffect,useState} from 'react';
import moment from 'moment';
import axios from 'axios';
import { Typography, Card, Row, Col, Avatar } from 'antd';
import React from 'react'
const {Title} = Typography;
const {Meta} = Card;

function LandingPage() {

    const [Video, setVideo] = useState([])

    useEffect(() => {
        axios.get('/api/video/getVideo')
        .then(res => {
            if(res.data.success){
                setVideo(res.data.videos)
            }else{
                alert('fail to load video')
            }
        })
    }, [])

    const renderCards = Video.map((video,idx) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return <Col key={idx} lg={6} md={8} xs={24}> 
        <a href={`/video/${video._id}`}>
                <div style={{position:'relative'}}>
                <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />                    
                <div className="duration">
                        <span>{minutes}:{seconds}</span>
                    </div>
                </div>
            </a>
            <br />
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views}</span>
            <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>
    })

    return (
        <div style={{width:'85%', margin:'3rem auto'}}>
            <Title level={2}> Recommended </Title>
            <hr/>
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage
