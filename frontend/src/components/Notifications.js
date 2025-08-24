import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Notifications({ internId }) {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/notification/${internId}`).then(res => setNotifications(res.data));
  }, [internId]);
  if (!notifications || notifications.length === 0) {
    return <div style={{margin:'20px 0', color:'#888'}}>No notifications yet.</div>;
  }
  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((n, i) => <li key={i}>{n.message}</li>)}
      </ul>
    </div>
  );
}
export default Notifications;
