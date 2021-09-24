import React,{useState} from 'react'
import {Comment, Avatar, Button, Input} from 'antd';
import {useSelector} from 'react-redux'
import Axios from 'axios';
import LikeDisLikes from '../LikeDisLikes';

function SingleComment(props) {

    const user = useSelector(state => state.user);
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState('')
    
    const onCommentHandler = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const actions = [
        <LikeDisLikes userId={localStorage.getItem('userId')} commentId={props.comment}/>,
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to"> Reply to</span>
    ]

    const onSubmit = (e) => {
        e.preventDefault();

        const variable = {
            content:CommentValue,
            writer:user.userData._id,//redux를 통해 _id 가져오기
            postId:props.postId,//어느 동영상의 댓글인지 1)props로 넘겨받기 2)url에서 가져오기
            responseTo:props.comment._id
        }

        Axios.post('/api/comment/saveComment', variable)
        .then(res => {
            if(res.data.success){
                props.refreshFunction(res.data.result)
                setCommentValue('')
            }else{
                alert('코멘트를 저장하지 못했습니다.')
            }
        })
    }

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt/>}
                content ={<p>{props.comment.content}</p>}
            />
        {OpenReply && 
            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange={onCommentHandler}
                    value={CommentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br />
                <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submmit</button>
            </form>
        }
        </div>
    )
}

export default SingleComment
