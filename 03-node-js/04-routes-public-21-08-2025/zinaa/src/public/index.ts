// ...existing code...
async function main() {
    try {
        const initiativeCount = await getInitiativeCount();
        console.log('initiativeCount', initiativeCount);
        const initiatives = await loadInitiatives();
        if (initiatives.length > 0) {
            renderInitiatives(initiatives);
        }
    } catch (err) {
        console.error(err);
    }
}
main();

async function getInitiativeCount(): Promise<number> {
    const res = await fetch('/initiatives/get-initiatives');
    if (!res.ok) {
        throw new Error(`Failed to fetch initiative count: ${res.status}`);
    }
    const data = await res.json();

    // API might return { initiatives: [...] } or an array directly or { count: number }
    if (typeof data === 'object' && data !== null) {
        if (Array.isArray(data)) {
            return data.length;
        }
        if (Array.isArray((data as any).initiatives)) {
            return (data as any).initiatives.length;
        }
        if (typeof (data as any).count === 'number') {
            return (data as any).count;
        }
    }
    return 0;
}

async function loadInitiatives(params?: any): Promise<any[]> {
    const res = await fetch('/initiatives/get-initiatives');
    if (!res.ok) {
        throw new Error(`Failed to fetch initiatives: ${res.status}`);
    }
    const data = await res.json();

    // Return the initiatives array whether the API returned { initiatives: [...] } or [...]
    if (Array.isArray(data)) {
        return data;
    }
    if (Array.isArray((data as any).initiatives)) {
        return (data as any).initiatives;
    }
    return [];
}

interface Initiative {
    title: string;
    description: string;
}
async function displayInitiatives() {
    try {
        const initiatives = await loadInitiatives();
        if (!initiatives || initiatives.length === 0) {
            console.log('No initiatives found');
            return;
        }
        initiatives.forEach((initiative) => {
            console.log(`Title: ${initiative.title}`);
            console.log(`Description: ${initiative.description}`);
        });
    } catch (error) {
        console.error(`Error displaying initiatives: ${error}`);
    }
}
// view
function renderInitiatives(initiatives: Initiative[]) {
    const container = document.getElementById('list-of-projects');
    if (!container) return; // Exit if container not found

    container.innerHTML = ''; // Clear existing content

    initiatives.forEach((initiative) => {
        const initiativeElement = document.createElement('div');
        initiativeElement.className = 'initiative';
        initiativeElement.innerHTML = `
            <h2>${initiative.title}</h2>
            <p>${initiative.description}</p>
        `;
        container.appendChild(initiativeElement);
    });
}