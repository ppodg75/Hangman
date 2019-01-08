package feign;

import dto.GameDto;
import dto.PlayerDto;

public interface IPlayerClientEndpoint {
	
	

	PlayerDto getPlayer(String playerName);
	

	
}
