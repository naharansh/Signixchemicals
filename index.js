const express = require('express')
const dotenv = require('dotenv').config({ path: './config/config.env' })
var cookieParser = require('cookie-parser')
const path = require('path')
const app = express()
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
app.use(cookieParser())
// routes called
const routes = require('./routers/routes.js')
const roles = require("./routers/roles.js")
const rolespermission = require("./routers/role_permission.js")
const groups = require('./routers/group.js')
const connections = require('./config/connection.js')
const permissions = require('./routers/permission.js')
const leads = require('./routers/leads.js')
const orders=require('./routers/orders.js')
const categories=require('./routers/categories.js')
const payment=require('./routers/payment.js')
const activity_log=require('./routers/activity_logs.js')
const imports=require('./routers/import.js')
const orderitemss=require('./routers/order_item.js')
const products=require('./routers/products.js')
const dealers=require('./routers/dealer.js')
const departments=require('./routers/departement.js')
const employees=require('./routers/employee.js')
const task=require('./routers/task.js')
const assignment=require('./routers/assignment.js')
const daily_summery=require('./routers/daily_summery.js')
const task_update=require('./routers/task_updates.js')
// const emps=require('./routers/employees.js')
// ================= Employee Management Tables=====
const role=require('./routers/role.js')
const e_department=require('./routers/e_department.js')
const emps=require('./routers/emp.js')
const document=require('./routers/employee_document.js')
// ========================= Leave Management Tables====
const leave=require('./routers/leave_request.js')
const leave_balence=require('./routers/leave_balence.js')
const leave_type=require('./routers/leave_types.js')
// ========================= Attendence Management Tables
const attendance=require('./routers/attendence.js')
const assignment_logs = require('./routers/attenend_logs.js')
//============================= Optional Supporting Tables
const optional=require('./routers/employee_locations.js')
const optionals=require('./routers/attendence_exports.js')
app.use(express.json())
// API EndPoints
app.use('/api/', routes)
app.use("/roleapi/", role);
app.use('/permissionroute/', permissions)
app.use('/rolePermission/', rolespermission)
app.use('/groupapi/', groups)
app.use('/leads/', leads)
app.use('/orders/', orders)
app.use('/categories/',categories)
app.use('/payment/',payment)
app.use('/activity/',activity_log)
app.use('/history/',imports)
app.use('/orderitemss/',orderitemss)
app.use('/products/',products)
app.use('/dealers/',dealers)
app.use('/department/',departments)
app.use('/employee/',employees,task)
app.use('/assignments/',assignment)
app.use('/daily_summery/',daily_summery)
app.use('/tasks_updates/',task_update)
 // ================= Employee Management Tables=====
 app.use("/role/", roles);
 app.use("/e_departemnt/",e_department)
 app.use('/emp/',emps)
app.use('/document/',document)
// ========================= Leave Management Tables
app.use('/leave/',leave)
app.use('/leave_balence/',leave_balence)
app.use('/leave_types/',leave_type)
// ========================= Attendence Management Tables
app.use('/attendance/',attendance)
app.use('/attendence_logs/',assignment_logs)
//============================= Optional Supporting Tables
app.use('/employee_location/',optional)
app.use('/employee_exports/',optionals)
// connections
connections()
// Server
app.listen(process.env.PORT, () => {
    console.log('server is started at 8080')
})