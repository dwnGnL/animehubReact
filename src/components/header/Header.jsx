import React, { useState } from "react";
import AnimehubLogo from "../common/Logo";
import Button from "../common/Button";
import "./header.css";

function Header() {
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

  function subMenuHandle(isClosed) {
    let menuClasses = 'header-main-link';
    isClosed ? menuClasses += ' menu-opened' : menuClasses += ' menu-closed';
    setMenuClass(menuClasses);
  }

  return (
    <header className="header">
      <div className="left_side">
        <AnimehubLogo />

        <nav className="menu">
          <div className={menuClass}onMouseEnter={() => subMenuHandle(true)} onMouseLeave={() => subMenuHandle(false)}>
            <a href="./" className="main-item">Аниме</a>
            <SubMenu />
          </div>
          {navLinks.map((item) => <a href="./" key={item.id} className="menu-item">{item.title}</a>)}
        </nav>
      </div>
      
      <Button componentClassName="header-btn" title="Войти" />
    </header>
  );
}

function SubMenu() {
  return (
    <div className="sub-menu">
      <LeftSubMenu />
      <RightSubMenu />
    </div>
  );
}

function LeftSubMenu() {
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
    1984,
  ];

  return (
    <div className="left">
      <TypeList list={listTypes} />
      <YearList list={listYears} />
    </div>
  );
}

function RightSubMenu() {
  const listGenre = [
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
    <div>
      <span className="sub-menu-header">По типу</span>
      <nav>
        {props.list.map((item) => <a href="./" key={item.id} className="sub-menu-item">{item.title}</a>)}
      </nav>
    </div>
  );
}

function YearList(props) {
  return (
    <div>
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

export default Header;