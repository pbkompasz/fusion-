import { Command } from "@oclif/core";

export default class Hello2 extends Command {
	public async run(): Promise<void> {
		this.log("Hello from oclif!");
	}
}