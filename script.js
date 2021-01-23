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
            state:undefined
        };

        for (let ind = 0; ind < element.children.length; ind++) {
            const child = element.children[ind]; 
            
            if (!config.eye) {
                config.eye = child.hasAttribute('eye');                            
            }
            
            if (child.hasAttribute('title')) 
                config.title    =   child.innerHTML;
            else if (child.hasAttribute('icon')) 
                config.icon     =   child.innerHTML;
            else if (child.hasAttribute('shortDesc')) 
                config.shortDesc=   child.innerHTML;
            else if (child.hasAttribute('desc')) 
                config.desc     =   child.innerHTML;
            else if (child.hasAttribute('link')) 
                config.link     =   child.innerHTML;
            else if (child.hasAttribute('date')) 
                config.date     =   child.innerHTML;
            else if (child.hasAttribute('state')) 
                config.state     =  child.innerHTML;

        }
        element.setAttribute('style','display:block');


        element.innerHTML = `
        <img src="${config.icon}"/>
        <h2>${config.title}</h2>
        <span style="font-weight:bold; margin:0;">Project Status: ${config.state}</span>
        <p>
            ${config.shortDesc}
        </p>
        <br clear>
        <span style="text-align: left; display:block; margin:5px;">Creation Date: ${config.date}</span>
        <div sideways clear>
            <a href="${config.link}" target="_blank" >
                <span style="font-weight:bold; margin-right:5px;" class="link-style">${config.eye ? 'Link' : 'Source Code'}: </span>
            </a>
            <a href="${config.link}" target="_blank" >
                <img style="margin:0;" ${config.eye ? 'src="./assets/eye.png"': 'src="./assets/github logo.png"'} width='30px' class="invert"/>
            </a>
        </div>
        
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
