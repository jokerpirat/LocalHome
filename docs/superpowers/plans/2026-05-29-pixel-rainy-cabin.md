# Pixel Rainy Cabin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive static pixel-art rainy cabin page with animated rain, animated cat and dog characters, clickable exploration hotspots, sweet-and-sour pork ribs, and simple pet state interactions.

**Architecture:** The page is a static frontend split into one responsibility per file: markup in `index.html`, visual scene and animations in `styles.css`, interaction/state logic in `script.js`, and Playwright verification in `tests/pixel-cabin.spec.js`. The implementation avoids a build step; `npm` is used only to run a local static server and browser tests.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js package scripts, Playwright for end-to-end verification.

---

## File Structure

- Create: `package.json`
  - Defines local test and preview scripts.
  - Adds Playwright as a development dependency for verification only.
- Create: `index.html`
  - Holds semantic page structure, scene layers, pixel cabin elements, hotspot buttons, status panel, action controls, and live feedback region.
- Create: `styles.css`
  - Holds blue rainy palette, pixel-art construction, responsive layout, animation keyframes, pet visual states, and focus styles.
- Create: `script.js`
  - Holds pet state, hotspot selection, feeding, affection, movement targets, sleepiness behavior, and DOM updates.
- Create: `tests/pixel-cabin.spec.js`
  - Verifies first-screen content, core interactions, pet state changes, animation hooks, keyboard access, and mobile layout.
- Modify: `docs/superpowers/specs/2026-05-29-pixel-rainy-cabin-design.md`
  - No planned modification during implementation unless a requirement changes.

## Implementation Notes

- Keep the page runnable by opening `index.html` directly, but use a local static server for Playwright tests.
- Use actual buttons for hotspots so mouse, touch, and keyboard access all work.
- Use `data-target` attributes for hotspot identity and `data-action` attributes for pet actions.
- Use CSS variables for pet movement coordinates so JS can move the cat and dog without rewriting class lists excessively.
- Use `prefers-reduced-motion` to pause or simplify animation for users who request reduced motion.
- Commit after each task so changes are easy to inspect or revert.

---

### Task 1: Test Harness And Static App Skeleton

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `tests/pixel-cabin.spec.js`

- [ ] **Step 1: Create the first failing Playwright test**

Create `tests/pixel-cabin.spec.js` with this content:

```javascript
const { test, expect } = require('@playwright/test');

test.describe('pixel rainy cabin', () => {
  test('renders the main cabin experience and required controls', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: '雨夜小屋' })).toBeVisible();
    await expect(page.getByRole('button', { name: '查看窗户' })).toBeVisible();
    await expect(page.getByRole('button', { name: '查看门口' })).toBeVisible();
    await expect(page.getByRole('button', { name: '查看糖醋排骨' })).toBeVisible();
    await expect(page.getByRole('button', { name: '查看小猫' })).toBeVisible();
    await expect(page.getByRole('button', { name: '查看小狗' })).toBeVisible();
    await expect(page.getByText('糖醋排骨')).toBeVisible();
    await expect(page.getByText('小鱼干')).toBeVisible();
    await expect(page.getByText('骨头饼干')).toBeVisible();
  });
});
```

- [ ] **Step 2: Create `package.json`**

Create `package.json` with this content:

```json
{
  "name": "pixel-rainy-cabin",
  "version": "1.0.0",
  "private": true,
  "description": "Responsive pixel-art rainy cabin page with animated pets and food interactions.",
  "scripts": {
    "serve": "npx http-server . -p 4173 -c-1",
    "test": "playwright test",
    "test:headed": "playwright test --headed"
  },
  "devDependencies": {
    "@playwright/test": "^1.44.0",
    "http-server": "^14.1.1"
  }
}
```

- [ ] **Step 3: Install dependencies**

Run:

```bash
npm install
npx playwright install chromium
```

Expected:
- `package-lock.json` is created.
- Playwright Chromium is available.
- No dependency install errors.

- [ ] **Step 4: Create the minimal skeleton that still fails visual/content expectations**

Create `index.html` with this content:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>雨夜小屋</title>
  </head>
  <body>
    <main>
      <h1>雨夜小屋</h1>
      <p>蓝色雨夜里的温暖像素小屋。</p>
    </main>
  </body>
</html>
```

- [ ] **Step 5: Run the test and verify it fails for missing controls**

Run:

```bash
npm test -- tests/pixel-cabin.spec.js
```

Expected:
- FAIL.
- The failure mentions a missing button such as `查看窗户`.

- [ ] **Step 6: Commit the harness skeleton**

Run:

```bash
git add package.json package-lock.json index.html tests/pixel-cabin.spec.js
git commit -m "test: add pixel cabin verification harness"
```

Expected:
- A commit is created.

---

### Task 2: Semantic Scene Markup And Required Content

**Files:**
- Modify: `index.html`
- Modify: `tests/pixel-cabin.spec.js`

- [ ] **Step 1: Extend the test for semantic regions and live panel**

Replace `tests/pixel-cabin.spec.js` with this content:

```javascript
const { test, expect } = require('@playwright/test');

test.describe('pixel rainy cabin', () => {
  test('renders the main cabin experience and required controls', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: '雨夜小屋' })).toBeVisible();
    await expect(page.getByRole('region', { name: '蓝调雨夜小屋场景' })).toBeVisible();
    await expect(page.getByRole('region', { name: '互动信息' })).toBeVisible();
    await expect(page.getByRole('button', { name: '查看窗户' })).toBeVisible();
    await expect(page.getByRole('button', { name: '查看门口' })).toBeVisible();
    await expect(page.getByRole('button', { name: '查看糖醋排骨' })).toBeVisible();
    await expect(page.getByRole('button', { name: '查看小猫' })).toBeVisible();
    await expect(page.getByRole('button', { name: '查看小狗' })).toBeVisible();
    await expect(page.getByText('糖醋排骨')).toBeVisible();
    await expect(page.getByText('小鱼干')).toBeVisible();
    await expect(page.getByText('骨头饼干')).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the test and verify it fails for missing regions**

Run:

