import Home from "./Pages/Home";
import { UsersContextProvider } from "./context/UserContext";

function App() {
  return (
    <div className="App" class="font-Montserrat">
      <UsersContextProvider>
        <Home />
      </UsersContextProvider>
    </div>
  );
}

export default App;
