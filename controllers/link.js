const rs = require("randomstring");
const connect=require('../connection');
const env=require('../load-env');

exports.createlink=(req,res)=>{
    var re='"'+rs.generate(7)+'"';//random link generated
    var originallink='"'+req.body.link+'"';//original link inputted
    //query to check if the original link exists
    var ol=req.body.link;
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i');
    
    var pat=pattern.test(ol);

    if((originallink.length>5) && (pat==true)){
        var checklong='select originallink from links where originallink='+originallink;
        connect.query(checklong,(error,result)=>{
            if(error){
                res.render('index',{err:'An error occured, please try again'})
            };
            //check if the inputted link exists
            if(result.length<1){
                //if the link does not exist, insert the inputted link to database
                var insert='insert into links(originallink,smallone)values('+originallink+','+re+')';
                connect.query(insert,(error,insresult)=>{
                    if(error){
                        res.render('index',{err:'An error occured, please try again'})
                    };
                    //if the input is successful, fetch the short link
                    if(insresult.affectedRows=1){
                        var fetchshort='select smallone from links where originallink='+originallink;
                        connect.query(fetchshort,(error,shortresult)=>{
                            if(error){
                                res.render('index',{err:'An error occured, please try again'})
                            };
                            var short=env.DOMAIN+shortresult[0].smallone;
                            var orig=originallink.slice(0,25)+'...';
                            res.render('link',{short:short,originallink:orig,origlink:originallink});
                        })
                    }else{
                        res.render('index',{err:'An error occured, please try again'})//error if the input is not successful
                    }
                })
            }
            else{//if the inputted link exists, fetch it straight
                var ori='"'+result[0].originallink+'"';
                    var fetchshort='select smallone from links where originallink='+ori;
                    connect.query(fetchshort,(error,shortresult)=>{
                        if(error){
                            res.render('index',{err:'An error occured, please try again'})
                        };
                        var short=env.DOMAIN+shortresult[0].smallone;
                        var orig= ori.slice(0,25)+'...';
                        res.render('link',{short:short,originallink:orig,origlink:ori});
                    })
                }
            })
    }else{
        res.render('index',{err:'Please input a valid link'})
    }
}

exports.getlink=(req,res)=>{
    var id='"'+req.params.id+'"';
    var redirectlink='select originallink from links where smallone='+id;
    connect.query(redirectlink,(error,redresult)=>{
        if (error) throw error;
        if(redresult.length<1){
            res.render('index',{err:'Not found, Input your link below'})
        }else{
            var original=redresult[0].originallink;
            res.redirect(original)
        }
    })
}

exports.gethome=(req,res)=>{
    res.render('index',{err:''})
}