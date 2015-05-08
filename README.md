# copilot

Canon CSS minification demo for Pilot

## Run it

```
$ npm install
$ node render.js >site/canon-for-pilot.min.css
```

## Why this is cool!

For sites that use Pilot but not Canon, we can cut ~70KB of minified CSS.

```
┌─[ken][Kens-MacBook-Pro][±][master ✓][2.1.2][~/ksheedlo/copilot]
└─▪ ls -alh site
total 256
drwxr-xr-x   6 ken  staff   204B May  8 12:33 .
drwxr-xr-x  11 ken  staff   374B May  8 12:44 ..
-rw-r--r--   1 ken  staff     0B May  8 12:33 .gitkeep
-rw-r--r--   1 ken  staff    15K May  8 12:24 canon-for-pilot.min.css
-rw-r--r--   1 ken  staff    86K May  8 12:25 canon.min.css
-rw-r--r--   1 ken  staff    21K May  8 12:24 index.html
```

