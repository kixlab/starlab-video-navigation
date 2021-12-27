# Human-AI Video Frame Annotator

Displays a **hierarchical graph** of the objects and actions in a recipe video.
- **Node**: Each node represents a specific cooking action performed.
- **Edge**: Each edge represents a different ingredient used in the recipe.
- **Groups**: Each group represents a cooking surface or utensil used and contains all actions performed with that surface/utensil.

### Features
- Action-based navigation: Select a node in the graph to watch that action in a loop.
- Ingredient-based navigation: Select an edge in the graph to watch all the moments in which the corresponding ingredient appears in the video.
- Surface-based navigation: Select a group in the graph to watch all the actions that take palce in that surface.

### In Progress
- **Model**
  - Increasing performance.
- **Pipeline**
  - Allow grouping of actions by detecting the surface.
- **Interface**
  - Automatically extract thumbnails to show in the graph.
