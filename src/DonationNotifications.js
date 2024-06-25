import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const DonationNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://locahost:7062/donationHub") // Adjust the URL to your backend
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => {
        console.log('Connected to SignalR');
        connection.on("ReceiveDonationNotification", (message) => {
          setNotifications((prev) => [...prev, message]);
        });
      })
      .catch((err) => console.error('SignalR Connection Error: ', err));

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div>
      <h2>Donation Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default DonationNotification;
