import Logo from "../../assets/logo.png";
import "./Header.css";

function HeaderComp(props) {
	return (
		<header className="header">
			<div className="d-flex align-items-center">
				<div className="logo">
					<img src={Logo} alt="logo" />
				</div>
				<div className="header-main-link">
					<a href="./" className="main-item">Аниме</a>
					<SubMenu propsData={props} />
				</div>
				<nav className="menu">
					{props.navLinks.map((item) => <a href="./" key={item.id} className="menu-item">{item.title}</a>)}
				</nav>
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
	)
}

function LeftSubMenu(props) {
	return (
		<div className="left">
			<TypeList list={props.propsData.listTypes} />
			<YearList list={props.propsData.listYears} />
		</div>
	)
}

function RightSubMenu(props) {
	return (
		<div className="right">
			<ListNavLeft list={props.propsData.leftListGenre} />
			<ListNavRight list={props.propsData.rightListGenre} />
		</div>
	)
}

function TypeList(props) {
	return (
		<div>
			<span className="sub-menu-header">По типу</span>
			<nav className="d-flex py-2 flex-wrap">
				{props.list.map((item) => <a href="./" key={item.id} className="sub-menu-item">{item.title}</a>)}
			</nav>
		</div>
	)
}

function YearList(props) {
	return (
		<div>
			<span className="sub-menu-header">По годам</span>
			<nav className="d-flex py-2 flex-wrap mr-1">
				{props.list.map((item, index) => <a href="./" key={index} className="sub-menu-item">{item}</a>)}
			</nav>
		</div>
	)
}

function ListNavLeft(props) {
	return (
		<div className="list">
			<nav className="list-nav">
				{props.list.map((item, index) => <a href="./" key={index} className="list-nav-item">{item}</a>)}
			</nav>
		</div>
	)
}

function ListNavRight(props) {
	return (
		<div className="list">
			<nav className="list-nav">
				{props.list.map((item, index) => <a href="./" key={index} className="list-nav-item">{item}</a>)}
			</nav>
		</div>
	)
}


export default HeaderComp;
