import './styles/App.css';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Weather from './pages/Weather';
import Images from './pages/Images';
import News from './pages/News';
import { QueryClient , QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    {path : '/' , element : <Navigation/>,
      children : 
        [
          {path : '/' , element : <Home />},
          {path : 'weather' , element : <Weather />},
          {path : 'news' , element : <News />},
          {path : 'images' , element : <Images />},
          {path : 'about' , element : <About />},
          {path : 'weather/:city' , element : <Weather />},
          {path : 'news/:city' , element : <News />},
          {path : 'images/:city' , element : <Images />},
        ]
    }
  ]
)

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;