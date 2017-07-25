﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WaReentryResourceGuide.DAL;
using WaReentryResourceGuide.Models;

namespace WaReentryResourceGuide.Controllers
{
    public class ServiceProvidersController : ApiController
    {
        private ReentryContext db = new ReentryContext();

        // GET: api/ServiceProviders
        public IQueryable<ServiceProviderDTO> GetServiceProviders()
        {
            var serviceProviders = db.ServiceProviders
                            .Include(t => t.ContactInfo)
                            .Include(t => t.CountiesServed)
                            .Include(t => t.Excluded)
                            .Include(t => t.Owners)
                            .Include(t => t.QualityFlags)
                            .Include(t => t.ResourcesProvided)
                            .Include(t => t.Supported);

            List<ServiceProviderDTO> dtos = new List<ServiceProviderDTO>();
            foreach (var serviceProvider in serviceProviders)
            {
                var dto = new ServiceProviderDTO()
                {
                    Name = serviceProvider.Name,
                    Description = serviceProvider.Description,
                    PhoneNumber = serviceProvider.ContactInfo?.PhoneNumber,
                    Email = serviceProvider.ContactInfo?.EmailAddress,
                    Website = serviceProvider.ContactInfo?.WebAddress,
                    Address = serviceProvider.ContactInfo?.PostalAddress,
                    GenderApplicability = new List<bool>
                            {
                                serviceProvider.Supported?.Any(t => t.Attribute == EligibilityCategory.Male) ?? false,
                                serviceProvider.Supported?.Any(t => t.Attribute == EligibilityCategory.Female) ?? false,
                            }.ToArray(),
                    County = serviceProvider.CountiesServed.FirstOrDefault()?.Name
                };

                dtos.Add(dto);
            }
            
            return dtos.AsQueryable<ServiceProviderDTO>();
        }

        // GET: api/ServiceProviders/5
        [ResponseType(typeof(ServiceProvider))]
        public IHttpActionResult GetServiceProvider(int id)
        {
            ServiceProvider serviceProvider = db.ServiceProviders.Find(id);
            if (serviceProvider == null)
            {
                return NotFound();
            }

            return Ok(serviceProvider);
        }

        // PUT: api/ServiceProviders/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutServiceProvider(int id, ServiceProvider serviceProvider)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != serviceProvider.ID)
            {
                return BadRequest();
            }

            db.Entry(serviceProvider).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ServiceProviderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/ServiceProviders
        [ResponseType(typeof(ServiceProvider))]
        public IHttpActionResult PostServiceProvider(ServiceProvider serviceProvider)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ServiceProviders.Add(serviceProvider);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = serviceProvider.ID }, serviceProvider);
        }

        // DELETE: api/ServiceProviders/5
        [ResponseType(typeof(ServiceProvider))]
        public IHttpActionResult DeleteServiceProvider(int id)
        {
            ServiceProvider serviceProvider = db.ServiceProviders.Find(id);
            if (serviceProvider == null)
            {
                return NotFound();
            }

            db.ServiceProviders.Remove(serviceProvider);
            db.SaveChanges();

            return Ok(serviceProvider);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ServiceProviderExists(int id)
        {
            return db.ServiceProviders.Count(e => e.ID == id) > 0;
        }
    }
}