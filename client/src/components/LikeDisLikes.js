import React,{useState, useEffect} from 'react'
import {Tooltip, Icon} from 'antd';
import Axios from 'axios';


function LikeDisLikes(props) {

    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState('')
    const [DislikeAction, setDislikeAction] = useState('')

    let variable = {}

    if(props.video){//비디오 좋아요
        variable = {videoId:props.videoId, userId:props.userId}
    }else{//댓글 좋아요
        variable = {commentId:props.commentId, userId:props.userId}
    }

    useEffect(() => {
        Axios.post('/api/getLikes', variable)
        .then(res=>{
            if(res.data.success){
                setLikes(res.data.likes.length)
                res.data.likes.map((like)=>{
                    if(like.userId === props.userId){ //나는 좋아요를 눌렀는가?
                        setLikeAction('liked')
                        return
                    }
                })
            }else{
                alert('fail to import data')
            }
        })

        Axios.post('/api/getDislikes', variable)
        .then(res=>{
            if(res.data.success){
                setDislikes(res.data.dislikes.length)
                res.data.dislikes.map((dislike)=>{
                    if(dislike.userId === props.userId){ //나는 좋아요를 눌렀는가?
                        setDislikeAction('disliked')
                        return
                    }
                })
            }else{
                alert('fail to import data')
            }
        })
    }, [])

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like" theme={LikeAction==='liked'?"filled":"outlined"} onClick
                    />
                </Tooltip>
                <span style={{paddingLeft:'8px', cursor:'auto'}}>{Likes}</span>
            </span>

            <span key="comment-basic-dislike">
                <Tooltip title="dislike">
                    <Icon type="dislike" ttheme={DislikeAction==='disliked'?"filled":"outlined"} onClick
                    />
                </Tooltip>
                <span style={{paddingLeft:'8px', cursor:'auto'}}>{Dislikes}</span>
            </span>
        </div>
    )
}

export default LikeDisLikes
