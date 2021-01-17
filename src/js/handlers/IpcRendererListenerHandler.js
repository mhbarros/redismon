class IpcRendererListenerHandler {
  redisConnectionHandler(listener, args){
    const {ok, msg} = args;
    if(!ok){
      alert(msg);
      return;
    }

    document.location = 'index.html';
  }
}

module.exports = IpcRendererListenerHandler;
