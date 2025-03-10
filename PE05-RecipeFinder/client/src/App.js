import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import AddRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';

function App() {
  return (
    <Router>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <h1>Recipe Finder</h1>
          <div>
            <Link to="/" style={{ marginRight: '10px' }}>Recipe List</Link>
            <Link to="/add">Add Recipe</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/edit/:id" element={<EditRecipe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;