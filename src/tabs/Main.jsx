import React from 'react';
import Slider from '../components/slider/Slider';
import Input from '../components/common/input/Input';

function Main() {
  return (
    <>
      <Slider />
      <Input name="search_film" placeholder="Поиск аниме" />
    </>
  );
}

export default Main;