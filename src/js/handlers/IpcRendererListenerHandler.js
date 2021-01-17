class IpcRendererListenerHandler {
  redisConnectionHandler(listener, args){
    const {ok, msg} = args;
    if(!ok){
      alert(msg);
      return;
    }

    document.location = 'list.html';
  }
}

module.exports = IpcRendererListenerHandler;
