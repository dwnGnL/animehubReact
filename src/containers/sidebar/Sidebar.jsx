import React from "react";
import Headline from "../../components/common/headline/Headline";
import './sidebar.css';

function Sidebar() {
  return (
    <aside>
      <TopAnime title='Топ аниме' />
      <Questionnaire title='Опросник' />
      <Comments title='Комментарии' />
    </aside>
  );
}


// top anime
function TopAnime(props) {
  const topAnime = [
    {
      title: 'Моя геройская академия',
      link: '#'
    },
    {
      title: 'Наруто',
      link: '#'
    },
    {
      title: 'Доктор Стоун',
      link: '#'
    },
    {
      title: 'Семь смертных грехов',
      link: '#'
    },
    {
      title: 'One Piece',
      link: '#'
    }
  ];

  return (
    <div className="top_anime sidebar_item">
      <Headline title={props.title} />
      <div className="top__anime_img"></div>

      <ul className="top__anime_list">
        {topAnime.map((elem, index) => {
          return <TopList title={elem.title} link={elem.link} number={index} key={elem.title} />
        })}
      </ul>
    </div>
  );
}

function TopList(props) {
  return (
    <li className={`top__anime_item top__anime_item-${props.number}`}>
      <a href={props.link}>
        <div className="list__number">{props.number + 1}</div>
        <div className="anime__title">{props.title}</div>
      </a>
    </li>
  );
}



// questionnaire
function Questionnaire(props) {
  return (
    <div className="questionnaire sidebar_item">
      <Headline title={props.title} />
      <QuestionnaireInner quesiton='За сколько вы готовы купить мангу?' votesLengh={224} />
    </div>
  );
}

function QuestionnaireInner(props) {
  const checkboxData = [
    {
      innerText: '70c'
    },
    {
      innerText: '60c'
    },
    {
      innerText: '50c'
    },
    {
      innerText: '40c'
    }
  ];

  return (
    <div className="questionnaire_inner">
      <div className="question__title">{props.quesiton}</div>
      <div className="question__votes">Проголосовало {props.votesLengh} человек</div>

      <div className="question__checkbox_wrapper">
        {checkboxData.map((elem, index) => {
          return <QuestionCheckbox checkboxInner={elem.innerText} key={`question_${index}`} />
        })}
      </div>
    </div>
  );
}

function QuestionCheckbox(props) {
  return (
    <div className="checkbox__item">
      <div className="progress"></div>
      <div className="text">{props.checkboxInner}</div>
    </div>
  );
}


// Comments
function Comments(props) {
  const commentsList = [
    {
      userName: 'medjay',
      userStatus: 'Анимешник',
      commentText: 'Он вроде одних и тех же персонажей использует ну или сильно похожих',
      topicOfDiscussion: 'Нулевой Эдем'
    },
    {
      userName: 'medjay',
      userStatus: 'Анимешник',
      commentText: 'Он вроде одних и тех же персонажей использует ну или сильно похожих',
      topicOfDiscussion: 'Нулевой Эдем'
    },
    {
      userName: 'medjay',
      userStatus: 'Анимешник',
      commentText: 'Он вроде одних и тех же персонажей использует ну или сильно похожих',
      topicOfDiscussion: 'Нулевой Эдем'
    },
    {
      userName: 'medjay',
      userStatus: 'Анимешник',
      commentText: 'Он вроде одних и тех же персонажей использует ну или сильно похожих',
      topicOfDiscussion: 'Нулевой Эдем'
    },
    {
      userName: 'medjay',
      userStatus: 'Анимешник',
      commentText: 'Он вроде одних и тех же персонажей использует ну или сильно похожих',
      topicOfDiscussion: 'Нулевой Эдем'
    }
  ]

  return (
    <div className="comments sidebar_item">
      <Headline title={props.title} />

      <div className="comments__list">
        {commentsList.map((comment, index) => {
          return <CommentItem 
            name={comment.userName}
            status={comment.userStatus}
            text={comment.commentText}
            topic={comment.topicOfDiscussion}
            index={index}
            key={comment.userName + index}
          />
        })}
      </div>
    </div>
  );
}

function CommentItem(props) {
  return (
    <div className={`comment_item comment_item-${props.index}`}>
      <User name={props.name} status={props.status} />

      <div className="comment_text">{props.text}</div>
      <div className="topic_of_discussion">{props.topic}</div>
    </div>
  );
}

function User(props) {
  return (
    <div className="user">
      <div className="user_avatar"></div>
      <div className="user_name">{props.name}</div>
      <div className="user_status">{props.status}</div>
    </div>
  );
}

export default Sidebar;