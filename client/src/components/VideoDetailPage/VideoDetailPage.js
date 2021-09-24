import React,{useEffect,useState} from 'react'
import {Row, Col, List, Avatar} from 'antd'
import Axios from 'axios'
import SideVideo from './SideVideo'
import Subscribe from './Subscribe'
import Comment from './Comment'
import LikeDisLikes from '../LikeDisLikes'

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId
    const variable = { videoId : videoId}
    const [Video, setVideo] = useState([])
    const [Comments, setComments] = useState([])

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
        .then(res => {
            if(res.data.success){
                setVideo(res.data.videoDetail)
            }else{
                alert('fail')
            }
        })

        Axios.post('/api/comment/getComments', variable)
        .then(res=>{
            if(res.data.success){
                setComments(res.data.comments)
                console.log(res.data.comments)
            } else {
                alert("코멘트 정보를 가져오는 것을 실패 하였습니다.")
            }
        })


    }, [])

    const refreshFunction = (newComment) => { //onSubmit으로 도착한 댓글 추가
        setComments(Comments.concat(newComment))
    }

    if(Video.writer){
    return (
        <Row gutter={[16,16]}>
            <Col lg={18} xs={24}>
            <div style={{width:'100%', padding:'3rem 4rem'}}>
                <video style={{width:'100%'}} src={`http://localhost:5000/${Video.filePath}`} controls/>
                <List.Item //동영상 게시자 정보
                    actions={[<LikeDisLikes video userId={localStorage.getItem('userId')} videoId={videoId}/>,<Subscribe userTo={Video.writer} userFrom={localStorage.getItem('userId')}/>]}
                >
                    <List.Item.Meta
                        avatar={<Avatar src={Video.writer.image}/>}
                        title = {Video.writer.name}
                        description = {Video.description}
                    />

                </List.Item>
                <Comment refreshFunction={refreshFunction} commentLists={Comments} postId={videoId}/>
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
