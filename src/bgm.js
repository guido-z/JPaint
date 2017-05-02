if(!window.buttonGroupManager) {
    window.buttonGroupManager = (function() {
        function Button(owner, text, id, clickHandler) {
            this.innerControl = this.initializeInnerControl(text, id, clickHandler);
            this.owner = owner;
        }

        Button.prototype.initializeInnerControl = function (text, id, clickHandler) {
            var innerControl = $("<button>")
                .text(text)
                .attr("id", id)
                .on("click", clickHandler)
                .on("click", () => { innerControl.addClass("buttonActive").removeClass("buttonInactive"); })
                .on("click", () => this.owner.unclickInactiveButtons(this))
                .addClass("buttonDefault buttonInactive");

            return innerControl;
        }

        function Group() {
            this.elements = new Array();
        }

        Group.prototype.addButton = function(button) {
            this.elements.push(button);
        }

        Group.prototype.unclickInactiveButtons = function(button) {
            for(var i in this.elements) {
                if(this.elements[i] != button) {
                    this.elements[i].innerControl.addClass("buttonInactive").removeClass("buttonActive");
                }
            }
        }

        var buttonGroupManager = {
            groups: new Object(),

            createButton: function(groupName, text, id, clickHandler) {
                var group = this.groups[groupName];
                var button = new Button(group, text, id, clickHandler);

                group.addButton(button);
            },

            createGroup: function(name) {
                this.groups[name] = new Group();
            },

            attachGroupToDOM: function(groupName, containerId) {
                var group = this.groups[groupName];

                $.each(group.elements, function(i, obj) {
                    $("#" + containerId).append(obj.innerControl);
                });
            }
        };

        return buttonGroupManager;
    })();
}