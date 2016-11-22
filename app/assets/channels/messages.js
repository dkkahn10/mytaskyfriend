App.messages = App.cable.subscriptions.create('MessagesChannel', {
  received: function(data) {
    $("#messages").removeClass('hidden')
    return $('#messages').append(this.renderMessage(data));
  },

  renderMessage: function(data) {
    $('.form-control').val('');
    return "<div class='message'><div class='head'><div class='username'>" + data.user + " &#187;</div><sub>" + data.timestamp + "</sub></div><p class='content flow-text'>" + data.message + "</p></div>"
  }
});
