import React, { useState, useContext, useEffect, useRef } from "react";
import { HeaderContext, WrapperContext } from '../../Context';
import SubMenu from './SubMenu';
import Logo from "../../components/common/Logo";
import Button from "../../components/common/Button";
import { navLinks } from './HeaderInner';
import "./header.css";


function Header(props) {
  const wrapper = useContext(WrapperContext);
  const header = useRef();
  const [headerFixed, setHeaderFixed] = useState('');
  const [menuOpened, setMenuOpened] = useState('');
  const [subMenuOpened, setSubMenuOpened] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const wrapperPositoin = wrapper.current.getBoundingClientRect().top;
      const headerHeight = header.current.clientHeight;

      if (wrapperPositoin <= -headerHeight) {
        setHeaderFixed(' fixed');
      } if (wrapperPositoin === 0) {
        setHeaderFixed('');
      }
    })
  }, [wrapper]);

  function menuHandler(isOpened) {
    if (isOpened) {
      setMenuOpened(' menu-opened');
      if (props.device !== 'desktop') document.body.style.overflow = 'hidden';
    } else {
      setMenuOpened(' menu-closed');
      if (props.device !== 'desktop') document.body.style.overflow = 'visible';
    }
  }

  function subMenuHandler(isOpened) {
    if (isOpened) {
      setSubMenuOpened(' sub-menu-opened');
      if (props.device === 'desktop') document.body.style.overflow = 'hidden';
    } else {
      setSubMenuOpened(' sub-menu-closed');
      if (props.device === 'desktop') document.body.style.overflow = 'visible';
    }
  }

  return (
    <HeaderContext.Provider value={{menuHandler: menuHandler, subMenuHandler: subMenuHandler}}>
      <header className={'header' + headerFixed} ref={header}>
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