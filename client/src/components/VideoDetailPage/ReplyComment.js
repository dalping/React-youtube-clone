import React,{useState, useEffect} from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {
    
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {
        let commentNumber = 0;
        props.commentLists.map((comment) => {
            if(comment.responseTo === props.parentCommentId){
                commentNumber ++
            }
        })

        setChildCommentNumber(commentNumber)
    }, [])

    // useEffect(() => {
    //     console.log('change!')
    // }, [OpenReplyComments])

    const renderReplyComment = (parentCommentId) => {
        console.log(parentCommentId)
        
        props.commentLists.map((comment, idx)=>(
            <p>hello</p>
        ))

        // props.commentLists.map((comment, idx) => (
        //     <React.Fragment>
        //         {
        //            comment.responseTo === parentCommentId &&
        //             <div key={idx} style={{width:'80%', marginLeft:'40px'}} >
        //                 <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId}/>
        //                 <ReplyComment commentList={props.commentLists} postId={props.postId} parentCommentId={comment._id}/>
        //             </div>
        //         }
        //     </React.Fragment>
        // ))
    }

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    return (
        <div>
        {ChildCommentNumber > 0 && //대댓글 유무 확인
            <p style ={{fontSize:'14px', margin:0, color:'grey'}} onClick={onHandleChange}>
                View {ChildCommentNumber} more comment(s)
            </p>
        }
        {OpenReplyComments && 
            renderReplyComment(props.parentCommentId)
        }
        </div>
    )
}

export default ReplyComment
