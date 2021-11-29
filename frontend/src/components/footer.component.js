import React from "react";
import IconButton from '@material-ui/core/IconButton';
import LanguageIcon from '@material-ui/icons/Language';

function nose() {

  window.open('https://github.com/InahoAZ/sueldos-soft', '_blank');
}

const Footer = () => (




  <div style={{
    //padding: '1rem',
    backgroundColor: '#1769aa',
    bottom: 0,
    left: '0',
    width: '100%'
  }}>


    <p style={{ color: 'white', display: 'inline-block', marginBottom: '10px', marginLeft: '10px' }}><b>SueldosCorp</b> © 2021. All Rights reserved</p>
    <IconButton onClick={nose} style={{ color: 'white', float: 'right', padding: 0, marginTop: '10px', marginRight: '10px' }}>
      <LanguageIcon />
    </IconButton>


  </div>
);

export default Footer;