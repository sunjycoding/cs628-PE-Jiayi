import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
                setRecipe(response.data);
                setLoading(false);
            } catch (err) {
                setError('Recipe not found');
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [id]);

    if (loading) return <div>Loading recipe details...</div>;
    if (error) return <div>{error}</div>;
    if (!recipe) return <div>Recipe not found</div>;

    return (
        <div>
            <h2>{recipe.name}</h2>

            <div style={{ marginBottom: '20px' }}>
                <h3>Ingredients</h3>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Instructions</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{recipe.instructions}</p>
            </div>

            <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>

            <div style={{ marginTop: '20px' }}>
                <Link to={`/edit/${recipe._id}`} style={{ marginRight: '10px' }}>Edit Recipe</Link>
                <Link to="/">Back to Recipes</Link>
            </div>
        </div>
    );
}

export default RecipeDetails;