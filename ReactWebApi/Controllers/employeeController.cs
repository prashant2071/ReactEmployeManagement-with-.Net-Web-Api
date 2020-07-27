using ReactWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ReactWebApi.Controllers
{

    public class employeeController : ApiController
    {
        EMPLOYEEDBEntities db = new EMPLOYEEDBEntities();
        public List<tblEmployee> GET()
        {
            List<tblEmployee> tb = db.tblEmployees.ToList();
            return tb;
            //or we can return
            //return db.tblEmployee.ToList();
        }
        public string POST(tblEmployee emp)
        {
            try
            {

                db.tblEmployees.Add(emp);
                db.SaveChanges();
                return "Employee Added successfully";
            }
            catch (Exception)
            {
                return "Failed to add";
            }





        }
        public string PUT(tblEmployee dep)
        {
            try
            {

                tblEmployee tb = db.tblEmployees.Find(dep.EmployeeId);
                tb.Department = dep.Department;
                db.SaveChanges();
                return "Updated successfully";
            }
            catch (Exception)
            {
                return "Failed to update";
            }

        }
        public string Delete(int id)
        {
            try
            {

                tblEmployee tb = db.tblEmployees.Find(id);
                db.tblEmployees.Remove(tb);
                db.SaveChanges();
                return "Deleted successfully";
            }
            catch (Exception)
            {
                return "Failed to Delete";
            }

        }
    }
}


