import React, { useState, useContext } from "react";
import { HeaderContext } from '../../Context';
import SubMenu from './SubMenu';
import Logo from "../../components/common/Logo";
import Button from "../../components/common/Button";
import { navLinks } from './HeaderInner';
import "./header.css";


function Header(props) {
  const [menuOpened, setMenuOpened] = useState('');
  const [subMenuOpened, setSubMenuOpened] = useState('');

  function menuHandler(isOpened) {
    isOpened ? setMenuOpened(' menu-opened') : setMenuOpened(' menu-closed');
  }

  function subMenuHandler(isOpened) {
    isOpened  ? setSubMenuOpened(' sub-menu-opened') : setSubMenuOpened(' sub-menu-closed');
  }

  return (
    <HeaderContext.Provider value={{menuHandler: menuHandler, subMenuHandler: subMenuHandler}}>
      <header className="header">
        <div className="left_side">
          <Logo />
          {props.device === 'desktop' ? <Menu activeMenuClass={menuOpened} activeSubMenuClass={subMenuOpened} device={props.device} /> : null}
        </div>
        
        <div className="right_side">
          <Button componentClassName="header-btn" title="Войти" />
          {props.device === 'tablet' || props.device === 'mobile'  ? <MenuHamburger activeMenuClass={menuOpened} /> : null}
        </div>
      </header>
      {props.device === 'tablet' || props.device === 'mobile'  ? <Menu activeMenuClass={menuOpened} activeSubMenuClass={subMenuOpened} device={props.device} /> : null}
    </HeaderContext.Provider>
  );
}

function MenuHamburger(props) {
  const {menuHandler} = useContext(HeaderContext);

  return (
    <div className={'hamburger_menu' + props.activeMenuClass} onClick={() => menuHandler(true)}>
      <div className="menu_line menu_line-0"></div>
      <div className="menu_line menu_line-1"></div>
      <div className="menu_line menu_line-2"></div>
    </div>
  );
}

function Menu(props) {
  const {menuHandler, subMenuHandler} = useContext(HeaderContext);

  function closeAll() {
    menuHandler(false);
    if (props.activeSubMenuClass !== '') subMenuHandler(false);
  }

  return (
    <div className={'menu-wrapper' + props.activeMenuClass + props.activeSubMenuClass} onClick={closeAll}>
      <nav className='menu' onClick={(event) => event.stopPropagation()}>
        <div className={'menu-item'} onMouseEnter={() => subMenuHandler(true)} onMouseLeave={() => props.device === 'desktop' ? subMenuHandler(false) : null}>
          <div className="main-item">Аниме</div>
          {props.device === 'desktop' ? <SubMenu device={props.device} /> : null}
        </div>
        {navLinks.map((item) => <div className={'menu-item'} onClick={() => menuHandler(false)} key={item.id}>{item.title}</div>)}
      </nav>

      {props.device === 'mobile' || props.device === 'tablet' ? <SubMenu device={props.device} /> : null}
    </div>
  );
}

export default Header;