Resolutions = new Mongo.Collection('resolutions'); //Mongo db collection



if (Meteor.isClient) {
    Template.body.helpers({
      resolutions: function() {
        return Resolutions.find();
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
        }
    });
    
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
