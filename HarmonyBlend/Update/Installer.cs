using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HarmonyBlend.Update
{
	internal class Installer : SetupBase
	{
		#region Singleton
		private static Installer? _instance;
		private static readonly object _instanceLock = new object();

		public static Installer Instance() {
			if(_instance == null) {
				lock(_instanceLock) {
					if(_instance == null) {
						_instance = new Installer();
					}
				}
			}
			return _instance;
		}
        #endregion

        public override void Setup() {
			throw new NotImplementedException();
		}
	}
}
