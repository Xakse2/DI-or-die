import { Header } from './components/header/header';
import { Home } from './pages/home/home';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto px-[60px] flex flex-col items-center max-w-full min-h-svh">
        <Header />
        <Home />
      </div>
    </BrowserRouter>
  );
}

export default App;
