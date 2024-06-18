import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useSnackbar } from 'notistack';

const DonationNotifications = ({ user }) => {
    const [message, setMessage] = useState('');
    const { enqueuedSnackbar } = useSnackbar();

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7062/donationHub") 
            .build();

        connection.on("ReceiveDonationNotification", (message) => {
            console.log(message);
            <enqueuedSnackbar message={message} variant="success" />// Or use a better notification system
        });

        connection.start().catch(error => console.error('Connection error: ', error));

        return () => {
            connection.stop();
        };
    }, []);

    return (
        <div>
        </div>
    );
};

export default DonationNotifications;
