import axios from 'axios';
// import { getIp } from './GetIP';

// // Define uma função assíncrona para obter o endereço IP
// async function getIpAddress(): Promise<string> {
//     return new Promise((resolve, reject) => {
//         getIp((ip: any) => {
//             if (ip) {
//                 resolve(ip);
//             } else {
//                 reject('Failed to get IP address');
//             }
//         });
//     });
// }

export async function resetToken() {
    const userName = 'SITE';
    const url = 'http://10.1.43.63:5000/quit';
    const data = {
        username: encodeURIComponent(userName),
    };
    await axios.post(url, data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
}

// Define uma função assíncrona para enviar a mensagem
export async function enviarMensagem(message: string): Promise<string> {
    try {
        const userName = 'SITE';
        const url = 'http://10.1.43.63:5000/gemini';

        // Cria os dados a serem enviados
        const data = {
            message: message,
            username: userName,
        };

        // Envia a solicitação POST usando axios
        const response = await axios.post(url, data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        // Verifica se a resposta foi bem-sucedida
        if (response.status === 200) {
            // Retorna o texto da resposta
            return response.data;
        } else {
            // Retorna uma mensagem de erro com o status da resposta
            return `Erro ao enviar a mensagem: ${response.status}`;
        }

    } catch (error: any) {
        // Retorna uma mensagem de erro com a descrição do erro
        if (error.message === 'Network Error') {
            return `Network Error`
        } else {
            return `Erro ao enviar a mensagem: ${error.message}`;
        }
    }
}