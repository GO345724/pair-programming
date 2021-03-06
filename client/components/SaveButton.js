import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import FileSaver from 'file-saver';
import PropTypes from 'prop-types';

class SaveButton extends Component {
  constructor(props) {
    super(props);
    this.state = {text: this.props.text, title: this.props.title, lang: this.props.lang};
    this.saveCode = this.saveCode.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({text: nextProps.text, title: nextProps.title, lang: nextProps.lang})
  }
  saveCode(e) {
    e.preventDefault();
    const code = this.state.text;
    const blob = new Blob([code], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, `${this.fileNameify(this.state.title)}.${this.fileExtension(this.state.lang)}`);
  }
  fileNameify(name) {
    return name.split(" ").join("_");
  }
  fileExtension(lang) {
    const fileExtensionDict = {
      "javascript": "js",
      "ruby": "rb",
      "css": "css",
      "java": "java",
      "python": "py",
      "php": "php",
      "xml": "xml",
      "json": "json",
      "html": "html",
      "sass": "sass",
      "markdown": "mkd",
      "mysql": "frm",
      "handlebars": "hbs",
      "golang": "vm",
      "csharp": "cs",
      "elixir": "exs",
      "typescript": "ts"
    };
    return fileExtensionDict[lang];
  }
  render() {
    return(
      <Button className="btn-primary col-lg-12" onClick={this.saveCode}>Save Code</Button>
    )
  }
}
SaveButton.propTypes = {
  text: PropTypes.string.isRequired,
  lang: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}
export default SaveButton;
