import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../SideMenu/SideMenu.css';
import './SideMenuRun.css';
import { useState, useEffect } from 'react';



const SideMenuRun = () => {

  const [hourstime, setHoursDiff] = useState(0);
  const [minutetime, setMinuteDiff] = useState(0);
  const [secondstime, setSecondsDiff] = useState(0);
  const [finishtime, setFinishTime] = useState(0);
  const [id, setId] = useState(0);
  // const [timerflg, setflg] = useState(false);

  useEffect(() => {
    let urlStr = window.location.href;
    let url = new URL(urlStr).pathname;
    setId(url.split('/').pop());
  }, []);


  

  const getTime = async () => { 
    const response = await fetch('http://localhost:3000/presets', {
        method: 'GET',
        header: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    return data;
  }
  
  const TimeReturn = (id) => {
  // useEffect(() => {
    // let diffTime = {};
    console.log(id)
    
    getTime().then(results => {
      
      // console.log(results);
      results.map(result =>{
        console.log(result);
        if (result.id == id){
          // console.log(result[id-1].finish_time);
          console.log(result.finish_time)
          setFinishTime(result.finish_time);
          return result.finish_time;
        }
      });
    }).catch(error => {
      return error;
    })
  // }, [id])
  };

  const getDiffTime = (finishTime) => {
    const finish = new Date();
    const [hours, minutes] = finishTime.split(':');
    finish.setHours(hours);
    finish.setMinutes(minutes);
    finish.setSeconds(0);

    const now = new Date();
    const diff = finish - now;

    let hoursDiff = Math.floor(diff / 1000 / 60 / 60);
    let minutesDiff = Math.floor((diff / 1000 / 60) % 60);
    let secondsDiff = Math.floor((diff / 1000) % 60);

    if (diff <= 0){
      hoursDiff = 0;
      minutesDiff = 0;
      secondsDiff = 0;
    }

    return { hoursDiff, minutesDiff, secondsDiff };
  };


  useEffect(() => {
    if (id){
      const fin = TimeReturn(id);
      console.log(fin);
    }
  }, [id]);

  useEffect(() => {
    console.log(finishtime);
    if (isNaN(finishtime)){
      const diffTime = getDiffTime(finishtime);
      console.log(diffTime.hoursDiff);
      setHoursDiff(diffTime.hoursDiff);
      setMinuteDiff(diffTime.minutesDiff);
      setSecondsDiff(diffTime.secondsDiff);
    }
  }, [finishtime])

  let count = 0;
  useEffect(() => {
    console.log("時間:"+hourstime);
    console.log("分:"+minutetime);
    console.log("秒:"+secondstime);
    const timer = setInterval(() => {
      console.log(secondstime)
      if (secondstime == 0){
        setSecondsDiff(59);
        if (minutetime == 0){
          setMinuteDiff(59);
          if (hourstime == 0){
            clearInterval(timer);
          }else {
            let hour = hourstime;
            hour -= hour;
            setHoursDiff(hour);
          }
        }else {
          let minute = minutetime;
          minute -= minute;
          setMinuteDiff(minute);
        }
      } else {
        let sec = secondstime;
        sec -= sec;

        // console.log(sec);
        setSecondsDiff(sec);
      }
      // console.log(secondstime);
      count++;

      if (count >= 1) {
        clearInterval(timer);

      };
    }, 1000);
    
  }, []);

  const DigestNum = (num) => {
    return ("0" + num).slice(-2);
  };


  const location = useLocation();
  return (
    <div className="side-menu">
      <h1 className="app-name">
        <Link to="/preset-list">アプリ名</Link>
      </h1>

      <h3>
        <span>
          <span className='finish-time mainColor-text'>{finishtime}</span>
          <span className='gray-text'>まで</span>
        </span>
        <span className='remaining-time mildRed-text'>{DigestNum(hourstime)}:{DigestNum(minutetime)}:{DigestNum(secondstime)}</span>
      </h3>

      <h3>
        <span className='gray-text'>タスク進捗</span>
        <span>
          <span className='mildRed-text'>2</span>
          <span className='gray-text'>/5</span>
        </span>
      </h3>
    </div>
  );
};

export default SideMenuRun;
