import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NamepageCSS from './NamepageCSS.module.css'

const Namepage = () => {
    const [name, setName] = useState('')

    function inputChange(e) {
        let value = e.target.value;
        
        if (value.length<=2){
            value = value.trim()
        }

        if (value.length<=25){
            setName(value)
        }
    }
    function onClickHandler() {
        if(name !== ''){
            localStorage.setItem('username', name)
        }
    }



    return (
        <div className={`container ${NamepageCSS.container}`}>
            <div className={`card ${NamepageCSS.card}`}>
                <h1 className={NamepageCSS.h1}>What's Your Name?</h1>
                <form>
                    <input type="text" required={true} onChange={inputChange} value={name} className={`form-control mt-2 mb-3 ${NamepageCSS.input}`} placeholder="Enter your name" spellCheck="false" />
                    {name !== '' ?
                        (<Link to='/main'>
                            <button type="submit" onClick={onClickHandler} className={`btn btn-primary ${NamepageCSS.btn}`}>Remember Me</button>
                        </Link>)
                        : <button type="submit" onClick={onClickHandler} className={`btn btn-primary ${NamepageCSS.btn}`}>Remember Me</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default Namepage
