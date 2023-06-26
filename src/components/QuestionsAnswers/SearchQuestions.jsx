import React from 'react';
import {useState, useEffect} from 'react'
import QAList from './QAList.jsx'
import {useSelector} from 'react-redux'

const SearchQuestions = () => {

  const [input,setInput] = useState('')
  const [message, setMessage] = useState(input)

  const search = (e) => {
    setInput(e.target.value)
  }

  const handleEvent = (e) => {
    e.preventDefault()
    setMessage(input)
    console.log('successfuly clicked and submitted',input)
  }

if(message === ''){

  return(
    <>
   <label>
    HAVE A QUESTION? SEARCH FOR ANSWERS...
    <input type ='text' onChange = {search}></input>
    <button onClick = {handleEvent}>Search Icon</button>
   </label>
  <QAList/>
   </>
  )

} else {

  return(
    <>
   <label>
    HAVE A QUESTION? SEARCH FOR ANSWERS...
    <input type ='text' onChange = {search}></input>
    <button onClick = {handleEvent}>Search Icon</button>
   </label>
  <QAList input = {input}/>
   </>
  )
}

}
export default SearchQuestions