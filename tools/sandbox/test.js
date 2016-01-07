var Change, Project, Task, Test, key,
    __hasProp = {}.hasOwnProperty,
    __extends = function (child, parent) {
        for (key in parent) {
           // if (__hasProp.call(parent, key)) child[key] = parent[key];
        }

        function ctor() {
            this.constructor = child;
        }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype;
        return child;
    };

Change = (function (_super) {
    __extends(Change, _super);

    function Change() {
        return Change.__super__.constructor.apply(this, arguments);
    }

    Change.prototype.model_name = 'Change';

    Change.prototype.sync = require('backbone-orm').sync(Change);

    return Change;

})(Backbone.Model);
///////////////////////////////////////////////////////////////////////////////////////
Task = (function (_super) {
    __extends(Task, _super);

    function Task() {
        return Task.__super__.constructor.apply(this, arguments);
    }

    Task.prototype.urlRoot = 'mongodb://localhost:27017/tasks';

    Task.prototype.schema = {
        project: function () {
            return ['belongsTo', Project];
        },
        changes: function () {
            return [
        'hasMany', Change, {
                    embed: true
        }
      ];
        }
    };

    Task.prototype.sync = require('backbone-mongo').sync(Task);

    return Task;

})(Backbone.Model);
//////////////////////////////////////////////////////////////////////////////////////////
Project = (function (_super) {
    __extends(Project, _super);

    function Project() {
        return Project.__super__.constructor.apply(this, arguments);
    }

    Project.prototype.urlRoot = 'mongodb://localhost:27017/projects';

    Project.prototype.schema = {
        tasks: function () {
            return ['hasMany', Task];
        },
        changes: function () {
            return [
        'hasMany', Change, {
                    embed: true
        }
      ];
        }
    };

    Project.prototype.sync = require('backbone-mongo').sync(Project);

    return Project;

})(Backbone.Model);
/////////////////////////////////////////////////////////////////////////////////////////////
Test = (function (_super) {
    __extends(Test, _super);

    function Test() {
        return Test.__super__.constructor.apply(this, arguments);
    }

    Test.prototype.model_name = 'Test';

    Test.prototype.sync = require('backbone-orm').sync(Test);

    return Test;

})(Backbone.Collection);
