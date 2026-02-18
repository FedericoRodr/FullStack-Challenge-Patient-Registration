import PatientsList from "./components/PatientsList/PatientsList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Patient management dashboard</h1>
      </header>

      <main className="app-main">
        <PatientsList />
      </main>
    </div>
  );
}

export default App;