```bash
npm test -- tests/pixel-cabin.spec.js
```

Expected:
- FAIL.
- The failure mentions the missing `蓝调雨夜小屋场景` region.

- [ ] **Step 3: Replace `index.html` with complete semantic markup**

Replace `index.html` with this content:

```html
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>雨夜小屋</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <main class="app-shell">
      <section class="scene-card" aria-labelledby="page-title">
        <div class="title-row">
          <div>
            <h1 id="page-title">雨夜小屋</h1>
            <p class="subtitle">蓝色雨幕外，是一间亮着灯的家。</p>
          </div>
          <div class="weather-chip" aria-label="天气：雨夜">RAIN</div>
        </div>

        <section class="scene" aria-label="蓝调雨夜小屋场景">
          <div class="sky" aria-hidden="true">
            <span class="star star-one"></span>
            <span class="star star-two"></span>
            <span class="cloud cloud-one"></span>
            <span class="cloud cloud-two"></span>
          </div>
          <div class="rain-layer rain-back" aria-hidden="true"></div>
          <div class="rain-layer rain-front" aria-hidden="true"></div>

          <div class="cabin" aria-hidden="true">
            <div class="roof">
              <span class="drip drip-one"></span>
              <span class="drip drip-two"></span>
              <span class="drip drip-three"></span>
            </div>
            <div class="house-body">
              <div class="window window-left">
                <span class="curtain"></span>
                <span class="lamp-glow"></span>
              </div>
              <div class="window window-right">
                <span class="table-silhouette"></span>
                <span class="rib-plate-mini"></span>
              </div>
              <div class="door">
                <span class="door-light"></span>
              </div>
              <div class="porch-light"></div>
            </div>
          </div>

          <div class="path" aria-hidden="true">
            <span class="puddle puddle-one"></span>
            <span class="puddle puddle-two"></span>
          </div>

          <div class="food-table" aria-hidden="true">
            <span class="plate plate-ribs"></span>
            <span class="steam steam-one"></span>
            <span class="steam steam-two"></span>
            <span class="soup-bowl"></span>
          </div>

          <div class="pet pet-cat" data-pet="cat" aria-hidden="true">
            <span class="cat-tail"></span>
            <span class="cat-body"></span>
            <span class="cat-head"></span>
            <span class="cat-eye cat-eye-left"></span>
            <span class="cat-eye cat-eye-right"></span>
          </div>

          <div class="pet pet-dog" data-pet="dog" aria-hidden="true">
            <span class="dog-tail"></span>
            <span class="dog-body"></span>
            <span class="dog-head"></span>
            <span class="dog-ear"></span>
          </div>

          <div class="pet-food cat-food" aria-hidden="true">小鱼干</div>
          <div class="pet-food dog-food" aria-hidden="true">骨头饼干</div>

          <button class="hotspot hotspot-window" type="button" data-target="window" aria-label="查看窗户"></button>
          <button class="hotspot hotspot-door" type="button" data-target="door" aria-label="查看门口"></button>
          <button class="hotspot hotspot-food" type="button" data-target="food" aria-label="查看糖醋排骨"></button>
          <button class="hotspot hotspot-cat" type="button" data-target="cat" aria-label="查看小猫"></button>
          <button class="hotspot hotspot-dog" type="button" data-target="dog" aria-label="查看小狗"></button>
        </section>
      </section>

      <aside class="info-panel" aria-label="互动信息">
        <div class="panel-header">
          <p class="eyebrow">当前发现</p>
          <h2 id="panel-title">暖灯亮着</h2>
        </div>
        <p id="panel-copy" class="panel-copy" aria-live="polite">雨滴落在屋檐上，窗里透出暖光。点击小屋、食物、小猫或小狗看看细节。</p>

        <div class="food-display" aria-label="桌上的食物">
          <span class="food-name">糖醋排骨</span>
          <span class="food-note">热气、酸甜酱汁、米饭和一小碗汤。</span>
        </div>

        <div class="pet-status-grid" aria-label="宠物状态">
          <article class="pet-status" data-status-card="cat">
            <h3>小猫</h3>
            <p>饱腹 <span data-stat="cat-fullness">45</span></p>
            <p>开心 <span data-stat="cat-happiness">55</span></p>
            <p>困意 <span data-stat="cat-sleepiness">20</span></p>
          </article>
          <article class="pet-status" data-status-card="dog">
            <h3>小狗</h3>
            <p>饱腹 <span data-stat="dog-fullness">50</span></p>
            <p>开心 <span data-stat="dog-happiness">60</span></p>
            <p>困意 <span data-stat="dog-sleepiness">15</span></p>
          </article>
        </div>

        <div class="action-row" aria-label="宠物互动">
          <button type="button" data-action="feed-cat">喂小鱼干</button>
          <button type="button" data-action="pet-cat">摸摸小猫</button>
          <button type="button" data-action="feed-dog">喂骨头饼干</button>
          <button type="button" data-action="pet-dog">拍拍小狗</button>
        </div>
      </aside>
    </main>

    <script src="script.js"></script>
  </body>
</html>
```

- [ ] **Step 4: Run the test and verify it passes**

Run:

```bash
npm test -- tests/pixel-cabin.spec.js
```

Expected:
- PASS.

- [ ] **Step 5: Commit semantic markup**

Run:

```bash
git add index.html tests/pixel-cabin.spec.js
git commit -m "feat: add pixel cabin semantic scene markup"
```

Expected:
- A commit is created.

---

### Task 3: Pixel-Art Layout, Blue Rainy Palette, And Responsive Structure

**Files:**
- Create: `styles.css`
- Modify: `tests/pixel-cabin.spec.js`

- [ ] **Step 1: Add layout and color assertions**

Append this test inside the existing `test.describe` block in `tests/pixel-cabin.spec.js`:

