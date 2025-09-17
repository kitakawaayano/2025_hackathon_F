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
    // const response = await fetch('https://2025-hackathon-f-json.vercel.app/presets', {
    const response = await fetch('http://localhost:3000/presets', { // 後で戻す
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
        if (result.id == id){
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
    
    finish.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    let mode = '';
    let diff = finish - now;

    if (diff > 0) {
      mode = 'countDown';
    } else {
      mode = 'countUp';
      diff = Math.abs(diff);
    }

    const hoursDiff = Math.floor(diff / 1000 / 60 / 60);
    const minutesDiff = Math.floor((diff / 1000 / 60) % 60);
    const secondsDiff = Math.floor((diff / 1000) % 60);

    return { hoursDiff, minutesDiff, secondsDiff, mode };
  };


  useEffect(() => {
    if (id){
      const fin = TimeReturn(id);
    }
  }, [id]);

  useEffect(() => {
    if (finishtime && typeof finishtime === 'string' && finishtime.includes(':')){
      const diffTime = getDiffTime(finishtime);
      setHoursDiff(diffTime.hoursDiff);
      setMinuteDiff(diffTime.minutesDiff);
      setSecondsDiff(diffTime.secondsDiff);
      setMode(diffTime.mode);
    }
  }, [finishtime])

  useEffect(() => {
    if (!timerflg) {
      return;
    }

    const timer = setInterval(() => {
      if (mode === 'countDown') {
        // カウントダウンモード：現在の時間を計算（すべて秒に変換）
        const totalSeconds = hourstime * 3600 + minutetime * 60 + secondstime;
        
        if (totalSeconds <= 1) {
          setHoursDiff(0);
          setMinuteDiff(0);
          setSecondsDiff(0);
          setflg(false);
          return;
        }
        
        // 1秒減らす
        const newTotalSeconds = totalSeconds - 1;
        
        // 時間、分、秒に変換
        const newHours = Math.floor(newTotalSeconds / 3600);
        const newMinutes = Math.floor((newTotalSeconds % 3600) / 60);
        const newSeconds = newTotalSeconds % 60;
        
        setHoursDiff(newHours);
        setMinuteDiff(newMinutes);
        setSecondsDiff(newSeconds);
        
      } else if (mode === 'countUp') {
        // カウントアップモード：1秒追加
        setSecondsDiff(prevSeconds => {
          if (prevSeconds < 59) {
            return prevSeconds + 1;
          } else {
            // 秒が59を超えたら分を増やして秒をリセット
            setMinuteDiff(prevMinutes => {
              if (prevMinutes < 59) {
                return prevMinutes + 1;
              } else {
                // 分が59を超えたら時間を増やして分をリセット
                setHoursDiff(prevHours => prevHours + 1);
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
          // await fetch(`https://2025-hackathon-f-json.vercel.app/tasks/${task.id}`, {
          await fetch(`http://localhost:3000/tasks/${task.id}`, { // 後で戻す
              method: 'DELETE'
          });
      }
    }

    // await fetch(`https://2025-hackathon-f-json.vercel.app/presets/${id}`, {
    await fetch(`http://localhost:3000/presets/${id}`, {  // 後で戻す
        method: 'DELETE'
    });

    navigate('/preset-list', {
      state: { deleted: true }
    });
  };

  return (
    <div className='sidemenu-area'>
      <div className="sidemenu">
        <h1 className="app-name">
          <Link to="/preset-list">Fu-Dandori</Link>
        </h1>

        <div className='sidemenu-info-container'>
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


        <div className='sidemenu-button-container'>
          <Link to={`/preset-edit/${id}`} className='preset-run-editButton'>
            <span>このプリセットを</span>
            <span>編集する</span>
          </Link>
          <button onClick={() => deletePreset(id)} className='preset-run-deleteButton'>
            <span>このプリセットを</span>
            <span>削除する</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideMenuRun;
