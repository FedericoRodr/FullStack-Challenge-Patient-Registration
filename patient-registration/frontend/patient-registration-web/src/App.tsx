import PatientsList from "./components/PatientsList/PatientsList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <p className="app-title">
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
