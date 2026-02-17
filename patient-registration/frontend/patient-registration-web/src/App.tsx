import PatientsList from "./components/PatientsList/PatientsList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Clinic App</h1>
        <p className="app-subtitle">
          Patient management dashboard
        </p>
      </header>

      <main className="app-main">
        <PatientsList />
      </main>
    </div>
  );
}

export default App;
