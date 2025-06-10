import { Header } from './components/header/Header';
import { Footer } from './components/footer/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import { routes } from './const/routes';
import NotFound from './pages/notfound/NotFound';
// import { useFetchToken } from './hooks/useClientToken';

function App() {
  const location = useLocation();
  const isNotFoundPage = location.pathname === '/404';
  // useFetchToken();

  return (
    <div className="mx-auto px-[60px] flex flex-col items-center max-w-full min-h-svh">
      {!isNotFoundPage && <Header />}
      <Routes>
        {routes.map(({ path, element: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isNotFoundPage && <Footer />}
    </div>
  );
}

export default App;
