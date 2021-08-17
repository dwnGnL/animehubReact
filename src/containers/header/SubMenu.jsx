import React, { useContext } from 'react';
import { listTypes, listYears, listGenre } from './HeaderInner';
import { HeaderContext } from '../../Context';
import { CloseBtn } from '../../components/common/Icons';

function SubMenu(props) {
  const {subMenuHandler} = useContext(HeaderContext);

  return (
    <div className="sub-menu" onClick={(event) => event.stopPropagation()}>
      {props.device === 'mobile' || props.device === 'tablet' ? <CloseBtn closeFn={() => subMenuHandler(false)} width='8' color='#000' /> : null}
      <LeftSubMenu />
      <RightSubMenu />
    </div>
  );
}

function LeftSubMenu() {
  return (
    <div className="left">
      <TypeList list={listTypes} />
      <YearList list={listYears} />
    </div>
  );
}

function RightSubMenu() {
  const separateListGenre = [];
  separateListGenre.push(listGenre.slice(0, listGenre.length / 2));
  separateListGenre.push(listGenre.slice(listGenre.length / 2, listGenre.length));

  return (
    <div className="right">
      {separateListGenre.map((genre, index) => {
        return (
          <nav className="list-nav" key={'submenu-' + index}>
            <RightSubMenuLinks list={genre} />
          </nav>
        );
      })}
    </div>
  );
}

function TypeList(props) {
  return (
    <div className="type_list">
      <span className="sub-menu-header">По типу</span>
      <nav>
        {props.list.map((item) => <a href="./" key={item.id} className="sub-menu-item">{item.title}</a>)}
      </nav>
    </div>
  );
}

function YearList(props) {
  return (
    <div className="year_list">
      <span className="sub-menu-header">По годам</span>
      <nav>
        {props.list.map((item, index) => <a href="./" key={index} className="sub-menu-item">{item}</a>)}
      </nav>
    </div>
  );
}

function RightSubMenuLinks(props) {
  return (
    <div className="link">
      {props.list.map((item, index) => <a href="./" key={index} className="list-nav-item">{item}</a>)}
    </div>
  );
}

export default SubMenu;