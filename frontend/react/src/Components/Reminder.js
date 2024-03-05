import React, { useState, useEffect } from 'react';
import './Reminder.css';

const Reminder = () => {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    // Request permission for notifications on component mount
    if ("Notification" in window) {
      Notification.requestPermission().then(function(permission) {
        if (Notification.permission !== "granted") {
          alert("Please allow notification access!");
        }
      });
    }
  }, []);
   // Function to add a new reminder
  const addReminder = (e) => {
    e.preventDefault(); // Prevent form submission
    const datetimeString = `${date} ${time}`;
    const newReminder = { title, description, datetimeString };
    setReminders([...reminders, newReminder]);
    scheduleReminder(newReminder);
  };

  const scheduleReminder = ({ title, description, datetimeString }) => {
    const scheduledTime = new Date(datetimeString);
    const currentTime = new Date();
    const timeDifference = scheduledTime - currentTime;

    if (timeDifference > 0) {
      setTimeout(() => {
        // Trigger notification
        new Notification(title, {
          body: description,
          requireInteraction: true,
        });
      }, timeDifference);
    } else {
      alert("The scheduled time is in the past!");
    }
  };
  // Function to delete a reminder by its index
  const deleteReminder = (index) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>Reminder</div>
      </div>
      <form onSubmit={addReminder} className='input'>
        <label>Title: </label>
        <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
        <label>Description: </label>
        <input type='text' value={description} onChange={e => setDescription(e.target.value)} />
        <label>Date: </label>
        <input type='date' value={date} onChange={e => setDate(e.target.value)} />
        <label>Time: </label>
        <input type='time' value={time} onChange={e => setTime(e.target.value)} />
        <button type='submit'>Schedule Reminder</button>
      </form>
      <div className="table-container">
        <table className='table'>
            <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date & Time</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {reminders.map((reminder, index) => (
                <tr key={index}>
                <td>{reminder.title}</td>
                <td>{reminder.description}</td>
                <td>{reminder.datetimeString}</td>
                <td><button onClick={() => deleteReminder(index)}>Delete</button></td>
                </tr>
            ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reminder;
