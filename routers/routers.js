const express = require("express");
const router = express.Router();
const mysql = require("../mysql")

const conn = mysql(); 

// GET

router.get("/",(req,res)=>{
    res.redirect("/Sistema-de-facturacion")
})

router.get("/Sistema-de-facturacion",(req,res)=>{
    if(req.session.IsLogin == true){
        res.render('home.ejs',{url:req.protocol+"://"+req.headers.host})
    }else{
        res.redirect("/Sistema-de-facturacion/login")
    }
    
})

router.get("/Sistema-de-facturacion/login",(req,res)=>{
    res.render('login.ejs',{url:req.protocol+"://"+req.headers.host})
})


router.get("/Sistema-de-facturacion/Facturacion",(req,res)=>{
    if(req.session.IsLogin == true){
        res.render('Facturacion.ejs',{
            url:req.protocol+"://"+req.headers.host
        })
    }else{
        res.redirect("/Sistema-de-facturacion/login")
    }
    
})

router.get("/Sistema-de-facturacion/Productos",(req,res)=>{
    if(req.session.IsLogin == true){
        conn.query(`SELECT * FROM products`,(error,results,fields)=>{
            if(error){
                throw error
            }
            res.render('Productos.ejs',{
                url:req.protocol+"://"+req.headers.host,
                rows:results
            })
        })
    }else{
        res.redirect("/Sistema-de-facturacion/login")
    }
    
    
})

router.get("/Sistema-de-facturacion/Proveedores",(req,res)=>{
    if(req.session.IsLogin == true){
        conn.query(`SELECT * FROM vendors`,(error,results,fields)=>{
            if(error){
                throw error
            }
            res.render('Proveedores.ejs',{
                url:req.protocol+"://"+req.headers.host,
                rows:results
            })
        })
    }else{
        res.redirect("/Sistema-de-facturacion/login")
    }
    
    
})


router.get("/Sistema-de-facturacion/clientes",(req,res)=>{
    if(req.session.IsLogin == true){
        conn.query(`SELECT * FROM clients`,(error,results,fields)=>{
            if(error){
                throw error
            }
            res.render('clientes.ejs',{
                url:req.protocol+"://"+req.headers.host,
                rows:results
            })
        })
    }else{
        res.redirect("/Sistema-de-facturacion/login")
    }
    
    
})

router.get("/Sistema-de-facturacion/signin",(req,res)=>{
    delete req.session.IsLogin;
    res.redirect("/Sistema-de-facturacion/login")
})
//POST
router.post("/Sistema-de-facturacion/login",(req,res)=>{
    let user =  req.body.user
    let password =  req.body.password
    conn.query(`SELECT * FROM users WHERE user='${user}' AND password='${password}'`,(error,results,fields)=>{
        if(error){
            throw error
        }
        if(results.length != 0){
            req.session.IsLogin = true
            res.redirect("/Sistema-de-facturacion")
        }else{

        }
        
    })
})

// PRODUCTOS
router.post("/Sistema-de-facturacion/AddProduct",(req,res)=>{
    conn.query(`INSERT INTO products (code,product,price) VALUES ('${req.body.code}','${req.body.name}','${req.body.price}')`,(error,results,fields)=>{
        if(error){
            throw error
        }
        if(results["affectedRows"] == 1){
        }
    })
    res.status(200)
})

router.post("/Sistema-de-facturacion/SelectProduct",(req,res)=>{
    conn.query(`SELECT * FROM products WHERE id=${req.body.id}`,(error,results,fields)=>{
        if(error){
            throw error
        }
        res.send(results)
    })
    
})

router.post("/Sistema-de-facturacion/UpdateProducts",(req,res)=>{
    conn.query(`UPDATE products SET code='${req.body.code}', product='${req.body.name}', price='${req.body.price}' WHERE id=${req.body.id}`,(error,results,fields)=>{
        if(error){
            throw error
        }
        if(results["affectedRows"] == 1){
        }
    })
    
})

