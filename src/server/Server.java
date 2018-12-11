package server;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;

import javax.websocket.Session;

import game.Player;

public class Server {
	
	ClientWebSocket  clientWs;
	GameServer gameServer;

	private static ConcurrentHashMap<Session, Player> sessionPlayers = new ConcurrentHashMap<>();

	public Server() {
		this.clientWs = new ClientWebSocket(this);
		this.gameServer = new GameServer(this);
	}
	
	public void removePlayerBySession(Session session) {
		Player player = sessionPlayers.get(session);
		gameServer.playerDisconnected(player);		
	}
	
	public void initPlayer(Session session) {
		Player player = gameServer.createPlayer();
		sessionPlayers.put(session, player);
	}
	
	public void newPlayer(Session session, String name) {		
		Player player = sessionPlayers.get(session);
        player.setName(name);
	}
	
	public void messageReceived(Session session, String operationData) {
		Commands cmd = getOperation(operationData);
		String data = getData(operationData);
		server.received(cmd, data);
	}
	
	public void sendMessageToClient(Player player, String operation, String data ) {
		clientWs.send(getSession(player), operation +'#' + data );
	}
	
	public void sendMessage(Player toPlayer, String message) {
		sendMessageToClient(toPlayer, Commands.CMD_MESSAGE.toString(), message);
	}
	
	public void sendInvitation(Player toPlayer, String message) {
		sendMessageToClient(toPlayer, Commands.CMD_INVITIAION.toString(), message);
	}
	
	public void sendLetter(Player toPlayer, String letter){
		sendMessageToClient(toPlayer, Commands.CMD_LETTER.toString(), letter);
	}
	
	public void sendMessageOpponentDisconnected(Player toPlayer, String disconnectedPlayerName) {
		sendMessageToClient(toPlayer, Commands.CMD_DISCONNECTED.toString(), disconnectedPlayerName);
	}
	
	public Session getSession(Player player) {
		for(Map.Entry<Session,Player> e : sessionPlayers.entrySet()) {
			if(e.getValue() == player) {
				return e.getKey();
			}
		}
		return null;
	}
}
