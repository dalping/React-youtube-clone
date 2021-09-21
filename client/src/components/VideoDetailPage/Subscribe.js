import Axios from 'axios'
import React,{useEffect, useState} from 'react'

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0)
    const [Subscribed, setSubscribed] = useState(false)
    
    useEffect(() => {
    
        let variable = {
            userTo: props.userTo
        }
    
        Axios.post('/api/subscribe/subscribeNumber', variable)
        .then(res=>{
            if(res.data.success){
                setSubscribeNumber(res.data.subscribeNumber)
            }else{
                alert('구독자 수 정보를 받아오지 못했습니다.')
            }
        })

        let subscribedVariable = {
            userTo : props.userTo,
            userFrom : localStorage.getItem('userId')
        }

        Axios.post('/api/subscribe/subscribed', subscribedVariable) //내가 해당 유저를 구독하는지?
        .then(res =>{
            if(res.data.success){
                setSubscribed(res.data.subscribed)
                console.log(Subscribed)
            }else{
                alert('구독 여부를 받아오지 못했습니다.')
            }
        })

    }, [SubscribeNumber,Subscribed])

    const onSubscribe = () => {

        let subscribeVariable = {
            userTo : props.userTo,
            userFrom : props.userFrom
        }

        if(Subscribed){
            Axios.post('/api/subscribe/unSubscribe', subscribeVariable)
            .then(res=>{
                if(res.data.success){
                    setSubscribeNumber(SubscribeNumber - 1)
                    setSubscribed(!Subscribed)
                }else{
                    alert('fail')
                }
            })
        }else{
            Axios.post('/api/subscribe/subscribe', subscribeVariable)
            .then(res=>{
                if(res.data.success){
                    setSubscribeNumber(SubscribeNumber + 1)
                    setSubscribed(!Subscribed)
                }else{
                    alert('fail')
                }
            })
        }
    }

    return (
        <div>
            <button className="subscribeBtn" 
            style={{backgroundColor:`${Subscribed?'gray':'#CC0000'}`}}
            onClick={onSubscribe}>
                {SubscribeNumber} {Subscribed?'Subscribed':'Subscribe'} 
            </button>
        </div>
    )
}

export default Subscribe
