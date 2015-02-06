using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace WebApplication1.Utility
{
    public  class UserHelper
    {

        public static List<ProvinceCity> GetProvinceCityList(string fileLocation)
        {
            XDocument provinces = XDocument.Load(fileLocation+"/Provinces.xml");
            XDocument cities = XDocument.Load(fileLocation+"/Cities.xml");
            XDocument disticts = XDocument.Load(fileLocation+"/Districts.xml");


            var datas = from p in provinces.Element("Provinces").Elements("Province")
                        join c in cities.Element("Cities").Elements("City")
                                       on p.Attribute("ID").Value equals (c.Attribute("PID")).Value
                        into pc
                        from t in pc.DefaultIfEmpty()
                        join d in disticts.Element("Districts").Elements("District")
                                       on t.Attribute("ID").Value equals d.Attribute("CID").Value
                                       into pcd
                        from pd in pcd.ToList()
                        select new { Province = p.Attribute("ProvinceName").Value, City = t.Attribute("CityName").Value, DistrictName = pd.Attribute("DistrictName").Value }

                            into x
                            //group x by x.Province
                            //    into g

                            select x;


            var temp_data = datas.ToList();
            var province_city_list = new List<ProvinceCity>();
            var city_district_list = new List<CityDistrict>();

           
                // Get province city list
                var a = from b in temp_data
                        group b by b.Province
                            into c
                            select c;
                foreach (var d in a.Select(_ => _.Key))
                {
                    var e = from f in a
                            where f.Key == d
                            select new { ProvinceName = d, Cities = f.Select(_ => _.City) };

                    var list_e = e.First();

                    ProvinceCity pc = new ProvinceCity() { ProvinceName = list_e.ProvinceName };
                    foreach (var m in list_e.Cities)
                    {
                        if (!pc.Cities.Contains(m))
                        {
                            pc.Cities.Add(m);
                        }
                    }

                    province_city_list.Add(pc);
                }
            
            //else
            //{

            //    var g = from h in temp_data
            //            where h.Province == provinceName || h.City == provinceName
            //            group h by h.City
            //                into i
            //                select i;
            //    foreach (var j in g.Select(_ => _.Key))
            //    {
            //        var k = from l in g
            //                where l.Key == j
            //                select new { City = j, Districts = l.Select(_ => _.DistrictName) };
            //        var list_k = k.First();
            //        CityDistrict cd = new CityDistrict() { CityName = list_k.City };
            //        foreach (var n in list_k.Districts)
            //        {
            //            if (!cd.Stricts.Contains(n))
            //                cd.Stricts.Add(n);
            //        }
            //        city_district_list.Add(cd);
            //    }

            //}



                return province_city_list;
        }

        public static List<CityDistrict> GetCityDistrictList(string fileLocation,
            string cityName)
        {

            XDocument provinces = XDocument.Load(fileLocation+ "/Provinces.xml");
            XDocument cities = XDocument.Load(fileLocation + "/Cities.xml");
            XDocument disticts = XDocument.Load(fileLocation+"/Districts.xml");


            var datas = from p in provinces.Element("Provinces").Elements("Province")
                        join c in cities.Element("Cities").Elements("City")
                                       on p.Attribute("ID").Value equals (c.Attribute("PID")).Value
                        into pc
                        from t in pc.DefaultIfEmpty()
                        join d in disticts.Element("Districts").Elements("District")
                                       on t.Attribute("ID").Value equals d.Attribute("CID").Value
                                       into pcd
                        from pd in pcd.ToList()
                        select new { Province = p.Attribute("ProvinceName").Value, City = t.Attribute("CityName").Value, DistrictName = pd.Attribute("DistrictName").Value }

                            into x
                            //group x by x.Province
                            //    into g

                            select x;


            var temp_data = datas.ToList();
            var city_district_list = new List<CityDistrict>();


          var g = from h in temp_data
                  where h.Province == cityName || h.City == cityName
                        group h by h.City
                            into i
                            select i;
                foreach (var j in g.Select(_ => _.Key))
                {
                    var k = from l in g
                            where l.Key == j
                            select new { City = j, Districts = l.Select(_ => _.DistrictName) };
                    var list_k = k.First();
                    CityDistrict cd = new CityDistrict() { CityName = list_k.City };
                    foreach (var n in list_k.Districts)
                    {
                        if (!cd.Stricts.Contains(n))
                            cd.Stricts.Add(n);
                    }
                    city_district_list.Add(cd);
                }

                return city_district_list;
        }
    }


    public class ProvinceCity
    {
        public ProvinceCity()
        {
            Cities = new List<string>();
        }
        public string ProvinceName { get; set; }
        public List<string> Cities { get; set; }


    }
    public class CityDistrict
    {
        public CityDistrict()
        {
            Stricts = new List<string>();
        }
        public string CityName { get; set; }
        public List<string> Stricts { get; set; }
    }
}