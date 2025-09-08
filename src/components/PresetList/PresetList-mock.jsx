import './PresetList.css';

function PresetList() {
    return (
        <>
            <div className='preset-list-container'>
                <div className='preset-list-item'>
                    <h3 className='preset-name'>
                        プリセット名
                    </h3>
                    <ul className='preset-info-ul'>
                        <li>
                            <span className='preset-info-item'>
                                <span className="material-symbols-outlined">alarm</span>
                                <span>7:30</span>
                            </span>
                        </li>
                        <li>
                            <span className='preset-info-item'>
                                <span className="material-symbols-outlined">check_box</span>
                                <span>5</span>
                                <span className='preset-info-smallText'>個</span>
                            </span>
                        </li>
                        <li>
                            <span className="preset-info-item">
                                <span className="material-symbols-outlined">timelapse</span>
                                <span>30</span>
                                <span className='preset-info-smallText'>分</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default PresetList;
