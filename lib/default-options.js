module.exports = {
  customTests: [],
  developmentPath: null,
  outputDir: 'vendor',
  outputFileName: 'ember-cli-modernizr',
  uglify: true,
  tests: [], // Tests you want to implicitly include

  extensibility: {
    addtest: false,
    prefixed: false,
    teststyles: false,
    testprops: false,
    testallprops: false,
    hasevents: false,
    prefixes: false,
    domprefixes: false,
    cssclassprefix: ''
  },

  extra: {
    shiv: true,
    printshiv: false,
    load: true,
    mq: false,
    cssclasses: true
  },
};
