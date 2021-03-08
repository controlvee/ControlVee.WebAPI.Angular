using Microsoft.AspNetCore.Mvc;
using ControlVee.WebAPI.Angular.Models;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace ControlVee.WebAPI.Angular
{
    [ApiController]
    [Route("[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly string cstring = @"Data Source=(localdb)\MSSQLLocalDB;Database=DutShop;Integrated Security=True";
        private DataAccess context;
        List<BatchModel> batches;
        List<TotalSoldModel> totalSold;

        public InventoryController()
        {
        }

        [HttpGet]
        [Route("getBatches")]
        public IQueryable<BatchModel> GetBatches()
        {
            batches = new List<BatchModel>();
            using (var connection = new SqlConnection())
            {
                connection.ConnectionString = cstring;

                context = new DataAccess(connection);

                batches = context.GetAllBatchesFromDb();
            };

            return batches.AsQueryable();
        }

        [HttpGet]
        [Route("createBatch")]
        public int CreateBatch()
        {
            int success = 0;
            using (var connection = new SqlConnection())
            {
                connection.ConnectionString = cstring;

                context = new DataAccess(connection);

                if (context.CreateBatchRecordFromDb())
                    success = 1;
            };

            return success;
        }

        [HttpGet]
        [Route("getTotalSold")]
        public List<TotalSoldModel> GetTotalSold()
        {
            totalSold = new List<TotalSoldModel>();
            using (var connection = new SqlConnection())
            {
                connection.ConnectionString = cstring;

                context = new DataAccess(connection);

                totalSold = context.GetTotalSoldFromDb();
                    
            };

            return totalSold;
        }
    }
}
