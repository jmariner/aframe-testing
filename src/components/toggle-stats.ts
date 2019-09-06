import { registerComponent } from "aframe";

registerComponent("toggle-stats", {
	schema: {
		key: {
			type: "number",
			default: 120 // F9
		},
		startState: {
			type: "boolean",
			default: false
		}
	},

	init() {
		if (!this.el.isScene) return;
		this.showStats(this.data.startState);
		this.onKeyDown = this.onKeyDown.bind(this);
	},

	play() {
		document.addEventListener("keydown", this.onKeyDown);
	},

	pause() {
		document.removeEventListener("keydown", this.onKeyDown);
	},

	stop() {
		document.removeEventListener("keydown", this.onKeyDown);
	},

	toggleStats() {
		this.showStats(!this.el.components.stats.data);
	},

	showStats(shown: boolean) {
		this.el.setAttribute("stats", "" + shown);
		// console.log("Set stats to " + shown);
	},

	onKeyDown(e: KeyboardEvent) {
		if (!this.el.isScene) return;
		if (e.keyCode !== this.data.key) return;
		this.toggleStats();
	}

});