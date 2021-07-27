import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import "./header.css";

function Header(props) {
  const navLinks = [
    {
      title: "Дорамы",
      id: 5,
    },
    {
      title: "Онгионги",
      id: 6,
    },
    {
      title: "Магазин",
      id: 7,
    },
    {
      title: "Топ аниме",
      id: 8,
    },
  ];

  const [menuClass, setMenuClass] = useState("header-main-link");

  function showSubMenu() {
    setMenuClass("header-main-link menu-opened");
  }

  function hideSubMenu() {
    setMenuClass("header-main-link menu-closed");
  }

  return (
    <header className="header">
      <div className="d-flex align-items-center">
        <div className="logo"><img src={Logo} alt="logo" /></div>
        <div className={menuClass} onMouseEnter={showSubMenu} onMouseLeave={hideSubMenu} >
          <a href="./" className="main-item">Аниме</a>
          <SubMenu propsData={props} />
        </div>
        <nav className="menu">{navLinks.map(item => <a href="./" key={item.id} className="menu-item">{item.title}</a>)}</nav>
      </div>
      <div><button className="header-btn">Войти</button></div>
    </header>
  );
}

function SubMenu(props) {
  return (
    <div className="sub-menu">
      <div className="d-flex">
        <LeftSubMenu propsData={props.propsData} />
        <RightSubMenu propsData={props.propsData} />
      </div>
    </div>
  );
}

function LeftSubMenu(props) {
  const listTypes = [
    {
      title: "ТВ",
      id: 1,
    },
    {
      title: "OVA",
      id: 2,
    },
    {
      title: "Фильм",
      id: 3,
    },
    {
      title: "AMV",
      id: 4,
    },
  ];

  const listYears = [
    2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009,
    2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998, 1997,
    1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986, 1985,
    1984
  ];

  return (
    <div className="left">
      <TypeList list={listTypes} />
      <YearList list={listYears} />
    </div>
  );
}

function RightSubMenu(props) {
	const leftListGenre = [
    "детектив",
    "жестокие сцены",
    "комедия",
    "мистика",
    "наше время",
    "повседневность",
    "боевые искусства",
    "вампиры",
    "война",
    "Гарем",
    "детектив",
    "драма",
    "исекай",
    "история",
    "киберпанк",
    "комедия",
    "махо-сёдзё",
    "меха",
    "мистерия",
  ];

	const rightListGenre = [
    "мистика",
    "музыкальный",
    "Онгоинг",
    "пародия",
    "повседневность",
    "Приключения",
    "романтика",
    "самурайский боевик",
    "Сёдзё",
    "сёдзё-ай",
    "Сёнэн",
    "сёнэн-ай",
    "спорт",
    "триллер",
    "ужасы",
    "фантастика",
    "Фэнтези",
    "школа",
    "этти",
  ];

  return (
    <div className="right">
      <RightSubMenuList list={leftListGenre} />
      <RightSubMenuList list={rightListGenre} />
    </div>
  );
}

function TypeList(props) {
  return (
    <div>
      <span className="sub-menu-header">По типу</span>
      <nav className="d-flex py-2 flex-wrap">
        {props.list.map((item) => (
          <a href="./" key={item.id} className="sub-menu-item">
            {item.title}
          </a>
        ))}
      </nav>
    </div>
  );
}

function YearList(props) {
  return (
    <div>
      <span className="sub-menu-header">По годам</span>
      <nav className="d-flex py-2 flex-wrap mr-1">
        {props.list.map((item, index) => (
          <a href="./" key={index} className="sub-menu-item">
            {item}
          </a>
        ))}
      </nav>
    </div>
  );
}

function RightSubMenuList(props) {
  return (
    <div className="list">
      <nav className="list-nav">
        {props.list.map((item, index) => (
          <a href="./" key={index} className="list-nav-item">
            {item}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default Header;