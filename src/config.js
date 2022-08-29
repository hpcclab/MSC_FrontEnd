const defaultSettings = {
    REACT_APP_API_URL: 'http://oc.oaas.10.131.36.40.nip.io/',
    REACT_APP_GA_PROPERTY: 'track me',
}

const settings = {defaultSettings, ...process.env}

export default settings;