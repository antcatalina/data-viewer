import type { JSX } from "react/jsx-runtime";
import "./App.css";

function App(): JSX.Element {

  return (
    <>
      <h1>DataViewer</h1>
      <div className="card">
        <p>
          A lightweight data visualization tool that allows users to upload CSV
          or Excel files and instantly generate interactive charts and graphs.
        </p>
        <p>
          Users can switch between datasets, apply basic filters, and export
          visualizations or underlying data.
        </p>
      </div>
      <p className="read-the-docs">Coming soon</p>
    </>
  );
}

export default App;
