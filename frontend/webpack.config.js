module.exports = {
  resolve: {
    // Prevent webpack from following npm-linked symlinks to their real paths.
    // Without this, @angular/core (and other shared packages) get resolved from
    // the linked package's own node_modules, creating a second Angular instance
    // which breaks DI with NG0203 / inject() context errors.
    symlinks: false,
  },
};
