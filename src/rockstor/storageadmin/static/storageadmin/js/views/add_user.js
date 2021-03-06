/*
 *
 * @licstart  The following is the entire license notice for the 
 * JavaScript code in this page.
 * 
 * Copyright (c) 2012-2013 RockStor, Inc. <http://rockstor.com>
 * This file is part of RockStor.
 * 
 * RockStor is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published
 * by the Free Software Foundation; either version 2 of the License,
 * or (at your option) any later version.
 * 
 * RockStor is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 * 
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 * 
 */

AddUserView = RockstorLayoutView.extend({
  events: {
    "click #cancel": "cancel"
  },

  initialize: function() {
    // call initialize of base
    this.constructor.__super__.initialize.apply(this, arguments);
    // set template
    this.template = window.JST.users_add_user;
    this.username = this.options.username;
    this.user = new User({username: this.username});
    this.dependencies.push(this.user);
  },

  render: function() {
    this.fetch(this.renderExportForm, this);
    return this;
  },

  renderExportForm: function() {
    var _this = this;
    //$(this.el).html(this.template());
    $(this.el).html(this.template({
        username: this.username,
        user: this.user

      }));

    this.$('#user-create-form :input').tooltip({placement: 'right'});

    this.validator = this.$("#user-create-form").validate({
      onfocusout: false,
      onkeyup: false,
      rules: {
        username: "required",
        password: "required",
        password_confirmation: {
          required: "true",
          equalTo: "#password"
        }
      },
      messages: {
        password_confirmation: {
          equalTo: "The passwords do not match"
        }
      },
      
     
      
      submitHandler: function() {
        var username = _this.$("#username").val();
        var password = _this.$("#password").val();
        var is_active = _this.$("#is_active").prop("checked"); 
        var public_key = _this.$("#public_key").val();
        if(_this.username != null && _this.user != null){
            var user = new User({username: _this.username});
        	if (!_.isEmpty(password)) {
                user.set({password: password});
              } else {
                user.unset('password');
              }
              user.set({public_key: public_key});
              user.set({is_active: is_active});
              user.save(null, {
                success: function(model, response, options) {
                  app_router.navigate("users", {trigger: true});
                },
                error: function(model, xhr, options) {
                }
              });
        } else {
            // create a dummy user model class that does not have idAttribute 
            // = username, so backbone will treat is as a new object,
            // ie isNew will return true
            var tmpUserModel = Backbone.Model.extend({ 
                urlRoot: "/api/users/"
              });
	        var user = new tmpUserModel()
	        user.save(
	          {
	            username: username,
	            password: password,
	            is_active: is_active,
	            public_key: public_key
	          },
	          {
	            success: function(model, response, options) {
	              _this.$('#user-create-form :input').tooltip('hide');
	              app_router.navigate("users", {trigger: true});
	            },
	            error: function(model, xhr, options) {
	              _this.$('#user-create-form :input').tooltip('hide');
	            }
	          }
	        );
        }
        return false;
      }
    });
    return this;
  },

  cancel: function() {
    app_router.navigate("users", {trigger: true});
  }

});

