import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/recipes');
            setRecipes(response.data);
            setLoading(false);
        } catch (err) {
            setError('Error fetching recipes');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this recipe?')) {
            try {
                await axios.delete(`http://localhost:5000/api/recipes/${id}`);
                // Remove deleted recipe from state
                setRecipes(recipes.filter(recipe => recipe._id !== id));
            } catch (err) {
                setError('Error deleting recipe');
            }
        }
    };

    if (loading) return <div>Loading recipes...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>All Recipes</h2>
            {recipes.length === 0 ? (
                <p>No recipes found. Please add some recipes!</p>
            ) : (
                <div>
                    {recipes.map(recipe => (
                        <div key={recipe._id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                            <h3>{recipe.name}</h3>
                            <p>Cooking Time: {recipe.cookingTime} minutes</p>
                            <div>
                                <Link to={`/recipe/${recipe._id}`} style={{ marginRight: '10px' }}>View</Link>
                                <Link to={`/edit/${recipe._id}`} style={{ marginRight: '10px' }}>Edit</Link>
                                <button onClick={() => handleDelete(recipe._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default RecipeList;