```javascript
test('uses blue rainy styling and keeps mobile layout usable', async ({ page }) => {
  await page.goto('/');

  const scene = page.locator('.scene');
  await expect(scene).toHaveCSS('image-rendering', 'pixelated');

  const background = await scene.evaluate((node) => getComputedStyle(node).backgroundColor);
  expect(background).toBe('rgb(8, 22, 48)');

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('region', { name: '蓝调雨夜小屋场景' })).toBeVisible();
  await expect(page.getByRole('region', { name: '互动信息' })).toBeVisible();

  const sceneBox = await page.locator('.scene').boundingBox();
  const panelBox = await page.locator('.info-panel').boundingBox();
  expect(sceneBox.height).toBeGreaterThan(260);
  expect(panelBox.y).toBeGreaterThan(sceneBox.y + sceneBox.height - 20);
});
```

- [ ] **Step 2: Run the test and verify it fails for missing stylesheet**

Run:

```bash
npm test -- tests/pixel-cabin.spec.js
```

Expected:
- FAIL.
- The failure mentions the `.scene` background or `image-rendering`.

- [ ] **Step 3: Create the base `styles.css`**

Create `styles.css` with this content:

```css
:root {
  --night-900: #081630;
  --night-800: #0c2348;
  --night-700: #12355f;
  --rain-500: #4da3c7;
  --rain-300: #8bd3ea;
  --wood-700: #35425e;
  --wood-500: #51617c;
  --warm-500: #ffc76f;
  --warm-300: #ffe3a1;
  --food-500: #c8493a;
  --food-300: #ff9f67;
  --ink: #e8f5ff;
  --muted: #9db8cb;
  --panel: #10233d;
  --panel-border: #3b6f8f;
  --cat-x: 19%;
  --cat-y: 74%;
  --dog-x: 68%;
  --dog-y: 75%;
  font-family: "Courier New", Consolas, monospace;
}

* {
  box-sizing: border-box;
}

html {
  min-height: 100%;
  background: var(--night-900);
}

body {
  min-height: 100vh;
  margin: 0;
  color: var(--ink);
  background:
    linear-gradient(180deg, #081630 0%, #0c2348 48%, #09182f 100%);
}

button {
  font: inherit;
}

.app-shell {
  width: min(1180px, calc(100vw - 32px));
  min-height: 100vh;
  margin: 0 auto;
  padding: 24px 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 18px;
  align-items: start;
}

.scene-card,
.info-panel {
  border: 4px solid var(--panel-border);
  background: rgba(10, 28, 55, 0.92);
  box-shadow: 0 0 0 4px #071226, 0 18px 0 rgba(3, 8, 18, 0.45);
}

.scene-card {
  padding: 16px;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 14px;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1 {
  font-size: clamp(1.6rem, 3vw, 2.8rem);
  letter-spacing: 0;
}

.subtitle,
.panel-copy,
.food-note,
.pet-status p {
  color: var(--muted);
  line-height: 1.6;
}

.weather-chip {
  min-width: 72px;
  padding: 8px 10px;
  border: 3px solid var(--rain-300);
  color: var(--rain-300);
  text-align: center;
  background: #071226;
}

.scene {
  position: relative;
  overflow: hidden;
  min-height: 560px;
  border: 4px solid #071226;
  background-color: rgb(8, 22, 48);
  image-rendering: pixelated;
  isolation: isolate;
}

.sky,
.rain-layer,
.cabin,
.path,
.food-table,
.pet,
.pet-food,
.hotspot {
  position: absolute;
}

.sky {
  inset: 0;
  background:
    linear-gradient(180deg, rgba(20, 53, 95, 0.8), transparent 62%),
    linear-gradient(90deg, rgba(77, 163, 199, 0.12), transparent 55%);
  z-index: 1;
}

.star {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #c7efff;
  box-shadow: 0 0 0 2px rgba(199, 239, 255, 0.15);
}

.star-one {
  top: 12%;
  left: 14%;
}

.star-two {
  top: 20%;
  right: 18%;
}

.cloud {
  position: absolute;
  width: 130px;
  height: 26px;
  background: #132c52;
  box-shadow: 24px 12px 0 #102747, 72px 4px 0 #18375f;
  opacity: 0.82;
}

.cloud-one {
  top: 16%;
  left: 8%;
}

.cloud-two {
  top: 9%;
  right: 12%;
}

.cabin {
  left: 24%;
  bottom: 18%;
  width: 52%;
  height: 45%;
  z-index: 5;
}

.roof {
  position: absolute;
  left: -8%;
  top: 0;
  width: 116%;
  height: 28%;
  background: #203653;
  clip-path: polygon(50% 0, 100% 100%, 0 100%);
  border-bottom: 8px solid #5f88a4;
}

.house-body {
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: 0;
  height: 76%;
  background: var(--wood-700);
  border: 5px solid #18243a;
  box-shadow: inset 0 0 0 6px var(--wood-500), inset 0 -18px 0 rgba(7, 18, 38, 0.25);
}

.window {
  position: absolute;
  top: 22%;
  width: 25%;
  height: 28%;
  border: 4px solid #1b2538;
  background: var(--warm-300);
  box-shadow: 0 0 18px var(--warm-500);
}

.window-left {
  left: 10%;
}

.window-right {
  right: 10%;
}

.curtain,
.table-silhouette,
.lamp-glow,
.rib-plate-mini {
  position: absolute;
}

.curtain {
  inset: 0 55% 0 0;
  background: rgba(255, 145, 110, 0.45);
}

.lamp-glow {
  left: 48%;
  bottom: 18%;
  width: 16px;
  height: 24px;
  background: #fff1b8;
}

.table-silhouette {
  left: 12%;
  right: 12%;
  bottom: 14%;
  height: 10px;
  background: #5b3b36;
}

.rib-plate-mini {
  right: 18%;
  bottom: 28%;
  width: 28px;
  height: 12px;
  background: var(--food-500);
  box-shadow: 8px -3px 0 var(--food-300);
}

.door {
  position: absolute;
  left: 39%;
  bottom: 0;
  width: 22%;
  height: 43%;
  background: #18233a;
  border: 4px solid #111a2b;
}

.door-light {
  position: absolute;
  right: 10px;
  top: 45%;
  width: 7px;
  height: 7px;
  background: var(--warm-500);
}

.porch-light {
  position: absolute;
  left: 48%;
  top: 8%;
  width: 14px;
  height: 18px;
  background: var(--warm-500);
  box-shadow: 0 0 22px var(--warm-500);
}

.path {
  left: 32%;
  bottom: 0;
  width: 36%;
  height: 27%;
  background: linear-gradient(180deg, rgba(64, 89, 122, 0.8), rgba(24, 44, 72, 0.9));
  clip-path: polygon(38% 0, 62% 0, 100% 100%, 0 100%);
  z-index: 3;
}

.puddle {
  position: absolute;
  border: 3px solid rgba(139, 211, 234, 0.75);
  background: rgba(77, 163, 199, 0.2);
}

.puddle-one {
  left: 18%;
  bottom: 24%;
  width: 74px;
  height: 20px;
}

.puddle-two {
  right: 12%;
  bottom: 8%;
  width: 92px;
  height: 24px;
}

.food-table {
  right: 21%;
  bottom: 28%;
  width: 110px;
  height: 48px;
  z-index: 7;
}

.plate-ribs {
  position: absolute;
  left: 12px;
  top: 15px;
  width: 62px;
  height: 22px;
  background: #f4d8b0;
  box-shadow: inset 0 -5px 0 #c9a177;
}

.plate-ribs::before {
  content: "";
  position: absolute;
  left: 10px;
  top: 3px;
  width: 38px;
  height: 12px;
  background: var(--food-500);
  box-shadow: 12px -2px 0 var(--food-300), 22px 3px 0 #7d2e2b;
}

.soup-bowl {
  position: absolute;
  right: 8px;
  top: 18px;
  width: 28px;
  height: 18px;
  background: #dfefff;
  box-shadow: inset 0 -7px 0 #e88954;
}

.steam {
  position: absolute;
  width: 5px;
  height: 18px;
  background: rgba(255, 227, 161, 0.65);
}

.steam-one {
  left: 28px;
  top: -2px;
}

.steam-two {
  left: 50px;
  top: 1px;
}

.pet {
  width: 74px;
  height: 48px;
  z-index: 8;
  transform: translate(var(--pet-x), var(--pet-y));
  transition: transform 420ms steps(6);
}

.pet-cat {
  --pet-x: var(--cat-x);
  --pet-y: var(--cat-y);
}

.pet-dog {
  --pet-x: var(--dog-x);
  --pet-y: var(--dog-y);
}

.cat-body,
.cat-head,
.cat-tail,
.cat-eye,
.dog-body,
.dog-head,
.dog-ear,
.dog-tail {
  position: absolute;
}

.cat-body {
  left: 14px;
  bottom: 4px;
  width: 42px;
  height: 24px;
  background: #6d8aa7;
}

.cat-head {
  left: 36px;
  bottom: 22px;
  width: 28px;
  height: 22px;
  background: #7da0bd;
  box-shadow: -4px -8px 0 #7da0bd, 12px -8px 0 #7da0bd;
}

.cat-tail {
  left: 4px;
  bottom: 18px;
  width: 20px;
  height: 8px;
  background: #7da0bd;
}

.cat-eye {
  bottom: 32px;
  width: 4px;
  height: 4px;
  background: #071226;
}

.cat-eye-left {
  left: 45px;
}

.cat-eye-right {
  left: 57px;
}

.dog-body {
  left: 12px;
  bottom: 3px;
  width: 48px;
  height: 27px;
  background: #8b765b;
}

.dog-head {
  left: 42px;
  bottom: 23px;
  width: 30px;
  height: 24px;
  background: #a68b68;
}

.dog-ear {
  left: 48px;
  bottom: 18px;
  width: 10px;
  height: 22px;
  background: #5f4a3b;
}

.dog-tail {
  left: 2px;
  bottom: 24px;
  width: 20px;
  height: 8px;
  background: #a68b68;
}

.pet-food {
  padding: 4px 6px;
  border: 2px solid #253b5c;
  color: #fff1b8;
  background: #18233a;
  font-size: 0.75rem;
  z-index: 7;
}

.cat-food {
  left: 19%;
  bottom: 16%;
}

.dog-food {
  right: 20%;
  bottom: 16%;
}

.hotspot {
  width: 44px;
  height: 44px;
  border: 3px solid rgba(139, 211, 234, 0.9);
  background: rgba(255, 227, 161, 0.12);
  box-shadow: 0 0 0 4px rgba(8, 22, 48, 0.5);
  cursor: pointer;
  z-index: 12;
}

.hotspot:focus-visible {
  outline: 4px solid var(--warm-300);
  outline-offset: 3px;
}

.hotspot-window {
  left: 58%;
  top: 43%;
}

.hotspot-door {
  left: 47%;
  top: 55%;
}

.hotspot-food {
  right: 22%;
  top: 56%;
}

.hotspot-cat {
  left: 18%;
  bottom: 18%;
}

.hotspot-dog {
  right: 20%;
  bottom: 18%;
}

.info-panel {
  padding: 18px;
  position: sticky;
  top: 18px;
}

.panel-header {
  margin-bottom: 12px;
}

.eyebrow {
  color: var(--rain-300);
  font-size: 0.78rem;
  text-transform: uppercase;
}

.panel-copy {
  min-height: 92px;
}

.food-display,
.pet-status,
.action-row button {
  border: 3px solid #294d70;
  background: #0b1c34;
}

.food-display {
  margin-top: 16px;
  padding: 12px;
}

.food-name {
  display: block;
  color: var(--warm-300);
  font-weight: 700;
}

.food-note {
  display: block;
  margin-top: 4px;
  font-size: 0.9rem;
}

.pet-status-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 16px;
}

.pet-status {
  padding: 10px;
}

.pet-status h3 {
  margin-bottom: 8px;
  color: var(--warm-300);
}

.action-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 16px;
}

.action-row button {
  min-height: 44px;
  color: var(--ink);
  cursor: pointer;
}

.action-row button:focus-visible {
  outline: 3px solid var(--warm-300);
  outline-offset: 2px;
}

@media (max-width: 860px) {
  .app-shell {
    width: min(100vw - 20px, 680px);
    grid-template-columns: 1fr;
    padding: 10px 0 18px;
  }

  .scene-card {
    padding: 10px;
  }

  .title-row {
    align-items: flex-start;
  }

  .scene {
    min-height: 420px;
  }

  .cabin {
    left: 13%;
    width: 74%;
    bottom: 22%;
  }

  .food-table {
    right: 12%;
    bottom: 31%;
  }

  .info-panel {
    position: static;
  }
}

@media (max-width: 520px) {
  .app-shell {
    width: calc(100vw - 12px);
  }

  .title-row {
    display: grid;
  }

  .weather-chip {
    justify-self: start;
  }

  .scene {
    min-height: 360px;
  }

  .pet-status-grid,
  .action-row {
    grid-template-columns: 1fr;
  }

  .hotspot {
    width: 40px;
    height: 40px;
  }
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run:

```bash
npm test -- tests/pixel-cabin.spec.js
```

Expected:
- PASS.

- [ ] **Step 5: Commit layout and style foundation**

Run:

```bash
git add styles.css tests/pixel-cabin.spec.js
git commit -m "feat: add blue pixel cabin layout"
```

Expected:
- A commit is created.

---

### Task 4: Rain, Drip, Puddle, Food Steam, And Pet Idle Animations

**Files:**
- Modify: `styles.css`
- Modify: `tests/pixel-cabin.spec.js`

- [ ] **Step 1: Add animation assertions**

Append this test inside the existing `test.describe` block:

```javascript
test('keeps rain and pets animated with CSS hooks', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.rain-back')).toHaveCSS('animation-name', /rainBack/);
  await expect(page.locator('.rain-front')).toHaveCSS('animation-name', /rainFront/);
  await expect(page.locator('.drip-one')).toHaveCSS('animation-name', /roofDrip/);
  await expect(page.locator('.puddle-one')).toHaveCSS('animation-name', /puddleRipple/);
  await expect(page.locator('.cat-tail')).toHaveCSS('animation-name', /catTail/);
  await expect(page.locator('.dog-tail')).toHaveCSS('animation-name', /dogTail/);
  await expect(page.locator('.steam-one')).toHaveCSS('animation-name', /steamRise/);
});
```

- [ ] **Step 2: Run the test and verify it fails for missing animations**

Run:

```bash
npm test -- tests/pixel-cabin.spec.js
```

Expected:
- FAIL.
- The failure mentions an animation name such as `rainBack`.

- [ ] **Step 3: Append animation CSS**

Append this content to `styles.css`:

```css
.rain-layer {
  inset: -20% 0 0;
  pointer-events: none;
  z-index: 10;
}

