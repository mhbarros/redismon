const {getAllKeys, addKey, getKey, deleteKey, deleteAllKeys} = require('./Redis');


const init = async () => {
  const keys = await getAllKeys();
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
  const keys = await getAllKeys();
  setKeyList(keys);
}

const setKeyList = (keys) => {
  const $list = document.getElementById('keyList');
  $list.innerHTML = '';
  keys.forEach(key => {
    const newItem = getNewListItem(key);
    $list.appendChild(newItem);
    // html += `<li id="${key}" onclick="clickKey(this)"><div ><i id="arrow-${key}" class="fas fa-arrow-right"></i><span style="margin-left: 10px">${key}</span></div><i id="delete-${key}" class="fas fa-trash" onclick="removeKey(this)"></i></li>`;
  })
  // $list.innerHTML = html;
}

const addNewKey = async () => {
  const $key = document.getElementById('newKeyName');
  const $value = document.getElementById('newKeyValue');

  if(!$key || !$key.value){
    alert('É necessário escolher um nome para a chave');
    return;
  }

  if(!$value || !$value.value){
    alert('É necessário escolher um valor para a chave');
    return;
  }

  addKey($key.value, $value.value);
  await updateKeyList();
  console.log('Adicionado com sucesso');
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

  let keyValue = await getKey(key);

  $divContent.innerText = keyValue;
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
  await deleteAllKeys();
  await updateKeyList();
  console.log('Chaves removidas com sucesso');
}

const removeKey = async (key) => {

  const deletion = await deleteKey(key);
  await updateKeyList();

  console.log(`Removido ${deletion} registros`);
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