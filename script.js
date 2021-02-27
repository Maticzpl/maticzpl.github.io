function scroll(){
    let root = document.documentElement;
    root.style.setProperty('--scroll', window.scrollY + "px");
}

function expand(infoid, arrowId){
    let element = document.getElementById(infoid);
    let arrow = document.getElementById(arrowId);


    if(element.hasAttribute('style')){
        element.removeAttribute('style');
        arrow.setAttribute('style','transform: rotateZ(180deg);');

        element.parentElement.scrollIntoView({behavior:"smooth",block:"start"});
    }
    else{
        element.setAttribute('style','animation-name: contract;');
        arrow.setAttribute('style','transform: rotateZ(360deg);')
    }
}

function loadProjects()
{
    let projects = document.getElementsByClassName('project');

    for (let index = 0; index < projects.length; index++) {
        const element = projects[index];
        
        let config = {
            title:undefined,
            icon:undefined,
            shortDesc:undefined,
            desc:undefined,
            link:undefined,
            date:undefined,
            eye:undefined,
            state:undefined,
            tech:undefined
        };

        for (let ind = 0; ind < element.children.length; ind++) {
            const child = element.children[ind]; 
            
            if (!config.eye) {
                config.eye = child.hasAttribute('eye');                            
            }
            
            if (child.hasAttribute('title')) 
                config.title    =   child.innerHTML;
            else if (child.hasAttribute('icon')) 
                config.icon     =   child.innerText;
            else if (child.hasAttribute('shortDesc')) 
                config.shortDesc=   child.innerHTML;
            else if (child.hasAttribute('desc')) 
                config.desc     =   child.innerHTML;
            else if (child.hasAttribute('link')) 
                config.link     =   child.innerText;
            else if (child.hasAttribute('date')) 
                config.date     =   child.innerText;
            else if (child.hasAttribute('state')) 
                config.state     =  child.innerText;
            else if (child.hasAttribute('tech')) 
                config.tech     =  child.innerText.split(',');

        }
        element.setAttribute('style','display:block');
  
        let technologies = "";
        //Create all the tech buttons
        if (config.tech) {           

            config.tech.forEach(element => {
                technologies += `<div class="button">${element}</div>`
            }); 
        }

        //Write html
        {
            element.innerHTML = ''; //Clear the inside
            
            if (config.icon)            
                element.innerHTML += `<img alt="project icon" src="${config.icon}"/>`;
            
            element.innerHTML += `<h2>${config.title}</h2>`;
            
            if (config.state)
                element.innerHTML +=`
                <span style="font-weight:bold; margin:0; ${config.icon ? "" : "margin-left:7px;"}">
                Project Status: ${config.state}
                </span>`;
            
            if (config.shortDesc)
                element.innerHTML += `<p>${config.shortDesc}</p>`;

            element.innerHTML += `<br clear>`;

            if (config.link)
                element.innerHTML +=`
                <div sideways clear class="button">
                    <a rel="noreferrer"  href="${config.link}" target="_blank" >
                        <span style="font-weight:bold; margin-right:5px;" class="link-style">
                            ${config.eye ? 'See The Result' : 'Source Code'}:
                        </span>
                    </a>
                    <a rel="noreferrer"  href="${config.link}" target="_blank" >
                        <img style="margin:0;" 
                        ${config.eye ? 'src="./assets/eye.png"': 'src="./assets/github logo.png"'}
                        width='30px' class="invert"/>
                    </a>
                </div>`

            if (config.tech)
                element.innerHTML +=`<div sideways>${technologies}</div>`  

            if (config.date)
                element.innerHTML += `
                <span style="text-align: left; display:block; margin:5px;">
                    Creation Date: ${config.date}
                </span>`
            
            element.innerHTML += `
            <section id="info${index}" class="info" style="display:none;">
                ${config.desc}
            </section>      
            <div class="more-info" onclick="expand('info${index}','arrow${index}')">
                <span id="arrow${index}" class="material-icons">
                    keyboard_arrow_down
                </span>
            </div>`;
        }
    }
}
