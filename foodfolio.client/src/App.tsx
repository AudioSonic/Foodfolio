import './App.css';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
    return(
    <div id='app'>
        <Sidebar />
        <div className='main-content'>
            <Header />
            <Dashboard />
        </div>
    </div>
    
)}

export default App;