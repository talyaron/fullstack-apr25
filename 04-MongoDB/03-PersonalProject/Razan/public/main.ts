const list = document.getElementById('list') as HTMLUListElement;
const qInput = document.getElementById('q') as HTMLInputElement;
document.getElementById('search')!.addEventListener('click', () => load(qInput.value));

async function load(q?: string) {
  const url = q ? `/api/events?q=${encodeURIComponent(q)}` : '/api/events';
  const res = await fetch(url);
  const data = await res.json();
  list.innerHTML = data.map((e:any)=>`
    <li class="card">
      <h3>${e.title}</h3>
      <p>${new Date(e.date).toLocaleString()}</p>
      <p>${e.location}</p>
      <small>${(e.tags||[]).join(' · ')}</small>
    </li>`).join('');
}
load();
