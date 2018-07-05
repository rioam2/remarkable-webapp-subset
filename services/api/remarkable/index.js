// This file is truncated from its original form and contains a couple of methods for remarkableAPI interfacing with the web application:

// REMARKABLE API ENDPOINT DEFINITIONS:
const STORAGE_ENDPOINT =
  'https://document-storage-production-dot-remarkable-production.appspot.com/document-storage/json/2';
const AUTH_ENDPOINT = 'https://my.remarkable.com/token/json/2';
const CODE_LENGTH = 8;

const remarkableAPI = {
  /**
   *  registerDevice is a method that initializes a device with the remarkableAPI
   *  backend. When successful, this function will return a Bearer authentication
   *  token and add the key to the application state, upon failure, this function
   *  will return null.
   *  @author rioam2
   *  @param  {String} code A one-time code retrieved from my.remarkable.com
   *  @return {String} Bearer device authentication token.
   */
  registerDevice: async code => {
    // If code is not valid length, return null immediately.
    if (code.length !== CODE_LENGTH) return null;
    // Send fetch request with cors reverse proxy to device auth endpoint:
    const response = await corsfetch(`${AUTH_ENDPOINT}/device/new`, {
      method: 'POST',
      body: {
        code,
        deviceDesc: 'desktop-windows',
        deviceID: uuidv4()
      }
    });
    // Fetch succeeded with invalid code:
    if (response.split(' ')[0] === 'Invalid') return null;
    // fetch succeeded with valid code: add token to application state & return:
    database.set('remarkableAPI.auth.deviceKey', response);
    remarkableAPI.registerUser(response);
    return response;
  },

  /**
   *  registerUser is a method that initializes a user with the remarkableAPI
   *  backend. When successful, this function will return a Bearer authentication
   *  token and add the key to the application state.
   *  @author rioam2
   *  @param  {String} deviceKey Bearer device authentication token.
   *  @return {String} Bearer user authentication token.
   */
  registerUser: async (
    deviceKey = store.getState().remarkableAPI.auth.deviceKey
  ) => {
    // Send POST to the user authentication endpoint using cors reverse proxy
    const response = await corsfetch(`${AUTH_ENDPOINT}/user/new`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${deviceKey}` }
    });
    // Add the user token to the application database and state.
    database.set('remarkableAPI.auth.sessionKey', response);
    return response;
  },

  /**
   *  getDocuments is a method that fetches an array of document metadata from
   *  the remarkableAPI storage backend. This will return an array of objects
   *  which details your entire document base.
   *  @author rioam2
   *  @param  {String} sessionKey Bearer user authentication token
   *  @return {Array} Array of documents (& meta) in your remarkable account.
   */
  getDocuments: async (
    sessionKey = store.getState().remarkableAPI.auth.sessionKey
  ) => {
    // Send GET to remarkableAPI storage endpoint using cors reverse proxy.
    const response = await corsfetch(`${STORAGE_ENDPOINT}/docs`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${sessionKey}` }
    });
    // Add document metadata to application state:
    try {
      database.set('remarkableAPI.documents', JSON.parse(response));
    } catch (e) {
      // User Key needs to be refreshed:
      await remarkableAPI.registerUser();
      return remarkableAPI.getDocuments();
    }
    return JSON.parse(response);
  },

  /**
   *  updateMetadata takes either a single metadata object, or an array of metadata
   *  objects and updates those documents on the reMarkable servers with the
   *  new metadata supplied. Examples of usage include bookmarking or moving
   *  documents.
   *
   *  @author rioam2
   *  @param  {[type]} metadata   The document metadata to update on the server
   *  @param  {String} sessionKey The current reMarkable API sessionKey.
   *  @return {Promise} Promise to the Fetch response as JSON
   */
  updateMetadata: (
    metadata,
    sessionKey = store.getState().remarkableAPI.auth.sessionKey
  ) =>
	/* PUT the new metadata to the reMarkable update endpoint: */
    corsfetch(`${STORAGE_ENDPOINT}/upload/update-status`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${sessionKey}`
	  },
	  /* Update Version number for the new metadata changes: */
      body: (Array.isArray(metadata) &&
        metadata.map(entry => ({
          ...entry,
          Version: entry.Version + 1
        }))) || [
        {
          ...metadata,
          Version: metadata.Version + 1
        }
      ]
    }).then(res => JSON.parse(res)),
    
  /**
   *  parseLines takes a DataView object of the remarkable .lines file (from
   *  getDocument(...).lines) and then returns an opject representation of the
   *  data contained in the document for use in rendering or editing the file.
   *
   *  @author rioam2
   *  @param  {DataView} lineDataView a DataView object class of the .lines file
   *  @return {Object} an object representation of the .lines file for render/edit
   */
  parseLines: lineDataView => {
    /* Construct a pointer abstraction to ease the parsing of binary data
       from the DataView Object */
    let pointer = 0;
    function readNextByte(type = 'int') {
      const prevPtr = pointer;
	  pointer += 4;
	  /* Return an LE-int32 if type param === "int"
		 else return LE-float32 */
      return type === 'int'
        ? lineDataView.getInt32(prevPtr, true)
        : lineDataView.getFloat32(prevPtr, true);
    }
	/* Read the number of pages, then create an array for
	   and store data for each subsequent page: */
	const numPages = readNextByte();
    const pages = Array(...Array(numPages));
	const lineObj = { pages };
	// Extract Page data:
    pages.forEach((page, pageNum) => {
      const numLayers = readNextByte();
      const layers = Array(...Array(numLayers));
      lineObj.pages[pageNum] = {
        layers
      };
      // Extract Layer Data:
      layers.forEach((layer, layerNum) => {
        const numLines = readNextByte();
        const lines = Array(...Array(numLines));
        lineObj.pages[pageNum].layers[layerNum] = {
          lines
		};
		// Extract Line Data:
        lines.forEach((line, lineNum) => {
          const brush = readNextByte();
          const color = readNextByte();
          const selection = readNextByte();
          const size = readNextByte('float');
          const numPoints = readNextByte();
          const points = Array(...Array(numPoints));
          lineObj.pages[pageNum].layers[layerNum].lines[lineNum] = {
            brush,
            color,
            selection,
            size,
            points
		  };
		  // Extract Point Data:
          points.forEach((point, pointNum) => {
            const x = readNextByte('float');
            const y = readNextByte('float');
            const pressure = readNextByte('float');
            const rotX = readNextByte('float');
            const rotY = readNextByte('float');
            lineObj.pages[pageNum].layers[layerNum].lines[lineNum].points[
              pointNum
            ] = {
              x,
              y,
              pressure,
              rotX,
              rotY
            };
          });
        });
      });
    });
    return lineObj;
  }
}
