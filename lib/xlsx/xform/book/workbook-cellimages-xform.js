const BaseXform = require('../base-xform');

const PictureXform = require('../drawing/pic-xform');

class CellImagesXform extends BaseXform {
  constructor() {
    super();

    this.map = {
      'xdr:pic': new PictureXform(),
    };
  }

  render(xmlStream, model) {
    throw new Error('Unsupported CellImagesXform render');
  }

  parseOpen(node) {
    if (this.parser) {
      this.parser.parseOpen(node);
      return true;
    }
    switch (node.name) {
      case 'etc:cellImages':
        this.model = [];
        return true;
      case 'etc:cellImage':
        return false;
      default:
        this.parser = this.map[node.name];
        if (this.parser) {
          this.parser.parseOpen(node);
          return true;
        }
        throw new Error(`Unexpected xml node in parseOpen: ${JSON.stringify(node)}`);
    }
  }

  parseText(text) {
    if (this.parser) {
      this.parser.parseText(text);
    }
  }

  parseClose(name) {
    if (this.parser) {
      if (!this.parser.parseClose(name)) {
        this.model.push(this.parser.model);
        this.parser = undefined;
      }
      return true;
    }
    switch (name) {
      case 'etc:cellImages':
        return false;
      case 'etc:cellImage':
        return true;
      default:
        throw new Error(`Unexpected xml node in parseClose: ${name}`);
    }
  }
}

module.exports = CellImagesXform;
