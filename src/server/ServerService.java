package server;

public class ServerService {

	public static void main(String[] args) {
		Server server = new Server();
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
