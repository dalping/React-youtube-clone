import Axios from 'axios'
import React,{useState} from 'react'
import {useSelector} from 'react-redux'
import SingleComment from './SingleComment';

function Comment(props) {

    const user = useSelector(state => state.user);
    const [comment, setComment] = useState("")

    const handleClick = (e) =>{
        setComment(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        const variable = {
            content:comment,
            writer:user.userData._id,//redux를 통해 _id 가져오기
            postId:props.postId//어느 동영상의 댓글인지 1)props로 넘겨받기 2)url에서 가져오기
        }

        Axios.post('/api/comment/saveComment', variable)
        .then(res => {
            if(res.data.success){
                props.refreshFunction(res.data.result)
                setComment('')
            }else{
                alert('코멘트를 저장하지 못했습니다.')
            }
        })
    }

    return (
        <div>
            <br />
            <p> Replies</p>
            <hr/>
            {props.commentLists && props.commentLists.map((comment, idx)=>(
                (!comment.responseTo && //대댓글이 아닌 경우만 출력
                    <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId}/>
                )
            ))}

            <form style={{display:'flex'}} onSubmit={onSubmit}>
                <textarea
                    style={{width:'100%', borderRadius:'5px'}}
                    onChange={handleClick}
                    value={comment}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br />
                <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submmit</button>
            </form>
        </div>
    )
}

export default Comment
