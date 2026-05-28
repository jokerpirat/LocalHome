# Pixel Rainy Cabin Page Design

## Goal

Create a single-page interactive pixel-art cabin scene. The page should feel like a warm home seen from outside on a blue rainy night, with visible cats, dogs, food, and gentle motion. The experience should be visual first, with a moderate amount of text in status panels and short interaction messages.

## Visual Direction

The main scene is an exterior cabin in a blue-toned rainy night. The outside uses deep navy, muted blue, lake blue, and blue gray. Warm yellow and amber are reserved for window light, lamps, food highlights, and interaction feedback.

The style is refined pixel art rather than coarse block art. Edges should remain crisp, with visible pixel structure, hard shadows, and limited gradients. The cabin should read clearly on first view: roof, windows, door, path, puddles, rain, and warm interior hints.

The emotional contrast is important: outside is cool and rainy; inside is warm, safe, and domestic. Through the window or doorway, the user should be able to glimpse a table, warm lamp, and sweet-and-sour pork ribs.

## Page Type

The page is a responsive single-page interactive scene. It is not a landing page and should not use marketing-style sections. The first screen is the usable cabin scene itself.

Desktop layout:
- Wide horizontal cabin scene with richer rain and environmental detail.
- Interaction panel placed beside or below the scene without covering important artwork.
- Pet status and action controls visible but compact.

Mobile layout:
- Cabin scene centered in a vertical layout.
- Controls and detail panels stack below the scene.
- Hotspots, text, and panels must not overlap the cabin, pets, or each other.

## Core Scene Elements

Required visible elements:
- Blue rainy night background.
- Pixel cabin with warm window light.
- Door or porch area.
- Puddles and roof drip detail.
- A cat and a dog.
- Human food, with sweet-and-sour pork ribs as the main dish.
- Pet food for both animals, such as dried fish for the cat and bone biscuits for the dog.

Optional supporting details:
- Hot soup, bread, or cookies on the table.
- Small lamp, fireplace glow, or curtain silhouette.
- Rain reflections on the path.

## Interactions

The page has five primary clickable areas:

1. Window
   - Shows a warm interior detail panel.
   - Mentions lamp light, raindrops on glass, and the feeling of home.

2. Door or porch
   - Moves the pets toward the entrance.
   - Shows a short message such as "It is raining outside, but home is warm."

3. Dining table or food area
   - Shows sweet-and-sour pork ribs as the featured dish.
   - Can also show soup, bread, or other home food.

4. Cat
   - Shows cat status.
   - Allows feeding dried fish.
   - Allows a small affection interaction.

5. Dog
   - Shows dog status.
   - Allows feeding a bone biscuit.
   - Allows a small affection interaction.

The text should be concise. It appears in status bars, interaction panels, and short feedback messages only.

## Pet State Model

Both pets have simple state values:
- Fullness
- Happiness
- Sleepiness

Feeding increases fullness and happiness. Affection interactions increase happiness. Repeated interactions can increase sleepiness. Sleepy pets should visibly settle down near the warm cabin light or porch.

The state model should remain simple and local to the page. It does not need persistence, accounts, inventory systems, or complex progression.

## Animation Requirements

Rain must be continuously animated:
- Background rain layer with subtle thin drops.
- Foreground rain layer with brighter diagonal pixel streaks.
- Roof drip animation.
- Puddle ripple animation.

Cat animation:
- Idle blinking.
- Tail movement.
- Occasional stretch or small body shift.
- Feeding animation where the cat walks to the food area and lowers its head.
- Sleepy animation where the cat curls up or stays low near warm light.

Dog animation:
- Idle tail wag.
- Head lift or small bounce.
- Feeding animation where the dog moves to the food area.
- Happy animation with stronger tail wag or small step loop.
- Sleepy animation where the dog lies down.

Exploration behavior:
- Clicking a hotspot can move the cat and dog toward that area using pixel-like step motion.
- Movement should be simple and readable, not physics-based.

All animation should be implemented with CSS keyframes plus small JavaScript state changes. The page should stay lightweight and run as a static local file.

## Technical Approach

Create a static frontend with:
- `index.html` for structure, scene layers, hotspots, controls, and panels.
- `styles.css` for pixel-art drawing, blue rainy palette, responsive layout, and animations.
- `script.js` for pet states, hotspot selection, feeding, affection, exploration movement, and feedback text.

No backend is required. No build step is required unless the final implementation discovers a clear need for one.

The pixel scene can be built with HTML and CSS elements. If any bitmap assets are used, they should be locally generated or embedded in a way that keeps the page self-contained and easy to run.

## Accessibility And Usability

Hotspots should be buttons or otherwise keyboard reachable. Each should have a clear accessible label. Focus states must be visible. The page should work with mouse and touch.

Text must fit its containers on desktop and mobile. Panels should not cover the main pet or food interactions in a way that blocks use.

## Acceptance Criteria

The implementation is complete when:
- Opening the page immediately shows a blue rainy pixel cabin.
- The cabin feels warm and domestic despite the cold rain.
- Cat, dog, rain, roof drips, and puddles are visibly animated.
- Sweet-and-sour pork ribs are clearly represented as the main human food.
- Cat and dog food interactions are available.
- Clicking window, door, food, cat, and dog produces clear feedback.
- Feeding or affection changes pet state and visible behavior.
- Desktop and mobile layouts remain usable without overlapping text or controls.
