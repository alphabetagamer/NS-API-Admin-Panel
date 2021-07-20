const multer = require("multer");
var express = require("express");
// var router= express.Router({mergeParams:true});
var moment = require('moment');
var router= express.Router();
var http = require('http');
var https = require('https');
var axios = require("axios");
var user_table = require('./../models/user')
var request = require('request');
const mongoose = require('mongoose');
var product = require("./../models/Product");
var brand = require("./../models/brand");
var vendor = require("./../models/vendor");
// var exer = require("./../models/exercise");
// var blog_table=require("./../../models/blog");
// var reviews_table=require("./../../models/reviews");
// var comments_table=require("./../../models/comments");
var order=require("./../models/order");
// var vendor = require("../../models/vendor");
var coupon_table=require("./../models/coupon");
// var ObjectId = require('mongodb').ObjectId; 
// var deals=require("../../models/deals");
// var deals_home=require("../../models/deals_home");
// var navbar = require("../../models/navbar");
// var jwt_decode = require("jwt-decode");
// var user_table = require("../../models/user");
// var food_table = require("../../models/food");
// var brandtable = require("../../models/brand");
// var jwt = require("jsonwebtoken");
var refer=require("./../models/refer");
// var testimonial = require("../../models/testimonials");
// const keys = require('../../config/keys');
// var fs = require('fs');
// const path = require('path');
const keys = require('./../config/keys');
const conn = mongoose.createConnection(require('./../config/keys').mongoURI);

var totalEarning, totalWithdrawal;

router.get("/",(req,res)=>{
  res.redirect("/index");
})

router.get("/index",(req,res)=>{
    res.render("index");
  })



router.get("/signup",(req,res)=>{
    res.render("signup");
})

router.get("/dashboard",async function(req,res){

    // console.log(localStorage.getItem("jwtToken"));
  
    res.render("dashboard1",
    {
        moment
    });

});


router.get("/dashboard-finance",function(req,res){

    res.render("dashboard-finance");
});

router.get("/dashboard-sales",function(req,res){

    res.render("dashboard-sales");
});

router.get("/add-product",async (req,res)=>{
    if(req.query.id){
        var daa={}
        var  vendor_1=""
        var brand_1=""
        var data2 =new Promise( async function(resolve,reject){
            daa=await product.findOne({"_id":req.query.id})
            resolve("done")
            
        })
        data2.then(async function(resolve){
           var aa=await brand.findOne({"brand_id":daa.brand_id})
           console.log(aa)          
             brand_1=aa.name
        }).then(async function(resolve){            
           var a2a=await vendor.findOne({"vendor_id":daa.vendor_id})           
            vendor_1=a2a.username
            console.log(vendor_1)
        }).then(function(resolve){
            console.log(brand_1)
            console.log(vendor_1)
            res.render("add-product",{data:daa,brand_name:brand_1,vendor_name:vendor_1})
        })
        
    }
    else{

    res.render("add-product")}
})

router.get("/add-review",(req,res)=>{
    res.render("add-review")
})

router.get("/cashback",(req,res)=>{
    res.render("cashback")
})

router.post("/coupon-module",async (req,res)=>{
    var date = req.body.date
    var title= req.body.title
    var couponc=req.body.couponcode
    var desc = req.body.description
    var limit
    var applyto
    var dateobj = new Date();   
    // Contents of above date object is 
    // converted into a string using toISOString() function. 
    var tii = dateobj.toISOString(); 
    var stat = "active"
    if(req.body.limit == "-1"){
        limit=99999
    }
    else{
        limit=req.body.limit
    }
    if(req.body.whydowefall!=""){
        applyto=req.body.whydowefall.split(",")
    }
    var user = req.body.user
    var pro = req.body.product
    console.log(limit)
    console.log(tii)
    console.log(desc)
    console.log(couponc)
    console.log(title)
    console.log(date)
    console.log(req.body)
    console.log(applyto)
    var zzz= await coupon_table.create({coupon_code:couponc,title:title,desc:desc,creation_date:tii,state:stat,active_date:tii,end_date:date,quantity:limit,coupon_type_p:{type:pro},coupon_type_b:{type:user,applyon:applyto}})
    res.render("coupon-module")
})
router.get("/coupon-module",(req,res)=>{
    res.render("coupon-module")
})
router.get("/coupon-table",(req,res)=>{
    res.render("coupon-table")
})
router.get("/earnings",(req,res)=>{
    res.render("earnings")
})


router.get("/notification-module",(req,res)=>{
    res.render("notification-module")
})


router.get("/payments",(req,res)=>{
    res.render("payments")
})

router.get("/product",async (req,res)=>{
    var data = await product.find()
    try{
    if(req.query.id){
        console.log(req.query)
        if(req.query.type=="edit"){
            
            return res.redirect("/add-product?id="+req.query.id)
        }
        else{
            await product.deleteOne({'_id':req.query.id})        }
    }
}
catch(e){
    console.log(e)
}
    return res.render("product",{data:data})
})

router.get("/referal-module",(req,res)=>{
    res.render("referal-module")
})

router.get("/review-module",(req,res)=>{
    res.render("Review-Module")
})