.rain-back {
  background-image:
    linear-gradient(115deg, transparent 0 42%, rgba(139, 211, 234, 0.25) 43% 48%, transparent 49% 100%);
  background-size: 42px 42px;
  animation: rainBack 900ms steps(8) infinite;
}

.rain-front {
  background-image:
    linear-gradient(115deg, transparent 0 40%, rgba(199, 239, 255, 0.55) 41% 48%, transparent 49% 100%);
  background-size: 66px 66px;
  animation: rainFront 620ms steps(6) infinite;
}

.drip {
  position: absolute;
  bottom: -18px;
  width: 5px;
  height: 14px;
  background: var(--rain-300);
  opacity: 0.85;
  animation: roofDrip 1200ms steps(5) infinite;
}

.drip-one {
  left: 18%;
}

.drip-two {
  left: 51%;
  animation-delay: 280ms;
}

.drip-three {
  right: 14%;
  animation-delay: 520ms;
}

.puddle {
  animation: puddleRipple 1400ms steps(4) infinite;
}

.window,
.porch-light {
  animation: warmFlicker 2200ms steps(4) infinite;
}

.steam {
  animation: steamRise 1600ms steps(5) infinite;
}

.steam-two {
  animation-delay: 420ms;
}

.cat-tail {
  transform-origin: right center;
  animation: catTail 1300ms steps(4) infinite;
}

