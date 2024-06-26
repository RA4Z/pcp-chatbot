import { useState, useEffect } from 'react';
import { Button, notification } from 'antd';

export default function Propaganda() {
    const [notificationOpen, setNotificationOpen] = useState(false);

    const openNotification = () => {
        if (!notificationOpen) {
            notification.open({
                message: 'Download Chatbot PCP',
                description: (
                    <>
                        <p>Verificamos que está fazendo bastante uso do Chabot PCP, que tal o deixar instalado em seu computador para ter acesso a qualquer hora e com facilidade?</p>
                        <a href="https://weg365-my.sharepoint.com/:u:/g/personal/robertn_weg_net/EfGE6YDCYRZKslsK-e-KITsBFDHXtIJw2CUhkxjG0Uc_3Q?e=Im2akc">
                            Faça Download do Chatbot PCP Portátil clicando aqui!
                        </a>
                    </>
                ),
                duration: 7,
                closeIcon: null,
                placement: 'topRight',
                onClose: () => setNotificationOpen(false),
            });
            setNotificationOpen(true);
        }
    };

    useEffect(() => {
        // Obtém o contador do localStorage ou define como 0 se não existir
        let contador = parseInt(localStorage.getItem('contador') || '0', 15);

        // Incrementa o contador, limitando a 10
        contador = Math.min(contador + 1, 15);

        // Salva o contador atualizado no localStorage
        localStorage.setItem('contador', contador.toString());

        // Abre a notificação quando o contador atingir 10
        if (contador === 15) {
            openNotification();
            localStorage.setItem('contador', '0'); // Reinicia o contador
        }
    }, []); // Executa a cada atualização da página

    return (
        <Button
            type="primary"
            onClick={openNotification}
            style={{ display: 'none' }}
        />
    );
}