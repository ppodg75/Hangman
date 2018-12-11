package service;

import server.Server;

public class ServerService {
	
	private final Server server;
	
	public ServerService() {
		server = new Server();
	}
	public void run() {		
		while (true) {
			try {
				Thread.sleep(1000);
				System.out.println("Server ok!");
			} catch (InterruptedException e) { 
				e.printStackTrace();
			}
		}

	}

}
