const { test, expect } = require('@playwright/test');

test.describe('pixel rainy cabin', () => {
  test('renders the main cabin experience and required controls', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: '雨夜小屋' })).toBeAttached();
    await expect(page.getByText('蓝色雨幕外，是一间亮着灯的家。')).toHaveCount(0);
    await expect(page.getByText('RAIN', { exact: true })).toHaveCount(0);
    await expect(page.getByRole('region', { name: '蓝调雨夜小屋场景' })).toBeVisible();
    await expect(page.getByRole('region', { name: '互动信息' })).toBeVisible();
    await expect(page.getByRole('button', { name: '查看窗户' })).toBeVisible();
    await expect(page.getByRole('button', { name: '查看门口' })).toBeVisible();
    await expect(page.getByRole('button', { name: '查看糖醋排骨' })).toBeVisible();
    await expect(page.getByRole('button', { name: '查看小猫' })).toBeVisible();
    await expect(page.getByRole('button', { name: '查看小狗' })).toBeVisible();
    await expect(page.getByLabel('桌上的食物')).toHaveCount(0);
    await expect(page.locator('.food-table')).toBeVisible();
    await expect(page.locator('.table-top')).toBeVisible();
    await expect(page.locator('.plate-ribs')).toBeVisible();
    await expect(page.getByRole('button', { name: '小鱼干' })).toBeVisible();
    await expect(page.getByRole('button', { name: '骨头饼干' })).toBeVisible();
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

  test('shows pet numbers only after clicking a pet', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('.pet-status-grid')).toBeHidden();
    await expect(page.locator('[data-status-card="cat"]')).toBeHidden();
    await expect(page.locator('[data-status-card="dog"]')).toBeHidden();

    await page.getByRole('button', { name: '查看小猫' }).click();
    await expect(page.locator('[data-status-card="cat"]')).toBeVisible();
    await expect(page.locator('[data-status-card="dog"]')).toBeHidden();
    await expect(page.locator('[data-stat="cat-fullness"]')).toHaveText('45');

    await page.getByRole('button', { name: '查看小狗' }).click();
    await expect(page.locator('[data-status-card="cat"]')).toBeHidden();
    await expect(page.locator('[data-status-card="dog"]')).toBeVisible();
    await expect(page.locator('[data-stat="dog-happiness"]')).toHaveText('60');
  });

  test('dragging treats onto pets triggers happy animation and updates hidden state', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: '小鱼干' }).dragTo(page.getByRole('button', { name: '查看小猫' }));
    await expect(page.locator('.pet-cat')).toHaveAttribute('data-mood', 'happy');
    await expect(page.locator('#panel-title')).toHaveText('小猫很开心');
    await expect(page.locator('.pet-status-grid')).toBeHidden();

    await page.getByRole('button', { name: '查看小猫' }).click();
    await expect(page.locator('[data-stat="cat-fullness"]')).toHaveText('59');
    await expect(page.locator('[data-stat="cat-happiness"]')).toHaveText('73');

    await page.getByRole('button', { name: '骨头饼干' }).dragTo(page.getByRole('button', { name: '查看小狗' }));
    await expect(page.locator('.pet-dog')).toHaveAttribute('data-mood', 'happy');
    await expect(page.locator('#panel-title')).toHaveText('小狗很开心');
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
