import { useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import WeekPlan from './pages/WeekPlan';
import Recipes from './pages/Recipes';
import Foods from './pages/Foods';
import ShoppingList from './pages/ShoppingList';
import Sidebar, { type Page } from "./components/layout/Sidebar";
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
    const [currentPage, setCurrentPage] = useState<Page>("dashboard");
    return(
    <div id='app'>
            <Sidebar
                currentPage={currentPage}
                onNavigate={setCurrentPage}
            />

            <main id="main-content">
                {currentPage === "dashboard" && <Dashboard />}
                {currentPage === "weekPlan" && <WeekPlan />}
                {currentPage === "recipes" && <Recipes />}
                {currentPage === "foods" && <Foods />}
                {currentPage === "shoppingList" && <ShoppingList />}
                {currentPage === "profile" && <Profile />}
                {currentPage === "settings" && <Settings />}
            </main>
    </div>
    
)}

export default App;