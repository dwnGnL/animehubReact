import React from 'react';
import Logo from '../../components/common/Logo';
import Vk from '../../components/icons/Vk';
import Facebook from '../../components/icons/Facebook';
import Instagram from '../../components/icons/Instagram';
import './footer.css';

function Footer(props) {
  return (
    <div className="footer">
      <Top device={props.device} />
      <Copyright />
    </div>
  );
}


// Top
function Top(props) {
  return (
    <div className="top_block">
      <Left device={props.device} />
      <ContactUs />
      <Social />
    </div>
  );
}

// Left
function Left(props) {
  return (
    <div className="left_footer_block">
      {props.device === 'desktop' ? <Logo /> : null}
      <Question />
    </div>
  );
}

function Question() {
  return (
    <div className="question">
      <div className="question_title">По вопросам рекламы:</div>
      <div className="question_list">
        <a href="https://vk.com/animehub_tj" className="question_link">Пишите в ВК</a><br />
        <a href="mailto:desuhub@yandex.ru" className="question_link">На почту: desuhub@yandex.ru</a>
      </div>
    </div>
  );
}

// Middle
function ContactUs() {
  return (
    <div className="contact_us">
      <a href="./" className="contact_us_link">Связаться с нами</a>
    </div>
  );
}


// Right
function Social() {
  const socialList = [
    {
      component: <Vk />,
      title: 'VK',
      link: 'https://vk.com/animehub_tj'
    },
    {
      component: <Facebook />,
      title: 'Facebook',
      link: 'https://www.facebook.com/animehub.tj'
    },
    {
      component: <Instagram />,
      title: 'Instagram',
      link: 'https://www.instagram.com/animehub_tj'
    }
  ]

  return (
    <div className="social_block">
      <div className="social_title">Мы в соц. сетях</div>
      <div className="social_network_list">
        {socialList.map((social, index) => {
          return <a href={social.link} title={social.title} className="social_link" key={social.title + index}>{social.component}</a>
        })}
      </div>
    </div>
  );
}


// Bottom
function Copyright() {
  return (
    <div className="copyright_block">© 2021 AnimeHub.tj</div>
  );
}

export default Footer;