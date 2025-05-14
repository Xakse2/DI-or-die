import { Button } from './components/ui/button/button';
import { Header } from './components/header/Header';
import { Routes, Route } from 'react-router-dom';
import { routes } from './const/routes';

function App() {
  return (
    <div className="mx-auto px-[60px] flex flex-col items-center max-w-full min-h-svh">
      <Header />
      <Routes>
        {routes.map(({ path, element: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
      <div>
        <Button>Click me</Button>
      </div>
    </div>
  );
}

export default App;
