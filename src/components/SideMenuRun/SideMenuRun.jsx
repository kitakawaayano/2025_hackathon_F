import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../SideMenu/SideMenu.css';
import './SideMenuRun.css';
import { useState, useEffect } from 'react';


function SideMenuRun({ taskCount }) {

  const [hourstime, setHoursDiff] = useState(0);
  const [minutetime, setMinuteDiff] = useState(0);
  const [secondstime, setSecondsDiff] = useState(0);
  const [finishtime, setFinishTime] = useState(0);

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
    let diffTime = {};
    
    getTime().then(result => {
  
      // result[1]←ここに対応する今回のプリセットidを入れる
      if (result[1].id == 2){
        console.log(result[1].finish_time);
        setFinishTime(result[1].finish_time);
        diffTime = getDiffTime(finishtime);
        // console.log(diffTime.hoursDiff);
        setHoursDiff(diffTime.hoursDiff);
        setMinuteDiff(diffTime.minutesDiff);
        setSecondsDiff(diffTime.secondsDiff);
        return diffTime;
      }
    }).catch(error => {
      return error;
    })
  }

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

  const id = 1;
  const diffTime = TimeReturn(id);
  console.log(secondstime);

  let count = 0;
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(secondstime);
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

        console.log(sec);
        setSecondsDiff(sec);
      }
      console.log(secondstime);
      count++;

      if (count >= 1) {
        clearInterval(timer);

      };
    }, 1000);
    
  }, [secondstime]);

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
          <span className='gray-text'>/{taskCount}</span>
        </span>
      </h3>
    </div>
  );
};

export default SideMenuRun;
