import React from 'react';
function ScheduleViewer({ schedule }) {
  if (!schedule || schedule.length === 0) {
    return <div style={{margin:'20px 0', color:'#888'}}>No schedule available yet.</div>;
  }
  return (
    <div>
      <h3>Your Schedule</h3>
      <ul>
        {schedule.map((s, i) => (
          <li key={i}>{s.week}: {s.classes.map(c => `${c.subject} on ${new Date(c.date).toLocaleDateString()} at ${c.time}`).join(', ')}</li>
        ))}
      </ul>
    </div>
  );
}
export default ScheduleViewer;
