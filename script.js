function toggle_projeto(e){
    const id = e.target.id + '2'
    const projeto = document.getElementById(id)
    console.log(projeto.style.display)
    
    if (projeto.style.display == 'block'){
        projeto.style.display = 'none' 
    }   else {
        projeto.style.display = 'block' 
    }
}