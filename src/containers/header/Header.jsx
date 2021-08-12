import React, { useState, useContext, createContext } from "react";
import AnimehubLogo from "../../components/common/Logo";
import Button from "../../components/common/Button";
import CloseBtn from "../../components/common/CloseBtn";
import "./header.css";

const HeaderContext = createContext();
const MenuContext = createContext();

function Header(props) {
  const [menuOpened, setMenuOpened] = useState('');


  function menuHandler(isOpened) {
    isOpened ? setMenuOpened(' menu-opened') : setMenuOpened(' menu-closed');
  }

  return (
    <HeaderContext.Provider value={menuHandler}>
      <header className="header">
        <div className="left_side">
          <AnimehubLogo />
          {props.device === 'desktop' ? <Menu activeMenuClass={menuOpened} device={props.device} /> : null}
        </div>
        
        <div className="right_side">
          <Button componentClassName="header-btn" title="Войти" />
          {props.device === 'tablet' || props.device === 'mobile'  ? <MenuHumburger activeMenuClass={menuOpened} /> : null}
        </div>
      </header>
      {props.device === 'tablet' || props.device === 'mobile'  ? <Menu activeMenuClass={menuOpened} device={props.device} /> : null}
    </HeaderContext.Provider>
  );
}

function MenuHumburger(props) {
  const menuHandler = useContext(HeaderContext);

  return (
    <div className={'humburger_menu' + props.activeMenuClass} onClick={() => menuHandler(true)}>
      <div className="menu_line menu_line-0"></div>
      <div className="menu_line menu_line-1"></div>
      <div className="menu_line menu_line-2"></div>
    </div>
  )
}

function Menu(props) {
  const [activeMenuItemClass, setActiveMenuItemClass] = useState('');
  const menuHandler = useContext(HeaderContext);

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

  function subMenuHandler(isOpened) {
    isOpened  ? setActiveMenuItemClass(' sub-menu-opened') : setActiveMenuItemClass(' sub-menu-closed');
  }

  return (
    <MenuContext.Provider value={subMenuHandler}>
      <div className={'menu-wrapper' + props.activeMenuClass + activeMenuItemClass} onClick={() => menuHandler(false)}>
        <nav className='menu' onClick={(event) => event.stopPropagation()}>
          <div className={'menu-item'} onMouseEnter={() => subMenuHandler(true)} onMouseLeave={() => props.device === 'desktop' ? subMenuHandler(false) : null}>
            <div className="main-item">Аниме</div>
            {props.device === 'desktop' ? <SubMenu device={props.device} /> : null}
          </div>
          {navLinks.map((item) => <div className={'menu-item'} onClick={() => menuHandler(false)} key={item.id}>{item.title}</div>)}
        </nav>

        {props.device === 'mobile' || props.device === 'tablet' ? <SubMenu device={props.device} /> : null}
      </div>
    </MenuContext.Provider>
  )
}

function SubMenu(props) {
  const subMenuHandler = useContext(MenuContext);

  return (
    <div className="sub-menu" onClick={(event) => event.stopPropagation()}>
      {props.device === 'mobile' || props.device === 'tablet' ? <CloseBtn closeFn={() => subMenuHandler(false)} width='8' color='#000' /> : null}
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
    2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010,
    2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002, 2001, 2000, 1999, 1998,
    1997, 1996, 1995, 1994, 1993, 1992, 1991, 1990, 1989, 1988, 1987, 1986,
    1985, 1984
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
    "этти"
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

export default Header;