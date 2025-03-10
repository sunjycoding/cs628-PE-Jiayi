# Input
The application starts with an initial list of recipes. Users can add a new recipe by entering its name, ingredients, instructions, and cooking time in a form and clicking the "Save Recipe" button. They can also view, edit, or delete existing recipes.

# Process
When users enter recipe details and submit the form, the recipe is added to the database. The frontend uses React’s useState and useEffect to manage the list of recipes and handle form inputs. The backend, built with Express and MongoDB, processes API requests to retrieve, add, update, or delete recipes. After adding or updating a recipe, users are automatically redirected to the main recipe list. Each recipe in the list has links for detailed view, editing, and deletion.

# Output
The program displays the list of recipes as clickable items. When a user clicks on a recipe name, it brings them to a details page showing the recipe's name, ingredients, instructions, and cooking time. Each recipe can be edited or deleted directly from their respective detail and list views. The app provides a structured and simple way to view and manage recipes, making it easy for users to navigate between pages and interact with the recipe data.