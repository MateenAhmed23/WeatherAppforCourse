const path = require("path");

const express = require("express");

const geocode = require("./utils/geocode");

const forecast = require("./utils/forecast");

/* This is required for partials */
const hbs = require("hbs");

const app = express();


/* Setup path for express config */
const pathofHTMLHome = path.join(__dirname, "/public");
const viewPath = path.join(__dirname,"./template");
const partialPath = path.join(__dirname, "./partials");


/* Setup static directory to serve */
app.use(express.static(pathofHTMLHome));


/* Setup handlers and views location */
app.set("view engine","hbs");
app.set("views", viewPath);

/* For Partials */
hbs.registerPartials(partialPath);

app.get("",(req,res)=>{
    res.render(
        "index", {
            name: "Weather"
        }
    )
});


app.get("/help",(req,res)=>{
    res.render("help",{
        helpPARA: "Just testing for the help page!"
    });
});

app.get("/about",(req,res)=>{
    res.send("About Page");
});

/* Additional information from server using query */
app.get("/weather",(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: "Address not found"
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error)
        {
            return res.send({
                error
            })
        };

        forecast(data.longitude, data.latitude, (error, data) => {
            if (error)
            {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: data,
                Location: req.query.address
            });
        });
    });
});


/* This is for starting the express live portal 3000

    LocalHost:3000
*/
app.listen(3000, ()=> {
    console.log("3000 fired up!");
})

console.log("Git hehe");