.cat-eye {
  animation: catBlink 4200ms steps(2) infinite;
}

.pet-cat .cat-body {
  animation: catBreathe 2200ms steps(3) infinite;
}

.dog-tail {
  transform-origin: right center;
  animation: dogTail 780ms steps(4) infinite;
}

.pet-dog .dog-head {
  animation: dogHead 1900ms steps(3) infinite;
}

@keyframes rainBack {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -42px 84px;
  }
}

@keyframes rainFront {
  from {
    background-position: 0 0;
  }
  to {
    background-position: -66px 132px;
  }
}

@keyframes roofDrip {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    transform: translateY(34px);
    opacity: 0;
  }
}

@keyframes puddleRipple {
  0% {
    box-shadow: 0 0 0 0 rgba(139, 211, 234, 0.45);
  }
  100% {
    box-shadow: 0 0 0 8px rgba(139, 211, 234, 0);
  }
}

@keyframes warmFlicker {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.12);
  }
}

@keyframes steamRise {
  0% {
    transform: translateY(12px);
    opacity: 0;
  }
  40% {
    opacity: 0.85;
  }
  100% {
    transform: translateY(-18px);
    opacity: 0;
  }
}

@keyframes catTail {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(-18deg);
  }
}

@keyframes catBlink {
  0%,
  94%,
  100% {
    height: 4px;
  }
  96% {
    height: 1px;
  }
}

@keyframes catBreathe {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}

@keyframes dogTail {
  0%,
  100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(22deg);
  }
}

@keyframes dogHead {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 1ms !important;
  }
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run:

```bash
npm test -- tests/pixel-cabin.spec.js
```

Expected:
- PASS.

- [ ] **Step 5: Commit animations**

Run:

```bash
git add styles.css tests/pixel-cabin.spec.js
git commit -m "feat: animate rain pets and food steam"
```

Expected:
- A commit is created.

---

### Task 5: Hotspot Exploration And Panel Updates

**Files:**
- Create: `script.js`
- Modify: `tests/pixel-cabin.spec.js`

- [ ] **Step 1: Add hotspot interaction tests**

Append this test inside the existing `test.describe` block:

