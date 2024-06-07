import './Chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApagarIMG from '../images/apagar.png'
import ChatIMG from '../images/chatbot.png'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { runChat } from '../services/chatbot';

interface Imessages {
  text: string,
  chatbot: boolean,
  time: string
}

function Chat() {
  const [messages, setMessages] = useState<Imessages[]>([])
  const [inputText, setInputText] = useState('')

  function getTimeNow() {
    const now = new Date();

    // Get the hours, minutes, and seconds
    const hours = now.getHours().toString().padStart(2, '0'); // Pad with leading zero if needed
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    // Format the time as hh:mm:ss
    return `${hours}:${minutes}:${seconds}`;
  }

  async function enviarMensagem() {
    if (inputText === '') {
      alert('Não é permitido enviar uma mensagem em branco ao Chatbot!')
      return;
    }
    const updatedHistory = [...messages]
    updatedHistory.push({ text: inputText, chatbot: false, time:getTimeNow() })
    console.log(await runChat(inputText))
  }

  return (
    <>
      <div className="menu">
        <a href="https://automations-database.vercel.app/" className="back"><FontAwesomeIcon icon={faAngleLeft} title="Voltar para Automation's Database" />
          <img src={ChatIMG} alt='Imagem de perfil' draggable="false" /></a>
        <div className="name">Chatbot PCP - BETA</div>
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
            <div className="user">Chatbot PCP</div>
            <p>What comment about Góngora?</p>
            <time>20:18</time>
          </div>
        </li>
      </ol>

      <div className="typezone">
        <textarea placeholder="Escreva seu Comando..." value={inputText} onChange={e => setInputText(e.target.value)}></textarea>
        <input type="submit" className="send" onClick={() => enviarMensagem()} />
        <img src={ApagarIMG} title='Apagar Histórico de Conversas' alt='Apagar Histórico de Conversas' className="emojis" /></div>
    </>
  );
}

export default Chat;
