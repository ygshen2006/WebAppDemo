using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.MainBoundedContext.Users
{
   public interface IVerificationCodeRepository
    {
       Bitmap GetVerificationCodeMap(ref string str);
    }
}
