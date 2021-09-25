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

    const onLike = () => {
        if(LikeAction === null){
            Axios.post('/api/like/upLike', variable)
            .then(res => {
                if(res.data.success){
                    setLikes(Likes + 1)
                    setLikeAction('liked')

                    if(DislikeAction !== null){ //이미 싫어요가 눌러져 있었다면
                        setDislikeAction(null)
                        setDislikes(Dislikes - 1)
                    }
                }else{
                    alert('fail to up Like')
                }
            })
        } else { //이미 클릭이 되어 있다면 좋아요를 취소
            Axios.post('/api/like/unLike', variable)
            .then(res => {
                if(res.data.success){
                    setLikeAction(Likes - 1)
                    setLikeAction(null)
                }else{
                    alert('라이크를 내리지 못하였습니다.')
                }
            })
        }
    }

    const onDislike = () => {
        if(DislikeAction === null){
            Axios.post('/api/like/upDislike', variable)
            .then(res => {
                if(res.data.success){
                    setDislikes(Dislikes + 1)
                    setDislikeAction('disliked')

                    if(LikeAction !== null){ //이미 싫어요가 눌러져 있었다면
                        setLikeAction(null)
                        setLikes(Likes - 1)
                    }
                }else{
                    alert('fail to up Like')
                }
            })
        } else { //이미 클릭이 되어 있다면 좋아요를 취소
            Axios.post('/api/like/unDislike', variable)
            .then(res => {
                if(res.data.success){
                    setDislikeAction(Dislikes - 1)
                    setDislikeAction(null)
                }else{
                    alert('디스라이크를 내리지 못하였습니다.')
                }
            })
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like" theme={LikeAction==='liked'?"filled":"outlined"} onClick ={onLike}
                    />
                </Tooltip>
                <span style={{paddingLeft:'8px', cursor:'auto'}}>{Likes}</span>
            </span>

            <span key="comment-basic-dislike">
                <Tooltip title="dislike">
                    <Icon type="dislike" ttheme={DislikeAction==='disliked'?"filled":"outlined"} onClick={onDislike}
                    />
                </Tooltip>
                <span style={{paddingLeft:'8px', cursor:'auto'}}>{Dislikes}</span>
            </span>
        </div>
    )
}

export default LikeDisLikes
