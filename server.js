const {app}=require("./main");
/**
 * this refer to the port used by application
 */
const PORT=process.env.PORT;
/**
 * starting app by refering to port
 */
app.listen(PORT,()=>{
    console.log("app started on port "+PORT);
})