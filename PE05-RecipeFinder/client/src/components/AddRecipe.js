import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddRecipe() {
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        name: '',
        ingredients: '',
        instructions: '',
        cookingTime: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Format ingredients as an array
            const formattedRecipe = {
                ...recipe,
                ingredients: recipe.ingredients.split(',').map(item => item.trim())
            };

            await axios.post('http://localhost:5000/api/recipes', formattedRecipe);
            setLoading(false);
            navigate('/');
        } catch (err) {
            setError('Failed to add recipe');
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Add New Recipe</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Recipe Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={recipe.name}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Ingredients (comma separated):</label>
                    <textarea
                        name="ingredients"
                        value={recipe.ingredients}
                        onChange={handleChange}
                        required
                        rows="4"
                        style={{ width: '100%', padding: '5px' }}
                        placeholder="Example: 2 eggs, 1 cup flour, 1/2 cup sugar"
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Cooking Instructions:</label>
                    <textarea
                        name="instructions"
                        value={recipe.instructions}
                        onChange={handleChange}
                        required
                        rows="6"
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Cooking Time (minutes):</label>
                    <input
                        type="number"
                        name="cookingTime"
                        value={recipe.cookingTime}
                        onChange={handleChange}
                        required
                        style={{ width: '100px', padding: '5px' }}
                    />
                </div>

                <button type="submit" disabled={loading} style={{ padding: '5px 10px', marginRight: '10px' }}>
                    {loading ? 'Saving...' : 'Save Recipe'}
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    disabled={loading}
                    style={{ padding: '5px 10px' }}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default AddRecipe;