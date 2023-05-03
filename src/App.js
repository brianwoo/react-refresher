import BlogDetails from './BlogDetails';
import Create from './Create';
import Home from './Home';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import UseMemoDemo from './UseMemoDemo';
import UseRefDemo from './UseRefDemo';
import UseContextDemo from './UseContextDemo';
import UseContextDemo1 from './UseContextDemo1';
import UseReducerDemo from './UseReducerDemo';
import UseReducerDemo1 from './UseReducerDemo1';
import UseCallbackDemo from './UseCallbackDemo';
import UseTransitionDemo from './UseTransitionDemo';
import UseDeferredValueDemo from './UseDeferredValueDemo';
import UseRefDemo1 from './UseRefDemo1';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create' element={<Create />} />
            <Route path='/blogs/:id' element={<BlogDetails />} />
            <Route path='/useMemoDemo' element={<UseMemoDemo />} />
            <Route path='/useRefDemo' element={<UseRefDemo />} />
            <Route path='/useRefDemo1' element={<UseRefDemo1 />} />
            <Route path='/useContextDemo' element={<UseContextDemo />} />
            <Route path='/useContextDemo1' element={<UseContextDemo1 />} />
            <Route path='/useReducerDemo' element={<UseReducerDemo />} />
            <Route path='/useReducerDemo1' element={<UseReducerDemo1 />} />
            <Route path='/useCallbackDemo' element={<UseCallbackDemo />} />
            <Route path='/useTransitionDemo' element={<UseTransitionDemo />} />
            <Route path='/useDeferredValueDemo' element={<UseDeferredValueDemo />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
