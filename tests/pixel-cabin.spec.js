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
    await expect(page.getByText('小鱼干', { exact: true })).toBeVisible();
    await expect(page.getByText('骨头饼干', { exact: true })).toBeVisible();
  });

  test('uses blue rainy styling and keeps mobile layout usable', async ({ page }) => {
    await page.goto('/');

    const scene = page.locator('.scene');
    await expect(scene).toHaveCSS('image-rendering', 'pixelated');
    await expect(scene).toHaveCSS('background-color', 'rgb(8, 22, 48)');

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.getByRole('region', { name: '蓝调雨夜小屋场景' })).toBeVisible();
    await expect(page.getByRole('region', { name: '互动信息' })).toBeVisible();

    const sceneBox = await page.locator('.scene').boundingBox();
    const panelBox = await page.locator('.info-panel').boundingBox();
    expect(sceneBox.height).toBeGreaterThan(260);
    expect(panelBox.y).toBeGreaterThan(sceneBox.y + sceneBox.height - 20);
  });

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
});