router.post("/Sistema-de-facturacion/DeleteProducts",(req,res)=>{
    conn.query(`DELETE FROM products WHERE id=${req.body.id}`,(error,results,fields)=>{
        if(error){
            throw error
        }
    })
    
})

//PROVEEDORES
router.post("/Sistema-de-facturacion/AddVendor",(req,res)=>{
    conn.query(`INSERT INTO vendors (full_name,ruc,email,phone) VALUES ('${req.body.name}','${req.body.ruc}','${req.body.email}','${req.body.phone}')`,(error,results,fields)=>{
        if(error){
            throw error
        }
        if(results["affectedRows"] == 1){
        }
    })
    res.status(200)
})

router.post("/Sistema-de-facturacion/SelectVendor",(req,res)=>{
    conn.query(`SELECT * FROM vendors WHERE id=${req.body.id}`,(error,results,fields)=>{
        if(error){
            throw error
        }
        res.send(results)
    })
    
})

router.post("/Sistema-de-facturacion/UpdateVendors",(req,res)=>{
    conn.query(`UPDATE vendors SET full_name='${req.body.name}', ruc='${req.body.ruc}', email='${req.body.email}',phone='${req.body.phone}' WHERE id=${req.body.id}`,(error,results,fields)=>{
        if(error){
            throw error
        }
        if(results["affectedRows"] == 1){
        }
    })
    
})

router.post("/Sistema-de-facturacion/DeleteVendors",(req,res)=>{
    conn.query(`DELETE FROM vendors WHERE id=${req.body.id}`,(error,results,fields)=>{
        if(error){
            throw error
        }
    })
    
})

//CLIENTES

router.post("/Sistema-de-facturacion/AddClients",(req,res)=>{
    conn.query(`INSERT INTO clients (full_name,ruc_ci,email,phone) VALUES ('${req.body.name}','${req.body.ruc}','${req.body.email}','${req.body.phone}')`,(error,results,fields)=>{
        if(error){
            throw error
        }
        if(results["affectedRows"] == 1){
        }
    })
    res.status(200)
})

router.post("/Sistema-de-facturacion/SelectClients",(req,res)=>{
    conn.query(`SELECT * FROM clients WHERE id=${req.body.id}`,(error,results,fields)=>{
        if(error){
            throw error
        }
        res.send(results)
    })
    
})

router.post("/Sistema-de-facturacion/UpdateClients",(req,res)=>{
    conn.query(`UPDATE clients SET full_name='${req.body.name}', ruc_ci='${req.body.ruc}', email='${req.body.email}',phone='${req.body.phone}' WHERE id=${req.body.id}`,(error,results,fields)=>{
        if(error){
            throw error
        }
        if(results["affectedRows"] == 1){
        }
    })
    
})

router.post("/Sistema-de-facturacion/DeleteClients",(req,res)=>{
    conn.query(`DELETE FROM clients WHERE id=${req.body.id}`,(error,results,fields)=>{
        if(error){
            throw error
        }
    })
    
})

//FACTURA
router.post("/Sistema-de-facturacion/AddFactura",(req,res)=>{
  
    
    conn.query(`SELECT * FROM products WHERE code=${req.body.code}`,(error,results,fields)=>{
        if(error){
            throw error
        }
        
        res.status(200).send({ code: results[0].code, cantidad: req.body.cantidad, descripcion: results[0].product, precio: results[0].price, valorVenta: results[0].price})
        
    })
    
})
//CONTEOS
router.post("/Sistema-de-facturacion/CountProducts",(req,res)=>{
    conn.query(`SELECT COUNT(*) AS total_filas FROM products;`,(error,results,fields)=>{
        if(error){
            throw error
        }
        
        res.status(200).send({total_filas: results[0].total_filas})
        
    })
})
router.post("/Sistema-de-facturacion/CountVendores",(req,res)=>{
    conn.query(`SELECT COUNT(*) AS total_filas FROM vendors;`,(error,results,fields)=>{
        if(error){
            throw error
        }
        
        res.status(200).send({total_filas: results[0].total_filas})
        
    })
})

module.exports = router;