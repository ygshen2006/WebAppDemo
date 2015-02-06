using Domain.MainBoundedContext.Users;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Application.MainBoundedContect.Services.VerificationCode
{
    public class VerificationCodeService
    {
        private IVerificationCodeRepository _repository;
        public VerificationCodeService() { }
        public VerificationCodeService(IVerificationCodeRepository repository)
        {
            _repository = repository;
        }

        public Bitmap Response(ref string output)
        {
            string st="";
            var str = _repository.GetVerificationCodeMap(ref st);
            output = st;
            return str;
        }
    }
}
