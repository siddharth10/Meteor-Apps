Resolutions = new Mongo.Collection('resolutions'); //Mongo db collection



if (Meteor.isClient) {
    Template.body.helpers({
      resolutions: function() {
          if (Session.get('hideFinished')) {  //if it is true
               return Resolutions.find({checked : {$ne: true}}); //only looking for un-checked items; as long as checked is not true , it is going to find the resolutions i.e un-checked
          } else {
           return Resolutions.find();// returns everything that is in mongodb              
          }
      },
        hideFinished: function() {
            return Session.get('hideFinished');
        }
        /*[   
            { title: "Hello Resolution #1" },
          { title: "Bye Resolution #2" },
          { title: "Suvam's Resolution #3" }
      ]*///Array of objects passed
    
    });
    
    Template.body.events({  //adding events to the apps 
      'submit .new-resolution': function(event) { //if you want an click event, then change submit to click
          var title = event.target.title.value;//Grabbing the value
          
          Resolutions.insert({ //add record to the database
            title : title,
              createdAt: new Date()
          });
          
          event.target.title.value = ""; //Eliminating the previous value from the field
          
          return false;//so that page does not refresh
        },
        //Adding Session js
        'change .hide-finished': function(event) {
            Session.set('hideFinished', event.target.checked);
        }
    });
 
    Template.resolution.events({
        'click .toggle-checked': function() {
            Resolutions.update(this._id, {$set: {checked: !this.checked}});
        },
        'click .delete': function() {
            Resolutions.remove(this._id);
        }
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