```javascript
test('updates the panel and moves pets when hotspots are explored', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: '查看糖醋排骨' }).click();
  await expect(page.locator('#panel-title')).toHaveText('糖醋排骨');
  await expect(page.locator('#panel-copy')).toContainText('酸甜酱汁');
  await expect(page.locator('.pet-cat')).toHaveAttribute('data-location', 'food');
  await expect(page.locator('.pet-dog')).toHaveAttribute('data-location', 'food');

  await page.getByRole('button', { name: '查看窗户' }).click();
  await expect(page.locator('#panel-title')).toHaveText('雨滴窗光');
  await expect(page.locator('#panel-copy')).toContainText('玻璃');

  await page.getByRole('button', { name: '查看门口' }).click();
  await expect(page.locator('#panel-title')).toHaveText('门口暖光');
  await expect(page.locator('#panel-copy')).toContainText('家里很暖');
});
```

- [ ] **Step 2: Run the test and verify it fails for missing script behavior**

Run:

```bash
npm test -- tests/pixel-cabin.spec.js
```

Expected:
- FAIL.
- The failure mentions `#panel-title` not changing or missing `data-location`.

- [ ] **Step 3: Create `script.js` with hotspot behavior**

Create `script.js` with this content:

```javascript
const state = {
  cat: {
    fullness: 45,
    happiness: 55,
    sleepiness: 20,
    location: 'porch'
  },
  dog: {
    fullness: 50,
    happiness: 60,
    sleepiness: 15,
    location: 'porch'
  }
};

const details = {
  window: {
    title: '雨滴窗光',
    copy: '雨滴贴着玻璃滑下去，屋里的暖灯把窗框照成柔软的金色。'
  },
  door: {
    title: '门口暖光',
    copy: '外面雨声很密，门口的小灯亮着，家里很暖。'
  },
  food: {
    title: '糖醋排骨',
    copy: '桌上有一盘糖醋排骨，酸甜酱汁亮晶晶的，旁边还有热汤和面包。'
  },
  cat: {
    title: '小猫',
    copy: '小猫眨眨眼，尾巴轻轻摆着，正在等一条小鱼干。'
  },
  dog: {
    title: '小狗',
    copy: '小狗抬头看你，尾巴摇得很快，像是在等骨头饼干。'
  }
};

const movementTargets = {
  window: {
    cat: ['30%', '64%'],
    dog: ['62%', '66%']
  },
  door: {
    cat: ['39%', '72%'],
    dog: ['56%', '73%']
  },
  food: {
    cat: ['54%', '67%'],
    dog: ['66%', '68%']
  },
  cat: {
    cat: ['19%', '74%'],
    dog: ['44%', '75%']
  },
  dog: {
    cat: ['42%', '74%'],
    dog: ['68%', '75%']
  }
};

const panelTitle = document.querySelector('#panel-title');
const panelCopy = document.querySelector('#panel-copy');
const catElement = document.querySelector('.pet-cat');
const dogElement = document.querySelector('.pet-dog');

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function updateStats() {
  document.querySelector('[data-stat="cat-fullness"]').textContent = state.cat.fullness;
  document.querySelector('[data-stat="cat-happiness"]').textContent = state.cat.happiness;
  document.querySelector('[data-stat="cat-sleepiness"]').textContent = state.cat.sleepiness;
  document.querySelector('[data-stat="dog-fullness"]').textContent = state.dog.fullness;
  document.querySelector('[data-stat="dog-happiness"]').textContent = state.dog.happiness;
  document.querySelector('[data-stat="dog-sleepiness"]').textContent = state.dog.sleepiness;
}

function setPetLocation(pet, target) {
  const petState = state[pet];
  const element = pet === 'cat' ? catElement : dogElement;
  const [x, y] = movementTargets[target][pet];

  petState.location = target;
  element.dataset.location = target;
  document.documentElement.style.setProperty(`--${pet}-x`, x);
  document.documentElement.style.setProperty(`--${pet}-y`, y);
}

function explore(target) {
  const detail = details[target];
  panelTitle.textContent = detail.title;
  panelCopy.textContent = detail.copy;
  setPetLocation('cat', target);
  setPetLocation('dog', target);
}

document.querySelectorAll('[data-target]').forEach((button) => {
  button.addEventListener('click', () => {
    explore(button.dataset.target);
  });
});

updateStats();
```

- [ ] **Step 4: Run the test and verify it passes**

Run:

```bash
npm test -- tests/pixel-cabin.spec.js
```

Expected:
- PASS.

- [ ] **Step 5: Commit hotspot interactions**

Run:

```bash
git add script.js tests/pixel-cabin.spec.js
git commit -m "feat: add cabin hotspot exploration"
```

Expected:
- A commit is created.

---

### Task 6: Feeding, Affection, And Pet State Visual Behavior

**Files:**
- Modify: `script.js`
- Modify: `styles.css`
- Modify: `tests/pixel-cabin.spec.js`

- [ ] **Step 1: Add pet state interaction tests**

Append this test inside the existing `test.describe` block:

```javascript
test('feeding and affection update pet state and visual mode', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: '喂小鱼干' }).click();
  await expect(page.locator('[data-stat="cat-fullness"]')).toHaveText('63');
  await expect(page.locator('[data-stat="cat-happiness"]')).toHaveText('67');
  await expect(page.locator('.pet-cat')).toHaveAttribute('data-mood', 'eating');
  await expect(page.locator('#panel-copy')).toContainText('小鱼干');

  await page.getByRole('button', { name: '拍拍小狗' }).click();
  await expect(page.locator('[data-stat="dog-happiness"]')).toHaveText('70');
  await expect(page.locator('.pet-dog')).toHaveAttribute('data-mood', 'happy');

  await page.getByRole('button', { name: '喂骨头饼干' }).click();
  await page.getByRole('button', { name: '喂骨头饼干' }).click();
  await page.getByRole('button', { name: '喂骨头饼干' }).click();
  await page.getByRole('button', { name: '喂骨头饼干' }).click();
  await expect(page.locator('.pet-dog')).toHaveAttribute('data-mood', 'sleepy');
});
```

- [ ] **Step 2: Run the test and verify it fails for missing action handlers**

Run:

```bash
npm test -- tests/pixel-cabin.spec.js
```

Expected:
- FAIL.
- The failure mentions unchanged stat text or missing `data-mood`.

- [ ] **Step 3: Replace `script.js` with stateful actions**

Replace `script.js` with this content:

```javascript
const state = {
  cat: {
    fullness: 45,
    happiness: 55,
    sleepiness: 20,
    location: 'porch',
    mood: 'idle'
  },
  dog: {
    fullness: 50,
    happiness: 60,
    sleepiness: 15,
    location: 'porch',
    mood: 'idle'
  }
};

const details = {
  window: {
    title: '雨滴窗光',
    copy: '雨滴贴着玻璃滑下去，屋里的暖灯把窗框照成柔软的金色。'
  },
  door: {
    title: '门口暖光',
    copy: '外面雨声很密，门口的小灯亮着，家里很暖。'
  },
  food: {
    title: '糖醋排骨',
    copy: '桌上有一盘糖醋排骨，酸甜酱汁亮晶晶的，旁边还有热汤和面包。'
  },
  cat: {
    title: '小猫',
    copy: '小猫眨眨眼，尾巴轻轻摆着，正在等一条小鱼干。'
  },
  dog: {
    title: '小狗',
    copy: '小狗抬头看你，尾巴摇得很快，像是在等骨头饼干。'
  }
};

const movementTargets = {
  window: {
    cat: ['30%', '64%'],
    dog: ['62%', '66%']
  },
  door: {
    cat: ['39%', '72%'],
    dog: ['56%', '73%']
  },
  food: {
    cat: ['54%', '67%'],
    dog: ['66%', '68%']
  },
  cat: {
    cat: ['19%', '74%'],
    dog: ['44%', '75%']
  },
  dog: {
    cat: ['42%', '74%'],
    dog: ['68%', '75%']
  }
};

const panelTitle = document.querySelector('#panel-title');
const panelCopy = document.querySelector('#panel-copy');
const catElement = document.querySelector('.pet-cat');
const dogElement = document.querySelector('.pet-dog');

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function elementForPet(pet) {
  return pet === 'cat' ? catElement : dogElement;
}

function updateStats() {
  document.querySelector('[data-stat="cat-fullness"]').textContent = state.cat.fullness;
  document.querySelector('[data-stat="cat-happiness"]').textContent = state.cat.happiness;
  document.querySelector('[data-stat="cat-sleepiness"]').textContent = state.cat.sleepiness;
  document.querySelector('[data-stat="dog-fullness"]').textContent = state.dog.fullness;
  document.querySelector('[data-stat="dog-happiness"]').textContent = state.dog.happiness;
  document.querySelector('[data-stat="dog-sleepiness"]').textContent = state.dog.sleepiness;
}

function setMood(pet, mood) {
  const petState = state[pet];
  const element = elementForPet(pet);

  if (petState.sleepiness >= 75) {
    petState.mood = 'sleepy';
  } else {
    petState.mood = mood;
  }

  element.dataset.mood = petState.mood;
}

function setPetLocation(pet, target) {
  const petState = state[pet];
  const element = elementForPet(pet);
  const [x, y] = movementTargets[target][pet];

  petState.location = target;
  element.dataset.location = target;
  document.documentElement.style.setProperty(`--${pet}-x`, x);
  document.documentElement.style.setProperty(`--${pet}-y`, y);
}

function explore(target) {
  const detail = details[target];
  panelTitle.textContent = detail.title;
  panelCopy.textContent = detail.copy;
  setPetLocation('cat', target);
  setPetLocation('dog', target);
}

function feedPet(pet) {
  const petState = state[pet];
  const isCat = pet === 'cat';

  petState.fullness = clamp(petState.fullness + 18);
  petState.happiness = clamp(petState.happiness + 12);
  petState.sleepiness = clamp(petState.sleepiness + 15);
  setPetLocation(pet, 'food');
  setMood(pet, 'eating');
  updateStats();

  panelTitle.textContent = isCat ? '小猫吃饭' : '小狗吃饭';
  panelCopy.textContent = isCat
    ? '小猫跑到碗边，低头吃掉一条小鱼干，尾巴慢慢晃着。'
    : '小狗跑到碗边，咬着骨头饼干，开心得尾巴停不下来。';
}

function petPet(pet) {
  const petState = state[pet];
  const isCat = pet === 'cat';

  petState.happiness = clamp(petState.happiness + 10);
  petState.sleepiness = clamp(petState.sleepiness + 8);
  setMood(pet, 'happy');
  updateStats();

  panelTitle.textContent = isCat ? '小猫被摸摸' : '小狗被拍拍';
  panelCopy.textContent = isCat
    ? '小猫轻轻蹭了一下门边，眼睛眯起来，家里的灯光落在背上。'
    : '小狗抬头看你，脚步小小地跳了一下，门口的雨声也变得柔和。';
}

document.querySelectorAll('[data-target]').forEach((button) => {
  button.addEventListener('click', () => {
    explore(button.dataset.target);
  });
});

document.querySelectorAll('[data-action]').forEach((button) => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;

    if (action === 'feed-cat') {
      feedPet('cat');
    }

    if (action === 'pet-cat') {
      petPet('cat');
    }

    if (action === 'feed-dog') {
      feedPet('dog');
    }

    if (action === 'pet-dog') {
      petPet('dog');
    }
  });
});

catElement.dataset.location = state.cat.location;
dogElement.dataset.location = state.dog.location;
catElement.dataset.mood = state.cat.mood;
dogElement.dataset.mood = state.dog.mood;
updateStats();
```

- [ ] **Step 4: Append mood CSS**

Append this content to `styles.css`:

```css
.pet[data-mood="eating"] {
  animation: petEating 620ms steps(3) infinite;
}

.pet[data-mood="happy"] {
  animation: petHappy 520ms steps(4) infinite;
}

.pet[data-mood="sleepy"] {
  animation: petSleepy 1600ms steps(3) infinite;
}

.pet-cat[data-mood="sleepy"] .cat-head {
  transform: translateY(8px);
}

.pet-dog[data-mood="sleepy"] .dog-head {
  transform: translateY(9px);
}

@keyframes petEating {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 4px;
  }
}

@keyframes petHappy {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -5px;
  }
}

@keyframes petSleepy {
  0%,
  100% {
    translate: 0 3px;
  }
  50% {
    translate: 0 0;
  }
}
```

