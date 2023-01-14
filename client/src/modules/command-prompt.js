/*
   ________  _______     __    _          
  / ____/  |/  / __ \   / /   (_)___  ___ 
 / /   / /|_/ / / / /  / /   / / __ \/ _ \
/ /___/ /  / / /_/ /  / /___/ / / / /  __/
\____/_/  /_/_____/  /_____/_/_/ /_/\___/ 
module for simulating a cmd line interface
*/

// create functions to customize based on theme, main function with switch to set theme components and export

const CMD = {'commands': {}};

// force focus
function setFocus(e){
  window.addEventListener('load', () => {
    inpt.focus();
  });
  setInterval(() => {
    inpt.focus();
  }, 1000);
}

function setCommand(cmd, action){
  // cmd is a string of the command
  // action is the callback for the command
  CMD['commands'][cmd] = action;
}

// listen for inputs, call callback
function listen(e){
  e.addEventListener("keydown", (k) => {
    if (k.keyCode == 13){
      k.preventDefault();
      if (Object.keys(CMD["commands"]).includes(e.textContent)){
        CMD["commands"][e.textContent]();  // call the callback
      } else {
        // 
        let url = "https://www.google.com/search?key=AIzaSyD2mogAW8iAuKjHin_mKT2HuN6wnO45HZU&q=" + e.textContent;
        window.open(url, "_self");
      }
      inpt.textContent = "";  // clear the text area
    }
  });
}

// renders the last entered command
function appendHistory(){
  let search = document.getElementsByClassName("search")[0];
  let hist = document.createElement("p");
  let prmpt = document.createElement("span");
  let cmd = document.createElement("span");
  prmpt.textContent = document.querySelector("p span").textContent;
  cmd.textContent = " " + inpt.textContent;
  hist.appendChild(prmpt);
  hist.appendChild(cmd);
  document.querySelector("body").insertBefore(hist, search);
}

// renders nested json-esque style config list
function block(name, obj){
  let ent = document.createElement("div");
  ent.style.marginLeft = "2%";
  for (var key in obj){
    if (typeof obj[key] == "object"){
      ent.appendChild(block(key, obj[key]));
    } else {
      let line = document.createElement("div");
      line.textContent = key + ": " + obj[key];
      ent.appendChild(line);
    }
  }
  let out = document.createElement("div");
  out.textContent = name + ": ";
  out.appendChild(ent)
  return out
}

// handles entered commands
function parseCmd(cmd){
  let out = document.createElement("div");
  let search = document.getElementsByClassName("search")[0];
  if (cmd == "ls"){
    for (var entry in CONFIG){
      let ent = document.createElement("div");
      ent.textContent = entry + ": ";
      if(typeof CONFIG[entry] == "object"){
        ent = block(entry, CONFIG[entry]);
      } else {
        ent.textContent += CONFIG[entry];
        out.appendChild(ent);
      }
      out.appendChild(ent);
    }
    document.querySelector("body").insertBefore(out, search);
  } else if (cmd.substring(0,3) == "set"){
    let property = cmd.substring(4).split(" ")[0];
    let value = cmd.substring(4).split(" ")[2].trim();
    parseCmd("ls");
    fetch("http://localhost:30000/api/configs?key="+property+"&value="+value);
    fetch("http://localhost:30000/api/client-configs")
      .then((res) => res.json()
      .then((data) => {
        localStorage.setItem("CONFIG", JSON.stringify(data));
        window.CONFIG = data;
    }));
  } else if (cmd == "help"){
    location.reload();
  }
}

// inpt.addEventListener("keydown", (e) => {
//   if (e.keyCode == 13){
//     e.preventDefault();
//     let url = window.location.href + "?cmd=" + inpt.textContent;
//     appendHistory();
//     parseCmd(inpt.textContent);
//     inpt.textContent = "";
//     while (document.getElementsByClassName("search")[0].getBoundingClientRect().bottom > 868.5){
//       let child = document.querySelector("body").firstChild;
//       document.querySelector("body").removeChild(child);
//     }
//   }
// });

CMD.setFocus = setFocus;
CMD.listen = listen;
CMD.setCommand = setCommand;

module.exports = CMD;
