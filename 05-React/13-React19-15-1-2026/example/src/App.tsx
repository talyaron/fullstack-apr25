import { use, Suspense, useState } from 'react'
import './App.css'

// Simulated API call - returns a Promise
async function fetchUser(id: number): Promise<{ name: string; email: string }> {
  await new Promise(resolve => setTimeout(resolve, 1500)) // 1.5 second delay to see loading state
  
  return {
    name: `User ${id}`,
    email: `user${id}@example.com`
  }
}

// Component that uses the `use` hook to read a Promise
function UserCard({ userPromise }: { userPromise: Promise<{ name: string; email: string }> }) {
  // 🎯 The `use` hook reads the Promise value
  // React will SUSPEND this component until the Promise resolves
  const user = use(userPromise)

  return (
    <div className="card">
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )
}

function App() {
  const [userId, setUserId] = useState(1)

  // Create a Promise for the user data
  // Important: The Promise must be created OUTSIDE the component that uses `use`
  const [userPromise, setUserPromise] = useState(() => fetchUser(userId))

  const loadNewUser = () => {
    const newId = userId + 1
    setUserId(newId)
    setUserPromise(fetchUser(newId)) // Create new Promise
  }

  return (
    <div>
      <h1>React 19 `use` Hook Demo</h1>

      {/* Suspense catches the "suspension" and shows fallback while loading */}
      <Suspense fallback={<div className="card">⏳ Loading user...</div>}>
        <UserCard userPromise={userPromise} />
      </Suspense>

      <button onClick={loadNewUser}>
        Load User {userId + 1}
      </button>

      <div style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '500px', margin: '2rem auto' }}>
        <h3>How `use` works:</h3>
        <ul>
          <li>Pass a Promise to a child component</li>
          <li>Child calls <code>use(promise)</code> to read the value</li>
          <li>React <strong>suspends</strong> until Promise resolves</li>
          <li>Suspense boundary shows fallback during loading</li>
        </ul>
      </div>
    </div>
  )
}

export default App