- [ ] **Step 5: Run the test and verify it passes**

Run:

```bash
npm test -- tests/pixel-cabin.spec.js
```

Expected:
- PASS.

- [ ] **Step 6: Commit pet state interactions**

Run:

```bash
git add script.js styles.css tests/pixel-cabin.spec.js
git commit -m "feat: add pet feeding and affection states"
```

Expected:
- A commit is created.

---

### Task 7: Accessibility, Keyboard Navigation, And Visual Regression Checks

**Files:**
- Modify: `tests/pixel-cabin.spec.js`
- Modify: `styles.css`

- [ ] **Step 1: Add keyboard and screenshot checks**

Append this test inside the existing `test.describe` block:

```javascript
test('supports keyboard focus and captures desktop and mobile screenshots', async ({ page }) => {
  await page.goto('/');

  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: '查看窗户' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#panel-title')).toHaveText('雨滴窗光');

  await page.screenshot({
    path: 'test-results/pixel-cabin-desktop.png',
    fullPage: true
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: 'test-results/pixel-cabin-mobile.png',
    fullPage: true
  });

  const overlap = await page.evaluate(() => {
    const scene = document.querySelector('.scene').getBoundingClientRect();
    const panel = document.querySelector('.info-panel').getBoundingClientRect();
    return scene.bottom > panel.top && scene.right > panel.left && scene.left < panel.right;
  });

  expect(overlap).toBe(false);
});
```

- [ ] **Step 2: Run the test and verify any keyboard ordering or overlap issues**

Run:

```bash
npm test -- tests/pixel-cabin.spec.js
```

Expected:
- PASS if the first tab reaches `查看窗户` and mobile panel does not overlap the scene.
- If this fails because the first focus target is not `查看窗户`, move nonessential focusable controls after hotspots or add `tabindex` to hotspot buttons in logical order.

- [ ] **Step 3: If first focus fails, update hotspot tabindex values**

Only if Step 2 fails due to focus order, update the five hotspot buttons in `index.html` to include these attributes:

```html
<button class="hotspot hotspot-window" type="button" data-target="window" aria-label="查看窗户" tabindex="1"></button>
<button class="hotspot hotspot-door" type="button" data-target="door" aria-label="查看门口" tabindex="2"></button>
<button class="hotspot hotspot-food" type="button" data-target="food" aria-label="查看糖醋排骨" tabindex="3"></button>
<button class="hotspot hotspot-cat" type="button" data-target="cat" aria-label="查看小猫" tabindex="4"></button>
<button class="hotspot hotspot-dog" type="button" data-target="dog" aria-label="查看小狗" tabindex="5"></button>
```

- [ ] **Step 4: Inspect screenshots manually**

Open:

```text
test-results/pixel-cabin-desktop.png
test-results/pixel-cabin-mobile.png
```

Expected visual result:
- Desktop first screen shows the blue rainy pixel cabin, warm windows, path, puddles, cat, dog, food table, and side info panel.
- Mobile view stacks the scene and panel without overlapping text or controls.
- Rain, pets, food, and hotspots are visually identifiable.

- [ ] **Step 5: Commit accessibility and visual verification**

Run:

```bash
git add index.html styles.css tests/pixel-cabin.spec.js
git commit -m "test: verify accessibility and responsive cabin views"
```

Expected:
- A commit is created.

---

### Task 8: Final Local Preview, Full Verification, And Push

**Files:**
- No code changes expected unless verification reveals an issue.

- [ ] **Step 1: Run the complete test suite**

Run:

```bash
npm test
```

Expected:
- All Playwright tests pass.

- [ ] **Step 2: Start a local preview server**

Run:

```bash
npm run serve
```

Expected:
- Server prints a local URL such as `http://127.0.0.1:4173`.
- The page is available at `http://127.0.0.1:4173/index.html`.

- [ ] **Step 3: Manual acceptance pass**

In the browser, verify:
- First view reads as a blue rainy pixel cabin.
- Rain, roof drips, puddles, cat, dog, and food steam move.
- Clicking window, door, food, cat, and dog updates the panel.
- Feeding the cat changes cat fullness from `45` to `63`.
- Feeding the dog repeatedly eventually sets the dog to sleepy mode.
- Desktop and mobile widths do not overlap the scene and panel.

- [ ] **Step 4: Commit any final fixes**

If changes were needed, run:

```bash
git add index.html styles.css script.js tests/pixel-cabin.spec.js
git commit -m "fix: polish pixel cabin interaction details"
```

Expected:
- A commit is created only if files changed.

- [ ] **Step 5: Push the branch**

Run:

```bash
git push
```

Expected:
- Local `master` pushes to `origin/master`.

---

## Self-Review

Spec coverage:
- Blue rainy pixel cabin: Task 3.
- Warm home contrast: Task 2 markup and Task 3 styling.
- Cat, dog, food, sweet-and-sour pork ribs: Task 2 and Task 3.
- Animated rain, roof drips, puddles, pets, and steam: Task 4.
- Hotspots for window, door, food, cat, and dog: Task 2 and Task 5.
- Pet fullness, happiness, sleepiness, feeding, affection, and sleepy behavior: Task 6.
- Responsive desktop and mobile layouts: Task 3 and Task 7.
- Accessibility and keyboard support: Task 2 and Task 7.
- Verification and preview: Task 8.

Placeholder scan:
- The plan contains no TBD/TODO placeholders.
- Conditional instructions in Task 7 and Task 8 are explicit and include exact code or commands.

Type and naming consistency:
- Hotspot targets are consistently `window`, `door`, `food`, `cat`, and `dog`.
- Pet keys are consistently `cat` and `dog`.
- State fields are consistently `fullness`, `happiness`, `sleepiness`, `location`, and `mood`.
- DOM selectors used in tests match the markup and script.
