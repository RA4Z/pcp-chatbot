import './Chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApagarIMG from '../images/apagar.png'
import ChatIMG from '../images/chatbot.png'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Chat() {
  const [inputText, setInputText] = useState('')

  return (
    <>
      <div className="menu">
        <a href="https://automations-database.vercel.app/" className="back"><FontAwesomeIcon icon={faAngleLeft} title="Voltar para Automation's Database" />
          <img src={ChatIMG} alt='Imagem de perfil' draggable="false" /></a>
        <div className="name">ChatBot PCP - BETA</div>
        <div className="members">Desenvolvido e prototipado por Robert Aron Zimmermann</div>
      </div>

      <ol className="chat">
        <li className="self">
          <div className="msg">
            <p>Puff...</p>
            <p>I'm still doing the Góngora comment...</p>
            <p>Better other day</p>
            <time>20:18</time>
          </div>
        </li>

        <li className="other">
          <div className="msg">
            <div className="user">Brotons</div>
            <p>What comment about Góngora?</p>
            <time>20:18</time>
          </div>
        </li>
      </ol>

      <div className="typezone">
        <textarea type="text" placeholder="Escreva seu Comando..." value={inputText} onChange={e => setInputText(e.target.value)}></textarea>
        <input type="submit" className="send" value="" />
        <img src={ApagarIMG} title='Apagar Histórico de Conversas' alt='Apagar Histórico de Conversas' className="emojis" /></div>
    </>
  );
}

export default Chat;
