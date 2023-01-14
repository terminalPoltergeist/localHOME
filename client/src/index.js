// entry file for the main page
import * as CMD from './modules/command-prompt.js';
import CONFIG from './config';
// conditionally import styles for layouts/themes
switch (CONFIG.layout){
  case 'terminal':
    import('./styles/layouts/terminal/index.css').catch((err) => {console.error(err)});
    break;
  default:
    break;
}

CMD.setFocus(document.getElementById("inpt"));
CMD.setCommand("config", function conf() {
  window.location.replace("http://localhost:30000/config");
});
CMD.listen(document.getElementById("inpt"));
