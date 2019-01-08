package feign;

import dto.GameDto;

public interface IGameClientEndpoint {
	
	boolean createGameReturnTrueIfGuess(String playerName, String opponentName);
	GameDto sendLetter(String playerName, String letter);
	GameDto getGame(String playerName);

}
