# setup

```
npm install && cd public && bower install
```

note: set npm proxy or use cnpm, or you may encounter problem of installing PhantomJS

# develop

make sure use run mongod your self, you can make a directory in project root named `data`, since `/data/` has been ignored in .gitignore.

run `gulp`, and you'll open your browser for `http://localhost:3000`, and the express server run on `http://localhost:3002` which is proxyed by a middleware for all routes `/api`, you may visit `http://localhost:3000/api`, it is the same with `http://localhost:3002/api`.

`http://localhost:3001` is the browser-sync's backend url, see http://www.browsersync.io/ for more detail.

# note

This skeleton use `generator-gulp-angular` and `generator-express` and replace public folder with angular project folder, modify express configuration for render json instead of view.

Then use `gulp-namespace` for importing angular tasks with prefix `front:`, but this will result in the following problem: some angular tasks use `gulp.start(taskName)` to run task inside task, thus it won't be able to load the given task. Currently we can shim tasks used with `gulp.start` in the root gulpfile, e.g. `gulp.task('taskName', ['front:taskName']);`. Another way is modify gulp-namespace and shim `gulp.start`, which is not on thread.

Notice that in the root gulpfile, we use gulp-chroot for changing root for subdirectory gulp task, since express's task is less dependent on cwd, and we can use `__dirname` to specify the right directory, and it's difficult to modify all angular's tasks' directories, so we change working dir. But it's impossible to change the root that are used in async method of those tasks, it's limited.

This draft is not fully tested, and lack of some tasks in the root gulpfile.

So What I recommend is manually run `gulp develop` in the root and `gulp serve` in public.
