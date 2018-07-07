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
│       │   index.js
│       │
│       ├───components
│       │       ButtonGroup.js
│       │       ToolButton.js
│       │
│       └───img
│               bookmarkbutton.ai
│               bookmarkbutton.svg
│               closebutton.svg
│               deletebutton.ai
│               deletebutton.svg
│               duplicatebutton.ai
│               duplicatebutton.svg
│               movebutton.ai
│               movebutton.svg
│               moveherebutton.ai
│               moveherebutton.svg
│               okbutton.svg
│               renamebutton.ai
│               renamebutton.svg
│
├───img
│       loadingspinner.svg
│       remarkablewebapplogo.svg
│
├───services
│   ├───api
│   │   ├───corsfetch
│   │   │       index.js
│   │   │
│   │   └───remarkable
│   │           index.js
│   │
│   ├───firebase-redux
│   │   │   firebase.js
│   │   │   fireStorage.js
│   │   │   firestore-subscribe.js
│   │   │   firestore.js
│   │   │   stores.js
│   │   │
│   │   ├───actions
│   │   │       auth.js
│   │   │       database.js
│   │   │
│   │   ├───reducers
│   │   │       index.js
│   │   │
│   │   └───store
│   │           index.js
│   │
│   └───uuidv4
│           index.js
│
├───types
│       contentCacheType.js
│       documentType.js
│       lineType.js
│       thumbnailType.js
│       userType.js
│
└───views
    │   SplashScreen.js
    │
    ├───BrowserView
    │   │   index.js
    │   │
    │   ├───components
    │   │   │   BrowserGrid.js
    │   │   │   DirectoryWrapper.js
    │   │   │   OptionsButton.js
    │   │   │   TileGroupContainer.js
    │   │   │
    │   │   ├───CornerBranding
    │   │   │   │   CornerBrandingWrapper.js
    │   │   │   │   index.js
    │   │   │   │   LogoComp.js
    │   │   │   │
    │   │   │   └───img
    │   │   │           logo.svg
    │   │   │           remarkable-logo.svg
    │   │   │
    │   │   ├───DocumentTile
    │   │   │   │   DocTileWrapper.js
    │   │   │   │   index.js
    │   │   │   │   Subtitle.js
    │   │   │   │   Title.js
    │   │   │   │   TitleWrapper.js
    │   │   │   │
    │   │   │   └───img
    │   │   │           notebook_icon.svg
    │   │   │           notebook_icon_missing.svg
    │   │   │
    │   │   ├───FolderTile
    │   │   │   │   FolderIcon.js
    │   │   │   │   FolderWrapper.js
    │   │   │   │   index.js
    │   │   │   │   Title.js
    │   │   │   │   TitleWrapper.js
    │   │   │   │
    │   │   │   └───img
    │   │   │       │   foldertile_icon.ai
    │   │   │       │   foldertile_icon.svg
    │   │   │       │
    │   │   │       └───SVG
    │   │   │               folder_icon.svg
    │   │   │               folder_icon_solid.svg
    │   │   │
    │   │   ├───Sidebar
    │   │   │   │   AppInfo.js
    │   │   │   │   BottomContainer.js
    │   │   │   │   index.js
    │   │   │   │   LogoutButton.js
    │   │   │   │   SidebarWrapper.js
    │   │   │   │   TopContainer.js
    │   │   │   │   UserImage.js
    │   │   │   │   UserName.js
    │   │   │   │   UserWrap.js
    │   │   │   │
    │   │   │   └───img
    │   │   │           logoutbutton.svg
    │   │   │
    │   │   └───TopToolbar
    │   │       │   BreadcrumbWrapper.js
    │   │       │   ButtonWrapper.js
    │   │       │   index.js
    │   │       │   SyncButton.js
    │   │       │   SyncSpinner.js
    │   │       │   TopToolbarWrapper.js
    │   │       │
    │   │       ├───components
    │   │       │       ToolbarButton.js
    │   │       │
    │   │       └───img
    │   │               loadingspinner.svg
    │   │               new_folder_icon.svg
    │   │               new_notebook_icon.ai
    │   │               new_notebook_icon.svg
    │   │
    │   ├───img
    │   │       optionbutton.svg
    │   │
    │   ├───services
    │   │       minToTimestring.js
    │   │       smartTrim.js
    │   │
    │   └───views
    │       └───AuthenticationView
    │           │   index.js
    │           │
    │           └───components
    │               ├───GoogleAuth
    │               │   │   index.js
    │               │   │
    │               │   └───img
    │               │           googleheader-01.svg
    │               │           googleheader.svg
    │               │
    │               └───RemarkableAuth
    │                   │   index.js
    │                   │
    │                   └───img
    │                           headerimage.svg
    │
    └───DocumentView
        │   index.js
        │
        ├───components
        │   │   ErrorSplash.js
        │   │   ThumbnailSplash.js
        │   │
        │   ├───Backdrop
        │   │   │   index.css
        │   │   │   index.js
        │   │   │   renderTemplateImage.js
        │   │   │   StyledDocument.js
        │   │   │
        │   │   └───img
        │   │       └───templates
        │   │           │   index.js
        │   │           │
        │   │           └───img
        │   │                   Blank.png
        │   │                   Isometric.png
        │   │                   LS Checklist double.png
        │   │                   LS Checklist.png
        │   │                   LS Dayplanner.png
        │   │                   LS Dots bottom.png
        │   │                   LS Dots top.png
        │   │                   LS Four storyboards.png
        │   │                   LS Grid bottom.png
        │   │                   LS Grid margin large.png
        │   │                   LS Grid margin med.png
        │   │                   LS Grid top.png
        │   │                   LS Lines bottom.png
        │   │                   LS Lines medium.png
        │   │                   LS Lines small.png
        │   │                   LS Lines top.png
        │   │                   LS Margin medium.png
        │   │                   LS Margin small.png
        │   │                   LS One storyboard 2.png
        │   │                   LS One storyboard.png
        │   │                   LS Two storyboards.png
        │   │                   LS Week US.png
        │   │                   LS Week.png
        │   │                   Notes.png
        │   │                   P Black dots.png
        │   │                   P Black grid.png
        │   │                   P Black lines.png
        │   │                   P Black.png
        │   │                   P Checklist.png
        │   │                   P Cornell.png
        │   │                   P Day.png
        │   │                   P Dots large.png
        │   │                   P Dots S bottom.png
        │   │                   P Dots S top.png
        │   │                   P Dots S.png
        │   │                   P Four storyboards.png
        │   │                   P Grid bottom.png
        │   │                   P Grid large.png
        │   │                   P Grid margin large.png
        │   │                   P Grid margin med.png
        │   │                   P Grid medium.png
        │   │                   P Grid small.png
        │   │                   P Grid top.png
        │   │                   P Lined bottom.png
        │   │                   P Lined heading.png
        │   │                   P Lined top.png
        │   │                   P Lines large.png
        │   │                   P Lines medium.png
        │   │                   P Lines small.png
        │   │                   P Margin large.png
        │   │                   P Margin medium.png
        │   │                   P Margin small.png
        │   │                   P One storyboard.png
        │   │                   P Two storyboards.png
        │   │                   P US College.png
        │   │                   P US Legal.png
        │   │                   P Week 2.png
        │   │                   P Week US.png
        │   │                   P Week.png
        │   │                   Perspective1.png
        │   │                   Perspective2.png
        │   │                   _NotesFP.png
        │   │
        │   ├───Canvas
        │   │   │   index.bak.js
        │   │   │   index.js
        │   │   │
        │   │   ├───img
        │   │   │   └───brushes
        │   │   │       │   index.js
        │   │   │       │
        │   │   │       ├───brush2
        │   │   │       │       brush2.psd
        │   │   │       │       brush2_1.png
        │   │   │       │       brush2_10.png
        │   │   │       │       brush2_2.png
        │   │   │       │       brush2_3.png
        │   │   │       │       brush2_4.png
        │   │   │       │       brush2_5.png
        │   │   │       │       brush2_6.png
        │   │   │       │       brush2_7.png
        │   │   │       │       brush2_8.png
        │   │   │       │       brush2_9.png
        │   │   │       │       index.js
        │   │   │       │
        │   │   │       └───brush7
        │   │   │               brush7.psd
        │   │   │               brush7_1.png
        │   │   │               brush7_10.png
        │   │   │               brush7_2.png
        │   │   │               brush7_3.png
        │   │   │               brush7_4.png
        │   │   │               brush7_5.png
        │   │   │               brush7_6.png
        │   │   │               brush7_7.png
        │   │   │               brush7_8.png
        │   │   │               brush7_9.png
        │   │   │               index.js
        │   │   │
        │   │   └───services
        │   │           renderLayer.js
        │   │
        │   └───Toolbar
        │       │   index.js
        │       │   ToolToggle.js
        │       │
        │       ├───components
        │       │   │   ButtonGroup.js
        │       │   │   ToolButton.js
        │       │   │
        │       │   ├───Sidebar
        │       │   │   │   index.js
        │       │   │   │   SidebarWrapper.js
        │       │   │   │
        │       │   │   └───img
        │       │   │           penbutton.svg
        │       │   │           pencilbutton.svg
        │       │   │           pointerbutton.svg
        │       │   │           redobutton.svg
        │       │   │           undobutton.svg
        │       │   │
        │       │   └───Topbar
        │       │       │   index.js
        │       │       │   TopbarWrapper.js
        │       │       │
        │       │       ├───components
        │       │       │   └───InfoBar
        │       │       │           DocTitle.js
        │       │       │           index.js
        │       │       │           InfoBarWrapper.js
        │       │       │           PageIndicator.js
        │       │       │
        │       │       └───img
        │       │           │   closebutton.svg
        │       │           │   colorbutton.svg
        │       │           │   downloadbutton.ai
        │       │           │   downloadbutton.svg
        │       │           │   newpagebutton.svg
        │       │           │   nextbutton.svg
        │       │           │   pagesbutton.svg
        │       │           │   previousbutton.svg
        │       │           │   sizebutton.svg
        │       │           │
        │       │           └───toolIcons
        │       │                   ballpoint.svg
        │       │
        │       └───img
        │               cornerbutton.ai
        │               cornerbutton.svg
        │
        └───services
                renderPDF.js
```
