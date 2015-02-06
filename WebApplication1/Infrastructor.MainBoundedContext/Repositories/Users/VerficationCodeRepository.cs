using Domain.MainBoundedContext.Users;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructor.MainBoundedContext.Repositories.Users
{
    public class VerficationCodeRepository : IVerificationCodeRepository
    {
        public Bitmap GetVerificationCodeMap(ref string value)
        {
            Stream output=new MemoryStream();
            // Create Bitmap object and to draw
            Bitmap basemap = new Bitmap(200, 60);
            Graphics graph = Graphics.FromImage(basemap);
            graph.FillRectangle(new SolidBrush(Color.White), 0, 0, 200, 60);
            Font font = new Font(FontFamily.GenericSerif, 48, FontStyle.Bold, GraphicsUnit.Pixel);
            Random r = new Random();
            string letters = "ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz0123456789";
            string letter;
            StringBuilder s = new StringBuilder();

            // Add a random string
            for (int x = 0; x < 5; x++)
            {
                letter = letters.Substring(r.Next(0, letters.Length - 1), 1);
                s.Append(letter);

                // Draw the String
                graph.DrawString(letter, font, new SolidBrush(Color.Black), x * 38, r.Next(0, 10));
            }

            // Confuse background
            Pen linePen = new Pen(new SolidBrush(Color.Black), 2);
            for (int x = 0; x < 6; x++)
            {
                graph.DrawLine(linePen, new Point(r.Next(0, 199), r.Next(0, 59)), new Point(r.Next(0, 199), r.Next(0, 59)));
            }
            basemap.Save(output, ImageFormat.Gif);
            value = s.ToString();
            return basemap;
        }
    }
}
