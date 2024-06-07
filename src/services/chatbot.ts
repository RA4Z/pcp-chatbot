// import { sendMessage } from 'services/database';
import { enviarMensagem, resetToken } from './serverRequisition';
resetToken()

async function runChat(paramText: string) {
    const result = await enviarMensagem(paramText)
    const response = result;
    
    let formattedText = response.replace(/\n/g, ' <br>');
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\*/g, "•");

    // Regex para identificar links do Power BI
    const linkRegex = /(https?:\/\/[^\s]+)/g;

    // Substituir links do Power BI por tags <a> com atributos href
    formattedText = formattedText.replace(linkRegex, (match: any) => {
        return `<a href="${match}" style="color:#3B8CED" target="_blank">${match}</a>`;
    });

    // await sendMessage(paramText)
    return formattedText;
}

export { runChat }