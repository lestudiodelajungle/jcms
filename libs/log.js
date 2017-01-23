/*
 * module log
 * require le module winston pour la gestion des logs
 */

var winston = require("winston"),
    timeIn;

module.exports = new(winston.Logger)({
    transports: [new(winston.transports.File)({
        filename: 'tools/logs/jcms.log',
        level: 'info',
        json: false,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false

    }), new(winston.transports.Console)({
//        handleExceptions: true,
        json: false,
        level: 'silly',
        colorize: true,
        timestamp: function () {
            var date = new Date();
            return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "-" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " > ";
        },
        formatter: function (options) {
            var time = new Date(new Date() - timeIn);
            var msg = "";


            //                options.level = options.level.replace(/\s([a-z])/g, function ($1) {
            //                    return $1.toUpperCase()
            //                });

            switch (options.level) {
            case "info":
                options.level = options.level.green;
            case "debug":
                options.level = options.level.cyan;
            case "warn":
                options.level = options.level.yellow;
            case "error":
                options.level = options.level.red;
            }


            if (options.level == "verbose") {
                return options.message;
            }

            msg += options.timestamp().grey;
            // type de log
            msg += options.level + ' ';

            //message du log
            if (undefined !== options.message) {
                msg += options.message;
            }

            // donnée meta du log
            if (JSON.stringify(options.meta) != '{}') {
                msg += '\n\t' + JSON.stringify(options.meta);
            }

            // temps ecoulé depuis le dernier log
            if (time != "Invalid Date")
                msg += (" +" + time.getMilliseconds() + " ").cyan;

            timeIn = new Date();
            return msg;
        }
    })]
});
