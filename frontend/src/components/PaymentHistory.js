import React from 'react';
function PaymentHistory({ payments }) {
  if (!payments || payments.length === 0) {
    return <div style={{margin:'20px 0', color:'#888'}}>No payment history available yet.</div>;
  }
  return (
    <div>
      <h3>Payment History</h3>
      <table>
        <thead><tr><th>Amount</th><th>Date</th><th>Due Date</th></tr></thead>
        <tbody>
          {payments.map((p, i) => (
            <tr key={i}>
              <td>{p.amount}</td>
              <td>{new Date(p.date).toLocaleDateString()}</td>
              <td>{new Date(p.dueDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default PaymentHistory;
