Messages = new Mongo.Collection('messages');

if (Meteor.isClient) {
  Meteor.subscribe("messages");

  Template.guestBook.helpers({
    'messages': function() {
        return Messages.find({}, {sort: {createdOn: -1}}) || {};
    }
  });

  Template.guestBook.events({
    'submit form':function(event, template) {
      event.preventDefault(); //Because want to handle info differently.

      var messageBox =
      $(event.target).find('textarea[name=guestBookMessage]');
      var messageText = messageBox.val();
      //event.target.querySelector('textarea[name=guestBookMessage]').value; is without jquery.

      var nameBox = $(event.target).find('input[name=guestName]');
      var name = nameBox.val();


      Messages.insert({
        message: messageText,
        name: name,
        createdOn: new Date(),
        Likes: 0,
      });

      messageBox.val('');
      nameBox.val('');
    if('submit form') {
      alert("Thank you for submitting!");
    }
    },

    "click .delete": function () {
      Messages.remove(this._id);
    if("click .delete") {
      confirm("Are you sure you would like to delete this post?")
    }
    },

    "click .like": function () {
      Messages.update(this._id, {
        $set: {"Likes": this.Likes +1}
    });
  },
});


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.publish("messages", function(){
    return Messages.find();
  });
}
