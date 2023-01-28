// entry file for the main page

// get the apps configurations from config.json
import CONFIG from './config';

// conditionally import modules for each layouts/themes
switch (CONFIG.layout){
  case 'terminal':
    // import layout specific files
    loadCSS('./themes/' + CONFIG.theme + '.css');
    // status-line module
    import('./components/status-line/status-line.js').then((res) => {
      let STAT = res;
      // using the module
      STAT.buildStatus();
    }).catch((err) => {
      console.error(err);
    });

    // nav-link module
    import('./components/terminal-nav/terminal-nav.js').catch((err) => {console.error(err);});
    
    // cmd-prompt module
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

if (CONFIG.openInNewTab){
  let links = document.getElementsByTagName("a");
  for (let i=0; i<links.length; i++){
    links[i].setAttribute("target", "_blank");
  }
} else {
  let links = document.getElementsByTagName("a");
  for (let i=0; i<links.length; i++){
    links[i].setAttribute("target", "");
  }
}
