import React from 'react';

const styles = {
  footerStyle: {
    width: "100%",
    height: "60px",
    marginTop: "5%",
    backgroundColor: "#033940",
    borderColor: "#337abb",
    color: "#e7e7e7"
  },
  footerText: {
    paddingTop: "15px"
  }
}

const Footer = () => (
  <footer className="footer" style={styles.footerStyle}>
      <p className="col-lg-offset-3" style={styles.footerText}>created by <a href="http://www.gobindathakur.com/">Gobinda Thakur</a></p>
  </footer>
)

export default Footer;
