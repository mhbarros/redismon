const {loadPage} = require('./Main');

const handleMenuClick = async (menuOption) => {
  hideAllContents();

  switch (menuOption) {
    case "home":
      showHome();
      break;
    case "addKey":
      showAddKey();
      break;
    case "config":
      showConfig();
      break;
    case "logout":
      doLogout();
      break;
  }
}

const hideAllContents = () => {
  document.getElementById('homeContainer').style.display = 'none';
  document.getElementById('addKeyContainer').style.display = 'none';
  document.getElementById('homeContainer').style.display = 'none';
  /*document.getElementById('settingsContainer').style.display = 'none';*/

  document.getElementById('menuHome').className = '';
  document.getElementById('menuAddKey').className = '';
  document.getElementById('menuHome').className = '';
  /*document.getElementById('menuSettings').className = '';*/
}

const showHome = async () => {
  const $home = document.getElementById('homeContainer');
  if(!$home.innerHTML.trim()){
    await loadPage('keyList', 'homeContainer');
  }
  document.getElementById('menuHome').className = 'active';
  $home.style.display = 'flex';
}

const showAddKey = async () => {
  const $addKeyContainer = document.getElementById('addKeyContainer');
  if(!$addKeyContainer.innerHTML.trim()){
    await loadPage('addKey', 'addKeyContainer');
  }

  document.getElementById('menuAddKey').className = 'active';
  $addKeyContainer.style.display = 'flex';
}

const showConfig = async () => {
  const $config = document.getElementById('settingsContainer');
  if(!$config.innerHTML){
    await loadPage('test', 'settingsContainer');
  }

  document.getElementById('menuSettings').className = 'active';
  $config.style.display = 'flex';
}


module.exports = {
  handleMenuClick,
}
