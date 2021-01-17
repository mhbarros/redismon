function KeyList(){
  const {remote} = require('electron');

  this.init = () => {
    this.updateKeyList();
  }

  this.updateKeyList = async () => {
    const redisClient = remote.getGlobal('Clients')[0];
    const keys = await redisClient.getAllKeys();

    this.setKeyList(keys);
  }

  this.addKey = () => {
    const key = document.getElementById('newKeyName').value;
    const value = document.getElementById('newKeyValue').value;

    if(!key){
      alert('Adicione um nome para a chave');
      return;
    }

    if(!value){
      alert("Adicione um valor para a chave");
      return;
    }

    const redisClient = remote.getGlobal('Clients')[0];
    redisClient.addKey(key, value);
    this.updateKeyList();
    alert('Chave adicionada');
  }

  this.setKeyList = (keys) => {
    const $list = document.getElementById('keyList');
    const $this = this;

    $list.innerHTML = '';
    keys.forEach(key => {
      const newItem = $this.getNewListItem(key);
      $list.appendChild(newItem);
    })
  }

  this.deleteKey = async (key) => {
    const redisClient = remote.getGlobal('Clients')[0];
    await redisClient.removeKey(key);

    await this.updateKeyList();

    // openMessage('Removido com sucesso');
  }

  this.getNewListItem = (key) => {
    const $this = this;

    const LiNewItem = document.createElement('li');
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
      $this.onClickItem(LiNewItem);
    }

    iconTrash.onclick = () => {
      $this.deleteKey(key);
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

  this.clearList = async () => {
    const redisClient = remote.getGlobal('Clients')[0];

    const currentKeys = await redisClient.getAllKeys();
    await redisClient.removeAllKeys();
    await this.updateKeyList();
    // openMessage(`${currentKeys.length} chave(s) removida(s)`);
  }

  this.onClickItem = async ($elem) => {
    const key = $elem.id;
    const $divContent = document.getElementById(`content-${key}`);

    if ($elem.className === 'expand') {
      $elem.className = '';
      document.getElementById(`arrow-${key}`).style.transform = 'rotate(0deg)';
      $divContent.style.display = 'none';
      return;
    }

    $elem.className = 'expand';
    document.getElementById(`arrow-${key}`).style.transform = 'rotate(90deg)';

    const redisClient = remote.getGlobal('Clients')[0];

    $divContent.innerText = await redisClient.getKey(key);
    $divContent.style.display = 'block';
  }

  this.filterList = (filterText) => {
    document.getElementById('keyList').childNodes.forEach($el => {
      if (filterText === '') {
        $el.style.display = 'flex';

      } else {
        filterText = filterText.toString().toLowerCase();

        if ($el.id.toLowerCase().indexOf(filterText) === -1) {
          $el.style.display = 'none';
        } else {
          $el.style.display = 'flex';
        }
      }
    })
  }
}