router.get("/single-user",async(req,res)=>{
    var username=req.query.uname
    console.log(username)
    var rude
    var l
    var greed
    var tote=0
    var ordt=0
    var items=[]
    var gg= new Promise(async function(re,er){
        rude= await user_table.findOne({username:username})
        greed = await order.find({user_id:rude.user_id})
        re("done")
    })
    gg.then(async function(rer){
        var teem=await refer.findOne({user_id:rude.user_id})
        try{
        l=teem.referred.length
        }
        catch(e){
            l=0
        }
        if(greed!=null){
            for(let a of greed){
                for(let c of a.items){
                    console.log(c)
                    console.log(a.order_id)
                    var geh= await product.findOne({product_id:c.product_id})
                    items.push([geh,a.order_id])
                    console.log(items)
                    
                }
                ordt=ordt+a.items.length
                tote=tote+a.total.net_total
            }
        }
    }).then(function(ress){
        res.render("single-user",{user:rude,refer_l:l,order_t:ordt,tote:tote,items:items})
    })

})


router.get("/Subscription-module",(req,res)=>{
    res.render("Subscription-module")
})

router.get("/user-module",async (req,res)=>{
    var user
    var referr=[]
    var us = new Promise (async function(re,er){
        user=await user_table.find({})
        
        re("done")
        
    })
    
    us.then(async function(ress){
        console.log(user)
        for(let a of user){
            var tempp=await refer.findOne({referred:{'user_id':a.id}})

            if(tempp!=null){
                referr.push(tempp.user_id)
            }else{
                referr.push("None")
            }
        }

    }).then(async function(ac){
        console.log(referr)
        for (var a=0;a<referr.length;a=a+1){
            if(referr[a]!="None"){
                var name = await user_table.findOne({'user_id':referr[a]})
                referr[a]=name.username
                console.log(name)
            }
        }
        res.render("user-module",{user:user,refer_i:referr})
    })

   
})
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  var upload = multer({ storage: storage })
router.post("/add_product",upload.single("file") ,async (req,res)=>{
    console.log(req.body)
    console.log(req.file)
var vegn=req.body.category2
var pcat = req.body.category
var cats=req.body.cats.split(',')
var flavor = req.body.flavors.split(',')
var name = req.body.title
var vendor1 = req.body.vendor
var brand1 = req.body.brand
var aa=await brand.findOne({"name":brand1},function(res,err){
})
    console.log(aa)
    brand1=aa.brand_id
var desc = req.body.description
var a2a=await vendor.findOne({"username":vendor1},function(res,err){
})
vendor1=a2a.vendor_id

console.log(vendor1)
console.log(brand1)
var s_desc = req.body.s_desc
var goals = req.body.goals.split(',')
var weight = req.body.weight.split(',')
var price = req.body.price
var currp = req.body.cprice
var disp = req.body.dprice
var pid = new mongoose.mongo.ObjectId();
// var vet = vendor_table.findOne({username:vendor})
// var bra = brand_table.findOne({name:brand})
var go =[]
var ca =[]
var we =[]
var fa =[]

for(let a of cats){
    ca.push({category:a})
}
for(let a of flavor){
    fa.push({flavor:a})
}
for(let a of weight){
    we.push({weight:a})
}
for(let a of goals){
    go.push({goal:a})
}
if(req.body.id==""){
var k = await product.create({product_id:parseInt(Math.random()*100000),name:name,type_vn:vegn,discount:disp,price:price,current_price:currp,weight:weight[0],prime_category:pcat,images:[{image:"images/"+req.file.originalname}],vendor_id:vendor1,brand:brand1,flavor:flavor[0],short_desc:[{content:s_desc}],long_desc:[{content:desc}],rating:0,total:0,other_flavors:fa,other_weights:we,goals:go,categories:ca,stock:"In Stock"},function(err,resp){
    if(err){
        res.json({err:err})
    }else
    {
        res.render("add-product")
    }
})
}
else{
    var k =  product.update({'_id':req.body.id},{product_id:parseInt(Math.random()*100000),name:name,type_vn:vegn,discount:disp,price:price,current_price:currp,weight:weight[0],prime_category:pcat,images:[{image:"images/"+req.file.originalname}],vendor_id:vendor1,brand:brand1,flavor:flavor[0],short_desc:[{content:s_desc}],long_desc:[{content:desc}],rating:0,total:0,other_flavors:fa,other_weights:we,goals:go,categories:ca,stock:"In Stock"},function(err,resp){
        if(err){
            res.json({err:err})
        }else
        {
            res.render("add-product")
        }
    })
}
});


router.get("/order-module",(req,res)=>{
    res.render("order-module")
})

router.get("/datewise-orders",(rew,res)=>{
    res.render("datewise-orders")
})

router.get("/datewise-query-orders",async(req,res)=>{
    var end= (req.query.end_date+"T00:00:00.000Z");
    var start=(req.query.start_date+"T00:00:00.000Z");
    // console.log("@@@"+ req.query.start_date)  
    // console.log("@@@"+ end)  
  
    var list = await axios.get('https://ns-api-daphnis.herokuapp.com/api/orders/datewise/'+start+"/"+end).then(res=>{ return res.data }).catch(err=>{ console.log(err.response)});
    // console.log("@@@")
    // console.log(list)
    res.render("datewise-orders",{list,moment})
})

router.get("/add-order",(req,res)=>{
    res.render("add-order")
})

module.exports= router;