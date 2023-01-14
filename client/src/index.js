// entry file for the main page
import CONFIG from './config';
// conditionally import modules for each layouts/themes
switch (CONFIG.layout){
  case 'terminal':
    // import layout specific files
    // import('./styles/themes/nord.css').catch((err) => {console.error(err);});
    loadCSS('./themes/' + CONFIG.theme + '.css');
    import('./components/status-line/status-line.js').then((res) => {
      let STAT = res;
      // using the module
      STAT.buildStatus();
    }).catch((err) => {
      console.error(err);
    });
    import('./components/terminal-nav/terminal-nav.js').catch((err) => {console.error(err);});
    import('./components/command-prompt/command-prompt.js').then((res) => {
      let CMD = res;
      // using the module
      CMD.setFocus(document.getElementById("inpt"));
      CMD.setCommand("config", function conf() {
        window.location.replace("http://localhost:30000/config");
      });
      CMD.listen(document.getElementById("inpt"));
    }).catch((err) => {
      console.error(err);
    });
    break;
  default:
    break;
}


