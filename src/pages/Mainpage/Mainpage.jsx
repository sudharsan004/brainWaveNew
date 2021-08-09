import React, { useEffect, useRef, useState } from 'react'
import MainpageCSS from './MainpageCSS.module.css'
import 'react-circular-progressbar/dist/styles.css'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import firebase from '../../utils/firebase'
import loader from "../../Assets/loader.gif"
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon } from "react-share";
import ShareIcon from "@material-ui/icons/Share";
import './style.css'

// import Fab from "@material-ui/core/Fab";
// import Zoom from "@material-ui/core/Zoom";


const Mainpage = () => {
    // State for Counter
    const [counter, setCounter] = useState('')
    const [selectedImgColor, setSelectedImgColor] = useState(["#eeeeee", "#eeeeee", "#eeeeee", "#eeeeee"])
    const [msg, setMsg] = useState('JUDGYFACE');
    const [data, setData] = useState([])
    const [images, setImages] = useState([])
    const [votes, setVotes] = useState([0, 0, 0, 0])
    const [selectedImgNo, setSelectedImgNo] = useState('')
    const [dbvotes, setdbvotes] = useState([0, 0, 0, 0])
    const [prevq, setprevq] = useState([])
    const [display, setDisplay] = useState([0, 0, 0, 0])
    const [selected, setSelected] = useState(false)
    const [share, setShare] = useState(false)
    const [click, setClick] = useState(false)
    const [sum, setSum] = useState(0);
    const [toggle, setToggle] = useState(true);
    const initial = useRef(true);


    const imgurl = "https://thumb.fakeface.rest/thumb_"


    // Local Storage
    var uname = localStorage.getItem('username')


    // getCounter() updates count and question no
    function getCounter() {
        var d = new Date();
        // d.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' })
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        // var now_utc = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(),  d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
        // var sd = new Date(now_utc.getTime() + offset);
        var secondsUntilEndOfDate = 24 * 60 * 60 - h * 60 * 60 - m * 60 - s;
        var questionNo = Math.trunc(secondsUntilEndOfDate / 20)
        var remainder = (secondsUntilEndOfDate % 20)
        if (h === 0) {
            questionNo = (questionNo * d.getUTCDate()) % 3000

        }
        else {
            questionNo = (questionNo * h * d.getUTCDate()) % 3000
            // alert(d)

        }
        return [questionNo, remainder, h, m, s]
    }


    // update the data to the database
    // function updateDataBase() {
    //     var qNo = getCounter()[0]
    //     console.log(votes)
    //     var v = votes.slice()
    //     v[selectedImgNo] += 1;
    //     const ref = firebase.database().ref('data').child(qNo);
    //     ref.update({
    //         ...data,
    //         "votes": v
    //     })
    // }

    function updateDataBase() {
        var qNo = getCounter()[0]
        firebase.database().ref('data').child(qNo).child('votes').child(selectedImgNo)
            .set(firebase.database.ServerValue.increment(1))
        // ref.on('value',s=>console.log(s.val()))

        // ref.update({
        //     ...data,
        //     "votes": votes
        // })

    }
    // fetch data - first render
    useEffect(() => {
        prev()
        setMsg("JUDGYFACE")
        var qNo = getCounter()[0]
        const ref = firebase.database().ref('data').child(qNo);
        // const refr = firebase.database().ref('data').child(qNo).child('votes').child('0');
        // refr.on('value',(s)=>{console.log(s.val())})
        ref.on('value', (snapshot) => {
            const all = snapshot.val();
            console.log(all)
            setVotes(all.votes)
            setdbvotes(all.votes)
            setData(all);
            setImages(all.images)
        });
    }, []);

    // function to update local Data from db
    function updateData() {
        var qNo = getCounter()[0]
        const ref = firebase.database().ref('data').child(qNo);
        ref.on('value', (snapshot) => {
            const all = snapshot.val();
            setVotes(all.votes)
            console.log('t', all.votes)
            setdbvotes(all.votes)
            setData(all);
            setImages(all.images)
        });
    }

    // useEffect for the timer
    useEffect(() => {
        setInterval(() => {
            let remainder = getCounter()[1];
            var res = getCounter()
            setCounter(remainder);
            // setMsg(res)
            // console.log(votes)
        }, 1000)
    }, [])

    // when user selects an image
    function handleClick(e) {
        // if selecting for first time i,e new image
        if (!selected) {
            var target = e.target
            var img_no = target.alt
            var colors = ["#eeeeee", "#eeeeee", "#eeeeee", "#eeeeee"]
            setSelectedImgColor(p => { colors[img_no] = "#a6bef7"; return colors })
            setMsg("result in last 5 Secs");
            var v = [0, 0, 0, 0]
            // setVotes(prev => { v[img_no] += 1; return v })
            setSelectedImgNo(img_no)
            // updateDataBase()

            setClick(true)
        }
    }

    // function handleClick(e) {
    //     if (!selected) {
    //         var target = e.target
    //         var img_no = target.alt
    //         setSelectedImgColor(p => { p[img_no] = "#a6bef7"; return p })
    //         setSelected(true)
    //         setMsg("result in last 5 Secs");
    //         setVotes(prev => { prev[img_no] += 1; return prev })
    //         setClick(true)
    //     }
    // }
    // trigger update database when user selects an image
    useEffect(() => {
        if (initial.current) {
            initial.current = false;
        }
        else {
            if (click === true) {
                // updateDataBase()  
                setSum(votes.reduce((a, b) => {
                    return (a + b)
                }, 0))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [click])

    // useEffect to set several state variables as per timer
    useEffect(() => {
        if (initial.current) {
            initial.current = false;
        }
        else {
            if (counter === 19) {
                // setSelectedImgNo('')
                setMsg('JUDGYFACE')
                setDisplay([0, 0, 0, 0])
                updateData()
                setSelected(false)
            }
            if (counter === 0) {
                setClick(false)
                setVotes([0, 0, 0, 0])
                prev()
                // setSelected(false)
            }
            // if (counter === 6 && click) {
            //     // console.log(selectedImgNo)
            //     // setVotes(prev => { prev[selectedImgNo] += 1; return prev })
            //     // updateDataBase()
            //     // updateData()
            // }
            if (counter == 6 && click) {
                updateDataBase()
                setSelected(true)
            }
            if (counter <= 5) {
                if (true) {
                    // console.log(votes)
                    setSum(votes.reduce((a, b) => {
                        return (a + b)
                    }, 0))
                    setSelectedImgColor(["#eeeeee", "#eeeeee", "#eeeeee", "#eeeeee"])
                    setDisplay(votes)
                    // console.log(dbvotes)
                    setMsg('Result')
                    updateData()
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [click, counter])


    function prev() {

        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var s = d.getSeconds();
        var secondsUntilEndOfDate = 24 * 60 * 60 - h * 60 * 60 - m * 60 - s;
        var questionNos = []
        for (let q = 1; q < 11; q++) {
            var questionNo = Math.trunc(secondsUntilEndOfDate / 20)
            if (h === 0) {
                questionNo = (questionNo * d.getUTCDate()) % 3000
            }
            else {
                questionNo = (questionNo * h * d.getUTCDate()) % 3000
            }
            const ref = firebase.database().ref('data').child(questionNo);
            ref.on('value', (snapshot) => {
                const all = snapshot.val();
                questionNos.push(all)
            })
            secondsUntilEndOfDate += 20
        }
        // console.log(questionNos)
        setprevq(questionNos)
    }



    // JSX
    return (
        <>




            <div className={`container ${MainpageCSS.container}`}>
                {/* <button className="btn btn-primary" onClick={setToggle(p=>!p)}>toggle</button> */}
                {toggle ?
                    (
                        <div className={`card ${MainpageCSS.card}`} >
                            {/* Greetings */}
                            <p className={MainpageCSS.user}>
                                Hey, {uname}
                            </p>

                            {/* Question */}
                            <span className={MainpageCSS.txtspan}>
                                <h4 className={MainpageCSS.h1}>{data.question}</h4>
                            </span>

                            {/* first row of images (0 and 1) */}
                            <div className="row">
                                <div className="col-6">
                                    <div className={MainpageCSS.imgdiv}>
                                        <CircularProgressbarWithChildren value={display[0]}
                                            maxValue={sum ? sum : 1}
                                            styles={{
                                                path: {
                                                    // Path color
                                                    stroke: `#ff808c`
                                                },
                                                trail: {
                                                    // Trail color
                                                    stroke: selectedImgColor[0],
                                                },

                                            }}>
                                            <img src={imgurl + images[0]} alt="0" onClick={handleClick} onError={e => e.target.src = loader} className={MainpageCSS.img} draggable="false" />
                                        </CircularProgressbarWithChildren>

                                        {(counter <= 5) &&
                                            <span className={MainpageCSS.overlay}>
                                                <p className={MainpageCSS.percentage}>{sum ? (Math.round((display[0] / sum) * 100)) : 0}%</p>
                                            </span>
                                        }

                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className={MainpageCSS.imgdiv}>
                                        <CircularProgressbarWithChildren value={display[1]}
                                            maxValue={sum ? sum : 1}
                                            styles={{
                                                path: {
                                                    // Path color
                                                    stroke: `#9180ff`
                                                },
                                                trail: {
                                                    // Trail color
                                                    stroke: selectedImgColor[1],
                                                }
                                            }}>
                                            <img src={imgurl + images[1]} alt="1" onClick={handleClick} onError={e => e.target.src = loader} className={MainpageCSS.img} draggable="false" />
                                        </CircularProgressbarWithChildren>
                                        {(counter <= 5) &&
                                            <span className={MainpageCSS.overlay}>
                                                <p className={MainpageCSS.percentage}>{sum ? (Math.round((display[1] / sum) * 100)) : 0}%</p>
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>

                            {/* counter */}
                            <span className={MainpageCSS.span}>
                                <p className={MainpageCSS.counter}>{('0' + counter).slice(-2)}</p>
                            </span>

                            {/* second line of images (2 and 3) */}
                            <div className="row mt-4">
                                <div className="col-6">
                                    <div className={MainpageCSS.imgdiv}>
                                        <CircularProgressbarWithChildren value={display[2]}
                                            maxValue={(sum) ? sum : 1}
                                            styles={{
                                                path: {
                                                    // Path color
                                                    stroke: `#84db92`
                                                },
                                                trail: {
                                                    // Trail color
                                                    stroke: selectedImgColor[2],
                                                }
                                            }}>
                                            <img src={imgurl + images[2]} alt="2" onClick={handleClick} onError={e => e.target.src = loader} className={MainpageCSS.img} draggable="false" />
                                        </CircularProgressbarWithChildren>
                                        {(counter <= 5) &&
                                            <span className={MainpageCSS.overlay}>
                                                <p className={MainpageCSS.percentage}>{sum ? (Math.round((display[2] / sum) * 100)) : 0}%</p>
                                            </span>
                                        }
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className={MainpageCSS.imgdiv}>
                                        <CircularProgressbarWithChildren value={display[3]}
                                            maxValue={sum ? sum : 1}
                                            styles={{
                                                path: {
                                                    // Path color
                                                    stroke: `#f2dc5e`
                                                },
                                                trail: {
                                                    // Trail color
                                                    stroke: selectedImgColor[3],
                                                }
                                            }}>
                                            <img src={imgurl + images[3]} alt="3" onClick={handleClick} onError={e => e.target.src = loader} className={MainpageCSS.img} draggable="false" />
                                        </CircularProgressbarWithChildren>
                                        {(counter <= 5) &&
                                            <span className={MainpageCSS.overlay}>
                                                <p className={MainpageCSS.percentage}>{sum ? (Math.round((display[3] / sum) * 100)) : 0}%</p>
                                            </span>
                                        }
                                    </div>
                                </div>
                            </div>
                            <p className={MainpageCSS.p}> <b>{msg}</b>
                                {/* <Zoom in={true}> */}
                                {/* <Fab >  */}
                                {/* {<ShareIcon onClick={() => { setShare(true) }} />} */}
                                {/* </Fab> */}
                                {/* </Zoom> */}
                                <br /><br />
                                {5 ?
                                    (<><FacebookShareButton
                                        url={"https://judgyface.com"}
                                        quote={"Judging people"}
                                        hashtag={"#gaming"}
                                        description={"dsc"}
                                        className="share-button"
                                    >
                                        <FacebookIcon size={25} round />
                                    </FacebookShareButton>
                                        <span> </span>
                                        <TwitterShareButton
                                            title={"Judgy Face"}
                                            url={"https://judgyface.com"}
                                            hashtags={["gaming", "judgying"]}
                                        >
                                            <TwitterIcon size={25} round />
                                        </TwitterShareButton></>) : <ShareIcon size={25} onClick={() => { setShare(true) }} />}
                                    
                                <span style={{marginLeft:"10px"}} onClick={() => { setToggle(p => !p) }}> {toggle ? 'Previous Questions' : 'Live Question'} </span>
                            </p>



                        </div>)

                    : (
                        <>
                            <div className={`card ${MainpageCSS.card}`} id="new_card">
                            {/* <p className={MainpageCSS.user}>
                                Hey, {uname}
                            </p> */}
                                <p id="new_title">Previous Questions</p>
                                {prevq.map((post, index) => {
                                    return (
                                        <>
                                            <p>{post.question}</p>

                                            <div className="row" id="new_row" style={{ margin: "0", padding: "0" }}>

                                                {post.images.map((img, index) => {
                                                    let sum = post.votes.reduce((a, b) => {
                                                        return (a + b)
                                                    });
                                                    let style = (sum && post.votes[index] === Math.max(...post.votes)) ? { padding: '0', border: "5px solid #84db92" } : { padding: '0', border: "5px solid #EEEEEE" }
                                                    return (

                                                        <div className={MainpageCSS.imgdiv} id="new_imgdiv" style={{ height: "30px", boxShadow: "none", width: "90px" }}>
                                                            <img src={imgurl + img} alt="0" id="new_img" style={style} onError={e => e.target.src = loader} className={MainpageCSS.img} draggable="false" />
                                                        </div>
                                                    )
                                                })}


                                            </div>
                                        </>
                                    )
                                })}
                           
                            <p className={MainpageCSS.p}>
                            {share ?
                                    (<><FacebookShareButton
                                        url={"https://judgyface.com"}
                                        quote={"Judging people"}
                                        hashtag={"#gaming"}
                                        description={"dsc"}
                                        className="share-button"
                                    >
                                        <FacebookIcon size={25} round />
                                    </FacebookShareButton>
                                        <span> </span>
                                        <TwitterShareButton
                                            title={"Judgy Face"}
                                            url={"https://judgyface.com"}
                                            hashtags={["gaming", "judgying"]}
                                        >
                                            <TwitterIcon size={25} round />
                                        </TwitterShareButton></>) : <ShareIcon size={25} onClick={() => { setShare(true) }} />}
                                        <span onClick={() => { setToggle(p => !p) }}>{toggle ? ' Previous Questions' : ' Live Question'} </span>
                            </p>
                            </div>
                    </>

                    )}

            </div>



        </>
    )
}

export default Mainpage
