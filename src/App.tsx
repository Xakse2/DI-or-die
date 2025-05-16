import { Header } from './components/header/Header';
import { HomePage } from './pages/home/HomePage';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="mx-auto px-[60px] flex flex-col items-center max-w-full min-h-svh">
        <Header />
        <HomePage />
      </div>
    </BrowserRouter>
  );
}

export default App;
