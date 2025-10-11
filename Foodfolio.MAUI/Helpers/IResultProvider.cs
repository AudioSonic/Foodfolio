using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Foodfolio.Helpers
{
    interface IResultProvider<T>
    {
        T Result { get; }
    }
}
