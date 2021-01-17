const {remote} = require('electron');
const {openMessage} = require('./Main');

const init = async () => {
  const client = remote.getGlobal('Clients')[0];
  const keys = await client.getAllKeys();

  setKeyList(keys);
  showHome();
}

const handleMenuClick = (menuOption) => {
  hideAllContents();
  switch (menuOption){
    case "home":
      showHome();
      break;
    case "addKey":
      showAddKey();
      break;
    case "config":
      break;
    case "logout":
      break;
  }
}

const hideAllContents = () => {
  document.getElementById('homeContainer').style.display = 'none';
  document.getElementById('addKeyContainer').style.display = 'none';
  document.getElementById('homeContainer').style.display = 'none';
  document.getElementById('homeContainer').style.display = 'none';

  document.getElementById('menuHome').className = '';
  document.getElementById('menuAddKey').className = '';
  document.getElementById('menuHome').className = '';
  document.getElementById('menuHome').className = '';
}

const showHome = () => {
  document.getElementById('menuHome').className = 'active';
  document.getElementById('homeContainer').style.display = 'flex';
}

const showAddKey = () => {
  document.getElementById('menuAddKey').className = 'active';
  document.getElementById('addKeyContainer').style.display = 'flex';
}

const updateKeyList = async () => {
  const redisClient = remote.getGlobal('Clients')[0];
  const keys = await redisClient.getAllKeys();

  setKeyList(keys);
}

const setKeyList = (keys) => {
  const $list = document.getElementById('keyList');
  $list.innerHTML = '';
  keys.forEach(key => {
    const newItem = getNewListItem(key);
    $list.appendChild(newItem);

  })
}

const addNewKey = async () => {
  const $key = document.getElementById('newKeyName');
  const $value = document.getElementById('newKeyValue');

  if(!$key || !$key.value){
    alert('Defina o nome da chave');
    return;
  }

  if(!$value || !$value.value){
    alert('Define o valor da chave');
    return;
  }

  const redisClient = remote.getGlobal('Clients')[0];

  redisClient.addKey($key.value, $value.value);
  await updateKeyList();
  openMessage('Adicionado com sucesso');
  $key.value = '';
  $value.value = '';
}

const clickKey = async (elem) => {
  const key = elem.id;
  const $divContent = document.getElementById(`content-${key}`);

  if(elem.className === 'expand'){
    elem.className = '';
    document.getElementById(`arrow-${key}`).style.transform = 'rotate(0deg)';
    $divContent.style.display = 'none';
    return;
  }

  elem.className = 'expand';
  document.getElementById(`arrow-${key}`).style.transform = 'rotate(90deg)';

  const redisClient = remote.getGlobal('Clients')[0];

  $divContent.innerText = await redisClient.getKey(key);
  $divContent.style.display = 'block';
}

const getNewListItem = (key) => {
  const  LiNewItem = document.createElement('li');
  LiNewItem.id = key;

  const DivLiContainer = document.createElement('div');
  const DivTitleContainer = document.createElement('div');
  DivTitleContainer.className = 'titleContainer';
  const DivContentContainer = document.createElement('div');
  DivContentContainer.id = `content-${key}`;
  DivContentContainer.className = 'contentContainer';

  const DivTitle = document.createElement('div');
  DivTitle.className = 'divTitle';
  const DivTrash = document.createElement('div');
  DivTrash.className = 'divTrash';

  const iconArrow = document.createElement('i');
  iconArrow.className = 'fas fa-arrow-right';
  iconArrow.id = `arrow-${key}`;

  const iconTrash = document.createElement('i');
  iconTrash.id = `trash-${key}`;
  iconTrash.className = 'fas fa-trash';
  iconTrash.style.fontSize = '20px'

  const spanTitle = document.createElement('span');
  spanTitle.style.marginLeft = '10px';
  spanTitle.innerHTML = key;

  DivTitle.onclick = () => {
    clickKey(LiNewItem);
  }

  iconTrash.onclick = () => {
    removeKey(key);
  }

  DivTitle.appendChild(iconArrow);
  DivTitle.appendChild(spanTitle);

  DivTrash.appendChild(iconTrash);

  DivTitleContainer.appendChild(DivTitle);
  DivTitleContainer.appendChild(DivTrash);

  DivLiContainer.appendChild(DivTitleContainer);
  DivLiContainer.appendChild(DivContentContainer);

  LiNewItem.appendChild(DivLiContainer);


  return LiNewItem;
}

const clearList = async () => {
  const redisClient = remote.getGlobal('Clients')[0];

  const currentKeys = await redisClient.getAllKeys();
  await redisClient.removeAllKeys();
  await updateKeyList();
  openMessage(`${currentKeys.length} chave(s) removida(s)`);
}

const removeKey = async (key) => {

  const redisClient = remote.getGlobal('Clients')[0];
  await redisClient.removeKey(key);

  await updateKeyList();

  openMessage('Removido com sucesso');
}

const filterKeyList = (text) => {

  document.getElementById('keyList').childNodes.forEach($el => {
    if(text === ''){
      $el.style.display = 'flex';

    }else{
      text = text.toString().toLowerCase();

      if($el.id.toLowerCase().indexOf(text) === -1){
        $el.style.display = 'none';
      }else{
        $el.style.display = 'flex';
      }
    }
  })
}


module.exports = {
  init,
  clickKey,
  handleMenuClick,
  addNewKey,
  removeKey,
  clearList,
  updateKeyList,
  filterKeyList
}
