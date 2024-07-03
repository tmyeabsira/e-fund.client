import React, { useEffect, useState } from 'react';
import axios from './api';
import { jwtDecode } from 'jwt-decode';
import { useSnackbar } from 'notistack';

const FundraiserNotifications = ({ username, onNewMessage }) => {
    const [messages, setMessages] = useState([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const eventSource = new EventSource(`https://localhost:7062/api/FundraisingNotifications/stream/${username}`);
       // console.log("Notifs mounted with username " + username);
       // console.log(eventSource);

        eventSource.onmessage = function(event) {
            const message = event.data;
            setMessages(prevMessages => [...prevMessages, message]);
            onNewMessage(message); // Notify parent component of the new message
            enqueueSnackbar(message, { variant: 'info' }); // Show notification
            console.log(event);
        };

        eventSource.onerror = function(event) {
            console.error('Error with fetch notifs:', event);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [username, onNewMessage, enqueueSnackbar]);

  return (
        <div>
            
            {/* <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>*/}
            </div> 
    );
};

export default FundraiserNotifications;
