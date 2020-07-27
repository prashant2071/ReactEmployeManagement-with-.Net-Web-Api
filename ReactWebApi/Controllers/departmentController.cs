using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ReactWebApi.Models;
namespace ReactWebApi.Controllers
{
    public class departmentController : ApiController
    {
        EMPLOYEEDBEntities db = new EMPLOYEEDBEntities();

        public List<tblDepartment> GET()
        {
            return db.tblDepartments.ToList();
        }

        public string POST(tblDepartment dep)
        {
            try
            {

                db.tblDepartments.Add(dep);
                db.SaveChanges();
                return "Added successfully";
            }
            catch (Exception)
            {
                return "Failed to add";
            }
        }
        public string PUT(tblDepartment dep)
        {
            try
            {

                tblDepartment tb = db.tblDepartments.Find(dep.DepartmentId);
                tb.DepartmentName = dep.DepartmentName;

                db.SaveChanges();
                return "updated successfully";
            }
            catch (Exception)
            {
                return "Failed to add";
            }





        }
        
        public string Delete(int id)
        {
            try
            {
                tblDepartment tb = db.tblDepartments.Where(a => a.DepartmentId == id).FirstOrDefault();
                db.tblDepartments.Remove(tb);

                db.SaveChanges();
                return "Deleted successfully";
            }
            catch (Exception)
            {
                return "Failed to delete";
            }

        }




    }

}


       