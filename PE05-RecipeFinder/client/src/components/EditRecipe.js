import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({
        name: '',
        ingredients: '',
        instructions: '',
        cookingTime: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
                const recipeData = response.data;

                // Format ingredients array to string for form
                setRecipe({
                    ...recipeData,
                    ingredients: recipeData.ingredients.join(', ')
                });
                setLoading(false);
            } catch (err) {
                setError('Failed to load recipe');
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Format ingredients as an array
            const formattedRecipe = {
                ...recipe,
                ingredients: recipe.ingredients.split(',').map(item => item.trim())
            };

            await axios.put(`http://localhost:5000/api/recipes/${id}`, formattedRecipe);
            setSaving(false);
            navigate(`/recipe/${id}`);
        } catch (err) {
            setError('Failed to update recipe');
            setSaving(false);
        }
    };

    if (loading) return <div>Loading recipe...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Edit Recipe</h2>

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

                <button type="submit" disabled={saving} style={{ padding: '5px 10px', marginRight: '10px' }}>
                    {saving ? 'Saving...' : 'Update Recipe'}
                </button>
                <button
                    type="button"
                    onClick={() => navigate(`/recipe/${id}`)}
                    disabled={saving}
                    style={{ padding: '5px 10px' }}
                >
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default EditRecipe;