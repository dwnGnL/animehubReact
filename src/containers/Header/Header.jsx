import HeaderComp from "../../components/HeaderComp/HeaderComp";

function Header() {
    const listTypes = [
        {
            title: "ТВ",
            id: 1
        },
        {
            title: "OVA",
            id: 2
        },
        {
            title: "Фильм",
            id: 3
        },
        {
            title: "AMV",
            id: 4
        }
    ];

    const listYears = [
        2020,
        2019,
        2018,
        2017,
        2016,
        2015,
        2014,
        2013,
        2012,
        2011,
        2010,
        2009,
        2008,
        2007,
        2006,
        2005,
        2004,
        2003,
        2002,
        2001,
        2000,
        1999,
        1998,
        1997,
        1996,
        1995,
        1994,
        1993,
        1992,
        1991,
        1990,
        1989,
        1988,
        1987,
        1986,
        1985,
        1984,
        0
    ];

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
        "мистерия"
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
        "этти"
    ];

    const navLinks = [
        {
            title: "Дорамы",
            id: 5
        },
        {
            title: "Онгионги",
            id: 6
        },
        {
            title: "Магазин",
            id: 7
        },
        {
            title: "Топ аниме",
            id: 8
        }
    ];

    return (
        <HeaderComp
            listTypes={listTypes}
            listYears={listYears}
            leftListGenre={leftListGenre}
            rightListGenre={rightListGenre}
            navLinks={navLinks}
        />
    );
}

export default Header;
