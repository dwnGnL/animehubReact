import React from 'react';
import Input from '../components/common/input/Input';
import Slider from '../components/Slider/Slider';

function Main() {
  return (
    <>
      <Slider />
      <Input name="search_film" placeholder="Поиск аниме" />
    </>
  );
}

export default Main;