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
    copy: '糖醋排骨已经摆在小屋里的餐桌上，酸甜酱汁和热汤都在暖光里冒着热气。'
  },
  cat: {
    title: '小猫',
    copy: '小猫眨眨眼，尾巴轻轻摆着。可以把小鱼干拖到它身上。'
  },
  dog: {
    title: '小狗',
    copy: '小狗抬头看你，尾巴摇得很快。可以把骨头饼干拖到它身上。'
  }
};

const treatNames = {
  fish: '小鱼干',
  bone: '骨头饼干'
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
const statusGrid = document.querySelector('.pet-status-grid');
let draggedTreat = null;

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

function showPetStatus(pet) {
  statusGrid.hidden = false;
  document.querySelectorAll('[data-status-card]').forEach((card) => {
    card.hidden = card.dataset.statusCard !== pet;
  });
}

function hidePetStatus() {
  statusGrid.hidden = true;
  document.querySelectorAll('[data-status-card]').forEach((card) => {
    card.hidden = true;
  });
}

function setMood(pet, mood) {
  const petState = state[pet];
  const element = elementForPet(pet);

  petState.mood = petState.sleepiness >= 75 ? 'sleepy' : mood;
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

  if (target === 'cat' || target === 'dog') {
    showPetStatus(target);
  } else {
    hidePetStatus();
  }
}

function rewardPet(pet, treat) {
  const petState = state[pet];
  const isCat = pet === 'cat';
  const treatName = treatNames[treat] || '食物';

  petState.fullness = clamp(petState.fullness + 14);
  petState.happiness = clamp(petState.happiness + 18);
  petState.sleepiness = clamp(petState.sleepiness + 8);
  setPetLocation(pet, pet);
  setMood(pet, 'happy');
  updateStats();

  panelTitle.textContent = isCat ? '小猫很开心' : '小狗很开心';
  panelCopy.textContent = isCat
    ? `${treatName}滑到小猫身边，小猫开心地蹭了蹭暖光。`
    : `${treatName}滑到小狗身边，小狗小跳了一下，尾巴摇得更快。`;

  if (!statusGrid.hidden) {
    showPetStatus(pet);
  }
}

function handleTreatDrop(event, pet) {
  event.preventDefault();
  const treat = event.dataTransfer.getData('text/treat') || draggedTreat;

  if (!treat) {
    return;
  }

  rewardPet(pet, treat);
  draggedTreat = null;
}

document.querySelectorAll('[data-target]').forEach((button) => {
  button.addEventListener('click', () => {
    explore(button.dataset.target);
  });
});

document.querySelectorAll('[data-treat]').forEach((button) => {
  button.addEventListener('dragstart', (event) => {
    draggedTreat = button.dataset.treat;
    event.dataTransfer.setData('text/treat', draggedTreat);
    event.dataTransfer.effectAllowed = 'move';
    button.classList.add('is-dragging');
  });

  button.addEventListener('dragend', () => {
    button.classList.remove('is-dragging');
    draggedTreat = null;
  });

  button.addEventListener('click', () => {
    panelTitle.textContent = `拖动${button.textContent}`;
    panelCopy.textContent = `按住${button.textContent}，拖到小猫或小狗身上。`;
  });
});

document.querySelectorAll('[data-drop-pet]').forEach((target) => {
  target.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    target.classList.add('is-drop-ready');
  });

  target.addEventListener('dragleave', () => {
    target.classList.remove('is-drop-ready');
  });

  target.addEventListener('drop', (event) => {
    target.classList.remove('is-drop-ready');
    handleTreatDrop(event, target.dataset.dropPet);
  });
});

catElement.dataset.location = state.cat.location;
dogElement.dataset.location = state.dog.location;
catElement.dataset.mood = state.cat.mood;
dogElement.dataset.mood = state.dog.mood;
updateStats();
hidePetStatus();
