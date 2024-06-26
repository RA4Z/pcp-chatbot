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
        let contador = parseInt(localStorage.getItem('propaganda_chatbot') || '0', 15);
        contador = Math.min(contador + 1, 15);
        localStorage.setItem('propaganda_chatbot', contador.toString());

        if (contador === 15) {
            openNotification();
            localStorage.setItem('propaganda_chatbot', '0');
        }
    }, []);

    return (
        <Button
            type="primary"
            onClick={openNotification}
            style={{ display: 'none' }}
        />
    );
}