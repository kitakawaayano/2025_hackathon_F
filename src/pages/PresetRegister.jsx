import React from 'react';
import Preset from '../components/Preset';
import Task from '../components/Task';

function PresetRegister() {
  return (
    <>
      <h2 className='page-title'>プリセット登録画面</h2>
      <Preset />
      <Task />
    </>
  );
}

export default PresetRegister;
