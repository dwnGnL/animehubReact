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

  return (
    <header className="header">
      <div className="d-flex align-items-center">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <div
          className={menuClass}
          onMouseEnter={() => setMenuClass("header-main-link menu-opened")}
          onMouseLeave={() => setMenuClass("header-main-link menu-closed")}
        >
          <a href="./" className="main-item">
            Аниме
          </a>
          <SubMenu />
        </div>
        <nav className="menu">
          {navLinks.map((item) => (
            <a href="./" key={item.id} className="menu-item">
              {item.title}
            </a>
          ))}
        </nav>
      </div>
      <div>
        <button className="header-btn">Войти</button>
      </div>
    </header>
  );
}

function SubMenu() {
  return (
    <div className="sub-menu">
      <div className="d-flex">
        <LeftSubMenu />
        <RightSubMenu />
      </div>
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
          <div className="list" key={'submenu-' + index} >
            <nav className="list-nav">
              <RightSubMenuLinks list={genre} />
            </nav>
          </div>
        );
      })}
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

function RightSubMenuLinks(props) {
  return (
    <div className="link">
      {props.list.map((item, index) => (
        <a href="./" key={index} className="list-nav-item">
          {item}
        </a>
      ))}
    </div>
  );
}

export default Header;