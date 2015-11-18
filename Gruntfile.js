module.exports = function(grunt) {
grunt.initConfig({
  connect: {
    server: {
      options: {
        port: 8000,
        hostname: '0.0.0.0',
        /*onCreateServer: function(server, connect, options) {
          var io = require('socket.io').listen(server);
          io.sockets.on('connection', function(socket) {
            // do something with socket
          });
        }*/
        base: {
          path: './app/',
          options: {
            index: 'index.html',
            maxAge: 300000
          }
        }
      ,livereload:35729
      ,open:true
      // ,keepalive:true
      }
    }
  }
  ,
  watch: {
      livereload: {
        options: {
          livereload: '<%=connect.server.options.livereload%>'
        },

        files: [  
         
          'app/*.html',
          'app/style/{,*/}*.css',
          'app/scripts/{,*/}*.js',
          'app/images/{,*/}*.{png,jpg}'
        ]
      }
    }
});

grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.registerTask('default', [
    'connect'
    ,'watch'
  ]);

}
