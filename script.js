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
