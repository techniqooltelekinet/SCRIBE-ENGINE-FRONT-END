const API_BASE = 'https://scribe-engine-back-end.onrender.com';

document.getElementById('reportForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const description = form.description.value.trim();
  const location = form.location.value.trim();
  const type = form.type.value;
  const timestamp = new Date().toISOString();

  const payload = { description, location, type, timestamp };

  try {
    const res = await fetch(`${API_BASE}/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log('Submitted:', data);
    form.reset();
    loadReports(); // refresh archive list
  } catch (err) {
    console.error('❌ Submission failed:', err);
  }
});

async function loadReports() {
  try {
    const res = await fetch(`${API_BASE}/reports`);
    const { data } = await res.json();

    const list = document.getElementById('reportList');
    list.innerHTML = '';

    data.forEach(({ description, location, timestamp, type }) => {
      const item = document.createElement('li');
      item.innerHTML = `
        <strong>${type.toUpperCase()}</strong> at ${location || 'unknown'}<br/>
        <em>${new Date(timestamp).toLocaleString()}</em><br/>
        ${description}
      `;
      list.appendChild(item);
    });
  } catch (err) {
    console.error('❌ Failed to load reports:', err);
  }
}

window.onload = loadReports;
