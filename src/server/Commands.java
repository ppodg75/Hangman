package server;

public enum Commands {
	
	CMD_INVITIAION("invitation"), CMD_LETTER("letter"), CMD_ENDGAME("end"), CMD_MESSAGE("msg"), CMD_DISCONNECTED("disconnected");
	
	String cmd;
	
	Commands(String cmd) {
		this.cmd = cmd;
	}
	
	@Override
	public String toString() {
		return cmd;
	}
	
}
