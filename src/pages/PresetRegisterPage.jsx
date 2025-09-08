import React from 'react';
import Preset from '../components/Preset';
import Task from '../components/Task/Task';
import PresetTaskContainer from '../components/PresetTaskContainer';

function PresetRegisterPage() {
  return (
    <>
      <h2 className='page-title'>プリセット登録画面</h2>
      <PresetTaskContainer />
    </>
  );
}

export default PresetRegisterPage;
