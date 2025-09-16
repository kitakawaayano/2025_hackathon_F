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
  const [mode, setMode ] = useState(0)
  const taskCount = Array.isArray(filteredTasks) ? filteredTasks.length : 0;

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
        // console.log(result);
        if (result.id == id){
          // console.log(result.finish_time)
          setFinishTime(result.finish_time);
          return result.finish_time;
        }
      });
    }).catch(error => {
      return error;
    })
  };

  const getDiffTime = (finishTime) => {
    const now = new Date();
    const finish = new Date();
    const [hours, minutes] = finishTime.split(':');
    finish.setHours(hours);
    finish.setMinutes(minutes);
    finish.setSeconds(0);

    let mode = '';
    let diff = finish - now;

    if (diff > 0) {
      // 目標終了時刻前 -> 残り時間をカウントダウン
      mode = 'countDown';
    }
    if (diff <= 0 && diff > -3600000) {
      // 目標終了時刻を超過(1時間未満) -> オーバーした時間をカウントアップ
      mode = 'countUp';
      diff = Math.abs(diff);
    } else {
      // 目標終了時刻を超過(1時間以上) -> 翌日の時刻とみなして残り時間をカウントダウン
      mode = 'countDown';
      finish.setDate(finish.getDate() + 1);
      diff = finish - now;
    }

    const hoursDiff = Math.floor(diff / 1000 / 60 / 60);
    const minutesDiff = Math.floor((diff / 1000 / 60) % 60);
    const secondsDiff = Math.floor((diff / 1000) % 60);

    return { hoursDiff, minutesDiff, secondsDiff, mode };
  };


  useEffect(() => {
    if (id){
      const fin = TimeReturn(id);
      // console.log(fin);
    }
  }, [id]);

  useEffect(() => {
    // console.log("Finish time updated:", finishtime);
    if (finishtime && typeof finishtime === 'string' && finishtime.includes(':')){
      const diffTime = getDiffTime(finishtime);
      // console.log("Setting initial time:", diffTime);
      setHoursDiff(diffTime.hoursDiff);
      setMinuteDiff(diffTime.minutesDiff);
      setSecondsDiff(diffTime.secondsDiff);
      setMode(diffTime.mode);
    }
  }, [finishtime])

  useEffect(() => {
    // console.log("Timer useEffect triggered:", { timerflg, hourstime, minutetime, secondstime });

    if (!timerflg) {
      // console.log("Timer stopped by flag");
      return;
    }

    // if (secondstime === 0 && minutetime === 0 && hourstime === 0) {
    //   // console.log("All time values are 0, not starting timer");
    //   return;
    // }

    // console.log("Starting timer with:", { hourstime, minutetime, secondstime });

  const timer = setInterval(() => {
    if(mode === 'countDown') {
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
                  // console.log("タイマー終了");
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
    } else if (mode === 'countUp') {
      setSecondsDiff(prev => {
        if (prev < 59) return prev + 1;
        else {
          setMinuteDiff(prevMin => {
            if (prevMin < 59) return prevMin + 1;
            else {
              setHoursDiff(prevHr => prevHr + 1);
              return 0;
            }
          });
          return 0;
        }
      });
    }
  }, 1000);

    // クリーンアップ関数でタイマーをクリア
    return () => {
      // console.log("Clearing timer");
      clearInterval(timer);
    };

  }, [timerflg, hourstime, minutetime, secondstime, mode]);

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

    if (Array.isArray(filteredTasks)) {
      for (const task of filteredTasks) {
          await fetch(`http://localhost:3000/tasks/${task.id}`, {
              method: 'DELETE'
          });
      }
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

      <div className='side-menu-info-container'>
        <h3>
          <span>
            <span className='finish-time mainColor-text'>{finishtime}</span>
            <span className='gray-text'>
              {mode === 'countDown' ? 'まで' : 'を'}
            </span>
          </span>
          <span className='remaining-time mildRed-text big-text'>
            {DigestNum(hourstime)}:{DigestNum(minutetime)}:{DigestNum(secondstime)}
          </span>
          {mode === 'countUp' && <span><span className="mildRed-text">超過</span></span>}
        </h3>

        <h3>
          <span className='gray-text'>タスク進捗</span>
          {taskCount !== completedCount ?
            <span>
              <span className="mildRed-text big-text">{completedCount}</span>
              <span className='gray-text'>/{taskCount}</span>
            </span>
          :
            <span className='gray-text big-text'>全て完了</span>
          }
        </h3>
      </div>

      <div className='preset-run-deleteButton-container'>
        <button onClick={() => deletePreset(id)} className='preset-run-deleteButton'>
          <span>このプリセットを</span>
          <span>削除する</span>
        </button>
      </div>
    </div>
  );
};

export default SideMenuRun;
