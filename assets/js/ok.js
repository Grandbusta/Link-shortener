var linkarea=document.getElementById('linkarea');
var shortbtn=document.getElementById('shortbtn');
var tooltip=document.getElementById('tool');
shortbtn.addEventListener('click',()=>{
    var value=linkarea.value;
    linkarea.select();
    document.execCommand('copy',false,value);
    tooltip.style.display='block';
})
