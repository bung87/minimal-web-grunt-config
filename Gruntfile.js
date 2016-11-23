module.exports = function(grunt) {
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});

var mountFolder = function(connect, dir) {
  return require('serve-static')(require('path').resolve(dir));
};
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
        middleware: function(connect) {
            return [lrSnippet, mountFolder(connect, 'public'),mountFolder(connect, 'app/views')];
        }
        // ,base: {
        //   path: './app/',
        //   options: {
        //     index: 'index.html',
        //     maxAge: 300000
        //   }
        // }
      // ,livereload:LIVERELOAD_PORT
      ,open:true
      // ,keepalive:true
      }
    }
  }
  ,
  watch: {
     sass: {
        files: 'app/assets/stylesheets/{,*/}*.{scss,sass}',
        tasks: ['sass:dist']
      },
      livereload: {
        options: {
          livereload: '<%=connect.server.options.livereload%>'
        },

        files: [  
         
          'app/views/{,*/}*.html',
          'public/{,*/}*.css',
          'public/{,*/}*.js',
          'app/assets/images/{,*/}*.{png,jpg}'
        ]
      }
    },
 sass: {
    dist: {
      files: [{
        expand: true,
        cwd: 'app/assets/stylesheets',
        src: ['*.scss'],
        dest: './public',
        ext: '.css'
      }]
    }
  }
});
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.registerTask('default', [
    'connect'
    ,'watch'
  ]);

}
