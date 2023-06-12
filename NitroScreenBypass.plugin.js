/**
 * @name NitroScreenBypass
 * @author Jogeer
 * @authorId 317210692702961664
 * @description User premium type bypass
 * @version 1.1.0
 * @source ...
 * @updateUrl ...
 */
module.exports = (_ => {
	var _this;
	var _moduleUser;

	return class NitroScreenBypass {
		constructor(meta) {for (let key in meta) this[key] = meta[key]; _this = this;}
		getName() { return this.name; }
		getAuthor() { return this.author; }
		getVersion() { return this.version; }
		getDescription() { return this.description; }
		stop() {}
		start() {
			if (!BdApi) throw new Error(`[${this.name}]: Provide BdApi lib.`)
			_moduleUser = BdApi.Webpack.getModule(BdApi.Webpack.Filters.byProps('getCurrentUser'));

			let _waitForDiscord = setInterval(() => {
				if (window.BDFDB_Global.loaded && window.BDFDB_Global.started) {
					clearInterval(_waitForDiscord);
					this.initPlugin();
				}
			}, 1000);
		}
		initPlugin() {
			console.log(`[${this.name}]: Init plugin.`)

			let user = this.getCurrentUser();

			document.addEventListener('click', () => {
				this.provideUserPerms(user);
			});
		}
		provideUserPerms(user) {
			if (user.premiumType != 2) {
				console.log(`[${this.name}]: User premium type is ${user.premiumType}! Changing...`);
				user.premiumType = 2;
			} else {
				console.log(`[${this.name}]: User premium type is correct.`);
			}
		}
		getCurrentUser() {
			return _moduleUser.getCurrentUser();
		}
	}
})();
