(function(){

        var old = console.log;

        console.log = function(){
            Array.prototype.unshift.call(arguments, 'Report: ');
            old.apply(this, arguments)
        }

})();

console.log('test')
