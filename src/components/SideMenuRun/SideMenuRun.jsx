import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../SideMenu/SideMenu.css';
import './SideMenuRun.css';
import { useState, useEffect } from 'react';


function SideMenuRun({ filteredTasks, completedCount }) {

  const [hourstime, setHoursDiff] = useState(0);
  const [minutetime, setMinuteDiff] = useState(0);
  const [secondstime, setSecondsDiff] = useState(0);
  const [finishtime, setFinishTime] = useState(0);
  const [id, setId] = useState(0);
  const [timerflg, setflg] = useState(true);
  const taskCount = filteredTasks.length;

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
    
    getTime().then(results => {
      
      results.map(result =>{
        console.log(result);
        if (result.id == id){
          console.log(result.finish_time)
          setFinishTime(result.finish_time);
          return result.finish_time;
        }
      });
    }).catch(error => {
      return error;
    })
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

  useEffect(() => {
    console.log(timerflg);
    
    // タイマーが停止している、または時間が0の場合は何もしない
    if (!timerflg || (secondstime + minutetime + hourstime === 0)) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsDiff(prevSeconds => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          setMinuteDiff(prevMinutes => {
            if (prevMinutes > 0) {
              return prevMinutes - 1;
            } else {
              setHoursDiff(prevHours => {
                if (prevHours > 0) {
                  setMinuteDiff(59);
                  return prevHours - 1;
                } else {
                  console.log("タイマー終了");
                  setflg(false);
                  return 0;
                }
              });
              return 59;
            }
          });
          return 59;
        }
      });
    }, 1000);

    // クリーンアップ関数でタイマーをクリア
    return () => clearInterval(timer);
    
  }, [timerflg]); // timerflgが変更された時のみ再実行

  const DigestNum = (num) => {
    return ("0" + num).slice(-2);
  };

  useEffect(() => {
    if (completedCount == taskCount && taskCount > 0){
      setflg(false);
    }
  }, [completedCount])

  const location = useLocation();

  const navigate = useNavigate();

  const deletePreset = async (id) => {
    const ok = window.confirm('本当に削除しますか？');
    if (!ok) {
        return;
    }

    for (const task of filteredTasks) {
        await fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'DELETE'
        });
    }

    await fetch(`http://localhost:3000/presets/${id}`, {
        method: 'DELETE'
    });

    navigate('/preset-list', {
      state: { deleted: true }
    });
  };

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
        <span className='remaining-time mildRed-text big-text'>{DigestNum(hourstime)}:{DigestNum(minutetime)}:{DigestNum(secondstime)}</span>
      </h3>

      <h3>
        <span className='gray-text'>タスク進捗</span>
        <span>
          <span
            className={taskCount !== completedCount ? "mildRed-text big-text" : "gray-text big-text"}
          >
            {completedCount}
          </span>
          <span className='gray-text'>/{taskCount}</span>
        </span>
      </h3>

      <button onClick={() => deletePreset(id)} className='preset-run-deleteButton'>
        このプリセットを<br />削除する
      </button>
    </div>
  );
};

export default SideMenuRun;
