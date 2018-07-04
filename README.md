# remarkable-webapp-subset
This repository contains an example subset of code from the reMarkable Paper Tablet web-based client at http://remarkableweb.app

### Comments:
This file is a subset of a larger project for example purposes. Here are a few points to note on style:

 - This file (as well as all others) conform to the Airbnb coding style conventions 
 - Babel Transpilation is used for fundamental ES6 Support.
 - React PropTypes is used for Type Checking and Validation instead of TypeScript. This was an oversight when initially starting the project.
 - The general application source file structure is as follows: 
 
 ```
 src/
    components/    ## Helper functions for the current context
    services/      ## All functional and computational modules
    views/         ## Component Views (similar to /components, but may contain nested components)
    img/           ## Necessary Images and Vectors
    index.js       ## Entry Point for current context
```

### Current Project Directory Listing:
```
src
├───components
│   └───MenuBar
│       ├───components
│       └───img
├───img
├───services
│   ├───api
│   │   ├───corsfetch
│   │   └───remarkable
│   ├───firebase-redux
│   │   ├───actions
│   │   ├───reducers
│   │   └───store
│   └───uuidv4
├───types
└───views
    ├───BrowserView
    │   ├───components
    │   │   ├───CornerBranding
    │   │   │   └───img
    │   │   ├───DocumentTile
    │   │   │   └───img
    │   │   ├───FolderTile
    │   │   │   └───img
    │   │   │       └───SVG
    │   │   ├───Sidebar
    │   │   │   └───img
    │   │   └───TopToolbar
    │   │       ├───components
    │   │       └───img
    │   ├───img
    │   ├───services
    │   └───views
    │       └───AuthenticationView
    │           └───components
    │               ├───GoogleAuth
    │               │   └───img
    │               └───RemarkableAuth
    │                   └───img
    └───DocumentView
        ├───components
        │   ├───Backdrop
        │   │   └───img
        │   │       └───templates
        │   │           └───img
        │   ├───Canvas
        │   │   ├───img
        │   │   │   └───brushes
        │   │   │       ├───brush2
        │   │   │       └───brush7
        │   │   └───services
        │   └───Toolbar
        │       ├───components
        │       │   ├───Sidebar
        │       │   │   └───img
        │       │   └───Topbar
        │       │       ├───components
        │       │       │   └───InfoBar
        │       │       └───img
        │       │           └───toolIcons
        │       └───img
        └───services
```
