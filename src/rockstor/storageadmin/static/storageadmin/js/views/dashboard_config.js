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

DashboardConfigView = Backbone.View.extend({
  events: {
    "click .widget-name": "widgetClicked"
  },

  initialize: function() {
    this.dashboardconfig = this.options.dashboardconfig;
    this.template = window.JST.dashboard_dashboard_config;
    this.parentView = this.options.parentView;
  },

  render: function() {
    $(this.el).html(this.template({
      wSelected: this.dashboardconfig.getConfig()
    }));
    return this;
  },

  widgetClicked: function(event) {
    var cbox = $(event.currentTarget);
    this.parentView.trigger("widgetClicked", cbox.val(), cbox.is(":checked"));
  },

  setCheckbox: function(name, checked) {
    var cbox = this.$('input[type="checkbox"][value="' + name + '"]');
    if (checked) {
      cbox.attr("checked", "true");
    } else {
      cbox.removeAttr("checked");
    }
  }


});


