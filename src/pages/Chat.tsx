import './Chat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApagarIMG from '../images/apagar.png'
import ChatIMG from '../images/chatbot.png'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { runChat } from '../services/chatbot';
import { resetToken } from '../services/serverRequisition';

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

  async function apagarMensagens() {
    await resetToken()
    setMessages([])
  }

  async function enviarMensagem() {
    if (inputText.trim() === '') {
      alert('Não é permitido enviar uma mensagem em branco ao Chatbot!')
      return;
    }
    const question = inputText
    const updatedHistory = [...messages]
    updatedHistory.push({ text: question.replace(/\n/g, ' <br>'), chatbot: false, time: getTimeNow() })
    setMessages(updatedHistory)

    setInputText('')
    let attempts = 3;
    let response = ''

    while (attempts > 0) {
      try {
        response = await runChat(question);
        break;
      } catch (error: any) {
        if (attempts > 1) {
          response = error;
          attempts--;
        }
      }
    }
    const updatedAnswer = [...updatedHistory];
    updatedAnswer.push({ text: response, chatbot: true, time: getTimeNow() });
    setMessages(updatedAnswer);
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
        {messages.map((message, index) => (
          <li key={index} className={message.chatbot ? 'other' : 'self'}>
            <div className='msg'>
              {message.chatbot && <div className="user">Chatbot PCP</div>}
              <p dangerouslySetInnerHTML={{ __html: message.text }} />
              <time>{message.time}</time>
            </div>
          </li>
        ))}
      </ol>

      <div className="typezone">
        <textarea placeholder="Escreva seu Comando..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              enviarMensagem();
            }
          }} />
        <input title='Enviar Comando ao Chatbot' type="submit" className="send" onClick={() => enviarMensagem()} />
        <img src={ApagarIMG} title='Apagar Histórico de Conversas' alt='Apagar Histórico de Conversas' className="emojis" onClick={() => apagarMensagens()} /></div>
    </>
  );
}

export default Chat;
